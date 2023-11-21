import connection from "../connection";
import { Request, Response } from 'express';

export default async function deleteFilmes(
    req: Request,
    res: Response
): Promise<void> {
    const id = parseInt(req.params.id);

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