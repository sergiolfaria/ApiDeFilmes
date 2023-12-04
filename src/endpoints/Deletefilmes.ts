
import connection from "../connection";
import { Request, Response } from 'express';
import { Authenticator } from "../services/Authenticator";

export default async function deleteFilmes(
    req: Request,
    res: Response
): Promise<void> {
    const token = req.headers.authorization as string;

    if (!token) {
        res.statusCode = 401;
        throw new Error("e o Token nada ainda?")
    }
    const authenticator = new Authenticator();

    const tokenData = authenticator.getTokenData(token);
    
    const id = parseInt(req.params.id);
   

    if (tokenData.role !== "admin" && tokenData.id !== req.params.id) {
        res.status(403).json({ error: 'Usuário não autorizado.' });
        return;
    }

    try {
        const quantidadeExcluida = await connection('filmes').where({ id }).del();

        if (quantidadeExcluida > 0) {
            res.status(200).json({ message: `Filme com ID ${id} foi excluído com sucesso.` });
        } else {
            res.status(404).json({ error: 'Filme não encontrado.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir o filme.' });
    }
}