document.addEventListener('DOMContentLoaded', () => {
    // --- Reveal on Scroll ---
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Smooth Navigation Links ---
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetOffset = document.querySelector(targetId).offsetTop - 80;
            
            window.scrollTo({
                top: targetOffset,
                behavior: 'smooth'
            });

            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // --- Navbar Background on Scroll ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(12, 14, 16, 0.9)';
            nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            nav.style.background = 'rgba(22, 24, 27, 0.7)';
            nav.style.boxShadow = 'none';
        }
    });

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('portfolio-contact');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                btn.innerText = 'Sent Successfully!';
                btn.style.background = '#10b981'; // Green
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // --- Admin Modal Logic ---
    const adminModal = document.getElementById('admin-modal');
    const openAdminBtn = document.getElementById('open-admin');
    const closeAdminBtn = document.getElementById('close-admin');
    const adminForm = document.getElementById('admin-login-form');
    const loginFeedback = document.getElementById('login-feedback');

    if (openAdminBtn && adminModal) {
        openAdminBtn.addEventListener('click', () => {
            adminModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeAdminBtn.addEventListener('click', () => {
            adminModal.classList.remove('active');
            document.body.style.overflow = '';
            loginFeedback.innerText = '';
            adminForm.reset();
        });

        adminModal.addEventListener('click', (e) => {
            if (e.target === adminModal) {
                closeAdminBtn.click();
            }
        });
    }

    if (adminForm) {
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('admin-email').value;
            const btn = adminForm.querySelector('button');

            btn.disabled = true;
            btn.innerText = 'Verifying...';
            loginFeedback.innerText = '';

            setTimeout(() => {
                // Verified against your email
                if (email.toLowerCase() === 'snedhishkm@gmail.com') {
                    loginFeedback.innerText = 'Identity verified. Enabling Admin Mode...';
                    loginFeedback.className = 'feedback-msg success';
                    
                    setTimeout(() => {
                        enableAdminMode();
                        closeAdminBtn.click();
                    }, 1000);
                } else {
                    loginFeedback.innerText = 'Unauthorized email address.';
                    loginFeedback.className = 'feedback-msg error';
                    btn.disabled = false;
                    btn.innerText = 'Verify Identity';
                }
            }, 1000);
        });
    }

    function enableAdminMode() {
        document.body.classList.add('admin-mode');
        
        // Make specific elements editable
        const editableSelects = 'h1, h2, h3, p, .skill-tag, .hero-tag, .quote, span';
        document.querySelectorAll(editableSelects).forEach(el => {
            if (!el.closest('.admin-toolbar') && !el.closest('.modal-content') && !el.closest('nav')) {
                el.contentEditable = 'true';
            }
        });

        // Add delete buttons to existing cards/tags
        addDeleteButtons();
    }

    function addDeleteButtons() {
        const targets = '.skill-tag, .skill-card, .project-card, .timeline-item';
        document.querySelectorAll(targets).forEach(el => {
            if (!el.querySelector('.delete-item-btn')) {
                const delBtn = document.createElement('button');
                delBtn.className = 'delete-item-btn';
                delBtn.innerHTML = '×';
                delBtn.onclick = () => el.remove();
                el.appendChild(delBtn);
            }
        });
    }

    // --- Admin Toolbar Actions ---
    const exitBtn = document.getElementById('exit-admin');
    const syncBtn = document.getElementById('sync-with-ai');

    if (exitBtn) {
        exitBtn.addEventListener('click', () => {
            document.body.classList.remove('admin-mode');
            document.querySelectorAll('[contenteditable="true"]').forEach(el => {
                el.contentEditable = 'false';
            });
            document.querySelectorAll('.delete-item-btn').forEach(b => b.remove());
        });
    }

    if (syncBtn) {
        syncBtn.addEventListener('click', () => {
            syncBtn.innerText = 'Syncing...';
            syncBtn.disabled = true;
            
            setTimeout(() => {
                alert('Changes synchronized to browser state! Now tell Antigravity (AI) to "Save my changes" to update the file permanently.');
                syncBtn.innerText = 'Changes Synced ✅';
                syncBtn.style.background = '#10b981';
            }, 1000);
        });
    }

    // --- Add Buttons Logic ---
    document.querySelector('.add-skill-cat-btn')?.addEventListener('click', () => {
        const grid = document.querySelector('.skills-grid');
        const clone = grid.children[0].cloneNode(true);
        clone.querySelector('h3').innerText = 'New Category';
        clone.querySelector('.skill-list').innerHTML = '<span class="skill-tag" contenteditable="true">New Skill</span>';
        grid.appendChild(clone);
        addDeleteButtons();
    });

    document.querySelector('.add-project-btn')?.addEventListener('click', () => {
        const grid = document.querySelector('.projects-grid');
        const clone = grid.children[0].cloneNode(true);
        clone.querySelector('h3').innerText = 'New Project Title';
        clone.querySelector('p').innerText = 'Description of your new project.';
        grid.appendChild(clone);
        addDeleteButtons();
    });

    // --- Parallax Effect for Hero ---
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
});
