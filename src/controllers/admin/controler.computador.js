import pool from "../../database/db";
import mensaje from "../../res/mensaje";

//  metodos 
const listarcomputador = async(req, res)=>{
    try {
        const [respuesta] = await pool.query(`CALL sp_listar_registro_computador();`);
        mensaje.success(req, res, 200,respuesta[0]);
    } catch (error) {
        mensaje.error(req, res, 500, "error al mostrar computadores")
    }
}
const agregarcomputador = async(req, res)=>{
    const {marca,modelo,area,estado,fecha} = req.body;


    if(!marca || !modelo || !area || !estado|| !fecha){
        mensaje.error(req, res, 400, "campos vacios");
        return;
    }

    try {
        const respuesta = await pool.query(`CALL sp_agregar_registro_computador('${marca}',
            '${modelo}',
            '${area}',
            '${estado}','${fecha}');`)
        if(respuesta[0].affectedRows==1){
            mensaje.success(req, res, 200, "computador agregado");
        }else{
            mensaje.error(req, res, 500, "error al agregar computador");
        }
    } catch (error) {
        mensaje.error(req, res, 500, "error al agregar computador");
    }
    
}

const modificarcomputador = async(req, res)=>{
    const {idcomputador,marca,modelo,area,estado,fecha} = req.body;
    
    try {
    const respuesta = await pool.query(`CALL sp_modificar_registro_computador('${idcomputador}','${marca}',
    '${modelo}',
    '${area}',
    '${estado}','${fecha}');`);
    if(respuesta[0].affectedRows==1){
        mensaje.success(req, res, 200, "computador modificado");
    }else{
        mensaje.error(req, res, 400, "error al modificar computador");
    }
    } catch (error) {
        mensaje.error(req, res, 500, "error al intentar modificar");
    }
}

const eleminarcomputador = async (req, res) => {
    const idcomputador = req.params.idcomputador;

    try {
        const respuesta = await pool.query('CALL sp_eliminar_registro_computador(?)', [idcomputador]);

        if (respuesta[0].affectedRows === 1) {
            mensaje.success(req, res, 200, "Computador eliminado");
        } else {
            mensaje.error(req, res, 400, "Error al eliminar computador");
        }
    } catch (error) {
        mensaje.error(req, res, 500, "Error al intentar eliminar");
    }
};


export const metodos ={
    agregarcomputador,
    listarcomputador,
    modificarcomputador,
    eleminarcomputador
}