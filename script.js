// Credit goes to Omar Benseddik for this project 
// <!--Credit: Tinloof https://github.com/tinloof/gold-stopwatch-->

function timeToString(time) {
    // create a diffInHrs variable (this is the time divided by 3600000)
    let diffInHrs = time / 3600000;
    // create a variable that takes the floor of the variable you created above
    let hh = Math.floor(diffInHrs);

    // create a variable for difference in minutes (subtract the diffInHrs and the floored hours and multiply by 60)
    let diffInMin = (diffInHrs - hh) * 60;
    // do Math.floor(diffInMin) and put that into the variable
    let mm = Math.floor(diffInMin);

    // same procedure for seconds
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    // same procedure for milliseconds
    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    // format the strings, use padStart
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

// declare variables to use in our functions below, we need startTime, elapsedTime, and the timerInterval
let startTime;
let elapsedTime = 0;
let timerInterval;

// function that sets the display element's innerHTML equal to the passed in text
function print(txt) {
    document.getElementById("display").innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    // constantly updates the time difference 
    // difference between Date.now() and startTime refreshed every 10 milliseconds
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    showButton("PAUSE");
}

function pause() {
    // global method that pauses the constantly active setInterval
    clearInterval(timerInterval);
    // show the play button
    showButton("PLAY");
}

function reset() {
    clearInterval(timerInterval);
    // display 00:00:00
    print("00:00:00");
    // set ElapsedTime to 0
    elapsedTime = 0;
    // show the play button
    showButton("PLAY");
}

// function to display buttons
function showButton(buttonKey) {
    const buttonToShow = buttonKey === "PLAY" ? playButton : pauseButton;
    const buttonToHide = buttonKey === "PLAY" ? pauseButton : playButton;
    buttonToShow.style.display = "block";
    buttonToHide.style.display = "none";
}

// event listeners
// create playButton, pauseButton, and resetButton using getElementById
let playButton = document.getElementById('playButton');
let pauseButton = document.getElementById('pauseButton');
let resetButton = document.getElementById('resetButton');

// add event listeners to the button variables you created
playButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);
