// Replace these values with your own from EmailJS dashboard
const SERVICE_ID = 'your_service_id';
const TEMPLATE_ID = 'your_template_id';
const USER_ID = 'your_user_id';

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');

    if (!contactForm) {
        console.error("Contact form not found");
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);

        // Validate form data
        if (!formData.get('name') || !formData.get('email') || !formData.get('message')) {
            showAlert('Please fill out all fields.', 'error');
            return;
        }

        // Send email using EmailJS
        window.emailjs.send(SERVICE_ID, TEMPLATE_ID, Object.fromEntries(formData))
            .then((result) => {
                console.log('SUCCESS!', result.status, result.text);
                showAlert('Email sent successfully!', 'success');
            }, (error) => {
                console.log('FAILED...', error);
                showAlert('An unexpected error occurred.', 'error');
            });

        // Reset form after submission
        this.reset();
    });
});

function showAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.className = `alert` + type;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
       setTimeout(() => {
        alertBox.remove();
    }, 3000);
}
