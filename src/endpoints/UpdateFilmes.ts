import { Request, Response } from "express";
import connection from "../connection";
import { Authenticator } from "../services/Authenticator";

export default async function updateFilmes(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const authenticator = new Authenticator();
    const token = req.headers.authorization as string;

    if (!token) {
      res.status(401).json({ error: "e o Token nada ainda ?" });
      return;
    }

    const tokenData = authenticator.getTokenData(token);
    const filmeId = req.params.id;

    // Obtenha o filme completo do banco de dados
    const filme = await connection("filmes")
      .where({ id: filmeId })
      .first();

    if (!filme) {
      res.status(404).json({ error: "Filme não encontrado." });
      return;
    }

    // Verificar se o usuário é um admin ou dono do filme
    if (tokenData.role !== "admin" && tokenData.id !== filme.user_id) {
      res.status(403).json({ error: "Usuário não autorizado." });
      return;
    }

    // Obtenha os dados a serem atualizados do corpo da requisição
    const { titulo, diretor, ano } = req.body;

    // Faça a atualização no banco de dados
    await connection("filmes")
      .where({ id: filmeId })
      .update({ titulo, diretor, ano });

    // Responda com sucesso
    res.status(200).json({message:'Filme atualizado com sucesso'});
  } catch (error) {
    console.error(error);
    // Trate outros erros conforme necessário
    res.status(500).json({message: "Erro ao atualizar o filme"});
  }
}
