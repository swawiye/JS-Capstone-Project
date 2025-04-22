//Responsive navbar
const hamburgerButton = document.getElementById('hamburger-button');
const mobileMenu = document.getElementById('mobile-menu');

hamburgerButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

//Music toggle buttons
let progress = document.getElementById("progress");
let song = document.getElementById("progress");
let ctrlIcon = document.getElementById("progress");
