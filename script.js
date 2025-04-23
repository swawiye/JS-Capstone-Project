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
    setInterval(() => {
        progress.value = song.currentTime;
    }, 5000);
};

//Play song at sought time on progress bar
progress.onchange = function () {
    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
};

//Volume slider
let volume_slider = document.querySelector('.volume_slider');
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}

//Repeat the song
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}

//Update the time
