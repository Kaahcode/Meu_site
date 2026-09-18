
// Classe e Lista

class Usuario {
    constructor(nome, idade, cpf, telefone, genero) {
        this.nome = nome;
        this.idade = idade;
        this.cpf = cpf;
        this.telefone = telefone;
        this.genero = genero;
    }

    // Método de formatar o texto
    mostrar() {
        return `Nome: ${this.nome} | Idade: ${this.idade} | CPF: ${this.cpf} | Telefone: ${this.telefone} | Gênero: ${this.genero}`;
    }
}

// Inicializa a lista carregando do navegador ou começando vazia []
let usuarios = JSON.parse(localStorage.getItem("usuarios_salvos")) || [];

// Controle de tela (FRONT-END)

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario-cadastro");
    const containerMensagem = document.getElementById("mensagem-container");
    const containerLista = document.getElementById("lista-usuarios-container");

    // Mostrar os usuários assim que abre a página
    atualizarTela(containerLista);

    if (formulario) {
        formulario.addEventListener("submit", (event) => {

            // Impede a página de recarregar
            event.preventDefault();

            // Pega os dados dos campos digitados no HTML
            const nome = document.getElementById("nome").value.trim();
            const idade = document.getElementById("idade").value.trim();
            const cpf = document.getElementById("cpf").value.trim();
            const telefone = document.getElementById("telefone").value.trim();
            const genero = document.getElementById("genero").value;

            // Cria a instância do novo usuário usando a classe
            const novoUsuario = new Usuario(nome, idade, cpf, telefone, genero);

            // Adiciona na lista igual ao seu usuarios.append() do Python
            usuarios.push(novoUsuario);

            // Salva na memória do navegador
            localStorage.setItem("usuarios_salvos", JSON.stringify(usuarios));

            // Exibe a mensagem de sucesso na tela
            containerMensagem.innerHTML = "<p style='color: green; font-weight: bold;'>Cadastrado com sucesso!</p>";

            // Limpa o formulário para o próximo cadastro
            formulario.reset();

            // Atualiza a lista na tela
            atualizarTela(containerLista);
        });
    }
});

// Funções de adicionar e remover
function atualizarTela(containerLista) {
    if (!containerLista) return;

    // Limpa a tela antes de redesenhar
    containerLista.innerHTML = "";

    if (usuarios.length === 0) {
        containerLista.innerHTML = "<p>Nenhum usuário cadastrado.</p>";
        return;
    }

    // Faz o papel do seu {% for usuario in usuarios %} 
    usuarios.forEach((user, indice) => {
        // Recria o objeto com a classe para poder usar o método .mostrar()
        const usuarioInstanciado = new Usuario(user.nome, user.idade, user.cpf, user.telefone, user.genero);

        const blocoUsuario = document.createElement("div");
        blocoUsuario.style.margin = "10px 0";
        blocoUsuario.style.padding = "10px";
        blocoUsuario.style.border = "1px solid #ccc";

        blocoUsuario.innerHTML = `
            <p>${usuarioInstanciado.mostrar()}</p>
            <!-- Botão que faz o papel da sua rota /remover/<indice> -->
            <button onclick="removerUsuario(${indice})" style="color: red; cursor: pointer; margin-top: 5px;">
                Remover
            </button>
        `;
        containerLista.appendChild(blocoUsuario);
    });
}

// Corresponder a rota
window.removerUsuario = function (indice) {

    // Remove o usuário da lista pelo índice igual ao seu usuarios.pop(indice)
    if (indice >= 0 && indice < usuarios.length) {
        usuarios.splice(indice, 1);

        // Atualiza a memória do navegador
        localStorage.setItem("usuarios_salvos", JSON.stringify(usuarios));

        // Atualiza a lista na tela na hora
        const containerLista = document.getElementById("lista-usuarios-container");
        atualizarTela(containerLista);
    }
};
