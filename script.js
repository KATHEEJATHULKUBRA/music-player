const wrapper = document.querySelector(".wrapper"),
  musicImg = wrapper.querySelector("#img"),
  musicName = wrapper.querySelector(".name"),
  musicArtist = wrapper.querySelector(".artist"),
  playPauseBtn = wrapper.querySelector(".play-pause"),
  prevBtn = wrapper.querySelector("#prev"),
  nextBtn = wrapper.querySelector("#next"),
  mainAudio = wrapper.querySelector("#main-audio"),
  progressArea = wrapper.querySelector(".progress-area"),
  progressBar = progressArea.querySelector(".progress-bar");

let musicIndex = Math.floor(Math.random() * allMusic.length); // Starts from 0, not 1
let isMusicPaused = true;

window.addEventListener("load", () => {
  loadMusic(musicIndex);
});

function loadMusic(indexNumb) {
  const music = allMusic[indexNumb];
  musicName.textContent = music.name;
  musicArtist.textContent = music.artist;
  musicImg.src = `${music.img}.jpg`;
  mainAudio.src = `${music.src}.mp3`;
}

function playMusic() {
  wrapper.classList.add("paused");
  musicImg.classList.add('rotate');
  playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
  mainAudio.play();
}

function pauseMusic() {
  wrapper.classList.remove("paused");
  musicImg.classList.remove('rotate');
  playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
  mainAudio.pause();
}

function prevMusic() {
  musicIndex--;
  if (musicIndex < 0) {
    musicIndex = allMusic.length - 1; // Wrap around to the last index
  }
  loadMusic(musicIndex);
  playMusic();
}

function nextMusic() {
  musicIndex++;
  if (musicIndex >= allMusic.length) {
    musicIndex = 0; // Wrap around to the first index
  }
  loadMusic(musicIndex);
  playMusic();
}

playPauseBtn.addEventListener("click", () => {
  const isMusicPlay = wrapper.classList.contains("paused");
  if (isMusicPlay) {
    pauseMusic();
  } else {
    playMusic();
  }
});

prevBtn.addEventListener("click", () => {
  prevMusic();
});

nextBtn.addEventListener("click", () => {
  nextMusic();
});

// Move the loadeddata listener outside of the timeupdate event
mainAudio.addEventListener("loadeddata", () => {
  const musicDuration = wrapper.querySelector(".max-duration");
  let mainAdDuration = mainAudio.duration;
  let totalMin = Math.floor(mainAdDuration / 60);
  let totalSec = Math.floor(mainAdDuration % 60);
  if (totalSec < 10) {
    totalSec = `0${totalSec}`;
  }
  musicDuration.textContent = `${totalMin}:${totalSec}`;
});

mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  const musicCurrentTime = wrapper.querySelector(".current-time");
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`;
  }
  musicCurrentTime.textContent = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
  let progressWidth = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = mainAudio.duration;
  mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playMusic();
});

mainAudio.addEventListener("ended", () => {
  nextMusic();
});
