/* ===== Arcanes · Magie : l'entrée du jeu « La Tour » =====
   Une carte dans l'atelier, et le chargement à la demande : le jeu et Three.js (magie/tour/tour.min.js)
   ne sont téléchargés que lorsqu'on l'ouvre. */
(() => {
  const CARTE = () => `<button type="button" class="m-tourjeu" data-tourjeu><svg viewBox="0 0 60 60" width="64" height="64" aria-hidden="true" shape-rendering="crispEdges"><rect width="60" height="60" fill="#0a0810"/><path d="M0 46h60v14H0z" fill="#14101e"/><path d="M26 18h8v30h-8zM24 44h12v4H24zM25 14h10v4H25z" fill="#2a2338"/><path d="M30 2l6 12H24z" fill="#3b3350"/><rect x="29" y="22" width="2" height="3" fill="#ffb656"/><rect x="28" y="21" width="4" height="5" fill="#ffb656" opacity=".35"/><path d="M8 40h8v8H8zM6 40l6-6 6 6z" fill="#1c1728"/><rect x="11" y="43" width="2" height="2" fill="#e0a55a"/><rect x="48" y="8" width="1" height="1" fill="#cfc8e0"/><rect x="12" y="12" width="1" height="1" fill="#cfc8e0"/><rect x="42" y="22" width="1" height="1" fill="#cfc8e0"/></svg>
      <div><small>Jeu · plan d'ambiance</small><b>La Tour</b><span>Une marche à la première personne, de la colline au pied de la tour d'un magicien. Pour l'instant : l'image, la lumière et le son.</span></div></button>`;
  let charge = null;
  const ouvrir = () => { if(!charge) charge = import(new URL("magie/tour/tour.min.js", document.baseURI).href).catch(e => { charge = null; throw e; });
    charge.then(m => m.ouvrir({})).catch(() => alert("Le jeu n'a pas pu se charger. Vérifie ta connexion et réessaie.")); };
  document.addEventListener("click", e => { const b = e.target.closest("[data-tourjeu]"); if(b){ e.preventDefault(); ouvrir(); } });
  const l = document.createElement("link"); l.rel = "stylesheet"; l.href = "magie/tour/tour.css"; document.head.appendChild(l);
  window.ArcanesTourJeu = {carte:CARTE, ouvrir};
})();
