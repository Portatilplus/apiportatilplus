import { Router } from "express";
import { metodos } from "../../controllers/admin/controler.retiro";
import { verificarToken } from "../../middleware/oauth";

const rutaretiro = Router();


rutaretiro.get("/retiro", metodos.listarretiro);
rutaretiro.post("/retiro", verificarToken, metodos.agregarretiro);
rutaretiro.put("/retiro", verificarToken, metodos.modificarretiro);
rutaretiro.delete("/retiro", verificarToken, metodos.eliminarretiro);



export default rutaretiro;