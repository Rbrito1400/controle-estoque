let produtos = JSON.parse(localStorage.getItem('estoque')) || [];

const form = document.getElementById('estoque-form');
const lista = document.getElementById('estoque-lista');

function salvar() {
  localStorage.setItem('estoque', JSON.stringify(produtos));
  render();
}

function render() {
  lista.innerHTML = '';
  produtos.forEach((item, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.quantidade}</td>
      <td>${item.categoria}</td>
      <td>
        <button class="edit" onclick="editar(${index})">Editar</button>
        <button class="delete" onclick="excluir(${index})">Excluir</button>
      </td>
    `;

    lista.appendChild(row);
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const quantidade = document.getElementById('quantidade').value;
  const categoria = document.getElementById('categoria').value;

  produtos.push({ nome, quantidade, categoria });
  salvar();

  form.reset();
});

function excluir(index) {
  if (confirm('Deseja realmente excluir este item?')) {
    produtos.splice(index, 1);
    salvar();
  }
}

function editar(index) {
  const item = produtos[index];
  const novoNome = prompt("Editar nome:", item.nome);
  const novaQuantidade = prompt("Editar quantidade:", item.quantidade);
  const novaCategoria = prompt("Editar categoria:", item.categoria);

  if (novoNome && novaQuantidade && novaCategoria) {
    produtos[index] = {
      nome: novoNome,
      quantidade: novaQuantidade,
      categoria: novaCategoria
    };
    salvar();
  }
}

render();
