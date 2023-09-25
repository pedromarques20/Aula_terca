const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

//Configuração da conexão com o SQL
const connection = mysql.createConnection ({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database:'pedro'
});

// Conferir ERRO
connection.connect((err) => {
    if (err){
        console.error('Erro ao conectar ao MySQL: '+err.message);
    } else {
        console.log('Conectado ao MySQL');
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota pra o método GET
app.get('/api/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuario';
    connection.query(sql, (err, results) => {
        if (err){
            console.error('Erro ao buscar registros: '+err.message);
            res.status(500).json({ error: 'Erro ao buscar registros'});
        } else {
            res.status(200).json(results);
        }
    });
});

app.listen(port, () => {
    console.log('Servidor rodando em http://localhost: ${port}');
});