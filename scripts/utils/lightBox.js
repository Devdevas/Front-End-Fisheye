"use strict";

function openLightbox(lightboxBg, lightboxModal) {
  lightboxBg.style.display = "block";
  trapFocusInLightbox(lightboxModal);
}

function closeLightbox(lightboxBg, lightboxModal, closeIcon) {
  closeIcon.addEventListener("click", () => {
    lightboxBg.style.display = "none";
  });
  lightboxModal.addEventListener("keydown", (e) => {
    if (
      (e.key === "Enter" && document.activeElement === closeIcon) ||
      e.key === "Escape"
    ) {
      e.preventDefault();
      lightboxBg.style.display = "none";
    }
  });
}

function trapFocusInLightbox(lightboxModal) {
  const focusableElements = lightboxModal.querySelectorAll(
    "img, .arrow-right, .arrow-left"
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  lightboxModal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") {
      return;
    }
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  });
  focusableElements[1].focus();
}

function displayLightboxMedias(media) {
  const lightboxBg = document.querySelector(".lightbox-bg");
  const mediaGallery = document.querySelector(".gallery-section");
  const lightboxModal = document.querySelector(".lightbox-modal");
  const arrowLeft = document.querySelector(".arrow-left");
  const arrowRight = document.querySelector(".arrow-right");
  const closeIcon = document.querySelector(".close-lightbox");

  mediaGallery.addEventListener("click", (e) => {
    displayClickedMedia(e, media, lightboxBg, lightboxModal);
  });
  mediaGallery.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      displayClickedMedia(e, media, lightboxBg, lightboxModal);
    }
  });

  arrowLeft.addEventListener("click", () => {
    displayPreviousMedia(media, lightboxModal);
  });
  arrowLeft.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      displayPreviousMedia(media, lightboxModal);
    }
  });

  arrowRight.addEventListener("click", () => {
    displayNextMedia(media, lightboxModal);
  });
  arrowRight.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      displayNextMedia(media, lightboxModal);
    }
  });

  lightboxModal.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      displayPreviousMedia(media, lightboxModal);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      displayNextMedia(media, lightboxModal);
    }
  });

  closeLightbox(lightboxBg, lightboxModal, closeIcon);
}

function displayClickedMedia(e, media, lightboxBg, lightboxModal) {
  const clickedMedia = e.target.closest("figure .media");
  if (clickedMedia) {
    openLightbox(lightboxBg, lightboxModal);

    const foundMedia = media.find((element) => element.id == clickedMedia.id);

    const figureModel = new PhotographerFactory(foundMedia, "mediaData");
    const newMedia = figureModel.getLightboxDOM();
    const currentMedia = document.querySelector(".lightbox-modal figure");
    if (currentMedia) {
      lightboxModal.replaceChild(newMedia, currentMedia);
      if (newMedia.firstChild.className == "vid-container") {
        videoControler(lightboxModal, newMedia);
      }
    } else {
      lightboxModal.appendChild(newMedia);
      if (newMedia.firstChild.className == "vid-container") {
        videoControler(lightboxModal, newMedia);
      }
    }
  }
}

function displayPreviousMedia(media, lightboxModal) {
  const currentMedia = document.querySelector(".lightbox-modal figure");
  media.forEach((element, i) => {
    if (element.id == currentMedia.id && i === 0) {
      i = media.length;
    }
    if (element.id == currentMedia.id && i > 0) {
      const figureModel = new PhotographerFactory(media[i - 1], "mediaData");
      const newMedia = figureModel.getLightboxDOM();
      lightboxModal.replaceChild(newMedia, currentMedia);
      if (newMedia.firstChild.className == "vid-container") {
        videoControler(lightboxModal, newMedia);
      }
    }
  });
}

function displayNextMedia(media, lightboxModal) {
  const currentMedia = document.querySelector(".lightbox-modal figure");
  media.forEach((element, i) => {
    if (element.id == currentMedia.id && i === media.length - 1) {
      i = -1;
    }
    if (element.id == currentMedia.id && i < media.length - 1) {
      const figureModel = new PhotographerFactory(media[i + 1], "mediaData");
      const newMedia = figureModel.getLightboxDOM();
      lightboxModal.replaceChild(newMedia, currentMedia);
      if (newMedia.firstChild.className == "vid-container") {
        videoControler(lightboxModal, newMedia);
      }
    }
  });
}

function videoControler(lightboxModal, newMedia) {
  const video = newMedia.querySelector(".vid-container video");
  lightboxModal.addEventListener("keydown", (e) => {
    if (e.key === " " || e.code === "Space") {
      e.preventDefault();
      video.paused ? video.play() : video.pause();
    }
  });
}
