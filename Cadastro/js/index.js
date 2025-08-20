document.addEventListener('DOMContentLoaded', function() {
    // Aplica a classe padrão (cadastro-js) ao carregar a página
    document.body.className = "cadastro-js";
    
    var btnlogin = document.querySelector("#login");
    var btncadastro = document.querySelector("#cadastro");

    btnlogin.addEventListener("click", function() {
        document.body.className = "fazer-login-js";
    });

    btncadastro.addEventListener("click", function() {
        document.body.className = "cadastro-js";
    });
});