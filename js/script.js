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

  for (const msg of mensagens) {
    const li = document.createElement("li");
    li.textContent = msg;
    lista.appendChild(li);
  }
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