import { Router } from "express";
import { metodos } from "../controllers/controler.registro";
import sancion from "../routes/admin/ruta.sancion"

const rutaregistro = Router();



rutaregistro.post("/registro", metodos.agregarregistro);
rutaregistro.post("/login",metodos.login);


export default rutaregistro;