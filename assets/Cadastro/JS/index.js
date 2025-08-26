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


//Botão Acessibilidade*/
    // Selecionando os botões
const btnAbrirLeitor = document.getElementById("abrirLeitor");
const btnLer = document.getElementById("lerPagina");
const btnPausar = document.getElementById("pausarAudio");
const btnRetomar = document.getElementById("retomarAudio");

let utterance;
let isPaused = false;

// Abre/fecha os controles do leitor
btnAbrirLeitor.addEventListener("click", () => {
  document.querySelector(".leitor-controles").classList.toggle("ativo");
});

// Função para iniciar leitura da página
btnLer.addEventListener("click", () => {
  const texto = document.body.innerText; // lê o texto da página inteira
  utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = "pt-BR"; // define português do Brasil
  speechSynthesis.cancel(); // cancela qualquer leitura anterior
  speechSynthesis.speak(utterance);
  isPaused = false;
});

// Pausar leitura
btnPausar.addEventListener("click", () => {
  if (speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
    isPaused = true;
  }
});

// Retomar leitura
btnRetomar.addEventListener("click", () => {
  if (isPaused) {
    speechSynthesis.resume();
    isPaused = false;
  }
});
