const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      {Client} = require('pg'),
      app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    const client = new Client({
        user: 'Ostu',
        host: 'localhost',
        database: 'recipebookdb',
        password: '12345',
        port: 5432,
    });
    client.connect();
    client.query('SELECT * FROM recipes', (err, result) => {
        res.render('index', {recipes: result.rows});
        client.end();
    });
});

app.post('/add', (req, res) => {
    const client = new Client({
        user: 'Ostu',
        host: 'localhost',
        database: 'recipebookdb',
        password: '12345',
        port: 5432,
    });
    client.connect();
    client.query('INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)',
                 [req.body.name, req.body.ingredients, req.body.directions],
                 (err, result) => {
        res.redirect('/');
        client.end();
    });
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
})