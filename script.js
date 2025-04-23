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
