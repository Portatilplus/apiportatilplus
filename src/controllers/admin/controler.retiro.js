import pool  from "../../database/db";
import mensaje from "../../res/mensaje";


const agregarretiro=async(req, res)=>{
    const {id_registro, fecha} = req.body;
    
    if(!id_registro ||!fecha){
        mensaje.error(req, res, 400, "faltan datos");
        return;
    }

    try {
        const respuesta = await pool.query(`CALL sp_agregar_retiro('${id_registro}','${fecha}');`)
        if(respuesta[0].affectedRows == 1){
            mensaje.success(req, res, 200, "retiro creado");
        }else{
            mensaje.error(req, res, 400, "retiro no creado");
        }
    } catch (error) {
        mensaje.error(req,res, 500, "error al agregar retiro");
    }
}

const listarretiro=async(req, res)=>{
    try {
        const respuesta = await pool.query(`CALL sp_listar_retiro();`);
        mensaje.success(req, res, 200, respuesta[0]);
    } catch (error) {
        mensaje.error(req, res, 500, "error al mostrar retiros");
    }
} 
const modificarretiro=async(req, res)=>{
    const {id_retiro, id_registro, fecha} = req.body;
    try {
        const respuesta = await pool.query(`CALL sp_modificar_retiro('${id_retiro}','${id_registro}','${fecha}')`)
        if(respuesta[0].affectedRows == 1){
            mensaje.success(req, res, 200, "retiro modificado");
        }else{
            mensaje.error(req, res, 400, "retiro no modificado");
        }
    } catch (error) {
        mensaje.error(req,res, 500, "error al modificar retiro");
    }
}  
const eliminarretiro=async(req, res)=>{
    const {id_retiro} = req.body;
    try {
        const respuesta = await pool.query(`CALL sp_eliminar_retiro(${id_retiro});`);
        if(respuesta[0].affectedRows == 1){
            mensaje.success(req, res, 200, "retiro eliminado");
        }else{
            mensaje.error(req, res, 400, "retiro no eliminado");
        }
    } catch (error) {
        mensaje.error(req, res, 500, "error al elminar retiro");
    }
}

export const metodos ={
    agregarretiro,
    listarretiro,
    modificarretiro,
    eliminarretiro
}