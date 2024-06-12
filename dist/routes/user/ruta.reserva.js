"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _controles = _interopRequireDefault(require("../../controllers/user/controles.reservacion"));
var rutareserva = (0, _express.Router)();
rutareserva.post("/reserva", _controles["default"]);
var _default = exports["default"] = rutareserva;