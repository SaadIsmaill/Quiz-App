document.getElementById('enrollmentForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
  
    if (name && email) {
      Swal.fire({
        icon: 'success',
        title: 'Enrollment Successful',
        text: `Thank you for enrolling, ${name}!`,
        allowOutsideClick: false,
        confirmButtonText: 'Take a Quiz Now!',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '../quiz-dashboard/index.html';
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out all fields.',
      });
    }
  });
  