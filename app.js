const express = require('express');
const bayerController = require('./controllers/bayerController');
const app = express();
const port = 3003;

app.set('view engine', 'ejs');

app.use("/public", express.static(__dirname + "/public"));

bayerController(app);

app.use((req, res, next) => {
    if (!req.secure)
        return res.redirect("submeterCurriculo");
    next();
});

app.listen(port, () => {
    console.log("Server online em http://localhost:" + port);
});
