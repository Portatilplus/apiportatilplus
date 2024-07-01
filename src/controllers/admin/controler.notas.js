import pool from "../../database/db";
import mensaje from "../../res/mensaje";


const agregarnotas = async(req, res)=>{
    const {tarea,notas, prioridad, estado}= req.body;

    try {
        const respuesta = await pool.query(`CALL sp_agregar_notas('${tarea}','${notas}','${prioridad}','${estado}');`)
    if(respuesta[0].affectedRows == 1){
        mensaje.success(req, res, 200, "Notas agregadas");
    }else{
        mensaje.error(req, res, 400, "Notas no agregadas");
    }
    } catch (error) {
        mensaje.error(req, res, 400, "Notas no agregadas");    
    }

}

const listarnotas = async(req, res)=>{
    try {
        const respuesta = await pool.query(`CALL sp_listar_notas();`);
        mensaje.success(req, res, 200, respuesta[0]);
    } catch (error) {
        mensaje.error(req, res, 500, "Error al mostrar");
    }
 
}

const modificarnotas = async(req, res)=>{
    const {idnotas, notas} = req.body;

    try {
        const respuesta = await pool.query(`CALL sp_editar_notas(?,?);`,[idnotas, notas])
        if(respuesta[0].affectedRows == 1){
            mensaje.success(req, res, 200, "Notas modificadas");
        }else{
            mensaje.error(req, res, 400, "Notas no modificadas");
        }
    } catch (error) {
        mensaje.error(req, res, 400, "error");
    }
}
const eliminarnotas = async(req, res)=>{
    const idnotas = req.body.idnotas;
    try {
        const respuesta = await pool.query(`CALL sp_aliminar_notas(${idnotas});`);
        if(respuesta[0].affectedRows == 1){
            mensaje.success(req, res, 200, "Notas eliminadas");
        }else{
            mensaje.error(req, res, 400, "Notas no eliminadas");
        }
    } catch (error) {
        mensaje.error(req, res, 400, "error al eliminar");
    }
}

export const metod = {
    agregarnotas,
    listarnotas,
    modificarnotas,
    eliminarnotas
}