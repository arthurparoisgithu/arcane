/* ===== Arcanes · Magie : Sans suite, les étages du haut (Mars, Jupiter, Saturne) et les quatre fins ===== */
export function etagesHauts(G, O, dd){
  const {THREE, S, U, M, L, B, V, TAU, lerp, clamp, rng, ZS, bo, cy, lot, peint, plaque, lathe, figure, vers, va, tourneVers, regardeVers, tw, attends, plan, rends, dit, geste, tend, panneau, cap, Son, MARQ, AUD, visa, J, etat, ajoute, finJeu} = G;
  const {sol, jour, feu, lotC, facade, robe, maille, vient, regarde, placeM, affiche, BOITE} = O;

  /* ================================================================ 5. MARS : une salle d'instruction. Ici, on ne plaisante pas. */
  G.etage(5, {astre:"Mars", titre:"Cinquième étage · Mars", service:"Service du contentieux", style:"bois", construit(){
    jour(0xffffff, 0x0c0c0c, .3, 0xffffff, 2.3, 6, 11, 6); feu(0xffffff, 70, 0, 4.6, -18.5, 16);
    const clair = L(0xeae6da), noir = L(0x181614), gris = L(0x8c867a), rouge = B(0xd0180e), r = rng(51);
    { const t = peint(128, 128, x => { x.fillStyle = "#e6e0d0"; x.fillRect(0, 0, 128, 128); x.fillStyle = "#3a342c"; for(let i = 0; i < 4; i++) x.fillRect(i*32, 0, 2, 128); }); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(8, 1); sol(16, 36, L(0xffffff, {map:t}), -9.6); }
    bo(.6, 7, 36, -7.8, 3.5, -9.6, clair); bo(.6, 7, 36, 7.8, 3.5, -9.6, clair); facade(16.2, 7, clair);
    /* le mur du fond : des noms, du sol au plafond */
    { const t = peint(512, 256, x => { x.fillStyle = "#ebe6d8"; x.fillRect(0, 0, 512, 256); x.fillStyle = "#1c1814"; for(let y = 8; y < 250; y += 9){ let px = 6 + r()*8; while(px < 500){ const w = 14 + r()*34; x.fillRect(px, y, w, 2.4); px += w + 5 + r()*7; } } }); const m = maille(new THREE.PlaneGeometry(15, 7), L(0xffffff, {map:t}), 0, 3.5, -27.2); bo(15.6, 7, .4, 0, 3.5, -27.5, clair); m.position.z = -27.28; }
    lot(BOITE, noir, [-2, -8, -14, -20, -26].map(z => [0, 6.7, z, 15.6, .5, .6]));
    /* les dossiers : sur chaque dos, un ruban rouge */
    { const li = [], ru = []; for(const s of [-1, 1]) for(const z of [-2, -7.2, -12.4, -17.6, -22.8]) for(let e = 0; e < 4; e++){ li.push([s*7.3, .55 + e*1.35, z, .5, .08, 4.4]); let x = -2; while(x < 2){ const w = .16 + r()*.2, h = .8 + r()*.35; li.push([s*7.25, .6 + e*1.35 + h/2, z + x, .42, h, w]); if(r() < .4) ru.push([s*7.03, .6 + e*1.35 + h*.6, z + x, .02, .1, w]); x += w + .05; } } lot(BOITE, noir, li); lot(BOITE, rouge, ru); }
    /* l'estrade, le bureau du juge, la barre et son cordon rouge, le tabouret */
    bo(10, .8, 5, 0, .4, -24.2, noir); bo(5.6, 1.7, 1.1, 0, 1.65, -22.4, noir); bo(5.9, .12, 1.3, 0, 2.55, -22.4, clair); { const s = cy(.34, .34, .06, 0, 1.75, -21.82, rouge, 20); s.rotation.x = Math.PI/2; }
    bo(.5, .1, .36, -1.3, 2.66, -22.3, clair); bo(.5, .1, .36, -1.26, 2.76, -22.3, clair); bo(.5, .1, .36, 1.4, 2.66, -22.3, clair);
    for(const x of [-3.4, 3.4]){ cy(.07, .09, 1.1, x, .55, -16.6, noir, 8); maille(new THREE.SphereGeometry(.11, 8, 6), noir, x, 1.14, -16.6); } bo(6.8, .07, .07, 0, 1, -16.6, rouge); cy(.26, .22, .5, 0, .25, -14.4, gris, 10);
    lot(BOITE, gris, [-4, -7.4, -10.8].flatMap(z => [[-4.3, .26, z, 4.2, .12, .7], [4.3, .26, z, 4.2, .12, .7], [-4.3, .12, z, 3.8, .24, .16], [4.3, .12, z, 3.8, .24, .16]]));
    const INS = figure({c:0x141214, h:1.9, x:0, z:-23.4, peau:0xd8d0c4, chapeau:"toque", ep:.3, bras:.86, devant:{plastron:0xf2f0ea}, profil:robe(1.9, .46, .27), sansOmbre:true}); INS.position.y = 1.35;
    const cI = V(0, 3.3, -23.4), pMq = [2.5, -12.2], cMq = V(2.5, 2.05, -12.2);
    return {marq:[2.6, -8.4], regle:(nx, nz) => [clamp(nx, -6.2, 6.2), Math.max(nz, -15.8)],
      curio:[[-5.6, -8, 2.8, "Des dossiers, du sol au plafond. Sur chaque dos, un nom. Aucun n'a été donné de bon cœur."], [5.6, -8, 2.8, "Des formulaires imprimés. Il ne restait qu'à remplir les blancs."]],
      pas:[{id:"barre", pos:V(0, 0, -13.2), r:3.8, label:"Avancer jusqu'à la barre", run:async () => { placeM(pMq[0], pMq[1], 0, -23); await vient(0, -13.8, cI, 1500); await attends(700);
        for(const id of ["ins1", "ins2", "ins3", "ins4", "ins5"]) await dd(id, INS); await attends(1100); await dd("ins6", INS);
        let g = await geste([["Montrer le Marquis", "haut"], ["Secouer la tête", "non"], ["Se taire", "rien"]]);
        if(g === 0){ await dd("ins7", INS); await regarde(cMq, 800); await dit("mar38"); await regarde(cI, 800); await geste([["Secouer la tête", "non"], ["Se taire", "rien"]]); }
        await attends(1500); await dd("ins8", INS); await dd("ins9", INS); await attends(700); await dd("ins10", INS); await regarde(cMq, 900); await dit("mar39"); await regarde(cI, 900);
        await tw(400, k => INS.userData.bras[1].rotation.x = -k*1.3); await dd("ins11", INS); tw(400, k => INS.userData.bras[1].rotation.x = -(1 - k)*1.3); await visa(5); regardeVers(0, ZS); await rends(1000); cap("Le visa de Mars est au contrat. Tu peux sortir.", 6000); }}]}; }});

  /* ================================================================ 6. JUPITER : le cabinet de Dee et Kelley, en ombres chinoises */
  G.etage(6, {astre:"Jupiter", titre:"Sixième étage · Jupiter", service:"Service des communications célestes", style:"ombres", construit(){
    jour(0xffffff, 0x404048, .7, 0xffffff, .8, 0, 10, 10);
    const n = L(0x22222c), feuB = B(0xfffbe6), T = V(0, 0, -13);
    sol(160, 160, n, -30);
    /* la table sainte, la pierre, quatre cierges */
    bo(2.5, .12, 2.5, T.x, 1, T.z, n); for(const sx of [-1, 1]) for(const sz of [-1, 1]){ bo(.14, 1, .14, T.x + sx*1.05, .5, T.z + sz*1.05, n); cy(.03, .03, .5, T.x + sx*.95, 1.31, T.z + sz*.95, n, 5); const f = maille(new THREE.SphereGeometry(.06, 8, 6), feuB, T.x + sx*.95, 1.63, T.z + sz*.95); f.scale.y = 1.8; }
    cy(.12, .2, .2, T.x, 1.16, T.z, n, 10); const pierre = maille(new THREE.SphereGeometry(.2, 16, 12), feuB, T.x, 1.45, T.z); { const d = cy(.5, .5, .03, T.x, 1.075, T.z, n, 20); }
    /* derrière : une grande baie à remplage ; sur les côtés, des étagères, une sphère armillaire, un globe ; au plafond, un crocodile */
    { const li = []; for(const x of [-3.3, 3.3]) li.push([x, 3.6, -22, .3, 7.2, .3]); for(const x of [-1.1, 1.1]) li.push([x, 3.6, -22, .12, 7.2, .12]); for(const y of [2.4, 4.8, 7.2]) li.push([0, y, -22, 6.6, .12, .12]); lot(BOITE, n, li);
      const a = maille(new THREE.TorusGeometry(3.3, .15, 6, 24, Math.PI), n, 0, 7.2, -22); const c = maille(new THREE.TorusGeometry(1, .08, 6, 20), n, 0, 8.6, -22); for(const s of [-1, 1]){ const q = maille(new THREE.TorusGeometry(1.1, .06, 6, 16, Math.PI), n, s*1.1, 7.2, -22); q.scale.y = 1.3; } }
    { const li = []; for(const s of [-1, 1]){ for(const z of [-11, -17]){ li.push([s*6.4, 2.6, z, .14, 5.2, .14]); } for(let e = 0; e < 4; e++){ li.push([s*6.4, .9 + e*1.3, -14, .5, .08, 6.2]); for(let i = 0; i < 7; i++) li.push([s*6.4, 1.25 + e*1.3 - (i % 3 ? 0 : .12), -16.6 + i*.82, .34, i % 3 ? .62 : .36, .16 + (i % 2)*.14]); } } lot(BOITE, n, li); }
    cy(.06, .3, 1.5, -4.4, .75, -16.4, n, 8); for(const [rx, rz] of [[0, 0], [1.2, .4], [.5, 1.3]]){ const t = maille(new THREE.TorusGeometry(.7, .03, 5, 24), n, -4.4, 2.2, -16.4); t.rotation.set(rx, 0, rz); } maille(new THREE.SphereGeometry(.16, 10, 8), n, -4.4, 2.2, -16.4);
    cy(.08, .34, 1, 4.5, .5, -15.6, n, 8); maille(new THREE.SphereGeometry(.6, 16, 12), n, 4.5, 1.55, -15.6); { const t = maille(new THREE.TorusGeometry(.72, .03, 5, 24), n, 4.5, 1.55, -15.6); t.rotation.x = 1.2; }
    { const c = new THREE.Group(), P = (geo, x, y, z, sx, sy, sz, rz = 0) => { const q = new THREE.Mesh(geo, n); q.position.set(x, y, z); q.scale.set(sx, sy, sz); q.rotation.z = rz; c.add(q); };
      P(BOITE, 0, 0, 0, 2, .34, .4); P(BOITE, 1.35, .02, 0, .9, .2, .3); P(new THREE.ConeGeometry(1, 1, 6), -1.75, 0, 0, .17, 1.6, .17, Math.PI/2); for(const x of [-.6, .6]) for(const s of [-1, 1]) P(BOITE, x, -.22, s*.28, .12, .3, .12); for(const x of [-.7, .9]) P(BOITE, x, 4, 0, .03, 8, .03); c.position.set(1.6, 4.9, -9.6); c.rotation.y = .5; ajoute(c); }
    const DEE = figure({c:0x18181e, h:1.84, x:-2.2, z:-13.5, peau:0x30303a, chapeau:"calotte", barbe:.52, ep:.27, bras:.8, profil:robe(1.84, .44, .24)}); vers(DEE, 0, -6);
    const KEL = figure({c:0x18181e, h:1.6, x:2.2, z:-13.1, peau:0x30303a, chapeau:"calotte", tete:.13, ep:.25, bras:.7, profil:robe(1.6, .36, .23)}); vers(KEL, 0, -6); KEL.rotation.x = .1;
    const pJ = V(0, 1.7, -9.4), cD = V(-2.2, 1.95, -13.5), cK = V(2.2, 1.7, -13.1), cP = V(0, 1.45, -13), pMq = [-2.6, -8.4], cMq = V(-2.6, 2.05, -8.4);
    return {marq:[-2.8, -5.6], obst:[[T.x, T.z, 2], [-2.2, -13.5, .7], [2.2, -13.1, .7]], regle:(nx, nz) => [clamp(nx, -5.6, 5.6), Math.max(nz, -19.6)],
      curio:[[-4.4, -13.6, 2.4, "Une sphère armillaire. Le ciel, en modèle réduit, avec des vis."], [3.4, -8.6, 2.6, "Un crocodile pendu au plafond. Tout cabinet sérieux en a un. Personne ne sait pourquoi."]],
      pas:[
        {id:"table", pos:V(0, 0, -9), r:3.6, label:"Approcher de la table", run:async () => { await vient(pJ.x, pJ.z, cD); await dd("dee1", DEE); await regarde(cK, 800); await dd("kel1", KEL); await regarde(cD, 800); await dd("dee2", DEE); await regarde(cK, 800); await dd("kel2", KEL); await regarde(cP, 900); await dd("dee3", DEE); await rends(700); }},
        {id:"pierre", pos:V(0, 0, -10.2), r:2.9, label:"Regarder dans la pierre", run:async () => { placeM(pMq[0], pMq[1], 0, -13); J.x = 0; J.z = -10.6; await plan(1500, V(0, 1.62, -11.2), cP); regardeVers(0, -13);
          for(const l of "ERVUO"){ Son.note(520 + Math.random()*300, .08, .6); tw(500, k => pierre.scale.setScalar(1 + Math.sin(k*Math.PI)*.5), k => k); await affiche(l, 950); await attends(250); }
          await panneau({eye:"Service des communications célestes · la pierre", titre:"À l'endroit", consigne:"Les anges ont dicté le mot à l'envers : E, R, V, U, O. Touche les lettres dans le bon ordre.", ordre:true, n:5, grille:true, bon:["O", "U", "V", "R", "E"], options:[..."ERVUO"].map(l => ({id:l, html:l})), faux:() => "<b>Kelley :</b> À l'endroit, cette fois. Enfin : à l'envers de l'envers."});
          tw(900, k => U.uSec.value = Math.sin(k*Math.PI)*.4, k => k); Son.note(660, .1, 2.4); await attends(700); await dit("ang10"); await plan(1100, pJ, cD); J.z = pJ.z; await dd("dee4", DEE); await regarde(cK, 800); await dd("kel3", KEL); await regarde(cMq, 1000); await dit("mar40");
          await regarde(cD, 900); await dd("dee5", DEE); await visa(6); await regarde(cK, 800); await dd("kel4", KEL); await regarde(cD, 700); await dd("dee6", DEE); await regarde(cK, 700); await dd("kel5", KEL); regardeVers(0, ZS); await rends(1000); cap("Le visa de Jupiter est au contrat. Il ne reste qu'un étage.", 6000); }}]}; }});

  /* ================================================================ 7. SATURNE : la Direction, à l'aube. Tout est déjà à moitié classé. */
  G.etage(7, {astre:"Saturne", titre:"Septième étage · Saturne", service:"La Direction", style:"deco", aube:1, construit(){
    U.uBlanc.value = .3; const soleil = jour(0xffe6cc, 0x3a3a48, 1.5, 0xffd0a0, 2.2, 12, 5, -14);
    const marbre = L(0x2a2c36), drap = L(0xf0ece2), sombre = L(0x6a6c78), noir = M.noir;
    sol(22, 66, marbre, -25.6); bo(22, .5, 66, 0, 6.25, -25.6, sombre); bo(.6, 6, 66, -10.8, 3, -25.6, sombre); bo(.6, 1.2, 46.4, 10.8, .6, -15.8, sombre); bo(.6, 1, 46.4, 10.8, 5.5, -15.8, sombre); facade(22, 6, sombre);
    { const pil = [], men = []; for(let z = 3; z >= -37; z -= 8){ for(const s of [-1, 1]){ pil.push([s*10.1, 3, z, 1.4, 6, 1.2]); pil.push([s*9.8, 5.3, z, 2, .5, 1.6]); } } for(let z = 5; z >= -38; z -= 2){ men.push([10.6, 3.1, z, .12, 3.9, .12]); } men.push([10.6, 3.1, -15.8, .12, .12, 46]); lot(BOITE, L(0x9a9ca6), pil); lot(BOITE, M.laiton, men); }
    /* les bureaux sous leurs housses, les classeurs */
    { const li = [], cl = []; for(const x of [-4.6, 4.6]) for(let z = -3; z >= -30; z -= 5.4){ li.push([x, .5, z, 2.3, 1, 1.15]); li.push([x, .6, z + 1.2, .62, 1.2, .62]); } lot(BOITE, drap, li); for(let z = 1; z >= -36; z -= 1.3) cl.push([-10.1, 1, z, .8, 2, 1.2]); lot(BOITE, noir, cl); }
    /* le mur de la Direction : une double porte */
    bo(8.8, 6, .5, -6.4, 3, -39, sombre); bo(8.8, 6, .5, 6.4, 3, -39, sombre); bo(4, 2.5, .5, 0, 4.75, -39, sombre); plaque("DIRECTION", 3.2, .7, 0, 4.2, -38.7, 0, {k:.5});
    const battants = [-1, 1].map(s => { const g = new THREE.Group(); g.position.set(s*2, 0, -39); const p = new THREE.Mesh(BOITE, M.porte); p.scale.set(2, 3.5, .12); p.position.set(-s, 1.75, 0); const q = new THREE.Mesh(BOITE, M.laiton); q.scale.set(.1, .5, .2); q.position.set(-s*1.75, 1.6, .1); g.add(p, q); ajoute(g); return g; });
    let ouvertD = false; const portes = k => { battants[0].rotation.y = -k*1.75; battants[1].rotation.y = k*1.75; ouvertD = k > .5; };
    /* le bureau du Directeur : une table, un fauteuil vide, une note, une baie sur l'aube */
    bo(.5, 6, 13.6, -5.2, 3, -45.8, sombre); bo(.5, 6, 13.6, 5.2, 3, -45.8, sombre); bo(10.4, 1, .4, 0, .5, -52.4, sombre); bo(10.4, .8, .4, 0, 5.6, -52.4, sombre); lot(BOITE, M.laiton, [-3.4, -1.7, 0, 1.7, 3.4].map(x => [x, 3.1, -52.4, .12, 4.4, .12]));
    bo(3.4, 1, 1.5, 0, .5, -47.6, noir); bo(3.6, .08, 1.7, 0, 1.04, -47.6, M.laiton); bo(1, 1.9, .22, 0, .95, -49.5, noir); bo(1, .14, .9, 0, .56, -49.1, noir); const note = bo(.34, .02, .24, .35, 1.1, -47.3, M.ivoire, .2); bo(3, .06, 4.6, 0, .03, -46.4, M.rouge);
    AUD.visible = true; AUD.position.set(0, 0, -35.4); vers(AUD, 0, ZS);
    const cAu = V(0, 1.55, -35.4), pB = V(0, 1.7, -43.4), pMb = [-1.9, -45.3], cMb = V(-1.9, 2.05, -45.3), pAb = [1.8, -45.5], cAb = V(1.8, 1.5, -45.5);
    const scene = () => { portes(1); J.x = pB.x; J.z = pB.z; placeM(pMb[0], pMb[1], pB.x, pB.z); AUD.visible = true; AUD.position.set(pAb[0], 0, pAb[1]); vers(AUD, pB.x, pB.z); };
    const noirci = ms => tw(ms, k => U.uNoir.value = k), FINS = {
      non:async () => { await regarde(cAb, 800); await tw(500, k => AUD.userData.bras[1].rotation.x = -(1 - k)*1.5); await dit("aud16"); await attends(700); Son.tampon(); tw(300, k => U.uSec.value = Math.sin(k*Math.PI)*.5, k => k); await tend(1200); await dit("aud17"); await regarde(cMb, 900); await dit("mar46"); await attends(600); await noirci(2600);
        return finJeu("refus", "Le refus", "Tu te réveilles. Sur la table, ta demande, tamponnée : « sans suite ». Le Bureau, lui, est resté fermé."); },
      ouvre:async () => { Son.note(55, .3, 7, "sawtooth", 220); tw(5200, k => { U.uBlanc.value = lerp(.5, 1.2, k); U.uSec.value = k*.22; soleil.intensity = 2.2 + k*3; }); await attends(1800); await regarde(cAb, 900); await tw(500, k => AUD.userData.bras[1].rotation.x = -(1 - k)*1.5); await dit("aud18"); await tw(700, k => AUD.position.y = -k*.42); await dit("aud19");
        await regarde(cMb, 900); await dit("mar47"); await regarde(V(0, 3, -52), 1600); Son.note(880, .08, 4); await tw(3200, k => U.uSec.value = .22 + k*.78);
        return finJeu("vase", "Le vase", "Le vase est ouvert. Dehors, il fait jour. Soixante-dix esprits cherchent du travail, et quelque chose, quelque part, recommence à y croire."); },
      nom:async () => { await regarde(cMb, 800); Son.note(110, .14, 2.5, "sine", 82); await tw(900, k => { MARQ.position.y = -k*.38; MARQ.userData.tete.rotation.x = k*.5; }); await dit("mar48"); await attends(900); await dit("mar49"); await regarde(cAb, 900); tw(500, k => AUD.userData.bras[1].rotation.x = -(1 - k)*1.5); await dit("aud20");
        await regarde(cMb, 900); await tw(700, k => { MARQ.position.y = -(1 - k)*.38; MARQ.userData.tete.rotation.x = (1 - k)*.5; }); await dit("mar50"); await attends(600); await noirci(2600);
        return finJeu("conseiller", "Le conseiller", "Tu te réveilles. Il y a un très grand monsieur à monocle dans ta cuisine. Il a fait du café. Il dit que c'est contractuel."); },
      rien:async () => { await regarde(cAb, 800); await attends(1400); await dit("aud21"); await tw(300, k => AUD.userData.bras[1].rotation.x = -1.5 - k*.4); Son.tampon(); tw(300, k => U.uSec.value = Math.sin(k*Math.PI)*.6, k => k); await tw(3200, k => U.uBlanc.value = lerp(.5, 1.35, k)); await attends(600); await dit("mar51"); await tw(2400, k => U.uSec.value = k*.9);
        return finJeu("sanssuite", "Sans suite", "Qui ne dit mot consent. Guichet 31, service des philtres : tu as une visière, un tampon, et l'éternité pour apprendre à t'en servir."); }};
    return {marq:[-2.2, -5.4], regle:(nx, nz) => { nx = clamp(nx, -9, 9); if(!ouvertD) return [nx, Math.max(nz, -37.4)]; if(nz < -37.4){ nx = clamp(nx, nz < -40.2 ? -4 : -1.3, nz < -40.2 ? 4 : 1.3); nz = Math.max(nz, -45.6); } return [nx, nz]; },
      obst:[-3, -8.4, -13.8, -19.2, -24.6, -30].flatMap(z => [[-4.6, z + .3, 1.7], [4.6, z + .3, 1.7]]),
      curio:[[-4.6, -3, 2.9, "Service des talismans : classé."], [4.6, -8.4, 2.9, "Astrologie judiciaire : classée. Le thème de naissance du service est resté sur la table."], [-4.6, -19.2, 2.9, "Bureau 1854, É. Lévi. Il a tout recopié au propre pour que ça tienne un siècle de plus."], [4.6, -24.6, 2.9, "Ordre de l'Aube dorée, 1888. Un dossier épais. Beaucoup de costumes."]],
      pas:[
        {id:"auditeur", pos:V(0, 0, -30.6), r:4.2, label:"Approcher de l'Auditeur", fait:() => { portes(1); AUD.position.set(2.7, 0, -36.6); vers(AUD, 0, -31); }, run:async () => { placeM(-2.3, -30.2, 0, -35.4); await vient(0, -31, cAu, 1400); for(const id of ["aud9", "aud10", "aud11"]) await dit(id); await attends(900); await dit("aud12");
          va(AUD, 2.7, -36.6, 1.4).then(() => vers(AUD, 0, -31)); Son.souffle(.3, 1.2, 300); await Promise.all([tw(2200, k => portes(k)), regarde(V(0, 1.6, -47), 2200)]); await rends(900); cap("La porte de la Direction est ouverte.", 5000); }},
        {id:"bureau", pos:V(0, 0, -42), r:3.6, label:"Entrer dans le bureau du Directeur", fait:scene, run:async () => { placeM(pMb[0], pMb[1], pB.x, pB.z); await vient(pB.x, pB.z, V(0, 1.4, -49.3), 1600); await attends(1400); await plan(1400, V(.2, 1.7, -45.6), V(.35, 1.1, -47.3)); note.visible = false; tend(2400); await attends(500); await dit("dir2");
          await plan(1200, pB, cMb); await dit("mar41"); await attends(900); await dit("mar42"); await dit("mar43"); await attends(1100); await dit("mar44");
          AUD.position.set(0, 0, -40.4); const entre = va(AUD, pAb[0], pAb[1], 1.6); await regarde(V(1, 1.5, -43), 1100); await entre; await tourneVers(AUD, pB.x, pB.z, 500); await regarde(cAb, 700); await dit("aud13"); await visa(7);
          Son.note(98, .14, 6, "sine", 131); tw(4200, k => { U.uBlanc.value = lerp(.3, .5, k); soleil.intensity = 2.2 + k; }); await regarde(V(0, 3.2, -52.4), 1800); await attends(900); await regarde(cAb, 1100); await dit("aud14"); await tw(500, k => AUD.userData.bras[1].rotation.x = -k*1.5); await dit("aud15"); await regarde(cMb, 900); await dit("mar45"); }},
        {id:"mot", run:async () => { scene(); U.uBlanc.value = .5; AUD.userData.bras[1].rotation.x = -1.5; await plan(900, pB, V(0, 1.7, -46.6)); regardeVers(0, -46.6);
          const c = (await panneau({eye:"Septième étage · l'aube", titre:"Un mot", consigne:"Tu n'as rien dit depuis l'ascenseur. Tout ce qui se dit ici engage. Tu n'en as qu'un.", options:[{id:"non", html:"« Non. »"}, {id:"ouvre", html:"« Ouvre. »"}, {id:"nom", html:"« Marchosias. »"}, {id:"rien", html:"Ne rien dire."}]}))[0];
          if(c !== "rien"){ Son.note(147, .22, 1.8, "sawtooth", 139); Son.note(73, .2, 2, "sine"); tw(500, k => U.uSec.value = Math.sin(k*Math.PI)*.3, k => k); await affiche({non:"Non.", ouvre:"Ouvre.", nom:"Marchosias."}[c], 2300, "bq-mot"); } else await attends(2000);
          await FINS[c](); }}]}; }});
}
