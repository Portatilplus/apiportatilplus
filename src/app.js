import express from 'express';
import { config } from 'dotenv';
import rutas from './routes';
import morgan from 'morgan';
import cors from 'cors';
config();

const app = express();

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());



// rutas
app.use("/", rutas);


// puerto
app.set("port", process.env.PORT || 3000);

export default app;