const express = require('express');
const server = express();

server.use(express.json());

const projects = [];

// Listar todos os projetos
server.get('/projects', (req, res) => {
  return res.json(projects);
});

// lista um projeto
server.get('/projects/:index', (req, res) => {
  const { index } = req.params;
  return res.json(index);
});

// Adicionar projeto
server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  
  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project);

  return res.json(project);
});

// Alterar projeto
server.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.title = title;
  
  return res.json(projects);
});

// Deletando projeto
server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  projects.splice(id, 1);

  return res.send();
});

server.listen(3000);