const songs = [
  //A
  {
    title: "Intro",
    artist: "Nadin Amizah",
    src: "audio/Intro-Nadin Amizah.mp3",
    cover: "asset/intro-nadin amizah.webp"
  },
  {
    title: "Selamat Ulang Tahun Cinta",
    artist: "Kahitna",
    src: "audio/Selamat Ulang Tahun Cinta - Kahitna.mp3",
    cover: "asset/Selamat Ulang Tahun Cinta - Kahitna.jpg"
  },
  {
    title: "Happy Birthday",
    artist: "옐로우페이퍼",
    src: "audio/Happy birthday - 옐로우페이퍼.mp3",
    cover: "asset/Happy Birthday - Yellow Paper.jfif"
  },
  //B
  {
    title: "An Art Gallery Could Never Be As Unique As You",
    artist: "mrld",
    src: "audio/An Art Gallery Could Never Be As Unique As You - mrld.mp3",
    cover: "asset/An Art Gallery Could Never Be As Unique As You - mrld.jpg"
  },
  {
    title: "Put Your Records On",
    artist: "Corinne Bailey Rae",
    src: "audio/Put Your Records On - Corinne Bailey Rae.mp3",
    cover: "asset/Put Your Records On - Corinne Bailey Rae.jpg"
  },
  {
    title: "Lover",
    artist: "Taylor Swift",
    src: "audio/Lover - Taylor Swift.mp3",
    cover: "asset/Lover - Taylor Swift.jpg"
  },
  {
    title: "Perfect",
    artist: "One Direction",
    src: "audio/Perfect - One Direction.mp3",
    cover: "asset/Perfect - One Direction.jpg"
  },
  {
    title: "What Makes You Beautiful",
    artist: "One Direction",
    src: "audio/What Makes You Beautiful - One Direction.mp3",
    cover: "asset/What Makes You Beautiful - One Direction.jpg"
  },
  {
    title: "Just the Way You Are",
    artist: "Bruno Mars",
    src: "audio/Just the Way You Are - Bruno Mars.mp3",
    cover: "asset/Just the Way You Are - Bruno Mars.jpg"
  },
  {
    title: "Komang",
    artist: "Raim Laode",
    src: "audio/Komang - Raim Laode.mp3",
    cover: "asset/Komang - Raim Laode.jpg"
  },
  {
    title: "CANDYRELLA",
    artist: "Paul Partohap",
    src: "audio/CANDYRELLA - Paul Partohap.mp3",
    cover: "asset/CANDYRELLA - Paul Partohap.jpg"
  },
  {
    title: "Woman",
    artist: "HONNE",
    src: "audio/Woman - HONNE.mp3",
    cover: "asset/Woman - HONNE.jpg"
  },
  {
    title: "Jadi Kekasihku Saja",
    artist: "Keisya Levronka",
    src: "audio/Jadi Kekasihku Saja - Keisya Levronka.mp3",
    cover: "asset/Jadi Kekasihku Saja - Keisya Levronka.jpg"
  },
  //C
  {
    title: "Mesra-mesraannya kecil-kecilan dulu",
    artist: "Sal Priadi",
    src: "audio/Mesra-mesraannya kecil-kecilan dulu - Sal Priadi.mp3",
    cover: "asset/Mesra-mesraannya kecil-kecilan dulu - Sal Priadi.jpg"
  },
  {
    title: "Grow as We Go",
    artist: "Ben Platt",
    src: "audio/Grow as We Go - Ben Platt.mp3",
    cover: "asset/Grow as We Go - Ben Platt.jpg"
  },
];

let currentSongIndex = 0;
const audio = new Audio();
const titleEl = document.querySelector(".song-title");
const artistEl = document.querySelector(".artist-name");
const timeEl = document.querySelector(".song-time");

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  timeEl.textContent = "00:00 / 00:00";
  const albumImg = document.querySelector(".album-img");
  albumImg.src = song.cover;
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
}

function renderPlaylist() {
  const list = document.getElementById("songList");
  list.innerHTML = "";
  songs.forEach((song, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${song.title} - ${song.artist}</td>
      <td>--:--</td>
    `;
    tr.style.cursor = "pointer";
    tr.onclick = () => {
      currentSongIndex = i;
      loadSong(i);
      audio.play();
    };
    list.appendChild(tr);
  });
}


audio.ontimeupdate = () => {
  const minutes = Math.floor(audio.currentTime / 60).toString().padStart(2, '0');
  const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
  const durationMinutes = Math.floor(audio.duration / 60).toString().padStart(2, '0');
  const durationSeconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
  if (!isNaN(audio.duration)) {
    timeEl.textContent = `${minutes}:${seconds} / ${durationMinutes}:${durationSeconds}`;
  }
};

window.onload = () => {
  loadSong(currentSongIndex);
  renderPlaylist();
};

audio.addEventListener("ended", nextSong);
