const API_KEY = "8c2a3566f8cbcc427ef24d2e5c820789";

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario-clima");

    if (formulario) {
        formulario.addEventListener("submit", async function(event) {
            event.preventDefault(); 

            const cidade = document.getElementById("cidade").value.trim();
            const resultadoContainer = document.getElementById("resultado-container");

            if (!cidade) {
                resultadoContainer.innerHTML = "<p style='color: red;'>Por favor, digite uma cidade!</p>";
                return;
            }

            resultadoContainer.innerHTML = "<p>Buscando clima...</p>";

            // 1. LINK CORRIGIDO DEFINITIVAMENTE (VEJA A SINTAXE ABAIXO)
           const link = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`;
            try {
                const resposta = await fetch(link);
                
                if (resposta.status === 200) {
                    const dados = await resposta.json();
                    
                    const temperatura = dados.main.temp;
                    // 2. ACESSO AO ARRAY CORRIGIDO (dados.weather[0])
                    const descricao = dados.weather[0].description; 

                    resultadoContainer.innerHTML = `
                        <div style="margin-top: 20px;">
                            <h2>Resultado:</h2>
                            <p><strong>Temperatura:</strong> ${temperatura} °C</p>
                            <p style="text-transform: capitalize;"><strong>Descrição:</strong> ${descricao}</p>
                        </div>
                    `;
                } else {
                    resultadoContainer.innerHTML = `<p style="color: red; margin-top: 20px;">Cidade não encontrada (Erro ${resposta.status})</p>`;
                }
            } catch (error) {
                // Exibe o erro real no console para ajudar no diagnóstico
                console.error("Erro interno:", error);
                resultadoContainer.innerHTML = `<p style="color: red; margin-top: 20px;">Erro ao conectar com o serviço de clima.</p>`;
            }
        });
    }
});