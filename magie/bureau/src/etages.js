/* ===== Arcanes · Magie : Sans suite, les sept étages et la fin =====
   Chaque étage est un monde bâti devant la porte de l'ascenseur, dans un style de rendu à lui, avec un service, des personnages,
   une notion de magie et un geste à faire pour obtenir le visa. Les pas d'un étage se jouent dans l'ordre (voir « enchaine » dans jeu.js).
   1 la Lune (gros pixels) · 2 Mercure (enluminure) · 3 Vénus (eau-forte) · 4 le Soleil (vitrail) · 5 Mars (bois gravé) · 6 Jupiter (ombres) · 7 Saturne (Dark Deco à l'aube). */
import { etagesHauts } from "./etages2.js";

export function installer(G){
  const {THREE, S, U, M, L, B, V, TAU, lerp, clamp, rng, ZS, D, bo, cy, lot, peint, lathe, halo, figure, vers, va, tourneVers, regardeVers, tw, attends, plan, rends, dit, geste, tend, panneau, cap, Son, MARQ, AUD, visa, J, etat, ajoute} = G;
  const BOITE = new THREE.BoxGeometry(1, 1, 1);
  /* ---- de quoi bâtir vite */
  const O = {
    sol:(w, d, m, z0, y = 0) => { const p = new THREE.Mesh(new THREE.PlaneGeometry(w, d), m); p.rotation.x = -Math.PI/2; p.position.set(0, y, z0); return ajoute(p); },
    jour:(ciel, bas, k, c, i, x, y, z) => { ajoute(new THREE.HemisphereLight(ciel, bas, k)); const d = new THREE.DirectionalLight(c, i); d.position.set(x, y, z); ajoute(d); return d; },
    feu:(c, i, x, y, z, dist = 26) => { const l = new THREE.PointLight(c, i, dist, 1.7); l.position.set(x, y, z); return ajoute(l); },
    /* des boîtes de couleurs différentes en un seul objet : [x, y, z, sx, sy, sz, ry, couleur] */
    lotC:li => { const im = new THREE.InstancedMesh(BOITE, L(0xffffff), li.length), o = new THREE.Object3D(), c = new THREE.Color(); li.forEach((q, i) => { o.position.set(q[0], q[1], q[2]); o.scale.set(q[3], q[4], q[5]); o.rotation.set(0, q[6] || 0, 0); o.updateMatrix(); im.setMatrixAt(i, o.matrix); im.setColorAt(i, c.set(q[7])); }); im.frustumCulled = false; return ajoute(im); },
    /* le mur autour de la porte de l'ascenseur, pour les étages fermés */
    facade:(w, h, m) => { const l = w/2 - 1.7; bo(l, h, .5, -(1.7 + l/2), h/2, ZS + .45, m); bo(l, h, .5, 1.7 + l/2, h/2, ZS + .45, m); bo(3.4, h - 3.9, .5, 0, 3.9 + (h - 3.9)/2, ZS + .45, m); },
    robe:(h, r0, r1) => [[0, 0], [r0, 0], [r0*.86, h*.45], [r1, h*.78], [r1*1.18, h*.93], [r1, h], [.1, h + .07], [0, h + .07]],
    maille:(geo, m, x, y, z) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); return ajoute(o); },
    /* le héros vient se placer en (x, z) et regarde c */
    vient:async (x, z, c, ms = 1200) => { J.x = x; J.z = z; await plan(ms, V(x, 1.7, z), c); regardeVers(c.x, c.z); },
    regarde:(c, ms = 900) => { if(Math.hypot(c.x - MARQ.position.x, c.z - MARQ.position.z) < .6) tourneVers(MARQ, J.x, J.z, 500); return plan(ms, V(J.x, 1.7, J.z), c); },
    placeM:(x, z, fx, fz) => { MARQ.visible = true; MARQ.userData.vaId = (MARQ.userData.vaId || 0) + 1; MARQ.position.set(x, 0, z); if(MARQ.userData.j) MARQ.userData.j.forEach(j => j.rotation.x = 0); vers(MARQ, fx, fz); },
    hoche:g => tw(320, k => g.userData.tete.rotation.x = Math.sin(k*Math.PI)*.28, k => k),
    /* un mot ou une lettre en grand, au milieu de l'écran */
    affiche:async (txt, ms, cls = "bq-lettre") => { if(etat.vite) return; const e = document.createElement("div"); e.className = cls; e.textContent = txt; G.root.appendChild(e); requestAnimationFrame(() => e.classList.add("on")); await attends(ms); e.classList.remove("on"); setTimeout(() => e.remove(), 600); },
    BOITE };
  const {sol, jour, feu, lotC, facade, robe, maille, vient, regarde, placeM, hoche} = O;
  const dd = async (id, g) => { if(g) hoche(g); await dit(id); };

  /* ================================================================ 1. LA LUNE : un désert la nuit, un standard, un puits */
  G.etage(1, {astre:"la Lune", titre:"Premier étage · la Lune", service:"Service des songes et des réclamations", style:"pixel", construit(){
    jour(0xb0a8e8, 0x2a2240, 1.0, 0xffffff, 1.3, -12, 22, 14);
    const sable = L(0x5c5674), clair = L(0xcfc8e6), sombre = L(0x1c1830), pierre = L(0x9890b8), r = rng(7);
    sol(160, 160, sable, -30); bo(2.2, .04, 32, 0, .02, -9.6, clair);
    for(let i = 0; i < 9; i++){ const d = new THREE.Mesh(new THREE.SphereGeometry(1, 14, 8), sable), a = i/9*TAU; d.position.set(Math.cos(a)*(27 + r()*14), -1, -24 + Math.sin(a)*(26 + r()*10)); d.scale.set(9 + r()*8, 2.4 + r()*2.6, 7 + r()*6); ajoute(d); }
    lot(new THREE.CylinderGeometry(.55, .62, 1, 10), pierre, [[-6, 2.2, -5, 1, 4.4, 1], [6.5, 1.6, -20, 1, 3.2, 1], [-11, 2.8, -27, 1, 5.6, 1], [11, 2.2, -33, 1, 4.4, 1], [-5.6, 3, -36, 1, 6, 1], [5.6, 3, -36, 1, 6, 1]]);
    cy(.55, .62, 4.2, 10.5, .55, -24, pierre, 10).rotation.z = Math.PI/2; bo(13, .5, 1.3, 0, 6.25, -36, pierre);
    { const li = []; for(const [cx, cz] of [[-5, -9.5], [-10, -20], [4.2, -21.5], [9.5, -6.5], [-3.6, -25.5], [12, -15]]) for(let i = 0; i < 12; i++) li.push([cx + (r() - .5)*2.2, .9 + r()*.6, cz + (r() - .5)*2.2, .05, 1.8 + r()*1.4, .05, 0, (r() - .5)*.3]); lot(BOITE, clair, li); }
    /* le standard : un pupitre, un tableau de fiches, des cordons qui montent à la Lune, trois opératrices */
    const ZT = -30; bo(7.4, 1.05, 1.3, 0, .525, ZT, sombre); bo(7.6, .08, 1.5, 0, 1.09, ZT, clair); bo(8, 3.4, .5, 0, 1.7, ZT - 2, sombre); bo(8.2, .12, .6, 0, 3.46, ZT - 2, clair);
    { const li = [], fi = []; for(let i = 0; i < 9; i++){ for(let j = 0; j < 4; j++) li.push([-3.4 + i*.85, 1 + j*.6, ZT - 1.73, .16, .16, .06]); fi.push([-3.4 + i*.85 + (i - 4)*.82, 21.4, ZT - 2, .045, 36.4, .045, 0, -(i - 4)*.045]); } lot(BOITE, clair, li); lot(BOITE, clair, fi); }
    const tel = bo(.34, .16, .26, .9, 1.21, ZT + .2, clair);
    const DAMES = [-2.3, 0, 2.3].map(x => figure({c:0x8f84c0, h:2.1, x, z:ZT - .95, peau:0xf6f0ff, casque:true, cheveux:true, ep:.26, bras:.8, profil:robe(2.1, .42, .24)}));
    /* le puits, la table des scribes */
    const W = V(-8, 0, -16), T = V(7, 0, -13);
    maille(new THREE.CylinderGeometry(1.2, 1.3, .9, 18, 1, true), L(0x9890b8, {side:THREE.DoubleSide}), W.x, .45, W.z); { const t = maille(new THREE.TorusGeometry(1.25, .12, 6, 20), clair, W.x, .9, W.z); t.rotation.x = Math.PI/2; const f = maille(new THREE.CircleGeometry(1.2, 18), B(0x000000), W.x, .25, W.z); f.rotation.x = -Math.PI/2; }
    bo(.14, 2.6, .14, W.x - 1.35, 1.3, W.z, sombre); bo(.14, 2.6, .14, W.x + 1.35, 1.3, W.z, sombre); bo(3.1, .16, .2, W.x, 2.6, W.z, sombre); bo(.04, 1.4, .04, W.x, 1.9, W.z, clair);
    bo(2.4, .9, 1.1, T.x, .45, T.z, sombre); bo(2.6, .07, 1.3, T.x, .93, T.z, clair); for(let i = 0; i < 4; i++) bo(.34, .02, .44, T.x - .8 + i*.52, .99, T.z + (i % 2)*.14, pierre, i*.3);
    bo(.12, 2.5, .12, T.x - 2, 1.25, T.z - 1.6, sombre); bo(.12, 2.5, .12, T.x + 2, 1.25, T.z - 1.6, sombre); bo(4, .04, .04, T.x, 2.4, T.z - 1.6, clair); for(let i = 0; i < 6; i++) bo(.26, .36, .02, T.x - 1.5 + i*.6, 2.14 - (i % 2)*.08, T.z - 1.6, pierre);
    const tab = bo(.3, .05, .2, W.x, 1.6, W.z, clair); tab.visible = false;
    const pS = V(0, 1.7, -22.6), cS = V(0, 2.0, ZT - .95), pM = [2.4, -21.2], cMq = V(2.4, 2.05, -21.2), ds = (id, i) => dd(id, DAMES[i]);
    return {marq:[2.2, -6], obst:[[W.x, W.z, 1.9], [T.x, T.z, 1.8]], regle:(nx, nz) => [clamp(nx, -13, 13), Math.max(nz, -28.3)],
      curio:[[-5, -9.5, 2.6, "Des roseaux à papyrus. Ici, on écrit sur tout ce qui pousse."], [10.5, -24, 3.4, "Une colonne couchée. Elle a déposé une réclamation, elle aussi."], [-6, -5, 2.6, "Sur la colonne, des noms gravés. Aucun n'est le tien. Pas encore."]],
      pas:[
        {id:"standard", pos:V(0, 0, -23), r:4.6, label:"S'approcher du standard", run:async () => { placeM(pM[0], pM[1], 0, ZT); await vient(pS.x, pS.z, cS);
          await ds("dam1", 0); await ds("dam2", 1); await ds("dam3", 2); await attends(500); await ds("dam4", 0); await ds("dam5", 1); await ds("dam6", 2); await ds("dam7", 1); await attends(800); await ds("dam8", 0); await ds("dam9", 2);
          await ds("dam10", 1); await ds("dam11", 0); await ds("dam12", 2); await regarde(cMq); await dit("mar27"); await regarde(cS); await ds("dam13", 1); await rends(800); cap("À droite du chemin, la table des scribes. À gauche, le puits.", 6500); }},
        {id:"plomb", pos:T, r:3.3, label:"Graver une tablette", run:async () => { await vient(T.x - 1.5, T.z + 2, V(T.x, 1, T.z), 1100);
          await panneau({eye:"Service des réclamations · la tablette", titre:"Dans l'ordre", consigne:"Quatre gestes. Touche-les dans l'ordre où on les fait.", ordre:true, n:4, grille:true, bon:["graver", "plier", "clouer", "jeter"],
            options:[{id:"clouer", html:"Clouer"}, {id:"jeter", html:"Jeter au puits"}, {id:"graver", html:"Graver"}, {id:"plier", html:"Plier"}], faux:() => "<b>Les Trois Dames :</b> Dans l'ordre, on a dit. On ne cloue pas ce qu'on n'a pas plié."});
          const c = await panneau({eye:"Service des réclamations · la tablette", titre:"Que graves-tu ?", consigne:"Une seule demande. Ceux d'en bas n'aiment pas les listes.", options:[{id:"a", html:"« Qu'on me rende mon manteau. »"}, {id:"b", html:"« Que mon contrat reste sans effet. »"}, {id:"c", html:"« Que l'Auditeur perde son tampon. »"}]});
          S.plainte = c[0]; for(let i = 0; i < 4; i++){ Son.note(900 + i*40, .05, .08, "square"); await attends(170); } await tend(1100); await dit("dam14" + S.plainte); await rends(700); cap("Gravée, pliée, clouée. Reste le puits, de l'autre côté du chemin.", 6000); }},
        {id:"puits", pos:W, r:3.3, label:"Jeter la tablette au puits", run:async () => { await vient(W.x + 1.9, W.z + 1.7, V(W.x, .9, W.z), 1100); tab.visible = true; await tw(1000, k => { tab.position.y = lerp(1.6, -1.2, k*k); tab.rotation.x = k*6; }, k => k); tab.visible = false; Son.souffle(.3, .6, 500); await attends(1700);
          placeM(pM[0], pM[1], 0, ZT); for(let i = 0; i < 3; i++){ Son.note(1400, .06, .22, "square"); Son.note(1760, .04, .22, "square"); tw(200, k => tel.position.y = 1.21 + Math.sin(k*30)*.02, k => k); await attends(520); }
          J.x = pS.x; J.z = pS.z; await plan(1700, pS, cS); await ds("dam15", 0); await ds("dam16", 1); await ds("dam17", 2); await tw(500, k => DAMES[1].userData.bras[1].rotation.x = -k*1.3); await attends(900); await ds("dam18", 1); tw(500, k => DAMES[1].userData.bras[1].rotation.x = -(1 - k)*1.3);
          await ds("dam19", 0); await visa(1); await ds("dam20", 2); await ds("dam21", 0); await ds("dam22", 1); await regarde(cMq); await dit("mar28"); await regarde(cS); await ds("dam23", 2); regardeVers(0, ZS); await rends(1000); cap("Le visa de la Lune est au contrat. L'ascenseur attend, derrière toi.", 6500); }}]}; }});

  /* ================================================================ 2. MERCURE : un scriptorium, un comte qui ment, un triangle à fermer */
  G.etage(2, {astre:"Mercure", titre:"Deuxième étage · Mercure", service:"Service des écritures", style:"enluminure", construit(){
    jour(0xfff6e4, 0x8a7458, 1.15, 0xffffff, .85, 6, 14, 12);
    const pierre = L(0xe6dcc0), bois = L(0x8a5a2c), craie = B(0xfff8ea), or = B(0xffe9a0), r = rng(13);
    { const t = peint(128, 128, x => { for(let i = 0; i < 4; i++) for(let j = 0; j < 4; j++){ x.fillStyle = (i + j) % 2 ? "#b8342a" : "#efe2c2"; x.fillRect(i*32, j*32, 32, 32); } }); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(6, 14); sol(19, 43, L(0xffffff, {map:t}), -13.5); }
    bo(.6, 8, 43, -9.6, 4, -13.5, pierre); bo(.6, 8, 43, 9.6, 4, -13.5, pierre); bo(19.8, 8, .6, 0, 4, -35, pierre); facade(19.8, 8, pierre);
    { const li = []; for(const s of [-1, 1]) for(let z = 2; z >= -32; z -= 6.8){ li.push([s*9.1, 4, z, .7, 8, .9]); li.push([s*8.6, 7.4, z, 1.6, .5, 1.1]); } lot(BOITE, L(0xcfc2a0), li); }
    /* les rayonnages et leurs livres de couleur, les pupitres */
    { const li = [], pl = [], cols = [0xb8342a, 0x2a4ab0, 0x2f7a46, 0xc89a2a, 0x6a2a7a]; for(const s of [-1, 1]) for(const z of [-1.4, -8.2, -15, -21.8, -28.6]) for(let e = 0; e < 3; e++){ pl.push([s*9.05, 1.2 + e*1.5, z, .7, .1, 4.6]); let x = -2.1; while(x < 2.1){ const w = .12 + r()*.16, h = .7 + r()*.5; li.push([s*8.95, 1.25 + e*1.5 + h/2, z + x, .5, h, w, 0, cols[(r()*5)|0]]); x += w + .03; } } lot(BOITE, bois, pl); lotC(li); }
    const pupitre = (x, z, ry) => { const g = new THREE.Group(); const p = new THREE.Mesh(BOITE, bois); p.scale.set(.5, 1.1, .4); p.position.y = .55; const t = new THREE.Mesh(BOITE, bois); t.scale.set(1.1, .08, .8); t.position.set(0, 1.2, 0); t.rotation.x = .45; const l = new THREE.Mesh(BOITE, L(0xf4ecd4)); l.scale.set(.8, .06, .56); l.position.set(0, 1.27, .02); l.rotation.x = .45; g.add(p, t, l); g.position.set(x, 0, z); g.rotation.y = ry || 0; return ajoute(g); };
    for(const [x, z] of [[-4, -8], [4.6, -5], [-5.4, -14.5], [5.4, -12]]) pupitre(x, z);
    const cierge = (x, z, h = 1.5) => { cy(.16, .22, .12, x, .06, z, M.laiton, 8); cy(.05, .05, h, x, h/2 + .1, z, L(0xf4ecd4), 6); const f = maille(new THREE.SphereGeometry(.09, 8, 6), or, x, h + .22, z); f.scale.y = 1.7; return f; };
    for(const [x, z] of [[-6.2, -8.6], [6.8, -5.4], [-7, -30], [7, -30]]) cierge(x, z, 1.9); feu(0xffe2a0, 14, -5, 3, -9, 14); feu(0xffe2a0, 18, 3, 4, -24, 16);
    lot(BOITE, L(0xb8342a), [[-9.25, 5.6, -13.5, .12, .5, 43], [9.25, 5.6, -13.5, .12, .5, 43], [0, 5.6, -34.65, 19, .5, .12]]); lot(BOITE, L(0x2a4ab0), [[-9.25, 6.1, -13.5, .12, .22, 43], [9.25, 6.1, -13.5, .12, .22, 43], [0, 6.1, -34.65, 19, .22, .12]]);
    const COP = figure({c:0x2a4ab0, h:1.62, x:-4, z:-9.15, peau:0xe8c8a0, chapeau:"capuche", ep:.25, bras:.66, profil:robe(1.62, .36, .22)}); COP.userData.bras[1].rotation.x = -1;
    /* le cercle de l'opérateur, le triangle où comparaît l'esprit */
    const C = V(-3.6, 0, -23), T = V(3.4, 0, -24.5), anneau = (x, z, r0, r1) => { const a = maille(new THREE.RingGeometry(r0, r1, 40), craie, x, .03, z); a.rotation.x = -Math.PI/2; return a; };
    anneau(C.x, C.z, 1.7, 1.82); anneau(C.x, C.z, 1.35, 1.4); const PT = [0, 1, 2].map(i => V(T.x + Math.sin(i/3*TAU)*2.9, 0, T.z + Math.cos(i/3*TAU)*2.9));
    const cotes = PT.map((a, i) => { const b = PT[(i + 1) % 3], m = bo(a.distanceTo(b), .03, .1, (a.x + b.x)/2, .03, (a.z + b.z)/2, craie, -Math.atan2(b.z - a.z, b.x - a.x)); return m; });
    const flammes = PT.map(p => { const f = cierge(p.x, p.z, 1.1); f.visible = false; return f; }), lueur = feu(0xffb040, 0, T.x, 2.2, T.z, 14);
    const FUR = figure({c:0xc02a1e, h:1.98, x:T.x, z:T.z, peau:0xc89858, museau:true, bois:true, ep:.3, bras:.9, profil:robe(1.98, .44, .26)}); vers(FUR, 0, -8);
    { const q = new THREE.Mesh(new THREE.ConeGeometry(.12, .7, 8), B(0xff8a20)); q.position.set(0, .7, -.5); q.rotation.x = -2.2; FUR.add(q); }
    const allume = i => { flammes[i].visible = true; lueur.intensity = 7*(flammes.filter(f => f.visible).length); }, pF = V(1.2, 1.7, -19.6), cF = V(T.x, 2.1, T.z), pMq = [-1.2, -20.6], cMq = V(-1.2, 2.05, -20.6);
    const bougie = i => ({id:"cierge" + i, pos:PT[i], r:2.1, label:"Allumer le cierge", fait:() => allume(i), run:async () => { await regarde(V(PT[i].x, 1.2, PT[i].z), 700); Son.souffle(.15, .25, 2600); allume(i); await attends(700); if(i < 2) cap(i ? "Deux. Il en manque un." : "Un cierge. Il en manque deux.", 3500); await rends(500); }});
    return {marq:[-1.6, -3.4], obst:[[-4, -8.4, 1.3], [4.6, -5, 1.1], [-5.4, -14.5, 1.1], [5.4, -12, 1.1], [T.x, T.z, 1.2]], regle:(nx, nz) => [clamp(nx, -8, 8), Math.max(nz, -33)],
      curio:[[7.6, -15, 2.6, "Des livres enchaînés. Certains tirent sur leur chaîne."], [C.x, C.z, 1.9, "Le cercle de l'opérateur. Tant qu'on se tient dedans, on est en règle."], [-7.4, -22, 2.4, "Un rayon entier de Clavicules de Salomon. Aucune n'est de Salomon."]],
      pas:[
        {id:"copiste", pos:V(-3.4, 0, -6.2), r:3.4, label:"Approcher du copiste", run:async () => { await vient(-3.2, -5.6, V(-4, 1.7, -9.15)); await dd("cop1", COP); await attends(900); for(const id of ["cop2", "cop3", "cop4", "cop5", "cop6"]) await dd(id, COP); await rends(800); cap("Au fond de la salle, dans le triangle de craie, quelqu'un attend.", 6000); }},
        {id:"furfur", pos:V(2.4, 0, -19.6), r:3.6, label:"Aller voir le comte", run:async () => { placeM(pMq[0], pMq[1], T.x, T.z); await vient(pF.x, pF.z, cF); await dd("fur1", FUR); await dd("fur2", FUR); await dd("fur3", FUR); await regarde(cMq); await dit("mar29"); await regarde(cF); await dd("fur4", FUR); await rends(800); cap("Trois cierges éteints, aux pointes du triangle.", 5500); }},
        bougie(0), bougie(1), bougie(2),
        {id:"triangle", run:async () => { placeM(pMq[0], pMq[1], T.x, T.z); Son.note(110, .12, 2.5, "sine", 220); cotes.forEach(c => { c.scale.z = 2.4; c.material = or; }); await vient(pF.x, pF.z, cF, 1400); await attends(600); await dd("fur5", FUR);
          const g = await geste([["Montrer le contrat", "main"], ["Montrer le Marquis", "haut"], ["Se taire", "rien"]]); await dd(["fur6a", "fur6b", "fur6c"][g], FUR); await dd("fur7", FUR); await regarde(cMq, 1100); await attends(700); await dit("mar30"); await attends(600); await dit("mar31");
          await regarde(cF); await tw(500, k => FUR.userData.bras[1].rotation.x = -k*1.2); await dd("fur8", FUR); tw(500, k => FUR.userData.bras[1].rotation.x = -(1 - k)*1.2); await visa(2); regardeVers(0, ZS); await rends(1000); cap("Le visa de Mercure est au contrat. L'ascenseur est à l'autre bout de la salle.", 6500); }}]}; }});

  /* ================================================================ 3. VÉNUS : un jardin clos, un savant, un chien qui parle */
  G.etage(3, {astre:"Vénus", titre:"Troisième étage · Vénus", service:"Service des sympathies", style:"gravure", construit(){
    jour(0xffffff, 0x9a9080, .62, 0xffffff, 1.7, -9, 15, 7);
    const terre = L(0xd9d5c8), haie = L(0x68765c), pierre = L(0xe4e0d4), sombre = L(0x3a3c34), r = rng(31);
    sol(140, 140, terre, -24); bo(2.4, .03, 34, 0, .015, -10, pierre); bo(20, .03, 2.4, 0, .015, -20, pierre);
    /* le cloître : deux galeries de colonnes, un mur de fond, des cyprès derrière */
    { const col = [], lin = []; for(const s of [-1, 1]){ for(let z = 4; z >= -36; z -= 4) col.push([s*10, 1.7, z, 1, 3.4, 1]); lin.push([s*10, 3.65, -16, .8, .5, 41]); lin.push([s*12.6, 2.2, -16, .5, 4.4, 41]); lin.push([s*11.3, 4.1, -16, 3.2, .3, 41.4]); } lot(new THREE.CylinderGeometry(.3, .36, 1, 10), pierre, col); lot(BOITE, pierre, lin); bo(26, 4.4, .5, 0, 2.2, -36.6, pierre); }
    { const li = []; for(let i = 0; i < 9; i++) li.push([-16 + i*4 + (r() - .5), 4.6, -40 - r()*4, 1.3, 9.2 + r()*3, 1.3]); lot(new THREE.ConeGeometry(1, 1, 8), sombre, li); }
    /* les parterres : des haies basses, des rosiers */
    { const li = [], ro = []; for(const [x, z, w, d] of [[-5.4, -6, 6, .7], [-5.4, -14, 6, .7], [-8.2, -10, .7, 8.6], [5.6, -27, 6, .7], [8.4, -30.5, .7, 7], [-5.4, -27, 6, .7], [-8.2, -30.5, .7, 7], [-5.4, -34, 6, .7], [5.6, -34, 6, .7]]){ li.push([x, .45, z, w, .9, d]); const n = Math.round(Math.max(w, d)/1.2); for(let i = 0; i < n; i++) ro.push([x + (w > d ? (i + .5)/n - .5 : 0)*w, 1.05, z + (w > d ? 0 : (i + .5)/n - .5)*d, .3, .3, .3]); } lot(BOITE, haie, li); lot(new THREE.SphereGeometry(1, 8, 6), pierre, ro); }
    /* la fontaine */
    const F = V(0, 0, -20); cy(2.1, 2.2, .6, F.x, .3, F.z, pierre, 20); cy(1.85, 1.85, .1, F.x, .56, F.z, L(0x8a9aa0), 20); cy(.22, .3, 1.7, F.x, 1.1, F.z, pierre, 10); cy(.9, .2, .3, F.x, 2, F.z, pierre, 14); cy(.08, .08, .5, F.x, 2.35, F.z, pierre, 6);
    /* la table du savant : six choses, dont trois à Vénus */
    const T = V(5.2, 0, -11); bo(3.4, .1, 1.3, T.x, .95, T.z, sombre); for(const sx of [-1, 1]) for(const sz of [-1, 1]) bo(.12, .95, .12, T.x + sx*1.5, .475, T.z + sz*.5, sombre);
    { const y = 1; maille(lathe([[0, 0], [.1, 0], [.2, .1], [.22, .2], [.2, .22], [.08, .06], [0, .06]], 12), M.laiton, T.x - 1.3, y, T.z); cy(.012, .012, .34, T.x - .75, y + .17, T.z, haie, 4); maille(new THREE.SphereGeometry(.09, 8, 6), pierre, T.x - .75, y + .38, T.z);
      const c = maille(new THREE.SphereGeometry(.11, 8, 6), pierre, T.x - .2, y + .12, T.z); c.scale.set(1.5, 1, 1); maille(new THREE.SphereGeometry(.06, 8, 6), pierre, T.x - .03, y + .22, T.z); bo(.3, .1, .16, T.x + .4, y + .05, T.z, sombre); bo(.9, .03, .07, T.x + 1, y + .02, T.z + .2, L(0x9aa0a8), .4);
      cy(.012, .012, .4, T.x + 1.35, y + .2, T.z - .2, haie, 4); const h = cy(.14, .14, .03, T.x + 1.35, y + .42, T.z - .2, M.laiton, 12); h.rotation.x = 1.1; }
    const AGR = figure({c:0x24242c, h:1.76, x:T.x + .3, z:T.z - 1.25, peau:0xe0c8a8, chapeau:"beret", barbe:.34, ep:.27, bras:.72, profil:robe(1.76, .4, .23)});
    /* Monsieur : un chien noir, bien élevé */
    const CHI = new THREE.Group(); { const n = L(0x14141a), P = (geo, x, y, z, sx = 1, sy = 1, sz = 1) => { const q = new THREE.Mesh(geo, n); q.position.set(x, y, z); q.scale.set(sx, sy, sz); CHI.add(q); return q; }, sp = new THREE.SphereGeometry(1, 10, 8);
      P(sp, 0, .52, 0, .2, .2, .42); const t = P(sp, 0, .82, .42, .15, .15, .17); CHI.userData.tete = t; const m = P(new THREE.ConeGeometry(1, 1, 8), 0, .78, .62, .07, .2, .07); m.rotation.x = Math.PI/2; for(const s of [-1, 1]){ P(new THREE.ConeGeometry(1, 1, 5), s*.09, .98, .38, .05, .13, .04); P(new THREE.CylinderGeometry(1, 1, 1, 6), s*.11, .2, .28, .04, .4, .04); P(new THREE.CylinderGeometry(1, 1, 1, 6), s*.11, .2, -.26, .04, .4, .04); }
      const q = P(new THREE.CylinderGeometry(1, 1, 1, 5), 0, .72, -.5, .025, .36, .025); q.rotation.x = -.7; CHI.userData.queue = q; CHI.position.set(3, 0, -9.4); CHI.rotation.y = -.5; ajoute(CHI); }
    const hocheC = () => tw(400, k => { CHI.userData.tete.position.y = .82 + Math.sin(k*Math.PI)*.05; CHI.userData.queue.rotation.z = Math.sin(k*20)*.4; }, k => k), dc = async id => { hocheC(); await dit(id); };
    const pJ = V(3.9, 1.7, -8), cA = V(T.x + .3, 1.85, T.z - 1.25), cC = V(3, .8, -9.4), pMq = [1.3, -9.6], cMq = V(1.3, 2.05, -9.6);
    const NON = {plomb:"Le plomb est à Saturne. Vous voulez l'attrister ?", fer:"Le fer est à Mars. Vénus et Mars se sont déjà assez fréquentés.", helio:"L'héliotrope suit le Soleil. C'est dans son nom."};
    return {marq:[-2.4, -4.6], obst:[[F.x, F.z, 2.7], [T.x, T.z, 1.9], [3, -9.4, .7]], regle:(nx, nz) => [clamp(nx, -9, 9), Math.max(nz, -35)],
      curio:[[0, -16.4, 2.4, "Une fontaine. L'eau est à la Lune, le bassin de cuivre à Vénus. Ici, même la plomberie a son horoscope."], [0, -32, 3.4, "Au fond, des cyprès. L'arbre de Saturne. On les a plantés le plus loin possible."], [-5.4, -10, 2.6, "Des rosiers. À Vénus, bien sûr. Les épines sont à Mars : ils sont en instance de divorce."]],
      pas:[
        {id:"agrippa", pos:V(4.2, 0, -7.8), r:3.6, label:"Approcher du savant", run:async () => { await vient(pJ.x, pJ.z, cA); await dd("agr1", AGR); await regarde(cC, 700); await dc("chi1"); await regarde(cA, 700); await dd("agr2", AGR); await regarde(cC, 600); await dc("chi2"); await regarde(cA, 700); await dd("agr3", AGR); await dd("agr4", AGR); await rends(700); cap("Sur la table : six choses. Trois répondent à Vénus.", 5500); }},
        {id:"bouquet", pos:V(4.6, 0, -9.2), r:2.8, label:"Composer le bouquet", run:async () => { placeM(pMq[0], pMq[1], T.x, T.z); await vient(pJ.x, pJ.z, V(T.x, 1, T.z), 900);
          await panneau({eye:"Service des sympathies · la table", titre:"Un bouquet de Vénus", consigne:"Choisis trois choses qui répondent à Vénus.", n:3, grille:true, bon:["cuivre", "rose", "colombe"],
            options:[{id:"plomb", html:"Un lingot de plomb"}, {id:"rose", html:"Une rose"}, {id:"fer", html:"Une lame de fer"}, {id:"cuivre", html:"Une coupe de cuivre"}, {id:"helio", html:"Un héliotrope"}, {id:"colombe", html:"Une colombe"}], faux:sel => "<b>Monsieur :</b> " + NON[sel.find(x => NON[x])]});
          await regarde(cA, 800); await dd("agr5", AGR); await regarde(cC, 700); CHI.rotation.y = -1.6; await dc("chi3"); await regarde(cMq, 800); await dit("mar32"); await regarde(cC, 700); CHI.rotation.y = -.5; await dc("chi4"); await regarde(cA, 700); await dd("agr6", AGR); await visa(3); await regarde(cC, 700); await dc("chi5"); regardeVers(0, ZS); await rends(1000); cap("Le visa de Vénus est au contrat. L'ascenseur est derrière toi.", 6000); }}]}; }});

  /* ================================================================ 4. LE SOLEIL : une rotonde d'airain, soixante-douze urnes, un seul sceau à retrouver */
  G.etage(4, {astre:"le Soleil", titre:"Quatrième étage · le Soleil", service:"Service des sceaux", style:"vitrail", construit(){
    jour(0xfff0c8, 0x50381c, .95, 0xfff4d8, 1.0, 4, 16, 8); feu(0xffd060, 260, 0, 8, -18, 40);
    const airain = L(0xe0a22a), bleu = L(0x1c2a8a), rouge = L(0xb0201a), vert = L(0x0e4630), Oc = V(0, 0, -18), R = 13;
    { const t = peint(512, 512, x => { x.fillStyle = "#0c4a32"; x.fillRect(0, 0, 512, 512); x.strokeStyle = "#f2c040"; x.translate(256, 256); for(const [rr, w] of [[246, 8], [214, 4], [150, 4], [60, 6]]){ x.lineWidth = w; x.beginPath(); x.arc(0, 0, rr, 0, TAU); x.stroke(); }
        x.lineWidth = 5; for(const o of [0, Math.PI]){ x.beginPath(); for(let i = 0; i < 3; i++){ const a = o + i/3*TAU - Math.PI/2; x[i ? "lineTo" : "moveTo"](Math.cos(a)*150, Math.sin(a)*150); } x.closePath(); x.stroke(); }
        x.fillStyle = "#f2c040"; for(let i = 0; i < 72; i++){ const a = i/72*TAU; x.save(); x.rotate(a); x.fillRect(-2, -240, 4, i % 6 ? 12 : 22); x.restore(); } for(let i = 0; i < 12; i++){ const a = i/12*TAU; x.beginPath(); x.arc(Math.cos(a)*182, Math.sin(a)*182, 9, 0, TAU); x.fill(); } });
      const s = maille(new THREE.CircleGeometry(R, 48), L(0xffffff, {map:t}), Oc.x, .02, Oc.z); s.rotation.x = -Math.PI/2; sol(60, 60, vert, -18, 0); }
    /* le mur rond, les trois rangs d'urnes ; la rotonde s'ouvre sur le couloir de l'ascenseur */
    { const mur = [], tab = [], ur = []; for(let i = 0; i < 24; i++){ const a = (i + .5)/24*TAU, x = Math.sin(a)*R, z = Oc.z + Math.cos(a)*R; if(Math.abs(x) < 2.6 && z > Oc.z) continue; mur.push([Math.sin(a)*(R + .9), 4.6, Oc.z + Math.cos(a)*(R + .9), 3.7, 9.2, .6, a]); for(let e = 0; e < 3; e++){ tab.push([Math.sin(a)*(R + .25), 1.1 + e*2.5, Oc.z + Math.cos(a)*(R + .25), 3.5, .14, .9, a]); ur.push([Math.sin(a)*(R + .2), 1.17 + e*2.5, Oc.z + Math.cos(a)*(R + .2), 1.5, 1.5, 1.5]); } } lot(BOITE, bleu, mur); lot(BOITE, rouge, tab);
      lot(lathe([[0, 0], [.16, 0], [.22, .1], [.3, .36], [.27, .56], [.14, .68], [.16, .76], [.2, .8], [0, .8]], 12), airain, ur); }
    bo(.6, 9.2, 13.6, -2.9, 4.6, 1.1, rouge); bo(.6, 9.2, 13.6, 2.9, 4.6, 1.1, rouge); facade(6.4, 9.2, rouge);
    /* au centre, le vase */
    cy(1.3, 1.5, .8, Oc.x, .4, Oc.z, rouge, 16); for(const a of [2.9, 3.14, 3.4]) maille(lathe([[0, 0], [.16, 0], [.22, .1], [.3, .36], [.27, .56], [.14, .68], [.16, .76], [.2, .8], [0, .8]], 12), L(0xf6f2e8), Math.sin(a)*(R + .2), 1.17, Oc.z + Math.cos(a)*(R + .2)).scale.setScalar(1.56); maille(lathe([[0, 0], [.34, 0], [.5, .25], [.72, .9], [.62, 1.4], [.3, 1.7], [.34, 1.86], [.44, 1.96], [0, 1.96]], 18), airain, Oc.x, .8, Oc.z);
    const GDS = figure({c:0xb0201a, h:1.9, x:-2.4, z:-14.2, peau:0xe6c89a, chapeau:"mitre", barbe:.3, ep:.28, bras:.8, profil:robe(1.9, .46, .25)}); vers(GDS, 0, -4);
    const pJ = V(-.4, 1.7, -10.6), cG = V(-2.4, 2, -14.2), pMq = [1.9, -12.2], cMq = V(1.9, 2.05, -12.2), URN = V(Math.sin(1.7)*(R + .2), 1.6, Oc.z + Math.cos(1.7)*(R + .2)), pU = V(8.4, 1.7, -17.2);
    const sceaux = () => { const vrai = D.SCEAU, a = vrai.replace('<circle cx="18" cy="22" r="2.4"/><circle cx="42" cy="36" r="2.4"/>', '<circle cx="18" cy="42" r="2.4"/><circle cx="42" cy="22" r="2.4"/>').replace("M30 8v14M24 14h12", "M30 8v14M24 11h12M24 17h12"), b = vrai.replace("M18 42c8 6 16 6 24-6", "M18 42c8-8 16-8 24 0").replace("M26 34l8 8M34 34l-8 8", "M30 32v8"), c = vrai.replace("M12 22h36M18 22v20M42 22v14", "M12 22h36M18 22v14M42 22v20").replace("M18 42c8 6 16 6 24-6", "M42 42c-8 6-16 6-24-6");
      return [{id:"a", html:a}, {id:"vrai", html:vrai}, {id:"b", html:b}, {id:"c", html:c}]; };
    return {marq:[1.6, -8.6], obst:[[Oc.x, Oc.z, 1.9], [-2.4, -14.2, .8]], regle:(nx, nz) => { if(nz > -7.3) return [clamp(nx, -2, 2), nz]; const dx = nx - Oc.x, dz = nz - Oc.z, d = Math.hypot(dx, dz); return d > 10.9 ? [Oc.x + dx/d*10.9, Oc.z + dz/d*10.9] : [nx, nz]; },
      curio:[[-8, -22, 3, "Chaque urne porte un sceau et un grade. Rois en haut, comtes en bas : même ici, on range par indice."], [0, -27, 3.4, "Trois urnes sont blanches. Pas vides : blanches."]],
      pas:[
        {id:"garde", pos:V(-.8, 0, -11), r:3.8, label:"Approcher du Garde des Sceaux", run:async () => { placeM(pMq[0], pMq[1], -2.4, -14.2); await vient(pJ.x, pJ.z, cG); for(const id of ["gds1", "gds2", "gds3", "gds4"]) await dd(id, GDS); await regarde(cMq, 800); await dit("mar33"); await regarde(cG, 800); await dd("gds5", GDS); await rends(800); cap("Le sceau du Marquis est à l'article 4 de ton contrat. Les urnes des marquis sont sur la droite.", 7000); }},
        {id:"sceau", pos:V(8.6, 0, -16.6), r:3.6, label:"Chercher le sceau", run:async () => { await vient(pU.x, pU.z, URN, 1100);
          await panneau({eye:"Service des sceaux · rang des marquis", titre:"Lequel est le sien ?", consigne:`Le sceau de l'article 4 : ${D.SCEAU.replace('width="54" height="54"', 'width="40" height="40" style="vertical-align:middle"')} Pose la main sur le même.`, grille:true, bon:["vrai"], options:sceaux(), faux:() => "<b>Le Garde des Sceaux :</b> Ce n'est pas lui. Celui-là dort. Laissez-le dormir."});
          Son.note(220, .14, 2.2, "sine", 440); tw(700, k => U.uSec.value = Math.sin(k*Math.PI)*.35, k => k); await tend(1000); placeM(6.6, -14.4, pU.x, pU.z); const cM2 = V(6.6, 2.05, -14.4); await regarde(cM2, 1100); await dit("mar34"); await attends(800); await tw(600, k => MARQ.userData.bras[1].rotation.x = -k*1.5);
          await regarde(V(-6, 6, -26), 1600); await dit("mar35"); tw(600, k => MARQ.userData.bras[1].rotation.x = -(1 - k)*1.5); await regarde(cM2, 1200); await dit("mar36"); await attends(500); await dit("mar37"); J.x = 5; J.z = -13.4; await plan(1500, V(5, 1.7, -13.4), cG); await dd("gds6", GDS); await visa(4);
          /* l'Audit passe : une urne de moins */
          const UA = V(Math.sin(-1.45)*(R + .2), 1.6, Oc.z + Math.cos(-1.45)*(R + .2)); AUD.visible = true; AUD.position.set(-9.6, 0, -24); const marche = va(AUD, UA.x + 1.9, UA.z + .2, 2); tw(1600, k => U.uSombre.value = k*.7); Son.note(41, .16, 6, "sine", 39); await plan(1800, V(5, 1.7, -13.4), V(UA.x, 1.8, UA.z)); await marche; vers(AUD, UA.x, UA.z);
          await tw(350, k => AUD.userData.bras[1].rotation.x = -k*1.5); Son.tampon(); U.uEP.value.copy(UA); tw(300, k => U.uSec.value = Math.sin(k*Math.PI)*.5, k => k); tw(2200, k => U.uEf.value = k*1.9, k => 1 - (1 - k)*(1 - k)); tw(500, k => AUD.userData.bras[1].rotation.x = -(1 - k)*1.5); await attends(1500); await dit("aud7"); await regarde(cG, 900); await dd("gds7", GDS);
          await regarde(V(AUD.position.x, 1.5, AUD.position.z), 900); await tourneVers(AUD, 5, -13.4, 600); await dit("aud8"); va(AUD, -9.6, -24, 2.4).then(() => AUD.visible = false); await attends(1800); tw(1800, k => U.uSombre.value = .7*(1 - k)); regardeVers(0, ZS); await rends(1000); cap("Le visa du Soleil est au contrat. L'ascenseur est au bout du couloir.", 6000); }}]}; }});

  etagesHauts(G, O, dd);
}
