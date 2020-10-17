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

getVideo();

video.addEventListener('canplay', paintToCanvas);