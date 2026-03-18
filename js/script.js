// Pegando os elementos do HTML
const form = document.querySelector("#formMensagem");
const input = document.querySelector("#mensagem");
const erro = document.querySelector("#erro");
const lista = document.querySelector("#lista");

// Agora cada tarefa será um objeto com texto + status (concluído ou não)
let mensagens = [];

// Função para validar o texto digitado
function validarTexto(texto) {
  const txt = texto.trim();

  if (txt === "") {
    erro.textContent = "A mensagem não pode estar vazia.";
    return false;
  }

  erro.textContent = "";
  return true;
}

// Função responsável por desenhar a lista na tela
function render() {
  lista.innerHTML = ""; // limpa a lista antes de redesenhar

  mensagens.forEach((item, index) => {

    const li = document.createElement("li");

    // CHECKBOX (nova funcionalidade)
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.concluida;

    // Quando clicar, muda o status da tarefa
    checkbox.addEventListener("change", () => {
      item.concluida = checkbox.checked;
      render();
    });

    // TEXTO da tarefa
    const texto = document.createElement("span");
    texto.textContent = item.texto;

    // Se estiver concluída, aplica estilo riscado
    if (item.concluida) {
      texto.classList.add("concluida");
    }

    // BOTÃO EDITAR
    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";

    botaoEditar.addEventListener("click", () => {
      const novoTexto = prompt("Edite a tarefa:", item.texto);

      if (novoTexto !== null && novoTexto.trim() !== "") {
        item.texto = novoTexto.trim();
        render();
      }
    });

    // BOTÃO EXCLUIR
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";

    botaoExcluir.addEventListener("click", () => {
      mensagens.splice(index, 1);
      render();
    });

    // Montando o item
    li.appendChild(checkbox);
    li.appendChild(texto);
    li.appendChild(botaoEditar);
    li.appendChild(botaoExcluir);

    lista.appendChild(li);
  });
}

// Evento de envio do formulário
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const textoDigitado = input.value;

  if (!validarTexto(textoDigitado)) {
    return;
  }

  // Agora salvamos como objeto
  mensagens.push({
    texto: textoDigitado.trim(),
    concluida: false
  });

  render();

  input.value = "";
});