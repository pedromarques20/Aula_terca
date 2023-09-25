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

// Rota para o método PUT
app.put('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { email, senha } = req.body;

// Atualizar dados na tabela 'usuario'
    const sql = 'UPDATE usuario SET email = ?, senha = ? WHERE id = ?';
    connection.query(sql, [email, senha, id], (err, result) => {
        if (err){
            console.error('Erro ao atualizar registro: '+err.message);
            res.status(500).json({ error: 'Erro ao atualizar registro'});
        } else {
            console.log('Registro atualizado com sucesso!');
            res.status(200).json({message: 'Registro atualizado com sucesso' });
        }
    });
});

app.listen(port, () => {
    console.log('Servidor rodando em http://localhost: ${port}');
});