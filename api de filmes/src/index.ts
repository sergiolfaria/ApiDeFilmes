import { Request, Response } from 'express';
import connection from './connection';
import app from './app';
import createUser from './endpoints/createUser';
import login from './endpoints/login';
import editUser from './endpoints/editUser';



app.post('/user/signup', createUser)
app.post('/user/login', login)
app.put('/user/edit', editUser)

app.get('/filmes', async (req: Request, res: Response) => {
  try {
    const filmes = await connection.select().from('filmes');
    res.status(200).json(filmes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar filmes.' });
  }
});

app.get('/filmes/:id', async (req: Request, res: Response) => {
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
});


app.post('/filmes', async (req: Request, res: Response) => {
  const novoFilme = req.body;

  try {
    const [id] = await connection('filmes').insert(novoFilme).returning('id');
    const filme = await connection.select().from('filmes').where({ id }).first();

    res.status(201).json(filme);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o filme.' });
  }
});


app.put('/filmes/:id', async (req: Request, res: Response) => {
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
});

// Endpoint para excluir um filme
app.delete('/filmes/:id', async (req: Request, res: Response) => {
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
});

