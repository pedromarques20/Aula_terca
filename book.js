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

// Simulando um "banco de dados"
let books = [
    {id: 1, title: 'Livro 1'},
    {id: 2, title: 'Livro 2'},
    {id: 3, title: 'Livro 3'}
];

// Rota pra o método GET
app.get('/', (req, res) => {
    res.json(books);
});

// Rota para adicionar um novo livro (método POST)
app.post('/post-example', (req, res) =>{
    const newBook = req.body;
    books.push(newBook);
    res.json(newBook);
});

// Rota para o método PUT
app.put('/update-book/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const newTitle = req.body.title;

    const bookToUpdate = books.find(book => book.id === bookId);

    if (bookToUpdate) {
        bookToUpdate.title = newTitle;
        res.json(bookToUpdate);
    } else {
        res.status(404).send('Livro não encontrado');
    }
});

// Rota para o método DELETE
app.delete('/delete-book/:id', (req, res) => {
    const bookId = parseInt(req.params.id);

    const indexToRemove = books.findIndex(book => book.id === bookId);

    if(indexToRemove !== -1){
        const removedBook = books.splice(indexToRemove, 1);
        res.json(removedBook[0]);
    } else {
        res.status(404).send('Livro não encontrado');
    }
});

app.listen(port, () => {
    console.log('Servidor rodando em http://localhost:${port}');
});