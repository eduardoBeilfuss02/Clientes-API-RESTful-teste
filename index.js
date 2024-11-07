// Importação das bibliotecas necessárias
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(cors());

// Configuração para processar requisições com JSON
app.use(express.json());

// Função auxiliar para carregar dados do arquivo JSON
const carregarClientes = () => {
  const dados = fs.readFileSync('./clientes.json', 'utf-8');
  return JSON.parse(dados);
};

// Função auxiliar para salvar dados no arquivo JSON
const salvarClientes = (dados) => {
  fs.writeFileSync('./clientes.json', JSON.stringify(dados, null, 2));
};

// Rota GET para obter todos os clientes
app.get('/clientes', (req, res) => {
  const clientes = carregarClientes();
  res.json(clientes);
});

// Rota GET para obter um cliente específico pelo ID
app.get('/clientes/:id', (req, res) => {
  const clientes = carregarClientes();
  const cliente = clientes.find(c => c.cliente_id == req.params.id);
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ mensagem: "Cliente não encontrado." });
  }
});

// Rota POST para adicionar um novo cliente
app.post('/clientes', (req, res) => {
  const clientes = carregarClientes();
  const novoCliente = {
    cliente_id: clientes.length ? clientes[clientes.length - 1].cliente_id + 1 : 1,
    ...req.body
  };
  clientes.push(novoCliente);
  salvarClientes(clientes);
  res.status(201).json(novoCliente);
});

// Rota PUT para atualizar as informações de um cliente pelo ID
app.put('/clientes/:id', (req, res) => {
  const clientes = carregarClientes();
  const clienteIndex = clientes.findIndex(c => c.cliente_id == req.params.id);
  
  if (clienteIndex !== -1) {
    clientes[clienteIndex] = { ...clientes[clienteIndex], ...req.body };
    salvarClientes(clientes);
    res.json(clientes[clienteIndex]);
  } else {
    res.status(404).json({ mensagem: "Cliente não encontrado." });
  }
});

// Rota DELETE para remover um cliente pelo ID
app.delete('/clientes/:id', (req, res) => {
  const clientes = carregarClientes();
  const novoArrayClientes = clientes.filter(c => c.cliente_id != req.params.id);
  
  if (clientes.length !== novoArrayClientes.length) {
    salvarClientes(novoArrayClientes);
    res.status(204).end();
  } else {
    res.status(404).json({ mensagem: "Cliente não encontrado." });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
