import { Router } from "express";
import { metodos } from "../controllers/controler.registro";
import { verificarToken } from "../middleware/oauth";
const rutaregistro = Router();



rutaregistro.post("/registro", metodos.agregarregistro);
rutaregistro.post("/login", metodos.login);


export default rutaregistro;