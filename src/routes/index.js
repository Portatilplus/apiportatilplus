import { Router } from "express";
import rutaregistro from "./ruta.registro";
import rutacomputador from "./admin/ruta.computador";
import rutaaccesorio from "./admin/ruta.accesorio";
import rutasancion from "./admin/ruta.sancion";
import rutaretiro from "./admin/ruta.retiro";
import rutareserva from "./user/ruta.reserva";
import rutahistorial from "./admin/ruta.historial";
import { verificarToken} from "../middleware/oauth";

const rutas = Router();
// rutas admin
rutas.use("/admin", rutaregistro);
rutas.use("/admin",verificarToken, rutacomputador);
rutas.use("/admin",verificarToken, rutaaccesorio);
rutas.use("/admin",verificarToken, rutasancion);
rutas.use("/admin",verificarToken, rutaretiro);
rutas.use("/admin",verificarToken, rutahistorial);


// rutas user

rutas.use("/user", rutareserva);

export default rutas;