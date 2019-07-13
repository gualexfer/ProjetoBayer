const express = require('express');
const bayerController = require('./controllers/bayerController');

const app = express();
app.set('view engine', 'ejs');

app.use("/public", express.static(__dirname + "/public"));

bayerController(app);

app.listen(3000, function() {
    console.log("Ouvindo a porta 3000.");
});
