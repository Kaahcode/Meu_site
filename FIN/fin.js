
// Classe 

class Despesa {
    constructor(descricao, categoria, valor) {
        this.descricao = descricao;
        this.categoria = categoria;
        this.valor = valor;
    }
}

class ControleDespesa {
    constructor() {
        // Carrega as despesas já salvas no navegador, ou começa com uma lista vazia []
        const salvas = localStorage.getItem("despesas_salvas");
        this.despesas = salvas ? JSON.parse(salvas) : [];
    }

    adicionar_despesa(despesa) {
        this.despesas.push(despesa);

        // Salva na memória do navegador toda vez que adiciona uma nova
        localStorage.setItem("despesas_salvas", JSON.stringify(this.despesas));
    }

    calcular_despesa() {
        let total = 0;
        for (let despesa of this.despesas) {
            total += despesa.valor;
        }
        return total;
    }
}

// Cria o gerenciador de despesas
const controleDespesas = new ControleDespesa();

// Controle de tela
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario-despesa");
    const containerMensagem = document.getElementById("mensagem-container");
    const containerLista = document.getElementById("lista-despesas-container");
    const containerTotal = document.getElementById("total-container");

    // Mostra as despesas logo ao abrir a página (caso já tenha alguma salva)
    atualizarTela(containerLista, containerTotal);

    if (formulario) {
        formulario.addEventListener("submit", (event) => {

            // Impede a página de recarregar e sumir com os dados
            event.preventDefault();

            // Capturar os valores dos inputs do HTML
            const descricao = document.getElementById("descricao").value.trim();
            const categoria = document.getElementById("categoria").value.trim();

            // Tratamento (",", ".")
            const valorTexto = document.getElementById("valor").value.replace(",", ".");
            const valor = parseFloat(valorTexto);

            // Validação de segurança
            if (!descricao || !categoria || isNaN(valor)) {
                containerMensagem.innerHTML = "<p style='color: red;'>Por favor, preencha os campos corretamente.</p>";
                return;
            }

            // Instanciar e adiciona à lista através da classe
            const novaDespesa = new Despesa(descricao, categoria, valor);
            controleDespesas.adicionar_despesa(novaDespesa);

            // Exibir a mensagem de sucesso na tela
            containerMensagem.innerHTML = "<p style='color: green; font-weight: bold;'>Despesa cadastrada com sucesso!</p>";

            // Limpar as caixas de texto para próxima digitação
            formulario.reset();

            // Atualizar a lista visual na tela imediatamente
            atualizarTela(containerLista, containerTotal);
        });
    }
});

// Função que reconstrói a lista e o total exatamente na estrutura que você precisa
function atualizarTela(containerLista, containerTotal) {
    // Se não tiver nenhuma despesa, mostra o texto padrão do seu HTML
    if (controleDespesas.despesas.length === 0) {
        containerLista.innerHTML = "<p>Nenhuma despesa cadastrada.</p>";
        containerTotal.innerHTML = "";
        return;
    }

    // Limpa a tela antes de redesenhar para não duplicar itens antigos
    containerLista.innerHTML = "";

    // Faz o papel do {% for despesa in despesas %} do seu HTML original
    controleDespesas.despesas.forEach(despesa => {
        const blocoDespesa = document.createElement("div");
        blocoDespesa.innerHTML = `
            <p><strong>Descrição:</strong> ${despesa.descricao}</p>
            <p><strong>Categoria:</strong> ${despesa.categoria}</p>
            <p><strong>Valor:</strong> R$ ${despesa.valor.toFixed(2).replace(".", ",")}</p>
            <hr style="border: 0; border-top: 1px dashed #ccc; margin: 10px 0;">
        `;
        containerLista.appendChild(blocoDespesa);
    });

    // Calcula o total acumulado e joga na tela
    const total = controleDespesas.calcular_despesa();
    containerTotal.innerHTML = `<h3>Total das despesas: R$ ${total.toFixed(2).replace(".", ",")}</h3>`;
}
