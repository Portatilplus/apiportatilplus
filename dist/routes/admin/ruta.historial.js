"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controles = require("../../controllers/admin/controles.histroial");
var _oauth = require("../../middleware/oauth");
var rutahistorial = (0, _express.Router)();
rutahistorial.get("/historial", _controles.metodos.historial);
rutahistorial.get("/historial/:id", _controles.metodos.listarhistorial);
var _default = exports["default"] = rutahistorial;