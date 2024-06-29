"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controler = require("../../controllers/admin/controler.sancion");
var _oauth = require("../../middleware/oauth");
var rutasancion = (0, _express.Router)();
rutasancion.get("/sancion", _controler.metodos.listarsancion);
rutasancion.post("/sancion", _controler.metodos.agregarsancion);
rutasancion.put("/sancion", _controler.metodos.modificarsancion);
rutasancion["delete"]("/sancion/:id_sancion", _controler.metodos.eliminarsancion);
var _default = exports["default"] = rutasancion;