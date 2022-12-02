import "reflect-metadata";
import { DataSource } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolvers/BookResolver";

async function main() {
    const AppDataSource = new DataSource({
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "postgres",
        "password": "anand",
        "database": "typeorm",
        "entities": [
            "./src/models/*.ts"
        ],
        "synchronize": true
    })
    AppDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        })

    const schema = await buildSchema({ resolvers: [BookResolver] })
    const server = new ApolloServer({ schema })
    await server.listen(4000)
    console.log("Server has started!")
}
main()