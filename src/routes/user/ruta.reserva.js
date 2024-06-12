import { Router } from "express";
import reservacion from "../../controllers/user/controles.reservacion";

const rutareserva = Router();


rutareserva.post("/reserva", reservacion);

export default rutareserva;