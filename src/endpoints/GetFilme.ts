import { Request, Response } from "express";
import connection from "../connection";

export default async function getFilmes(req: Request, res: Response): Promise<void> {
  try {

    const { titulo, diretor, ano, page = "1", limit = "10" } = req.query;


    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);


    let query = connection.select().from('filmes');

   
    if (titulo) query = query.where('titulo', 'like', `%${titulo}%`);
    if (diretor) query = query.where('diretor', 'like', `%${diretor}%`);
    if (ano) query = query.where('ano', '=', parseInt(ano as string));

    const offset = (pageNumber - 1) * limitNumber;
    query = query.offset(offset).limit(limitNumber);


    const filmes = await query;

    if (filmes.length > 0) {
      res.status(200).json(filmes);
    } else {
      res.status(404).json({ error: 'Nenhum filme encontrado com os filtros fornecidos.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar filmes.' });
  }
}
