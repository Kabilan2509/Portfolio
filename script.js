document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        emailjs.init("Bgf262B57KiYnHExc");
        emailjs.sendForm('service_s9hn027', 'template_q348x9n', this)
            .then(function() {
                alert('Message sent successfully!');
                form.reset();
            }, function(error) {
                alert('Failed to send message: ' + error.text);
            });
    });
    const hero = document.getElementById('hero');
    const torch = document.querySelector('.torch');

    hero.addEventListener('mousemove', function(e) {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        torch.style.background = `radial-gradient(ellipse 200px 200px at ${x}px ${y}px, transparent 0%, rgba(0, 0, 0, 0.3) 100%)`;
    });

    hero.addEventListener('mouseleave', function() {
        torch.style.background = 'radial-gradient(ellipse 200px 200px at center, transparent 0%, rgba(0, 0, 0, 0.3) 100%)';
    });

    // Typing effect
    const texts = [
        "a web developer passionate about creating amazing websites.",
        "a Computer Science Engineering student with a passion for AI.",
        "an enthusiast in Machine Learning and data-driven solutions.",
        "ready to turn complex problems into efficient systems."
    ];
    let currentTextIndex = 0;
    let index = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing');
    function typeWriter() {
        const currentText = texts[currentTextIndex];
        if (!isDeleting) {
            if (index < currentText.length) {
                typingElement.innerHTML = currentText.substring(0, index + 1) + '<span class="cursor">|</span>';
                index++;
                setTimeout(typeWriter, 100);
            } else {
                isDeleting = true;
                setTimeout(typeWriter, 2000); // pause before deleting
            }
        } else {
            if (index > 0) {
                typingElement.innerHTML = currentText.substring(0, index - 1) + '<span class="cursor">|</span>';
                index--;
                setTimeout(typeWriter, 50); // faster backspace
            } else {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                setTimeout(typeWriter, 500); // pause before next
            }
        }
    }
    typeWriter();
    // Cursor blinking
    setInterval(() => {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }
    }, 500);
});