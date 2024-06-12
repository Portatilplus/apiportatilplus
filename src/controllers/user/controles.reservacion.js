import pool from "../../database/db";
import mensaje from "../../res/mensaje";



const reservacion = async (req, res) => {
    const { nombre, id_registro_computador, fecha } = req.body;

    if (!nombre || !id_registro_computador || !fecha) {
        return mensaje.error(req, res, 400, "Campos vacíos");
    }

    try {
        await pool.query('START TRANSACTION');

        const [computadordispo] = await pool.query(`CALL sp_mostrar_computadores(?)`, [id_registro_computador]);

        if (computadordispo.length === 0 || computadordispo[0].disponible !== 1) {
            return mensaje.error(req, res, 404, "Computador no disponible");
        }

        const [reservacionResult] = await pool.query(`CALL sp_realizar_reserva(?, ?, ?);`, [nombre, id_registro_computador, fecha]);

        if (reservacionResult.affectedRows === 1) {
            const [modificarCompuResult] = await pool.query(`CALL sp_modificar_disponibilidad(?);`, [id_registro_computador]);

            if (modificarCompuResult.affectedRows === 1) {
                await pool.query('COMMIT');
                return mensaje.success(req, res, 201, 'Reserva realizada exitosamente');
            } else {
                await pool.query('ROLLBACK');
                return mensaje.error(req, res, 400, "Error al modificar disponibilidad");
            }
        } else {
            await pool.query('ROLLBACK');
            return mensaje.error(req, res, 400, "Reservación no exitosa");
        }
    } catch (error) {
        await pool.query('ROLLBACK');
        return mensaje.error(req, res, 500, "Error en la reservación");
    }
}



export default reservacion;