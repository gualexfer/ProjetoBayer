const express = require('express');
const mongoose = require('mongoose');
const curriculoController = require('./controllers/curriculoController');
const recrutadorController = require('./controllers/recrutadorController');
const submeterCurriculoController = require('./controllers/submeterCurriculoController');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use("/public", express.static(__dirname + "/public"));

mongoose.connect('mongodb+srv://bayer:bayer@cluster0-mfkxs.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

curriculoController(app);
recrutadorController(app);
submeterCurriculoController(app);

app.use((req, res, next) => {
    if (!req.secure)
        return res.redirect("submeterCurriculo");
    next();
});

app.listen(port, () => {
    console.log("Server online em http://localhost:" + port);
});
