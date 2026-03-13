const form = document.querySelector("#formMensagem");
const input = document.querySelector("#mensagem");
const erro = document.querySelector("#erro");
const lista = document.querySelector("#lista");

let mensagens = [];

function validarTexto(texto) {
  const txt = texto.trim();

  if (txt === "") {
    erro.textContent = "A mensagem não pode estar vazia.";
    return false;
  }

  erro.textContent = "";
  return true;
}

function render() {
  lista.innerHTML = "";

  mensagens.forEach((msg, index) => {

    const li = document.createElement("li");

    const texto = document.createElement("span");
    texto.textContent = msg;

    const botaoEditar = document.createElement("button");
    botaoEditar.textContent = "Editar";

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";

    botaoEditar.addEventListener("click", () => {
      const novoTexto = prompt("Edite a tarefa:", msg);

      if (novoTexto !== null && novoTexto.trim() !== "") {
        mensagens[index] = novoTexto.trim();
        render();
      }
    });

    botaoExcluir.addEventListener("click", () => {
      mensagens.splice(index, 1);
      render();
    });

    li.appendChild(texto);
    li.appendChild(botaoEditar);
    li.appendChild(botaoExcluir);

    lista.appendChild(li);

  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const textoDigitado = input.value;

  if (!validarTexto(textoDigitado)) {
    return;
  }

  mensagens.push(textoDigitado.trim());

  render();

  input.value = "";
});