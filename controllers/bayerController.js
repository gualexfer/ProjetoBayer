const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Curriculo = require('../models/curriculo');

mongoose.connect('mongodb+srv://bayer:bayer@cluster0-mfkxs.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

mongoose.set('useFindAndModify', false);

const urlencodedParser = bodyParser.urlencoded( {extended: true} );

module.exports = function(app) {
    app.get('/submeterCurriculo', function(req, res) {
        res.render('submeterCurriculo');
    });

    app.post('/submeterCurriculo', urlencodedParser, function(req, res) {
        let curriculo = req.body;
        console.log('-----recebido:-------')
        console.log(curriculo);

        Curriculo(curriculo).save(function(err) {
            if (err) throw err;
        });
        res.send("Seu currículo foi enviado com sucesso!");
    });

    app.get('/recrutador', function(req, res) {
        Curriculo.find({}, function(err, curriculos) {
            res.render('recrutador', {curriculos: curriculos});
        });
    });

    app.get('/curriculo/:id', function(req, res) {
        Curriculo.find({_id: req.params.id}, function(err, curriculo) {
            res.render('curriculo', {curriculo: curriculo});
        });
    })

    app.put('/curriculo/:id/arquivar', function(req, res) {
        Curriculo.findOneAndUpdate({_id: req.params.id}, {arquivado: true})
        .then(curriculo => {});
    });

    app.put('/curriculo/:id/desarquivar', function(req, res) {
        Curriculo.findOneAndUpdate({_id: req.params.id}, {arquivado: false})
        .then(curriculo => {});
    });

    app.delete('/curriculo/:id', function(req, res) {
        Curriculo.findByIdAndDelete({_id: req.params.id})
        .then(curriculo => {});
    });
}