"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metodos = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _db = _interopRequireDefault(require("../../database/db"));
var _mensaje = _interopRequireDefault(require("../../res/mensaje"));
var agregaraccesorio = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, numero_accesorio, nombre_accesorio, respuesta;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, numero_accesorio = _req$body.numero_accesorio, nombre_accesorio = _req$body.nombre_accesorio;
          if (!(!numero_accesorio || !nombre_accesorio)) {
            _context.next = 4;
            break;
          }
          _mensaje["default"].error(req, res, 400, "faltan datos");
          return _context.abrupt("return");
        case 4:
          _context.prev = 4;
          _context.next = 7;
          return _db["default"].query("CALL sp_agregar_accesorios('".concat(numero_accesorio, "','").concat(nombre_accesorio, "');"));
        case 7:
          respuesta = _context.sent;
          if (respuesta[0].affectedRows == 1) {
            _mensaje["default"].success(req, res, 200, "accesorio creado");
          } else {
            _mensaje["default"].error(req, res, 400, "accesorio no creado");
          }
          _context.next = 14;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](4);
          _mensaje["default"].error(req, res, 500, "error al agregar accesorio");
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 11]]);
  }));
  return function agregaraccesorio(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var listaraccesorio = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var respuesta;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _db["default"].query("CALL sp_listar_accesorios();");
        case 3:
          respuesta = _context2.sent;
          _mensaje["default"].success(req, res, 200, respuesta[0][0][0]);
          _context2.next = 10;
          break;
        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          _mensaje["default"].error(req, res, 500, "error al mostrar");
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function listaraccesorio(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var modificaraccesorio = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body2, id_accesorio, numero_accesorio, nombre_accesorio, respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, id_accesorio = _req$body2.id_accesorio, numero_accesorio = _req$body2.numero_accesorio, nombre_accesorio = _req$body2.nombre_accesorio;
          _context3.prev = 1;
          _context3.next = 4;
          return _db["default"].query("CALL sp_modificar_accesorios('".concat(id_accesorio, "','").concat(numero_accesorio, "','").concat(nombre_accesorio, "')"));
        case 4:
          respuesta = _context3.sent;
          if (respuesta[0].affectedRows == 1) {
            _mensaje["default"].success(req, res, 200, "accesorio modificado");
          } else {
            _mensaje["default"].error(req, res, 400, "accesorio no modificado");
          }
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          _mensaje["default"].error(req, res, 500, "error al modificar accesorio");
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return function modificaraccesorio(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var eliminaraccesorio = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id_accesorio, respuesta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id_accesorio = req.params.id_accesorio;
          _context4.prev = 1;
          _context4.next = 4;
          return _db["default"].query("CALL sp_eliminar_accesorio(?);", [id_accesorio]);
        case 4:
          respuesta = _context4.sent;
          if (respuesta[0].affectedRows == 1) {
            _mensaje["default"].success(req, res, 200, "accesorio eliminado");
          } else {
            _mensaje["default"].error(req, res, 400, "accesorio no eliminado");
          }
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          _mensaje["default"].error(req, res, 500, "error al elminar");
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 8]]);
  }));
  return function eliminaraccesorio(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var metodos = exports.metodos = {
  agregaraccesorio: agregaraccesorio,
  listaraccesorio: listaraccesorio,
  modificaraccesorio: modificaraccesorio,
  eliminaraccesorio: eliminaraccesorio
};