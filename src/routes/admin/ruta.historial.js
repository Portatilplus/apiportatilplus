import { Router } from "express";
import { metodos } from "../../controllers/admin/controles.histroial";
const rutahistorial = Router();



rutahistorial.get("/historial", metodos.historial);
rutahistorial.get("/historial/:id", metodos.listarhistorial);
rutahistorial.get("/historialreserva", metodos.historialreserva);


export default rutahistorial;