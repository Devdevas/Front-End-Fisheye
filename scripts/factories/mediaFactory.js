function mediaFactory(data) {
  let { title, image, likes, photographerId, video, poster, price, id } = data;

  const imageSrc = `assets/images/${photographerId}/${image}`;
  const videoSrc = `assets/images/${photographerId}/${video}`;
  const posterSrc = `assets/images/${photographerId}/${poster}`;

  function getMediaCardDOM() {
    const figure = document.createElement("figure");

    if (image) {
      figure.innerHTML = `<div class="img-container media" id="${id}" tabindex="0">
        <img src="${imageSrc}" alt="${title}">
      </div>`;
    } else {
      figure.innerHTML = `<div class="vid-container media" id="${id}" tabindex="0">
        <video poster="${posterSrc}">
          <source src="${videoSrc}" type="video/mp4">
          </source>
        </video>
      </div>`;
    }

    figure.innerHTML += `<figcaption>
      <p>${title}</p>
      <div class="likes-container">
        <p class="likes">${likes}</p>
        <img src="assets/icons/like_red.png" alt="likes" class="likes-icon" tabindex="0">
      </div>
    </figcaption>`;

    return figure;
  }

  function getAllLikesDOM() {
    const allLikes = `
    <div class="sum-likes-container">
      <div>
        <p class="sum-likes">${sumLikes}</p>
        <img src="assets/icons/like.png" alt="likes" class="likes-icon">
      </div>
      <p>${price}€ / jour</p>
    </div>`;

    return allLikes;
  }

  function getLightboxDOM() {
    const figure = document.createElement("figure");
    figure.className = "visible";
    figure.id = `${id}`;
    if (image) {
      figure.innerHTML = `<div class="img-container">
        <img src="${imageSrc}" alt="${title}">
      </div>`;
    } else {
      figure.innerHTML = `<div class = "vid-container">
        <video poster="${posterSrc}" class = "video" controls>
          <source src="${videoSrc}" type="video/mp4">
          </source>
        </video>
      </div>`;
    }
    figure.innerHTML += `<figcaption><p>${title}</p></figcaption>`;

    return figure;
  }

  return { getMediaCardDOM, getAllLikesDOM, getLightboxDOM };
}
