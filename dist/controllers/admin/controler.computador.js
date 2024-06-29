"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metodos = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _db = _interopRequireDefault(require("../../database/db"));
var _mensaje = _interopRequireDefault(require("../../res/mensaje"));
//  metodos 
var listarcomputador = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _yield$pool$query, _yield$pool$query2, respuesta;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _db["default"].query("CALL sp_listar_registro_computador();");
        case 3:
          _yield$pool$query = _context.sent;
          _yield$pool$query2 = (0, _slicedToArray2["default"])(_yield$pool$query, 1);
          respuesta = _yield$pool$query2[0];
          _mensaje["default"].success(req, res, 200, respuesta[0]);
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          _mensaje["default"].error(req, res, 500, "error al mostrar computadores");
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function listarcomputador(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var agregarcomputador = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, marca, modelo, area, estado, fecha, respuesta;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, marca = _req$body.marca, modelo = _req$body.modelo, area = _req$body.area, estado = _req$body.estado, fecha = _req$body.fecha;
          if (!(!marca || !modelo || !area || !estado || !fecha)) {
            _context2.next = 4;
            break;
          }
          _mensaje["default"].error(req, res, 400, "campos vacios");
          return _context2.abrupt("return");
        case 4:
          _context2.prev = 4;
          _context2.next = 7;
          return _db["default"].query("CALL sp_agregar_registro_computador('".concat(marca, "',\n            '").concat(modelo, "',\n            '").concat(area, "',\n            '").concat(estado, "','").concat(fecha, "');"));
        case 7:
          respuesta = _context2.sent;
          if (respuesta[0].affectedRows == 1) {
            _mensaje["default"].success(req, res, 200, "computador agregado");
          } else {
            _mensaje["default"].error(req, res, 500, "error al agregar computador");
          }
          _context2.next = 14;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](4);
          _mensaje["default"].error(req, res, 500, "error al agregar computador");
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[4, 11]]);
  }));
  return function agregarcomputador(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var modificarcomputador = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body2, idcomputador, marca, modelo, area, estado, fecha, respuesta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, idcomputador = _req$body2.idcomputador, marca = _req$body2.marca, modelo = _req$body2.modelo, area = _req$body2.area, estado = _req$body2.estado, fecha = _req$body2.fecha;
          _context3.prev = 1;
          _context3.next = 4;
          return _db["default"].query("CALL sp_modificar_registro_computador('".concat(idcomputador, "','").concat(marca, "',\n    '").concat(modelo, "',\n    '").concat(area, "',\n    '").concat(estado, "','").concat(fecha, "');"));
        case 4:
          respuesta = _context3.sent;
          if (respuesta[0].affectedRows == 1) {
            _mensaje["default"].success(req, res, 200, "computador modificado");
          } else {
            _mensaje["default"].error(req, res, 400, "error al modificar computador");
          }
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          _mensaje["default"].error(req, res, 500, "error al intentar modificar");
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return function modificarcomputador(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var eleminarcomputador = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var idcomputador, respuesta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          idcomputador = req.params.idcomputador;
          _context4.prev = 1;
          _context4.next = 4;
          return _db["default"].query('CALL sp_eliminar_registro_computador(?)', [idcomputador]);
        case 4:
          respuesta = _context4.sent;
          if (respuesta[0].affectedRows === 1) {
            _mensaje["default"].success(req, res, 200, "Computador eliminado");
          } else {
            _mensaje["default"].error(req, res, 400, "Error al eliminar computador");
          }
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          _mensaje["default"].error(req, res, 500, "Error al intentar eliminar");
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 8]]);
  }));
  return function eleminarcomputador(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var metodos = exports.metodos = {
  agregarcomputador: agregarcomputador,
  listarcomputador: listarcomputador,
  modificarcomputador: modificarcomputador,
  eleminarcomputador: eleminarcomputador
};