document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const { name, email, subject, message } = Object.fromEntries(formData);

        try {
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    to: 'collokim36@gmail.com',
                    senderName: name,
                    senderEmail: email,
                    subject: subject,
                    message: message
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Email Sent!',
                    text: 'Your message has been sent successfully.'
                });
                // Clear form fields after successful submission
                this.reset();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error Sending Email',
                    text: 'Please try again later.'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error Sending Email',
                text: 'An unexpected error occurred. Please try again later.'
            });
        }
    });
});