const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Configurar conexão com o MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'pedro'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ' + err.message);
  } else {
    console.log('Conectado ao MySQL');
  }
});

// Middleware para lidar com dados codificados no corpo da solicitação
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota pra o método GET
app.get('/api/usuarios', (req, res) => {
    const sql = 'SELECT * FROM usuario';
    connection.query(sql, (err, result) => {
        if (err){
            console.error('Erro ao buscar registros: '+err.message);
            res.status(500).json({ error: 'Erro ao buscar registros'});
        } else {
            res.status(201).json(result);
        }
    });
});

// Rota para o método POST
app.post('/api/inserir-usuarios', (req, res) =>{
    const { id, nome, cpf, email, idade } = req.body;

// Inserir dados na tabela 'usuario'
    const sql = 'INSERT INTO usuario (id, nome, cpf, email, idade) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [id, nome, cpf, email, idade], (err, result) => {
        if (err){
            console.error('Erro ao inserir registro: '+err.message);
            res.status(500).json({ error: 'Erro ao inserir registro'});
        } else {
            console.log('Registro inserido com sucesso!');
            res.status(200).json({message: 'Registro inserido com sucesso' });
        }
    });
});

// Rota para o método PUT
app.put('/api/alterar-usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, cpf, email, idade } = req.body;

// Atualizar dados na tabela 'usuario'
    const sql = 'UPDATE usuario SET nome = ?, cpf = ?, email = ?, idade = ? WHERE id = ?';
    connection.query(sql, [nome, cpf, email, idade, id], (err, result) => {
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

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});