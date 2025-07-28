// Aguarda o conteúdo do DOM ser totalmente carregado
document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA PARA O MENU HAMBÚRGUER (JÁ EXISTENTE) ---
    const menuHamburger = document.querySelector('.menu-hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (menuHamburger && navLinks) {
        menuHamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuHamburger.classList.toggle('active');
        });
    }

    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuHamburger.classList.remove('active');
            }
        });
    });


    // --- NOVA LÓGICA PARA O FORMULÁRIO DE CONTATO (AJAX) ---
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o redirecionamento padrão do navegador

            const formData = new FormData(form);
            const button = form.querySelector('button[type="submit"]');
            
            // Desabilita o botão e mostra "Enviando..." para evitar cliques duplos
            button.disabled = true;
            button.textContent = 'Enviando...';
            formStatus.innerHTML = ''; // Limpa mensagens antigas

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                // Reabilita o botão
                button.disabled = false;
                button.textContent = 'Enviar Mensagem';

                if (response.ok) {
                    // Se o envio foi bem-sucedido
                    formStatus.innerHTML = "<p class='success'>Obrigado! Sua mensagem foi enviada com sucesso.</p>";
                    form.reset(); // Limpa os campos do formulário
                } else {
                    // Se houve um erro no servidor
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formStatus.innerHTML = `<p class='error'>${data["errors"].map(error => error["message"]).join(", ")}</p>`;
                        } else {
                            formStatus.innerHTML = "<p class='error'>Ocorreu um erro ao enviar a mensagem. Tente novamente.</p>";
                        }
                    })
                }
            }).catch(error => {
                // Se houve um erro de rede (sem conexão, etc)
                button.disabled = false;
                button.textContent = 'Enviar Mensagem';
                formStatus.innerHTML = "<p class='error'>Ocorreu um erro de conexão. Tente novamente.</p>";
            });
        });
    }
});