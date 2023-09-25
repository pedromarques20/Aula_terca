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

// Rota para o método DELETE
app.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;

// Excluir registro de dados na tabela 'usuario'
const sql = 'DELETE FROM usuario WHERE id = ?';
connection.query(sql, [id], (err, result) => {
    if (err){
        console.error('Erro ao excluir registro: '+err.message);
        res.status(500).json({ error: 'Erro ao excluir registro'});
    } else {
        if (result.affectedRows > 0) {
            console.log('Registro excluido com sucesso!');
            res.status(200).json({message: 'Registro excluido com sucesso' });
        } else {
            console.log('Registro não encontrado.');
            res.status(404).json({message: 'Registro não encontrado.' });
        }
    }
  });
});

app.listen(port, () => {
    console.log('Servidor rodando em http://localhost: ${port}');
});