document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login request
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (!response.ok) {
            // Authentication failed, display error message
            return response.text().then(errorMessage => {
                document.getElementById('error-message').textContent = errorMessage;
            });
        } else {
            // Authentication successful, redirect to chat page
            window.location.href = '/chat';
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        document.getElementById('error-message').textContent = 'An unexpected error occurred';
    });
});
