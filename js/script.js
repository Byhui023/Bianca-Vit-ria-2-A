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

    // BOTÃO CONCLUIR/DESFAZER (substitui o checkbox)
    const botaoConcluir = document.createElement("button");
    botaoConcluir.textContent = item.concluida ? "Desfazer" : "Concluir";
    botaoConcluir.classList.add("btn-status");
    botaoConcluir.style.backgroundColor = item.concluida ? "#ff9800" : "#4CAF50";
    botaoConcluir.style.color = "white";

    botaoConcluir.addEventListener("click", () => {
      item.concluida = !item.concluida;
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
    botaoEditar.classList.add("btn-editar");

    botaoEditar.addEventListener("click", () => {
      const estaEditando = botaoEditar.textContent === "Salvar";

      if (!estaEditando) {
        const inputEdicao = document.createElement("input");
        inputEdicao.type = "text";
        inputEdicao.value = item.texto;
        inputEdicao.classList.add("edit-input");

        li.replaceChild(inputEdicao, texto);
        botaoEditar.textContent = "Salvar";
        botaoExcluir.style.display = "none";
        botaoConcluir.style.display = "none";
      } else {
        const inputEdicao = li.querySelector(".edit-input");
        const novoTexto = inputEdicao.value.trim();

        if (novoTexto !== "") {
          item.texto = novoTexto;
        }

        render();
      }
    });

    // BOTÃO EXCLUIR
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.classList.add("btn-excluir");

    botaoExcluir.addEventListener("click", () => {
      mensagens.splice(index, 1);
      render();
    });

    // Montando o item
    li.appendChild(botaoConcluir);
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