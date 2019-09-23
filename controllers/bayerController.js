const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2019-07-12',
  iam_apikey: 'wMVgjQjL7SJ8GfHy6BaddAmDrVsya51wnDP47l0YLB5h',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api'
});
const Curriculo = require('../models/curriculo');
const Vaga = require('../models/vaga');
 
mongoose.connect('mongodb+srv://bayer:bayer@cluster0-mfkxs.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
 
mongoose.set('useFindAndModify', false);
 
const urlencodedParser = bodyParser.urlencoded( {extended: true} );
 
module.exports = function(app) {
    app.get('/submeterCurriculo', function(req, res) {
        Vaga.find({}).then(vagas => {
            res.render('submeterCurriculo', {vagas});
        });
    });
 
    app.post('/submeterCurriculo', urlencodedParser, function(req, res) {
        let curriculo = req.body;
 
        //console.log(curriculo);
 
        const analyzeParams = {
            'text': JSON.stringify(curriculo),
            'features': {
              'categories': {
                'limit': 3
              },
              'entities': {
                'model': 'cf16677c-8d0a-4d39-890d-027b23f8db0e'
              }
            }
        };
 
        naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
 
            let pontuacao = 0;
            const entidades = [...analysisResults.entities];
 
            entidades.forEach(entidade => {
                if (entidade.type == "Relevancia") {
                    pontuacao++;
                }
            });
 
            curriculo.pontuacao = pontuacao;
        })
        .then(() => {
            Curriculo(curriculo).save(function(err) {
                if (err) console.log("error: ", err);
            });
            res.send("Seu currículo foi enviado com sucesso!");
        })
        .catch(err => {
            console.log('error:', err);
        });
    });
 
    app.get('/recrutador', function(req, res) {
        let arquivados = [], naoArquivados = [];
 
        Curriculo.find({}).then(curriculos => {
            curriculos.forEach(curriculo => {
                if (curriculo.arquivado)
                    arquivados.push(curriculo)
                else
                    naoArquivados.push(curriculo);
            });
 
            arquivados.sort(function (a, b) {
                return b.pontuacao - a.pontuacao;
            });
 
            naoArquivados.sort(function (a, b) {
                return b.pontuacao - a.pontuacao;
            });
 
            Vaga.find({}).then(vagas => {
                vagas.sort(function(a, b) {
                    return a.nome.toLowerCase() > b.nome.toLowerCase();
                });
                res.render('recrutador', {arquivados, naoArquivados, vagas});
            });
        });
    });
 
    app.get('/curriculo/:id', function(req, res) {
        Curriculo.find({_id: req.params.id}, function(err, curriculo) {
            res.render('curriculo', {curriculo: curriculo});
        });
    })
 
    app.put('/curriculo/:id/arquivar', function(req, res) {
        Curriculo.findOneAndUpdate({_id: req.params.id}, {arquivado: true})
        .then(curriculo => {res.send(curriculo)});
    });
 
    app.put('/curriculo/:id/desarquivar', function(req, res) {
        Curriculo.findOneAndUpdate({_id: req.params.id}, {arquivado: false})
        .then(curriculo => {res.send(curriculo)});
    });
 
    app.delete('/curriculo/:id', function(req, res) {
        Curriculo.findByIdAndDelete({_id: req.params.id})
        .then(curriculo => {res.send(curriculo)});
    });
 
    app.post('/recrutador/inserirVaga/', urlencodedParser, function(req, res) {
 
        const vaga = req.body;
 
        Vaga(vaga).save(function(err) {
            if (err) throw err;
        })
        .then(vaga => {res.send(vaga)});
    });
 
    app.delete('/recrutador/deletarVaga/:id', function(req, res) {
        Vaga.findByIdAndDelete({_id: req.params.id})
        .then(vaga => {res.send(vaga)});
    });
}