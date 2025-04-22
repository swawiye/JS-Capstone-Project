//Responsive navbar
const hamburgerButton = document.getElementById('hamburger-button');
const mobileMenu = document.getElementById('mobile-menu');

hamburgerButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

//Music toggle buttons
let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
};

//Toggle play and pause button
function playPause() {
   if(ctrlIcon.classList.contains("fa-pause")) {
    song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
   }
   else {
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
   };
};

if(song.play()) {
    
}

