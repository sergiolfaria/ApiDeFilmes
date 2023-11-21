import { Request, Response } from "express";
import connection from "../connection";

export default async function updateFilmes(
    req: Request,
    res: Response
): Promise<void> {

    const id = parseInt(req.params.id);
    const novoFilme = req.body;

    try {
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