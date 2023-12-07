import { Request, Response } from "express";
import connection from "../connection";
import { Authenticator } from "../services/Authenticator";
import { compare } from "../services/HashText";

export default async function login(
   req: Request,
   res: Response
): Promise<void> {
   try {

      const { email, password } = req.body

      if (!email || !password) {
         res.statusCode = 422
         throw new Error("Preencha os campos 'password' e 'email'")
      }

      const [user] = await connection('users')
         .where({ email })

      if (!user) {
         res.statusCode = 404
         throw new Error('Usuario inexistente')
      }
     
       const  compararsenhas = await compare(password,user.password,)
       console.log(compararsenhas,password,user.password)
      
       if (compararsenhas != true ) {
         res.statusCode = 400;
         throw new Error( 'Senha incorreta')
      }

      const authenticator = new Authenticator();

      const token = authenticator.generateToken({ id: user.id, role: user.role })

      const formattedResponse = {
         token: token
      };

      res.status(201).send(formattedResponse)
      console.log(authenticator.getTokenData(token))

   } catch (error: any) {
      res.send(error.sqlMessage || error.message);
   }
}