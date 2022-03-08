"use strict";

function photographerFactory(data) {
  const { name, tagline, city, country, price, portrait, id } = data;
  const picture = `assets/photographers/${portrait}`;

  function getHeaderCardDOM() {
    const headerCard = `
    <div>
      <h1>${name}</h1>
      <p>${city}, ${country}</p>
      <p>${tagline}</p>
    </div>
    <button class="contact-button button">Contactez-moi</button>
    <img src="${picture}" alt="${name}">
    `;
    return headerCard;
  }

  function getUserCardDOM() {
    const userArticle = `
  <article>
    <a href="/photographer.html?id=${id}" />
      <img src="${picture}" alt="${name}">
      <h2>${name}</h2>
    </a>
    <p>${city}, ${country}</p>
    <p>${tagline}</p>
    <p>${price}€/jour</p>
  </article>
  `;
    return userArticle;
  }

  function getPhotographNameDOM() {
    return `<p>${name}</p>`;
  }

  return {
    getHeaderCardDOM,
    getUserCardDOM,
    getPhotographNameDOM,
  };
}
