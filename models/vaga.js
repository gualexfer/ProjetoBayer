const mongoose = require('mongoose');

const vagaSchema = new mongoose.Schema({
    nome: String
});

const Vaga = mongoose.model('Vaga', vagaSchema);

module.exports = Vaga;