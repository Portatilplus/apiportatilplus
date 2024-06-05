import pool from "../database/db";
import bcrypt from 'bcrypt';
import mensajes from "../res/mensaje";
import jwt from "jsonwebtoken"
import { config } from 'dotenv';
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
        // console.error("Error al agregar registro:", error);

        mensajes.error(req, res, 500, "error al agregar registro");
    }
}
// este es el de login




const login=async(req,res)=>{
    const {correo, contrasena} = req.body;


    if(!correo || !contrasena){
        mensajes.success(req, res, 200, "campos vacios");
        return;
    }
    
    try {
        const respuesta = await pool.query(`CALL sp_buscar_registro_usuario(?);`,[correo])
    if(respuesta[0][0]==0){
          mensajes.error(req, res, 401, "correo no existe");
          return;
    }

    const usuario = respuesta[0];
    const match = await bcrypt.compare(contrasena, respuesta[0][0][0].contrasena);
    if(!match){
        mensajes.error(req, res, 401, "contraseña incorrecta");
        return;
    }
    // const payload = {
    //     "usuario":usuario.correo,
    //     "contrasena":contrasena.contrasena
    // };
    // // token
    // const token= jwt.sign(payload, process.env.PRIVATE_KEY,
    //     {expiresIn:process.env.EXPIRES_IN}
    // );

    } catch (error) {
      mensajes.error(req, res, 500, "error en el login");
    }

}


export const metodos={
    agregarregistro,
    login
}