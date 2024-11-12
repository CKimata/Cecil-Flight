// Replace these values with your own from EmailJS dashboard
const SERVICE_ID = 'your_service_id';
const TEMPLATE_ID = 'your_template_id';
const USER_ID = 'your_user_id';

// Function to show alerts
function showAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.className = `alert ${type}`;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

// Function to validate form inputs
function validateInput(input) {
    return input.trim().replace(/<|>/g, '');
}

// Main form submission handler
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
        const name = validateInput(formData.get('name'));
        const email = formData.get('email').trim();
        const subject = validateInput(formData.get('subject'));
        const message = validateInput(formData.get('message'));

        if (!name || !email || !subject || !message) {
            showAlert('Please fill out all fields.', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            showAlert('Please enter a valid email address.', 'error');
            return;
        }

        // Prepare email content
        const templateParams = {
            from_name: name,
            reply_to: email,
            subject: subject,
            message_html: message
        };

        // Send email using EmailJS
        window.emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then((result) => {
                console.log('SUCCESS!', result.status, result.text);
                showAlert('Email sent successfully!', 'success');
                // Reset form after successful submission
                contactForm.reset();
            }, (error) => {
                console.error('FAILED...', error);
                showAlert('An unexpected error occurred.', 'error');
            });
    });
});