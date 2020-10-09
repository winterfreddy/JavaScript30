// let's grab our needed elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fscreen = player.querySelector('.fscreen');

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
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    // calculate progress percentage
    const percent = (video.currentTime/video.duration) * 100;

    // change flexbasis to represent current video progress
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX/progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function handleFullScreen() {
    if(video.requestFullscreen) {
        video.requestFullscreen();
    }
    else if(video.mozRequestFullScreen) {
        video.mozRequestFullScreen(); // for firefox
    }
    else if(video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen(); // for Chrome, Safari, Opera
    }
    else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();    // for IE/Edge
    }
}

// lastly hook up the event listeners to those functions

// for on-screen click to play/pause
video.addEventListener('click', togglePlay);

// eventlisteners to dynamically change buttons
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// eventlistener for video progress
video.addEventListener('timeupdate', handleProgress);

// for play/pause button
toggle.addEventListener('click', togglePlay);

// for skip buttons
skipButtons.forEach( button => {
    button.addEventListener('click', skip);
})

// handle dynamic range slider
    // mousedown to move slider
ranges.forEach( range => {
    range.addEventListener('change', handleRangeUpdate);
})
    // mousemove to know position before changing slider
ranges.forEach( range => {
    range.addEventListener('mousemove', handleRangeUpdate);
})

// handle dynamic scrub
let mousedown = false;
progress.addEventListener('click', scrub);

// way one
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

// way two
// progress.addEventListener('mousemove', () => {
//     if(mousedown) {
//         scrub();
//     }
// });
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

// handle full screen
fscreen.addEventListener('click', handleFullScreen);