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
}

// Form validation
function validate() {
  // Form elements
  const form = document.forms["reserve"];
  const first = document.getElementById("first");
  const last = document.getElementById("last");
  const radios = form["location"];
  let radioSelected = false;
  const checkbox1 = document.getElementById("checkbox1");

  document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

  let isValid = true;

  // Validation du prénom
  if (!first.validity.valid) {
      document.getElementById("error-first").style.display = 'block';
      isValid = false;
  }

  // Validation du nom
  if (!first.validity.valid) {
    document.getElementById("error-last").style.display = 'block';
    isValid = false;
}

  if (!form.checkValidity()) {
    return false;
  }

  radios.forEach((radio) => {
    if (radio.checked) {
      radioSelected = true;
    }
  });

  if (!radioSelected) {
    return false;
  }

  if (!checkbox1.checked) {
    return false;
  }

  return true;
}
