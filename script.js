document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Responsive Navigation Menu Toggle
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const menuIcon = menuBtn ? menuBtn.querySelector("i") : null;

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            
            // Toggle menu icon between bars and close (xmark)
            if (menuIcon) {
                if (navLinks.classList.contains("active")) {
                    menuIcon.className = "fa-solid fa-xmark";
                } else {
                    menuIcon.className = "fa-solid fa-bars";
                }
            }
        });

        // Close menu if a nav link is clicked
        const links = navLinks.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                if (menuIcon) {
                    menuIcon.className = "fa-solid fa-bars";
                }
            });
        });
    }

    // 2. Interactive Contact Form Submission & Success Modal
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');
            
            // Basic validation
            if (!nameInput || !emailInput || !messageInput || !nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                showModal("Validation Error", "Please fill in all fields before sending a message.", "error");
                return;
            }
            
            if (!validateEmail(emailInput.value)) {
                showModal("Validation Error", "Please provide a valid email address.", "error");
                return;
            }

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            setTimeout(() => {
                showModal(
                    "Appointment Request Sent!",
                    `Thank you, <strong>${escapeHTML(nameInput.value)}</strong>. Your request has been successfully submitted. Our team will contact you shortly at <strong>${escapeHTML(emailInput.value)}</strong> to confirm your slot.`,
                    "success"
                );
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, 1500);
        });
    }

    // Modal creation and trigger utility
    function showModal(title, text, type) {
        // Remove existing modal if any
        const existingModal = document.querySelector(".custom-modal-overlay");
        if (existingModal) existingModal.remove();

        const modalOverlay = document.createElement("div");
        modalOverlay.className = "custom-modal-overlay";
        
        const isSuccess = type === "success";
        const iconHtml = isSuccess 
            ? '<div class="modal-icon success"><i class="fa-solid fa-circle-check"></i></div>'
            : '<div class="modal-icon error"><i class="fa-solid fa-circle-exclamation"></i></div>';

        modalOverlay.innerHTML = `
            <div class="custom-modal">
                ${iconHtml}
                <h3>${title}</h3>
                <p>${text}</p>
                <button class="modal-close-btn">Dismiss</button>
            </div>
        `;

        document.body.appendChild(modalOverlay);
        
        // Add active classes for entrance animations
        setTimeout(() => {
            modalOverlay.classList.add("active");
            modalOverlay.querySelector(".custom-modal").classList.add("active");
        }, 10);

        // Dismiss handlers
        const dismissModal = () => {
            modalOverlay.classList.remove("active");
            modalOverlay.querySelector(".custom-modal").classList.remove("active");
            setTimeout(() => modalOverlay.remove(), 400);
        };

        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) dismissModal();
        });

        modalOverlay.querySelector(".modal-close-btn").addEventListener("click", dismissModal);
    }

    // Helper functions
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    // 3. Services Category Tabs Switching
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const targetCategory = btn.getAttribute("data-category");

                // Deactivate all buttons & contents
                tabButtons.forEach(b => b.classList.remove("active"));
                tabContents.forEach(content => content.classList.remove("active"));

                // Activate selected button & content
                btn.classList.add("active");
                const targetContent = document.getElementById(targetCategory);
                if (targetContent) {
                    targetContent.classList.add("active");
                }
            });
        });
    }
});