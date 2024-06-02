import express from 'express';
import { config } from 'dotenv';
import rutas from './routes';
import morgan from 'morgan';
config();

const app = express();


app.use(express.json());
app.use(morgan("dev"));

// puerto
app.set("port", process.env.PORT || 3000);

// rutas
app.use("/", rutas);


export default app;