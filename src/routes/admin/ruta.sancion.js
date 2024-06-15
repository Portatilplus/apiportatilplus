import { Router } from "express";
import { metodos } from "../../controllers/admin/controler.sancion";


const rutasancion = Router();

rutasancion.get("/sancion", metodos.listarsancion);
rutasancion.post("/sancion", metodos.agregarsancion);
rutasancion.put("/sancion", metodos.modificarsancion);
rutasancion.delete("/sancion", metodos.eliminarsancion);

export default rutasancion;