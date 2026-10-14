/**
 * Ajoute un lien de retour au tableau de bord dans Swagger UI.
 */
(function () {
  function ajouterLienRetour() {
    if (!document.querySelector('#port-russell-site-css')) {
      const feuilleCSS = document.createElement('link');
      feuilleCSS.id = 'port-russell-site-css';
      feuilleCSS.rel = 'stylesheet';
      feuilleCSS.href = '/css/style.css';
      document.head.appendChild(feuilleCSS);
    }

    const conteneur = document.querySelector('.swagger-ui');

    if (!conteneur) {
      return false;
    }

    if (!document.querySelector('.swagger-back-link')) {
      const lien = document.createElement('a');
      lien.className = 'swagger-back-link';
      lien.href = '/dashboard';
      lien.textContent = '← Retour au tableau de bord';
      conteneur.prepend(lien);
    }

    return true;
  }

  let tentatives = 0;

  const intervalle = window.setInterval(function () {
    tentatives++;

    if (ajouterLienRetour() || tentatives >= 20) {
      window.clearInterval(intervalle);
    }
  }, 250);
})();
