import VideosApi from "./Api.js";

import { skeletonThumbnail } from "./skeleton.js";
class Thumbnail {
  _containerThumbnails = null;
  constructor() {
    this._containerThumbnails = document.querySelector("#thumbnails__grid");
    this.listThumbnail();
  }

  async listThumbnail() {
    this._containerThumbnails.innerHTML = skeletonThumbnail;
    const videoApi = new VideosApi();
    const videos = await videoApi.fetchThumbnail();
    if (videos) {
      this._containerThumbnails.innerHTML = "";
      videos.forEach((e) => {
        this._containerThumbnails.innerHTML += `
        <div class="thumbnail">
                  <div class="thumbnail__image ">
                     <img
                      src="./images/${e.thumbnail.default}"
                      alt="Imagen de thumbnail"
                      title="Imagen de thumbnail"
                      width="195"
                      height="109"
                    /> 
                  </div>
                  <p class="thumbnail__title ">
                  ${e.title}
                  </p>
                  <p class="thumbnail__user ">
                     ${e.username}
                  </p>
                  <p class="thumbnail__caption">
                  ${e.views} vistas - ${e.date}
                  </p>
                </div>
        `;
      });
    }
  }
}

const thumbnail = new Thumbnail();
