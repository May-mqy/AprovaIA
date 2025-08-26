const accordions = document.querySelectorAll('.accordion');

accordions.forEach(accordion => {
    const header = accordion.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
        const body = accordion.querySelector('.accordion-body');
        const icon = header.querySelector('.icon');

        body.classList.toggle('active');

        if (body.classList.contains('active')) {
            icon.textContent = '–'; // Sinal de menos
        } else {
            icon.textContent = '+';
        }
    });
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
