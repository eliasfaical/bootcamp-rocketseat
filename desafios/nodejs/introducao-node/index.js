const express = require('express');
const server = express();

// Informa ao express que nossa aplicação vai utilizar JSON
server.use(express.json());

// Middlewares
server.use((req, res, next) => {
  console.log(`Metodo: ${req.method}; URL: ${req.url}`);
  return next();
});

// Middleware que checa se a informação enviada está correta
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'Nome de usuário obrigatório' });
  }
  return next();
}

// Middleware que checa se a informação enviada existe
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: 'Usuário não existe' });
  }

  req.user = user;

  return next();
}

// Array de usuários
const users = ['Elias', 'José', 'Faiçal', 'Junior'];

// Retorna um usuário com a posição
server.get('/users/:index', checkUserInArray, (req, res) => {
  // const { index } = req.params;
  return res.json(req.user);
});

// Lista todos os usuários
server.get('/users', (req, res) => {
  return res.json(users);
});

// Adicionando usuário
server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

// Alterando o usuário
server.put('/users/:index', checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;
  return res.json(users);
});

// Deletando usuário
server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  // Metodo splice remove um item do array
  users.splice(index, 1);
  return res.send();
});

server.listen(3000);