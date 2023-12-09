import connection from "../connection";
import { Request, Response } from 'express';
import { Authenticator } from "../services/Authenticator";

export default async function deleteFilmes(
    req: Request,
    res: Response
): Promise<void> {
    const token = req.headers.authorization as string;

    if (!token) {
        res.status(401).json({ error: "e o Token nada ainda?" });
        return;
    }

    const authenticator = new Authenticator();

    try {
        const tokenData = authenticator.getTokenData(token);

        const id = req.params.id;

        if (tokenData.role !== "admin" && tokenData.id !== req.params.id) {
            res.status(403).json({ error: 'Usuário não autorizado.' });
            return;
        }

        const quantidadeExcluida = await connection('filmes').where({ id }).del();
        if (quantidadeExcluida > 0) {
            res.status(200).json({ message: `Filme com ID ${id} foi excluído com sucesso.` });
        } else {
            res.status(404).json({ error: 'Filme não encontrado.' });
        }
    } catch (error: any) {
        if (error.message === 'Token expired') {
            res.status(401).json({ error: 'Token expirado. Faça o login novamente.' });
        } else if (error.message === 'invalid signature') {
            res.status(498).json({ message: "Erro Token inválido, insira um token válido para realizar a requisição" });
        } else {
            res.status(500).json({ message: "Erro ao atualizar o filme" });
        }
    }
}
