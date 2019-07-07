const express = require('express');
const curriculoController = require('./controllers/curriculoController');

const app = express();

app.use("/public", express.static(__dirname + "/public"));

curriculoController(app);

app.listen(3000);
console.log("Ouvindo a porta 3000.");