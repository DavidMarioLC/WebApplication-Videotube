class VideoPlayer {
  _video = null;
  _btnPlay = null;
  _btnPause = null;
  _btnfullScreen = null;
  _progress = null;
  _player = null;
  _btnExitFullscreen = null;
  _videoDuration = 0;
  _videoCurrentTime = 0;

  constructor() {
    this._video = document.querySelector(".video");
    this._btnPlay = document.querySelector(".btn-play");
    this._btnPause = document.querySelector(".btn-pause");
    this._btnfullScreen = document.querySelector(".btn-fullscreen");
    this._btnExitFullscreen = document.querySelector(".btn-exitFullscreen");
    this._progress = document.querySelector("#progress");
    this._player = document.querySelector("#player-video");
    this._videoDuration = document.querySelector(".player__time--duration");
    this._videoCurrentTime = document.querySelector(".player__time--current");

    this._btnPlay.addEventListener("click", this.play.bind(this));
    this._btnPause.addEventListener("click", this.stop.bind(this));
    this._btnfullScreen.addEventListener("click", this.fullscreen.bind(this));
    this._video.addEventListener("timeupdate", this.addprogress.bind(this));
    this._btnExitFullscreen.addEventListener(
      "click",
      this.exitScreen.bind(this)
    );
  }

  stop() {
    this._video.pause();
    this._btnPause.hidden = true;
    this._btnPlay.hidden = false;
  }

  play() {
    this._video.play();

    this._btnPause.hidden = false;
    this._btnPlay.hidden = true;

    this._progress.max = this._video.duration;
  }

  fullscreen() {
    this._btnfullScreen.hidden = true;
    this._btnExitFullscreen.hidden = false;

    this._player
      .requestFullscreen()
      .then(() => {})
      .catch((err) => {
        alert(
          `An error occurred while trying to switch into full-screen mode: ${err.message} (${err.name})`
        );
      });
  }

  exitScreen() {
    this._btnExitFullscreen.hidden = true;
    this._btnfullScreen.hidden = false;
    document.exitFullscreen();
  }

  addprogress() {
    let percent = (this._video.currentTime / this._video.duration) * 100;
    document.documentElement.style.setProperty("--percentage", `${percent}%`);

    this._progress.value = this._video.currentTime;

    this.setMinutesAndSeconds();
  }

  setMinutesAndSeconds() {
    const minutes = Math.floor(this._video.currentTime / 60);
    const seconds = Math.floor(this._video.currentTime % 60)
      .toString()
      .padStart(2, "0");

    this._videoCurrentTime.innerHTML = `${minutes}:${seconds}`;

    const videoTimeDurationMinutes = Math.floor(this._video.duration / 60);
    const videoTimeDurationSeconds = Math.floor(this._video.duration % 60);
    this._videoDuration.innerHTML = `${videoTimeDurationMinutes}:${videoTimeDurationSeconds}`;
  }
}

const videoPlayer = new VideoPlayer();
