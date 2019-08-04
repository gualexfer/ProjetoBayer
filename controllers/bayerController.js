const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Curriculo = require('../models/curriculo');

mongoose.connect('mongodb+srv://bayer:bayer@cluster0-mfkxs.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

const urlencodedParser = bodyParser.urlencoded( {extended: true} );

module.exports = function(app) {
    app.get('/submeterCurriculo', function(req, res) {
        res.render('submeterCurriculo');
    });

    app.post('/submeterCurriculo', urlencodedParser, function(req, res) {
        let curriculo = {
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
            informacoesAdicionais: req.body.informacoesAdicionais
        };

        for (let i = 0; req.body["idioma" + i] != undefined; ++i){
            curriculo.perfil.idiomas.push({idioma: req.body["idioma" + i], nivelDeFluencia: req.body["fluencia" + i]});
        }

        for (let i = 0; req.body["titulo" + i] != undefined; ++i){
            curriculo.formacao.push({titulo: req.body["titulo" + i], instituicao: req.body["instituicao" + i], inicioDaFormacao: req.body["inicioDaFormacao" + i], fimDaFormacao: req.body["fimDaFormacao" + i], comentarios: req.body["comentarios" + i]});
        }

        for (let i = 0; req.body["cargo" + i] != undefined; ++i){
            curriculo.experiencias.push({cargo: req.body["cargo" + i], empresa: req.body["empresa" + i], inicioDaExperiencia: req.body["inicioDaExperiencia" + i], fimDaExperiencia: req.body["fimDaExperiencia" + i], descricao: req.body["descricao" + i]});
        }

        let novoCurriculo = Curriculo(curriculo).save(function(err) {
            if (err) throw err;
        });
        res.send("Seu currículo foi enviado com sucesso!");
    });

    app.get('/recrutador', function(req, res) {
        Curriculo.find({}, function(err, curriculos) {
            res.render('recrutador', {curriculos: curriculos});
        });
    });

    app.put('/curriculo/:id', function(req, res) {
        Curriculo.findOneAndUpdate({_id: req.params.id}, {arquivado: true}).then(function(curriculo) {
        });
    });

    app.delete('/curriculo/:id', function(req, res) {
        Curriculo.findByIdAndDelete({_id: req.params.id}).then(function(curriculo) {
        });
    });
}