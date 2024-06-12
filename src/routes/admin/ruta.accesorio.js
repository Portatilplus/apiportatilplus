import { Router } from "express";
import { metodos } from "../../controllers/admin/controler.accesorio";
import { verificarToken } from "../../middleware/oauth";

const rutaaccesorio = Router();

rutaaccesorio.get("/accesorio",metodos.listaraccesorio);
rutaaccesorio.post("/accesorio",metodos.agregaraccesorio);
rutaaccesorio.put("/accesorio", metodos.modificaraccesorio);
rutaaccesorio.delete("/accesorio", metodos.eliminaraccesorio);


export default rutaaccesorio;