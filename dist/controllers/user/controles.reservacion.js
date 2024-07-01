"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _db = _interopRequireDefault(require("../../database/db"));
var _mensaje = _interopRequireDefault(require("../../res/mensaje"));
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

var reservacion = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, nombre, id_accesorio, id_registro_computador, estado, fecha, _yield$pool$query, _yield$pool$query2, computadorDisponible, _yield$pool$query3, _yield$pool$query4, accesorioDisponible, _yield$pool$query5, _yield$pool$query6, respuesta;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, nombre = _req$body.nombre, id_accesorio = _req$body.id_accesorio, id_registro_computador = _req$body.id_registro_computador, estado = _req$body.estado, fecha = _req$body.fecha;
          _context.prev = 1;
          _context.next = 4;
          return _db["default"].query("CALL \tsp_mostrar_computadores(?);", [id_registro_computador]);
        case 4:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          computadorDisponible = _yield$pool$query2[0];
          if (!(computadorDisponible.length === 0 || computadorDisponible[0].estado !== 'Disponible')) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", _mensaje["default"].error(req, res, 400, "Computador no disponible"));
        case 9:
          if (!id_accesorio) {
            _context.next = 17;
            break;
          }
          _context.next = 12;
          return _db["default"].query("CALL sp_mostrar_accesorios(?);", [id_accesorio]);
        case 12:
          _yield$pool$query3 = _context.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          accesorioDisponible = _yield$pool$query4[0];
          if (!(accesorioDisponible.length === 0 || accesorioDisponible[0].estado !== 'Disponible')) {
            _context.next = 17;
            break;
          }
          return _context.abrupt("return", _mensaje["default"].error(req, res, 400, "Accesorio no disponible"));
        case 17:
          _context.next = 19;
          return _db["default"].query("CALL sp_realizar_reserva(?, ?, ?, ?, ?);", [nombre, id_accesorio, id_registro_computador, 'Reservado', fecha]);
        case 19:
          _yield$pool$query5 = _context.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          respuesta = _yield$pool$query6[0];
          if (!(respuesta.affectedRows === 1)) {
            _context.next = 26;
            break;
          }
          return _context.abrupt("return", _mensaje["default"].success(req, res, 200, "Reserva realizada"));
        case 26:
          return _context.abrupt("return", _mensaje["default"].error(req, res, 400, "Error al realizar reserva"));
        case 27:
          _context.next = 33;
          break;
        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);
          return _context.abrupt("return", _mensaje["default"].error(req, res, 500, "Error al realizar reserva"));
        case 33:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 29]]);
  }));
  return function reservacion(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = reservacion;