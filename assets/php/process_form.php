<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Google reCAPTCHA validation
    $recaptcha_secret = 'YOUR_SECRET_KEY'; // Replace with your secret key
    $recaptcha_response = $_POST['g-recaptcha-response']; // Make sure the form includes 'g-recaptcha-response' field from Google reCAPTCHA
    
    // Verify the reCAPTCHA response
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify'; // URL to verify the user's response with Google
    $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
    $recaptcha = json_decode($recaptcha);
    
    if (!$recaptcha->success) {
        http_response_code(400);
        echo "reCAPTCHA verification failed. Please try again."; // If reCAPTCHA fails, return an error message
        exit;
    }

    // Sanitize and validate input data
    $name = htmlspecialchars(strip_tags(trim($_POST['name']))); // Sanitize the 'name' field to prevent XSS attacks
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL); // Sanitize the 'email' field
    $phone = htmlspecialchars(strip_tags(trim($_POST['phone']))); // Sanitize the 'phone' field
    $message = htmlspecialchars(strip_tags(trim($_POST['message']))); // Sanitize the 'message' field

    // Check if fields are empty
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        http_response_code(400);
        echo "Please fill in all fields."; // Return an error if any field is empty
        exit;
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Invalid email address."; // Return an error if email format is invalid
        exit;
    }

    // Email content
    $to = 'info@thompsonandboys.com'; // Replace with your company email address
    $subject = "New Contact Form Submission from $name";
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Message:\n$message\n";

    $headers = "From: $email";

    // Send the email
    if (mail($to, $subject, $email_content, $headers)) {
        http_response_code(200);
        echo "Thank you for your message! We will get back to you shortly."; // Success message if email is sent
    } else {
        http_response_code(500);
        echo "Something went wrong, and we couldn't send your message. Please try again later."; // Error message if email sending fails
    }
} else {
    http_response_code(403);
    echo "There was a problem with your submission, please try again."; // Return an error if request method is not POST
}
?>
