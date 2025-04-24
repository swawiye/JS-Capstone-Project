//Responsive navbar
const hamburgerButton = document.getElementById('hamburger-button');
const mobileMenu = document.getElementById('mobile-menu');

hamburgerButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
});
//Ensures that the script loads before the DOM is loaded: "document.addEventListener('DOMContentLoaded', () => {});"

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
        title: "Promises",
        artist: "Cleo Sol",
        file: "assets/Promises.mp4",
        image: "assets/hero2.jpg"
    },
    {
        title: "One love",
        artist: "Bob Marley ft The Wailers",
        file: "assets/Bob Marley  The Wailers - One Love  People Get Ready (Official Music Video).mp4",
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

const nextTrack = () => { //also helps in checking shuffle
    if (isShuffle) {
        shuffleTrack();
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        playTrack();
    }
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

//Shuffle function
let isShuffle = false;

const shuffleTrack = () => {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * playlist.length);
    } while (newIndex === currentTrackIndex); // to avoid repeating the same track

    currentTrackIndex = newIndex;
    loadTrack(currentTrackIndex);
    playTrack();
};

//connect to shuffle btn
const shuffleBtn = document.querySelector(".fa-shuffle");

shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle("active", isShuffle); // Optional: add a visual cue
});

//Go to next song automatically after finishing
song.addEventListener("ended", () => {
    nextTrack(); // or shuffleTrack() if isShuffle is true
});

//Fetching data from the Spotify API
async function fetchData() { 
    try{
        const response = await fetch("https://api.spotify.com.");
        if(!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        console.log(data);
    }
    catch(error) {
        console.error(error);
    }
};
fetchData();

//LOG IN & SIGN UP PAGE
//Sign Up Form
// Get form elements
let signUpForm = document.getElementById('signUpForm');
let fullNameInput = document.getElementById('fullName');
let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
let confirmPasswordInput = document.getElementById('confirmPassword');
let fullNameError = document.getElementById('fullNameError');
let emailError = document.getElementById('emailError');
let passwordError = document.getElementById('passwordError');
let confirmPasswordError = document.getElementById('confirmPasswordError');

// Add event listener for form submission
signUpForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting immediately

    // Clear previous error messages
    clearErrors();

    // Validate form inputs
    let isValid = true;

    // Validate Full Name (must not contain numbers)
    if (fullNameInput.value.trim() === "") {
        fullNameError.textContent = "Full Name is required";
        isValid = false;
    } else if (/\d/.test(fullNameInput.value)) {
        fullNameError.textContent = "Full Name should not contain numbers";
        isValid = false;
    }

    // Validate Email
    if (emailInput.value.trim() === "") {
        emailError.textContent = "Email is required";
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address";
        isValid = false;
    }

    // Validate Password (must be at least 6 characters)
    if (passwordInput.value.trim() === "") {
        passwordError.textContent = "Password is required";
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters long";
        isValid = false;
    }

    // Validate Confirm Password (must match the password)
    if (confirmPasswordInput.value.trim() === "") {
        confirmPasswordError.textContent = "Please confirm your password";
        isValid = false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        confirmPasswordError.textContent = "Passwords do not match";
        isValid = false;
    }

    // If all validations pass, store data in local storage
    if (isValid) {
        saveUserData();
    }
});

// Function to clear error messages
function clearErrors() {
    fullNameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
}

// Email validation using regular expression
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Function to save user data to local storage
function saveUserData() {
    const userData = {
        fullName: fullNameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };

    // Save to local storage
    localStorage.setItem('userData', JSON.stringify(userData));

    // Display a success message or redirect
    alert('Sign up successful!');
    window.location.href = 'login.html'; // Optionally redirect to login page
}

//Log In form
loginForm = document.getElementById('loginForm');
emailInput = document.getElementById('email');
passwordInput = document.getElementById('password');
emailError = document.getElementById('emailError');
passwordError = document.getElementById('passwordError');

// Add event listener for form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting immediately

    // Clear previous error messages
    clearErrors();

    // Validate form inputs
    let isValid = true;

    // Validate Email
    if (emailInput.value.trim() === "") {
        emailError.textContent = "Email is required";
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address";
        isValid = false;
    }

    // Validate Password
    if (passwordInput.value.trim() === "") {
        passwordError.textContent = "Password is required";
        isValid = false;
    }

    // If validation is successful, proceed (can add further logic here)
    if (isValid) {
        alert('Log in successful!');
        // Implement further actions (e.g., redirect or save data)
        window.location.href = 'home.html'; // Redirect to home page or dashboard
    }
});

// Function to clear error messages
function clearErrors() {
    emailError.textContent = "";
    passwordError.textContent = "";
}

// Email validation using regular expression
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

