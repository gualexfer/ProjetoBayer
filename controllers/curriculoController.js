const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://bayer:bayer@cluster0-mfkxs.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

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
});

const Curriculo = mongoose.model('Curriculo', curriculoSchema);
/*let curriculoUm = Curriculo({
    perfil: {
        nome: "Gustavo",
        idade: "21",
        estadoCivil: "Solteiro",
        nacionalidade: "brasileiro",
        idiomas: [
            {
                idioma: "Inglês",
                nivelDeFluencia: "Fluente"
            },
            {
                idioma: "Japonês",
                nivelDeFluencia: "Básico"
            }
        ]
    }
}).save(function(err) {
    if (err) throw err;
    console.log('salvei seu curriculo!');
});*/

const urlencodedParser = bodyParser.urlencoded( {extended: true} );

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../html', 'index.html'));
    });

    app.post('/enviarCurriculo', urlencodedParser, function(req, res) {
        let curriculoTeste = {
            perfil: {
                nome: req.body.nome,
                idade: req.body.idade,
                estadoCivil: req.body.estadoCivil,
                nacionalidade: req.body.nacionalidade,
                idiomas: [

                ]
            },
            contato: {
                endereco: req.body.endereco,
                telefone: req.body.telefone,
                email: req.body.email,
                website: req.body.website
            },
            formacao: [
                
            ],
            experiencias: [
                
            ],
            informacoesAdicionais: String
        };

        for (let i = 0; req.body["idioma" + i] != undefined; ++i){
            curriculoTeste.perfil.idiomas.push({idioma: req.body["idioma" + i], nivelDeFluencia: req.body["fluencia" + i]});
        }

        for (let i = 0; req.body["titulo" + i] != undefined; ++i){
            curriculoTeste.formacao.push({titulo: req.body["titulo" + i], instituicao: req.body["instituicao" + i], inicioDaFormacao: req.body["inicioDaFormacao" + i], fimDaFormacao: req.body["fimDaFormacao" + i], comentarios: req.body["comentarios" + i]});
        }

        for (let i = 0; req.body["cargo" + i] != undefined; ++i){
            curriculoTeste.experiencias.push({cargo: req.body["cargo" + i], empresa: req.body["empresa" + i], inicioDaExperiencia: req.body["inicioDaExperiencia" + i], fimDaExperiencia: req.body["fimDaExperiencia" + i], descricao: req.body["descricao" + i]});
        }

        let novoCurriculo = Curriculo(curriculoTeste).save(function(err) {
            if (err) throw err;
            console.log("Salvei seu currículo!");
        });
        console.log(req.body);
        res.sendFile(path.join(__dirname, '../html', 'curriculo-enviado.html'));
    });
}