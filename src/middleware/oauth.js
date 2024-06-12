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


// export const roles = async (req, res, next) => {
//     const {correo} = req.correo;

//     try {
//         const resultado = await pool.query(`CALL sp_roles(?);`,[correo]);
//         const urol = resultado[0][0].rol;


//         const rolesPermitidos = ['Admin', 'Instructor', 'Usuario'];
    
//         if(!rolesPermitidos.includes(urol)){
//             mensajes.error(req, res, 401, "no tienes permisos");
//             return;
//         }
//         next();
//     } catch (error) {
//         mensajes.error(req, res, 500, "error al verificar rol");
//         return;
//     }
// }




