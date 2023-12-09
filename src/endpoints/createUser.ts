import { Request, Response } from "express";
import connection from "../connection";
import { user } from "../types";
import { generateId } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { hash } from "../services/HashText";

export default async function createUser(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { name, role, email, password } = req.body;

    if (!["default", "admin"].includes(role)) {
      res.send(422).send("O campo 'role' deve ser 'default' ou 'admin'");
      return;
    }

    if (!name || !role || !email || !password) {
      res.status(422).send("Preencha os campos 'name','role', 'password' e 'email'");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(406).send("O formato do email é inválido.");
      return;
    }
    
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
    if (!passwordRegex.test(password)) {
      res.status(406).send("A senha deve ter no mínimo 8 caracteres, incluindo pelo menos um caractere especial uma Letra e um numero.");
      return;
    }

    const [existingUser] = await connection('users').where({ email });

    if (existingUser) {
      res.status(409).send('Email já cadastrado');
      return;
    }

    const id: string = generateId();
    const encryptedPass = await hash(password);

    const newUser: user = { id, name, role, email, password: encryptedPass };

    await connection('users').insert(newUser);

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id, role });
    const formattedResponse = {
      token: token
    };
    res.status(201).send(formattedResponse);
  } catch (e: any) {
    res.send(500).send('ocorreu um erro ao criar o usuario');
  }
}
