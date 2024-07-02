import swaggerAutogen from "swagger-autogen";
import { config } from "dotenv";
config();

let port = process.env.PORT || 3000;

const doc = {
  info: {
    title: "BACKEND",
    description: "manejo de usuarios",
  },
  host: "localhost:" + port + "/admin",
};
// crea un archivo de tipo json
const outputFile = "../swagger-output.json";
const routes = [
  "../routes/admin/ruta.accesorio.js",
  "../routes/admin/ruta.computador.js",
  "../routes/admin/ruta.historial.js",
  "../routes/admin/ruta.nota.js",
  "../routes/admin/ruta.retiro.js",
  "../routes/admin/ruta.sancion.js",
  "../routes/user/ruta.reserva.js",
  "../routes/ruta.registro.js",
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile,routes,doc);