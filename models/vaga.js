const mongoose = require('mongoose');

const vagaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    palavrasChave: {
        type: Array,
        required: true
    }
});

const Vaga = mongoose.model('Vaga', vagaSchema);

module.exports = Vaga;