const claveCorrecta = "SPBDL18";
const loginScreen = document.getElementById('login-screen');
const secondaryScreen = document.getElementById('secondary-screen');
const errorModal = document.getElementById('error-modal');
const songListModal = document.getElementById('song-list-modal');
const claveInput = document.getElementById('clave-input');
const iniciarBtn = document.getElementById('iniciar-btn');
const aceptarBtn = document.getElementById('aceptar-btn');
const closeListBtn = document.getElementById('close-list-btn');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const listBtn = document.getElementById('list-btn');
const progressBar = document.getElementById('progress-bar');
const albumImg = document.getElementById('album-img');
const songList = document.getElementById('song-list');

iniciarBtn.addEventListener('click', () => {
    if (claveInput.value === claveCorrecta) {
        loginScreen.classList.add('hidden');
        secondaryScreen.classList.remove('hidden');
    } else {
        errorModal.classList.remove('hidden');
    }
});

aceptarBtn.addEventListener('click', () => {
    errorModal.classList.add('hidden');
    claveInput.value = ''; // Limpiar el input
});

const songs = [
    { title: 'Holiday', src:"resources/Audio/Holiday.mp3", img: "resources/Image/Holiday.jpg" },
    { title: 'GOSSIP', src:"resources/Audio/GOSSIP.mp3", img: "resources/Image/GOSSIP.jpg" },
    { title: 'I Dont Want to Miss a Thing', src:"resources/Audio/IDontWanttoMissaThing.mp3", img: "resources/Image/IDontWanttoMissaThing.jpg" },
    { title: 'The Emptiness Machine', src:"resources/Audio/TheEmptinessMachine.mp3", img: "resources/Image/TheEmptinessMachine.jpg" },
    { title: 'Heathens', src:"resources/Audio/Heathens.mp3", img: "resources/Image/Heathens.jpg" }
]

/*Reproductor de audio */

let currentSongIndex = 0;
let isPlaying = false;

const audio = new Audio(songs[currentSongIndex].src);
const songTitle = document.getElementById('song-title');
const albumImages = document.querySelectorAll('.album-img');

/*Funcioens base */

function loadSong(index) {
    // Actualizar audio
    audio.src = songs[index].src;
    songTitle.textContent = songs[index].title;

    // Cambiar imágenes
    albumImages.forEach((img, i) => {
        img.style.display = i === index ? 'block' : 'none';
    });

    progressBar.value = 0;
}

function playSong() {
    audio.play();
    isPlaying = true;
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

function prevSong() {
    currentSongIndex =
        (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
}

/*Eventos de botones */

playBtn.addEventListener('click', playSong);
pauseBtn.addEventListener('click', pauseSong);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

/*Progreso de audio */

audio.addEventListener('timeupdate', () => {
    const progress =
        (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress || 0;
});

progressBar.addEventListener('input', () => {
    audio.currentTime =
        (progressBar.value / 100) * audio.duration;
});

/*Al terminar la canción*/

audio.addEventListener('ended', nextSong);

/*Lista de canciones */

listBtn.addEventListener('click', () => {
    songList.innerHTML = '';

    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;

        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(index);
            playSong();
            songListModal.classList.add('hidden');
        });

        songList.appendChild(li);
    });

    songListModal.classList.remove('hidden');
});

closeListBtn.addEventListener('click', () => {
    songListModal.classList.add('hidden');
});
/*Cargar inicial */

loadSong(currentSongIndex);