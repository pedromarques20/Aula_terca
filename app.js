// Importando o Módulo do Express
const express = require('express');

// Criando um objeto do Express
const app = express();

// Resgatando os dados da requisição
app.get('/clientes', (req, res)=>{
    res.send('Clientes')
    res.end() 
})

// Resgatando os dados da requisição
app.get('/usuarios', (req, res)=>{
    res.send('Usuários')
    res.end() 
})

// Resgatando os dados da requisição
app.get('/', (req, res)=>{
    res.send('Ninhos no comando do mundo')
    res.end() 
})

// Numero da Porta 
const PORT = process.env.PORT||5001;

//Executar o Servicor Node
app.listen(PORT,console.log(
'Server started on port ${PORT}'));