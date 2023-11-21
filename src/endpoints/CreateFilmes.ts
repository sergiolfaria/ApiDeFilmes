import { Request, Response } from "express";
import connection from "../connection";



export default async function createFilmes(
    req: Request,
    res: Response
): Promise<void> {
    const novoFilme = req.body;
    try {
        const [id] = await connection('filmes').insert(novoFilme).returning('id');
        const filme = await connection.select().from('filmes').where({ id }).first();

        res.status(201).json(filme);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o filme.' });
    }
}