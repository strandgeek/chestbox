import express, { Express, Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import proxy from 'express-http-proxy';

// Routes
import { apiRouter } from './routes/api';

dotenv.config();

const app: Express = express();
app.use(express.json({ limit: '10mb' }));
const port = process.env.PORT || 4000;
app.use(cors())

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
