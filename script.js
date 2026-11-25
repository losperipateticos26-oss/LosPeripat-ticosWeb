document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 3. Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target); // Solo animar una vez
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Lógica del Modal del Portal (Aula Virtual)
    const modal = document.getElementById('portalModal');
    
    window.openPortal = () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
    };

    window.closePortal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePortal();
        }
    });

    // 5. Pestañas del Portal
    window.switchTab = (tabName) => {
        // Remover active de todos los botones y contenidos
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Agregar active al seleccionado
        event.target.classList.add('active');
        document.getElementById(`tab-${tabName}`).classList.add('active');
    };

    // 6. Formulario de Contacto a WhatsApp
    const form = document.getElementById('leadForm');
    const formMessage = document.getElementById('formMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const group = document.getElementById('group').value;

        // Número de WhatsApp (código de Perú + número)
        const waNumber = "51944565542"; 
        
        // Construcción del mensaje
        const waMessage = `¡Hola Academia Los Peripatéticos! Deseo realizar mi pre-inscripción.%0A%0A*Nombre:* ${name}%0A*Teléfono:* ${phone}%0A*Correo:* ${email}%0A*Grupo:* ${group}`;
        const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

        // Feedback visual
        formMessage.textContent = "¡Datos registrados! Redirigiendo a WhatsApp...";
        formMessage.classList.add('success');
        form.reset();

        // Abrir WhatsApp en una nueva pestaña después de un breve delay
        setTimeout(() => {
            window.open(waUrl, '_blank');
            setTimeout(() => {
                formMessage.classList.remove('success');
                formMessage.textContent = "";
            }, 3000);
        }, 1000);
    });
});