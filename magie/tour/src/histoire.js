/* ===== Arcanes · Magie : La Tour, l'histoire =====
   Ce que le monde contient et ce qu'on y fait : le château autour de la tour, huit lieux, huit énigmes, huit visions.
   Chaque énigme résolue fait basculer l'image dans une seule teinte, le temps d'une vision, puis écrit une page du grimoire.
   L'image change aussi le long du chemin : braise du soir, nuit du village, brume verte du cimetière, lune sur le château, aube au sommet.
   Les textes des pages sont dans magie/magie-tour.js (window.TOUR_DATA), pour être relus sans lancer le jeu. */
import * as THREE from "three";
const TAU = Math.PI*2;

export function installer(G){
  const {scene, cam, J, M, T, halo, uvs, pose, sol, chemin, smooth, lerp, clamp, rng, TX, TZ, CZ, MUR, Son, cap, root, maisons, lampes, obstacles, tourMats, post, ciel, hemi, lune, tour, phare, phare2} = G;
  const D = window.TOUR_DATA || {PAGES:[]}, CLE = "arcanes.tour.v1", S = {faits:{}, pages:[], z:null, x:null};
  try{ const s = JSON.parse(localStorage.getItem(CLE) || "{}"); S.faits = s.faits || {}; S.pages = s.pages || []; S.z = s.z == null ? null : s.z; S.x = s.x; }catch(e){}
  const garde = () => { if(!etat.haut){ S.z = J.z; S.x = J.x; } try{ localStorage.setItem(CLE, JSON.stringify(S)); }catch(e){} }, fait = id => !!S.faits[id];
  const etat = {vite:false, haut:false, aube:fait("fin") ? 1 : 0, occupe:false}, V = (x, y, z) => new THREE.Vector3(x, y, z), PLAT = sol(TX, CZ);

  /* ---------------------------------------------------------------- le temps : des animations qu'on peut attendre */
  const anims = [], doux = t => t*t*(3 - 2*t), tw = (ms, fn, e = doux) => new Promise(res => anims.push({t:0, ms:etat.vite ? Math.min(ms, 40) : ms, fn, e, res})), attends = ms => tw(ms, () => {});
  G.maj.push(dt => { for(let i = anims.length - 1; i >= 0; i--){ const a = anims[i]; a.t += dt*1000; const k = clamp(a.t/a.ms, 0, 1); a.fn(a.e(k), k); if(k >= 1){ anims.splice(i, 1); a.res(); } } });

  /* ---------------------------------------------------------------- l'image : une teinte par vision, une couleur par lieu */
  const style = {mono:0, t:new THREE.Color(1, 1, 1), niv:8}, U = post.uniforms, cT = new THREE.Color(), cZ = new THREE.Color(), CU = ciel.material.uniforms;
  const teinte = (mono, hex, niv = 8, ms = 1500) => { const m0 = style.mono, c0 = style.t.clone(), c1 = new THREE.Color(hex), n0 = style.niv; return tw(ms, k => { style.mono = lerp(m0, mono, k); style.t.lerpColors(c0, c1, k); style.niv = lerp(n0, niv, k); }); };
  G.maj.push(() => { const z = J.z, tombes = smooth(-180, -196, z)*smooth(-236, -218, z), cour = smooth(MUR + 6, MUR - 6, z), a = etat.aube;
    /* le cimetière : une brume verte, qui mange tout */
    if(tombes > 0){ scene.fog.color.lerp(cT.setHex(0x1d2b28), tombes*.9); scene.fog.near = lerp(scene.fog.near, 4, tombes); scene.fog.far = lerp(scene.fog.far, 78, tombes); }
    /* la cour : la lune, presque sans couleur */
    if(cour > 0){ lune.intensity += cour*.9; scene.fog.far = lerp(scene.fog.far, 120, cour); }
    /* l'aube : l'image se lave */
    if(a > 0){ CU.uZen.value.lerp(cT.setHex(0x5f8fd0), a); CU.uHor.value.lerp(cT.setHex(0xffc79a), a); CU.uNuit.value *= 1 - a; CU.uTour.value.set(0, 0, 1); CU.uEmb.value.setHex(0xff8a3a);
      scene.fog.color.lerp(cT.setHex(0xc9a9a8), a); scene.fog.near = lerp(scene.fog.near, 40, a); scene.fog.far = lerp(scene.fog.far, 420, a); hemi.intensity = lerp(hemi.intensity, 2.1, a); hemi.color.lerp(cT.setHex(0xffd9c0), a); lune.intensity *= 1 - a*.8; G.lanterne.intensity *= 1 - a; }
    const zm = Math.max(tombes*.38, cour*.34)*(1 - a); cZ.setHex(tombes > cour ? 0x9fd8b8 : 0xb4c2ff);
    if(style.mono > .02) hemi.intensity *= 1 + style.mono*1.5; if(etat.haut){ scene.fog.near = Math.max(scene.fog.near, 80); scene.fog.far = Math.max(scene.fog.far, 620); }
    U.uMono.value = Math.max(style.mono, zm*(1 - style.mono)); U.uTeinte.value.copy(style.mono > .02 ? style.t : cZ); U.uNiv.value = lerp(style.niv, 16, a*(1 - style.mono)); });

  /* ---------------------------------------------------------------- la caméra de cinéma */
  const up = V(0, 1, 0), mL = new THREE.Matrix4(), vise = (pos, cible) => new THREE.Quaternion().setFromRotationMatrix(mL.lookAt(pos, cible, up));
  async function plan(ms, pos, cible, e){ const p0 = cam.position.clone(), q0 = cam.quaternion.clone(), q1 = vise(pos, cible); G.cine = () => {}; await tw(ms, k => { cam.position.lerpVectors(p0, pos, k); cam.quaternion.slerpQuaternions(q0, q1, k); }, e); }
  const ici = (h = 1.72) => V(J.x, sol(J.x, J.z) + h, J.z);
  async function rends(ms = 1300){ const p = ici(), c = V(J.x - Math.sin(J.yaw)*10, p.y + Math.tan(J.pitch)*10, J.z - Math.cos(J.yaw)*10); await plan(ms, p, c); G.cine = null; }
  const tourneVers = (x, z) => { J.yaw = Math.atan2(-(x - J.x), -(z - J.z)); J.pitch = 0; };

  /* ---------------------------------------------------------------- les panneaux : parole, question, ordre, page */
  const ui = document.createElement("div"); ui.className = "tq-ui"; root.appendChild(ui);
  const agir = document.createElement("button"); agir.type = "button"; agir.className = "tq-agir"; agir.hidden = true; root.appendChild(agir);
  const pts = document.createElement("div"); pts.className = "tq-pts"; root.appendChild(pts);
  const points = () => { pts.innerHTML = D.PAGES.map(p => `<i class="${S.pages.includes(p.id) ? "on" : ""}"></i>`).join(""); }; points();
  { const b = document.createElement("button"); b.type = "button"; b.className = "tq-b tq-grim"; b.setAttribute("aria-label", "Le grimoire"); b.textContent = "❖"; b.onclick = e => { e.stopPropagation(); window.ArcanesTourJeu && window.ArcanesTourJeu.grimoire(); }; root.querySelector(".tq-haut").appendChild(b); }
  const montre = html => { ui.innerHTML = html; ui.onclick = null; requestAnimationFrame(() => ui.classList.add("on")); }, fermeUI = async () => { ui.classList.remove("on"); await attends(330); ui.innerHTML = ""; ui.onclick = null; };
  const dit = (qui, txt) => new Promise(res => { montre(`<div class="tq-dit">${qui ? `<i>${qui}</i>` : ""}<p>${txt}</p><small>toucher pour continuer</small></div>`); if(etat.vite) return fermeUI().then(res); const t0 = Date.now(); ui.onclick = () => { if(Date.now() - t0 < 380) return; fermeUI().then(res); }; });
  const faux = (b, txt) => { b.classList.add("faux"); Son.note(147, .05); const p = ui.querySelector(".tq-non"); p.hidden = false; p.textContent = txt; setTimeout(() => b.classList.remove("faux"), 500); };
  const question = o => new Promise(res => { const bons = Array.isArray(o.ok) ? o.ok : [o.ok];
    montre(`<div class="tq-q"><p class="tq-eye">${o.eye}</p>${o.dessin ? `<div class="tq-dessin">${o.dessin}</div>` : ""}<h2>${o.q}</h2><div class="tq-opts">${o.opts.map((t, i) => `<button type="button" data-o="${i}">${t}</button>`).join("")}</div><p class="tq-non" hidden></p></div>`);
    if(etat.vite) return fermeUI().then(() => res(o.libre ? 0 : bons[0]));
    ui.querySelectorAll("[data-o]").forEach(b => b.onclick = e => { e.stopPropagation(); const i = +b.dataset.o; if(o.libre || bons.includes(i)){ b.classList.add("bon"); Son.note(440, .05); setTimeout(() => fermeUI().then(() => res(i)), 520); } else faux(b, o.non); }); });
  const ordre = o => new Promise(res => { const n = o.items.length, mel = o.items.map((t, i) => [t, i]).sort((a, b) => ((a[1]*5 + 2) % n) - ((b[1]*5 + 2) % n)); let k = 0;
    montre(`<div class="tq-q"><p class="tq-eye">${o.eye}</p><h2>${o.q}</h2><div class="tq-opts ord">${mel.map(([t, i]) => `<button type="button" data-o="${i}"><b></b><span>${t}</span></button>`).join("")}</div><p class="tq-non" hidden></p></div>`);
    if(etat.vite) return fermeUI().then(res);
    ui.querySelectorAll("[data-o]").forEach(b => b.onclick = e => { e.stopPropagation(); if(b.classList.contains("bon")) return; if(+b.dataset.o === k){ k++; b.classList.add("bon"); b.querySelector("b").textContent = k; Son.note(196*Math.pow(1.122, k), .05); if(k === n) setTimeout(() => fermeUI().then(res), 750); } else faux(b, o.non); }); });
  const ouvrePage = id => new Promise(res => { const p = D.PAGES.find(x => x.id === id), neuf = !S.pages.includes(id); if(neuf) S.pages.push(id); S.faits[id] = true; garde(); points(); if(!p || etat.vite) return res();
    montre(`<div class="tq-page"><p class="tq-eye">Une page s'écrit dans le grimoire · ${p.n} sur ${D.PAGES.length}</p><h2>${p.t}</h2>${p.txt.map(t => `<p>${t}</p>`).join("")}<dl>${p.mots.map(([m, d]) => `<dt>${m}</dt><dd>${d}</dd>`).join("")}</dl><button type="button" class="tq-go" data-ok>Refermer le grimoire</button></div>`);
    Son.note(330, .06); Son.note(495, .04); ui.querySelector("[data-ok]").onclick = e => { e.stopPropagation(); fermeUI().then(res); }; });

  /* ---------------------------------------------------------------- les images peintes : habitants, marques, chiffres */
  const peint = (w, h, fn, em) => { const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d"); fn(x, w, h); const t = new THREE.CanvasTexture(c); t.magFilter = t.minFilter = THREE.NearestFilter; t.colorSpace = THREE.SRGBColorSpace; return t; };
  const plaque = (tex, w, h, o = {}) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({map:tex, transparent:true, depthWrite:false, fog:o.fog !== false, opacity:o.op == null ? 1 : o.op, blending:o.add ? THREE.AdditiveBlending : THREE.NormalBlending})); s.scale.set(w, h, 1); return s; };
  const tPerso = peint(24, 48, x => { x.fillStyle = "#0b0910"; x.fillRect(7, 8, 10, 10); x.fillRect(5, 16, 14, 30); x.fillRect(3, 22, 18, 24); x.fillRect(8, 5, 8, 4); x.fillStyle = "#1c1626"; x.fillRect(9, 10, 6, 6); x.fillStyle = "#ffb656"; x.fillRect(10, 12, 1, 1); x.fillRect(13, 12, 1, 1); });
  const tSpectre = peint(24, 48, x => { x.fillStyle = "#eef1ff"; x.fillRect(7, 8, 10, 10); x.fillRect(5, 16, 14, 24); x.fillRect(3, 22, 18, 18); for(let i = 3; i < 21; i += 4) x.fillRect(i, 40, 2, i % 8 ? 6 : 3); x.fillRect(8, 5, 8, 4); x.fillStyle = "#1c1626"; x.fillRect(10, 12, 1, 2); x.fillRect(13, 12, 1, 2); });
  const tChiffre = n => peint(16, 16, x => { x.font = "bold 14px Georgia, serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillStyle = "#ffd27a"; x.fillText(n, 8, 9); });
  const MARQUES = [x => { x.strokeStyle = "#dfe6ff"; x.lineWidth = 3; x.beginPath(); x.arc(16, 14, 9, Math.PI*.15, Math.PI*.85, true); x.stroke(); x.fillStyle = "#dfe6ff"; x.fillRect(5, 17, 4, 4); x.fillRect(23, 17, 4, 4); },
    x => { x.strokeStyle = "#dfe6ff"; x.lineWidth = 1.5; x.beginPath(); x.arc(16, 16, 11, 0, TAU); x.stroke(); for(let i = 0; i < 6; i++){ const a = i/6*TAU; x.beginPath(); x.arc(16 + Math.cos(a)*11, 16 + Math.sin(a)*11, 11, a + Math.PI*2/3, a + Math.PI*4/3); x.stroke(); } },
    x => { x.fillStyle = "#dfe6ff"; for(let i = 0; i < 30; i += 3) x.fillRect(1 + i, 24 + (i % 2), 2, 2); x.fillRect(13, 8, 6, 12); x.fillRect(14, 4, 4, 5); x.fillStyle = "#0b0910"; x.fillRect(15, 10, 1, 8); x.fillRect(17, 11, 1, 6); }].map(f => peint(32, 32, f));
  const perso = (pos, h = 1.9) => { const s = plaque(tPerso, h/2, h); s.position.copy(pos); s.position.y += h/2 - 1.2; s.material.opacity = 0; scene.add(s); return s; };

  /* ---------------------------------------------------------------- le château : une enceinte, une porte à herse, une cour, un établi */
  const tm = (k, hex = 0xffffff) => { const m = new THREE.MeshLambertMaterial({map:M[k].map, fog:false}); m.userData.c = new THREE.Color(hex); tourMats.push(m); return m; }, P = tm("pierre"), A = tm("ardoise", 0x8a88a0), NOIR = new THREE.MeshBasicMaterial({color:0x050408, fog:false});
  const bloc = (w, h, d, x, y, z, m = P) => { const o = new THREE.Mesh(uvs(new THREE.BoxGeometry(w, h, d), Math.max(1, Math.round(Math.max(w, d)/3)), Math.max(1, Math.round(h/3))), m); o.position.set(x, y, z); scene.add(o); return o; };
  const rond = (r, h, x, y, z, toitH) => { const o = new THREE.Mesh(uvs(new THREE.CylinderGeometry(r, r*1.08, h, 10), 5, Math.round(h/3)), P); o.position.set(x, y + h/2, z); scene.add(o); if(toitH){ const c = new THREE.Mesh(uvs(new THREE.ConeGeometry(r*1.25, toitH, 10), 4, 2), A); c.position.set(x, y + h + toitH/2, z); scene.add(c); } obstacles.push([x, z, r + .7]); };
  const HM = 9, X0 = TX - 27, X1 = TX + 27, Z1 = -313, yb = PLAT - 3;
  bloc(54, HM + 3, 1.6, TX, yb + (HM + 3)/2, Z1); bloc(1.6, HM + 3, 55, X0, yb + (HM + 3)/2, (MUR + Z1)/2); bloc(1.6, HM + 3, 55, X1, yb + (HM + 3)/2, (MUR + Z1)/2);
  bloc(23.6, HM + 3, 1.6, TX - 15.2, yb + (HM + 3)/2, MUR); bloc(23.6, HM + 3, 1.6, TX + 15.2, yb + (HM + 3)/2, MUR); bloc(7, 3.4, 1.6, TX, PLAT + HM - 1.7, MUR);
  for(const [x, z] of [[X0, MUR], [X1, MUR], [X0, Z1], [X1, Z1]]) rond(4.2, HM + 9, x, yb, z, 8);
  for(const s of [-1, 1]) rond(3, HM + 6, TX + s*5.6, yb, MUR + .4, 6);
  { const L = []; for(let x = X0 + 2; x < X1; x += 2.4){ if(Math.abs(x - TX) > 8.5) L.push([x, PLAT + HM + .5, MUR]); L.push([x, PLAT + HM + .5, Z1]); } for(let z = MUR - 2; z > Z1; z -= 2.4){ L.push([X0, PLAT + HM + .5, z]); L.push([X1, PLAT + HM + .5, z]); } pose(new THREE.BoxGeometry(1.2, 1.2, 1.9), P, L); }
  /* la herse */
  const herse = new THREE.Group(); { for(let i = -3; i <= 3; i++){ const b = new THREE.Mesh(new THREE.BoxGeometry(.16, 6.2, .16), NOIR); b.position.set(i*.95, 3.1, 0); herse.add(b); } for(let j = 1; j < 6; j++){ const b = new THREE.Mesh(new THREE.BoxGeometry(6.6, .14, .14), NOIR); b.position.set(0, j*1.02, 0); herse.add(b); } herse.position.set(TX, PLAT, MUR); scene.add(herse); if(fait("carre")) herse.position.y = PLAT + 6.4; }
  /* la cour : une salle en ruine à gauche, un brasier, l'établi */
  for(const z of [-266, -273, -280]) for(const x of [TX - 17, TX - 9]){ bloc(.9, 6.2, .9, x, PLAT + 3.1, z); obstacles.push([x, z, .8]); }
  for(const x of [TX - 17, TX - 9]) bloc(.9, .9, 15, x, PLAT + 6.6, -273); bloc(9, .9, .9, TX - 13, PLAT + 6.6, -280);
  const ETABLI = V(TX - 13, PLAT, -273); bloc(2.6, 1, 1.4, ETABLI.x, PLAT + .5, ETABLI.z); obstacles.push([ETABLI.x, ETABLI.z, 1.5]);
  const brasier = V(TX + 10, PLAT + 1.5, -271); { const b = new THREE.Mesh(new THREE.CylinderGeometry(.8, .5, .7, 8), NOIR); b.position.set(brasier.x, PLAT + .9, brasier.z); scene.add(b); const p = new THREE.Mesh(new THREE.CylinderGeometry(.12, .2, .9, 5), NOIR); p.position.set(brasier.x, PLAT + .3, brasier.z); scene.add(p); const f = halo(2.6, .8); f.position.copy(brasier); scene.add(f); G.brasiers.push(brasier); obstacles.push([brasier.x, brasier.z, 1.1]); G.maj.push((dt, t) => { f.scale.setScalar(2.3 + Math.sin(t*9)*.25 + Math.sin(t*14.3)*.15); }); }
  /* la roue des sept astres, gravée au milieu de la cour : on y marche la semaine, de la Lune au Soleil (une découverte, sans page) */
  const SIGNES = [["Lundi", "la Lune", 0xdfe6ff, "de la Lune"], ["Mardi", "Mars", 0xff5a4a, "de Mars"], ["Mercredi", "Mercure", 0xffa24a, "de Mercure"], ["Jeudi", "Jupiter", 0x6a9cff, "de Jupiter"], ["Vendredi", "Vénus", 0x6adf8a, "de Vénus"], ["Samedi", "Saturne", 0xb0a8c8, "de Saturne"], ["Dimanche", "le Soleil", 0xffd24a, "du Soleil"]];
  const tSigne = i => peint(64, 64, x => { x.lineWidth = 4; x.strokeStyle = x.fillStyle = "#fff"; x.lineCap = x.lineJoin = "round"; const L = (...q) => { x.beginPath(); x.moveTo(q[0], q[1]); for(let k = 2; k < q.length; k += 2) x.lineTo(q[k], q[k + 1]); x.stroke(); }, C = (cx, cy, r, a0 = 0, a1 = TAU) => { x.beginPath(); x.arc(cx, cy, r, a0, a1); x.stroke(); }, PI = Math.PI;
    [() => { C(30, 32, 18, PI/3, 5*PI/3); C(48, 32, 18, 2*PI/3, 4*PI/3); }, () => { C(26, 38, 13); L(35, 29, 50, 14); L(38, 14, 50, 14, 50, 26); }, () => { C(32, 32, 10); L(32, 42, 32, 58); L(24, 51, 40, 51); C(32, 13, 9, .1, PI - .1); },
      () => { C(22, 22, 10, -2.6, 1); L(27, 30, 14, 44, 52, 44); L(42, 14, 42, 58); }, () => { C(32, 24, 13); L(32, 37, 32, 58); L(22, 48, 42, 48); }, () => { L(24, 8, 24, 44); L(15, 17, 33, 17); C(34, 36, 10, PI, TAU); L(44, 36, 44, 48, 50, 54); }, () => { C(32, 32, 18); x.beginPath(); x.arc(32, 32, 3.5, 0, TAU); x.fill(); }][i](); });
  const ROUE = V(TX, PLAT + .05, -270.5), signes = SIGNES.map((sg, i) => { const a = -Math.PI/2 + i/7*TAU, m = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.7), new THREE.MeshBasicMaterial({map:tSigne(i), transparent:true, depthWrite:false, fog:false, color:0x54546e})); m.rotation.x = -Math.PI/2; m.position.set(ROUE.x + Math.cos(a)*5.2, ROUE.y + .02, ROUE.z + Math.sin(a)*5.2); scene.add(m); return m; });
  const cercles = [[6.5, 6.66], [3.7, 3.82]].map(([r0, r1]) => { const m = new THREE.Mesh(new THREE.RingGeometry(r0, r1, 56), new THREE.MeshBasicMaterial({color:0x3e3e56, fog:false})); m.rotation.x = -Math.PI/2; m.position.copy(ROUE); scene.add(m); return m; });
  let jour = fait("roue") ? 7 : 0, surSigne = -1, ditRoue = 0; const allume = i => signes[i].material.color.setHex(SIGNES[i][2]); for(let i = 0; i < jour; i++) allume(i); if(jour === 7) cercles.forEach(c => c.material.color.setHex(0xe0a55a));
  G.maj.push((dt, t) => { if(etat.occupe || etat.haut || J.z > MUR - 2 || Math.hypot(J.x - ROUE.x, J.z - ROUE.z) > 6.4) return; if(jour < 7 && (!ditRoue || t - ditRoue > 45)){ ditRoue = t; cap("Sept signes gravés dans un cercle. La semaine commence par la Lune.", 6500); }
    let n = -1; signes.forEach((m, i) => { if(Math.hypot(J.x - m.position.x, J.z - m.position.z) < 1.15) n = i; }); if(n === surSigne) return; surSigne = n; if(n < 0 || jour === 7) return;
    if(n === jour){ allume(n); jour++; Son.note([220, 247.5, 277.2, 293.7, 329.6, 370, 415.3][n], .08); cap(`${SIGNES[n][0]} : ${SIGNES[n][1]}.`, 3500);
      if(jour === 7){ S.faits.roue = true; garde(); const h = halo(.1, 0, 0xffd27a); h.position.set(ROUE.x, ROUE.y + .6, ROUE.z); scene.add(h); [0, 1, 2, 3, 4, 5, 6].forEach(i => setTimeout(() => Son.note([220, 247.5, 277.2, 293.7, 329.6, 370, 440][i], .06), 900 + i*170));
        tw(2600, k => { h.scale.setScalar(.1 + k*16); h.material.opacity = Math.sin(k*Math.PI)*.6; cercles.forEach(c => c.material.color.lerpColors(cT.setHex(0x3e3e56), cZ.setHex(0xe0a55a), k)); }).then(() => scene.remove(h)); setTimeout(() => cap("La semaine est un cercle. Tu viens de la marcher.", 6500), 2600); } }
    else if(n > jour){ Son.note(123, .06); cap(`Ce signe est celui ${SIGNES[n][3]}. Pas encore : après ${jour ? SIGNES[jour - 1][0].toLowerCase() : "dimanche"} vient ${SIGNES[jour][0].toLowerCase()}.`, 6000); } });
  const PORTE = V(TX, PLAT, TZ + 13.2);

  /* ---------------------------------------------------------------- se déplacer : le chemin dehors, l'enceinte dedans, la porte entre les deux */
  G.regle = (nx, nz) => { nz = clamp(nz, Z1 + 2.2, 9); const ouvert = fait("carre"), couloir = ouvert && Math.abs(nx - TX) < 2.5 && Math.abs(J.x - TX) < 2.9;
    if(!couloir){ if(J.z >= MUR) nz = Math.max(nz, MUR + 1.4); else nz = Math.min(nz, MUR - 1.4); }
    if(nz < MUR - 1.4) nx = clamp(nx, X0 + 2, X1 - 2);
    else if(nz < MUR + 1.4) nx = clamp(nx, TX - 2.4, TX + 2.4);
    else { const c = chemin(nz), large = 13 + 9*smooth(-84, -100, nz)*smooth(-190, -174, nz); if(Math.abs(nx - c) > large) nx = c + Math.sign(nx - c)*large; }
    return [nx, nz]; };

  /* ---------------------------------------------------------------- les lieux où l'on peut agir */
  const lieux = [], lieu = (id, pos, r, label, run, avant) => lieux.push({id, x:pos.x, z:pos.z, r, label, run, avant});
  async function lance(l){ if(etat.occupe) return; etat.occupe = true; G.fige = true; agir.hidden = true; agir._l = null; root.classList.add("scene"); try{ await l.run(); }catch(e){ console.error(e); }
    if(!etat.haut){ G.cine = null; G.fige = false; } etat.occupe = false; root.classList.remove("scene"); garde(); }
  agir.onclick = e => { e.stopPropagation(); if(agir._l) lance(agir._l); };
  const touche = e => { if((e.code === "Enter" || e.code === "KeyE") && agir._l && !etat.occupe){ e.preventDefault(); lance(agir._l); } }; document.addEventListener("keydown", touche);
  G.maj.push(() => { if(etat.occupe || etat.haut) return; let best = null, bd = 1e9; for(const l of lieux){ if(fait(l.id) || (l.avant && !l.avant())) continue; const d = Math.hypot(l.x - J.x, l.z - J.z); if(d < l.r && d < bd){ bd = d; best = l; } }
    if(best !== agir._l){ agir._l = best; agir.hidden = !best; if(best) agir.textContent = best.label; } });
  /* un habitant ouvre : la caméra se pose devant lui */
  async function rencontre(pos, face){ const p = perso(pos), devant = pos.clone().add(face.clone().multiplyScalar(3.4)); devant.y = sol(devant.x, devant.z) + 1.6; await Promise.all([plan(1500, devant, V(pos.x, devant.y - .1, pos.z)), tw(900, k => p.material.opacity = k)]); return p; }
  const sort = p => tw(700, k => p.material.opacity = 1 - k).then(() => scene.remove(p));
  const faceDe = m => V(Math.sin(m.rot), 0, Math.cos(m.rot));

  /* ================================================================ 1. LA CROISÉE : qu'est-ce que la magie ? */
  const PIERRES = [[-4.5, -9], [4.8, -11], [5.6, -7]].map(([dx, dz]) => V(chemin(dz) + dx, sol(chemin(dz) + dx, dz) + 2.6, dz)), VIEILLE = V(chemin(-8) + 2.2, sol(chemin(-8) + 2.2, -8) + 1.2, -8);
  const vieille = perso(VIEILLE); vieille.material.opacity = fait("croisee") ? 0 : 1;
  lieu("croisee", VIEILLE, 6.5, "Parler à la vieille femme", async () => {
    const d = V(VIEILLE.x - 2.4, VIEILLE.y + .45, VIEILLE.z + 2.6); await plan(1500, d, V(VIEILLE.x, VIEILLE.y + .4, VIEILLE.z));
    await dit("La vieille femme", "Tu montes au château ? Alors dis-moi d'abord ce que tu vas y chercher.");
    const c = await question({eye:"La croisée des chemins", q:"Qu'est-ce que la magie, pour toi ?", opts:["Demander aux dieux", "Mesurer le monde", "Agir par les liens cachés entre les choses"], libre:true});
    await dit("La vieille femme", ["Demander, c'est prier : c'est la religion. Le mage, lui, ne demande pas. Il opère.", "Mesurer, ce sera la science. Elle naît dans les mêmes ateliers, puis elle cesse de croire aux signes.", "Oui. Le mage pense que tout se tient, et qu'en touchant une chose on en remue une autre."][c]);
    await dit("La vieille femme", "Descends. Frappe chez l'herboriste et chez le forgeron. Regarde ce qui garde les portes. Le château ne s'ouvre qu'à ceux qui savent lire.");
    /* la vision : les trois pierres s'allument, la femme n'est plus là */
    const hs = PIERRES.map(p => { const h = halo(.1, 0, 0xbfd0ff); h.position.copy(p); scene.add(h); return h; }); teinte(1, 0xb9c8ff, 6, 1200);
    await plan(2600, V(chemin(2), sol(chemin(2), 2) + 2.4, 2), V(chemin(-9), sol(chemin(-9), -9) + 2.4, -9));
    for(let i = 0; i < 3; i++){ Son.note([220, 277.2, 329.6][i], .07); tw(1400, k => { hs[i].scale.setScalar(.1 + k*7); hs[i].material.opacity = k*.8; }); await attends(650); }
    tw(1200, k => vieille.material.opacity = 1 - k); cap("Trois pierres, trois chemins. Elle n'est plus là.", 5000); await attends(3200);
    await teinte(0, 0xffffff, 8, 1400); tw(2500, k => hs.forEach(h => h.material.opacity = .8 - k*.55));
    await ouvrePage("croisee"); await rends(); });

  /* ================================================================ 2. L'HERBORISTE : la sympathie, les signatures */
  const HERBO = maisons[0], FORGE = maisons[5];
  const fanal = (m, hex) => { const h = halo(1.8, .8, hex); h.position.copy(m.porte).add(V(0, 1.1, 0)).add(faceDe(m).multiplyScalar(.5)); scene.add(h); return h; };
  const fanalH = fanal(HERBO, 0x7dffa0), fanalF = fanal(FORGE, 0xff5a2a);
  const DESSINS = {
    noix:`<svg viewBox="0 0 48 48" shape-rendering="crispEdges"><rect x="12" y="10" width="24" height="28" fill="#8a5a2c"/><rect x="8" y="14" width="32" height="20" fill="#8a5a2c"/><rect x="23" y="10" width="2" height="28" fill="#4a2e14"/><path d="M12 16h8v2h-8zM14 22h7v2h-7zM11 28h9v2h-9zM28 16h8v2h-8zM27 22h8v2h-8zM28 28h9v2h-9z" fill="#c08a4c"/></svg>`,
    pulmonaire:`<svg viewBox="0 0 48 48" shape-rendering="crispEdges"><path d="M22 4h4v8h-4z" fill="#3c5a2e"/><path d="M14 12h20v6h4v14h-4v8h-6v4h-8v-4h-6v-8h-4V18h4z" fill="#4f7a3a"/><rect x="23" y="12" width="2" height="30" fill="#2e4a22"/><path d="M15 18h4v3h-4zM29 20h4v3h-4zM17 28h3v3h-3zM28 30h4v3h-4zM20 36h3v2h-3zM30 15h2v2h-2z" fill="#d8e8c0"/></svg>`,
    euphraise:`<svg viewBox="0 0 48 48" shape-rendering="crispEdges"><rect x="23" y="30" width="2" height="16" fill="#3c5a2e"/><path d="M10 14h10v-6h8v6h10v10h-6v8H16v-8h-6z" fill="#efe9f4"/><path d="M13 16h2v6h-2zM33 16h2v6h-2zM19 26h2v4h-2zM27 26h2v4h-2z" fill="#8a5ab0"/><rect x="20" y="14" width="8" height="8" fill="#f2c94c"/><rect x="22" y="16" width="4" height="4" fill="#20141c"/></svg>`};
  lieu("herbe", HERBO.porte, 5, "Frapper chez l'herboriste", async () => {
    const p = await rencontre(HERBO.porte, faceDe(HERBO));
    await dit("L'herboriste", "Tu veux apprendre ? Regarde mes simples. Chaque plante porte sa signature : sa forme te dit ce qu'elle soigne.");
    const O = ["La tête", "Les poumons", "Les yeux", "Le cœur"];
    await question({eye:"Les signatures · 1 sur 3", dessin:DESSINS.noix, q:"Une noix, ouverte en deux. Que soigne-t-elle ?", opts:O, ok:0, non:"Regarde sa forme : une coque dure, et dedans deux moitiés toutes plissées."});
    await question({eye:"Les signatures · 2 sur 3", dessin:DESSINS.pulmonaire, q:"Une feuille large, semée de taches pâles. Que soigne-t-elle ?", opts:O, ok:1, non:"On l'appelle pulmonaire. Ses taches rappellent un organe qui respire."});
    await question({eye:"Les signatures · 3 sur 3", dessin:DESSINS.euphraise, q:"Une petite fleur blanche, un point sombre au centre. Que soigne-t-elle ?", opts:O, ok:2, non:"Elle te regarde. On l'appelle aussi casse-lunettes."});
    await dit("L'herboriste", "Le semblable agit sur le semblable. Voilà ce qu'on a cru pendant des siècles. Sors, maintenant. Regarde mon jardin comme je le vois.");
    sort(p);
    /* la vision : devant la maison, le jardin pousse d'un coup ; chaque tige se penche vers son astre et s'y relie */
    const f = faceDe(HERBO), lat = V(f.z, 0, -f.x), c = HERBO.porte.clone().add(f.clone().multiplyScalar(6.5)); c.y = sol(c.x, c.z);
    const N = 96, r = rng(4), g = new THREE.CylinderGeometry(.035, .075, 1, 4); g.translate(0, .5, 0); const im = new THREE.InstancedMesh(g, new THREE.MeshBasicMaterial({color:0xe6ffec, fog:false}), N), o = new THREE.Object3D(), tiges = [], fl = new Float32Array(N*3), ry = new Float32Array(N*6);
    for(let i = 0; i < N; i++){ const a = r()*TAU, d = .8 + r()*7.6, x = c.x + Math.cos(a)*d, z = c.z + Math.sin(a)*d; tiges.push([x, sol(x, z), z, 1.1 + r()*3.3, r(), i % 3]); }
    const fleurs = new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial({color:0xffffff, size:2, sizeAttenuation:false, fog:false, transparent:true, opacity:0})); fleurs.geometry.setAttribute("position", new THREE.BufferAttribute(fl, 3));
    const rayons = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({color:0xffffff, fog:false, transparent:true, opacity:0, blending:THREE.AdditiveBlending, depthWrite:false})); rayons.geometry.setAttribute("position", new THREE.BufferAttribute(ry, 3));
    fleurs.frustumCulled = rayons.frustumCulled = im.frustumCulled = false; scene.add(im, fleurs, rayons);
    const astres = [[-4.6, 8.6], [0, 10.6], [4.6, 8]].map(([dl, dy], i) => { const h = halo(3.4 + i*.5, 0, 0xffffff); h.position.copy(c).add(lat.clone().multiplyScalar(dl)).add(f.clone().multiplyScalar(-1.5)); h.position.y = c.y + dy; scene.add(h); return h; });
    let pousse = 0, penche = 0; const maj = (dt, t) => { for(let i = 0; i < N; i++){ const [x, y, z, hh, ph, a] = tiges[i], k = clamp(pousse*1.6 - ph*.6, 0, 1), A = astres[a].position, h = hh*k, rx = (A.z - z)*.035*penche + Math.sin(t*1.1 + ph*9)*.05, rz = -(A.x - x)*.035*penche + Math.cos(t*.9 + ph*7)*.04;
        o.position.set(x, y, z); o.scale.set(1, .01 + h, 1); o.rotation.set(rx, 0, rz); o.updateMatrix(); im.setMatrixAt(i, o.matrix); const tx = x - rz*h, ty = y + h, tz = z + rx*h; fl.set([tx, ty, tz], i*3); ry.set([tx, ty, tz, A.x, A.y, A.z], i*6); }
      im.instanceMatrix.needsUpdate = true; fleurs.geometry.attributes.position.needsUpdate = true; rayons.geometry.attributes.position.needsUpdate = true; }; G.maj.push(maj);
    const pA = c.clone().add(f.clone().multiplyScalar(7.5)), pB = c.clone().add(f.clone().multiplyScalar(8.4)), pC = c.clone().add(f.clone().multiplyScalar(9.4)); pA.y = c.y + 1.2; pB.y = c.y + 3; pC.y = c.y + 6.2;
    await Promise.all([teinte(1, 0x8dffb0, 6), plan(1900, pA, V(c.x, c.y + 1.6, c.z))]);
    Son.note(196, .07); tw(5200, k => { pousse = k; fleurs.material.opacity = k; }); cap("Le jardin, comme le voit l'herboriste.", 5000);
    await plan(5200, pB, V(c.x, c.y + 2.2, c.z));
    astres.forEach((h, i) => { setTimeout(() => Son.note([329.6, 392, 493.9][i], .06), i*700); tw(2200 + i*500, k => h.material.opacity = k*.9); }); tw(4200, k => { penche = k; rayons.material.opacity = k*.26; }); cap("Chaque tige se penche vers son astre. Tout se tient.", 6500);
    await plan(5600, pC, V(c.x, c.y + 4.4, c.z)); await attends(2200);
    await Promise.all([teinte(0, 0xffffff, 8, 1600), tw(1600, k => { rayons.material.opacity = .26*(1 - k); fleurs.material.opacity = 1 - k; astres.forEach(h => h.material.opacity = .9*(1 - k)); pousse = 1 - k; })]);
    G.maj.splice(G.maj.indexOf(maj), 1); scene.remove(im, fleurs, rayons); astres.forEach(h => scene.remove(h)); tw(1500, k => fanalH.material.opacity = .8*(1 - k));
    await ouvrePage("herbe"); await rends(); });

  /* ================================================================ 3. LES SEUILS : trois marques à trouver sur les portes */
  const SEUILS = [[2, "Un fer à cheval, cloué au-dessus de la porte, les pointes vers le haut. Le fer passe pour repousser ce qui rôde."], [4, "Une rosace à six pétales, tracée au compas dans la poutre. On en trouve dans toute l'Europe : elle barre l'entrée."], [7, "Une ligne de sel en travers du seuil, et le goulot d'une bouteille enterrée. Dedans, des épingles."]];
  const marques = SEUILS.map(([i, txt], k) => { const m = maisons[i], s = plaque(MARQUES[k], .9, .9, {fog:false, add:true, op:fait("m" + k) ? .95 : .4}); s.position.copy(m.porte).add(V(0, k === 2 ? -2.2 : 1.35, 0)).add(faceDe(m).multiplyScalar(.25)); scene.add(s);
    lieu("m" + k, m.porte, 4.6, "Regarder la porte de près", async () => { const f = faceDe(m), d = s.position.clone().add(f.multiplyScalar(2.2)); await plan(1400, d, s.position); tw(800, q => s.material.opacity = .4 + q*.55); Son.note(261.6 + k*40, .05); await dit("", txt); S.faits["m" + k] = true;
      if(SEUILS.every((_, j) => fait("m" + j))) await filet(); else { cap(`Une marque sur trois${SEUILS.filter((_, j) => fait("m" + j)).length === 2 ? ". Encore une" : ""}.`, 4000); await rends(); } }); return s; });
  G.maj.push((dt, t) => marques.forEach((s, k) => { if(!fait("m" + k)) s.material.opacity = .28 + .2*Math.sin(t*2.2 + k*2); }));
  async function filet(){ /* la vision : vues d'en haut, les marques se relient en un filet au-dessus du village */
    const pts = []; maisons.forEach((m, i) => { const a = m.porte.clone(); a.y += 1.6; maisons.forEach((n, j) => { if(j > i && j - i <= 2){ const b = n.porte.clone(); b.y += 1.6; pts.push(a, b); } }); });
    const g = new THREE.BufferGeometry().setFromPoints(pts), ln = new THREE.LineSegments(g, new THREE.LineBasicMaterial({color:0xe6ecff, fog:false, transparent:true})); ln.frustumCulled = false; g.setDrawRange(0, 0); scene.add(ln);
    const noeuds = maisons.map(m => { const h = halo(.1, 0, 0xcfd8ff); h.position.copy(m.porte); h.position.y += 1.6; scene.add(h); return h; }), zc = -134, cx = chemin(zc), y0 = sol(cx, zc);
    await Promise.all([teinte(1, 0x9db0ff, 5), plan(4200, V(cx, y0 + 46, zc + 26), V(cx, y0, zc - 6))]); cap("Chaque porte gardée tient les autres.", 6000);
    for(let i = 0; i < noeuds.length; i++){ Son.note(196*Math.pow(1.122, i), .05); tw(900, k => { noeuds[i].scale.setScalar(.1 + k*4.5); noeuds[i].material.opacity = k*.9; }); await attends(260); }
    await tw(4200, k => g.setDrawRange(0, Math.floor(pts.length*k/2)*2)); cap("Un filet, jeté sur le village pour la nuit.", 5000); await attends(3000);
    await teinte(0, 0xffffff, 8, 1500); scene.remove(ln); noeuds.forEach(h => scene.remove(h)); await ouvrePage("seuils"); await rends(); }

  /* ================================================================ 4. LE FORGERON : sept planètes, sept métaux, sept jours */
  const SEPT = [["Lundi", "de la Lune", "L'argent", 0xdfe6ff, "Blanc et froid, comme elle."], ["Mardi", "de Mars", "Le fer", 0xff4a3a, "Le métal des armes."], ["Mercredi", "de Mercure", "Le vif-argent", 0xffa24a, "Le seul métal qui coule, vif comme le messager des dieux."], ["Jeudi", "de Jupiter", "L'étain", 0x5a8cff, "Clair et sonore : celui du roi des dieux."],
    ["Vendredi", "de Vénus", "Le cuivre", 0x6adf8a, "Rouge et doux, le métal des miroirs. Il tire son nom de Chypre, l'île de Vénus."], ["Samedi", "de Saturne", "Le plomb", 0x8a8698, "Le plus lourd, le plus sombre, pour la plus lente."], ["Dimanche", "du Soleil", "L'or", 0xffd24a, "Il ne ternit jamais."]];
  lieu("forge", FORGE.porte, 5, "Frapper chez le forgeron", async () => {
    const p = await rencontre(FORGE.porte, faceDe(FORGE));
    await dit("Le forgeron", "Sept métaux sur mon établi, et sept astres qui errent là-haut. À chacun le sien. Les jours de la semaine te souffleront les astres. À toi de trouver les métaux.");
    let reste = [5, 2, 6, 0, 4, 1, 3];
    for(let i = 0; i < 7; i++){ const [jour, astre, , , indice] = SEPT[i]; await question({eye:`La forge · ${i + 1} sur 7`, q:`${jour} est le jour ${astre}. Quel métal lui revient ?`, opts:reste.map(k => SEPT[k][2]), ok:reste.indexOf(i), non:indice}); reste = reste.filter(k => k !== i); }
    await dit("Le forgeron", "Lundi la Lune, mardi Mars, mercredi Mercure, jeudi Jupiter, vendredi Vénus. Tu le savais sans le savoir. Samedi et dimanche ont changé de nom chez nous, mais les Anglais disent encore Saturday et Sunday.");
    await dit("Le forgeron", "Recule, je rallume la forge.");
    sort(p);
    /* la vision : sept colonnes de couleur montent de la forge et deviennent les sept planètes */
    const c = FORGE.G.position.clone(), cols = SEPT.map((s, i) => { const a = i/7*TAU, m = new THREE.Mesh(new THREE.CylinderGeometry(.34, .34, 1, 6, 1, true), new THREE.MeshBasicMaterial({color:s[3], fog:false, transparent:true, opacity:.85, blending:THREE.AdditiveBlending, depthWrite:false})); m.geometry.translate(0, .5, 0); m.position.set(c.x + Math.cos(a)*4, c.y, c.z + Math.sin(a)*4); m.rotation.set(Math.sin(a)*.2, 0, -Math.cos(a)*.2); m.scale.y = .01; scene.add(m); const h = halo(8, 0, s[3]); h.position.set(m.position.x + Math.cos(a)*13.5, c.y + 66, m.position.z + Math.sin(a)*13.5); scene.add(h); return {m, h}; });
    const recul = FORGE.porte.clone().add(faceDe(FORGE).multiplyScalar(13)); recul.y = sol(recul.x, recul.z) + 1.5;
    await Promise.all([teinte(.55, 0x30283a, 5), plan(2400, recul, V(c.x, c.y + 14, c.z))]); cap("Sept métaux, sept feux.", 5000);
    for(let i = 0; i < 7; i++){ Son.note([220, 247.5, 277.2, 293.7, 329.6, 370, 415.3][i], .07); tw(1700, k => { cols[i].m.scale.y = .01 + k*68; }); tw(2400, k => cols[i].h.material.opacity = k*.9); await attends(520); }
    await plan(4600, recul.clone().add(V(0, 1.5, 0)), V(c.x, c.y + 62, c.z)); cap("Sept jours, sept astres errants. Le ciel entier tient dans une semaine.", 6500); await attends(3600);
    await Promise.all([teinte(0, 0xffffff, 8, 1700), tw(1700, k => cols.forEach(o => { o.m.material.opacity = .85*(1 - k); o.h.material.opacity = .9*(1 - k); }))]); cols.forEach(o => scene.remove(o.m, o.h)); tw(1500, k => fanalF.material.opacity = .8*(1 - k));
    await ouvrePage("forge"); await rends(); });

  /* ================================================================ 5. LE CIMETIÈRE : vingt siècles de grimoires */
  const TOMBES = V(chemin(-200) + 9, 0, -200); { const b = halo(.8, .7, 0xbfffe0); b.position.set(TOMBES.x - 2.5, sol(TOMBES.x - 2.5, -200) + 1.5, -200); scene.add(b); G.maj.push((dt, t) => { b.material.opacity = fait("tombes") ? 0 : .5 + .25*Math.sin(t*5); }); }
  lieu("tombes", V(TOMBES.x - 4, 0, -200), 7, "Lire les tombes", async () => {
    await plan(1600, V(TOMBES.x - 6, sol(TOMBES.x - 6, -197) + 1.5, -197), V(TOMBES.x + 3, sol(TOMBES.x, -202) + .6, -203));
    await dit("", "Six pierres, sans dates. Sous chacune, un livre et celui qui l'a écrit. La mousse a mangé les chiffres : il ne reste que quelques mots.");
    await ordre({eye:"Le cimetière des mages", q:"Remets-les dans l'ordre, de la plus ancienne à la plus récente.", non:"Pas encore celle-là. Cherche ce qui vient avant : la langue, le support, le pays.",
      items:["<b>Les papyrus magiques</b> Des rouleaux en grec, écrits en Égypte", "<b>Le Picatrix</b> Un livre arabe, traduit pour un roi de Castille", "<b>La Clavicule de Salomon</b> Copiée à la main, à la fin du Moyen Âge", "<b>Agrippa</b> Trois livres imprimés à Cologne par un humaniste", "<b>John Dee</b> Le mathématicien de la reine Élisabeth", "<b>Éliphas Lévi</b> Un Parisien du siècle de la vapeur"]});
    /* la vision : les mages se lèvent de leurs tombes et montent en file vers le château ; on les suit */
    const fant = []; for(let i = 0; i < 6; i++){ const h = plaque(tSpectre, 1.6, 3.2, {fog:false, op:0}), x = TOMBES.x - 1 + (i % 3)*2.7, z = -197 - Math.floor(i/3)*5.5; h.position.set(x, sol(x, z) + 1.3, z); scene.add(h); const l = halo(3, 0, 0xcfd8ff); scene.add(l); fant.push({h, l, x, z}); }
    const zc = k => lerp(-186, -228, k), pos = k => V(chemin(zc(k)) - .4, sol(chemin(zc(k)) - .4, zc(k)) + 1.45 + k*.5, zc(k)), cTombes = V(TOMBES.x + 1.5, sol(TOMBES.x, -200) + 1.4, -200), cPorte = V(TX, PLAT + 9, MUR);
    await Promise.all([teinte(1, 0xc6d0ff, 5), plan(2600, pos(0), cTombes)]); cap("Ils se lèvent, du plus ancien au plus jeune.", 5500);
    for(let i = 0; i < 6; i++){ Son.note([146.8, 164.8, 196, 220, 246.9, 293.7][i], .08); tw(1500, k => { fant[i].h.material.opacity = k*.92; fant[i].l.material.opacity = k*.4; fant[i].h.position.y = sol(fant[i].x, fant[i].z) + .3 + k*1.4; }); await attends(700); }
    await attends(900); cap("Vingt siècles de livres, et le même chemin.", 8000); const cible = cTombes.clone(), flotte = (dt, t) => fant.forEach((f, i) => { f.l.position.copy(f.h.position); f.h.position.y = sol(f.h.position.x, f.h.position.z) + 1.7 + Math.sin(t*1.6 + i)*.12; }); G.maj.push(flotte);
    await tw(12500, k => { cam.position.copy(pos(k)); cible.lerpVectors(cTombes, cPorte, doux(clamp(k*2.4, 0, 1))); cam.quaternion.copy(vise(cam.position, cible));
      fant.forEach((f, i) => { const kk = clamp(k*1.3 - i*.05, 0, 1), z = lerp(f.z, MUR + 2, kk), x = lerp(f.x, chemin(z) + (i % 2 ? .9 : -.9), doux(Math.min(1, kk*5))), o = 1 - smooth(.86, 1, kk); f.h.position.x = x; f.h.position.z = z; f.h.material.opacity = .92*o; f.l.material.opacity = .4*o; }); }, k => k);
    G.maj.splice(G.maj.indexOf(flotte), 1); fant.forEach(f => scene.remove(f.h, f.l)); await teinte(0, 0xffffff, 8, 1500); await ouvrePage("tombes"); await rends(); });

  /* ================================================================ 6. LE PARVIS : le carré de Saturne, qu'on trace en marchant */
  const KA = [[4, 9, 2], [3, 5, 7], [8, 1, 6]], CAR = V(TX, 0, -247), PAS = 2.1, dalles = [], gD = new THREE.BoxGeometry(1.6, .14, 1.6);
  for(let r = 0; r < 3; r++) for(let c = 0; c < 3; c++){ const n = KA[r][c], x = CAR.x + (c - 1)*PAS, z = CAR.z + (r - 1)*PAS, y = sol(x, z) + .05, m = new THREE.Mesh(gD, new THREE.MeshLambertMaterial({map:M.pierre.map, color:0x8a8894, emissive:0x000000})); m.position.set(x, y, z); scene.add(m);
    const s = plaque(tChiffre(n), .75, .75, {fog:false, add:true, op:0}); s.position.set(x, y + .75, z); scene.add(s); dalles[n] = {m, s, x, y, z}; }
  const traceG = new THREE.Group(), mTrace = new THREE.MeshBasicMaterial({color:0xffd27a, fog:false}); scene.add(traceG);
  const relie = n => { const B = dalles[n]; if(n === 1){ const o = new THREE.Mesh(new THREE.RingGeometry(.3, .5, 14), mTrace); o.rotation.x = -Math.PI/2; o.position.set(B.x, B.y + .1, B.z); traceG.add(o); return; }
    const A = dalles[n - 1], d = Math.hypot(B.x - A.x, B.z - A.z), a = Math.atan2(B.x - A.x, B.z - A.z), m = new THREE.Mesh(new THREE.BoxGeometry(.22, .05, d), mTrace); m.position.set((A.x + B.x)/2, A.y + .1, (A.z + B.z)/2); m.rotation.y = a; traceG.add(m);
    if(n === 9){ const t = new THREE.Mesh(new THREE.BoxGeometry(1, .05, .22), mTrace); t.position.set(B.x, B.y + .1, B.z); t.rotation.y = a; traceG.add(t); } };
  const efface = () => { while(traceG.children.length){ const o = traceG.children[0]; o.geometry.dispose(); traceG.remove(o); } };
  const pretes = () => ["herbe", "seuils", "forge", "tombes"].every(fait); let rang = fait("carre") ? 9 : 0, dessus = 0, dit6 = 0;
  if(fait("carre")) for(let n = 1; n <= 9; n++) relie(n);
  G.maj.push((dt, t) => { const ok = pretes(), d = Math.hypot(J.x - CAR.x, J.z - CAR.z);
    for(let n = 1; n <= 9; n++){ const D9 = dalles[n], pris = n <= rang; D9.s.material.opacity = ok ? (pris ? .95 : .45 + .2*Math.sin(t*2 + n)) : 0; D9.m.material.emissive.setHex(pris ? 0x6a4a10 : 0); }
    if(etat.occupe || fait("carre") || d > 9) return;
    if(!ok){ if(t - dit6 > 14){ dit6 = t; const manque = [["herbe", "l'herboriste"], ["seuils", "les portes du village"], ["forge", "le forgeron"], ["tombes", "le cimetière"]].filter(([id]) => !fait(id)).map(x => x[1]); cap(`Neuf dalles dorment devant la porte. Il te reste à voir : ${manque.join(", ")}.`, 7000); } return; }
    if(t - dit6 > 30 && rang === 0){ dit6 = t; cap("Neuf dalles, neuf nombres. Marche de 1 à 9.", 7000); }
    let n = 0; for(let k = 1; k <= 9; k++) if(Math.abs(J.x - dalles[k].x) < .85 && Math.abs(J.z - dalles[k].z) < .85) n = k;
    if(n && n !== dessus){ dessus = n; if(n === rang + 1){ rang = n; relie(n); Son.note(196*Math.pow(1.122, n), .07); if(rang === 9) lance({run:sceau}); }
      else if(n > rang + 1 || (n < rang && rang > 0)){ if(n !== rang){ rang = 0; efface(); Son.note(110, .08); cap("Le tracé s'efface. Reprends à la dalle 1.", 4000); } } } if(!n) dessus = 0; });
  async function sceau(){ /* la vision : vu d'en haut, le tracé est le sceau de Saturne ; la herse se lève */
    const y = dalles[5].y; await Promise.all([teinte(1, 0xffd27a, 5), plan(3000, V(CAR.x, y + 11, CAR.z + .01), V(CAR.x, y, CAR.z))]); cap("Vu d'en haut, tes pas ont écrit un signe sur le carré de Saturne.", 7000);
    const h = halo(.1, 0, 0xffd27a); h.position.set(CAR.x, y + .4, CAR.z); scene.add(h); Son.note(110, .1); Son.note(165, .07); await tw(3000, k => { h.scale.setScalar(.1 + k*13); h.material.opacity = k*.5; }); await attends(1800);
    plan(3600, V(CAR.x, y + 2.4, CAR.z + 5), V(TX, PLAT + 3.5, MUR)); await attends(1200); S.faits.carre = true; Son.cloche(.8);
    await tw(4200, k => { herse.position.y = PLAT + 6.4*k + Math.sin(k*60)*.03*(1 - k); h.material.opacity = .5*(1 - k); }, k => k); cap("La herse se lève.", 4000); scene.remove(h);
    await teinte(0, 0xffffff, 8, 1400); await ouvrePage("carre"); tourneVers(TX, MUR - 10); await rends(); }

  /* ================================================================ 7. L'ÉTABLI : le talisman */
  { const d = new THREE.Mesh(new THREE.CylinderGeometry(.34, .34, .05, 12), new THREE.MeshBasicMaterial({color:0x9a8660, fog:false})); d.position.set(ETABLI.x, PLAT + 1.03, ETABLI.z); scene.add(d);
    for(const [dx, dz, w, c] of [[-.85, .15, .5, 0x3a1c1c], [-.8, .1, .42, 0x1c2a3a], [.8, -.2, .3, 0x2a2418]]){ const l = new THREE.Mesh(new THREE.BoxGeometry(w, .12, w*.7), new THREE.MeshBasicMaterial({color:c, fog:false})); l.position.set(ETABLI.x + dx, PLAT + 1.06 + (c === 0x1c2a3a ? .12 : 0), ETABLI.z + dz); l.rotation.y = dx; scene.add(l); }
    const b = halo(.7, .7, 0xffc878); b.position.set(ETABLI.x, PLAT + 1.35, ETABLI.z); scene.add(b); G.maj.push((dt, t) => { b.material.opacity = fait("atelier") ? .25 : .5 + .2*Math.sin(t*4); }); }
  lieu("atelier", ETABLI, 5, "S'approcher de l'établi", async () => {
    await plan(1600, V(ETABLI.x + 3.2, PLAT + 2, ETABLI.z + 1.6), V(ETABLI.x, PLAT + 1.2, ETABLI.z));
    await dit("", "Un disque de métal nu, un burin, et une commande laissée là : « Un talisman pour l'étude et la parole. » Personne ne l'a jamais gravé.");
    await question({eye:"Le talisman · 1 sur 3", q:"Quel astre gouverne l'étude et la parole ?", opts:["Mars, le guerrier", "Mercure, le messager", "Saturne, le vieillard", "Vénus, l'amante"], ok:1, non:"Il te faut celui qui porte les messages des dieux, et qui protège les savants et les marchands."});
    await question({eye:"Le talisman · 2 sur 3", q:"Quel jour faut-il le graver ?", opts:["Mardi", "Mercredi", "Samedi", "Dimanche"], ok:1, non:"Le forgeron te l'a appris : le nom du jour contient celui de l'astre."});
    await question({eye:"Le talisman · 3 sur 3", q:"Et à quelle heure de ce jour ?", opts:["À minuit, quand tout dort", "À midi, quand le soleil est au plus haut", "À la première heure après le lever du soleil"], ok:2, non:"Chaque heure a son astre. Celle qui ouvre le jour appartient à l'astre du jour : c'est elle qui lui donne son nom."});
    /* la vision : le talisman se grave tout seul, trait par trait */
    const cv = document.createElement("canvas"); cv.width = cv.height = 96; const x = cv.getContext("2d"), tx = new THREE.CanvasTexture(cv); tx.magFilter = tx.minFilter = THREE.NearestFilter; tx.colorSpace = THREE.SRGBColorSpace;
    const disque = plaque(tx, 2.6, 2.6, {fog:false}); disque.position.set(ETABLI.x, PLAT + 2.7, ETABLI.z); scene.add(disque); x.strokeStyle = "#ffe2a8"; x.fillStyle = "#ffe2a8"; x.lineWidth = 2;
    const TR = [() => { x.fillStyle = "#3a2c18"; x.beginPath(); x.arc(48, 48, 46, 0, TAU); x.fill(); x.fillStyle = "#ffe2a8"; }, () => { x.beginPath(); x.arc(48, 48, 44, 0, TAU); x.stroke(); }, () => { x.beginPath(); x.arc(48, 48, 34, 0, TAU); x.stroke(); },
      () => { x.beginPath(); x.arc(48, 44, 9, 0, TAU); x.stroke(); }, () => { x.beginPath(); x.arc(48, 30, 8, Math.PI*.1, Math.PI*.9); x.stroke(); }, () => { x.beginPath(); x.moveTo(48, 53); x.lineTo(48, 72); x.stroke(); }, () => { x.beginPath(); x.moveTo(40, 64); x.lineTo(56, 64); x.stroke(); },
      ...Array.from({length:8}, (_, i) => () => { const a = i/8*TAU; x.fillRect(48 + Math.cos(a)*39 - 1.5, 48 + Math.sin(a)*39 - 1.5, 3, 3); })];
    await Promise.all([teinte(1, 0xffc98a, 6), plan(2200, V(ETABLI.x + 2.6, PLAT + 2.9, ETABLI.z + 2.2), disque.position)]); cap("Mercure, un mercredi, à la première heure.", 6000);
    for(let i = 0; i < TR.length; i++){ TR[i](); tx.needsUpdate = true; Son.note(i < 7 ? 293.7 + i*24 : 587, i < 7 ? .05 : .025); await attends(i < 7 ? 520 : 170); }
    cap("Le métal, le jour, l'heure, le signe : tout s'accorde, ou rien n'agit.", 6000); await tw(3600, k => { disque.position.y = PLAT + 2.7 + Math.sin(k*Math.PI)*.4; disque.material.rotation = k*TAU; });
    await teinte(0, 0xffffff, 8, 1400); tw(900, k => disque.material.opacity = 1 - k).then(() => scene.remove(disque)); await ouvrePage("atelier"); await rends(); cap("La porte de la tour est ouverte.", 5000); });

  /* ================================================================ 8. LE SOMMET : le sigil, la lampe, l'aube */
  for(let i = 0; i < 7; i++) bloc(3.2, .7*(i + 1), .72, TX, PLAT + .35*(i + 1), TZ + 12.5 - i*.7);
  { const b = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 4.1), new THREE.MeshBasicMaterial({color:0xffb060, fog:false})), h = halo(7, 0, 0xff9a50); b.position.set(TX, PLAT + 7.2, TZ + 7.6); h.position.set(TX, PLAT + 7.4, TZ + 8.2); scene.add(b, h); G.maj.push((dt, t) => { const on = fait("atelier"); b.visible = on; b.material.color.setHex(0xffb060).multiplyScalar(.82 + .18*Math.sin(t*6.3)); h.material.opacity = on ? .16 + .05*Math.sin(t*3) : 0; }); }
  { let d8 = -99; G.maj.push((dt, t) => { if(!etat.occupe && !fait("atelier") && J.z < MUR && Math.hypot(J.x - PORTE.x, J.z - PORTE.z) < 6 && t - d8 > 20){ d8 = t; cap("La porte de la tour est close. Quelque chose attend sur l'établi, sous la galerie.", 6000); } }); }
  const FEN = V(TX, tour.position.y + 56.5, TZ + 8.1);
  const sigil = txt => { const L = [...new Set(txt.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase().replace(/[^A-Z]/g, "").split(""))].filter(c => !"AEIOUY".includes(c)).slice(0, 12); if(L.length < 2) return null;
    return {lettres:L.join(" "), pts:L.map(c => { const i = c.charCodeAt(0) - 65, a = (i % 9)/9*TAU - Math.PI/2 + Math.floor(i/9)*.35, r = [.42, .72, 1][Math.floor(i/9)]; return [Math.cos(a)*r, Math.sin(a)*r]; })}; };
  const svgSigil = S2 => { const P2 = S2.pts.map(([x, y]) => [50 + x*38, 50 + y*38]), d = P2.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(""), a = P2[0], z = P2[P2.length - 1], y = P2[P2.length - 2], an = Math.atan2(z[1] - y[1], z[0] - y[0]) + Math.PI/2;
    return `<svg viewBox="0 0 100 100" class="tq-sigil"><path d="${d}" pathLength="1"/><circle cx="${a[0].toFixed(1)}" cy="${a[1].toFixed(1)}" r="4"/><path d="M${(z[0] + Math.cos(an)*5).toFixed(1)} ${(z[1] + Math.sin(an)*5).toFixed(1)}L${(z[0] - Math.cos(an)*5).toFixed(1)} ${(z[1] - Math.sin(an)*5).toFixed(1)}" pathLength="1"/></svg>`; };
  const laHaut = () => { etat.haut = true; G.fige = true; J.yaw = Math.PI; J.pitch = -.4; G.cine = () => { J.yaw = clamp(J.yaw, Math.PI - 1.25, Math.PI + 1.25); J.pitch = clamp(J.pitch, -.8, .45); cam.position.copy(FEN); cam.rotation.set(J.pitch, J.yaw, 0); }; };
  const redescend = () => { etat.haut = false; J.x = TX; J.z = TZ + 16; tourneVers(TX, MUR); G.cine = null; G.fige = false; garde(); };
  const carteFin = () => { montre(`<div class="tq-page fin"><p class="tq-eye">La Tour</p><h2>La lampe est allumée</h2><p>Depuis la colline, tout à l'heure, tu regardais cette fenêtre. Elle attendait que quelqu'un monte l'allumer.</p><p>Tu connais maintenant les bases : les liens entre les choses, les signatures, les seuils, les sept astres et leurs métaux, les livres, le carré, le talisman, le sigil. La magie cérémonielle, ses cercles et ses noms, t'attend dans un autre lieu.</p>
      <div class="tq-acts"><button type="button" class="tq-go" data-g>Ouvrir le grimoire</button><button type="button" class="tq-go ghost" data-r>Redescendre et se promener</button><button type="button" class="tq-go ghost" data-f>Revenir à la magie</button></div></div>`);
    ui.querySelector("[data-g]").onclick = e => { e.stopPropagation(); window.ArcanesTourJeu && window.ArcanesTourJeu.grimoire(); }; ui.querySelector("[data-f]").onclick = e => { e.stopPropagation(); G.fermer(); };
    ui.querySelector("[data-r]").onclick = e => { e.stopPropagation(); fermeUI().then(redescend); }; };
  lieu("sommet", PORTE, 5.5, "Monter dans la tour", async () => {
    /* la montée : la caméra tourne autour de la tour jusqu'à la fenêtre allumée */
    const y0 = tour.position.y; Son.cloche(.7); await plan(1800, V(TX, y0 + 6, TZ + 26), V(TX, y0 + 9, TZ));
    await tw(10500, k => { const a = Math.PI/2 + k*TAU, r = lerp(26, 17, k), y = lerp(y0 + 6, y0 + 57.5, k); cam.position.set(TX + Math.cos(a)*r, y, TZ + Math.sin(a)*r); cam.quaternion.copy(vise(cam.position, V(TX - Math.sin(a)*lerp(11, 0, k*k), y + lerp(4, -.5, k), TZ + Math.cos(a)*lerp(11, 0, k*k)))); phare.scale.setScalar(lerp(12, 5, k)); });
    await attends(500); await plan(2400, FEN, V(TX, FEN.y + Math.tan(-.4)*60, TZ + 68)); laHaut();
    await dit("", "La chambre haute. Tu es derrière la fenêtre que tu voyais depuis la colline. Le village est en bas, minuscule.");
    await dit("", "Sur la table, une lampe éteinte, une plume, une feuille. Et une consigne, d'une écriture pressée : « Écris ce que tu veux. Une seule phrase. »");
    const S2 = await new Promise(res => { if(etat.vite) return res(sigil("Je veux apprendre")); montre(`<div class="tq-q"><p class="tq-eye">Le sigil</p><h2>Écris ce que tu veux, en une phrase.</h2><p class="tq-note">Elle ne quitte pas ton appareil, et elle n'est gardée nulle part.</p><input type="text" class="tq-voeu" maxlength="80" placeholder="Je veux…" autocomplete="off"><p class="tq-non" hidden></p><button type="button" class="tq-go" data-ok>En faire un signe</button></div>`);
      const inp = ui.querySelector("input"); inp.onclick = e => e.stopPropagation(); ui.querySelector("[data-ok]").onclick = e => { e.stopPropagation(); const s = sigil(inp.value); if(!s){ const p = ui.querySelector(".tq-non"); p.hidden = false; p.textContent = "Il faut au moins quelques mots."; return; } fermeUI().then(() => res(s)); }; });
    await new Promise(res => { if(etat.vite) return res(); montre(`<div class="tq-q"><p class="tq-eye">Le sigil</p><p class="tq-note">Les voyelles et les lettres répétées tombent. Il reste : <b>${S2.lettres}</b></p><div class="tq-dessin grand">${svgSigil(S2)}</div><h2>Regarde-le une dernière fois. Puis oublie-le.</h2><button type="button" class="tq-go" data-ok>Le brûler à la lampe</button></div>`); Son.note(220, .06); ui.querySelector("[data-ok]").onclick = e => { e.stopPropagation(); fermeUI().then(res); }; });
    /* la vision : le signe monte dans le ciel, la lampe s'allume, le jour se lève */
    J.yaw = Math.PI; J.pitch = -.4; const P3 = S2.pts.map(([x, y]) => V(TX + x*15, FEN.y - 22 - y*15, TZ + 70)), lg = new THREE.BufferGeometry().setFromPoints(P3), ln = new THREE.Line(lg, new THREE.LineBasicMaterial({color:0xffe2a8, fog:false, transparent:true})); ln.frustumCulled = false; lg.setDrawRange(0, 0); scene.add(ln);
    await teinte(1, 0xffd9a0, 5, 1200); cap("Ton signe, écrit sur la nuit.", 5000); for(let i = 2; i <= P3.length; i++){ lg.setDrawRange(0, i); Son.note(196*Math.pow(1.122, i), .06); await attends(420); } await attends(1600);
    Son.cloche(1); Son.note(110, .1); Son.note(220, .08); Son.note(330, .06); tw(2600, k => { ln.material.opacity = 1 - k; phare.scale.setScalar(9 + k*60); phare2.scale.setScalar(46 + k*120); });
    S.faits.fin = true; maisons.forEach(m => m.v = Math.max(m.v, .01)); cap("La lampe prend. En bas, toutes les fenêtres s'allument.", 6000);
    await Promise.all([teinte(0, 0xffffff, 8, 5000), tw(11000, k => { etat.aube = k; maisons.forEach(m => m.v = Math.max(m.v, k)); lampes.forEach(l => l.v = Math.max(l.v, k)); J.yaw = Math.PI + Math.sin(k*Math.PI)*.45; J.pitch = -.4 + Math.sin(k*Math.PI)*.12; })]); scene.remove(ln);
    cap("L'aube.", 5000); await attends(2500); await ouvrePage("sommet"); carteFin(); }, () => fait("atelier"));
  G.maj.push(() => { if(fait("fin")){ phare.scale.setScalar(Math.max(phare.scale.x, 40)); } });

  /* ---------------------------------------------------------------- reprendre là où on s'était arrêté ; quelques mots en chemin */
  if(S.z != null && S.z < 0){ J.z = S.z; J.x = S.x == null ? chemin(S.z) : S.x; J.yaw = Math.atan2(-(chemin(J.z - 14) - J.x), 14); if(J.z < MUR) tourneVers(TX, TZ); }
  const MOTS = [[-48, "Le chemin descend vers un village."], [-88, "Une lueur verte, une lueur rouge : deux portes où frapper. Et des marques pâles sur d'autres."], [-186, "Le cimetière. Une lumière y veille."], [-232, "Le château. Sa herse est baissée."], [-259.6, "La cour du château."]].filter(m => !(S.z != null && S.z < m[0])); let mot = 0;
  G.maj.push(() => { if(mot < MOTS.length && J.z < MOTS[mot][0]){ if(!etat.occupe && !(MOTS[mot][0] === -232 && fait("carre"))) cap(MOTS[mot][1], MOTS[mot][0] < -259 ? 3000 : 7000); mot++; } });
  let dernier = 0; G.maj.push((dt, t) => { if(t - dernier > 4 && !etat.occupe){ dernier = t; garde(); } });
  return {S, etat, lieux, lance, garde, debut:() => { if(S.z == null || S.z >= 0) setTimeout(() => { if(!etat.occupe) cap("Au loin, un château et sa tour. Une seule fenêtre est allumée.", 7000); }, 900); },
    fin:() => document.removeEventListener("keydown", touche)};
}
