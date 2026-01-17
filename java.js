const canvas = document.getElementById("loveCanvas");
const ctx = canvas.getContext("2d");

function resizeLove() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeLove();
window.addEventListener("resize", resizeLove);

class Love {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 200;
        this.size = Math.random() * 8 + 8;
        this.speed = Math.random() * 0.4 + 0.3;
        this.alpha = Math.random() * 0.5 + 0.5;
        this.swing = Math.random() * 1.5;
        this.angle = Math.random() * Math.PI * 2;
        this.rotate = Math.random() * 0.01 - 0.005;
        this.rotation = Math.random() * Math.PI;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.size / 20, this.size / 20);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-10, -10, -20, 5, 0, 20);
        ctx.bezierCurveTo(20, 5, 10, -10, 0, 0);

        ctx.fillStyle = `rgba(255,120,160,${this.alpha})`;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(255,80,140,0.9)";
        ctx.fill();

        ctx.restore();
    }

    update() {
        this.y -= this.speed;
        this.angle += 0.02;
        this.x += Math.sin(this.angle) * this.swing;
        this.rotation += this.rotate;

        if (this.y < -50) this.reset();
        this.draw();
    }
}

const loves = [];
for (let i = 0; i < 35; i++) loves.push(new Love());

function animateLove() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    loves.forEach(l => l.update());
    requestAnimationFrame(animateLove);
}
animateLove();



const songs = [
    {
        title: "About you",
        artist: "The 1975",
        src: "c:/Users/Rifqia/Music/SpotiDownloader.com - About You - The 1975.mp3",
        cover: "c:/Users/Rifqia/OneDrive/Pictures/Lirik-lagu-About-You-The-1975.jpg"
    },
    {
        title: "Blue",
        artist: "Yung Kai",
        src: "c:/Users/Rifqia/Music/spotifydown.com - blue.mp3",
        cover: "c:/Users/Rifqia/OneDrive/Pictures/Blue.jpg"
    },
    {
        title: "Cinta luar biasa",
        artist: "Andmesh",
        src: "c:/Users/Rifqia/Music/spotifydown.com - Cinta Luar Biasa.mp3",
        cover: "c:/Users/Rifqia/OneDrive/Pictures/cinta luar biasa cover gambar.jpg"
    },
    {
        title: "Kasih putih",
        artist: "Glenn fredly",
        src: "c:/Users/Rifqia/Music/SpotiDownloader.com - Kasih Putih - Yovie Widianto.mp3",
        cover: "c:/Users/Rifqia/OneDrive/Pictures/Kasih putih.jpg"
    },
    {
        title: "Rahasia hati",
        artist: "Nidji",
        src: "c:/Users/Rifqia/Music/spotifydown.com - Rahasia Hati.mp3",
        cover: "c:/Users/Rifqia/OneDrive/Pictures/Rahasia hati nidji.jpg"
    },
    {
        title: "Season",
        artist: "Wave to earth",
        src: "c:/Users/Rifqia/Downloads/v4.www-y2mate.blog - wave to earth - seasons (320 KBps).mp3",
        cover: "c:/Users/Rifqia/OneDrive/Pictures/wave to earth.jpg"
    }
];

let currentSong = 0;
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const playlist = document.getElementById('playlist');

function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.src;
}

function playSong() {
    audio.play();
    playBtn.textContent = "pause";
}

function pauseSong() {
    audio.pause();
    playBtn.textContent = "play";
}

playBtn.addEventListener('click', () => {
    if (audio.paused) playSong();
    else pauseSong();
});

nextBtn.addEventListener('click', () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    playSong();
});

prevBtn.addEventListener('click', () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    playSong();
});

songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${song.title}`;
    li.addEventListener("click", () => {
        currentSong = index;
        loadSong(currentSong);
        playSong();
    });
    playlist.appendChild(li);
});

loadSong(currentSong);
