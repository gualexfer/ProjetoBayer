const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const Curriculo = require('../models/curriculo');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bayeremailsprojeto@gmail.com',
        pass: 'Bayer12345'
    } 
});

let mailOptions = {
    from: 'bayeremailsprojeto@gmail.com',
    to: '',
    subject: 'Bayer - Feedback do processo seletivo',
    text: ''
}

const urlencodedParser = bodyParser.urlencoded( {extended: true} );

module.exports = function(app) {
    app.get('/curriculo/:id', function(req, res) {
        Curriculo.find({_id: req.params.id}, function(err, curriculo) {
            res.render('curriculo', {curriculo: curriculo});
        });
    })
 
    app.put('/curriculo/:id/arquivar', urlencodedParser, function(req, res) {
        Curriculo.findOneAndUpdate({_id: req.params.id}, {arquivado: true})
        .then(curriculo => {
            mailOptions.to = curriculo.contato.email;
            mailOptions.text = `Motivo: ${req.body.motivo}`;
            transporter.sendMail(mailOptions, function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("E-mail de feedback enviado!");
                }
            });
            res.send(curriculo);
        });
    });
 
    app.put('/curriculo/:id/desarquivar', function(req, res) {
        Curriculo.findOneAndUpdate({_id: req.params.id}, {arquivado: false})
        .then(curriculo => {res.send(curriculo)});
    });
 
    app.delete('/curriculo/:id', urlencodedParser, function(req, res) {
        Curriculo.findByIdAndDelete({_id: req.params.id})
        .then(curriculo => {
            mailOptions.to = curriculo.contato.email;
            mailOptions.text = `Motivo: ${req.body.motivo}.`;
            transporter.sendMail(mailOptions, function(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("E-mail de feedback enviado!");
                }
            });
            res.send(curriculo);
        });
    });
}