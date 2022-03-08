"use strict"

// DOM Elements(inputs)
const form = document.querySelector(".contact-form");
const prenom = document.getElementById("prenom");
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const message = document.getElementById("message");
const submitBtn = document.querySelector(".submit-button");
const closeBtn = document.getElementById("close-modal");

function displayContactModal() {
  const contactBtn = document.querySelector(".contact-button");
  contactBtn.addEventListener("click", () => {
    const contactModal = document.getElementById("contact-modal");
    contactModal.style.display = "block";
    trapFocusInModal(contactModal);
    formSubmit();
    closeModal(contactModal, contactBtn);
  });
}

function closeModal(modal, contactBtn) {
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  modal.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" ||
      (e.key === "Enter" && document.activeElement === closeBtn)
    ) {
      e.preventDefault();
      modal.style.display = "none";
      contactBtn.focus();
    }
  });
}

function trapFocusInModal(modal) {
  const focusableElements = modal.querySelectorAll("button, textarea, input");
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  modal.addEventListener("keydown", (e) => {
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

//RegExp to validate fields (prénom et nom)
let stringRegExp = new RegExp("^[a-zA-Z]{2,}$");
//RegExp to validate email
let emailRegExp = new RegExp(
  "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
);

//this Object checks if all fields are valid(true)
const checkValidity = {
  prenom: false,
  nom: false,
  email: false,
  message: false,
};

//Listen to changes in all inputs and call inputValidity() function
function inputValidity(input, condition, errorMessage) {
  const name = input.getAttribute("name");
  if (condition) {
    input.parentElement.dataset.errorVisible = true;
    input.parentElement.dataset.error = errorMessage;
    checkValidity[name] = false;
  } else {
    input.parentElement.dataset.errorVisible = false;
    checkValidity[name] = true;
  }
}

prenom.addEventListener("input", prenomValidity);
//Validate prenom
function prenomValidity() {
  inputValidity(
    prenom,
    !stringRegExp.test(prenom.value),
    "Veuillez entrer 2 caractères ou plus (ne peut contenir de nombres)."
  );
}
nom.addEventListener("input", nomValidity);
//Validate nom
function nomValidity() {
  inputValidity(
    nom,
    !stringRegExp.test(nom.value),
    "Veuillez entrer 2 caractères ou plus (ne peut contenir de nombres)."
  );
}
//Validate email
email.addEventListener("input", emailValidity);
function emailValidity() {
  inputValidity(
    email,
    !emailRegExp.test(email.value),
    "Veuillez entrer un email valide."
  );
}
//Validate message
message.addEventListener("input", messageValidity);
function messageValidity() {
  inputValidity(message, !message.value, "Le champ de ne peut être vide.");
}

//Submit form if all inputs values are "true"
function formSubmit() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (Object.values(checkValidity).every((el) => el === true)) {
      console.log(
        `Prenom: ${prenom.value}, Nom: ${nom.value}, Email:${email.value}, Votre message: ${message.value}`
      );
    }
    prenomValidity();
    nomValidity();
    emailValidity();
    messageValidity();
  });
}
