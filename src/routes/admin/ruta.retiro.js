import { Router } from "express";
import { metodos } from "../../controllers/admin/controler.retiro";

const rutaretiro = Router();


rutaretiro.get("/retiro", metodos.listarretiro);
rutaretiro.post("/retiro", metodos.agregarretiro);
rutaretiro.put("/retiro", metodos.modificarretiro);
rutaretiro.delete("/retiro", metodos.eliminarretiro);



export default rutaretiro;