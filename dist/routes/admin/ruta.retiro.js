"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controler = require("../../controllers/admin/controler.retiro");
var _oauth = require("../../middleware/oauth");
var rutaretiro = (0, _express.Router)();
rutaretiro.get("/retiro", _controler.metodos.listarretiro);
rutaretiro.post("/retiro", _controler.metodos.agregarretiro);
rutaretiro.put("/retiro/", _controler.metodos.modificarretiro);
rutaretiro["delete"]("/retiro/:id_retiro", _controler.metodos.eliminarretiro);
var _default = exports["default"] = rutaretiro;