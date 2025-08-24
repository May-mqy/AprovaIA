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