// Array para armazenar os nomes dos amigos
let amigos = [];

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    let input = document.getElementById("amigo");
    let nome = input.value.trim(); // Remove espaços extras

    // Validação: Campo vazio
    if (nome === "") {
        alert("Por favor, insira um nome.");
        return;
    }

    // Validação: Nome duplicado
    if (amigos.includes(nome)) {
        alert("Este nome já foi adicionado.");
        return;
    }

    amigos.push(nome); // Adiciona o nome ao array
    atualizarLista(); // Atualiza a exibição da lista
    input.value = ""; // Limpa o campo de entrada
}

// Função para atualizar a lista de amigos na tela
function atualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; // Limpa a lista antes de recriá-la

    amigos.forEach(nome => {
        let item = document.createElement("li");
        item.textContent = nome;
        lista.appendChild(item);
    });
}

// Função para sortear o amigo secreto
function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Adicione pelo menos 2 amigos para realizar o sorteio.");
        return;
    }

    let sorteio = [...amigos]; // Clona a lista original
    let resultado = [];

    for (let i = 0; i < amigos.length; i++) {
        let amigoDisponivel = sorteio.filter(a => a !== amigos[i]); // Remove a opção do próprio nome

        if (amigoDisponivel.length === 0) {
            alert("Sorteio inválido. Reiniciando...");
            sortearAmigo(); // Se não houver opção válida, refaz o sorteio
            return;
        }

        let sorteado = amigoDisponivel[Math.floor(Math.random() * amigoDisponivel.length)];
        resultado.push(`${amigos[i]} → ${sorteado}`);
        sorteio.splice(sorteio.indexOf(sorteado), 1); // Remove o sorteado da lista
    }

    exibirSorteio(resultado);
}

// Função para exibir o resultado do sorteio
function exibirSorteio(resultado) {
    const listaResultado = document.getElementById("resultado");
    listaResultado.innerHTML = "";

    resultado.forEach(par => {
        const item = document.createElement("li");
        item.textContent = par;
        listaResultado.appendChild(item);
    });
}

// Função para reiniciar o sorteio e limpar tudo
function reiniciarSorteio() {
    amigos = []; // Zera a lista de amigos
    document.getElementById("listaAmigos").innerHTML = ""; // Limpa a lista na tela
    document.getElementById("resultado").innerHTML = ""; // Limpa os resultados na tela
}