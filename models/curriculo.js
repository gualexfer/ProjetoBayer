const mongoose = require('mongoose');

const curriculoSchema = new mongoose.Schema({
    perfil: {
        nome: String,
        idade: String,
        estadoCivil: String,
        nacionalidade: String,
        idiomas: Array
            //     idioma: String,
            //     nivelDeFluencia: String
    },
    contato: {
        endereco: String,
        telefone: String,
        email: String,
        website: String
    },
    formacao: Array
        // {
        //     titulo: String,
        //     instituicao: String,
        //     inicioDaFormacao: String,
        //     fimDaFormacao: String,
        //     comentarios: String
        // }
    ,
    experiencias: Array
        // {
        //     cargo: String,
        //     empresa: String,
        //     inicioDaExperiencia: String,
        //     fimDaExperiencia: String,
        //     descricao: String
        // }
    ,
    informacoesAdicionais: String,
    arquivado: {
        type: Boolean,
        default: false
    }
});

const Curriculo = mongoose.model('Curriculo', curriculoSchema);

module.exports = Curriculo;