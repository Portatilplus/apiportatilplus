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
var reservacion = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, nombre, id_registro_computador, fecha, _yield$pool$query, _yield$pool$query2, computadordispo, _yield$pool$query3, _yield$pool$query4, reservacionResult, _yield$pool$query5, _yield$pool$query6, modificarCompuResult;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, nombre = _req$body.nombre, id_registro_computador = _req$body.id_registro_computador, fecha = _req$body.fecha;
          if (!(!nombre || !id_registro_computador || !fecha)) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", _mensaje["default"].error(req, res, 400, "Campos vacíos"));
        case 3:
          _context.prev = 3;
          _context.next = 6;
          return _db["default"].query('START TRANSACTION');
        case 6:
          _context.next = 8;
          return _db["default"].query("CALL sp_mostrar_computadores(?)", [id_registro_computador]);
        case 8:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          computadordispo = _yield$pool$query2[0];
          if (!(computadordispo.length === 0 || computadordispo[0].disponible !== 1)) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", _mensaje["default"].error(req, res, 404, "Computador no disponible"));
        case 13:
          _context.next = 15;
          return _db["default"].query("CALL sp_realizar_reserva(?, ?, ?);", [nombre, id_registro_computador, fecha]);
        case 15:
          _yield$pool$query3 = _context.sent;
          _yield$pool$query4 = (0, _slicedToArray2["default"])(_yield$pool$query3, 1);
          reservacionResult = _yield$pool$query4[0];
          if (!(reservacionResult.affectedRows === 1)) {
            _context.next = 35;
            break;
          }
          _context.next = 21;
          return _db["default"].query("CALL sp_modificar_disponibilidad(?);", [id_registro_computador]);
        case 21:
          _yield$pool$query5 = _context.sent;
          _yield$pool$query6 = (0, _slicedToArray2["default"])(_yield$pool$query5, 1);
          modificarCompuResult = _yield$pool$query6[0];
          if (!(modificarCompuResult.affectedRows === 1)) {
            _context.next = 30;
            break;
          }
          _context.next = 27;
          return _db["default"].query('COMMIT');
        case 27:
          return _context.abrupt("return", _mensaje["default"].success(req, res, 201, 'Reserva realizada exitosamente'));
        case 30:
          _context.next = 32;
          return _db["default"].query('ROLLBACK');
        case 32:
          return _context.abrupt("return", _mensaje["default"].error(req, res, 400, "Error al modificar disponibilidad"));
        case 33:
          _context.next = 38;
          break;
        case 35:
          _context.next = 37;
          return _db["default"].query('ROLLBACK');
        case 37:
          return _context.abrupt("return", _mensaje["default"].error(req, res, 400, "Reservación no exitosa"));
        case 38:
          _context.next = 45;
          break;
        case 40:
          _context.prev = 40;
          _context.t0 = _context["catch"](3);
          _context.next = 44;
          return _db["default"].query('ROLLBACK');
        case 44:
          return _context.abrupt("return", _mensaje["default"].error(req, res, 500, "Error en la reservación"));
        case 45:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 40]]);
  }));
  return function reservacion(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var _default = exports["default"] = reservacion;