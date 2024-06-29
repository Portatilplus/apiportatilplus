"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controler = require("../../controllers/admin/controler.accesorio");
var _oauth = require("../../middleware/oauth");
var rutaaccesorio = (0, _express.Router)();
rutaaccesorio.get("/accesorio", _controler.metodos.listaraccesorio);
rutaaccesorio.post("/accesorio", _controler.metodos.agregaraccesorio);
rutaaccesorio.put("/accesorio/", _controler.metodos.modificaraccesorio);
rutaaccesorio["delete"]("/accesorio/:id_accesorio", _controler.metodos.eliminaraccesorio);
var _default = exports["default"] = rutaaccesorio;