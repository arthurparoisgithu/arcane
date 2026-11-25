/* ===== Arcanes · Astrologie : l'entrée du jeu « Le ciel qui tourne » =====
   Une carte dans l'accueil, et le chargement à la demande : le jeu et Three.js (astro/ciel/ciel.min.js, environ 640 Ko)
   ne sont téléchargés que lorsqu'on l'ouvre. */
(() => {
  const CARTE = () => { let fait = false; try{ fait = !!(JSON.parse(localStorage.getItem("arcanes.ciel.v1") || "{}").faits || {}).ptolemee; }catch(e){}
    return `<button type="button" class="a-cieljeu" data-cieljeu><svg viewBox="0 0 60 60" width="64" height="64" aria-hidden="true"><circle cx="30" cy="30" r="3.4" fill="#8fb4ff"/>
      <g fill="none" stroke="#e2bd5a" stroke-width="1.3"><circle cx="30" cy="30" r="25"/><ellipse cx="30" cy="30" rx="25" ry="8" transform="rotate(-23 30 30)"/><g class="anneau"><ellipse cx="30" cy="30" rx="9" ry="25"/></g></g>
      <circle cx="49" cy="20" r="2.6" fill="#ff9a62"/></svg><div><small>Jeu · ${fait ? "niveau I terminé" : "prototype"}</small><b>Le ciel qui tourne</b><span>Alexandrie, vers 150. Observe Mars reculer, puis construis avec Ptolémée les cercles qui l'expliquent.</span></div></button>`; };
  let charge = null;
  const ouvrir = () => { if(!charge){
      charge = import(new URL("astro/ciel/ciel.min.js", document.baseURI).href).catch(e => { charge = null; throw e; }); }
    charge.then(m => m.ouvrir({ferme:() => { const c = document.querySelector("[data-cieljeu]"); if(c) c.outerHTML = CARTE(); }})).catch(() => alert("Le jeu n'a pas pu se charger. Vérifie ta connexion et réessaie.")); };
  document.addEventListener("click", e => { const b = e.target.closest("[data-cieljeu]"); if(b){ e.preventDefault(); ouvrir(); } });
  /* précharge la feuille de style pour éviter un éclair au premier lancement */
  const l = document.createElement("link"); l.rel = "stylesheet"; l.href = "astro/ciel/ciel.css"; document.head.appendChild(l);
  window.ArcanesCielJeu = {carte:CARTE, ouvrir};
})();
