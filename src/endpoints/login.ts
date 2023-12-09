import { Request, Response } from "express";
import connection from "../connection";
import { Authenticator } from "../services/Authenticator";
import { compare } from "../services/HashText";

export default async function login(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(422).json("Preencha os campos 'password' e 'email'");
      return;
    }

    const [user] = await connection('users').where({ email });

    if (!user) {
      res.status(404).json('Usuario inexistente');
      return;
    }

    const compararsenhas = await compare(password, user.password);

    if (!compararsenhas) {
      res.status(400).json({message: 'Senha incorreta faça login novamente'});
      return;
    }

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id: user.id, role: user.role });

    const formattedResponse = {
      token: token
    };

    res.status(201).json(formattedResponse);
    console.log(authenticator.getTokenData(token));

  } catch (error: any) {
    res.status(500).send('Ocorreu um erro ao logar o usuário');
  }
}
