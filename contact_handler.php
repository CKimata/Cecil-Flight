<?php
// Database connection settings
$servername = "your_host";
$username = "your_username";
$password = "your_password";
$dbname = "cecil_flight_contact";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to send email
function send_email($to, $subject, $message) {
    // You can implement your own email sending logic here
    // For now, we'll just return true
    return true;
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Insert data into database
    $sql = "INSERT INTO contact_submissions (name, email, subject, message) VALUES (?, ?, ?, ?)";
    
    if ($stmt = $conn->prepare($sql)) {
        $stmt->bind_param("ssss", $name, $email, $subject, $message);
        
        if ($stmt->execute()) {
            // Send email
            if (send_email('collokim36@gmail.com', $subject, $message)) {
                echo json_encode(array('success' => true, 'message' => 'Email sent successfully!'));
            } else {
                echo json_encode(array('success' => false, 'message' => 'Failed to send email.'));
            }
        } else {
            echo json_encode(array('success' => false, 'message' => 'Database error: ' . $conn->error));
        }
        
        $stmt->close();
    }

    $conn->close();
}
?>