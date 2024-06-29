"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controler = require("../../controllers/admin/controler.computador");
var _oauth = require("../../middleware/oauth");
var rutacomputador = (0, _express.Router)();
rutacomputador.get("/computador", _controler.metodos.listarcomputador);
rutacomputador.post("/computador", _controler.metodos.agregarcomputador);
rutacomputador.put("/computador/", _controler.metodos.modificarcomputador);
rutacomputador["delete"]("/computador/:idcomputador", _controler.metodos.eleminarcomputador);
var _default = exports["default"] = rutacomputador;