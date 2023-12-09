import knex from 'knex'
import dotenv from 'dotenv'
dotenv.config()
const connection = knex({ 
    client: "postgresql",
    connection: {
        host: process.env.DB_HOST,
        port:  parseInt(process.env.PORT_DB as string),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA,
        multipleStatements: true
        }
})
export default connection