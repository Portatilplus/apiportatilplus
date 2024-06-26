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




// const autorole = async (req, res, next)=>{
//     try {
//         const rol = await pool.query(`CALL sp_roles()`)
//         if(rol === ' Admin'){
//            return mensajes.success(req, res,200, "admin");
//         }else if(rol==='Usuario'){
//            return mensajes.success(req, res,200, "Usuario");
//         }
//     } catch (error) {
//         return mensajes.error(req, res, 500, "error al verificar rol"); 
//     }

// }


