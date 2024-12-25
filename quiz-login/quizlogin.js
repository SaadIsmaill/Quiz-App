document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create a user object
    const user = {
        email: email,
        password: password
    };

    // Get existing users from localStorage or initialize an empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Add the new user to the array
    users.push(user);

    // Save the updated users array back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Optionally, you can clear the input fields after submission
    document.getElementById('loginForm').reset();

    // Use SweetAlert to provide feedback to the user
    Swal.fire({
        title: 'Success!',
        text: 'Login data saved successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then((result) => {
        if (result.isConfirmed) {
            // Redirect to the quiz dashboard after the alert is confirmed
            window.location.href = '../quiz-dashboard/index.html';
        }
    });
});