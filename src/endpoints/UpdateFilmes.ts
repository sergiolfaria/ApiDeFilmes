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

    const filme = await connection("filmes")
      .where({ id: filmeId })
      .first();

    if (!filme) {
      res.status(404).json({ error: "Filme não encontrado." });
      return;
    }

    if (tokenData.role !== "admin" && tokenData.id !== filme.user_id) {
      res.status(403).json({ error: "Usuário não autorizado." });
      return;
    }

  
    const { titulo, diretor, ano } = req.body;

    await connection("filmes")
      .where({ id: filmeId })
      .update({ titulo, diretor, ano });
      res.status(200).json({message:'Filme atualizado com sucesso', filme});

  } catch (error: any) {
    console.error(error);
    if (error.message === 'Token expired') {

      res.status(401).json({ error: 'Token expirado. Faça o login novamente.' });

    } else if(error.message === 'invalid signature'){

      console.error('Erro ao verificar o token:', error.message);

      res.status(498).json({ message: "Erro Token invalido , insira um token valido para realizar a requisição" });

    }else{
      res.status(500).json({ message: "Erro ao atualizar o filme" });
    }
  }
}
