const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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

        console.log(curriculo);
        Curriculo(curriculo).save(function(err) {
            if (err) throw err;
        });
        res.send("Seu currículo foi enviado com sucesso!");
    });

    app.get('/recrutador', function(req, res) {
        /*Curriculo.find({}, function(err, curriculos) {
            res.render('recrutador', {curriculos: curriculos});
        });*/
        Curriculo.find({}).then(curriculos => {
            Vaga.find({}).then(vagas => {
                res.render('recrutador', {curriculos, vagas});
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

    app.post('/recrutador/inserirVaga/:vaga', function(req, res) {
        let vaga = {
            nome: req.params.vaga
        }

        Vaga(vaga).save(function(err) {
            if (err) throw err;
        });

        res.send("Vaga cadastrada com sucesso!");
    });

    app.delete('/recrutador/deletarVaga/:id', function(req, res) {
        Vaga.findByIdAndDelete({_id: req.params.id})
        .then(vaga => {res.send(vaga)});
    });
}