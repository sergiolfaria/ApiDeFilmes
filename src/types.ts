export type user = {
    id: string
    email: string
    password: string
    name: string
    role: "default" | "admin"
 }
 export type AuthenticationData = {
    id: string;
    role:string;
  }