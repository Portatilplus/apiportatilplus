import express from 'express';
import { config } from 'dotenv';
import rutas from './routes';
import morgan from 'morgan';
import path from 'path';
config();

const app = express();


app.use(express.json());
app.use(morgan("dev"));

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")))


// puerto
app.set("port", process.env.PORT || 3000);

// rutas
app.use("/", rutas);


export default app;