import { Router } from "express";
import rutaregistro from "./ruta.registro";
import rutacomputador from "./admin/ruta.computador";
import rutaaccesorio from "./admin/ruta.accesorio";
import rutasancion from "./admin/ruta.sancion";
import rutaretiro from "./admin/ruta.retiro";

const rutas = Router();

rutas.use("/api", rutaregistro);
rutas.use("/api", rutacomputador);
rutas.use("/api", rutaaccesorio);
rutas.use("/api", rutasancion);
rutas.use("/api", rutaretiro);

export default rutas;