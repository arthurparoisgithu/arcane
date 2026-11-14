/* ===== Arcanes · Astrologie : la lecture guidée du thème, l'année et l'impression =====
   Branché par astro.js, qui lui passe ses outils : window.AstroLecture(H) -> {guide, annee, bind, print}.
   Deux couches à chaque étape : « En clair » (des mots simples) et « Pour aller plus loin » (la technique). */
window.AstroLecture = H => {
  const {C, D, SG, PL, ROM, ASP, h, cap, gl, pg, sgl, fiche, fmtPos, fmtOrb, fmtD, school, st, save, IMG} = H;
  const q1 = (s, r = document) => r.querySelector(s), qa = (s, r = document) => [...r.querySelectorAll(s)];
  const DAY = 864e5;
  const fs = id => PL[id] ? PL[id].fs : D.ANGLES[id].fs;
  const pn = id => PL[id] ? PL[id].court : D.ANGLES[id].court;
  const lec = () => { if(!st().lect) st().lect = {notes:{}, journal:[]}; const L = st().lect; L.notes = L.notes || {}; L.journal = L.journal || []; return L; };
  const ids = () => school() === "tradition" ? [...C.TRAD7] : [...C.MOD10];
  const de = n => /^[AEIOUÉ]/.test(n) ? "d'" + n : "de " + n;
  const leLa = id => id === "soleil" ? "le Soleil" : id === "lune" ? "la Lune" : PL[id].court;

  /* ---------- les mots simples ---------- */
  const CLAIR = {
    soleil:"Le Soleil, c'est ton cap : ce que tu cherches à devenir, ce qui te donne envie de te lever le matin, la façon dont tu as besoin de rayonner. Ce n'est pas tout toi ; c'est la direction vers laquelle tu grandis.",
    lune:"La Lune, c'est ton monde intérieur : tes besoins, tes réflexes, ce qui te rassure et ce qui te touche. C'est la part de toi qui réagit avant de réfléchir, celle qu'on connaît surtout dans l'intimité.",
    mercure:"Mercure, c'est ta manière de penser, d'apprendre et de parler : la vitesse de ton esprit, ce qui t'intéresse, la façon dont tu relies les idées.",
    venus:"Vénus, c'est ce que tu aimes et la manière dont tu aimes : ton goût, ta façon de plaire et de recevoir, ce qui te paraît beau et juste.",
    mars:"Mars, c'est ta façon d'agir et de désirer : ton courage, ta colère, ton énergie quand tu veux quelque chose.",
    jupiter:"Jupiter, c'est ta confiance : là où tu as envie de grandir, d'apprendre, de donner du sens, et parfois d'en faire trop.",
    saturne:"Saturne, c'est ton sens des limites : ce que tu prends au sérieux, ce qui te demande du temps et de l'effort, et ce que tu finis par bâtir solidement.",
    uranus:"Uranus, c'est ta part de liberté : ce qui, en toi, refuse la routine, invente et bouscule.",
    neptune:"Neptune, c'est ta part de rêve : ton idéal, ton imagination, ta sensibilité à ce qui dépasse les mots.",
    pluton:"Pluton, c'est ta force de transformation : ce que tu vis avec intensité, ce qui meurt et renaît en toi.",
    asc:"L'Ascendant, c'est le signe qui se levait à l'horizon à ta naissance. Il décrit ta porte d'entrée dans le monde : ton allure, ta première réaction, l'impression que tu donnes avant qu'on te connaisse."
  };
  const EL_CLAIR = {feu:"le feu, c'est l'élan : l'enthousiasme, l'envie d'agir et d'inspirer", terre:"la terre, c'est le concret : la patience, le sens pratique, le goût des résultats", air:"l'air, c'est le lien : la curiosité, les idées, le besoin d'échanger", eau:"l'eau, c'est l'émotion : la sensibilité, l'intuition, le besoin de liens profonds"};
  const EL_NOM = {feu:"le feu", terre:"la terre", air:"l'air", eau:"l'eau"};
  const MO_CLAIR = {cardinal:"le mode cardinal lance les choses : il ouvre, il démarre", fixe:"le mode fixe tient les choses : il stabilise, il approfondit", mutable:"le mode mutable adapte les choses : il ajuste, il transmet"};
  const ASP_VERBE = {conj:"avancent ensemble, difficiles à séparer : l'une ne va jamais sans l'autre", sext:"se donnent la main : une facilité qu'il suffit de saisir", trigone:"s'entendent sans effort : un talent naturel, à cultiver pour qu'il ne s'endorme pas", carre:"se frottent : une tension qui pousse à agir, et qui devient souvent une force avec les années", opp:"se font face : tu passes de l'une à l'autre, l'enjeu est de les faire dialoguer", quinc:"ne parlent pas la même langue : il faut sans cesse ajuster"};
  const QUEST = {
    intro:["Qu'est-ce que tu espères trouver dans cette lecture ?"],
    soleil:["Dans quelle activité as-tu le sentiment d'être pleinement toi ?", "Qu'est-ce qui te donne de l'énergie, plutôt que de t'en prendre ?"],
    lune:["De quoi as-tu besoin pour te sentir en sécurité ?", "Comment te consoles-tu quand ça ne va pas ?"],
    asc:["Quelle première impression donnes-tu, selon ceux qui te connaissent peu ?", "Comment réagis-tu face à une situation nouvelle ?"],
    dom:["Quel élément te manque, et comment le cultives-tu ?", "La planète dominante te ressemble-t-elle ?"],
    maisons:["Dans quel domaine de ta vie mets-tu le plus d'énergie en ce moment ?"],
    aspects:["Quelle tension intérieure revient souvent dans ta vie ? Qu'est-ce qu'elle t'a appris ?"],
    chaines:["Si une seule planète tenait les rênes de ton thème, laquelle choisirais-tu, et pourquoi ?"],
    lames:["Parmi ces cartes, laquelle te ressemble le plus ? Laquelle te surprend ?"],
    synth:["Laquelle de ces cinq phrases te ressemble le plus ? Laquelle te ressemble le moins ?", "Qu'aimerais-tu développer dans l'année qui vient ?"]
  };

  /* ---------- les calculs ---------- */
  const angulaires = ch => {
    if(!ch.heure) return [];
    const A = [["asc", "l'Ascendant"], ["mc", "le Milieu du Ciel"]], out = [];
    ids().forEach(id => { const l = ch.P[id].lon;
      [[ch.asc, "l'Ascendant"], [ch.mc, "le Milieu du Ciel"], [ch.asc + 180, "le Descendant"], [ch.mc + 180, "le Fond du Ciel"]].forEach(([a, n]) => { const s = C.sep(l, a); if(s < 8) out.push({id, angle:n, orb:s}); }); });
    return out.sort((a, b) => a.orb - b.orb);
  };
  const et = l => l.length > 1 ? l.slice(0, -1).join(", ") + " et " + l[l.length - 1] : l.join("");
  const angTxt = ang => { const g = {}; ang.forEach(a => { (g[a.angle] = g[a.angle] || []).push(PL[a.id].court); }); return Object.entries(g).map(([n, l]) => `${et(l)} ${l.length > 1 ? "sont" : "est"} sur ${n}`).join(" ; "); };
  /* les chaînes de maîtrise : chaque planète obéit au maître du signe qu'elle occupe */
  function chaines(ch){
    const sc = school(), I = ids(), R = id => C.rulerOf(C.si(ch.P[id].lon), sc);
    const finals = I.filter(id => R(id) === id);
    const out = I.map(id => { const c = [id]; let n = R(id), guard = 0;
      while(!c.includes(n) && guard++ < 12){ c.push(n); n = R(n); }
      return {id, chain:c, end:c[c.length - 1], loop:R(c[c.length - 1]) !== c[c.length - 1] ? n : null}; });
    return {out, finals};
  }
  const tight = ch => C.aspects(ch, school()).filter(x => PL[x.a] && PL[x.b] && !PL[x.a].point && !PL[x.b].point).sort((a, b) => a.orb - b.orb);
  const housesOf = ch => { const c = {}; ids().forEach(id => { const n = ch.P[id].house; if(n) (c[n] = c[n] || []).push(id); }); return c; };

  /* ---------- les phrases ---------- */
  const pos = (ch, id) => { const p = ch.P[id], k = C.si(p.lon); return `${PL[id].court} en ${SG[k].nom}${ch.heure && p.house ? `, maison ${ROM[p.house]}` : ""}`; };
  function cinq(ch){
    const sc = school(), S = SG[C.si(ch.P.soleil.lon)], L = SG[C.si(ch.P.lune.lon)], B = C.balance(ch);
    const el = Object.entries(B.el).sort((a, b) => b[1] - a[1])[0][0], dom = C.dominants(ch, sc)[0], T = tight(ch)[0];
    const hs = ch.heure ? D.HOUSES[ch.P.soleil.house - 1] : null;
    const out = [
      `<b>Ton cap.</b> Tu te construis ${S.style}${hs ? `, surtout ${hs.dom}` : ""}. <span class="help">(Soleil en ${S.nom})</span>`,
      `<b>Tes besoins.</b> Pour te sentir bien, tu as besoin de vivre les choses ${L.style}. <span class="help">(Lune en ${L.nom})</span>`
    ];
    if(ch.heure){ const A = SG[C.si(ch.asc)], r = C.rulerOf(C.si(ch.asc), sc), hr = D.HOUSES[ch.P[r].house - 1];
      out.push(`<b>Ta porte d'entrée.</b> Au premier abord, tu te présentes ${A.style} ; le fil de ta vie passe par ${leLa(r)}, ${hr.dom}. <span class="help">(Ascendant en ${A.nom})</span>`); }
    else out.push(`<b>Ton climat.</b> L'élément le plus présent est ${EL_NOM[el]} : ${EL_CLAIR[el].split(" : ")[1]}. <span class="help">(répartition des éléments)</span>`);
    out.push(`<b>Ta note dominante.</b> La planète qui donne le ton est ${leLa(dom.id)} : ${PL[dom.id].fn} pèse lourd dans ta vie${ch.heure ? `, dans un thème où domine ${EL_NOM[el]}` : ""}. <span class="help">(${dom.why.slice(0, 2).join(", ") || "dominante"})</span>`);
    if(T) out.push(`<b>Ton dialogue intérieur.</b> ${cap(fs(T.a))} et ${fs(T.b)} ${ASP_VERBE[T.asp]}. <span class="help">(${ASP[T.asp].nom} ${PL[T.a].court}–${PL[T.b].court}, orbe ${fmtOrb(T.orb)})</span>`);
    return out;
  }

  /* ---------- les lames de tarot du thème (correspondances de la Golden Dawn) ---------- */
  const SIGN_LAME = ["empereur","pape","amoureux","chariot","force","ermite","justice","sansnom","temperance","diable","etoile","lune"];
  const PL_LAME = {soleil:"soleil", lune:"papesse", mercure:"bateleur", venus:"imperatrice", mars:"maisondieu", jupiter:"roue", saturne:"monde", uranus:"mat", neptune:"pendu", pluton:"jugement"};
  const SUITE = ["batons","deniers","epees","coupes"], SUITE_NOM = {batons:"Bâtons", deniers:"Deniers", epees:"Épées", coupes:"Coupes"};
  const CHALD = ["mars","soleil","venus","mercure","lune","saturne","jupiter"];
  const tarotOK = () => typeof byId === "function" && typeof cardSVG === "function";
  const cardNom = id => { try{ return (typeof nomIn === "function" && typeof DECK_ID !== "undefined" ? nomIn(DECK_ID, id) : null) || byId(id).nom; }catch(e){ return id; } };
  function lamesOf(ch, t){
    const sc = school(), L = [];
    const ks = C.si(ch.P.soleil.lon), dec = Math.floor((C.norm(ch.P.soleil.lon) % 30)/10), di = ks*3 + dec;
    const suit = SUITE[ks % 4], rank = 2 + (ks % 3)*3 + dec, decR = CHALD[di % 7];
    L.push({role:"Ta lame solaire", id:SIGN_LAME[ks], why:`La lame ${SG[ks].du}, le signe de ton Soleil : elle montre la direction vers laquelle tu grandis.`});
    L.push({role:"La carte de ton décan", id:suit + rank, why:`Ton Soleil était entre ${dec*10}° et ${dec*10 + 10}° ${SG[ks].du}, dans le ${dec + 1}${dec ? "ᵉ" : "ᵉʳ"} décan, gouverné par ${PL[decR].court}. La Golden Dawn y place le ${rank} de ${SUITE_NOM[suit]}. C'est ta carte la plus personnelle : elle change tous les dix jours.`});
    const km = C.si(ch.P.lune.lon);
    L.push({role:"La lame de ta Lune", id:SIGN_LAME[km], why:`La lame du signe de ta Lune, ${SG[km].nom} : tes besoins, ta vie intérieure, ce qui te rassure.`});
    if(ch.heure){ const ka = C.si(ch.asc); L.push({role:"La lame de ton Ascendant", id:SIGN_LAME[ka], why:`La lame du signe qui se levait à ta naissance, ${SG[ka].nom} : ta porte d'entrée dans le monde, l'impression que tu donnes.`}); }
    const r = ch.heure ? C.rulerOf(C.si(ch.asc), sc) : C.dominants(ch, sc)[0].id;
    if(PL_LAME[r]) L.push({role:"La lame de ta planète maîtresse", id:PL_LAME[r], why:ch.heure ? `${PL[r].court} gouverne ton Ascendant : c'est le fil conducteur de ton thème${["uranus","neptune","pluton"].includes(r) ? " (correspondance moderne)" : ""}.` : `${PL[r].court} est la planète qui domine ton thème${["uranus","neptune","pluton"].includes(r) ? " (correspondance moderne)" : ""}.`});
    if(typeof birthCalc === "function" && t && t.y){ try{ const iso = `${t.y}-${String(t.m).padStart(2, "0")}-${String(t.d).padStart(2, "0")}`, b = birthCalc(iso);
      if(b && b.card) L.push({role:"Ta lame de naissance", id:b.card.id, birth:true, why:`Une autre tradition, la numérologie du tarot popularisée par Mary K. Greer : on additionne les chiffres de la date de naissance (${b.calc}). Ce n'est pas de l'astrologie, mais elle complète le portrait.`}); }catch(e){} }
    return L;
  }
  function lamesHTML(ch, t, o = {}){
    if(!tarotOK()) return "";
    const L = lamesOf(ch, t).filter(x => byId(x.id));
    const ids = L.map(x => x.id), rep = ids.filter((x, i) => ids.indexOf(x) !== i);
    return `<div class="a-lames${o.compact ? " compact" : ""}">${L.map(x => { const c = byId(x.id);
      return `<article class="a-lame${rep.includes(x.id) ? " rep" : ""}"><button type="button" class="a-lame-img" data-lsheet="${x.id}" aria-label="Ouvrir la fiche ${h(cardNom(x.id))}">${cardSVG(c)}</button>
        <div><p class="eyebrow">${x.role}</p><h4>${h(cardNom(x.id))}</h4>${c.mots ? `<p class="a-lame-m">${c.mots.slice(0, 3).join(" · ")}</p>` : ""}<p class="help">${x.why}</p>
        ${x.birth ? `<button type="button" class="linkbtn" data-lbirth>Voir ma lame de naissance dans le tarot</button>` : ""}</div></article>`; }).join("")}</div>
      ${rep.length ? `<p class="help a-lame-rep">${[...new Set(rep)].map(id => `<b>${h(cardNom(id))}</b>`).join(", ")} revient plusieurs fois : c'est une lame qui compte particulièrement pour toi.</p>` : ""}
      <p class="help">Correspondances de la Golden Dawn, reprises dans le Waite-Smith. Dans le Tarot de Marseille, La Justice porte le VIII et La Force le XI : c'est la carte qui compte ici, pas son numéro. Touche une carte pour lire sa fiche.</p>`;
  }

  /* ---------- les maisons, en clair ---------- */
  const MAISON = [
    {quoi:"Ta personne : ton corps, ton allure, ta façon d'entrer dans une pièce et de commencer les choses.", vie:"C'est ce que les autres voient de toi en premier, avant de te connaître. C'est aussi ta manière de réagir spontanément à ce qui est nouveau.", q:"Comment les gens te décrivent-ils la première fois qu'ils te rencontrent ?"},
    {quoi:"Ton argent, ce que tu possèdes, et ce qui te donne le sentiment d'avoir de la valeur.", vie:"Elle dit comment tu gagnes, dépenses et gardes, mais aussi quelles ressources personnelles, quels talents, peuvent te faire vivre, et ce qui te sécurise matériellement.", q:"Qu'est-ce qui te donne le sentiment d'être en sécurité matériellement ?"},
    {quoi:"Ton quotidien proche : tes échanges, tes messages, tes petits trajets, tes frères et sœurs, ton quartier, ce que tu apprends au jour le jour.", vie:"Elle décrit ta façon de communiquer et d'apprendre dans la vie de tous les jours, et ta relation avec ton entourage proche.", q:"Comment parles-tu avec tes proches quand tout va bien ? Et quand ça se tend ?"},
    {quoi:"Tes racines : ta famille, ta maison, ton enfance, l'endroit où tu te sens chez toi.", vie:"C'est le fond de toi, ce qu'on voit le moins mais qui porte tout le reste. La tradition y lit aussi le rapport à l'un de tes parents, et la fin de la vie.", q:"À quel endroit, ou avec qui, te sens-tu vraiment chez toi ?"},
    {quoi:"Ce qui te fait plaisir : tes loisirs, tes créations, tes amours naissantes, tes enfants, le jeu.", vie:"C'est la maison de ce que tu fais par plaisir et non par devoir : là où tu t'exprimes, où tu prends des risques pour le plaisir, où tu donnes naissance à quelque chose.", q:"Quelle activité te donne de la joie, sans autre but qu'elle-même ?"},
    {quoi:"Ton travail au quotidien et ta santé : tes habitudes, tes tâches, ton organisation, ton corps jour après jour.", vie:"Elle dit comment tu travailles concrètement (ta carrière, elle, est en maison X), comment tu prends soin de toi, et ton rapport aux collègues et au service rendu.", q:"Quelle habitude quotidienne te fait du bien ? Laquelle t'use ?"},
    {quoi:"Les autres en face de toi : le couple, les associés, les contrats, et aussi les adversaires déclarés.", vie:"C'est la maison opposée à la première : elle décrit ce que tu cherches chez l'autre, souvent ce qui te manque. Elle parle des relations d'égal à égal, en amour comme en affaires.", q:"Qu'est-ce qui t'attire chez les personnes avec qui tu fais équipe ?"},
    {quoi:"Ce qui se partage et ce qui se transforme : l'intimité, l'argent des autres (héritage, prêt, argent du couple), les crises, les deuils.", vie:"C'est une maison profonde : elle dit comment tu traverses les crises, ce que tu lâches et ce qui renaît, et ta façon de faire assez confiance pour partager.", q:"Qu'est-ce qu'une épreuve t'a appris sur toi ?"},
    {quoi:"Ce qui t'élargit : les grands voyages, les études longues, les croyances, la philosophie, l'étranger.", vie:"Elle décrit ta quête de sens : ce qui te fait grandir l'esprit, les horizons qui t'attirent, ta façon de te faire une idée du monde.", q:"Quel voyage, quel livre ou quelle rencontre a changé ta façon de voir le monde ?"},
    {quoi:"Ta place dans le monde : ton métier, ta vocation, ta réputation, ce que tu veux accomplir.", vie:"C'est le point le plus haut du thème : ce que tu montres publiquement, ce pour quoi on te connaît, la trace que tu veux laisser. La tradition y lit aussi l'autre parent.", q:"Dans dix ans, qu'aimerais-tu qu'on dise de ton travail ?"},
    {quoi:"Tes amis et tes projets : les groupes, les réseaux, les causes, les espoirs.", vie:"Elle dit avec qui tu partages tes idées et tes rêves, quel genre d'amis tu choisis, et ce que tu espères pour l'avenir.", q:"Quel groupe ou quelle amitié t'aide à avancer vers ce que tu espères ?"},
    {quoi:"Ce qui est caché : ta vie intérieure, la solitude, les retraites, les rêves, ce que tu ne montres pas.", vie:"C'est la maison la plus secrète : elle parle de ce qui se joue en coulisses, des peurs comme des ressources spirituelles, et de ce qu'on fait pour les autres sans être vu.", q:"Où vas-tu quand tu as besoin de te retirer du monde ?"}
  ];
  const ICI = {
    soleil:"c'est un domaine central pour toi : tu y cherches à te réaliser, à rayonner, à y trouver de la reconnaissance.",
    lune:"c'est un domaine sensible : tu as besoin de t'y sentir en sécurité, tes humeurs y montent et y descendent, tu y gardes tes habitudes.",
    mercure:"tu y penses beaucoup, tu en parles, tu y négocies : ton esprit s'y active et tu y apprends vite.",
    venus:"tu y cherches l'harmonie et le plaisir : tu y es à l'aise, tu y plais, tu aimes que les choses y soient belles.",
    mars:"tu y mets de l'énergie et de la combativité : tu y prends des initiatives, parfois avec impatience, parfois dans le conflit.",
    jupiter:"c'est un domaine de confiance et d'occasions : les portes s'y ouvrent plus facilement, avec le risque d'en faire trop.",
    saturne:"c'est un domaine sérieux, qui demande du temps : les débuts y sont souvent lents ou difficiles, mais ce que tu y bâtis tient.",
    uranus:"tu as besoin d'y être libre : les choses y changent brusquement, et tu y refuses la routine.",
    neptune:"c'est un domaine de rêve et d'idéal : tu y trouves de l'inspiration, mais tu peux aussi y être flou, ou vite déçu.",
    pluton:"c'est un domaine intense : tu y vis des transformations profondes, des fins et des renaissances, parfois des questions de pouvoir."
  };
  let hOrder = "vie";
  function maisons(ch){
    if(!ch.heure) return `<p class="lead">Sans heure de naissance, les maisons ne peuvent pas être calculées : elles dépendent de l'heure, à quelques minutes près.</p><p class="help">Si tu retrouves ton heure (acte de naissance, carnet de santé, livret de famille), modifie le thème : les douze maisons apparaîtront.</p>`;
    const sc = school(), ids = sc === "tradition" ? C.TRAD7 : C.MOD10;
    const list = ch.cusps.map((c, i) => { const n = i + 1, k = C.si(c), r = C.rulerOf(k, sc), inH = ids.filter(id => ch.P[id].house === n); return {n, c, k, r, inH}; });
    const ordered = hOrder === "vie" ? [...list].sort((a, b) => b.inH.length - a.inH.length || a.n - b.n) : list;
    const card = x => { const H = D.HOUSES[x.n - 1], M = MAISON[x.n - 1], S = SG[x.k], rh = ch.P[x.r].house, open = x.inH.length > 0;
      return `<details class="a-mh${open ? " full" : ""}"${open ? " open" : ""}><summary>
          <span class="a-mh-n" aria-hidden="true">${ROM[x.n]}</span>
          <span class="a-mh-t"><b>Maison ${ROM[x.n]} · ${H.mots.slice(0, 2).join(", ")}</b><small>${x.inH.length ? x.inH.map(id => `${pg(id)} ${PL[id].court}`).join(" · ") : "aucune planète"}</small></span>
          <i class="a-chev" aria-hidden="true"></i></summary>
        <div class="a-mh-b">
          <p class="a-glab">Ce que c'est</p><p><b>${M.quoi}</b> ${M.vie}</p>
          <p class="a-glab">Chez toi</p>
          <p>Tu vis ce domaine <b>${S.style}</b>, à la manière ${S.du}.</p>
          ${x.inH.length ? `<ul class="a-mh-pl">${x.inH.map(id => `<li>${pg(id)} <span><b>${id === "soleil" ? "Le Soleil" : id === "lune" ? "La Lune" : PL[id].court} ici</b> : ${ICI[id] || PL[id].fn + "."}</span></li>`).join("")}</ul>`
            : `<p class="help m-left">Aucune planète ici. Ce n'est pas un domaine absent de ta vie : il est simplement moins au premier plan, et on le lit par son signe et par sa planète maîtresse.</p>`}
          <p>${rh === x.n ? `Sa planète maîtresse, ${PL[x.r].court}, se trouve dans cette maison même : ce domaine a sa propre force, il ne dépend que de lui.`
            : `Ce domaine est relié à un autre : sa planète maîtresse, ${fiche("np:" + x.r, PL[x.r].court)}, se trouve en maison ${ROM[rh]}. Ce qui se joue ici passe donc aussi ${D.HOUSES[rh - 1].dom}.`}</p>
          <p class="a-mh-q">${M.q}</p>
          <details class="a-gloin"><summary><span>Pour aller plus loin</span><i class="a-chev" aria-hidden="true"></i></summary><div class="a-gloin-b">
            <p>Nom traditionnel : <b>${H.nom}</b>, maison ${H.type}. Cuspide (début de la maison) à ${fmtPos(x.c)}. Maître : ${fiche("np:" + x.r, PL[x.r].court)} ${sc === "moderne" ? "(maîtres modernes)" : "(maîtres traditionnels)"}, placé en ${SG[C.si(ch.P[x.r].lon)].nom}, maison ${ROM[rh]}.</p>
            <p>${H.mod}</p><p class="help m-left">${H.trad}</p>
            <p>${fiche("h:" + x.n, "La fiche complète de la maison " + ROM[x.n])}</p></div></details>
        </div></details>`; };
    return `<p class="lead">Les douze maisons sont douze domaines de ta vie. Pour chacune : ce qu'elle représente, puis comment tu la vis, d'après le signe où elle commence, les planètes qui l'habitent et la maison où se trouve sa planète maîtresse.</p>
      <div class="a-mh-bar"><div class="a-seg" role="group" aria-label="Ordre des maisons"><button type="button" data-horder="vie" class="${hOrder === "vie" ? "on" : ""}">Les plus habitées d'abord</button><button type="button" data-horder="num" class="${hOrder === "num" ? "on" : ""}">De I à XII</button></div></div>
      <div class="a-mhs">${ordered.map(card).join("")}</div>
      <p class="help">Système de maisons : ${H.sysNom ? H.sysNom(ch) : ch.system}. Une planète proche du début d'une maison peut changer de maison selon le système choisi.</p>`;
  }

  /* ---------- les étapes ---------- */
  let T0 = null;
  function steps(ch, t){
    if(t) T0 = t;
    const sc = school(), S = [];
    const deeper = (id) => { const p = ch.P[id], k = C.si(p.lon), sg = SG[k], hs = ch.heure && p.house ? D.HOUSES[p.house - 1] : null, d = C.TRAD7.includes(id) ? C.dignities(id, p.lon, ch.diurne) : {list:[C.modState(id, p.lon)].filter(Boolean), score:0};
      const asp = C.aspects(ch, sc).filter(x => (x.a === id || x.b === id) && PL[x.a] && PL[x.b]).sort((a, b) => a.orb - b.orb).slice(0, 4);
      const r = C.rulerOf(k, sc);
      return `<p><b>${PL[id].court}, selon la tradition.</b> ${PL[id].trad}</p>
        <p><b>Le signe, ${sg.nom}.</b> ${sg.mod} ${sg.trad}</p>
        ${hs ? `<p><b>La maison ${ROM[p.house]}, ${hs.nom.toLowerCase()}.</b> ${hs.mod}</p>` : ""}
        <p><b>Son état.</b> ${d.list.length ? `${cap(d.list.map(x => ({domicile:"en domicile", exaltation:"exaltée", triplicite:"maîtresse de triplicité", terme:"dans ses termes", face:"dans sa face", exil:"en exil", chute:"en chute"})[x]).join(", "))} ${C.TRAD7.includes(id) ? ` (barème de Lilly : ${d.score > 0 ? "+" : ""}${d.score})` : ""}.` : "Sans dignité particulière dans ce signe."} ${r !== id ? `Elle dépend de ${fiche("np:" + r, PL[r].court)}, maître ${SG[k].du}, placé en ${SG[C.si(ch.P[r].lon)].nom}${ch.heure ? `, maison ${ROM[ch.P[r].house]}` : ""} : c'est son « dispositeur », qui la colore à son tour.` : "Elle est chez elle : elle ne dépend que d'elle-même."}</p>
        ${asp.length ? `<p><b>Ses aspects les plus serrés.</b></p><ul class="a-ul">${asp.map(x => { const o = x.a === id ? x.b : x.a; return `<li>${pg(x.a)}${gl(ASP[x.asp].gl, "asp " + ASP[x.asp].cls)}${pg(x.b)} ${ASP[x.asp].nom} avec ${PL[o].court} (orbe ${fmtOrb(x.orb)}) : ${fs(id)} et ${fs(o)} ${ASP_VERBE[x.asp]}.</li>`; }).join("")}</ul>` : ""}`; };

    S.push({k:"intro", t:"Avant de commencer", hl:[], clair:`<p class="lead">Un thème se lit comme une phrase. <b>La planète</b> dit <i>de quoi</i> il s'agit, <b>le signe</b> dit <i>comment</i>, <b>la maison</b> dit <i>où</i>, dans quel domaine de la vie.</p>
      <p>« Vénus en Taureau en maison X », c'est donc : ta façon d'aimer (Vénus), qui se vit avec lenteur et sensualité (Taureau), dans ta vie publique et ton métier (maison X).</p>
      <p>Cette lecture avance en ${["sept","huit","neuf","dix"][(ch.heure ? 2 : 0) + (tarotOK() ? 1 : 0)]} étapes, de ce qui compte le plus à ce qui nuance. À chaque étape : d'abord <b>en clair</b>, avec des mots simples ; ensuite, si tu veux, <b>pour aller plus loin</b>, avec la technique. La roue au-dessus s'éclaire au fil des étapes.</p>`,
      loin:`<p>L'ordre suit celui des manuels, de Ptolémée à André Barbault : les deux luminaires (Soleil, Lune), l'Ascendant et son maître, les dominantes, la répartition dans les maisons, les aspects, enfin les maîtrises qui relient tout. ${ch.heure ? "" : "<b>Sans heure de naissance</b>, l'Ascendant et les maisons manquent : la lecture s'appuie sur les signes et les aspects, ce qui reste très riche."}</p>
      <p>L'école de lecture choisie, <b>${sc === "tradition" ? "tradition" : "moderne"}</b>, change les maîtres des signes et les planètes prises en compte. Tu peux la changer à tout moment en haut de la page.</p>`});
    ["soleil", "lune"].forEach(id => { const p = ch.P[id], k = C.si(p.lon), sg = SG[k], hs = ch.heure && p.house ? D.HOUSES[p.house - 1] : null;
      S.push({k:id, t:`${id === "soleil" ? "Ton Soleil" : "Ta Lune"} en ${sg.nom}`, hl:[id], img:"s" + k,
        clair:`<p class="lead">${CLAIR[id]}</p><p>Chez toi, ${id === "soleil" ? "il" : "elle"} est en <b>${sg.nom}</b> : ${PL[id].fn} se vit ${sg.style}.${hs ? ` En <b>maison ${ROM[p.house]}</b>, ${id === "soleil" ? "il" : "elle"} se joue surtout ${hs.dom}.` : ""}</p>
          <p class="a-mots-l">${sg.mots.map(m => `<span>${m}</span>`).join("")}</p>`,
        loin:deeper(id)}); });
    if(ch.heure){ const k = C.si(ch.asc), A = SG[k], r = C.rulerOf(k, sc), rp = ch.P[r], hr = D.HOUSES[rp.house - 1];
      const near = ids().filter(id => ch.P[id].house === 1 || C.sep(ch.P[id].lon, ch.asc) < 8);
      S.push({k:"asc", t:`Ton Ascendant en ${A.nom}`, hl:[r, ...near], img:"s" + k,
        clair:`<p class="lead">${CLAIR.asc}</p><p>Le tien est en <b>${A.nom}</b> : tu abordes la vie ${A.style}.</p>
          <p>Son maître, <b>${leLa(r)}</b>, devient le <b>maître de ton thème</b> : c'est un fil conducteur. ${cap(leLa(r))} est en ${SG[C.si(rp.lon)].nom}, en maison ${ROM[rp.house]} : une bonne part de ton chemin se joue ${hr.dom}.</p>
          ${near.length ? `<p>${near.map(id => PL[id].court).join(", ")} ${near.length > 1 ? "sont" : "est"} près de l'Ascendant : ${near.length > 1 ? "elles se voient" : "elle se voit"} tout de suite chez toi.</p>` : ""}`,
        loin:`<p><b>${A.nom}, en détail.</b> ${A.mod} ${A.trad}</p><p><b>La maison I.</b> ${D.HOUSES[0].mod} ${D.HOUSES[0].trad}</p>${deeper(r)}`}); }
    { const B = C.balance(ch), el = Object.entries(B.el).sort((a, b) => b[1] - a[1]), mo = Object.entries(B.mo).sort((a, b) => b[1] - a[1]);
      const dom = C.dominants(ch, sc).slice(0, 3), ang = angulaires(ch), mx = Math.max(...Object.values(B.el), 1), mxm = Math.max(...Object.values(B.mo), 1);
      S.push({k:"dom", t:"Ce qui domine", hl:dom.map(d => d.id).concat(ang.map(a => a.id)),
        clair:`<p class="lead">Certains thèmes penchent nettement d'un côté. On regarde trois choses : les <b>éléments</b> (feu, terre, air, eau), les <b>modes</b> (lancer, tenir, adapter) et les <b>planètes</b> qui pèsent le plus.</p>
          <div class="a-two a-g-bal"><div><h4 class="a-h4">Les éléments</h4><div class="a-bars">${Object.entries(B.el).map(([k, v]) => `<div class="a-bar"><span>${k}</span><i style="--w:${(v/mx*100).toFixed(0)}%" class="b-${k}"></i><b>${v}</b></div>`).join("")}</div></div>
            <div><h4 class="a-h4">Les modes</h4><div class="a-bars">${Object.entries(B.mo).map(([k, v]) => `<div class="a-bar"><span>${k}</span><i style="--w:${(v/mxm*100).toFixed(0)}%" class="b-${k}"></i><b>${v}</b></div>`).join("")}</div></div></div>
          <p>Chez toi, l'élément le plus fort est <b>${EL_NOM[el[0][0]]}</b> : ${EL_CLAIR[el[0][0]].split(" : ")[1]}.${el[3][1] <= 2 ? ` Le plus faible est ${EL_NOM[el[3][0]]} : ce n'est pas un manque, c'est une qualité qui demande à être cultivée consciemment.` : ""} Côté rythme, ${MO_CLAIR[mo[0][0]]}.</p>
          <p>Les planètes qui donnent le ton : ${dom.map((d, i) => `<b>${PL[d.id].court}</b>${i === 0 ? " avant tout" : ""}`).join(", ")}.${ang.length ? ` ${angTxt(ang)} : une planète placée sur un angle se voit et s'exprime fort.` : ""}</p>`,
        loin:`<p><b>Comment on compte.</b> Chaque planète compte une fois, le Soleil, la Lune et l'Ascendant deux fois, le Milieu du Ciel une fois. C'est un repère, pas une loi : une seule planète très forte peut peser plus qu'un élément entier.</p>
          <p><b>Les dominantes.</b> ${dom.map(d => `${PL[d.id].court} : ${d.why.join(", ") || "plusieurs aspects serrés"}`).join(". ")}. On les trouve en cumulant les critères classiques : planète sur un angle, maître de l'Ascendant, maître des luminaires, planète en domicile, planète très aspectée.</p>
          ${ch.heure ? `<p><b>Les angles.</b> L'Ascendant, le Milieu du Ciel, le Descendant et le Fond du Ciel sont les quatre points les plus sensibles du thème ; les maisons qui les suivent (I, IV, VII, X) sont dites angulaires. Une planète à moins de 8° d'un angle est dite « angulaire » : pour Michel Gauquelin, qui a étudié statistiquement ce point dans les années 1950, c'était la seule position qui semblait compter, résultat toujours discuté.</p>` : ""}`}); }
    if(ch.heure){ const c = housesOf(ch), top = Object.entries(c).sort((a, b) => b[1].length - a[1].length).slice(0, 3), empty = ROM.slice(1).map((_, i) => i + 1).filter(n => !c[n]);
      S.push({k:"maisons", t:"Où se joue ta vie", hl:top.flatMap(x => x[1]),
        clair:`<p class="lead">Les douze maisons sont douze domaines de la vie : le corps, l'argent, les proches, le foyer, la création, le travail, le couple, les crises, les voyages, le métier, les amis, l'intériorité. Là où se groupent les planètes, se concentre ton énergie.</p>
          <ul class="a-ul">${top.map(([n, l]) => `<li><b>Maison ${ROM[n]}, ${D.HOUSES[n-1].nom.toLowerCase()}</b> (${l.map(id => PL[id].court).join(", ")}) : ${D.HOUSES[n-1].mod}</li>`).join("")}</ul>
          <p class="help">${empty.length} maison${empty.length > 1 ? "s" : ""} sans planète : ${empty.map(n => ROM[n]).join(", ")}. Une maison vide n'est pas un domaine absent ; on la lit alors par son maître.</p>`,
        loin:`<p><b>Le maître d'une maison</b> est la planète qui gouverne le signe de sa cuspide. Il relie deux domaines : ainsi le maître de la maison X placé en maison IV relie le métier et le foyer.</p>
          <ul class="a-ul">${empty.slice(0, 6).map(n => { const r = C.rulerOf(C.si(ch.cusps[n-1]), sc); return `<li>Maison ${ROM[n]} (${D.HOUSES[n-1].nom.toLowerCase()}) : son maître ${PL[r].court} est en maison ${ROM[ch.P[r].house]}, ce domaine se vit donc ${D.HOUSES[ch.P[r].house - 1].dom}.</li>`; }).join("")}</ul>
          <p class="help">Le système de maisons change parfois la maison d'une planète proche d'une cuspide. Voir l'onglet Maisons pour le détail.</p>`}); }
    { const T = tight(ch).slice(0, 5);
      S.push({k:"aspects", t:"Tes dialogues intérieurs", hl:[...new Set(T.flatMap(x => [x.a, x.b]))],
        clair:`<p class="lead">Les aspects sont les angles que les planètes forment entre elles. Ils disent comment les différentes parts de toi se parlent : en accord, en tension, en face-à-face.</p>
          ${T.length ? `<ol class="a-g-asp">${T.map(x => `<li><span class="a-g-ag">${pg(x.a)}${gl(ASP[x.asp].gl, "asp " + ASP[x.asp].cls)}${pg(x.b)}</span><span><b>${cap(fs(x.a))} et ${fs(x.b)}</b> ${ASP_VERBE[x.asp]}.</span></li>`).join("")}</ol>` : `<p>Aucun aspect serré : les planètes travaillent chacune de leur côté, ce qui donne beaucoup d'indépendance entre les domaines de ta vie.</p>`}
          <p class="help">Les cinq plus serrés, du plus exact au moins exact. Le carré et l'opposition ne sont pas « mauvais » : ce sont souvent eux qui font avancer.</p>`,
        loin:`<p><b>L'orbe</b> est l'écart toléré autour de l'angle exact : plus il est petit, plus l'aspect pèse. Un aspect <b>appliquant</b> (en train de se former) est réputé plus fort qu'un aspect <b>séparant</b>.</p>
          <ul class="a-ul">${T.map(x => `<li>${ASP[x.asp].nom} ${PL[x.a].court}–${PL[x.b].court} : orbe ${fmtOrb(x.orb)}, ${x.app ? "appliquant" : "séparant"}. ${ASP[x.asp].mod}</li>`).join("")}</ul>
          <p>${fiche("a:trigone", "Les aspects, en détail")}</p>`}); }
    { const {out, finals} = chaines(ch), loops = [...new Set(out.filter(c => !finals.includes(c.end)).map(c => c.chain.slice(c.chain.indexOf(c.loop)) ).flat())];
      const one = finals.length === 1 && out.every(c => c.end === finals[0]);
      S.push({k:"chaines", t:"Qui tient les rênes", hl:finals,
        clair:`<p class="lead">Chaque signe a un maître. Une planète placée dans un signe <i>dépend</i> du maître de ce signe, qui dépend lui-même du maître du sien… On remonte ainsi des chaînes, comme une chaîne de commandement.</p>
          ${finals.length ? `<p>${one ? `Toutes tes chaînes aboutissent ${finals[0] === "soleil" ? "au <b>Soleil</b>" : finals[0] === "lune" ? "à la <b>Lune</b>" : `à <b>${PL[finals[0]].court}</b>`}, chez ${PL[finals[0]].genre === "f" ? "elle" : "lui"} en ${SG[C.si(ch.P[finals[0]].lon)].nom} : c'est le <b>dispositeur final</b>, la planète qui, en dernier ressort, tient les rênes du thème.` : `Tes chaînes aboutissent à ${et(finals.map(id => `<b>${PL[id].court}</b>`))}, ${finals.length > 1 ? "chacune chez elle" : "chez elle"} : ${finals.length > 1 ? "ce sont des points d'appui" : "c'est un point d'appui"} du thème.`}${loops.length ? ` D'autres chaînes tournent en boucle : ${et(loops.map(id => PL[id].court))} se renvoient la main, sans que l'une commande l'autre.` : ""}</p>`
            : `<p>Aucune planète n'est chez elle : tes chaînes tournent en boucle. C'est un thème où les fonctions se renvoient la main, sans chef unique.</p>`}
          <ul class="a-chains">${out.map(c => `<li>${c.chain.map((id, i) => `<span class="a-ch${finals.includes(id) ? " fin" : ""}">${pg(id)} ${PL[id].court}</span>`).join(`<i aria-hidden="true">→</i>`)}${c.loop && !finals.includes(c.end) ? `<i aria-hidden="true">↺</i><span class="help">boucle</span>` : ""}</li>`).join("")}</ul>`,
        loin:`<p>Ce procédé, la <b>dispositorship</b> des astrologues anglais, vient de la tradition : une planète « reçue » dans le domicile d'une autre lui est soumise, et en reçoit la couleur. Il n'y a un dispositeur final unique que si une seule planète est en domicile et que toutes les chaînes y mènent ; sinon, on parle de plusieurs centres, ou d'une <b>réception mutuelle</b> quand deux planètes sont chacune dans le domicile de l'autre.</p>
          <p class="help">Maîtres ${sc === "tradition" ? "traditionnels (sans Uranus, Neptune ni Pluton)" : "modernes (Uranus maître du Verseau, Neptune des Poissons, Pluton du Scorpion)"}.</p>`}); }
    if(tarotOK()) S.push({k:"lames", t:"Tes lames de tarot", hl:["soleil", "lune"],
      clair:`<p class="lead">Le tarot et l'astrologie se sont rencontrés à la fin du XIXe siècle : la Golden Dawn a donné à chaque signe, à chaque planète et à chaque décan sa carte. Voici celles qui te correspondent.</p>${lamesHTML(ch, T0)}`,
      loin:`<p><b>D'où viennent ces correspondances.</b> En 1888, l'ordre de la Golden Dawn relie les 22 arcanes majeurs aux 22 lettres hébraïques, et donc aux trois éléments, aux sept planètes et aux douze signes. Les cartes numérotées de 2 à 10 vont aux 36 décans, en suivant l'ordre chaldéen des planètes. Ce système n'est pas historique : le tarot est né en Italie vers 1440, sans lien avec l'astrologie. Mais il donne un langage commun aux deux arts.</p>
        <p><b>Uranus, Neptune et Pluton</b> n'existent pas dans le système d'origine. Les astrologues modernes leur ont donné Le Mat, Le Pendu et Le Jugement, qui portaient les trois éléments.</p>`});
    S.push({k:"synth", t:"Ton thème en cinq phrases", hl:[],
      clair:`<ol class="a-cinq">${cinq(ch).map(x => `<li>${x}</li>`).join("")}</ol>
        <p class="help">Ces phrases sont assemblées à partir des positions : elles résument, elles ne disent pas tout. Un thème se comprend surtout dans le temps, en le confrontant à ce que tu vis.</p>`,
      loin:`<p>La synthèse est l'étape la plus difficile, celle où les manuels insistent : ne pas additionner les significations, mais chercher les <b>répétitions</b>. Une idée qui revient trois fois (par un signe, une maison et un aspect) compte plus qu'une position isolée.</p>
        <p>Pour continuer : l'onglet <b>Mon année</b> montre les rendez-vous des douze prochains mois, et tu peux tenir un journal de ce que tu vis sous chaque transit. C'est la meilleure façon de vérifier, ou non, ce que l'astrologie dit de toi.</p>`});
    return S;
  }

  /* ---------- l'étape affichée ---------- */
  let gs = {theme:null, i:0};
  function guide(ch, t){
    if(gs.theme !== t.id){ gs = {theme:t.id, i:0}; }
    const S = steps(ch, t); gs.i = Math.max(0, Math.min(S.length - 1, gs.i));
    const s = S[gs.i], notes = (lec().notes[t.id] || {})[s.k] || "", Q = QUEST[s.k] || [];
    return `<div class="a-guide" data-gstep="${gs.i}">
      <ol class="a-gnav" aria-label="Les étapes de la lecture">${S.map((x, i) => `<li><button type="button" data-gi="${i}" class="${i === gs.i ? "on" : i < gs.i ? "done" : ""}" aria-current="${i === gs.i ? "step" : "false"}" aria-label="Étape ${i + 1} : ${h(x.t)}"><span>${i + 1}</span><small>${h(x.t.replace(/^(Ton|Ta|Tes) /, "").replace(/ en .*/, ""))}</small></button></li>`).join("")}</ol>
      <article class="a-gstep">
        <p class="eyebrow">Étape ${gs.i + 1} sur ${S.length}</p><h2>${h(s.t)}</h2>
        <section class="a-gclair"><p class="a-glab">En clair</p>${s.clair}</section>
        <details class="a-gloin"><summary><span>Pour aller plus loin</span><i class="a-chev" aria-hidden="true"></i></summary><div class="a-gloin-b">${s.loin}</div></details>
        ${Q.length ? `<section class="a-gq"><p class="a-glab">À méditer</p>${Q.map(q => `<p class="a-gqq">${q}</p>`).join("")}
          <label class="a-gnote"><span>Ma réponse, gardée sur cet appareil</span><textarea rows="3" data-gnote="${s.k}" placeholder="Quelques mots suffisent…">${h(notes)}</textarea></label><p class="help a-gsaved" aria-live="polite"></p></section>` : ""}
        <div class="a-gfoot">${gs.i > 0 ? `<button type="button" class="btn ghost small" data-gmv="-1">← ${h(S[gs.i - 1].t)}</button>` : "<span></span>"}${gs.i < S.length - 1 ? `<button type="button" class="btn small" data-gmv="1">${h(S[gs.i + 1].t)} →</button>` : `<button type="button" class="btn small" data-gprint>Imprimer mon thème</button>`}</div>
      </article></div>`;
  }

  /* ================================================================
     MON ANNÉE : les rendez-vous des douze prochains mois
     ================================================================ */
  const cache = {};
  function crossings(lonArr, target, t0, step){
    const out = [];
    for(let i = 1; i < lonArr.length; i++){
      const d0 = C.norm(lonArr[i-1] - target + 180) - 180, d1 = C.norm(lonArr[i] - target + 180) - 180;
      if((d0 < 0 && d1 >= 0) || (d0 > 0 && d1 <= 0)){ if(Math.abs(d1 - d0) < 20) out.push(new Date(t0 + (i - 1 + (-d0)/(d1 - d0))*step)); }
    }
    return out;
  }
  function yearEvents(ch, t){
    const key = t.id + ":" + school() + ":" + new Date().toDateString();
    if(cache[key]) return cache[key];
    const now = new Date(), t0 = now.getTime(), N = 366, ev = [];
    const pts = [["soleil", "ton Soleil"], ["lune", "ta Lune"]].concat(ch.heure ? [["asc", "ton Ascendant"], ["mc", "ton Milieu du Ciel"]] : []);
    const plon = id => id === "asc" ? ch.asc : id === "mc" ? ch.mc : ch.P[id].lon;
    const slow = school() === "tradition" ? ["jupiter", "saturne"] : ["jupiter", "saturne", "uranus", "neptune", "pluton"];
    const AS = [["conj", 0], ["sext", 60], ["carre", 90], ["trigone", 120], ["opp", 180]];
    slow.forEach(tid => {
      const arr = []; for(let i = 0; i <= N; i++) arr.push(C.lonOf(tid, new Date(t0 + i*DAY)));
      pts.forEach(([pid, pnom]) => AS.forEach(([aid, ang]) => {
        const targets = ang === 0 || ang === 180 ? [plon(pid) + ang] : [plon(pid) + ang, plon(pid) - ang];
        const dates = targets.flatMap(tg => crossings(arr, C.norm(tg), t0, DAY)).sort((a, b) => a - b);
        if(dates.length) ev.push({kind:"transit", t:tid, p:pid, pnom, asp:aid, dates, date:dates[0]});
      }));
    });
    // retour solaire
    try{ const sr = C.solarReturn(ch, new Date(t0 - DAY)); if(sr && sr - now < 366*DAY) ev.push({kind:"rs", date:sr}); }catch(e){}
    // retours lunaires (pas de six heures)
    { const arr = [], step = DAY/4; for(let i = 0; i <= N*4; i++) arr.push(C.lonOf("lune", new Date(t0 + i*step)));
      crossings(arr, ch.P.lune.lon, t0, step).forEach(d => ev.push({kind:"rl", date:d})); }
    // nouvelles et pleines lunes
    try{ C.lunations(now, 26).filter(x => x.date - now < 366*DAY).forEach(x => {
      const n = ch.heure ? C.houseOf(x.lon, ch.cusps) : null, hit = pts.find(([pid]) => C.sep(x.lon, plon(pid)) < 4);
      ev.push({kind:x.type, date:x.date, lon:x.lon, house:n, hit:hit ? hit[1] : null}); }); }catch(e){}
    // éclipses de l'année
    try{ let d = new Date(t0); for(let i = 0; i < 8; i++){ const E = C.eclipses(d); if(!E.length) break; const e0 = E[0]; if(e0.date - now > 366*DAY) break;
      const lon = e0.type === "soleil" ? C.lonOf("soleil", e0.date) : C.lonOf("lune", e0.date), hit = pts.find(([pid]) => C.sep(lon, plon(pid)) < 5);
      if(!ev.find(x => x.kind === "ecl" && Math.abs(x.date - e0.date) < DAY)) ev.push({kind:"ecl", type:e0.type, ek:e0.kind, date:e0.date, lon, house:ch.heure ? C.houseOf(lon, ch.cusps) : null, hit:hit ? hit[1] : null});
      d = new Date(e0.date.getTime() + 5*DAY); } }catch(e){}
    ev.sort((a, b) => a.date - b.date);
    return cache[key] = ev;
  }
  const TRV = {conj:"rejoint", sext:"forme un sextile à", carre:"forme un carré à", trigone:"forme un trigone à", opp:"s'oppose à"};
  const TRSENS = {
    jupiter:"Jupiter élargit ce qu'il touche : occasions, confiance, envie d'apprendre, parfois excès.",
    saturne:"Saturne met à l'épreuve et consolide : un temps de travail, de limites et de choix durables.",
    uranus:"Uranus réveille et bouscule : envie de liberté, changements imprévus, déclics.",
    neptune:"Neptune brouille et inspire : un temps de doute, de rêve ou de sensibilité accrue.",
    pluton:"Pluton transforme en profondeur : ce qui ne sert plus finit, quelque chose renaît."
  };
  const PTSENS = {soleil:"ton identité, ta direction, ta vitalité", lune:"ta vie intérieure, tes besoins, ton foyer", asc:"ton corps, ton allure, ta façon d'aborder la vie", mc:"ton métier, ta vocation, ta place dans le monde"};
  function evRow(e, tz){
    const d = x => fmtD(x, tz, {day:"numeric", month:"short"});
    let ic = "", ti = "", tx = "";
    if(e.kind === "transit"){ ic = `${pg(e.t)}${gl(ASP[e.asp].gl, "asp " + ASP[e.asp].cls)}${pg(e.p)}`;
      ti = `${PL[e.t].court} ${TRV[e.asp]} ${e.pnom}`;
      tx = `${TRSENS[e.t]} Cela touche ${PTSENS[e.p]} : ${ASP[e.asp].sens}. ${e.dates.length > 1 ? `Exact ${e.dates.length} fois cette année (${e.dates.map(d).join(", ")}) : les rétrogradations font passer et repasser ${PL[e.t].court} sur le même point, le thème s'installe dans la durée.` : `Exact le ${d(e.dates[0])} ; on le sent souvent quelques semaines avant et après.`}`; }
    else if(e.kind === "rs"){ ic = gl("☉", "pl"); ti = "Ton retour solaire"; tx = "Le Soleil revient à sa place de naissance : ton anniversaire astrologique. Le thème dressé pour cet instant, dit « révolution solaire », sert à lire l'année qui commence."; }
    else if(e.kind === "rl"){ ic = gl("☽", "pl"); ti = "Retour lunaire"; tx = "La Lune revient à sa place de naissance, une fois par mois environ : un petit recommencement émotionnel, utile pour faire le point."; }
    else if(e.kind === "nl" || e.kind === "pl"){ ic = e.kind === "nl" ? "●" : "○"; ti = `${e.kind === "nl" ? "Nouvelle Lune" : "Pleine Lune"} en ${SG[C.si(e.lon)].nom}${e.house ? `, dans ta maison ${ROM[e.house]}` : ""}`;
      tx = `${e.kind === "nl" ? "Le début d'un cycle : un bon moment pour poser une intention" : "Le sommet d'un cycle : ce qui a été semé devient visible"}${e.house ? `, ${D.HOUSES[e.house - 1].dom}` : ""}.${e.hit ? ` Elle tombe sur ${e.hit} : une lunaison qui te concerne de près.` : ""}`; }
    else if(e.kind === "ecl"){ ic = e.type === "soleil" ? `<svg class="a-eclic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" class="s"/><circle cx="14.5" cy="11" r="7.4" class="m"/></svg>` : `<svg class="a-eclic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" class="l"/><path d="M12 4a8 8 0 0 1 0 16a5.5 8 0 0 0 0-16z" class="r"/></svg>`; ti = `Éclipse ${e.type === "soleil" ? "de Soleil" : "de Lune"} en ${SG[C.si(e.lon)].nom}${e.house ? `, maison ${ROM[e.house]}` : ""}`;
      tx = `Une lunaison renforcée, que la tradition associe aux tournants.${e.house ? ` Le domaine touché : ${D.HOUSES[e.house - 1].dom.replace(/^dans /, "")}.` : ""}${e.hit ? ` Elle tombe sur ${e.hit}.` : ""}`; }
    const big = e.kind === "transit" || e.kind === "rs" || e.kind === "ecl" || e.hit;
    return {big, html:`<details class="a-yev${big ? " big" : ""}${e.kind === "rl" ? " small" : ""}"><summary><span class="a-yd">${d(e.date)}</span><span class="a-yic">${ic}</span><span class="a-yt">${ti}</span><i class="a-chev" aria-hidden="true"></i></summary>
      <div class="a-yb"><p>${tx}</p><button type="button" class="linkbtn" data-jnew="${h(ti)}">Noter ce que je vis</button></div></details>`};
  }
  function annee(ch, t){
    const tz = (t.lieu && t.lieu.tz) || undefined, ev = yearEvents(ch, t), L = lec();
    const months = {}; ev.forEach(e => { const k = fmtD(e.date, tz, {month:"long", year:"numeric"}); (months[k] = months[k] || []).push(e); });
    const showRL = !!gs.rl;
    const slow = ev.filter(e => e.kind === "transit");
    const tr = C.transits(ch, new Date(), school()).slice(0, 3);
    const jr = L.journal.filter(j => j.theme === t.id);
    return `<p class="lead">Les rendez-vous des douze prochains mois : les passages des planètes lentes sur les points clés de ton thème, ton retour solaire, les lunaisons et leurs maisons. Touche une ligne pour la lire.</p>
      <div class="a-yhead"><div><p class="eyebrow">Les grands mouvements</p><p>${slow.length ? `${slow.length} transit${slow.length > 1 ? "s" : ""} lent${slow.length > 1 ? "s" : ""} cette année, dont ${slow.slice(0, 3).map(e => `${PL[e.t].court} ${TRV[e.asp]} ${e.pnom}`).join(" ; ")}.` : "Aucun transit lent exact sur tes points clés cette année : une année plutôt calme en surface."}</p></div>
        <label class="a-ychk"><input type="checkbox" data-yrl${showRL ? " checked" : ""}> Afficher les retours lunaires</label></div>
      <div class="a-year">${Object.entries(months).map(([m, list]) => { const rows = list.filter(e => showRL || e.kind !== "rl").map(e => evRow(e, tz)); return rows.length ? `<section class="a-ym"><h3>${cap(m)}</h3>${rows.map(r => r.html).join("")}</section>` : ""; }).join("")}</div>
      <h2 class="lsub" id="a-journal">Mon journal des transits</h2>
      <p class="help">Note ce que tu vis : une rencontre, une fatigue, une décision. Les transits du moment sont joints automatiquement. Relu dans un an, c'est le meilleur moyen de voir ce qui, pour toi, se vérifie et ce qui ne se vérifie pas.</p>
      <form class="a-jform" data-jform><label><span class="a-glab">Aujourd'hui</span><textarea rows="3" maxlength="2000" name="txt" placeholder="Ce que je vis en ce moment…"></textarea></label>
        <input type="hidden" name="ev" value="">
        <p class="help a-jtr">${tr.length ? `Joint : ${tr.map(x => `${PL[x.t].court} ${ASP[x.asp].nom.toLowerCase()} ${pn(x.n)}`).join(" · ")}` : "Aucun transit serré aujourd'hui."}</p>
        <div class="a-acts"><button type="submit" class="btn small">Garder dans le journal</button></div></form>
      ${jr.length ? `<ol class="a-jlist">${jr.map(j => `<li><p class="a-jd">${cap(fmtD(new Date(j.t), tz, {weekday:"long", day:"numeric", month:"long", year:"numeric"}))}${j.ev ? ` · <b>${h(j.ev)}</b>` : ""}</p><p>${h(j.txt).replace(/\n/g, "<br>")}</p>${j.tr ? `<p class="help">${h(j.tr)}</p>` : ""}<button type="button" class="linkbtn danger" data-jdel="${j.id}">Supprimer</button></li>`).join("")}</ol>` : `<p class="help">Ton journal est vide.</p>`}`;
  }

  /* ================================================================
     L'IMPRESSION
     ================================================================ */
  const strip = html => { const d = document.createElement("div"); d.innerHTML = html; qa(".a-g-bal, .a-mots-l", d).forEach(x => x.remove()); return d.innerHTML; };
  function print(ch, t){
    const tz = (t.lieu && t.lieu.tz) || undefined, I = school() === "tradition" ? [...C.TRAD7, "noeudn"] : [...C.MOD10, "noeudn"];
    const born = `${t.d}/${String(t.m).padStart(2, "0")}/${t.y}${t.heure ? ` à ${String(t.h).padStart(2, "0")} h ${String(t.mi).padStart(2, "0")}` : ", heure inconnue"}`;
    const B = C.balance(ch), T = tight(ch).slice(0, 8), notes = lec().notes[t.id] || {};
    const S = steps(ch, t);
    let el = document.getElementById("a-print"); if(el) el.remove();
    el = document.createElement("div"); el.id = "a-print";
    el.innerHTML = `<header><p class="eyebrow">Arcanes · thème natal · lecture ${school()}</p><h1>${h(t.nom)}</h1><p>${born} · ${h(t.lieu.nom)}</p></header>
      <div class="ap-top"><div class="ap-wheel">${H.wheel(ch, {prefix:"np", label:"Thème de " + t.nom})}</div>
        <div><h2>En cinq phrases</h2><ol class="a-cinq">${cinq(ch).map(x => `<li>${x}</li>`).join("")}</ol></div></div>
      <div class="ap-cols"><section><h2>Les positions</h2><table><tbody>${I.map(id => `<tr><th>${PL[id].court}</th><td>${fmtPos(ch.P[id].lon)}</td><td>${ch.heure && ch.P[id].house ? "maison " + ROM[ch.P[id].house] : ""}${ch.P[id].retro ? " ℞" : ""}</td></tr>`).join("")}
          ${ch.heure ? `<tr><th>Ascendant</th><td>${fmtPos(ch.asc)}</td><td></td></tr><tr><th>Milieu du Ciel</th><td>${fmtPos(ch.mc)}</td><td></td></tr>` : ""}</tbody></table>
          <p>Éléments : ${Object.entries(B.el).map(([k, v]) => `${k} ${v}`).join(" · ")}<br>Modes : ${Object.entries(B.mo).map(([k, v]) => `${k} ${v}`).join(" · ")}</p></section>
        <section><h2>Les aspects principaux</h2><ul>${T.map(x => `<li>${ASP[x.asp].nom} ${PL[x.a].court}–${PL[x.b].court} (${fmtOrb(x.orb)}) : ${fs(x.a)} et ${fs(x.b)} ${ASP_VERBE[x.asp]}.</li>`).join("")}</ul></section></div>
      ${S.filter(s => s.k !== "intro" && s.k !== "synth").map(s => `<section class="ap-step"><h2>${h(s.t)}</h2>${strip(s.clair)}${notes[s.k] ? `<p class="ap-note"><b>Ma réponse :</b> ${h(notes[s.k])}</p>` : ""}</section>`).join("")}
      <footer>Calculé avec Astronomy Engine · maisons ${ch.heure ? (ch.system || "") : "non calculées (heure inconnue)"} · L'astrologie est proposée comme un langage symbolique et un patrimoine culturel, pour réfléchir.</footer>`;
    document.body.appendChild(el);
    const done = () => { document.documentElement.classList.remove("a-printing"); window.removeEventListener("afterprint", done); };
    document.documentElement.classList.add("a-printing");
    window.addEventListener("afterprint", done);
    setTimeout(() => { try{ window.print(); }catch(e){} setTimeout(() => { if(!window.matchMedia || !matchMedia("print").matches) {} }, 0); }, 60);
  }

  /* ================================================================
     LES ÉVÉNEMENTS
     ================================================================ */
  function highlight(root, ch){
    const w = q1(".a-thwheel", root); if(!w) return;
    const S = steps(ch), s = S[gs.i] || {hl:[]}, hl = s.hl || [];
    w.classList.toggle("a-focus", hl.length > 0);
    qa("g.w-pl", w).forEach(g => g.classList.toggle("a-hl", hl.includes(g.dataset.afiche.split(":")[1])));
  }
  function bind(root, ch, t, tab, rerender){
    const body = q1(".a-thbody", root); if(!body) return;
    qa("[data-lsheet]", body).forEach(b => b.onclick = () => { if(typeof openSheet === "function") openSheet(b.dataset.lsheet); });
    qa("[data-lbirth]", body).forEach(b => b.onclick = () => { const A = window.ArcanesAstro; if(A && A.switchTo) A.switchTo("tarot", "journal"); setTimeout(() => { const el = document.getElementById("birth"); if(el) el.scrollIntoView({block:"start"}); }, 350); });
    if(tab === "guide"){
      highlight(root, ch);
      const go = i => { gs.i = i; body.innerHTML = guide(ch, t); bind(root, ch, t, tab, rerender);
        const top = body.getBoundingClientRect().top, tb = q1(".a-tabs", root), off = (tb ? tb.offsetHeight : 0) + 76; if(top < off || top > innerHeight*.6) window.scrollTo({top:window.scrollY + top - off, behavior:matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"}); };
      qa("[data-gi]", body).forEach(b => b.onclick = () => go(+b.dataset.gi));
      qa("[data-gmv]", body).forEach(b => b.onclick = () => go(gs.i + +b.dataset.gmv));
      const pr = q1("[data-gprint]", body); if(pr) pr.onclick = () => print(ch, t);
      const ta = q1("[data-gnote]", body); let tm = null;
      if(ta) ta.oninput = () => { clearTimeout(tm); tm = setTimeout(() => { const L = lec(); (L.notes[t.id] = L.notes[t.id] || {})[ta.dataset.gnote] = ta.value.slice(0, 2000); save(); const s = q1(".a-gsaved", body); if(s) s.textContent = "Gardé."; }, 500); };
      const nav = q1(".a-gnav", body), on = nav && q1(".on", nav); if(on) nav.scrollLeft = on.parentElement.offsetLeft - 20;
    }
    if(tab === "maisons") qa("[data-horder]", body).forEach(b => b.onclick = () => { hOrder = b.dataset.horder; body.innerHTML = maisons(ch); bind(root, ch, t, tab, rerender); });
    if(tab === "annee"){
      const rl = q1("[data-yrl]", body); if(rl) rl.onchange = () => { gs.rl = rl.checked; body.innerHTML = annee(ch, t); bind(root, ch, t, tab, rerender); };
      const f = q1("[data-jform]", body);
      if(f) f.onsubmit = e => { e.preventDefault(); const txt = f.txt.value.trim(); if(!txt) { f.txt.focus(); return; }
        const tr = C.transits(ch, new Date(), school()).slice(0, 3).map(x => `${PL[x.t].court} ${ASP[x.asp].nom.toLowerCase()} ${pn(x.n)}`).join(" · ");
        lec().journal.unshift({id:"j" + Date.now().toString(36), t:Date.now(), theme:t.id, ev:f.ev.value || "", txt:txt.slice(0, 2000), tr}); lec().journal = lec().journal.slice(0, 400); save();
        body.innerHTML = annee(ch, t); bind(root, ch, t, tab, rerender); const j = q1("#a-journal", body); if(j) j.scrollIntoView({block:"start"}); };
      qa("[data-jnew]", body).forEach(b => b.onclick = () => { const f2 = q1("[data-jform]", body); f2.ev.value = b.dataset.jnew; q1(".a-glab", f2).textContent = "À propos de : " + b.dataset.jnew; f2.scrollIntoView({block:"center", behavior:"smooth"}); setTimeout(() => f2.txt.focus({preventScroll:true}), 350); });
      qa("[data-jdel]", body).forEach(b => b.onclick = () => { lec().journal = lec().journal.filter(j => j.id !== b.dataset.jdel); save(); body.innerHTML = annee(ch, t); bind(root, ch, t, tab, rerender); });
    } else { const w = q1(".a-thwheel", root); if(w && tab !== "guide"){ w.classList.remove("a-focus"); } }
  }
  return {guide, annee, bind, print, lames:lamesHTML, maisons};
};
