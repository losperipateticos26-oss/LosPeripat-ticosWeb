document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar dinámico al hacer scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Menú Móvil (Hamburguesa)
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Cambiar icono
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
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
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 3. Animaciones al hacer scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Dejar de observar una vez que aparece
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // 4. Manejo del Formulario de Contacto (Redirección a WhatsApp)
    const form = document.getElementById('leadForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar recarga de página

        // Obtener valores
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const group = document.getElementById('group').value;

        // Construir mensaje para WhatsApp
        const waNumber = "51944565542"; // Número con código de país (Perú +51)
        const waMessage = `¡Hola Academia Los Peripatéticos! Deseo más información para inscribirme.%0A%0A*Nombre:* ${name}%0A*Teléfono:* ${phone}%0A*Correo:* ${email}%0A*Grupo de interés:* ${group}`;
        const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

        // UI Feedback
        form.reset();
        formMessage.textContent = "¡Datos registrados con éxito! Redirigiendo a WhatsApp...";
        formMessage.classList.add('success');

        // Redirigir a WhatsApp después de un breve delay para que el usuario lea el mensaje
        setTimeout(() => {
            window.open(waUrl, '_blank');
            
            // Limpiar mensaje después de un tiempo
            setTimeout(() => {
                formMessage.classList.remove('success');
                formMessage.textContent = "";
            }, 3000);
        }, 1200);
    });
});