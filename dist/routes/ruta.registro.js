"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controler = require("../controllers/controler.registro");
var _ruta = _interopRequireDefault(require("../routes/admin/ruta.sancion"));
var rutaregistro = (0, _express.Router)();
rutaregistro.post("/registro", _controler.metodos.agregarregistro);
rutaregistro.post("/login", _controler.metodos.login);
var _default = exports["default"] = rutaregistro;