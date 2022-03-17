"use strict";

async function getAllDatas() {
  // Get datas from json file
  const data = await fetch("/data/photographers.json");
  const allDatas = await data.json();

  return allDatas;
}

// Get "Id" from URL of photographer's page
const photographerUrl = new URL(document.location);
const photographerId = parseInt(photographerUrl.searchParams.get("id"));

// Get photographer data
function getPhotographer(photographers) {
  const photographer = photographers.find(
    (photographer) => photographer.id === photographerId
  );
  return { photographer };
}

function getMedia(medias) {
  const media = medias.filter(
    (media) => media.photographerId === photographerId
  );
  return { media };
}

// Display photographer header
function displayPhotographerHeader(photographer) {
  const photographerHeader = document.querySelector(".photograph-header");
  const headerModel = new PhotographerFactory(photographer, "photographerData");
  const photographerHeaderDOM = headerModel.getHeaderCardDOM();
  photographerHeader.innerHTML = photographerHeaderDOM;
}

// Display medias gallery by default
function displayMedias(media) {
  const gallerySection = document.querySelector(".gallery-section");
  gallerySection.innerHTML = "";
  media.forEach((element) => {
    const mediaModel = new PhotographerFactory(element, "mediaData");
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    gallerySection.appendChild(mediaCardDOM);
  });
}

// Display medias gallery by filter
function displayMediasByFilter(media) {
  const listBox = document.getElementById("filter-listbox");
  media = media.sort((a, b) => {
    return b.likes - a.likes;
  });
  // Before filtring media
  displayMedias(media);
  incrementDecrementLikes();

  listBox.addEventListener("click", (e) => {
    listBoxFiltersHandler(e, media);
  });
  listBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      listBoxFiltersHandler(e, media);
    }
  });
}

//listbox filters
function listBoxFiltersHandler(e, media) {
  const arrowIcon = document.querySelector("#arrow-icon i");
  const filters = document.querySelectorAll("#filter-listbox li");
  const clickedFilter = e.target;

  // Show and hide listbox
  function showHideListbox() {
    arrowIcon.classList.toggle("fa-angle-up");
    filters[1].classList.toggle("visible");
    filters[2].classList.toggle("visible");
  }
  arrowIcon.addEventListener("click", showHideListbox);
  if (clickedFilter) {
    showHideListbox();
  }

  // Toggle filters on click
  if (clickedFilter === filters[1] || clickedFilter === filters[2]) {
    const clickedFilterText = clickedFilter.textContent;
    const clickedFilterData = clickedFilter.dataset.text;

    clickedFilter.textContent = filters[0].textContent;
    filters[0].textContent = clickedFilterText;
    clickedFilter.dataset.text = filters[0].dataset.text;
    filters[0].dataset.text = clickedFilterData;
    filters[0].focus();
    // Sort medias by filter
    getSortedMedias(media);
  }
}

//Get sorted medias using Data-text
function getSortedMedias(media) {
  const filters = document.querySelectorAll("#filter-listbox li");
  if (filters[0].dataset.text === "popularite") {
    media = media.sort((a, b) => b.likes - a.likes);
    displayMedias(media);
    incrementDecrementLikes();
  } else if (filters[0].dataset.text === "date") {
    media = media.sort((a, b) => new Date(b.date) - new Date(a.date));
    displayMedias(media);
    incrementDecrementLikes();
  } else if (filters[0].dataset.text === "titre") {
    media = media.sort((a, b) => a.title.localeCompare(b.title));
    displayMedias(media);
    incrementDecrementLikes();
  }
}

// Get the sum of likes
let sumLikes = 0;
// Display the sum of likes & photographer's price
function displaySumLikes(photographer, media) {
  media.forEach((el) => {
    sumLikes += el.likes;
  });
  const sumLikesModel = new PhotographerFactory(photographer, "mediaData");
  const sumLikesDOM = sumLikesModel.getAllLikesDOM();
  main.innerHTML += sumLikesDOM;
}

// Increment/Decriment likes & sum of likes(click on the heart icon)
function incrementDecrementLikes() {
  const heartIcons = document.getElementsByClassName("likes-icon");
  const likes = document.getElementsByClassName("likes");
  const sumLikes = document.querySelector(".sum-likes");
  let allLikes = [];

  for (let i = 0; i < likes.length; i++) {
    allLikes.push(likes[i].textContent);
    heartIcons[i].addEventListener("click", () => {
      condition(i);
    });
    heartIcons[i].addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        condition(i);
      }
    });
  }

  function condition(i) {
    if (heartIcons[i].previousElementSibling.textContent === allLikes[i]) {
      heartIcons[i].previousElementSibling.textContent++;
      sumLikes.textContent++;
    } else {
      heartIcons[i].previousElementSibling.textContent--;
      sumLikes.textContent--;
    }
  }
}

//Display photographer's name on the contact-modal header
function displayModalHeader(photographer) {
  const modalHeader = document.querySelector(".modal header div");
  const nameModel = new PhotographerFactory(photographer, "photographerData");
  const photographNameDOM = nameModel.getPhotographNameDOM();
  modalHeader.innerHTML += photographNameDOM;
}

//Execute all functions
async function init() {
  // Get all medias && photographers by destructuring the data object
  const { medias, photographers } = await getAllDatas();

  // Get single media && photographer
  const { photographer } = getPhotographer(photographers);
  const { media } = getMedia(medias);

  // Display datas
  displayPhotographerHeader(photographer);
  displaySumLikes(photographer, media);
  displayMediasByFilter(media);
  displayLightboxMedias(media);
  displayModalHeader(photographer);
  displayContactModal();
}

init();
