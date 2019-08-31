const mongoose = require('mongoose');

const curriculoSchema = new mongoose.Schema({
    vaga: String,
    perfil: {
        nome: String,
        idade: String,
        dataDeNascimento: String,
        estadoCivil: String,
        nacionalidade: String
    },
    contato: {
        cep: String,
        endereco: String,
        numero: String,
        complemento: String,
        bairro: String,
        cidade: String,
        estado: String,
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
    idiomas: Array,
            // {
            //     idioma: String,
            //     nivelDeFluencia: String
            //     instituicao: String
            // }
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