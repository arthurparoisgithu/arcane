/* ===== Arcanes · Astrologie : « Ton ciel aujourd'hui » =====
   1. La phrase du jour : le ciel dit en une phrase, tirée des transits du thème marqué comme le tien
      (ou de la Lune du jour quand il n'y a pas encore de thème).
   2. « Pourquoi on dit ça ? » : chaque affirmation s'ouvre sur son raisonnement et mène à la leçon qui l'explique.
   3. L'image à partager : mon ciel du jour et mon trio Soleil, Lune, Ascendant.
   window.AstroJour(deps) -> { duJour, pourquoi, partager, lessonBtns } */
window.AstroJour = function(X){
  const {C, D, SG, PL, ASP, h, cap, gl, pg, sgl, fmtPos, fmtOrb, fmtD, pn, fs, ton, sheet, IMG, PHASES, MOON_TIP} = X;
  const rad = Math.PI/180;
  const RAPIDES = ["lune","soleil","mercure","venus","mars"];
  /* ce que la planète qui passe apporte (toujours au singulier, pour l'accord) */
  const APPORT = {lune:"L'humeur du jour", soleil:"L'élan du moment", mercure:"Le besoin d'échanger", venus:"L'envie de douceur", mars:"L'envie d'agir",
    jupiter:"Un vent de confiance", saturne:"Le sens du sérieux", uranus:"Un besoin de changement", neptune:"Une part de rêve", pluton:"Un mouvement de fond"};
  const DUREE = {lune:"quelques heures", soleil:"deux ou trois jours", mercure:"deux ou trois jours", venus:"deux ou trois jours", mars:"une petite semaine",
    jupiter:"deux à trois semaines", saturne:"un mois ou deux", uranus:"plusieurs mois", neptune:"plusieurs mois", pluton:"plusieurs mois"};
  const PREP = {conj:"sur", sext:"au sextile de", carre:"au carré de", trigone:"au trigone de", opp:"en face de", quinc:"en quinconce avec"};
  const fam = a => ASP[a].cls === "conj" ? "conj" : ASP[a].cls === "doux" ? "doux" : ASP[a].cls === "dur" ? "dur" : "min";
  const JOUR = {
    conj:[(A, d) => `${A} se pose sur ${d} : c'est le sujet du jour, autant t'en occuper.`, (A, d) => `${A} rejoint ${d} : difficile de penser à autre chose aujourd'hui.`],
    doux:[(A, d) => `${A} vient soutenir ${d} : ça coule tout seul, profites-en.`, (A, d) => `${A} s'accorde avec ${d} : ce qui est simple aujourd'hui mérite d'être fait.`],
    dur:[(A, d) => `${A} vient frotter contre ${d} : si quelque chose accroche aujourd'hui, c'est là.`, (A, d) => `${A} bouscule ${d} : inutile de forcer, mieux vaut regarder ce qui résiste.`],
    min:[(A, d) => `${A} demande un petit réglage du côté de ${d} : rien de grave, un ajustement.`]};
  const FOND = {
    conj:[(A, d) => `${A} s'installe sur ${d} : c'est le chantier de la période.`],
    doux:[(A, d) => `${A} soutient ${d} : un appui discret, qui dure.`],
    dur:[(A, d) => `${A} met ${d} à l'épreuve : cela demande du temps, pas un coup de force.`],
    min:[(A, d) => `${A} oblige ${d} à s'ajuster, par petites touches.`]};
  const titre = x => `${PL[x.t].nom} ${PREP[x.asp] || "en aspect avec"} ${ton(x.n)}`;
  const jourN = d => Math.floor((d - new Date(d.getFullYear(), 0, 0))/864e5);
  function lire(x, fond, d){
    const T = fond ? FOND : JOUR, L = T[fam(x.asp)], f = L[jourN(d || new Date()) % L.length];
    return {titre:titre(x), txt:f(APPORT[x.t] || PL[x.t].nom, fs(x.n)), duree:DUREE[x.t] || ""};
  }
  /* le transit du jour (astre rapide, orbe le plus serré) et le fond de la période (astre lent) */
  function duJour(tr, now){
    const t = tr || [], jour = t.filter(x => RAPIDES.includes(x.t)).sort((a, b) => a.orb - b.orb)[0] || null;
    const fond = t.filter(x => !RAPIDES.includes(x.t)).sort((a, b) => a.orb - b.orb)[0] || null;
    return {jour, fond, pJour:jour ? lire(jour, false, now) : null, pFond:fond ? lire(fond, true, now) : null};
  }

  /* ---------- « Pourquoi on dit ça ? » ---------- */
  const LECONS = {
    transit:[["temps:0","Les transits"],["aspects:0","Le regard des planètes"],["aspects:1","Orbes, appliquant, séparant"]],
    lune:[["planetes:0","Les deux luminaires"],["signes:0","Les quatre éléments"],["signes:1","Cardinaux, fixes, mutables"]],
    ingres:[["bases:2","Comment bougent les astres"],["signes:3","Le tour du zodiaque"]],
    station:[["bases:2","Comment bougent les astres"]],
    eclipse:[["planetes:5","Les nœuds de la Lune"],["planetes:0","Les deux luminaires"]],
    lunaison:[["planetes:0","Les deux luminaires"],["bases:2","Comment bougent les astres"]],
    place:[["bases:0","Qu'est-ce qu'un thème astral ?"],["signes:0","Les quatre éléments"],["maisons:0","L'horizon et les quatre angles"]],
    doute:[["lire:2","Ce qu'un thème ne dit pas"]]};
  const lessonBtns = keys => `<div class="a-why-l"><p class="eyebrow">Pour comprendre</p>${keys.flatMap(k => LECONS[k] || []).map(([id, t]) => `<button type="button" class="a-why-b" data-afiche="l:${id}"><span>Leçon</span>${h(t)}</button>`).join("")}</div>`;
  const pas = (n, t, x) => `<li><b>${n}</b><div><h4>${t}</h4><p>${x}</p></div></li>`;
  const reserve = `<p class="a-why-r">C'est une règle de lecture, pas une loi de la nature : aucune étude n'a montré qu'un transit cause quoi que ce soit. Arcanes te donne la règle pour que tu puisses juger par toi-même. <button type="button" class="linkbtn" data-afiche="l:lire:2">Ce qu'un thème ne dit pas</button></p>`;
  /* le petit cercle : où est l'astre aujourd'hui, où était le point à la naissance, et l'angle entre les deux */
  function cercle(lt, ln, cls){
    const P = (lon, r) => [(r*Math.cos((180 - lon)*rad)).toFixed(1), (-r*Math.sin((180 - lon)*rad)).toFixed(1)], a = P(lt, 78), b = P(ln, 78);
    return `<svg class="a-why-c ${cls}" viewBox="-110 -110 220 220" role="img" aria-label="L'angle entre l'astre d'aujourd'hui et le point de naissance"><circle r="78" class="c"/>${Array.from({length:12}, (_, i) => { const p = P(i*30, 78), q = P(i*30, 86); return `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" class="t"/>`; }).join("")}
      <line x1="0" y1="0" x2="${a[0]}" y2="${a[1]}" class="r"/><line x1="0" y1="0" x2="${b[0]}" y2="${b[1]}" class="r"/><line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" class="l"/>
      <circle cx="${a[0]}" cy="${a[1]}" r="7" class="pt"/><circle cx="${b[0]}" cy="${b[1]}" r="7" class="pn"/>
      <text x="${P(lt, 98)[0]}" y="${P(lt, 98)[1]}" text-anchor="middle" dominant-baseline="central">ciel</text><text x="${P(ln, 98)[0]}" y="${P(ln, 98)[1]}" text-anchor="middle" dominant-baseline="central">toi</text></svg>`;
  }
  function pourquoi(kind, o){
    if(kind === "transit"){
      const x = o.x, ch = o.ch, now = o.now || new Date(), sky = C.planets(now), lt = sky[x.t].lon, np = ch.P[x.n] || {lon:x.n === "asc" ? ch.asc : ch.mc}, ln = np.lon;
      const A = ASP[x.asp], L = lire(x, !RAPIDES.includes(x.t), now), nN = PL[x.n] ? PL[x.n].nom : D.ANGLES[x.n].nom;
      let ec = Math.abs(lt - ln) % 360; if(ec > 180) ec = 360 - ec;
      sheet(`<p class="eyebrow">Pourquoi on dit ça ?</p><h2>${h(L.titre)}</h2><p class="a-why-q">« ${h(L.txt)} »</p>
        <div class="a-why-g">${cercle(lt, ln, A.cls)}
        <ol class="a-why-s">
          ${pas(1, `Où est ${h(PL[x.t].nom)} aujourd'hui`, `À ${fmtPos(lt)}. ${h(PL[x.t].cycle || "")}`)}
          ${pas(2, `Où était ${h(nN.replace(/^L[ea'] ?/, m => m.toLowerCase()))} à ta naissance`, `À ${fmtPos(ln)}. ${PL[x.n] ? `Dans un thème, ${h(PL[x.n].nom.replace(/^L/, "l"))} représente ${h(PL[x.n].fn)}.` : `C'est ${h(D.ANGLES[x.n].fs)}.`}`)}
          ${pas(3, `L'écart entre les deux`, `${Math.round(ec)}° : à ${fmtOrb(x.orb)} près, c'est un <b>${h(A.nom.toLowerCase())}</b> (${A.ang}°). On le lit comme ${h(A.sens)}. Il est ${x.app ? "en train de se former" : "en train de se défaire"}, et dure ${h(L.duree || "peu")}.`)}
          ${pas(4, `La phrase`, `L'astre qui passe apporte quelque chose, le point de naissance dit où cela tombe, l'aspect dit comment. D'où : « ${h(L.txt)} »`)}
        </ol></div>
        ${reserve}${lessonBtns(["transit"])}
        <div class="a-why-f"><button type="button" class="btn ghost small" data-afiche="p:${x.t}">La fiche de ${h(pn(x.t))}</button>${PL[x.n] ? `<button type="button" class="btn ghost small" data-afiche="p:${x.n}">La fiche de ${h(pn(x.n))}</button>` : ""}<button type="button" class="btn ghost small" data-afiche="a:${x.asp}">${h(A.nom)}</button></div>`);
    } else if(kind === "lune"){
      const ms = o.ms, S = SG[ms], ph = PHASES[o.idx];
      sheet(`<p class="eyebrow">Pourquoi on dit ça ?</p><h2>La Lune en ${h(S.nom)}</h2><p class="a-why-q">« ${h(MOON_TIP[ms])} »</p>
        <ol class="a-why-s">
          ${pas(1, "La Lune va vite", "Elle fait le tour du zodiaque en vingt-sept jours : elle change de signe tous les deux jours et demi. C'est l'astre qui donne sa couleur à une journée.")}
          ${pas(2, `Aujourd'hui, elle est en ${h(S.nom)}`, `À ${fmtPos(o.lon)}. Le ${h(S.nom)} est un signe de ${h(S.el)}, ${h(S.mode)}. On dit qu'il fait les choses ${h(S.style)}.`)}
          ${pas(3, "Elle est en " + h(ph[0].toLowerCase()), h(ph[1]) + ` Elle est éclairée à ${Math.round(o.ill*100)} %.`)}
          ${pas(4, "La phrase", "On prête à la journée la manière du signe où passe la Lune. C'est valable pour tout le monde : pour une phrase qui ne parle que de toi, il faut ton thème.")}
        </ol>${reserve}${lessonBtns(["lune"])}
        <div class="a-why-f"><button type="button" class="btn ghost small" data-afiche="s:${ms}">La fiche du signe</button><button type="button" class="btn ghost small" data-afiche="p:lune">La fiche de la Lune</button></div>`);
    } else if(kind === "ev"){
      const e = o.e, quand = fmtD(e.date, o.tz, {weekday:"long", day:"numeric", month:"long"});
      let t = "", x = "", k = "ingres";
      if(e.type === "ingres"){ t = `${PL[e.id].nom} entre en ${SG[e.sign].nom}`; x = `Vue de la Terre, chaque planète avance le long du zodiaque à sa vitesse. ${h(PL[e.id].cycle || "")} Le ${h(quand)}, ${h(pn(e.id))} passe la frontière du signe : on dit que ${h(PL[e.id].fs.replace(/^t(on|a|es) /, ""))} change de ton, et prend la manière ${h(SG[e.sign].du)}, ${h(SG[e.sign].style)}.`; }
      else if(e.type === "station"){ k = "station"; t = `${PL[e.id].nom} ${e.retro ? "devient rétrograde" : "redevient directe"}`; x = `Une planète ne recule jamais vraiment. Mais la Terre tourne aussi autour du Soleil : quand elle double une planète, ou se fait doubler, celle-ci semble s'arrêter puis reculer sur le fond des étoiles, comme une voiture qu'on dépasse. Le ${h(quand)}, ${h(pn(e.id))} ${e.retro ? "s'arrête et commence à reculer" : "s'arrête et repart vers l'avant"}. Les astrologues y lisent un temps où ${h(PL[e.id].fs.replace(/^t(on|a|es) /, "ce qui touche à "))} ${e.retro ? "se tourne vers le passé : on reprend, on corrige, on relit" : "repart de l'avant"}.`; }
      else { k = "eclipse"; t = e.type === "lune" ? "Une éclipse de Lune" : "Une éclipse de Soleil"; x = `Une éclipse arrive quand la nouvelle lune ou la pleine lune tombe près des nœuds de la Lune, les deux points où son orbite croise la route du Soleil. Les trois astres s'alignent alors exactement. Le ${h(quand)}, ${e.type === "lune" ? "la Terre passe entre le Soleil et la Lune" : "la Lune passe devant le Soleil"}. Depuis Babylone, on y lit un tournant, plus marqué qu'une lunaison ordinaire.`; }
      sheet(`<p class="eyebrow">Pourquoi on dit ça ?</p><h2>${h(t)}</h2><p>${x}</p>${reserve}${lessonBtns([k])}`);
    } else if(kind === "lunaison"){
      const l = o.l, S = SG[C.si(l.lon)], nl = l.type === "nl";
      sheet(`<p class="eyebrow">Pourquoi on dit ça ?</p><h2>${nl ? "Nouvelle lune" : "Pleine lune"} en ${h(S.nom)}</h2>
        <p>${nl ? "À la nouvelle lune, la Lune et le Soleil sont au même endroit du zodiaque : la Lune est invisible, un cycle commence." : "À la pleine lune, la Lune est exactement en face du Soleil : elle est entièrement éclairée, le cycle arrive à son sommet."} Celle du ${h(fmtD(l.date, o.tz, {day:"numeric", month:"long"}))} tombe en ${h(S.nom)}, signe de ${h(S.el)}. On lit donc ce ${nl ? "départ" : "sommet"} ${h(S.style)}.</p>
        ${reserve}${lessonBtns(["lunaison"])}<div class="a-why-f"><button type="button" class="btn ghost small" data-afiche="s:${C.si(l.lon)}">La fiche du signe</button></div>`);
    }
  }

  /* ---------- l'image à partager ---------- */
  function lune(x, cx, cy, r, f){
    /* f : 0 nouvelle lune, .5 pleine lune */
    x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 6.2832); x.fillStyle = "#1b2140"; x.fill(); x.clip();
    const k = Math.cos(f*6.2832), wax = f < .5;
    x.fillStyle = "#f4ecd2"; x.beginPath(); x.arc(cx, cy, r, -Math.PI/2, Math.PI/2, !wax);
    x.ellipse(cx, cy, Math.abs(k)*r, r, 0, Math.PI/2, -Math.PI/2, wax ? k > 0 : k < 0); x.closePath(); x.fill();
    x.globalAlpha = .07; x.fillStyle = "#5b5a70"; [[-.3,-.25,.2],[.28,.1,.26],[-.1,.42,.15],[.32,-.42,.12]].forEach(([a, b, c]) => { x.beginPath(); x.arc(cx + a*r, cy + b*r, c*r, 0, 6.2832); x.fill(); });
    x.restore(); x.strokeStyle = "rgba(233,187,79,.6)"; x.lineWidth = 2; x.beginPath(); x.arc(cx, cy, r + 10, 0, 6.2832); x.stroke();
  }
  async function toile(o){
    const W = 1080, H = 1920, cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    if(document.fonts && document.fonts.load) await Promise.all(['64px "IM Fell English SC"','italic 40px "Alegreya"','500 32px "Alegreya Sans"','600 26px "Alegreya Sans"'].map(f => document.fonts.load(f).catch(() => {})));
    const x = cv.getContext("2d"), disp = '"IM Fell English SC", Georgia, serif', txt = '"Alegreya", Georgia, serif', ui = '"Alegreya Sans", system-ui, sans-serif';
    const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#080c1e"); g.addColorStop(1, "#1d2246"); x.fillStyle = g; x.fillRect(0, 0, W, H);
    const rg = x.createRadialGradient(W/2, 520, 0, W/2, 520, 700); rg.addColorStop(0, "rgba(231,180,58,.2)"); rg.addColorStop(1, "rgba(0,0,0,0)"); x.fillStyle = rg; x.fillRect(0, 0, W, H);
    const rnd = (typeof mulberry === "function" ? mulberry : (() => Math.random))(jourN(o.now)*7 + 3); x.fillStyle = "#f3e6c4";
    for(let i = 0; i < 300; i++){ x.globalAlpha = .2 + rnd()*.6; x.beginPath(); x.arc(rnd()*W, rnd()*H, rnd()*1.8 + .4, 0, 6.2832); x.fill(); }
    x.globalAlpha = 1; x.strokeStyle = "rgba(231,180,58,.55)"; x.lineWidth = 2; x.strokeRect(44, 44, W - 88, H - 88); x.lineWidth = 1; x.strokeRect(58, 58, W - 116, H - 116);
    x.textAlign = "center"; x.fillStyle = "#e9bb4f"; x.font = `64px ${disp}`; x.fillText("Arcanes", W/2, 170);
    x.fillStyle = "#aeb2c8"; x.font = `500 30px ${ui}`; x.fillText(`MON CIEL  ·  ${o.date.toUpperCase()}`, W/2, 225);
    lune(x, W/2, 520, 190, o.f);
    x.fillStyle = "#efe8d8"; x.font = `60px ${disp}`; x.fillText(o.phase, W/2, 820);
    x.fillStyle = "#aeb2c8"; x.font = `500 32px ${ui}`; x.fillText(o.sous.toUpperCase(), W/2, 872);
    const wrap = (t, w) => typeof wrapText === "function" ? wrapText(x, t, w) : [t];
    x.font = `italic 52px ${txt}`; const L = wrap(o.phrase, W - 220).slice(0, 6);
    /* le trio : trois médaillons, et la phrase centrée dans l'espace qui reste */
    const n = o.trio.length, R = 96, gap = (W - 200)/n, y0 = 1540;
    let y = 930 + Math.max(0, (y0 - R - 70 - 930 - (L.length*70 + (o.titre ? 66 : 0)))/2) + 30;
    if(o.titre){ x.fillStyle = "#ee6a4c"; x.font = `600 28px ${ui}`; x.fillText(o.titre.toUpperCase(), W/2, y); y += 70; }
    x.fillStyle = "#efe8d8"; x.font = `italic 52px ${txt}`; L.forEach(l => { x.fillText(l, W/2, y); y += 70; });
    const ims = await Promise.all(o.trio.map(t => t.img && typeof loadImg === "function" ? loadImg(t.img).catch(() => null) : null));
    o.trio.forEach((t, i) => { const cx = 100 + gap*(i + .5);
      x.save(); x.beginPath(); x.arc(cx, y0, R, 0, 6.2832); x.fillStyle = "#f1e7cf"; x.fill(); x.clip();
      const im = ims[i]; if(im){ const s = Math.max(2*R/im.width, 2*R/im.height)*1.02; x.drawImage(im, cx - im.width*s/2, y0 - im.height*s/2, im.width*s, im.height*s); }
      x.restore(); x.strokeStyle = "#e9bb4f"; x.lineWidth = 3; x.beginPath(); x.arc(cx, y0, R + 6, 0, 6.2832); x.stroke();
      x.fillStyle = "#e9bb4f"; x.font = `600 26px ${ui}`; x.fillText(t.k.toUpperCase(), cx, y0 + R + 52);
      x.fillStyle = "#efe8d8"; x.font = `44px ${disp}`; x.fillText(t.v, cx, y0 + R + 104); });
    x.fillStyle = "#7f84a0"; x.font = `500 24px ${ui}`; x.fillText(o.pied, W/2, H - 110);
    return cv;
  }
  let blob = null;
  async function partager(o){
    const sh = document.getElementById("share"); if(!sh) return; const body = sh.querySelector(".share-body");
    body.innerHTML = `<h2 class="share-h">Ton ciel en image</h2><p class="help">Prêt pour une story ou un message.</p><div class="share-prev"><p class="help">Préparation de l'image…</p></div>`;
    sh.hidden = false; document.body.classList.add("locked"); sh.querySelector(".sheet-close").focus();
    try{
      const cv = await toile(o); blob = await new Promise(r => cv.toBlob(r, "image/png"));
      const url = URL.createObjectURL(blob), file = () => new File([blob], "arcanes-mon-ciel.png", {type:"image/png"});
      const dl = window.claude && window.claude.use ? await window.claude.use("downloads").catch(() => null) : null;
      const can = (() => { try{ return !!(navigator.canShare && navigator.canShare({files:[file()]})); }catch(e){ return false; } })();
      body.innerHTML = `<h2 class="share-h">Ton ciel en image</h2><div class="share-prev"><img src="${url}" alt="Image de ton ciel du jour : ${h(o.phase)}, ${h(o.sous)}"></div>
        <div class="actions">${dl ? `<button type="button" class="btn" id="shc-save">Enregistrer l'image</button>` : ""}${can ? `<button type="button" class="btn ${dl ? "ghost" : ""}" id="shc-share">Partager</button>` : `<a class="btn ${dl ? "ghost" : ""}" href="${url}" download="arcanes-mon-ciel.png">Télécharger</a>`}</div>
        <p class="help share-hint" id="shc-st">${dl || can ? "" : "Sur téléphone, un appui long sur l'image permet aussi de l'enregistrer."}</p>`;
      const sv = body.querySelector("#shc-save"); if(sv) sv.onclick = async () => { const s = body.querySelector("#shc-st"); try{ const r = await dl.save({filename:"arcanes-mon-ciel.png", data:blob}); s.textContent = r && r.status === "saved" ? "Image enregistrée." : ""; }catch(e){ s.textContent = "Fais un appui long sur l'image, ou un clic droit, pour l'enregistrer."; } };
      const sr = body.querySelector("#shc-share"); if(sr) sr.onclick = async () => { try{ await navigator.share({files:[file()], title:"Mon ciel du jour · Arcanes"}); }catch(e){} };
    }catch(e){ body.querySelector(".share-prev").innerHTML = `<p class="help">L'image n'a pas pu être préparée ici.</p>`; }
  }
  return {duJour, lire, titre, pourquoi, partager, lessonBtns, toile};
};
