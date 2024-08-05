// Éléments du DOM
const modalbg = document.querySelector(".bground");
const modalForm = document.getElementById("modal-form");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const modalSuccess = document.getElementById("modal-success");
const closeSuccessBtns = modalSuccess.querySelectorAll(".closemodalsuccess");

// Messages d'erreur
const errorMessages = {
  "error-first":
    "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
  "error-last": "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  "error-email": "Veuillez entrer une adresse mail valide.",
  "error-birthdate": "Veuillez entrer une date de naissance valide.",
  "error-quantity":
    "Veuillez répondre à cette question (entre 0 et 99 tournois).",
  "error-location": "Veuillez choisir au moins une ville.",
  "error-checkbox1":
    "Vous devez vérifier que vous acceptez les termes et conditions.",
};

// Événement pour ouvrir la modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Fonction pour ouvrir la modal
function launchModal() {
  modalbg.style.display = "block";
}

// Événement pour fermer la modal
closeBtn.addEventListener("click", closeModal);

// Fonction pour fermer la modal
function closeModal() {
  modalbg.style.display = "none";
  resetForm(); // Réinitialiser les champs du formulaire en fermant la modal
  isValid = true;
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.style.display = "none"));
}

// Fonction pour réinitialiser les champs du formulaire
function resetForm() {
  modalForm.reset();
}

// Validation du formulaire
let isValid = true;

// Fonction pour obtenir un élément par son ID
function getElement(id) {
  return document.getElementById(id);
}

// Fonction pour afficher les messages d'erreur
function showError(errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = errorMessages[errorId];
  errorElement.style.display = "block";
}

const form = document.forms["reserve"];

// Fonction de validation
function validate() {
  isValid = true;
  document.querySelectorAll(".error-message").forEach((el) => {
    el.textContent = "";
    el.style.display = "none";
  });

  // Tableau pour collecter les erreurs
  const errors = [];

  // Validation du prénom
  try {
    const first = getElement("first");
    if (!first.validity.valid) {
      throw new Error("error-first");
    }
  } catch (error) {
    errors.push(error.message);
  }

  // Validation du nom
  try {
    const last = getElement("last");
    if (!last.validity.valid) {
      throw new Error("error-last");
    }
  } catch (error) {
    errors.push(error.message);
  }

  // Validation de l'email
  try {
    const email = getElement("email");
    if (email.validity.valueMissing || email.validity.typeMismatch) {
      throw new Error("error-email");
    }
  } catch (error) {
    errors.push(error.message);
  }

  // Validation de la date de naissance
  try {
    const birthDate = getElement("birthdate");
    const today = new Date();
    const birthDateValue = new Date(birthDate.value);
    const age = today.getFullYear() - birthDateValue.getFullYear();
    if (!age || age < 15 || age > 99 || birthDateValue > today) {
      throw new Error("error-birthdate");
    }
  } catch (error) {
    errors.push(error.message);
  }

  // Validation de la quantité
  try {
    const quantity = getElement("quantity");
    if (!quantity.value || quantity.value < 0 || quantity.value > 99) {
      throw new Error("error-quantity");
    }
  } catch (error) {
    errors.push(error.message);
  }

  // Validation des boutons radio
  try {
    const radios = form["location"];
    let radioSelected = false;

    radios.forEach((radio) => {
      if (radio.checked) {
        radioSelected = true;
      }
    });

    if (!radioSelected) {
      throw new Error("error-location");
    }
  } catch (error) {
    errors.push(error.message);
  }

  // Validation de la case à cocher
  try {
    const checkbox1 = getElement("checkbox1");
    if (!checkbox1.checked) {
      throw new Error("error-checkbox1");
    }
  } catch (error) {
    errors.push(error.message);
  }

  // Afficher les erreurs
  if (errors.length > 0) {
    errors.forEach((error) => showError(error));
    isValid = false;
  }

  return isValid;
}

// Événement lors de la soumission du formulaire
form.addEventListener("submit", (event) => {
  if (!validate()) {
    // Annuler la soumission du formulaire en cas d'erreur
    event.preventDefault();
  } else {
    // Annuler la soumission par défaut
    event.preventDefault();

    // Obtenir la hauteur du formulaire
    const formHeight = modalForm.offsetHeight;

    // Cahcher le formulaire
    modalForm.style.display = "none";

    // Afficher la modale de succès
    modalSuccess.style.display = "flex";

    // Appliquer la hauteur à la modal de succès
    modalSuccess.style.height = formHeight + "px";

    // Fonction pour soumettre le formulaire après la fermeture de la modal
    function submitForm() {
      form.submit();
      console.log("Formulaire soumis avec succès !");
    }
    submitForm();

    // Ajouter des événements pour fermer la modal de succès
    closeSuccessBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        modalSuccess.style.display = "none";
        closeModal();
      });
    });
  }
});
