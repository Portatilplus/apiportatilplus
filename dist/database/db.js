"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _promise = require("mysql2/promise");
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var pool = (0, _promise.createPool)({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  port: process.env.MYSQLPORT,
  database: process.env.MYSQLDATABASE
});
var _default = exports["default"] = pool;