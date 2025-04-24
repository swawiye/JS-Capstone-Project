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

// SignUp Validation & LocalStorage
if (document.getElementById('form')) {
    document.getElementById('form').addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('f-name-input').value.trim();
        const email = document.getElementById('email-input').value.trim();
        const password = document.getElementById('password-input').value;
        const confirmPassword = document.getElementById('confirm-password-input').value;
        const errorMessage = document.getElementById('error-message');

        // Basic validation
        if (!name || !email || !password || !confirmPassword) {
            errorMessage.textContent = "All fields are required.";
            errorMessage.style.color = "red";
            return;
        }

        if (!email.includes('@')) {
            errorMessage.textContent = "Please enter a valid email address.";
            errorMessage.style.color = "red";
            return;
        }

        if (password !== confirmPassword) {
            errorMessage.textContent = "Passwords do not match.";
            errorMessage.style.color = "red";
            return;
        }

        // Store data in localStorage
        const userData = {
            name,
            email,
            password
        };
        localStorage.setItem('user', JSON.stringify(userData));

        alert("Signup successful! You can now log in.");
        window.location.href = "login.html"; // Redirect to login
    });
}

//SIGN UP FORM
// Get form elements
const signUpForm = document.getElementById('signUpForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const fullNameError = document.getElementById('fullNameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');


// Login Validation
if (window.location.pathname.includes('login.html')) {
    document.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.querySelector('input[name="email"]').value.trim();
        const password = document.querySelector('input[name="password"]').value;

        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (!storedUser) {
            alert("No user found. Please sign up first.");
            return;
        }

        if (email === storedUser.email && password === storedUser.password) {
            alert("Login successful!");
            window.location.href = "index.html"; // Redirect to homepage
        } else {
            alert("Invalid email or password.");
        }
    });
}

/*
const form = document.getElementById("form");
const fNameInput = document.getElementById("f-name-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const confirmPasswordInput = document.getElementById("confirm-password-input");
const errorMessage = document.getElementById("error-message")

let users = JSON.parse(localStorage.getItem('users')) || [];
function isUserLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
  }
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let errors = [];
    if (fNameInput) {
        // Signup form validation
        errors = getSignUpFormErrors(
            fNameInput.value,
            emailInput.value,
            passwordInput.value,
            confirmPasswordInput.value
    );
    if (errors.length === 0) {
        // Check if user already exists
        const userExists = users.some(user => user.email === emailInput.value);
        if (userExists) {
            errors.push("Email already registered");
            emailInput.parentElement.classList.add("incorrect");
        } else {
            // Save new user
            users.push({
                fName: fNameInput.value,
                email: emailInput.value,
                password: passwordInput.value
            });
            localStorage.setItem('users', JSON.stringify(users));
            handleSuccessfulLogin();
            alert("Signup successful! Please login.");
            window.location.href = "login.html"; // Redirect to login page
        }
    }else {
        // Login form validation
        errors = getLoginFormErrors(emailInput.value, passwordInput.value);
        if (errors.length === 0) {
            // Check credentials
            const user = users.find(user => user.email === emailInput.value);
            if (!user) {
                errors.push("Email not found");
                emailInput.parentElement.classList.add("incorrect");
            } else if (user.password !== passwordInput.value) {
                errors.push("Incorrect password");
                passwordInput.parentElement.classList.add("incorrect");
            } else {
                alert("Welcome back!");
                // Store the logged-in user's email
                localStorage.setItem('currentUser', JSON.stringify(user.email));
                window.location.href = "index.html"; // Redirect after login
            }
        }
    };
    if (errors.length > 0) {
        errorMessage.innerText = errors.join(". ");
    } else {
        // If no errors, the form would submit normally
    }
    };
    //creating an array that will hold the error messages
    function getSignUpFormErrors(fname, email, password, confirmPassword) {
    let errors = []
    if(fname === "" || fname == null){
        errors.push("First name is required")
        fNameInput.parentElement.classList.add("incorrect")
    }
    if(email === "" || email == null){
        errors.push("Email is required")
        emailInput.parentElement.classList.add("incorrect")
    }
    if(password === "" || password == null){
        errors.push("Password is required")
        passwordInput.parentElement.classList.add("incorrect")
    }
    if(password != confirmPassword){
        errors.push("Password does not match confirmed password")
        passwordInput.parentElement.classList.add("incorrect")
        confirmPasswordInput.parentElement.classList.add("incorrect")
    }
    if(password.length < 8) {
        errors.push("Password should not be less than 6 characters")
        passwordInput.parentElement.classList.add("incorrect")
    }
    return errors;
    isUserLoggedIn()
    };
    function getLoginFormErrors(email, password) {
        let errors = []
        if(email === "" || email == null){
            errors.push("Email is required")
            emailInput.parentElement.classList.add("incorrect")
        }
        if(password === "" || password == null){
            errors.push("Password is required")
            passwordInput.parentElement.classList.add("incorrect")
        }
        return errors
    }
    const allInputs = [firstNameInput, emailInput, passwordInput, repeatPasswordInput].filter(input => input != null)
    allInputs.forEach(input => {
        input.addEventListener("input", () => {
            if(input.parentElement.classList.contains("incorrect")){
                input.parentElement.classList.remove("incorrect")
                errorMessage.innerText = ""
            }
        })
        isUserLoggedIn()
    });
}):
*/
    


  




