const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl=document.getElementById('current-time');
const durationEl=document.getElementById('duration');
const previousBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

//Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Sevent Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Jacinto Design",
  },
];

// check if Playing
let isPlaying = false;
// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

//Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

//Play or Pause EventListener

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//Update DOM

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}
//Current Song
let songIndex = 0;

//On Load - Select First Song
loadSong(songs[0]);

//Next Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
  } else {
    loadSong(songs[songIndex]);
    playSong();
  }
}
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
  } else {
    loadSong(songs[songIndex]);
    playSong();
  }
}
//Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    
    //Update Progress Bar width
    const progressPercentage=(currentTime/duration)*100;
    progress.style.width=  `${progressPercentage}%`;
    //change current time and duration
    const durationMinutes=Math.floor(duration/60);
    let durationSeconds=Math.floor(duration%60);
    if(durationSeconds<10){
        durationSeconds=`0${durationSeconds}`;
    }
    //Delay switching duration Element to avoide NaN
    if(durationSeconds){
        durationEl.textContent=`${durationMinutes}:${durationSeconds}`;
    }
    //current time
    const currentMinutes=Math.floor(currentTime/60);
    let currentSeconds=Math.floor(currentTime%60);
    if(currentSeconds<10){
        currentSeconds=`0${currentSeconds}`;
    }

    currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`;
    

  }
}

function setProgressBar(e){
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const {duration}=music;
    music.currentTime=(clickX/width)*duration;
    

}

//Event Listeners
previousBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener('ended',nextSong); 
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);
