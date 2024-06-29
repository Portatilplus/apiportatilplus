import { Router } from "express";
import { metod } from "../../controllers/admin/controler.notas";

const rutanota = Router();


rutanota.post("/notas", metod.agregarnotas)
rutanota.get("/notas", metod.listarnotas)
rutanota.put("/notas", metod.modificarnotas)
rutanota.delete("/notas", metod.eliminarnotas)



export default rutanota;