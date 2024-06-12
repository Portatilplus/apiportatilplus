"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verificarToken = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _mensaje = _interopRequireDefault(require("../res/mensaje"));
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var verificarToken = exports.verificarToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, verificado;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          token = req.headers["x-access-token"];
          if (token) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", _mensaje["default"].success(req, res, 401, "acceso denegado"));
        case 3:
          _context.prev = 3;
          _context.next = 6;
          return _jsonwebtoken["default"].verify(token, process.env.PRIVATE_KEY);
        case 6:
          verificado = _context.sent;
          next();
          _context.next = 13;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](3);
          return _context.abrupt("return", _mensaje["default"].error(req, res, 400, "token no valido"));
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 10]]);
  }));
  return function verificarToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

// export const roles = async (req, res, next) => {
//     const {correo} = req.correo;

//     try {
//         const resultado = await pool.query(`CALL sp_roles(?);`,[correo]);
//         const urol = resultado[0][0].rol;

//         const rolesPermitidos = ['Admin', 'Instructor', 'Usuario'];

//         if(!rolesPermitidos.includes(urol)){
//             mensajes.error(req, res, 401, "no tienes permisos");
//             return;
//         }
//         next();
//     } catch (error) {
//         mensajes.error(req, res, 500, "error al verificar rol");
//         return;
//     }
// }