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

//Carrossel Patrocinadores

// VERSÃO SIMPLES E FUNCIONAL
console.log('Carrossel iniciado!'); // Verifique se aparece no console

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado!');
    
    // Configurações básicas
    const track = document.getElementById('carrosselTrack');
    const items = track.querySelectorAll('.carrossel-item');
    const speed = 1; // Velocidade do movimento
    
    console.log('Itens encontrados:', items.length);
    
    // Função de animação
    function animarCarrossel() {
        let position = 0;
        
        function mover() {
            position -= speed;
            
            // Calcula a largura total dos itens originais (8 itens)
            const totalWidth = (200 + 40) * 8; // width + margin
            
            // Quando chega ao final dos itens originais, reseta
            if (Math.abs(position) >= totalWidth) {
                position = 0;
            }
            
            track.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(mover);
        }
        
        mover();
    }
    
    // Inicia a animação
    animarCarrossel();
});

// VERIFICAÇÃO DE ERROS
window.addEventListener('error', function(e) {
    console.error('Erro no carrossel:', e.error);
});


//Politicas animação
const accordions = document.querySelectorAll('.accordion');

accordions.forEach(accordion =>{
    accordion.addEventListener('click', () =>{
        const body=accordion.querySelector('.accordion-body');
        body.classList.toggle('active')
    })
})