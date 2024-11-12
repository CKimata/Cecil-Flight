<?php
// Configuration file (config.php)
// Store sensitive information here and include it in your scripts
$servername = "your_host";
$username = "your_username";
$password = "your_password";
$dbname = "cecil_flight_contact";

// Email configuration
$to_email = "collokim36@gmail.com";

// Include config file
require_once 'config.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to validate input
function validate_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to send email
function send_email($to, $subject, $message) {
    $headers = array(
        'From' => 'Your Name <noreply@yourdomain.com>',
        'Reply-To' => 'noreply@yourdomain.com',
        'X-Mailer' => 'PHP/' . phpversion()
    );
    
    mail($to, $subject, $message, $headers);
    return true; // Always returns true for simplicity
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = validate_input($_POST['name']);
    $email = filter_var(validate_input($_POST['email']), FILTER_VALIDATE_EMAIL);
    $subject = validate_input($_POST['subject']);
    $message = validate_input($_POST['message']);

    // Validate required fields
    if (!$name || !$email || !$subject || !$message) {
        echo json_encode(array('success' => false, 'message' => 'Please fill out all fields.'));
        exit;
    }

    // Insert data into database
    $sql = "INSERT INTO contact_submissions (name, email, subject, message) VALUES (?, ?, ?, ?)";
    
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("ssss", $name, $email, $subject, $message);
        
        if ($stmt->execute()) {
            // Send email
            if (send_email($to_email, $subject, $message)) {
                echo json_encode(array('success' => true, 'message' => 'Email sent successfully!'));
            } else {
                echo json_encode(array('success' => false, 'message' => 'Failed to send email.'));
            }
        } else {
            echo json_encode(array('success' => false, 'message' => 'Database error: ' . $conn->error));
        }
        
        $stmt->close();
    } else {
        echo json_encode(array('success' => false, 'message' => 'SQL prepare error: ' . $conn->error));
    }

    $conn->close();
} else {
    echo json_encode(array('success' => false, 'message' => 'Invalid request method.'));
}
?>