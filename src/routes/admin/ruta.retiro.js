import { Router } from "express";
import { metodos } from "../../controllers/admin/controler.retiro";
import { verificarToken } from "../../middleware/oauth";

const rutaretiro = Router();


rutaretiro.get("/retiro", metodos.listarretiro);
rutaretiro.post("/retiro", metodos.agregarretiro);
rutaretiro.put("/retiro/", metodos.modificarretiro);
rutaretiro.delete("/retiro/:id_retiro", metodos.eliminarretiro);



export default rutaretiro;