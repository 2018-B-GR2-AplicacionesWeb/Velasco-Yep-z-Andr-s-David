// app.js

const node = require('./nodejs.js');
const runtime = require('./runtime'); // No es necesaria la extension
const so = require('./so');
const util = require('./util/util'); // Capertas mas adentro
//const na = require('../01-Variables'); // Carpetas mas arriba
const fs = require('fs'); // Modulos preinstalados en el node modules
const express = require('express'); // Modulos que se tienen que instalar
console.log(express);
console.log(fs);
console.log(node);
console.log(runtime);
console.log(so);
so.imprimir();

