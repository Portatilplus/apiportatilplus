import { Router } from "express";
import { metodos } from "../../controllers/admin/controler.computador";
import { verificarToken } from "../../middleware/oauth";

const rutacomputador = Router();


rutacomputador.get("/computador", metodos.listarcomputador);
rutacomputador.post("/computador",  metodos.agregarcomputador);
rutacomputador.put("/computador/",  metodos.modificarcomputador);
rutacomputador.delete("/computador/:idcomputador",metodos.eleminarcomputador);


export default rutacomputador;