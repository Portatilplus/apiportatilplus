import express from 'express';
import { config } from 'dotenv';
import rutas from './routes';
import morgan from 'morgan';
config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// middleware


// rutas
app.use("/", rutas);


// puerto
app.set("port", process.env.PORT || 3000);






export default app;