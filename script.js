// Aguarda o conteúdo do DOM ser totalmente carregado
document.addEventListener('DOMContentLoaded', function() {

    // Lógica para o menu hambúrguer
    const menuHamburger = document.querySelector('.menu-hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Verifica se os elementos existem antes de adicionar o event listener
    if (menuHamburger && navLinks) {
        menuHamburger.addEventListener('click', () => {
            // Alterna a classe 'active' nos dois elementos
            navLinks.classList.toggle('active');
            menuHamburger.classList.toggle('active');
        });
    }

    // Opcional: Fechar o menu ao clicar em um link (útil para SPAs ou navegação na mesma página)
    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuHamburger.classList.remove('active');
            }
        });
    });

});