const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then( localMediaStream => {
            console.log(localMediaStream);
            // video.src = window.URL.createObjectURL(localMediaStream); // this is deprecated for newer browsers
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch( err => {
            // catches when user doesn't allow video permissions
            console.log("Oh no!", err);
        })
}

// how you can render the video feed onto canvas
function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval( () => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        // pixels = redEffect(pixels);
        // pixels = rgbSplit(pixels);
        // pixels = greenScreen(pixels);
        // ctx.globalAlpha = 0.1;
        ctx.putImageData(pixels, 0, 0);
    }, 20);
}

// how we can take a photo
function takePhoto() {
    // play snapshot sound
    snap.currentTime = 0;
    snap.play();

    // grab data out of canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome'); // 'handsome' will be the name of the downloaded image
    // link.textContent = 'Download Image';
    link.innerHTML = `<img src="${data}" alt="downloaded image" />`
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for(let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100; // R spectrum
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // G spectrum
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // B spectrum
    }
    return pixels;
}

function rgbSplit(pixels) {
    for(let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // R spectrum
        pixels.data[i + 100] = pixels.data[i + 1]; // G spectrum
        pixels.data[i - 150] = pixels.data[i + 2]; // B spectrum
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        // take it out!
        pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);