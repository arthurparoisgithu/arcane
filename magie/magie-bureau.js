/* ===== Arcanes · Magie : Sans suite (le Bureau) =====
   Le jeu scénarisé de la magie. Ce fichier porte ce qui se lit hors du jeu : les répliques (numérotées, pour le doublage),
   les articles du contrat et leurs notes, la carte dans l'atelier. Le jeu lui-même est dans magie/bureau/ (chargé à la demande). */
(function(){
  "use strict";
  const CLE = "arcanes.bureau.v1";
  /* les voix : [qui, texte]. Le héros ne parle jamais. Pour doubler une réplique, déposer magie/bureau/voix/<id>.mp3 et ajouter l'id à VOIX. */
  const QUI = {asc:"L'Ascensoriste", ang:"L'ange de l'accueil", mar:"Le Marquis", aud:"L'Auditeur", gui:"Le guichetier", dir:"La Direction"};
  const REPLIQUES = {
    asc1:"Quel étage ?",
    asc2:"Rez-de-chaussée, donc. Ils disent tous ça.",
    asc3:"Trois mille ans que je monte et que je descends. Personne ne m'a jamais dit merci. Vous non plus, notez.",
    asc4:"Un conseil : là-dedans, ne dites rien.",
    asc5:"… Ah. Vous êtes doué.",
    ang1:"N'ayez pas peur.",
    ang2:"N'ayez pas peur : c'est bien ici. Vous avez déposé une demande, elle a été reçue.",
    ang3:"N'ayez pas peur, c'est le formulaire 12-B. Je vous le lis.",
    ang4:"« Le soussigné, ci-après “l'âme”, reconnaît avoir formé un vœu de son plein gré, à une heure indue…",
    ang5:"… et renonce à toute réclamation devant les juridictions célestes, infernales et municipales. »",
    ang6:"Des objections ?",
    ang7a:"Je ne vois pas les mains. Seulement les âmes. La vôtre n'objecte pas.",
    ang7b:"Il secoue la tête. Je note : aucune objection.",
    ang7c:"Parfait.",
    ang8:"Qui ne dit mot consent.",
    ang9:"N'ayez pas peur. Votre conseiller arrive.",
    mar1:"Marchosias. Marquis. Trente légions, guichet trente, mardi et jeudi sur rendez-vous.",
    mar2:"Vous pouvez m'appeler « Monsieur le Marquis ».",
    mar3:"… Vous ne m'appelez pas. Vous ne parlez pas.",
    mar4:"Parfait. Les bavards sont épuisants. Le dernier a plaidé quarante ans.",
    mar5:"Résumons. Votre âme, à l'aube. C'est moi qui encaisse. Rien de personnel : j'ai des objectifs.",
    mar6:"Dans mille deux cents ans, je remonte. Septième trône. Si mes dossiers sont propres. Le vôtre le sera.",
    mar7:"Tenez. Votre exemplaire. Lisez, ça ne changera rien.",
    mara1:"Article premier : impeccable.",
    mara2:"L'échéance. La maison tient à la ponctualité.",
    mara3:"Mes titres. Tout y est. Presque : il manque « sur rendez-vous ».",
    mara4:"Mon sceau. Ne le tracez pas chez vous.",
    mar8:"Un oubli de l'accueil. Votre nom, je vous prie.",
    mar9:"… Votre nom.",
    mar10:"Évidemment.",
    mar11:"Sans nom, pas de prise. C'est la plus vieille règle de la maison : on ne tient que ce qu'on sait nommer.",
    mar12:"Je ne peux pas le deviner. Ce serait… irrégulier. On trouvera.",
    mar13:"Ne bougez pas. Ne respirez pas. Vous savez faire.",
    aud1:"Bonsoir. Pardonnez le dérangement.",
    aud2:"Guichet trente et un, service des philtres. Aucune demande recevable depuis 1682.",
    gui1:"Mais j'ai encore un doss…",
    aud3:"Classé sans suite. Merci de votre compréhension.",
    aud4:"Monsieur. Madame. … Ce n'est pas noté.",
    aud5:"Pas de nom au dossier. Comme c'est irrégulier.",
    aud6:"Nous nous reverrons. Je passe partout.",
    mar14:"L'Audit. Il a classé le troisième sous-sol la semaine dernière. Il y avait là des gens que j'aimais bien. Enfin, que je supportais.",
    dir1:"« Ne signez rien. Montez. — La Direction »",
    mar15:"La Direction. Elle n'avait rien écrit depuis que je suis en poste.",
    mar16:"« Ne signez rien. » Elle est bonne.",
    mar17:"« Montez. » … Il y a sept étages. L'aube est au septième. Autant aller au-devant.",
    mar18:"Après vous. Je vous suis. C'est mon métier.",
    asc6:"Je savais. Premier étage : la Lune. Service des songes et des réclamations.",
    mar19:"Elles sont trois, là-haut. Ne les laissez pas finir vos phrases.",
    mar20:"… Aucun risque."};
  const VOIX = [];
  /* le contrat : chaque article a sa note, qui est la leçon */
  const CLAUSES = [
    {id:"objet", n:"Article 1", t:"Objet", txt:"Une âme, en l'état, sans garantie.", mot:"Le pacte", note:"L'idée d'un contrat signé avec le diable vient des légendes chrétiennes : celle de Théophile, au VIe siècle, puis celle de Faust, au XVIe. Dans les grimoires, le pacte est rare : le mage ne signe pas avec les esprits, il prétend les commander."},
    {id:"heure", n:"Article 2", t:"Échéance", txt:"À l'aube, à la première heure du jour.", mot:"L'heure", note:"Les mages découpent le jour et la nuit en heures, chacune gouvernée par un astre. L'heure qui ouvre le jour donne son nom à ce jour. Une opération se fait à l'heure de l'astre qu'elle concerne, ou ne se fait pas."},
    {id:"grade", n:"Article 3", t:"Le conseiller", txt:"Marchosias, marquis, trente légions.", mot:"Les soixante-douze", note:"Un grimoire du XVIIe siècle, la Goetia, dresse la liste de 72 esprits. Chacun y a un grade (roi, duc, prince, marquis, comte, président) et un nombre de légions, comme dans une armée ou une administration. Marchosias y est marquis, à la tête de trente légions, et dit espérer remonter au ciel après 1 200 ans."},
    {id:"sceau", n:"Article 4", t:"Le sceau", txt:"", mot:"Le sceau", note:"Chaque esprit des grimoires a son sceau : un dessin qu'on trace pour l'appeler et pour le reconnaître. Le sceau vaut signature. Celui-ci est inventé pour le jeu."},
    {id:"nom", n:"Article 5", t:"Le contractant", txt:"Nom : ", vide:true, mot:"Le nom", note:"Connaître le vrai nom d'un être, c'est avoir prise sur lui. L'idée est très ancienne : dans un récit égyptien, Isis devient la plus grande des magiciennes en arrachant au dieu Rê son nom secret. Dans les grimoires, on n'appelle un esprit que par son nom exact."},
    {id:"audit", n:"Note en marge", t:"1682", txt:"« Classé sans suite. »", mot:"L'édit de 1682", note:"En 1682, après l'affaire des Poisons, un édit de Louis XIV cesse de traiter la sorcellerie comme un crime réel : les « soi-disant magiciens » ne sont plus que des escrocs. Le monde commence à ranger la magie."}];
  const etat = () => { try{ const s = JSON.parse(localStorage.getItem(CLE) || "{}"); return {lus:s.lus || [], etape:s.etape || 0, fin:!!s.fin}; }catch(e){ return {lus:[], etape:0, fin:false}; } };
  const SCEAU = `<svg viewBox="0 0 60 60" width="54" height="54" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="30" cy="30" r="26"/><path d="M12 22h36M18 22v20M42 22v14M18 42c8 6 16 6 24-6M30 8v14M24 14h12M26 34l8 8M34 34l-8 8"/><circle cx="18" cy="22" r="2.4"/><circle cx="42" cy="36" r="2.4"/></svg>`;
  /* le contrat, relisible hors du jeu : seuls les articles déjà lus montrent leur note */
  function contrat(){ const E = etat(); document.querySelectorAll(".bqc").forEach(e => e.remove());
    const d = document.createElement("div"); d.className = "bqc"; d.setAttribute("role", "dialog"); d.setAttribute("aria-label", "Le contrat");
    d.innerHTML = `<div class="bqc-in"><button type="button" class="bqc-x" aria-label="Fermer">✕</button><p class="bqc-eye">Bureau des demandes · formulaire 12-B</p><h1>Convention n° 73</h1>
      ${CLAUSES.map(c => E.lus.includes(c.id) ? `<section><h2><small>${c.n}</small>${c.t}</h2><p class="bqc-txt">${c.id === "sceau" ? SCEAU : c.txt}${c.vide ? `<u></u>` : ""}</p><p class="bqc-note"><b>${c.mot}.</b> ${c.note}</p></section>` : `<section class="clos"><h2><small>${c.n}</small>Pas encore lu</h2></section>`).join("")}</div>`;
    document.body.appendChild(d); requestAnimationFrame(() => d.classList.add("on"));
    const ferme = () => { d.classList.remove("on"); setTimeout(() => d.remove(), 300); }; d.querySelector(".bqc-x").onclick = ferme; d.addEventListener("click", e => { if(e.target === d) ferme(); }); }
  const CARTE = () => { const E = etat(), n = E.lus.length;
    return `<div class="m-bureau"><button type="button" class="m-bureau-go" data-bureaujeu><svg viewBox="0 0 60 60" width="64" height="64" aria-hidden="true" fill="none" stroke="#d9b46a" stroke-width="1.3" stroke-linejoin="round"><path d="M22 56V26h4v-8h3V8h2v10h3v8h4v30M12 56V36h6v-5h4M48 56V36h-6v-5h-4M4 56h52M26 32h8M26 38h8M26 44h8M26 50h8"/><path d="M30 8L24 2M30 8l6-6M30 8V1" stroke-width=".9"/></svg>
      <span><small>Jeu scénarisé · ${E.fin ? "pilote terminé" : E.etape ? "en cours" : "le pilote"}</small><b>Sans suite</b><i>Tu te réveilles dans l'administration qui gère la magie depuis toujours. Tu n'as rien dit, donc tu as signé. Tu as jusqu'à l'aube.</i></span></button>
      ${n ? `<button type="button" class="m-bureau-g" data-bureaucontrat>Relire le contrat</button>` : ""}</div>`; };
  let charge = null;
  const rafraichit = () => { const c = document.querySelector(".m-bureau"); if(c) c.outerHTML = CARTE(); };
  const ouvrir = () => { if(!charge) charge = import(new URL("magie/bureau/bureau.min.js", document.baseURI).href).catch(e => { charge = null; throw e; });
    charge.then(m => m.ouvrir({ferme:rafraichit})).catch(() => alert("Le jeu n'a pas pu se charger. Vérifie ta connexion et réessaie.")); };
  document.addEventListener("click", e => { if(e.target.closest("[data-bureaujeu]")){ e.preventDefault(); ouvrir(); } else if(e.target.closest("[data-bureaucontrat]")){ e.preventDefault(); contrat(); } });
  const l = document.createElement("link"); l.rel = "stylesheet"; l.href = "magie/bureau/bureau.css"; document.head.appendChild(l);
  window.BUREAU_DATA = {REPLIQUES, QUI, VOIX, CLAUSES, SCEAU};
  window.ArcanesBureauJeu = {carte:CARTE, ouvrir, contrat};
})();
