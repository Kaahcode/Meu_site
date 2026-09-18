// Formulário e validação

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario-cadastro");
    const containerMensagem = document.getElementById("mensagem-container");

    if (formulario) {
        formulario.addEventListener("submit", (event) => {
            // Impede a página de recarregar e quebrar o fluxo
            event.preventDefault();

            // Receber dados html
            const nome = document.getElementById("nome").value.trim();
            const sobrenome = document.getElementById("sobrenome").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const confirmar_senha = document.getElementById("confirmar_senha").value;
            const dia = document.getElementById("dia").value;
            const mes = document.getElementById("mes").value;
            const ano = document.getElementById("ano").value;
            const genero = document.getElementById("genero").value;

            // Verificar campos preenchidos
            if (!nome || !sobrenome || !email || !password || !confirmar_senha || !dia || !mes || !ano || !genero) {
                containerMensagem.innerHTML = "<p style='color: red;'>Preencha todos os campos!</p>";
                return;
            }

            //Verificar senhas
            if (password !== confirmar_senha) {
                containerMensagem.innerHTML = "<p style='color: red;'>As senhas não são iguais!</p>";
                return;
            }

            // Verificar email
            const emailRegex = /[^@]+@[^@]+\.[^@]+/;
            if (!emailRegex.test(email)) {
                containerMensagem.innerHTML = "<p style='color: red;'>E-mail inválido!</p>";
                return;
            }

            // Datas
            const diaFormatado = dia.padStart(2, '0');
            const mesFormatado = mes.padStart(2, '0');
            const data_nascimento = `${ano}-${mesFormatado}-${diaFormatado}`;

            // Conexão
            let accountsDB = JSON.parse(localStorage.getItem("accounts_mysql_simulation")) || [];

            // Verificação de email
            const accountExists = accountsDB.some(account => account.email === email);

            if (accountExists) {
                containerMensagem.innerHTML = "<p style='color: red;'>Este e-mail já está cadastrado!</p>";
                return;
            }

            // Salvar dados
            const novaConta = {
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                password: password,
                data_nascimento: data_nascimento,
                genero: genero
            };

            // Adiciona no "banco de dados" 
            accountsDB.push(novaConta);

            // Confirmar o salvamento gravando no navegador 
            localStorage.setItem("accounts_mysql_simulation", JSON.stringify(accountsDB));

            // Limpa os campos do formulário
            formulario.reset();

            // Redicionamento
            containerMensagem.innerHTML = "<p style='color: green; font-weight: bold;'>Cadastrado com sucesso! Redirecionando para o Login...</p>";

            // Ativa o redirecionamento automático para a sua tela de login após 2 segundos
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        });
    }
});
