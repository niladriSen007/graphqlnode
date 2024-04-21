import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import axios from "axios";

const startServer = async () => {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  const server = new ApolloServer({
    typeDefs: `

        type User{
            id : ID!,
            name : String!,
            username : String!,
            email : String!,
            phone : String!,
        }

        type Todo{
            id : ID!,
            title : String!,
            completed : Boolean!
           
        }

        type Query{
            getTodos : [Todo]
            getTodoById(id : ID!) : Todo
            getUsers : [User]
            getUser(id : ID!) : User
        }
    `,
    resolvers: {
      Query: {
        getTodos: async () => {
          const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/todos"
          );

          return data;
        },

        getTodoById: async (_, { id }) => {
          const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/todos/${id}`
          );

          return data;
        },

        getUsers: async () => {
          const { data } = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          return data;
        },

        getUser: async (_, { id }) => {
          const { data } = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${id}`
          );
          return data;
        },
      },
    },
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(4000, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

startServer();
