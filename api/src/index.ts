import "reflect-metadata";
import express, { Express } from 'express';
import { ApolloServer } from "apollo-server-express";
import dotenv from 'dotenv';
import cors from 'cors';
import proxy from 'express-http-proxy';
// Routes
import { apiRouter } from './routes/api';
import { buildSchema } from "type-graphql";
import { db } from "../db";
import { AuthResolver } from "../graphql/resolvers/Auth";
import { AccountRelationsResolver, ProjectRelationsResolver } from '@generated/type-graphql'
import { authChecker } from "./authChecker";
import { ProjectResolver } from "../graphql/resolvers/Project";
import { ImageResolver } from "../graphql/resolvers/Image";
import { ProjectAssetResolver } from "../graphql/resolvers/ProjectAsset";


dotenv.config();

export const bootstrap = async () => {
  // GraphQL Setup
  const schema = await buildSchema({
    resolvers: [
      AccountRelationsResolver,
      AuthResolver,
      ProjectResolver,
      ImageResolver,
      ProjectAssetResolver,
      ProjectRelationsResolver,
    ],
    validate: false,
    authChecker,
  });
  const server = new ApolloServer({
    schema,
    context: (ctx) => ({ ...ctx, prisma: db }),
  });

  // Express Setup
  const app: Express = express();
  app.use(express.json({ limit: '10mb' }));
  const port = process.env.PORT || 4000;
  app.use(cors())
  await server.start()
  server.applyMiddleware({ app, path: '/graphql' });

  // Serve static builded webapp or proxy to local webapp for development mode
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../webapp/build'));
  } else {
    app.use(proxy('http://localhost:3000', {
      filter: function(req, res) {
        return !req.path.includes('/api')
      }
    }));
  }
  
  app.use('/api', apiRouter)
  
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
  
}

bootstrap()
