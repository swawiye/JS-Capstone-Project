//Responsive navbar
const hamburgerButton = document.getElementById('hamburger-button');
const mobileMenu = document.getElementById('mobile-menu');

hamburgerButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Get DOM elements
const song = document.getElementById("song");
const progress = document.getElementById("progress");
const ctrlIcon = document.getElementById("ctrlIcon");
const volumeSlider = document.querySelector('.volume_slider');
const currentTimeDisplay = document.querySelector(".current-time");

// Helpers
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
};

//Time formatting
const updateProgress = () => {
    progress.value = song.currentTime;
    currentTimeDisplay.innerText = formatTime(song.currentTime);
};

//Play & pause icon
const updatePlayPauseIcon = (isPlaying) => {
    ctrlIcon.classList.toggle("fa-play", !isPlaying);
    ctrlIcon.classList.toggle("fa-pause", isPlaying);
};

// Actions
const togglePlayPause = () => {
    if (song.paused) {
        song.play();
        updatePlayPauseIcon(true);
    } else {
        song.pause();
        updatePlayPauseIcon(false);
    }
};

const changeProgress = () => {
    song.currentTime = progress.value;
    if (song.paused) song.play();
    updatePlayPauseIcon(true);
};

const setVolume = () => {
    song.volume = volumeSlider.value / 100;
};

// Button functionality
ctrlIcon.addEventListener("click", togglePlayPause);
progress.addEventListener("change", changeProgress);
volumeSlider.addEventListener("input", setVolume);

song.addEventListener("loadedmetadata", () => {
    progress.max = song.duration;
});

song.addEventListener("timeupdate", updateProgress);

//Tracklist
const playlist = [
    {
        title: "Infrunami",
        artist: "Steve Lacy",
        file: "assets/Infrunami.mp4",
        image: "assets/hero3.jpg"
    },
    {
        title: "Dark Red",
        artist: "Steve Lacy",
        file: "assets/DarkRed.mp4",
        image: "assets/hero2.jpg"
    },
    {
        title: "Bad Habit",
        artist: "Steve Lacy",
        file: "assets/BadHabit.mp4",
        image: "assets/hero1.jpg"
    }
];

let currentTrackIndex = 0;

//Track loading
const songImg = document.querySelector(".song-img");
const songTitle = document.querySelector("h1");
const songArtist = document.querySelector("p");

const loadTrack = (index) => {
    const track = playlist[index];
    song.src = track.file;
    songImg.src = track.image;
    songTitle.textContent = track.title;
    songArtist.textContent = track.artist;

    progress.value = 0;
    updatePlayPauseIcon(false);
};

//Track control functions
const playTrack = () => {
    song.play();
    updatePlayPauseIcon(true);
};

const pauseTrack = () => {
    song.pause();
    updatePlayPauseIcon(false);
};

const nextTrack = () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
};

const prevTrack = () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
};

const repeatTrack = () => {
    loadTrack(currentTrackIndex);
    playTrack();
};

//Connect buttons
document.querySelector(".fa-forward-step").addEventListener("click", nextTrack);
document.querySelector(".fa-backward-step").addEventListener("click", prevTrack);
document.querySelector(".repeat-track").addEventListener("click", repeatTrack);

//Load the first track on page load
window.addEventListener("DOMContentLoaded", () => {
    loadTrack(currentTrackIndex);
});





