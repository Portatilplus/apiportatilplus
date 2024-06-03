import pool from "../../database/db";
import mensaje from "../../res/mensaje";

const agregarsancion =async(req, res)=>{
    const {id_registro, motivo} = req.body;

    if(!id_registro ||!motivo){
        mensaje.error(req, res, 400, "faltan datos");
        return;
    }

    try {
        const respuesta = await pool.query(`CALL sp_agregar_sancion('${id_registro}','${motivo}');`)
        if(respuesta[0].affectedRows == 1){
            mensaje.success(req, res, 200, "sancion agregada");
        }else{
            mensaje.error(req, res, 400, "sancion no agregada");
        }
    } catch (error) {
        mensaje.error(req,res, 500, "error al agregar sancion");
    }
}
const listarsancion =async(req, res)=>{
    try {
        const respuesta = await pool.query(`CALL sp_listar_sanciones();`);
        mensaje.success(req, res, 200, respuesta[0]);
    } catch (error) {
        mensaje.error(req, res, 500, "error al mostrar");
    }
} 
const modificarsancion =async(req, res)=>{
    const {id_sancion, id_registro, motivo} = req.body;
    try {
        const respuesta = await pool.query(`CALL sp_modificar_sancion('${id_sancion}','${id_registro}','${motivo}')`)
        if(respuesta[0].affectedRows == 1){
            mensaje.success(req, res, 200, "sancion modificada");
        }else{
            mensaje.error(req, res, 400, "sancion no modificada");
        }
    } catch (error) {
        mensaje.error(req,res, 500, "error al modificar la sancion");
    }
}  
const eliminarsancion =async(req, res)=>{
    const {id_sancion} = req.body;
    try {
        const respuesta = await pool.query(`CALL sp_eliminar_sancion(${id_sancion});`);
        if(respuesta[0].affectedRows == 1){
            mensaje.success(req, res, 200, "sancion eliminada");
        }else{
            mensaje.error(req, res, 400, "sancion no eliminada");
        }
    } catch (error) {
        mensaje.error(req, res, 500, "error al elminar sancion");
    }
}

export const metodos ={
    agregarsancion,
    listarsancion,
    modificarsancion,
    eliminarsancion
}