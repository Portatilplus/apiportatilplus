import { Router } from "express";
import { metodos } from "../../controllers/admin/controler.sancion";
import { verificarToken } from "../../middleware/oauth";


const rutasancion = Router();

rutasancion.get("/sancion", metodos.listarsancion);
rutasancion.post("/sancion",  metodos.agregarsancion);
rutasancion.put("/sancion", metodos.modificarsancion);
rutasancion.delete("/sancion/:id_sancion",  metodos.eliminarsancion);

export default rutasancion;