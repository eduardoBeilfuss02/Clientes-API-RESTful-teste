function buscarClientes() {
    console.log("teste")
    fetch('http://localhost:3000/clientes')
      .then(response => response.json())
      .then(data => {
        document.getElementById('resultadoGetTodos').innerText = JSON.stringify(data, null, 2);
      })
      .catch(error => {
        console.error('Erro ao buscar clientes:', error);
        document.getElementById('resultadoGetTodos').innerText = 'Erro ao buscar clientes';
      });
  }
  
  function buscarClientePorId() {
    const id = document.getElementById('buscarClienteId').value;
    fetch(`http://localhost:3000/clientes/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Cliente não encontrado');
        return response.json();
      })
      .then(data => {
        document.getElementById('resultadoGetPorId').innerText = JSON.stringify(data, null, 2);
      })
      .catch(error => {
        console.error('Erro ao buscar cliente:', error);
        document.getElementById('resultadoGetPorId').innerText = 'Erro ao buscar cliente';
      });
  }
  
  function criarCliente() {
    const cliente = {
      nome: document.getElementById('nome').value,
      endereco: document.getElementById('endereco').value,
      cep: document.getElementById('cep').value,
      data_nascimento: document.getElementById('dataNascimento').value,
      telefone: document.getElementById('telefone').value
    };
  
    fetch('http://localhost:3000/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById('resultadoPost').innerText = JSON.stringify(data, null, 2);
      })
      .catch(error => {
        console.error('Erro ao criar cliente:', error);
        document.getElementById('resultadoPost').innerText = 'Erro ao criar cliente';
      });
  }
  
  function atualizarCliente() {
    const id = document.getElementById('atualizarClienteId').value;
    const dadosAtualizados = { telefone: document.getElementById('novoTelefone').value };
  
    fetch(`http://localhost:3000/clientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosAtualizados)
    })
      .then(response => {
        if (!response.ok) throw new Error('Cliente não encontrado');
        return response.json();
      })
      .then(data => {
        document.getElementById('resultadoPut').innerText = JSON.stringify(data, null, 2);
      })
      .catch(error => {
        console.error('Erro ao atualizar cliente:', error);
        document.getElementById('resultadoPut').innerText = 'Erro ao atualizar cliente';
      });
  }
  
  function deletarCliente() {
    const id = document.getElementById('deletarClienteId').value;
  
    fetch(`http://localhost:3000/clientes/${id}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          document.getElementById('resultadoDelete').innerText = `Cliente com ID ${id} deletado com sucesso.`;
        } else {
          throw new Error('Cliente não encontrado');
        }
      })
      .catch(error => {
        console.error('Erro ao deletar cliente:', error);
        document.getElementById('resultadoDelete').innerText = 'Erro ao deletar cliente';
      });
  }
  