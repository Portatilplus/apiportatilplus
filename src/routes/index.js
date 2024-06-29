import { Router } from "express";
import rutaregistro from "./ruta.registro";
import rutacomputador from "./admin/ruta.computador";
import rutaaccesorio from "./admin/ruta.accesorio";
import rutasancion from "./admin/ruta.sancion";
import rutaretiro from "./admin/ruta.retiro";
import rutareserva from "./user/ruta.reserva";
import rutahistorial from "./admin/ruta.historial";
import rutanota from "./admin/ruta.nota";

const rutas = Router();
// rutas admin
rutas.use("/" ,rutaregistro);
rutas.use("/admin" ,rutacomputador);
rutas.use("/admin",rutaaccesorio);
rutas.use("/admin",rutasancion);
rutas.use("/admin",rutaretiro);
rutas.use("/admin", rutahistorial);
rutas.use("/admin", rutanota);



// rutas user

rutas.use("/user", rutareserva);

export default rutas;