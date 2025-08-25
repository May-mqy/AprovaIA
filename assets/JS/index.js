//faq question / area de dúvidas 

// Seleciona todos os itens da FAQ
const items = document.querySelectorAll('.faq-item');

items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const ans = item.querySelector('.faq-answer');

    btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Alterna o estado do botão (para a setinha ▼/▲)
    btn.setAttribute('aria-expanded', String(!isOpen));

    // Anima a área da resposta
    if (!isOpen) {
      // Abrindo: define a altura real para animar
      ans.style.maxHeight = ans.scrollHeight + 'px';
    } else {
      // Fechando: zera para recolher
      ans.style.maxHeight = null;
    }
  });
});


 const carousel = document.querySelector(".carousel-patrocinadores");
    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");

    let scrollAmount = 0;
    // Pega a largura do item dinamicamente
    const itemWidth = document.querySelector(".item").offsetWidth + 20; // 20px = 10px de padding de cada lado

    next.addEventListener("click", () => {
        // Verifica se ainda há espaço para rolar para a direita
        const carouselWidth = carousel.scrollWidth;
        const containerWidth = carousel.parentElement.offsetWidth;

        if (Math.abs(scrollAmount) < (carouselWidth - containerWidth)) {
            scrollAmount -= itemWidth;
            carousel.style.transform = `translateX(${scrollAmount}px)`;
        }
    });

    prev.addEventListener("click", () => {
        // Verifica se ainda há espaço para rolar para a esquerda
        if (scrollAmount < 0) {
            scrollAmount += itemWidth;
            carousel.style.transform = `translateX(${scrollAmount}px)`;
        }
    });