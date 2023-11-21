import { Request, Response } from "express";
import connection from "../connection";



export default async function getUser(
    req: Request,
    res: Response
  ): Promise<void> {

    const id = parseInt(req.params.id);
  
    try {
      const filme = await connection.select().from('filmes').where({ id }).first();
  
      if (filme) {
        res.status(200).json(filme);
      } else {
        res.status(404).json({ error: 'Filme não encontrado.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o filme.' });
    }


  }