import jwt from "jsonwebtoken";
import mensajes from "../res/mensaje";
import { config } from "dotenv";
config();

export const verificarToken =async (req, res, next) => {
    const token = req.headers["x-access-token"]

    if(!token){
       return mensajes.success(req, res, 401, "acceso denegado");
    }

    try {
        const verificado = await jwt.verify(token, process.env.PRIVATE_KEY);
        next();
    } catch (error) {
        return mensajes.error(req, res, 400, "token no valido");
    }
}


// export const roles = (...rolesPermitidos) => {
//   return async (req, res, next) => {
//     const { correo } = req.correo;

//     try {
//       const resultado = await pool.query(`CALL sp_roles('${correo}')`);
//       const userRol = resultado[0][0].rol;

//       if (!rolesPermitidos.includes(userRol)) {
//         return mensajes.error(req, res, 403, "Acceso denegado");
//       }

//       next();
//     } catch (error) {
//       return mensajes.error(req, res, 500, "Error al verificar rol");
//     }
//   };
// };




