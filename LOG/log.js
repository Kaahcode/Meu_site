
// Configuração bancos de dados ()

// Puxa a lista de contas que simula a tabela 'accounts' do MySQL, ou cria uma vazia []
let accountsDB = JSON.parse(localStorage.getItem("accounts_mysql_simulation")) || [];

// Carregar página

document.addEventListener("DOMContentLoaded", () => {
    
    // Captura os formulários das telas (se existirem na página atual)
    const formularioCadastro = document.getElementById("formulario-cadastro");
    const formularioLogin = document.getElementById("formulario-login");
    const containerMensagem = document.getElementById("mensagem-container");

    //Cadastro

    if (formularioCadastro) {
        formularioCadastro.addEventListener("submit", (event) => {
            event.preventDefault(); // Impede a página de recarregar

            // Receber dados
            const nome = document.getElementById("nome").value.trim();
            const sobrenome = document.getElementById("sobrenome").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            const confirmar_senha = document.getElementById("confirmar_senha").value;
            const dia = document.getElementById("dia").value;
            const mes = document.getElementById("mes").value;
            const ano = document.getElementById("ano").value;
            const genero = document.getElementById("genero").value;

            // Verificar campos recebidos
            if (!nome || !sobrenome || !email || !password || !confirmar_senha || !dia || !mes || !ano || !genero) {
                containerMensagem.innerHTML = "<p style='color: red;'>Preencha todos os campos!</p>";
                return;
            }

            // Verificar senha
            if (password !== confirmar_senha) {
                containerMensagem.innerHTML = "<p style='color: red;'>As senhas não são iguais!</p>";
                return;
            }

            // verificar email
            const emailRegex = /[^@]+@[^@]+\.[^@]+/;
            if (!emailRegex.test(email)) {
                containerMensagem.innerHTML = "<p style='color: red;'>E-mail inválido!</p>";
                return;
            }

            //Juntar datas
            const diaFormatado = dia.padStart(2, '0');
            const mesFormatado = mes.padStart(2, '0');
            const data_nascimento = `${ano}-${mesFormatado}-${diaFormatado}`;

            // Puxa o banco atualizado antes de testar se já existe
            accountsDB = JSON.parse(localStorage.getItem("accounts_mysql_simulation")) || [];

            // Verificar email cadastrado
            const accountExists = accountsDB.some(account => account.email === email);

            if (accountExists) {
                containerMensagem.innerHTML = "<p style='color: red;'>Este e-mail já está cadastrado!</p>";
                return;
            }

            // Salvar dados
            const novaConta = {
                id: accountsDB.length + 1, // Gera um ID incremental fictício
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                username: email, // O e-mail faz o papel do seu campo 'username' no login
                password: password,
                data_nascimento: data_nascimento,
                genero: genero
            };

            accountsDB.push(novaConta);
            
            // CONFIRMA O CADASTRO (mysql.connection.commit())
            localStorage.setItem("accounts_mysql_simulation", JSON.stringify(accountsDB));

            formularioCadastro.reset();
            containerMensagem.innerHTML = "<p style='color: green; font-weight: bold;'>Cadastrado com sucesso! Redirecionando...</p>";

            // Return login
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        });
    }
   
    // Rota login
   
    if (formularioLogin) {
        formularioLogin.addEventListener("submit", (event) => {
            event.preventDefault(); // Impede a página de recarregar

            // Recaber dados
            const usernameDigitado = document.getElementById("username").value.trim();
            const passwordDigitada = document.getElementById("password").value;

            // Puxa o banco de dados atualizado do navegador
            accountsDB = JSON.parse(localStorage.getItem("accounts_mysql_simulation")) || [];

            // Buscar usuário
            const account = accountsDB.find(user => user.username === usernameDigitado && user.password === passwordDigitada);

            if (account) {
                // Definir dados
                const sessionData = {
                    loggedin: true,
                    id: account.id,
                    username: account.username,
                    nome: account.nome
                };
                localStorage.setItem("app_session", JSON.stringify(sessionData));

                containerMensagem.innerHTML = "<p style='color: green; font-weight: bold;'>Logged in successfully! Redirecionando...</p>";
                
                formularioLogin.reset();

                // Redireciona para um painel de boas-vindas ou página após o login
                /*
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1500);
                */
            } else {
                containerMensagem.innerHTML = "<p style='color: red;'>Incorrect username/password!</p>";
            }
        });
    }
});

// Rota logout

window.logout = function() {

    // Limpa os dados da sessão (session.pop(...))
    localStorage.removeItem("app_session");
    
    // Envia o usuário de volta para a tela de login (return redirect(url_for('login')))
    window.location.href = "login.html";
};
