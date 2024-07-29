function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  isValid = true;
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.style.display = "none"));
}

// Form validation
let isValid = true;

function getElement(id) {
  return document.getElementById(id);
}

function showError(errorId) {
  return (document.getElementById(errorId).style.display = "block");
}

const form = document.forms["reserve"];

function validate() {
  isValid = true;
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.style.display = "none"));

  // Validation du prénom
  const first = document.getElementById("first");
  if (!first.validity.valid) {
    showError("error-first");
    isValid = false;
  }

  // Validation du nom
  const last = getElement("last");
  if (!last.validity.valid) {
    showError("error-last");
    isValid = false;
  }

  // Validation du mail
  const email = getElement("email");
  if (email.validity.valueMissing || email.validity.typeMismatch) {
    showError("error-email");
    isValid = false;
  }

  // Validation de la date de naissance
  const birthDate = getElement("birthdate");
  const today = new Date();
  const birthDateValue = new Date(birthDate.value);
  const age = today.getFullYear() - birthDateValue.getFullYear();
  if (!age || age < 15 || age > 99 || birthDateValue > today) {
    showError("error-birthdate");
    isValid = false;
  }

  // Validation de la quantité
  const quantity = getElement("quantity")
  if (!quantity.value || quantity.value < 0 || quantity.value > 99) {
    console.log("quantity")
    showError("error-quantity");
    isValid = false;
  }

  // Validation des radios
  const radios = form["location"];
  let radioSelected = false;

  radios.forEach((radio) => {
    if (radio.checked) {
      radioSelected = true;
    }
  });

  if (!radioSelected) {
    document.getElementById("error-location").style.display = "block";
    isValid = false;
  }

  // Validation des conditions
  const checkbox1 = getElement("checkbox1");
  if (!checkbox1.checked) {
    document.getElementById("error-checkbox1").style.display = "block";
    isValid = false;
  }

  if (isValid) {
    return true; 
  } else {
    return false;
  }
}

form.addEventListener("submit", (event) => {
  if (!validate()) {
    event.preventDefault();
  } else {
    event.preventDefault();
    const modalSuccess = getElement("modalsuccess")
    modalSuccess.style.display="block"
    closeModal(); // Close main modal (optional)
    console.log("success");
    const closeSuccessBtn = getElement('closemodal');
    
    closeSuccessBtn.addEventListener('click', () => {
      modalSuccess.style.display = 'none';
    });
  }
});



