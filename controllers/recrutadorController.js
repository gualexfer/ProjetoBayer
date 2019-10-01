const bodyParser = require('body-parser');
const Curriculo = require('../models/curriculo');
const Vaga = require('../models/vaga');

const urlencodedParser = bodyParser.urlencoded( {extended: true} );

module.exports = function(app) {
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