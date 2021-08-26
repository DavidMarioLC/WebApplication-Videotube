import VideosApi from "./Api.js";
import { skeletonGrid } from "./skeleton.js";

class Tab {
  _currentTabValue = "todos";
  _currentTab = null;
  _videoContainer = null;

  constructor() {
    this._currentTab = document.querySelector(".tabs__button--active");
    this._videoContainer = document.querySelector("#video-container");
    this.addEventToTabs();
    this.renderContainerVideos();
  }

  addEventToTabs() {
    const tabs = document.querySelectorAll("[data-tab]");
    tabs.forEach((tab) =>
      tab.addEventListener("click", this.changeTab.bind(this))
    );
  }

  changeTab(e) {
    this._currentTab.classList.remove("tabs__button--active");
    this._currentTab = e.target;
    this._currentTabValue = e.target.dataset.tab;
    this._currentTab.classList.add("tabs__button--active");

    this.renderContainerVideos();
  }

  async renderContainerVideos() {
    this._videoContainer.innerHTML = skeletonGrid;

    const videoApi = new VideosApi();
    const videos = await videoApi.fetchVideos(this._currentTabValue);

    if (videos) {
      this._videoContainer.innerHTML = "";
      videos.forEach(
        (video) =>
          (this._videoContainer.innerHTML += `
           <a href="./video.html" class="card">
      <div class="card__img ">
         <img
        src="./images/${video.thumbnail.default}"
        alt="Imagen de video"
        title="Imagen de video"
        loading="lazy"
        width="300"
        height="170"
      />
    <time class="card__time" datetime="13:08">${video.duration}</time>
      </div>
      <div class="card__body">
        <div class="card__avatar ">
          <img src="./images/${video.userImage}.png" alt="Avatar user"   loading="lazy"  width="32" height="32"/>
        </div>
        <p class="card__title ">
          ${video.title}
        </p>
        <p class="card__user ">
          ${video.username}
        </p>
        <p class="card__caption ">
         ${video.views} vistas - ${video.date}
        </p>
      </div>
    </a>`)
      );
    }
  }
}

const tab = new Tab();
