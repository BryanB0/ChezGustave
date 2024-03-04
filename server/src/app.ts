import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
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

import UsersRoutes from './routes/UsersRoutes';
app.use('/users', UsersRoutes);

import EquipementsRoutes from './routes/EquipementsRoutes';
app.use('/equipements', EquipementsRoutes);

import LogementsRoutes from './routes/LogementsRoutes';
app.use('/logements', LogementsRoutes);

import ReservationsRoutes from './routes/ReservationsRoutes';
app.use('/reservations', ReservationsRoutes);

export default app;