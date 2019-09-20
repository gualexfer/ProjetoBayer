const mongoose = require('mongoose');

const vagaSchema = new mongoose.Schema({
    nome: String,
    palavrasChave: Array
});

const Vaga = mongoose.model('Vaga', vagaSchema);

module.exports = Vaga;