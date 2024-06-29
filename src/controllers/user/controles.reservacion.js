import pool from "../../database/db";
import mensaje from "../../res/mensaje";



// const reservacion = async (req, res) => {
//     // TIENE QUE HACER QUE EL USUARIO RESREVE LOS COMPUTADORES Y EN ESE MOMENTO DE DARLE CLICK AHI TAMBIEN SE 
//     // SE TIENE QUE HACER QUE EL ESTADO DE ESE COMPUTADOR PASE A RESERVADO
//     const {nombre, id_accesorio, id_registro_computador, estado, fecha} = req.body;

//     // primeramente se tienen que mostrar los computadores disponibles
//     // despues se tienen que mostrar los accesorios disponibles
//     try {
//         const disponiblescompu = await pool.query(`CALL sp_mostrar_computadores();`);
//         if(disponiblescompu.length == 0 || disponiblescompu[0].estado !== 'Disponible'){
//             return mensaje.error(req,res, 400, "computador no disponible");
//         }
//         // accesosrio
//         const disponiblesacce = await pool.query(`CALL sp_mostrar_accesorios();`);
//         if(disponiblesacce.length == 0 || disponiblesacce[0].estado !== 'Disponible'){
//             return mensaje.error(req,res, 400, "computador no disponible");
//         }

//         // realizar reserva

//         const respuesta = await pool.query(`CALL sp_realizar_reserva(?,?,?,?,?);`, [nombre,id_accesorio,id_registro_computador, estado, fecha]);
//         if(respuesta[0].affectedRows == 1){
//            return mensaje.success(req, res, 200, "reserva realizada");
//         }else{
//             return mensaje.error(req, res, 400, "error al realizar reserva");
//         }
//     } catch (error) {
//         mensaje.error(req, res, 400, "error al realizar reserva");
        
//     }
    

    
// }

const reservacion = async (req, res) => {
    const { nombre, id_accesorio, id_registro_computador, fecha } = req.body;

    try {
        // Verificar si el computador está disponible
        const [computadorDisponible] = await pool.query(`CALL sp_verificar_disponibilidad_computador(?);`, [id_registro_computador]);
        if (computadorDisponible.length === 0 || computadorDisponible[0].estado !== 'Disponible') {
            return mensaje.error(req, res, 400, "Computador no disponible");
        }

        // Verificar si el accesorio está disponible (si se proporcionó)
        if (id_accesorio) {
            const [accesorioDisponible] = await pool.query(`CALL sp_verificar_disponibilidad_accesorio(?);`, [id_accesorio]);
            if (accesorioDisponible.length === 0 || accesorioDisponible[0].estado !== 'Disponible') {
                return mensaje.error(req, res, 400, "Accesorio no disponible");
            }
        }

        // Realizar la reserva
        const [respuesta] = await pool.query(`CALL sp_realizar_reserva(?, ?, ?, ?, ?);`, [nombre, id_accesorio, id_registro_computador, 'Reservado', fecha]);
        if (respuesta.affectedRows === 1) {
            return mensaje.success(req, res, 200, "Reserva realizada");
        } else {
            return mensaje.error(req, res, 400, "Error al realizar reserva");
        }
    } catch (error) {
        console.error(error);
        return mensaje.error(req, res, 500, "Error al realizar reserva");
    }
}


export default reservacion;