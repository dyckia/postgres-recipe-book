const express = require('express'),
      path = require('path'),
      bodyParser = require('body-parser'),
      {Client} = require('pg'),
      app = express();

app.set('view engine', 'ejs');
app.set('view options', {rmWhitespace: true});
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
    client.query('SELECT * FROM recipes ORDER BY id', (err, result) => {
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

app.delete('/delete/:id', (req, res) => {
    const client = new Client({
        user: 'Ostu',
        host: 'localhost',
        database: 'recipebookdb',
        password: '12345',
        port: 5432,
    });
    client.connect();
    client.query('DELETE FROM recipes WHERE id = $1',
        [req.params.id],
        (err, result) => {
            res.sendStatus(200);
            client.end();
        });
});

app.post('/edit/:id', (req, res) => {
    const client = new Client({
        user: 'Ostu',
        host: 'localhost',
        database: 'recipebookdb',
        password: '12345',
        port: 5432,
    });
    client.connect();
    client.query('UPDATE recipes SET name=$1, ingredients=$2, directions=$3 WHERE id=$4',
        [req.body.name, req.body.ingredients, req.body.directions, req.params.id],
        (err, result) => {
            res.redirect('/');
            client.end();
        });
});

app.listen(3000, () => {
    console.log("server is listening on port 3000");
});