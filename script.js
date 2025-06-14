function checkPassword() {
    const input = document.getElementById('password').value;
    const errorMsg = document.getElementById('error');
    const correctPassword = 'mishle';

    if (input === correctPassword) {
        window.location.href = 'home.html';
    } else {
        errorMsg.textContent = 'Incorrect password. Try again.';
    }
}

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 500);
    }
});

