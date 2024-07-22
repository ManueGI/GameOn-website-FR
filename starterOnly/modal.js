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
function validateForm() {
  const form = document.forms["reserve"];
  const radios = form["location"];
  let radioSelected = false;
  const checkbox1 = document.getElementById("checkbox1");
  if (!form.checkValidity()) {
    return false;
  }

  radios.forEach((radio) => {
    if (radio.checked) {
      radioSelected = true;
    }
  });

  if (!radioSelected) {
    alert("Veuillez sélectionner un tournoi.");
    return false;
  }

  if (!checkbox1.checked) {
    alert("Veuillez sélectionner un tournoi.");
    return false;
  }
  return true;
}
