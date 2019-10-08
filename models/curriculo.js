const mongoose = require('mongoose');

const curriculoSchema = new mongoose.Schema({
    vaga: {
        type: String,
        required: true
    },
    perfil: {
        nome: {
            type: String,
            required: true
        },
        idade: {
            type: String,
            required: true
        },
        dataDeNascimento: {
            type: String,
            required: true
        }
    },
    contato: {
        cep: {
            type: String,
            required: true
        },
        endereco: {
            type: String,
            required: true
        },
        numero: {
            type: String,
            required: true
        },
        complemento: {
            type: String,
            required: false
        },
        bairro: {
            type: String,
            required: true
        },
        cidade: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true
        },
        telefone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    formacao: {
        type: Array,
        required: true
    },
        // {
        //     titulo: String,
        //     instituicao: String,
        //     inicioDaFormacao: String,
        //     fimDaFormacao: String,
        //     comentarios: String
        // }
    idiomas: {
        type: Array,
        required: true
    },
            // {
            //     idioma: String,
            //     nivelDeFluencia: String
            //     instituicao: String
            // }
    experiencias: {
        type: Array,
        required: true
    },
        // {
        //     cargo: String,
        //     empresa: String,
        //     inicioDaExperiencia: String,
        //     fimDaExperiencia: String,
        //     descricao: String
        // }
    informacoesAdicionais: {
        type: String,
        required: false
    },
    arquivado: {
        type: Boolean,
        required: true,
        default: false
    },
    pontuacao: {
        type: Number,
        required: true
    }
});

const Curriculo = mongoose.model('Curriculo', curriculoSchema);

module.exports = Curriculo;