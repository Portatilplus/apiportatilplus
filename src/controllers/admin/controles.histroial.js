import pool from "../../database/db";
import mensaje from "../../res/mensaje";


// historial completo
const historial = async(req, res)=>{
    try {
        const respuesta = await pool.query(`CALL sp_historial_usuarios();`);
        mensaje.success(req, res, 200, respuesta[0]);
    } catch (error) {
        mensaje.error(req, res, 500, "error en el historial");
    }
}


// historial especifico
const listarhistorial = async(req, res)=>{
    const {id_reserva} = req.params;

    try {
        const respuesta = await pool.query(`CALL sp_listar_historial(?);`,[id_reserva]);
        mensaje.success(req, res, 200, respuesta[0]);
    } catch (error) {
        mensaje.error(req, res, 500, "error en listar historial");
    }
}



export const metodos = {
    historial,
    listarhistorial
}