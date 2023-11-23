import { Request, Response } from "express";
import connection from "../connection";
import { generateId } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";

export default async function createFilmes(req: Request, res: Response): Promise<void> {
    const novoFilme = req.body;

    try {
        delete novoFilme.id;
        const authenticator = new Authenticator();

        const token = req.headers.authorization;
        if (!token) {
            res.statusCode = 401;
            throw new Error("e o Token nada ainda?")
        }
        const tokenData = authenticator.getTokenData(token as string);

        const id = generateId();


        await connection('filmes').insert({ ...novoFilme, id, user_id: tokenData.id });


        const filme = { id, ...novoFilme, user_id: tokenData.id };
        res.status(201).json(filme);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o filme.' });
    }
}

