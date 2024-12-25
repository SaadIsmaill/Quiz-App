document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Basic validation
  if (name === '' || email === '' || password === '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill in all fields!',
    });
    return;
  }

  // Check password length
  if (password.length !== 8) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Password',
      text: 'Password must be exactly 8 characters long!',
    });
    return;
  }

  // Create a user object
  const user = {
    name: name,
    email: email,
    password: password // Note: Storing passwords in localStorage is not secure. Consider hashing or other methods.
  };

  // Retrieve existing users from localStorage
  let users = JSON.parse(localStorage.getItem('users')) || [];
  
  // Add the new user to the users array
  users.push(user);
  
  // Save the updated users array back to localStorage
  localStorage.setItem('users', JSON.stringify(users));

  // Simulate successful registration
  Swal.fire({
    icon: 'success',
    title: 'Registration Successful',
    text: `Welcome, ${name}! You can now take your quiz.`,
  }).then(() => {
    // Redirect to the quiz dashboard after the alert is confirmed
    window.location.href = '../quiz-login/index.html';
  });
});






