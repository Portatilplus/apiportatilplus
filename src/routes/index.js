import { Router } from "express";
import rutaregistro from "./ruta.registro";

const rutas = Router();

rutas.use("/api", rutaregistro);


export default rutas;