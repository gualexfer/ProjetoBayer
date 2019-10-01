const Curriculo = require('../models/curriculo');

module.exports = function(app) {
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
}