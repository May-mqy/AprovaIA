document.addEventListener('DOMContentLoaded', function() {
    // Inicializar VLibras
    if (typeof window.VLibras !== 'undefined') {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
    }
    
    // Configurações do carrossel
    const tracks = document.querySelectorAll('.carrossel-track');
    const speeds = [1, 0.8]; // Velocidades diferentes para cada carrossel
    
    // Função de animação para cada carrossel
    function animarCarrossel(track, speed) {
        let position = 0;
        const items = track.querySelectorAll('.carrossel-item');
        const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight) * 2;
        const totalWidth = itemWidth * (items.length / 2); // Metade dos itens (já que duplicamos)
        
        function mover() {
            position -= speed;
            
            // Quando chega ao final dos itens originais, reseta
            if (Math.abs(position) >= totalWidth) {
                position = 0;
            }
            
            track.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(mover);
        }
        
        // Iniciar apenas se a tela for maior que mobile
        if (window.innerWidth > 768) {
            mover();
        }
    }
    
    // Iniciar animações para cada carrossel
    tracks.forEach((track, index) => {
        animarCarrossel(track, speeds[index]);
    });
    
    // Pausar animações quando a janela não está visível
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            tracks.forEach(track => {
                track.style.animationPlayState = 'paused';
            });
        } else {
            tracks.forEach(track => {
                track.style.animationPlayState = 'running';
            });
        }
    });
    
    // Reiniciar animações ao redimensionar a janela
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            tracks.forEach((track, index) => {
                // Recriar a animação
                track.style.animation = 'none';
                setTimeout(() => {
                    track.style.animation = `carrosselMove 30s linear infinite`;
                    if (window.innerWidth <= 768) {
                        track.style.animationPlayState = 'paused';
                    } else {
                        track.style.animationPlayState = 'running';
                    }
                }, 10);
            });
        }, 250);
    });
    
    // Botões de login e cadastro
    document.getElementById('btn-login').addEventListener('click', function() {
        alert('Redirecionando para a página de login...');
        // Aqui você adicionaria a lógica de redirecionamento
    });
    
    document.getElementById('btn-cadastro').addEventListener('click', function() {
        alert('Redirecionando para a página de cadastro...');
        // Aqui você adicionaria a lógica de redirecionamento
    });
    
    // Ajustar altura da seção principal com base no conteúdo
    function ajustarAlturaPrincipal() {
        const principal = document.getElementById('principal');
        const textoPrincipal = document.getElementById('texto-principal');
        const imagemPrincipal = document.getElementById('imagem-principal');
        
        if (window.innerWidth >= 768) {
            const alturaTexto = textoPrincipal.offsetHeight;
            const alturaImagem = imagemPrincipal.offsetHeight;
            const maiorAltura = Math.max(alturaTexto, alturaImagem);
            
            principal.style.minHeight = `${maiorAltura + 100}px`;
        } else {
            principal.style.minHeight = 'calc(100vh - 90px)';
        }
    }
    
    // Executar ao carregar e redimensionar
    window.addEventListener('load', ajustarAlturaPrincipal);
    window.addEventListener('resize', ajustarAlturaPrincipal);
});


// Inicio seção doações
document.addEventListener('DOMContentLoaded', function() {
            const botoes = document.querySelectorAll('.botao-doacao, .botao-outro');
            
            botoes.forEach(botao => {
                botao.addEventListener('click', function() {
                    // Remover destaque de todos os botões
                    botoes.forEach(b => b.classList.remove('destaque'));
                    
                    // Adicionar destaque apenas aos botões de valor fixo
                    if (this.classList.contains('botao-doacao')) {
                        this.classList.add('destaque');
                    }
                    
                    // Aqui você pode adicionar a lógica para cada tipo de botão
                    if (this.classList.contains('botao-outro')) {
                        // Lógica para escolher outro valor
                        const valorPersonalizado = prompt('Digite o valor desejado para doação (R$):');
                        if (valorPersonalizado && !isNaN(valorPersonalizado)) {
                            alert(`Obrigado pela doação de R$ ${valorPersonalizado}!`);
                        }
                    } else {
                        const valor = this.querySelector('.valor').textContent;
                        alert(`Obrigado pela doação de ${valor} por mês!`);
                    }
                });
            });
        });
// Fim seção doações 

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
