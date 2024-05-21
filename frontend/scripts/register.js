document.getElementById('register-form').addEventListener('submit', function(event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        // Passwords do not match, prevent form submission
        event.preventDefault();
        document.getElementById('password-error').style.display = 'block';
    }
});
