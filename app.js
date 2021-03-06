// load dot env variables
require('dotenv').config()

const express = require('express'),
      bodyParser = require('body-parser'),
      {Client} = require('pg'),
      app = express(),
      favicon = require('serve-favicon');

app.set('view engine', 'ejs');
app.set('view options', {rmWhitespace: true});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(favicon(__dirname + '/public/images/favicon.ico'));

// some constant variables
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const SSL = process.env.SSL == 'true';

// READ recipe
app.get('/', (req, res) => {
    const client = new Client({
        connectionString: DATABASE_URL,
        ssl: SSL,
    });
    client.connect();
    client.query('SELECT * FROM recipes ORDER BY id', (err, result) => {
        res.render('index', {recipes: result.rows});
        client.end();
    });
});

// CREATE recipe
app.post('/add', (req, res) => {
    const client = new Client({
        connectionString: DATABASE_URL,
        ssl: SSL,
    });
    client.connect();
    client.query('INSERT INTO recipes(name, imgurl, ingredients, directions) VALUES($1, $2, $3, $4)',
        [req.body.name, req.body.imgurl, req.body.ingredients, req.body.directions],
                 (err, result) => {
        res.redirect('/');
        client.end();
    });
});


// UPDATE recipe
app.post('/edit/:id', (req, res) => {
    const client = new Client({
        connectionString: DATABASE_URL,
        ssl: SSL,
    });
    client.connect();
    client.query('UPDATE recipes SET name=$1, imgurl=$2, ingredients=$3, directions=$4 WHERE id=$5',
        [req.body.name, req.body.imgurl, req.body.ingredients, req.body.directions, req.params.id],
        (err, result) => {
            res.redirect('/');
            client.end();
        });
});

// DELETE recipe
app.delete('/delete/:id', (req, res) => {
    const client = new Client({
        connectionString: DATABASE_URL,
        ssl: SSL,
    });
    client.connect();
    client.query('DELETE FROM recipes WHERE id = $1',
        [req.params.id],
        (err, result) => {
            res.sendStatus(200);
            client.end();
        });
});

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});