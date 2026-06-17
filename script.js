<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const siteNav = document.querySelector(".site-nav");
    const navLinks = document.querySelectorAll(".site-nav a[href^='#']");
    const topLinks = document.querySelectorAll("a[href='#top']");
    const sections = document.querySelectorAll("main section[id]");
    const form = document.querySelector(".contact-form");
    const formStatus = document.querySelector(".form-status");
    const typingElement = document.getElementById("typing");
    const revealElements = document.querySelectorAll(".reveal");
    const heroVisual = document.querySelector(".hero-visual");

    const typingTexts = [
        "an AI-focused builder.",
        "a machine learning enthusiast.",
        "a full-stack problem solver.",
        "someone who cares about polished UX."
    ];

    if (menuToggle && siteNav) {
        menuToggle.addEventListener("click", () => {
            const expanded = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", String(!expanded));
            siteNav.classList.toggle("is-open");
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                menuToggle.setAttribute("aria-expanded", "false");
                siteNav.classList.remove("is-open");
            });
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));

            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    topLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            if (menuToggle && siteNav) {
                menuToggle.setAttribute("aria-expanded", "false");
                siteNav.classList.remove("is-open");
            }
        });
    });

    if (sections.length && navLinks.length) {
        const linkMap = new Map(
            Array.from(navLinks).map((link) => [link.getAttribute("href"), link])
        );

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    navLinks.forEach((navLink) => navLink.classList.remove("active"));
                    const activeLink = linkMap.get(`#${entry.target.id}`);
                    if (activeLink) {
                        activeLink.classList.add("active");
                    }
                });
            },
            {
                threshold: 0.45,
                rootMargin: "-10% 0px -35% 0px"
            }
        );

        sections.forEach((section) => sectionObserver.observe(section));
    }

    if (revealElements.length) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.18
            }
        );

        revealElements.forEach((element, index) => {
            element.style.transitionDelay = `${Math.min(index * 60, 280)}ms`;
            revealObserver.observe(element);
        });
    }

    if (typingElement) {
        let textIndex = 0;
        let charIndex = 0;
        let deleting = false;

        const type = () => {
            const currentText = typingTexts[textIndex];
            const visibleText = deleting
                ? currentText.slice(0, charIndex--)
                : currentText.slice(0, charIndex++);

            typingElement.innerHTML = `${visibleText}<span class="cursor">|</span>`;

            if (!deleting && charIndex > currentText.length) {
                deleting = true;
                setTimeout(type, 1500);
                return;
            }

            if (deleting && charIndex < 0) {
                deleting = false;
                textIndex = (textIndex + 1) % typingTexts.length;
            }

            const speed = deleting ? 40 : 85;
            setTimeout(type, speed);
        };

        type();
    }

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            if (!window.emailjs) {
                formStatus.textContent = "Email service is unavailable right now. Please try again later.";
                return;
            }

            const submitButton = form.querySelector("button[type='submit']");

            try {
                submitButton.disabled = true;
                submitButton.textContent = "Sending...";
                formStatus.textContent = "Sending your message...";

                emailjs.init("Bgf262B57KiYnHExc");
                await emailjs.sendForm("service_s9hn027", "template_q348x9n", form);

                form.reset();
                formStatus.textContent = "Message sent successfully. Thanks for reaching out.";
            } catch (error) {
                formStatus.textContent = "Message failed to send. Please try again in a moment.";
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
            }
        });
    }

    if (heroVisual && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.addEventListener("mousemove", (event) => {
            const x = (event.clientX / window.innerWidth - 0.5) * 12;
            const y = (event.clientY / window.innerHeight - 0.5) * 12;
            heroVisual.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
    }
});
=======
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
>>>>>>> 6df3bc54d282333ee0682804024d2bf42b8c4889
