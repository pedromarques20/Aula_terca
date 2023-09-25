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

// Rota para o método POST
app.post('/api/usuarios', (req, res) =>{
    const { id, email, senha } = req.body;

// Inserir dados na tabela 'usuario'
    const sql = 'INSERT INTO usuario (id, email, senha) VALUES (?, ?, ?)';
    connection.query(sql, [id, email, senha], (err, result) => {
        if (err){
            console.error('Erro ao buscar registro: '+err.message);
            res.status(500).json({ error: 'Erro ao buscar registro'});
        } else {
            console.log('Registro inserido com sucesso!');
            res.status(201).json({message: 'Registro inserido com sucesso' });
        }
    });
});

app.listen(port, () => {
    console.log('Servidor rodando em http://localhost: ${port}');
});