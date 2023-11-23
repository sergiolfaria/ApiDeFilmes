import { Request, Response } from "express";
import connection from "../connection";
import { user } from "../types";
import { generateId } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";

export default async function createUser(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { name, role, email, password } = req.body;

    // Validando se o valor de 'role' é válido
    if (!["default", "admin"].includes(role)) {
      res.statusCode = 422;
      throw new Error("O campo 'role' deve ser 'default' ou 'admin'");
    }

    if (!name || !role || !email || !password) {
      res.statusCode = 422;
      throw new Error("Preencha os campos 'name','role', 'password' e 'email'");
    }

    const [existingUser] = await connection('users').where({ email });

    if (existingUser) {
      res.statusCode = 409;
      throw new Error('Email já cadastrado');
    }

    const id: string = generateId();

    const newUser: user = { id, name, role, email, password };

    await connection('users').insert(newUser);

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id ,role});

    res.status(201).send(token);
  } catch (e: any) {
    res.send(e.sqlMessage || e.message);
  }
}