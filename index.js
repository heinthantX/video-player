const video = document.getElementById('video');
const controls = document.getElementById('controls');
const progressBar = document.getElementById('progress-bar');
const playPauseBtn = document.getElementById('play-pause');
const forward = document.getElementById('forward');
const backward = document.getElementById('backward');
const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');
const progressTime = document.getElementById('progress-time');
const fullScreen = document.getElementById('full-screen');
const volumeControl = document.getElementById('vol-control');
const volumeLogo = document.getElementById('volume-logo');

video.removeAttribute('controls');
video.controls = false;
volumeControl.value = 100;
progressBar.value = 0;
controls.style.display = 'block';

volumeControl.addEventListener('input', volumeChange);

document.addEventListener('keypress', (e) => {
  const { key } = e;
  if (key == ' ') {
    playPause();
  } else if (key == 'm') {
    muteUnmute();
  } else if (key == 'f') {
    video.requestFullscreen();
  }
});

document.addEventListener('keydown', (e) => {
  const { key } = e;
  if (key == 'ArrowDown') {
    volumeControl.value -= 7;
    volumeChange();
  } else if (key == 'ArrowUp') {
    volumeControl.value += 7;
    volumeChange();
  } else if (key == 'ArrowRight') {
    video.currentTime += 10;
  } else if (key == 'ArrowLeft') {
    video.currentTime -= 10;
  }
});

function volumeChange() {
  const { value } = volumeControl;
  volumeControl.style.backgroundSize = value + '% 100%';
  const iElement = volumeControl.previousElementSibling;
  video.volume = value / 100;
  if (value >= 50) {
    iElement.classList = 'fa-solid fa-volume-high';
  } else if (value == 0) {
    iElement.classList = 'fa-solid fa-volume-xmark';
  } else {
    iElement.classList = 'fa-solid fa-volume-low';
  }
}

volumeLogo.addEventListener('click', muteUnmute);

let tempVal;
function muteUnmute() {
  const { value } = volumeControl;
  if (value != 0) {
    tempVal = value;
    volumeControl.value = 0;
  } else {
    volumeControl.value = tempVal;
  }
  volumeChange();
}

playPauseBtn.addEventListener('click', playPause);

function playPause() {
  if (video.paused) {
    playPauseBtn.firstElementChild.className = 'fa-regular fa-circle-pause';
    video.play();
  } else {
    playPauseBtn.firstElementChild.className = 'fa-regular fa-circle-play';
    video.pause();
  }
}

video.addEventListener('timeupdate', () => {
  const percentage = (video.currentTime / video.duration) * 100;
  progressBar.style.backgroundSize = Math.floor(percentage) + '% 100%';
  progressBar.value = Math.floor(percentage);
  timeElapsed.textContent = new Date(video.currentTime * 1000)
    .toISOString()
    .substring(14, 19);
});

forward.addEventListener('click', () => {
  video.currentTime += 10;
});

backward.addEventListener('click', () => {
  video.currentTime -= 10;
});

video.addEventListener('loadeddata', (e) => {
  duration.textContent = new Date(video.duration * 1000)
    .toISOString()
    .substring(14, 19);
});

progressBar.addEventListener('input', (e) => {
  let { value } = e.target;
  video.currentTime = video.duration * (value / 100);
});

progressBar.addEventListener('mousemove', (e) => {
  let progressWidthVal = progressBar.clientWidth;
  let x = e.offsetX;

  progressTime.style.setProperty('--xx', `${x}px`);
  progressTime.style.display = 'block';

  let videoDuration = video.duration;
  let progressTimes = Math.floor((x / progressWidthVal) * videoDuration);
  progressTime.textContent = new Date(progressTimes * 1000)
    .toISOString()
    .substring(14, 19);
});

progressBar.addEventListener('mouseleave', () => {
  progressTime.style.display = 'none';
});

video.addEventListener('ended', () => {
  playPauseBtn.firstElementChild.classList = 'fa-solid fa-rotate-left';
});

{
  /* <i class="fa-solid fa-compress"></i> */
}
fullScreen.addEventListener('click', () => {
  video.requestFullscreen();
});
