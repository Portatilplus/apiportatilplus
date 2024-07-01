import bcrypt from "bcrypt"
import pool from "../database/db.js";
import mensajes from "../res/mensaje";
import jwt from "jsonwebtoken";
import { config } from 'dotenv';
import { token } from "morgan";
config();



const agregarregistro =async(req, res)=>{
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const contrasenasincifrar = req.body.contrasena;
    const rol = req.body.rol;
    const contrasena = req.body.contrasena;

    

    if(!nombre || !apellido || !telefono || !telefono || !correo || !contrasena || !rol){
        mensajes.error(req, res, 400, "campos vacios");
        return;
    }
    try {
        const salt = await bcrypt.genSalt(5) ;
        const hash = await bcrypt.hash(contrasenasincifrar, salt );
        const contrasena = hash;

        const respuesta = await pool.query(`CALL sp_agregar_registro_usuario('${nombre}',
        '${apellido}',
        '${telefono}',
        '${correo}',
        '${contrasena}',
        '${rol}');`);


        // validar el campo de exitososo registro
        if(respuesta[0].affectedRows == 1){
            mensajes.success(req, res, 200, "usuario creado");
        }else{
            mensajes.error(req, res,400, "usuario no creado");
        }

        
    } catch (error) {

        mensajes.error(req, res, 500, "error al agregar registro");
    }
}
// este es el de login

const login = async(req, res)=>{
    const {correo, contrasena}  = req.body;
    

    if(!correo || !contrasena){
        mensajes.error(req, res, 401, "campos vacios");
        return;
    }
    try {
        // const rol = await pool.query(`CALL sp_roles();`, [correo]);
        const resultado = await pool.query(`CALL sp_login(?);`,[correo]);
        if (resultado[0][0]==0) {
            mensajes.error(req, res, np400, "Usuario no encontrado");
            return;
    }
        const contracorrecta = await bcrypt.compare(contrasena, resultado[0][0][0].contrasena);
        if (!contracorrecta) {
            mensajes.error(req, res, 400, "contraseña incorrecta");
            return;
        }else{
            const payload ={
                correo: resultado.correo
                // rol : resultado.rol
            }
            let token = jwt.sign(
                payload,
                process.env.PRIVATE_KEY,
                {expiresIn: process.env.EXPIRES_IN});
    
          mensajes.success(req, res, 200, {token});
        } 
        // // condicion rol
        // if (resultado.rol === 'Admin') {
        //     mensajes.success(req, res, 200, { token, "rol": "/dash" });
        // } else {
        //     mensajes.error(req, res, 403, "Acceso denegado");
        // }
        
        
    } catch (error) {
        mensajes.error(req, res, 500, "error al loguearse");
    }
}






export const metodos={
    agregarregistro,
    login
}


