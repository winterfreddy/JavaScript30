// let's grab our needed elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// then let's build out functions using above elements

function togglePlay() {
    // one way
    // const method = video.paused ? 'play' : 'pause';
    // video[method]();

    // second way
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

// lastly hook up the event listeners to those functions

// for on-screen click to play/pause
video.addEventListener('click', togglePlay);

// eventlisteners to dynamically change buttons
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// for play/pause button
toggle.addEventListener('click', togglePlay);

// for skip buttons
skipButtons.forEach( button => {
    button.addEventListener('click', skip);
})