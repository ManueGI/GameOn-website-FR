document.addEventListener('DOMContentLoaded', function() {
  // Ajouter un écouteur pour chaque lien de la navbar
  var links = document.querySelectorAll('.navbar-links a');
  links.forEach((link) => {
    link.addEventListener('click', function(event) {
      editNav(event.currentTarget);
    });
  });

  // Ajouter un écouteur pour fermer la topnav au click extérieur
  document.addEventListener('click', function(event) {
    var topnav = document.getElementById("myTopnav");
    if (topnav) {
      var isClickInside = topnav.contains(event.target);
      if (!isClickInside && topnav.classList.contains('responsive')) {
        toggleNav();
      }
    }
  });

  // Ajouter un écouteur au bouton de l'icône pour gérer le menu responsive
  var icon = document.querySelector('.topnav .icon');
  if (icon) {
    icon.addEventListener('click', function() {
      toggleNav();
    });
  }
});

function editNav(link) {
  // Récupérer tous les liens de navigation
  var links = document.querySelectorAll('.navbar-links a');

  // Supprimer la classe 'active' de tous les liens
  links.forEach(function(el) {
    el.classList.remove('active');
  });

  // Ajouter la classe 'active' uniquement au lien cliqué
  link.classList.add('active');

  // Fermer le menu si la navigation est ouverte
  var topnav = document.getElementById("myTopnav");
  if (topnav && topnav.classList.contains('responsive')) {
    toggleNav();
  }
}

function toggleNav() {
  var topnav = document.getElementById("myTopnav");
  topnav.classList.toggle('responsive')
}
