const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const Curriculo = require('../models/curriculo');
const client = twilio(
    'ACfc901094d69027fd211db4fcffc38bd2',
    '71d7b06c213f60cf12638c5dd2b6d6b4'
);

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
            client.messages
            .create({
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+55' + curriculo.contato.telefone,
                body: `Motivo: ${req.body.motivo}`
            })
            .then(message => {
                console.log("Mensagem enviada! SID da mensagem: " + message.sid)
            })
            .catch(err => {
                console.log(err);
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
            client.messages
            .create({
                from: 'whatsapp:+14155238886',
                to: 'whatsapp:+55' + curriculo.contato.telefone,
                body: `Motivo: ${req.body.motivo}`
            })
            .then(message => {
                console.log("Mensagem enviada! SID da mensagem: " + message.sid)
            })
            .catch(err => {
                console.log(err);
            });
            res.send(curriculo);
        });
    });
}