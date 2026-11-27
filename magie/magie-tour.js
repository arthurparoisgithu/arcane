/* ===== Arcanes · Magie : l'entrée du jeu « La Tour », et son grimoire =====
   Une carte dans l'atelier, et le chargement à la demande : le jeu et Three.js (magie/tour/tour.min.js) ne sont téléchargés
   que lorsqu'on l'ouvre. Les pages du grimoire sont ici, pour pouvoir les relire depuis la magie sans lancer le jeu.
   Le jeu s'en tient aux bases et à la magie de village : le rituel cérémoniel, la Kabbale et les pentacles sont gardés pour un autre lieu. */
(() => {
  const PAGES = [
    {id:"croisee", n:1, t:"Qu'est-ce que la magie ?", lieu:"La croisée des chemins",
      txt:["On appelle magie l'art d'agir sur le monde en passant par des liens cachés entre les choses. Le mage ne demande pas, comme on prie un dieu. Il ne mesure pas non plus, comme le fera la science. Il opère : il pense que tout se tient, et qu'en touchant une chose on en remue une autre.",
        "À la Renaissance, Marsile Ficin et Giambattista della Porta parlent de <b>magie naturelle</b> : celle qui se sert des propriétés des plantes, des pierres, des métaux et des astres, sans appeler aucun esprit. C'est elle que ce chemin raconte."],
      mots:[["Mage", "Du vieux perse <i>magush</i> : les prêtres savants de la Perse antique. Les Grecs en ont fait le nom de tous ceux qui pratiquent les arts secrets."], ["Occulte", "« Caché ». Une qualité occulte est une propriété dont on voit l'effet sans en voir la cause, comme l'aimant qui attire le fer."], ["Magie naturelle", "Celle qui n'emploie que les vertus des choses créées. On l'oppose à la magie cérémonielle, qui s'adresse à des esprits."]]},
    {id:"herbe", n:2, t:"La sympathie et les signatures", lieu:"Chez l'herboriste",
      txt:["Premier principe de toute magie : le semblable agit sur le semblable. Deux choses qui se ressemblent sont liées, et l'on peut agir sur l'une par l'autre. On appelle ce lien la <b>sympathie</b>.",
        "Les herboristes en ont tiré la <b>doctrine des signatures</b>. Chaque plante porterait, dans sa forme, le signe de ce qu'elle soigne : la noix ressemble au cerveau, la feuille tachetée de la pulmonaire à un poumon, la fleur de l'euphraise à un œil. Paracelse la défend au XVIe siècle, della Porta en fait un livre en 1588.",
        "C'est une façon de lire le monde, pas une médecine : la ressemblance ne prouve rien, et ces plantes ne soignent pas ce que leur forme promet."],
      mots:[["Sympathie", "Du grec « souffrir avec ». Le lien invisible qui ferait vibrer ensemble deux choses semblables."], ["Signature", "La marque qu'une plante porterait dans sa forme, sa couleur ou son odeur, et qui dirait son usage."], ["Simple", "Une plante médicinale employée seule, sans mélange. Le jardin des simples est le jardin de l'herboriste."]]},
    {id:"seuils", n:3, t:"Garder le seuil", lieu:"Les portes du village",
      txt:["La magie la plus répandue n'est pas dans les livres. Elle est clouée aux portes. Le seuil est l'endroit où le dehors peut entrer : on le garde.",
        "Un <b>fer à cheval</b>, parce que le fer passe pour repousser ce qui rôde. Une <b>rosace à six pétales</b> tracée au compas sur la poutre : on en trouve dans toute l'Europe, sur les linteaux, les coffres et les berceaux. Du <b>sel</b> jeté en travers de l'entrée. En Angleterre, au XVIIe siècle, on enterrait sous l'âtre des bouteilles remplies d'épingles.",
        "Ces gestes ne visent pas à obtenir quelque chose. Ils servent à détourner le mal."],
      mots:[["Apotropaïque", "Du grec « qui détourne ». Se dit de tout objet ou geste destiné à écarter le mauvais sort."], ["Amulette", "Un objet qu'on porte ou qu'on pose pour se protéger. Elle défend, elle n'attire rien."], ["Marque de sorcière", "Nom donné aux signes gravés près des portes, des fenêtres et des cheminées pour en barrer l'accès."]]},
    {id:"forge", n:4, t:"Sept planètes, sept métaux, sept jours", lieu:"Chez le forgeron",
      txt:["Pour les Anciens, sept astres errent dans le ciel : la Lune, Mercure, Vénus, le Soleil, Mars, Jupiter et Saturne. Ils les appellent tous planètes, et chacune gouverne une part du monde.",
        "À chacune son métal : l'<b>argent</b> à la Lune, le <b>fer</b> à Mars, le <b>vif-argent</b> à Mercure, l'<b>étain</b> à Jupiter, le <b>cuivre</b> à Vénus, le <b>plomb</b> à Saturne, l'<b>or</b> au Soleil.",
        "Et à chacune son jour, que le français garde presque intact : lundi, mardi, mercredi, jeudi, vendredi. Samedi vient du sabbat et dimanche du « jour du Seigneur », mais l'anglais dit encore <i>Saturday</i> et <i>Sunday</i>."],
      mots:[["Planète", "Du grec « astre errant ». Au sens ancien, tout astre qui se déplace parmi les étoiles fixes, Soleil et Lune compris."], ["Vif-argent", "L'ancien nom du mercure : un argent vivant, parce qu'il coule."], ["Ordre chaldéen", "Les sept planètes rangées de la plus lente à la plus rapide : Saturne, Jupiter, Mars, le Soleil, Vénus, Mercure, la Lune."]]},
    {id:"tombes", n:5, t:"Vingt siècles de grimoires", lieu:"Le cimetière",
      txt:["La magie savante se transmet par des livres, et ces livres voyagent. Les <b>papyrus grecs magiques</b> sont écrits en Égypte entre le IIe siècle avant notre ère et le Ve siècle après. Le <b>Picatrix</b> est composé en arabe, en Andalousie, autour de l'an mil, puis traduit pour le roi Alphonse X de Castille vers 1256.",
        "La <b>Clavicule de Salomon</b> circule à la fin du Moyen Âge sous le nom du roi biblique. En 1533, Cornelius <b>Agrippa</b> fait imprimer à Cologne ses trois livres de <i>La Philosophie occulte</i>, qui rassemblent tout. <b>John Dee</b>, mathématicien de la reine Élisabeth, note à partir de 1582 ses conversations avec des anges.",
        "Au XIXe siècle, le Parisien <b>Éliphas Lévi</b> relance le tout avec <i>Dogme et rituel de la haute magie</i> (1854-1856), et répand le mot « occultisme »."],
      mots:[["Grimoire", "Déformation de « grammaire » : au Moyen Âge, un livre en latin, donc illisible pour la plupart, donc suspect."], ["Clavicule", "« Petite clé ». Le titre promet d'ouvrir ce qui est fermé."], ["Occultisme", "Mot du XIXe siècle pour désigner l'ensemble des savoirs dits cachés : magie, astrologie, alchimie, Kabbale."]]},
    {id:"carre", n:6, t:"Le carré de Saturne", lieu:"Le parvis du château",
      txt:["Neuf nombres dans neuf cases : 4, 9, 2, puis 3, 5, 7, puis 8, 1, 6. Chaque ligne, chaque colonne et chaque diagonale donne 15. C'est le plus petit <b>carré magique</b>. Les Chinois le connaissaient sous le nom de Lo Shu.",
        "Agrippa attribue un carré à chaque planète. Celui de trois cases de côté revient à Saturne, la plus lente et la plus lointaine.",
        "On en tire des signes. Pour écrire un nom en secret, on change ses lettres en nombres, puis on relie les cases correspondantes : le tracé obtenu est un <b>sceau</b>. Tes pas viennent d'en tracer un, le plus simple, de 1 à 9."],
      mots:[["Carré magique", "Une grille de nombres dont toutes les lignes, colonnes et diagonales ont la même somme."], ["Kamea", "Le nom hébreu de ces carrés planétaires dans la tradition des talismans."], ["Sceau", "Le signe d'une planète ou d'un esprit, obtenu en traçant un chemin sur son carré."]]},
    {id:"atelier", n:7, t:"Le talisman", lieu:"L'établi du château",
      txt:["Une amulette protège. Un <b>talisman</b> attire : c'est un objet fabriqué à un moment choisi pour recueillir la vertu d'une planète. Le Picatrix en donne des centaines de recettes, et Ficin en discute dans son traité de 1489.",
        "Tout doit s'accorder : la planète qui gouverne ce qu'on désire, son métal, son jour, et son heure. Car chaque heure a aussi sa planète, dans l'ordre chaldéen.",
        "La première heure après le lever du soleil appartient à la planète du jour. C'est même elle qui donne son nom au jour : voilà pourquoi la semaine ne suit pas l'ordre du ciel."],
      mots:[["Talisman", "De l'arabe <i>tilsam</i>, lui-même venu du grec « rite accompli ». Un objet chargé à un instant précis."], ["Heure planétaire", "Le jour et la nuit sont chacun divisés en douze heures, et chaque heure est confiée à une planète."], ["Élection", "L'art de choisir le moment où commencer une chose, d'après la position des astres."]]},
    {id:"sommet", n:8, t:"Le sigil", lieu:"La chambre haute",
      txt:["En 1913, le peintre anglais <b>Austin Osman Spare</b> propose une magie sans livre, sans esprit et sans latin. On écrit son désir en une phrase. On barre les lettres qui se répètent (beaucoup retirent aussi les voyelles). On fond celles qui restent en un seul signe : le <b>sigil</b>.",
        "Puis on l'oublie. Pour Spare, un désir agit mieux quand on cesse d'y penser. Dans les années 1970, Peter Carroll et la <b>magie du chaos</b> font de cette méthode leur outil principal.",
        "Rien ne prouve qu'un sigil change le monde. Mais il oblige à dire en une phrase ce qu'on veut vraiment, et ce n'est pas rien."],
      mots:[["Sigil", "Du latin <i>sigillum</i>, petit signe, sceau. Un dessin qui tient lieu d'une intention."], ["Magie du chaos", "Courant né en Angleterre vers 1978 : peu importe la croyance, seule compte la technique qui marche pour soi."], ["Charger", "Donner sa force à un signe, par l'attention ou l'émotion, avant de s'en détacher."]]}];
  const CLE = "arcanes.tour.v1";
  const etat = () => { try{ const s = JSON.parse(localStorage.getItem(CLE) || "{}"); return {pages:s.pages || [], fin:!!(s.faits && s.faits.fin)}; }catch(e){ return {pages:[], fin:false}; } };

  /* le grimoire : les pages trouvées, puis tous leurs mots */
  function grimoire(){ const E = etat(), ok = PAGES.filter(p => E.pages.includes(p.id)); document.querySelectorAll(".tg").forEach(e => e.remove());
    const d = document.createElement("div"); d.className = "tg"; d.setAttribute("role", "dialog"); d.setAttribute("aria-label", "Le grimoire de la Tour");
    d.innerHTML = `<div class="tg-in"><button type="button" class="tg-x" aria-label="Fermer">✕</button><p class="tg-eye">La Tour · ${ok.length} page${ok.length > 1 ? "s" : ""} sur ${PAGES.length}</p><h1>Le grimoire</h1>
      ${ok.length ? "" : `<p class="tg-vide">Il est encore vide. Chaque énigme résolue sur le chemin de la tour y écrit une page.</p>`}
      ${PAGES.map(p => E.pages.includes(p.id) ? `<details class="tg-p"><summary><b>${p.n}</b><span>${p.t}<small>${p.lieu}</small></span></summary>${p.txt.map(t => `<p>${t}</p>`).join("")}</details>` : `<div class="tg-p clos"><b>${p.n}</b><span>Page encore blanche<small>${p.lieu}</small></span></div>`).join("")}
      ${ok.length ? `<h2>Les mots</h2><dl>${ok.flatMap(p => p.mots).sort((a, b) => a[0].localeCompare(b[0], "fr")).map(([m, x]) => `<dt>${m}</dt><dd>${x}</dd>`).join("")}</dl>` : ""}</div>`;
    document.body.appendChild(d); requestAnimationFrame(() => d.classList.add("on"));
    const ferme = () => { d.classList.remove("on"); setTimeout(() => d.remove(), 300); }; d.querySelector(".tg-x").onclick = ferme; d.addEventListener("click", e => { if(e.target === d) ferme(); }); }

  const CARTE = () => { const E = etat(), n = E.pages.length;
    return `<div class="m-tourjeu"><button type="button" class="m-tourjeu-go" data-tourjeu><svg viewBox="0 0 60 60" width="64" height="64" aria-hidden="true" shape-rendering="crispEdges"><rect width="60" height="60" fill="#0a0810"/><path d="M0 46h60v14H0z" fill="#14101e"/><path d="M14 36h32v12H14zM12 32h6v4h-6zM42 32h6v4h-6z" fill="#221c30"/><path d="M26 16h8v32h-8zM25 12h10v4H25z" fill="#2a2338"/><path d="M30 1l6 11H24z" fill="#3b3350"/><rect x="29" y="20" width="2" height="3" fill="#ffb656"/><rect x="28" y="19" width="4" height="5" fill="#ffb656" opacity=".35"/><rect x="28" y="42" width="4" height="6" fill="#0a0810"/><rect x="48" y="8" width="1" height="1" fill="#cfc8e0"/><rect x="10" y="12" width="1" height="1" fill="#cfc8e0"/><rect x="44" y="20" width="1" height="1" fill="#cfc8e0"/></svg>
      <span><small>Jeu · ${E.fin ? "la tour est allumée" : n ? `${n} page${n > 1 ? "s" : ""} sur ${PAGES.length}` : "les bases de la magie"}</small><b>La Tour</b><i>Un village la nuit, un château au bout du chemin. Huit énigmes pour apprendre les bases de la magie, et une lampe à allumer tout en haut.</i></span></button>
      ${n ? `<button type="button" class="m-tourjeu-g" data-tourgrim>Ouvrir le grimoire</button>` : ""}</div>`; };
  let charge = null;
  const rafraichit = () => { const c = document.querySelector(".m-tourjeu"); if(c) c.outerHTML = CARTE(); };
  const ouvrir = () => { if(!charge) charge = import(new URL("magie/tour/tour.min.js", document.baseURI).href).catch(e => { charge = null; throw e; });
    charge.then(m => m.ouvrir({ferme:rafraichit})).catch(() => alert("Le jeu n'a pas pu se charger. Vérifie ta connexion et réessaie.")); };
  document.addEventListener("click", e => { if(e.target.closest("[data-tourjeu]")){ e.preventDefault(); ouvrir(); } else if(e.target.closest("[data-tourgrim]")){ e.preventDefault(); grimoire(); } });
  const l = document.createElement("link"); l.rel = "stylesheet"; l.href = "magie/tour/tour.css"; document.head.appendChild(l);
  window.TOUR_DATA = {PAGES};
  window.ArcanesTourJeu = {carte:CARTE, ouvrir, grimoire};
})();
