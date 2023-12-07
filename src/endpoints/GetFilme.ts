import { Request, Response } from "express";
import connection from "../connection";
import { validOrderBy } from "../types";

export default async function getFilmes(req: Request, res: Response): Promise<void> {
  try {
    const { titulo, diretor, ano, offset = "0", limit = "10", orderby = "asc" } = req.query;
    const id = req.params.id;
    const offsetNumber = parseInt(offset as string);
    const limitNumber = parseInt(limit as string);
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ error: "Token não fornecido." });
      return;
    }

    let query = connection.select().from('filmes');

    if (id) {
      query = query.where('id', '=', id);
    } else {
      if (titulo) query = query.where('titulo', 'like', `%${titulo}%`);
      if (diretor) query = query.where('diretor', 'like', `%${diretor}%`);
      if (ano) query = query.where('ano', '=', parseInt(ano as string));
    }

    
    const orderBy = validOrderBy.includes(orderby as string) ? (orderby as string) : "asc";

    query = query.orderBy('titulo', orderBy).offset(offsetNumber).limit(limitNumber);

    const filmes = await query;

    if (filmes.length > 0) {
      res.status(200).json(filmes);
    } else {
      res.status(404).json({ error: 'Nenhum filme encontrado com os filtros fornecidos.' });
    }
  } catch (error: any) {
    if (error.message === 'Token expired') {

      res.status(401).json({ error: 'Token expirado. Faça o login novamente.' });

  } else if (error.message === 'invalid signature') {

      console.error('Erro ao verificar o token:', error.message);

      res.status(498).json({ message: "Erro Token invalido , insira um token valido para realizar a requisição" });

  } else {
      res.status(500).json({ message: "Erro ao buscar filmes.'" });
  }
    console.error(error);
    
  }
}
