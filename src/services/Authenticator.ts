import * as jwt from "jsonwebtoken";
import { AuthenticationData } from "../types";

export class Authenticator {
  
  generateToken = (payload: AuthenticationData): string => {
    return jwt.sign(
      payload,
      process.env.JWT_KEY as string,
      { expiresIn: "24h" }
    );
  };

  getTokenData = (token: string): AuthenticationData => {
    try {
      var decoded = jwt.verify(token, process.env.JWT_KEY as string);
      console.log(decoded)
      return decoded as AuthenticationData;
    } catch (error: any) {
      if (error.message.includes("jwt expired")) {
        throw new Error("Token expired")
        
      }
      throw new Error(error.message);
    }
  };
}
