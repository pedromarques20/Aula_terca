const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Rota pra o método GET
app.get('/api/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    connection.query(sql, (err, results) => {
        if (err){
            console.error('Erro ao buscar registros: '+err.message);
            res.status(500).json({ error: 'Erro ao buscar registros'});
        } else {
            res.status(200).json(results);
        }
    });
});

// Rota para o método POST
app.post('/api/inserir-usuarios', (req, res) =>{
    const { id, email, senha } = req.body;

// Inserir dados na tabela 'usuario'
    const sql = 'INSERT INTO usuario (id, email, senha) VALUES (?, ?, ?)';
    connection.query(sql, [id, email, senha], (err, result) => {
        if (err){
            console.error('Erro ao buscar registro: '+err.message);
            res.status(500).json({ error: 'Erro ao buscar registro'});
        } else {
            console.log('Registro inserido com sucesso!');
            res.status(200).json({message: 'Registro inserido com sucesso' });
        }
    });
});

// Rota para o método PUT
app.put('/api/alterar-usuarios/:id', (req, res) => {
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

// Rota para o método DELETE
app.delete('/api/deletar-usuarios/:id', (req, res) => {
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

app.get('/acesso', (req, res) => {
    res.render('form')
});

app.listen(port, () => {
    console.log('Servidor rodando em http://localhost: ${port}');
});