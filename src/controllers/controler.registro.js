import bcryptjs from 'bcryptjs';
import pool from "../database/db";
import mensajes from "../res/mensaje";
import jwt from "jsonwebtoken"




const agregarregistro =async(req, res)=>{
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const contrasenasincifrar = req.body.contrasena;
    const rol = req.body.rol;
    try {
        const salt = await bcryptjs.genSalt(5) ;
        const hash = await bcryptjs.hash(contrasenasincifrar, salt );
        const contrasena = hash;

        const respuesta = await pool.query(`CALL sp_agregar_registro_usuario('${nombre}',
        '${apellido}',
        '${telefono}',
        '${correo}',
        '${contrasena}',
        '${rol}');`);
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
    
    // validar
    try {
        const respuesta = await pool.query(`CALL sp_buscar_registro_usuario(?);`,[correo])
    if(respuesta[0][0]==0){
          mensajes.error(req, res, 401, "correo no existe");
          return;
    }
    const match = await bcryptjs.compare(contrasena, respuesta[0][0][0].contrasena);
    console.log(match);
    // if(!match){
    //     mensajes.error(req, res, 401, "contraseña incorrecta");
    //     return;
    // }

    } catch (error) {
      mensajes.error(req, res, 500, "error en el login");
    }

}


export const metodos={
    agregarregistro,
    login
}