import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { adminConnected, userConnected } from './middlewares/AuthMiddlewares'
const app = express();

// Define global middlewares here:

app.get('/', (req, res) => {
    res.send('Hello world');
});
// Ajout des Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Register all routers
import ExampleRouter from './routes/ExampleRoutes';
app.use('/example', ExampleRouter);

import AuthRoutes from './routes/AuthRoutes';
app.use('/auth', AuthRoutes);

export default app;