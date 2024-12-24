// Simulate showing success message after quiz completion
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
        document.getElementById('successMessage').classList.remove('hidden');
    }
});