import { Router } from "express";
import { metodos } from "../../controllers/admin/controler.sancion";
import { verificarToken } from "../../middleware/oauth";


const rutasancion = Router();

rutasancion.get("/sancion", metodos.listarsancion);
rutasancion.post("/sancion", verificarToken, metodos.agregarsancion);
rutasancion.put("/sancion", verificarToken, metodos.modificarsancion);
rutasancion.delete("/sancion", verificarToken, metodos.eliminarsancion);

export default rutasancion;