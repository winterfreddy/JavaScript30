let countdown;

function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;

    countdown = setInterval( () => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        // stop the countdown at zero
        if (secondsLeft <= 0) {
            clearInterval(countdown);
            return;
        }

        // display the seconds left
        console.log(secondsLeft);
    }, 1000);
}