import { Request, Response } from "express";
import connection from "../connection";
import { Authenticator } from "../services/Authenticator";

export default async function updateFilmes(
    req: Request,
    res: Response
): Promise<void> {
    try {
        // Obter o token do cabeçalho da requisição
        const token = req.headers.authorization as string;

        if (!token) {
            res.statusCode = 401;
            throw new Error("e o Token nada ainda?")
         }
        const authenticator = new Authenticator();
        const tokenData = authenticator.getTokenData(token);

        // Verificar se o usuário é um admin ou dono do filme
        if (tokenData.role !== "admin" && tokenData.id !== req.body.user_id) {
            res.status(403).json({ error: 'Usuário não autorizado.' });
            return;
        }

        const id = parseInt(req.params.id);
        const novoFilme = req.body;

        const quantidadeAtualizada = await connection('filmes').where({ id }).update(novoFilme);

        if (quantidadeAtualizada > 0) {
            const filmeAtualizado = await connection.select().from('filmes').where({ id }).first();
            res.status(200).json(filmeAtualizado);
        } else {
            res.status(404).json({ error: 'Filme não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o filme.' });
    }
}
