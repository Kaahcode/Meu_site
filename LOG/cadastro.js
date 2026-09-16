// ==========================================
// CONTROLE DO FORMULÁRIO E VALIDAÇÕES
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario-cadastro");
    const containerMensagem = document.getElementById("mensagem-container");

    if (formulario) {
        formulario.addEventListener("submit", (event) => {
            // Impede a página de recarregar e quebrar o fluxo
            event.preventDefault();

            // 1. RECEBE OS DADOS DO HTML (Igual ao seu request.form.get)
            const nome = document.getElementById("nome").value.trim();
            const sobrenome = document.getElementById("sobrenome").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const confirmar_senha = document.getElementById("confirmar_senha").value;
            const dia = document.getElementById("dia").value;
            const mes = document.getElementById("mes").value;
            const ano = document.getElementById("ano").value;
            const genero = document.getElementById("genero").value;

            // 2. VERIFICA SE TODOS OS CAMPOS FORAM PREENCHIDOS
            if (!nome || !sobrenome || !email || !password || !confirmar_senha || !dia || !mes || !ano || !genero) {
                containerMensagem.innerHTML = "<p style='color: red;'>Preencha todos os campos!</p>";
                return;
            }

            // 3. VERIFICA AS SENHAS (elif password != confirmar_senha:)
            if (password !== confirmar_senha) {
                containerMensagem.innerHTML = "<p style='color: red;'>As senhas não são iguais!</p>";
                return;
            }

            // 4. VERIFICA O E-MAIL USANDO REGEX (elif not re.match(...))
            const emailRegex = /[^@]+@[^@]+\.[^@]+/;
            if (!emailRegex.test(email)) {
                containerMensagem.innerHTML = "<p style='color: red;'>E-mail inválido!</p>";
                return;
            }

            // 5. JUNTA A DATA FORMATADA (f'{ano}-{mes.zfill(2)}-{dia.zfill(2)}')
            const diaFormatado = dia.padStart(2, '0');
            const mesFormatado = mes.padStart(2, '0');
            const data_nascimento = `${ano}-${mesFormatado}-${diaFormatado}`;

            // 6. CONEXÃO ATUALIZADA: Puxa o banco de dados atualizado neste exato segundo (Evita o bug)
            let accountsDB = JSON.parse(localStorage.getItem("accounts_mysql_simulation")) || [];

            // VERIFICA SE O E-MAIL JÁ FOI CADASTRADO (Papel do SELECT * FROM accounts)
            const accountExists = accountsDB.some(account => account.email === email);

            if (accountExists) {
                containerMensagem.innerHTML = "<p style='color: red;'>Este e-mail já está cadastrado!</p>";
                return;
            }

            // 7. SALVA OS DADOS (Papel do INSERT INTO accounts)
            const novaConta = {
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                password: password, 
                data_nascimento: data_nascimento,
                genero: genero
            };

            // Adiciona no "banco de dados" fictício
            accountsDB.push(novaConta);

            // Confirma o salvamento gravando no navegador (Papel do mysql.connection.commit())
            localStorage.setItem("accounts_mysql_simulation", JSON.stringify(accountsDB));

            // Limpa os campos do formulário
            formulario.reset();

            // 8. SIMULA O REDIRECIONAMENTO COM SUCESSO
            containerMensagem.innerHTML = "<p style='color: green; font-weight: bold;'>Cadastrado com sucesso! Redirecionando para o Login...</p>";

            // Ativa o redirecionamento automático para a sua tela de login após 2 segundos
            setTimeout(() => {
                window.location.href = "login.html"; 
            }, 2000);
        });
    }
});