const musicContainer = document.getElementsByClassName('action-button')[0];
const playBtn = document.getElementById('play-pause');
const prevBtn = document.getElementsByClassName('prev')[0];
const nextBtn = document.getElementsByClassName('next')[0];
const progress = document.getElementById('bar');
const progressContainer = document.getElementsByClassName('progressbar')[0];
const audio = document.getElementById('audio');
const cover = document.getElementsByClassName('cover')[0];
const thumbnail = document.getElementById('thumbnail');
const currTime = document.getElementsByClassName('play-current-time')[0];
const durTime = document.getElementsByClassName('play-total-time')[0];
const loop = document.getElementsByClassName('loop')[0];
var list = document.getElementById('demo');
const like = document.getElementsByClassName('favorite')[0];
var li = document.getElementsByTagName("li");


const songs = ['Riha', 'Baarishein', 'Alag Aasmaan'];

let songIndex = 1;

// Initially load song details into DOM
loadSong(songs[songIndex]);

function loadSong(song) {
  // title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
  thumbnail.src = `images/${song}.jpg`;
  document.body.style.backgroundImage = `url('images/${song}.jpg')`;
  }
// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {s
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  updateLike();
  playSong();
  
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  updateLike();
  playSong();

}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;
		
};


playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
loop.addEventListener('click', () =>{
	const inLoop = loop.classList.contains('Loop');
	if (inLoop){
		loop.classList.remove('Loop');
	}
	else{
	loop.classList.add('Loop');
	}
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('ended', () =>{
	const inLoop = loop.classList.contains('Loop');
	if (inLoop) {
    loadSong(songs[songIndex]);
    playSong();
  } else {
    nextSong();
  }
});
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('timeupdate',DurTime);
function updateLike(){
var Liked = document.getElementById(songs[songIndex]);
	if(Liked){
		like.querySelector('i.fa-heart').classList.remove('far');
 	    like.querySelector('i.fa-heart').classList.add('fas');
	}
	else{
		 var isLiked = like.querySelector('i.fa-heart').classList.contains('fas');
		 if(isLiked){
		 	like.querySelector('i.fa-heart').classList.remove('fas');
		 	like.querySelector('i.fa-heart').classList.add('far');
		 }
	}
}

like.addEventListener('click', () =>{
	var Liked = document.getElementById(songs[songIndex]);
	if(Liked){
         list.removeChild(Liked);
         like.querySelector('i.fa-heart').classList.remove('fas');;
		 like.querySelector('i.fa-heart').classList.add('far');
	}
	else{
	var entry = document.createElement('li');
		entry.setAttribute('id', songs[songIndex]);
	    entry.appendChild(document.createTextNode(songs[songIndex]));
	    list.appendChild(entry);
	    like.querySelector('i.fa-heart').classList.remove('far');
		like.querySelector('i.fa-heart').classList.add('fas');
	}
	li = document.getElementsByTagName("li");
	for(var i = 0;i<li.length;i++){
    li[i].addEventListener("click", (e) =>{
    // pauseSong();
    var id=e.target.attributes.id.value;
	 loadSong(id);
	 playSong();
	 songIndex = songs.findIndex(song => song === id);
	 updateLike();
    });
}
	 });

