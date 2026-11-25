document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. NAVEGACIÓN Y MENÚ MÓVIL
       ========================================= */
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-item');

    // Efecto de scroll en la barra de navegación
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Actualizar enlace activo basado en el scroll
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Toggle del menú móvil
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if(navLinks.classList.contains('active')){
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });

    /* =========================================
       2. ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER)
       ========================================= */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* =========================================
       3. PROCESAMIENTO DEL FORMULARIO (LEAD GENERATION)
       ========================================= */
    const form = document.getElementById('leadForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar recarga de página

        // Obtener datos
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const group = document.getElementById('group').value;

        // Configuración de WhatsApp
        const waNumber = "51944565542"; // Número de Perú con código de país
        const waMessage = `¡Hola Academia Los Peripatéticos! Deseo más información para inscribirme.%0A%0A*Nombre:* ${name}%0A*Teléfono:* ${phone}%0A*Correo:* ${email}%0A*Grupo de interés:* ${group}`;
        const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

        // Mostrar mensaje de éxito
        formMessage.textContent = "¡Datos registrados! Redirigiendo a WhatsApp para confirmar tu matrícula...";
        formMessage.classList.add('success');
        
        // Limpiar formulario
        form.reset();

        // Redirigir a WhatsApp después de 1.5 segundos para que el usuario vea el mensaje
        setTimeout(() => {
            window.open(waUrl, '_blank');
            
            // Ocultar mensaje después de redirigir
            setTimeout(() => {
                formMessage.classList.remove('success');
                formMessage.textContent = "";
            }, 4000);
        }, 1500);
    });
});