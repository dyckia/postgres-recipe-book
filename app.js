const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      pg = require('pg'),
      app = express();

const connectionString = 'postgresql://Ostu:ottoman@localhost:5432/recipebookdb';

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
})