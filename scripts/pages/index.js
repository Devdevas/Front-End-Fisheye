"use strict";

async function getPhotographers() {
  // Pointer vers le fichier json
  const photographersData = await fetch("/data/photographers.json");
  const data = await photographersData.json();
  const photographers = data.photographers;

  // Retourner le tableau photographers (json)
  return {
    photographers,
  };
}

function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer-section");

  const articles = photographers.map((photographer) => {
    const photographerModel = new PhotographerFactory(photographer, "photographerData");
    const userCardDOM = photographerModel.getUserCardDOM();
    return userCardDOM;
  });
  photographersSection.innerHTML = articles.join("");
}

async function init() {
  // Récupèrer les datas des photographes
  const { photographers } = await getPhotographers();
  // Afficher les datas des photographes
  displayData(photographers);
}

init();
