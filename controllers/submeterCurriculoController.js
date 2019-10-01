const bodyParser = require('body-parser');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2019-07-12',
  iam_apikey: 'wMVgjQjL7SJ8GfHy6BaddAmDrVsya51wnDP47l0YLB5h',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api'
});
const Curriculo = require('../models/curriculo');
const Vaga = require('../models/vaga');

const urlencodedParser = bodyParser.urlencoded( {extended: true} );

module.exports = function(app) {
    app.get('/submeterCurriculo', function(req, res) {
        Vaga.find({}).then(vagas => {
            res.render('submeterCurriculo', {vagas});
        });
    });

    app.post('/submeterCurriculo', urlencodedParser, function(req, res) {
        let curriculo = req.body;
 
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
}