/* ===== Arcanes · Astrologie : Le ciel qui tourne =====
   Le jeu de l'univers astrologie. Premier niveau, prototype : Alexandrie, vers l'an 150, avec Claude Ptolémée.
   Ce fichier est la source lisible ; il est compilé avec Three.js en un seul fichier, ciel.min.js (voir build.sh).
   Déroulé : la sphère armillaire se dessine → on observe Mars nuit après nuit, il recule → on construit l'épicycle
   qui reproduit sa boucle → les planètes dessinent leurs rosaces → Ptolémée pose trois questions, chacune ouvre un volet. */
import * as THREE from "three";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer.js";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass.js";
import {UnrealBloomPass} from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import {OutputPass} from "three/examples/jsm/postprocessing/OutputPass.js";
import {RoomEnvironment} from "three/examples/jsm/environments/RoomEnvironment.js";
import {Line2} from "three/examples/jsm/lines/Line2.js";
import {LineMaterial} from "three/examples/jsm/lines/LineMaterial.js";
import {LineGeometry} from "three/examples/jsm/lines/LineGeometry.js";

/* ---------------------------------------------------------------- les mouvements */
const TAU = Math.PI*2, DEG = Math.PI/180, OBL = 23.44*DEG;
const ease = {out:t => 1 - Math.pow(1 - t, 3), inOut:t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3)/2, expo:t => t === 1 ? 1 : 1 - Math.pow(2, -10*t), back:t => { const c = 1.6; return 1 + (c + 1)*Math.pow(t - 1, 3) + c*Math.pow(t - 1, 2); }};
const lerp = (a, b, t) => a + (b - a)*t, clamp = (x, a, b) => Math.max(a, Math.min(b, x));
let anims = [];
const tw = (ms, fn, e = ease.inOut) => new Promise(res => anims.push({t0:performance.now(), ms, fn, e, res}));
const attends = ms => new Promise(r => setTimeout(r, ms));
function stepAnims(now){ anims = anims.filter(a => { const t = clamp((now - a.t0)/a.ms, 0, 1); a.fn(a.e(t), t); if(t >= 1){ a.res(); return false; } return true; }); }

/* le ciel héliocentrique simplifié : des cercles, une inclinaison. Assez pour que Mars recule comme dans le vrai ciel. */
const PLANETES = {venus:{a:.7233, T:.61520, i:3.39, c:"#f4e2b0"}, mars:{a:1.5237, T:1.8809, i:1.85, c:"#ff8a5c"}, jupiter:{a:5.2026, T:11.862, i:1.3, c:"#e8c486"}, saturne:{a:9.5549, T:29.457, i:2.49, c:"#cfc3e8"}};
const PHI = {mars:Math.PI - Math.PI/1.8809, venus:.6, jupiter:2.2, saturne:4.1};
function geo(id, t){ const p = PLANETES[id], th = TAU*t/p.T + PHI[id], te = TAU*t;
  const x = p.a*Math.cos(th) - Math.cos(te), y = p.a*Math.sin(th) - Math.sin(te), z = p.a*Math.sin(p.i*DEG)*Math.sin(th - 2.1); return [x, y, z]; }
const eclip = (x, y, z) => [Math.atan2(y, x), Math.atan2(z, Math.hypot(x, y))];

/* ---------------------------------------------------------------- le son, tout synthétisé */
const Son = (() => { let ac = null, maitre = null, nappe = null, on = true;
  const init = () => { if(ac) return; try{ ac = new (window.AudioContext || window.webkitAudioContext)(); maitre = ac.createGain(); maitre.gain.value = .55; maitre.connect(ac.destination);
      const rev = ac.createConvolver(), n = ac.sampleRate*3.2, b = ac.createBuffer(2, n, ac.sampleRate); for(let c = 0; c < 2; c++){ const d = b.getChannelData(c); for(let i = 0; i < n; i++) d[i] = (Math.random()*2 - 1)*Math.pow(1 - i/n, 2.6); } rev.buffer = b; const rg = ac.createGain(); rg.gain.value = .5; rev.connect(rg); rg.connect(maitre); Son.rev = rev; }catch(e){ ac = null; } };
  const note = (f, dur = 2.2, v = .12, type = "sine", quand = 0) => { if(!ac || !on) return; const t = ac.currentTime + quand, o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .015); g.gain.exponentialRampToValueAtTime(.0001, t + dur); o.connect(g); g.connect(maitre); g.connect(Son.rev); o.start(t); o.stop(t + dur + .1);
    const o2 = ac.createOscillator(), g2 = ac.createGain(); o2.frequency.value = f*2.76; g2.gain.setValueAtTime(0, t); g2.gain.linearRampToValueAtTime(v*.18, t + .01); g2.gain.exponentialRampToValueAtTime(.0001, t + dur*.4); o2.connect(g2); g2.connect(maitre); g2.connect(Son.rev); o2.start(t); o2.stop(t + dur); };
  const GAMME = [220, 247.5, 277.2, 330, 370.7, 440, 495, 554.4, 660, 741.5, 880];
  return {init, note, GAMME, set on(v){ on = v; if(maitre) maitre.gain.value = v ? .55 : 0; }, get on(){ return on; },
    carillon(k){ note(GAMME[k % GAMME.length], 2.6, .1); },
    tic(k){ note(GAMME[(k*3) % 7 + 3], .5, .035, "triangle"); },
    accord(){ [220, 277.2, 330, 440, 554.4].forEach((f, i) => note(f, 4.5, .07, "sine", i*.09)); },
    faux(){ note(196, 1.2, .07, "triangle"); note(185, 1.2, .05, "triangle", .08); },
    nappe(v){ init(); if(!ac) return; if(!nappe){ nappe = ac.createGain(); nappe.gain.value = 0; nappe.connect(maitre); nappe.connect(Son.rev); [55, 82.5, 110, 164.8].forEach((f, i) => { const o = ac.createOscillator(), g = ac.createGain(), l = ac.createOscillator(), lg = ac.createGain(); o.type = i ? "sine" : "triangle"; o.frequency.value = f; g.gain.value = [.09, .06, .05, .025][i]; l.frequency.value = .07 + i*.03; lg.gain.value = .02; l.connect(lg); lg.connect(g.gain); o.connect(g); g.connect(nappe); o.start(); l.start(); }); }
      nappe.gain.cancelScheduledValues(ac.currentTime); nappe.gain.linearRampToValueAtTime(on ? v : 0, ac.currentTime + 2); },
    fin(){ if(nappe && ac){ nappe.gain.linearRampToValueAtTime(0, ac.currentTime + .6); } setTimeout(() => { try{ ac && ac.close(); }catch(e){} ac = null; nappe = null; }, 900); }};
})();

/* ---------------------------------------------------------------- les textes du niveau */
const VOLETS = [
  {id:"pt1", t:"L'Almageste", q:"Pourquoi Mars semble-t-il reculer dans le ciel ?", o:["Il fait vraiment demi-tour", "Un petit cercle, porté par un grand, le ramène en arrière vu de la Terre", "Les dieux le retiennent"], ok:1,
    non:"Repense à ce que tu viens de construire : deux cercles, l'un qui roule sur l'autre.", img:"epicycle",
    txt:["Vers 150, à Alexandrie, Claude Ptolémée rassemble toute l'astronomie grecque en treize livres. Les Arabes l'appelleront <i>al-majisti</i>, « le très grand » : l'<b>Almageste</b>.", "Pour expliquer les boucles des planètes, il reprend une idée d'Apollonius et d'Hipparque : la planète tourne sur un petit cercle, l'<b>épicycle</b>, dont le centre tourne sur un grand, le <b>déférent</b>. Vue de la Terre, la planète avance, s'arrête, recule, repart.", "Il y ajoute un catalogue de 1 022 étoiles en 48 constellations, celles que l'on utilise encore."]},
  {id:"pt2", t:"Le monde de Ptolémée", q:"Pour Ptolémée, qu'y a-t-il au centre du monde ?", o:["Le Soleil", "La Terre", "Alexandrie"], ok:1,
    non:"Où étais-tu, toi, quand tu regardais Mars reculer ?", img:"monde",
    txt:["Pour Ptolémée, la Terre est immobile au centre. Autour d'elle tournent la Lune, Mercure, Vénus, le Soleil, Mars, Jupiter, Saturne, puis la sphère des étoiles.", "Le modèle est faux, mais il marche : il prédit la place des planètes à un ou deux degrés près. Pour y arriver, Ptolémée invente un point décentré, l'<b>équant</b>, autour duquel le mouvement paraît régulier.", "Il tiendra quatorze siècles. Copernic met le Soleil au centre en 1543, mais garde les cercles. Il faut attendre Kepler, en 1609, pour que les orbites deviennent des ellipses et que les épicycles disparaissent."]},
  {id:"pt3", t:"Le Tétrabible", q:"Calculer le ciel ne suffit pas à Ptolémée. Que fait son second livre ?", o:["Il en tire des présages pour chaque vie", "Il prouve que les astres n'agissent sur rien", "Il recopie les tablettes de Babylone"], ok:0,
    non:"Ptolémée te l'a dit en partant : le premier livre calcule, le second dit ce que cela signifie.", img:"roue",
    txt:["Après l'Almageste, Ptolémée écrit le <b>Tétrabible</b>, « les quatre livres ». C'est le manuel de l'astrologie savante : signes, aspects, influences des planètes sur les corps, les peuples et les vies.", "Il y distingue deux sciences. L'astronomie calcule où sont les astres, et elle est sûre. L'astrologie déduit ce qu'ils annoncent, et elle reste conjecturale, comme la médecine ou la navigation : elle peut se tromper.", "Le livre fera autorité jusqu'à la Renaissance, dans l'Islam comme en Europe. C'est pour cela que l'astrologie, pendant des siècles, s'est apprise avec des tables de calcul à la main."]},
];
const CLE = "arcanes.ciel.v1";
const lire = () => { try{ return Object.assign({faits:{}, volets:[], son:true}, JSON.parse(localStorage.getItem(CLE) || "{}")); }catch(e){ return {faits:{}, volets:[], son:true}; } };
const ecrire = s => { try{ localStorage.setItem(CLE, JSON.stringify(s)); }catch(e){} };

/* ---------------------------------------------------------------- les petites images, dessinées à la main en code */
function texteTex(txt, px = 96, couleur = "#f1d58c", police = "Georgia, 'Times New Roman', serif"){
  const c = document.createElement("canvas"), x = c.getContext("2d"); x.font = `${px}px ${police}`; const w = Math.ceil(x.measureText(txt).width) + px*.6; c.width = w; c.height = px*1.5;
  x.font = `${px}px ${police}`; x.textAlign = "center"; x.textBaseline = "middle"; x.shadowColor = couleur; x.shadowBlur = px*.25; x.fillStyle = couleur; x.fillText(txt, w/2, c.height/2); x.shadowBlur = 0; x.fillText(txt, w/2, c.height/2);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return {t, r:w/c.height}; }
function halo(couleur){ const c = document.createElement("canvas"); c.width = c.height = 128; const x = c.getContext("2d"), g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(.12, couleur); g.addColorStop(.4, couleur.replace(/[\d.]+\)$/, ".18)")); g.addColorStop(1, "rgba(0,0,0,0)"); x.fillStyle = g; x.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }
const sprite = (tex, s, op = 1) => { const m = new THREE.SpriteMaterial({map:tex, transparent:true, opacity:op, depthWrite:false, blending:THREE.AdditiveBlending}); const sp = new THREE.Sprite(m); sp.scale.set(s, s, 1); return sp; };
const ZOD = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"].map(g => g + "︎");
const SIGNES = ["Bélier", "Taureau", "Gémeaux", "Cancer", "Lion", "Vierge", "Balance", "Scorpion", "Sagittaire", "Capricorne", "Verseau", "Poissons"];

/* des points qui scintillent */
function nuage(pos, tailles, couleurs, o = {}){
  const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute("taille", new THREE.Float32BufferAttribute(tailles, 1)); g.setAttribute("couleur", new THREE.Float32BufferAttribute(couleurs, 3));
  const ph = new Float32Array(tailles.length).map(() => Math.random()*TAU); g.setAttribute("phase", new THREE.BufferAttribute(ph, 1));
  if(o.nes) g.setAttribute("ne", new THREE.Float32BufferAttribute(o.nes, 1));
  const m = new THREE.ShaderMaterial({transparent:true, depthWrite:false, blending:THREE.AdditiveBlending, uniforms:{uT:{value:0}, uPR:{value:1}, uA:{value:1}, uScint:{value:o.scint == null ? 1 : o.scint}},
    vertexShader:`attribute float taille; attribute float phase; attribute vec3 couleur; ${o.nes ? "attribute float ne;" : ""} uniform float uT, uPR, uScint; varying vec3 vC; varying float vS;
      void main(){ vC = couleur; float s = taille*(1. - uScint*.35 + uScint*.35*sin(uT*(1.3 + phase*.4) + phase*7.));
        ${o.nes ? "float age = uT - ne; if(age < 0.){ gl_Position = vec4(2.,2.,2.,1.); gl_PointSize = 0.; return; } s *= 1. + 2.2*exp(-age*5.);" : ""}
        vS = s; vec4 mv = modelViewMatrix*vec4(position, 1.); gl_Position = projectionMatrix*mv; gl_PointSize = s*uPR${o.att ? "*(30./-mv.z)" : ""}; }`,
    fragmentShader:`uniform float uA; varying vec3 vC; varying float vS; void main(){ float d = length(gl_PointCoord - .5); float a = smoothstep(.5, 0., d); a = a*a; gl_FragColor = vec4(vC*(.6 + 1.2*a), a*uA); }`});
  const p = new THREE.Points(g, m); p.frustumCulled = false; return p; }

/* une ligne épaisse, dorée, qu'on peut dessiner peu à peu */
function trait(pts, couleur, larg, o = {}){ const g = new LineGeometry(), arr = []; pts.forEach(p => arr.push(p[0], p[1], p[2] || 0)); g.setPositions(arr);
  const m = new LineMaterial({color:new THREE.Color(couleur), linewidth:larg, transparent:true, opacity:o.op == null ? 1 : o.op, dashed:!!o.tirets, dashSize:o.dash || 1, gapSize:o.gap || 1, depthWrite:false, blending:o.add === false ? THREE.NormalBlending : THREE.AdditiveBlending});
  const l = new Line2(g, m); if(o.tirets) l.computeLineDistances(); l.frustumCulled = false; l.userData.n = pts.length - 1; return l; }
const montre = (l, f) => { l.geometry.instanceCount = Math.max(0, Math.round(l.userData.n*clamp(f, 0, 1))); };
function remplace(l, pts){ const arr = []; pts.forEach(p => arr.push(p[0], p[1], p[2] || 0)); l.geometry.dispose(); l.geometry = new LineGeometry(); l.geometry.setPositions(arr); l.userData.n = pts.length - 1; if(l.material.dashed) l.computeLineDistances(); }

/* ================================================================ le jeu */
export function ouvrir(opt = {}){
  if(document.querySelector(".cq")) return;
  const st = lire(); Son.on = st.son !== false;
  const root = document.createElement("div"); root.className = "cq"; root.setAttribute("role", "dialog"); root.setAttribute("aria-label", "Le ciel qui tourne");
  root.innerHTML = `<canvas class="cq-gl"></canvas><div class="cq-voile"></div>
    <div class="cq-haut"><button type="button" class="cq-b" data-q aria-label="Quitter">✕</button><span class="cq-lieu"></span><button type="button" class="cq-b" data-son aria-label="Le son">${st.son === false ? "♪̸" : "♪"}</button></div>
    <div class="cq-titre" aria-live="polite"></div><div class="cq-cap" aria-live="polite"></div>
    <div class="cq-bas"></div><div class="cq-panneau" hidden></div>`;
  document.body.appendChild(root); document.documentElement.classList.add("cq-ouvert");
  const $ = s => root.querySelector(s), canvas = $(".cq-gl"), bas = $(".cq-bas"), pan = $(".cq-panneau");
  let vivant = true, raf = 0, T = 0, last = performance.now(), etape = "intro";

  /* ---- le rendu */
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, powerPreference:"high-performance"});
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05; renderer.setClearColor(0x03050d, 1);
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(50, 1, .05, 2000); cam.up.set(0, 0, 1);
  const pmrem = new THREE.PMREMGenerator(renderer); scene.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;
  scene.add(new THREE.AmbientLight(0x404a7a, .6)); const lampe = new THREE.PointLight(0xffd7a0, 40, 60, 1.6); lampe.position.set(6, -8, 9); scene.add(lampe);
  const comp = new EffectComposer(renderer); comp.addPass(new RenderPass(scene, cam)); const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), .5, .42, .32); comp.addPass(bloom); comp.addPass(new OutputPass());
  let W = 1, H = 1, PR = 1; const lignes = [];
  function taille(){ W = root.clientWidth; H = root.clientHeight; PR = Math.min(window.devicePixelRatio || 1, W*H > 9e5 ? 1.25 : 1.75); renderer.setPixelRatio(PR); renderer.setSize(W, H, false); comp.setPixelRatio(PR); comp.setSize(W, H); bloom.resolution.set(W*PR/2, H*PR/2); cam.aspect = W/H; cadre(); cam.updateProjectionMatrix(); for(const m of mats) m.resolution.set(W*PR, H*PR); }
  const mats = new Set(), suit = l => { mats.add(l.material); l.material.resolution.set(W*PR, H*PR); lignes.push(l); return l; };
  /* le champ de vision : on garde une largeur minimale, même en portrait */
  let largeur = 52; const cadre = () => { const hf = largeur*DEG, vf = 2*Math.atan(Math.tan(hf/2)/cam.aspect); cam.fov = clamp(Math.max(vf, 44*DEG)/DEG, 30, 110); };
  const veut = deg => { largeur = deg; cadre(); cam.updateProjectionMatrix(); };

  /* ---- la voûte : 2 600 étoiles et la Voie lactée */
  const voute = new THREE.Group(); scene.add(voute);
  { const P = [], S = [], C = [], r = PX => Math.random()*PX;
    for(let i = 0; i < 2600; i++){ let u = Math.random()*2 - 1, a = Math.random()*TAU; if(i < 900){ const b = (Math.random() - .5)*.32, l = Math.random()*TAU, x = Math.cos(l), y = Math.sin(l)*Math.cos(1.05), z = Math.sin(l)*Math.sin(1.05); P.push((x + b*.3)*600, (y - b*z)*600, (z + b)*600); }
      else { const s = Math.sqrt(1 - u*u); P.push(Math.cos(a)*s*600, Math.sin(a)*s*600, u*600); }
      const m = Math.pow(Math.random(), 5); S.push(1.2 + m*6.5); const t = Math.random(); C.push(t < .2 ? .75 : t < .6 ? 1 : 1, t < .2 ? .82 : t < .6 ? .95 : .86, t < .2 ? 1 : t < .6 ? .9 : .7); }
    voute.add(nuage(P, S, C)); }
  const etoiles = voute.children[0];

  /* ---- la sphère armillaire : des anneaux d'or qui se dessinent */
  const armi = new THREE.Group(); scene.add(armi); const OR = new THREE.MeshStandardMaterial({color:0xd8a845, metalness:1, roughness:.27, emissive:0x2a1704, envMapIntensity:1.35});
  const anneaux = [];
  function anneau(R, ep, rot, pos, opts = {}){ const g = new THREE.Group(); if(rot) g.rotation.set(rot[0], rot[1], rot[2]); if(pos) g.position.set(pos[0], pos[1], pos[2]); armi.add(g);
    const a = {g, R, ep, arc:0, mesh:null, mat:opts.mat || OR}; anneaux.push(a); return a; }
  function arc(a, f){ a.arc = f; if(a.mesh){ a.mesh.geometry.dispose(); a.g.remove(a.mesh); } if(f <= .001){ a.mesh = null; return; } a.mesh = new THREE.Mesh(new THREE.TorusGeometry(a.R, a.ep, 8, Math.max(8, Math.round(160*f)), TAU*f), a.mat); a.g.add(a.mesh); }
  const RA = 6, eq = [OBL, 0, 0];
  const A = {ecl:anneau(RA, .085), equ:anneau(RA, .05, eq), trN:anneau(RA*Math.cos(OBL), .03, eq), trS:anneau(RA*Math.cos(OBL), .03, eq), poN:anneau(RA*Math.sin(OBL), .025, eq), poS:anneau(RA*Math.sin(OBL), .025, eq),
    col1:anneau(RA, .04, [OBL + Math.PI/2, 0, 0]), col2:anneau(RA, .04, [0, Math.PI/2, 0]), mer:anneau(RA*1.08, .07, [Math.PI/2, 0, .4]), hor:anneau(RA*1.12, .1, [0, 0, 0])};
  /* les cercles parallèles à l'équateur se décalent le long de son axe */
  { const n = new THREE.Vector3(0, 0, 1).applyEuler(new THREE.Euler(OBL, 0, 0)); A.trN.g.position.copy(n.clone().multiplyScalar(RA*Math.sin(OBL))); A.trS.g.position.copy(n.clone().multiplyScalar(-RA*Math.sin(OBL)));
    A.poN.g.position.copy(n.clone().multiplyScalar(RA*Math.cos(OBL))); A.poS.g.position.copy(n.clone().multiplyScalar(-RA*Math.cos(OBL))); A.col2.g.rotation.set(OBL, Math.PI/2, 0); A.hor.g.rotation.set(.35, -.2, 0); A.hor.g.position.set(0, 0, 0); }
  /* la bande du zodiaque, ses douze signes */
  const glyphes = new THREE.Group(); armi.add(glyphes);
  ZOD.forEach((z, i) => { const {t} = texteTex(z, 110), s = sprite(t, .62, 0); const l = (i + .5)*30*DEG; s.position.set(Math.cos(l)*(RA + .42), Math.sin(l)*(RA + .42), 0); glyphes.add(s); });
  /* la Terre, au centre, et le pied de l'instrument */
  const terre = new THREE.Mesh(new THREE.SphereGeometry(.55, 48, 32), new THREE.MeshStandardMaterial({color:0x2f5fa6, roughness:.6, metalness:.1, emissive:0x0a1a3a})); armi.add(terre);
  const terreHalo = sprite(halo("rgba(110,160,255,.7)"), 2.4, .7); armi.add(terreHalo);
  const axe = new THREE.Mesh(new THREE.CylinderGeometry(.035, .035, RA*2.5, 12), OR); axe.rotation.set(OBL + Math.PI/2, 0, 0); armi.add(axe); axe.visible = false;
  const pied = new THREE.Group(); { const tige = new THREE.Mesh(new THREE.CylinderGeometry(.09, .16, 3.2, 20), OR); tige.rotation.x = Math.PI/2; tige.position.z = -RA*1.12 - 1.6; pied.add(tige); const socle = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.1, .35, 48), OR); socle.rotation.x = Math.PI/2; socle.position.z = -RA*1.12 - 3.2; pied.add(socle); } armi.add(pied); pied.visible = false;

  /* ---- les planètes, des points de lumière */
  const HALOS = {};
  const astre = (couleur, s) => { const g = new THREE.Group(), h = sprite(halo(couleur), s, 1); g.add(h); scene.add(g); g.visible = false; return g; };
  const mars = astre("rgba(255,120,70,.9)", 3.2), soleilA = astre("rgba(255,210,120,.9)", 6);

  /* ---- la caméra, qu'on peut faire tourner au doigt dans la sphère */
  const orbite = {az:-.9, el:.42, d:24, cible:new THREE.Vector3(), libre:false, vaz:0, vel:0};
  const place = () => { const {az, el, d, cible} = orbite; cam.up.set(0, 0, 1); cam.position.set(cible.x + d*Math.cos(el)*Math.cos(az), cible.y + d*Math.cos(el)*Math.sin(az), cible.z + d*Math.sin(el)); cam.lookAt(cible); };
  let tire = null; canvas.addEventListener("pointerdown", e => { if(!orbite.libre) return; tire = {x:e.clientX, y:e.clientY}; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener("pointermove", e => { if(!tire) return; const dx = e.clientX - tire.x, dy = e.clientY - tire.y; tire = {x:e.clientX, y:e.clientY}; orbite.vaz = -dx*.006; orbite.vel = dy*.004; orbite.az += orbite.vaz; orbite.el = clamp(orbite.el + orbite.vel, -1.2, 1.35); });
  canvas.addEventListener("pointerup", () => tire = null); canvas.addEventListener("pointercancel", () => tire = null);

  /* ---- l'interface : titres lettre à lettre, légendes, boutons */
  const titre = async (haut, grand) => { const el = $(".cq-titre"); el.innerHTML = `<small>${haut}</small><b>${[...grand].map((c, i) => `<span style="animation-delay:${i*45}ms">${c === " " ? "&nbsp;" : c}</span>`).join("")}</b>`; el.classList.remove("off"); el.classList.add("on"); };
  const titreOff = () => { const el = $(".cq-titre"); el.classList.add("off"); el.classList.remove("on"); };
  let capT = 0; const cap = (txt, ms) => { const el = $(".cq-cap"); el.innerHTML = txt; el.classList.remove("on"); void el.offsetWidth; el.classList.add("on"); clearTimeout(capT); if(ms) capT = setTimeout(() => el.classList.remove("on"), ms); };
  const capOff = () => $(".cq-cap").classList.remove("on");
  const parle = (qui, txt) => new Promise(res => { const el = $(".cq-cap"); el.innerHTML = `<i>${qui}</i>${txt}<span class="cq-suite">toucher pour continuer</span>`; el.classList.remove("on"); void el.offsetWidth; el.classList.add("on", "tap"); root.classList.add("parle");
    const f = () => { if(Date.now() - t0 < 450) return; el.classList.remove("tap", "on"); root.classList.remove("parle"); root.removeEventListener("click", f); setTimeout(res, 260); }; const t0 = Date.now(); setTimeout(() => root.addEventListener("click", f), 30); });
  const bouton = (txt, cls = "") => new Promise(res => { bas.innerHTML = `<button type="button" class="cq-go ${cls}">${txt}</button>`; const b = bas.firstChild; requestAnimationFrame(() => b.classList.add("on")); b.onclick = e => { e.stopPropagation(); Son.init(); b.classList.remove("on"); setTimeout(() => { bas.innerHTML = ""; res(); }, 260); }; });
  const voile = (on, ms = 900) => { const v = $(".cq-voile"); v.style.transition = `opacity ${ms}ms`; v.style.opacity = on ? 1 : 0; return attends(ms); };
  const lieu = t => $(".cq-lieu").textContent = t;

  /* ---- la boucle */
  const maj = [];
  function boucle(now){ if(!vivant) return; raf = requestAnimationFrame(boucle); const dt = Math.min(.05, (now - last)/1000); last = now; T += dt;
    stepAnims(now); for(const f of maj) f(dt, T);
    etoiles.material.uniforms.uT.value = T; etoiles.material.uniforms.uPR.value = PR;
    if(orbite.libre && !tire){ orbite.az += orbite.vaz; orbite.el = clamp(orbite.el + orbite.vel, -1.2, 1.35); orbite.vaz = orbite.vaz*.95 + (-.0012)*.05; orbite.vel *= .9; }
    if(orbite.actif) place();
    comp.render(dt); }

  /* ---- fermer */
  function fermer(){ if(!vivant) return; vivant = false; cancelAnimationFrame(raf); Son.fin(); window.removeEventListener("resize", taille); document.removeEventListener("keydown", clavier);
    scene.traverse(o => { if(o.geometry) o.geometry.dispose(); if(o.material){ (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => { if(m.map) m.map.dispose(); m.dispose(); }); } });
    pmrem.dispose(); comp.dispose && comp.dispose(); renderer.dispose(); root.classList.add("sort"); setTimeout(() => { root.remove(); document.documentElement.classList.remove("cq-ouvert"); opt.ferme && opt.ferme(lire()); }, 450); }
  const clavier = e => { if(e.key === "Escape") fermer(); };
  document.addEventListener("keydown", clavier); window.addEventListener("resize", taille);
  $("[data-q]").onclick = e => { e.stopPropagation(); fermer(); };
  $("[data-son]").onclick = e => { e.stopPropagation(); Son.init(); Son.on = !Son.on; st.son = Son.on; ecrire(st); e.currentTarget.textContent = Son.on ? "♪" : "♪̸"; if(Son.on) Son.nappe(etape === "intro" ? .5 : .4); };
  taille(); requestAnimationFrame(t => { last = t; boucle(t); });
  const vit = () => { if(!vivant) throw new Error("fermé"); };
  window.__cielDbg = {get etape(){ return etape; }, scene, cam, orbite, A, sauter:k => (saut = k), resoudre:() => (triche = true), fermer};
  let saut = null, triche = false;

  /* ================================================================ 1. L'INTRO : la sphère se dessine */
  async function intro(){ etape = "intro"; lieu("Alexandrie, vers 150"); orbite.actif = true; orbite.libre = false; veut(52); place(); $(".cq-voile").style.opacity = 1;
    etoiles.material.uniforms.uA.value = 0; await voile(false, 1600); tw(4000, k => etoiles.material.uniforms.uA.value = k, ease.out);
    await titre("Le ciel qui tourne · I", "Alexandrie, vers 150"); await attends(2300); titreOff();
    await bouton("Entrer dans l'observatoire"); Son.nappe(.5); vit();
    /* les anneaux, l'un après l'autre, chacun sa note */
    const ordre = ["hor", "mer", "ecl", "equ", "col1", "col2", "trN", "trS", "poN", "poS"]; tw(9000, k => { orbite.az = -.9 + k*.9; orbite.d = lerp(26, 17, k); orbite.el = lerp(.42, .3, k); }, ease.inOut);
    for(let i = 0; i < ordre.length; i++){ const a = A[ordre[i]]; Son.carillon(i); tw(1300, k => arc(a, k), ease.out); if(i === 2) glyphes.children.forEach((s, j) => tw(600 + j*80, k => s.material.opacity = k*.95)); await attends(i < 3 ? 650 : 380); vit(); }
    await attends(900); axe.visible = true; pied.visible = true; tw(800, k => { axe.scale.set(1, k, 1); pied.scale.set(1, 1, k); });
    cap("La sphère armillaire : les grands cercles du ciel, montés autour de la Terre.<br><small>Fais-la tourner du doigt.</small>"); orbite.libre = true; await attends(1600);
    await parle("Claude Ptolémée", "Tout ce qui est au ciel tourne en cercles parfaits. Le Soleil, la Lune, les étoiles. Tout, sauf cinq astres qui errent : les planètes.");
    await parle("Claude Ptolémée", "Et la plus têtue, c'est Mars. Viens. Regarde-la avec moi, nuit après nuit.");
    await bouton("Observer Mars"); vit(); }

  /* ================================================================ 2. L'OBSERVATION : Mars recule */
  async function observe(){ etape = "observe"; orbite.libre = false;
    /* on entre dans la sphère, jusqu'à la Terre, et on regarde vers la Vierge et la Balance */
    const az0 = orbite.az; await tw(2600, k => { orbite.d = lerp(orbite.d, .01, k*.35); glyphes.children.forEach(s => s.material.opacity = 1 - k); armi.children.forEach(o => o.visible = k < .92); }, ease.inOut);
    orbite.actif = false; armi.visible = false; veut(58); const cible0 = 180*DEG;
    const vue = l => { cam.position.set(0, 0, 0); cam.up.set(0, 0, 1); cam.lookAt(Math.cos(l)*100, Math.sin(l)*100, 2.2); };
    vue(cible0); lieu("Alexandrie · l'observatoire");
    /* l'écliptique, ses signes, une étoile repère */
    const R = 100, ecl = []; for(let i = 0; i <= 360; i++){ const l = i*DEG; ecl.push([Math.cos(l)*R, Math.sin(l)*R, 0]); }
    const lEcl = suit(trait(ecl, "#c99a3c", 1.6, {tirets:true, dash:1.2, gap:1.4, op:.65})); scene.add(lEcl); montre(lEcl, 0);
    const marques = new THREE.Group(); scene.add(marques);
    for(let s = 0; s < 12; s++){ const l = s*30*DEG, t = suit(trait([[Math.cos(l)*R, Math.sin(l)*R, -2.4], [Math.cos(l)*R, Math.sin(l)*R, 2.4]], "#c99a3c", 1.4, {op:.5})); marques.add(t);
      const m = (s + .5)*30*DEG, {t:tx, r} = texteTex(ZOD[s], 120), sp = sprite(tx, 3.4, 0); sp.position.set(Math.cos(m)*R, Math.sin(m)*R, -4.8); marques.add(sp);
      const {t:nx, r:nr} = texteTex(SIGNES[s], 64, "#bfa979"), sn = sprite(nx, 1, 0); sn.scale.set(1.6*nr, 1.6, 1); sn.position.set(Math.cos(m)*R, Math.sin(m)*R, -7); marques.add(sn); }
    const spica = sprite(halo("rgba(170,200,255,.9)"), 4.5, 0); const ls = 201*DEG, bs = -2*DEG; spica.position.set(Math.cos(ls)*Math.cos(bs)*R, Math.sin(ls)*Math.cos(bs)*R, Math.sin(bs)*R); scene.add(spica);
    const {t:spt, r:spr} = texteTex("l'Épi", 56, "#b9c8ee"), spl = sprite(spt, 1, 0); spl.scale.set(1.3*spr, 1.3, 1); spl.position.copy(spica.position).add(new THREE.Vector3(0, 0, -2.2)); scene.add(spl);
    await tw(2200, k => { montre(lEcl, k); marques.children.forEach(o => { if(o.material.opacity != null && o.isSprite) o.material.opacity = k*.9; }); spica.material.opacity = k; spl.material.opacity = k*.8; }, ease.out);
    await parle("Claude Ptolémée", "Voici la route du Soleil, l'écliptique, et ses douze signes. Les planètes la suivent toujours. Tiens Mars à l'œil : chaque nuit, je marque sa place.");
    /* les nuits : on maintient pour qu'elles passent */
    const N = 76, J0 = -110, pas = 220/N, ne = new Float32Array(N).fill(1e9), pts = [], Pp = [], Ss = [], Cc = [];
    for(let i = 0; i <= N; i++){ const [x, y, z] = geo("mars", .5 + (J0 + i*pas)/365.25), [l, b] = eclip(x, y, z), b2 = b*1.6; pts.push([Math.cos(l)*Math.cos(b2)*R, Math.sin(l)*Math.cos(b2)*R, Math.sin(b2)*R]); Pp.push(...pts[i]); Ss.push(11); Cc.push(1, .55, .3); }
    const nuits = nuage(Pp, Ss, Cc, {nes:Array.from(ne), scint:.2}); scene.add(nuits); const neA = nuits.geometry.getAttribute("ne");
    mars.visible = true; mars.scale.setScalar(1.8); mars.position.set(...pts[0]);
    let i = 0, f = 0, tient = false, stations = 0, lPrec = null, dPrec = null, regard = cible0;
    maj.push((dt) => { nuits.material.uniforms.uT.value = T; nuits.material.uniforms.uPR.value = PR; { const d = Math.atan2(Math.sin(Math.atan2(mars.position.y, mars.position.x) - regard), Math.cos(Math.atan2(mars.position.y, mars.position.x) - regard)); regard += d*Math.min(1, dt*.8); } if(etape === "observe") vue(regard); });
    bas.innerHTML = `<button type="button" class="cq-tenir on"><span class="cq-tenir-r"></span><b>Maintenir</b><small>les nuits passent</small></button>`;
    const bt = bas.firstChild, on = e => { e.preventDefault(); Son.init(); tient = true; bt.classList.add("tient"); }, off = () => { tient = false; bt.classList.remove("tient"); };
    bt.addEventListener("pointerdown", on); bt.addEventListener("pointerup", off); bt.addEventListener("pointerleave", off); bt.addEventListener("pointercancel", off);
    const kd = e => { if(e.code === "Space"){ e.preventDefault(); if(!tient) on(e); } }, ku = e => { if(e.code === "Space") off(); }; document.addEventListener("keydown", kd); document.addEventListener("keyup", ku);
    cap("Maintiens le bouton : les nuits passent, et Mars se déplace.");
    const jour = $(".cq-lieu");
    await new Promise(res => { const fn = (dt) => { if(!tient && saut !== "observe") return; if(i >= N){ maj.splice(maj.indexOf(fn), 1); res(); return; }
        /* près des arrêts, le temps ralentit tout seul */
        const l = Math.atan2(pts[i + 1 > N ? N : i + 1][1], pts[i + 1 > N ? N : i + 1][0]) - Math.atan2(pts[i][1], pts[i][0]), lent = Math.abs(l) < .007 ? .32 : 1;
        f += dt*(saut === "observe" ? 60 : 7.5*lent); while(f >= 1 && i < N){ f -= 1; i++; ne[i] = T; neA.array[i] = T; neA.needsUpdate = true; mars.position.set(...pts[i]); Son.tic(i);
          const d = Math.sign(Math.atan2(Math.sin(Math.atan2(pts[i][1], pts[i][0]) - Math.atan2(pts[i - 1][1], pts[i - 1][0])), 1));
          if(dPrec != null && d !== dPrec){ stations++; Son.carillon(stations === 1 ? 5 : 7); cap(stations === 1 ? "Mars ralentit, s'arrête… <b>et recule.</b>" : "Il s'arrête encore… et repart vers l'est, comme si de rien n'était.", 5200);
            const r = sprite(halo("rgba(255,200,140,.8)"), 2, 1); r.position.set(...pts[i]); scene.add(r); tw(1800, k => { r.scale.setScalar(2 + k*14); r.material.opacity = 1 - k; }, ease.out).then(() => scene.remove(r)); }
          dPrec = d; jour.textContent = `Alexandrie · nuit ${i*3}`; } };
      maj.push(fn); });
    document.removeEventListener("keydown", kd); document.removeEventListener("keyup", ku); bas.innerHTML = ""; vit();
    /* la boucle apparaît, reliée d'un trait de lumière */
    const lb = suit(trait(pts, "#ff9a62", 2.2, {op:.75})); scene.add(lb); montre(lb, 0); Son.accord(); await tw(2600, k => montre(lb, k), ease.inOut);
    await parle("Claude Ptolémée", "Tu as vu. Pendant plus de deux mois, Mars a marché à l'envers. Et c'est toujours quand il brille le plus.");
    await parle("Claude Ptolémée", "Un astre parfait ne recule pas. Il doit y avoir des cercles, cachés, qui produisent ce mouvement. Apollonius et Hipparque en avaient l'idée. À toi de les régler.");
    await bouton("Construire le modèle"); vit();
    await tw(1400, k => { lb.material.opacity = .9*(1 - k); lEcl.material.opacity = .65*(1 - k); nuits.material.uniforms.uA.value = 1 - k; marques.children.forEach(o => { if(o.material) o.material.opacity = (o.isSprite ? .9 : .5)*(1 - k); }); spica.material.opacity = 1 - k; spl.material.opacity = .8*(1 - k); mars.children[0].material.opacity = 1 - k; });
    [lb, lEcl, nuits, marques, spica, spl].forEach(o => scene.remove(o)); mars.visible = false; mars.children[0].material.opacity = 1; maj.length = 0; }

  /* ================================================================ 3. L'ÉNIGME : l'épicycle */
  async function enigme(){ etape = "enigme"; lieu("Alexandrie · le modèle");
    /* vue d'en haut : le plan de l'écliptique devient une table d'astrolabe */
    const S = 10, table = new THREE.Group(); scene.add(table);
    const cercle = (r, n = 180) => { const p = []; for(let i = 0; i <= n; i++){ const a = i/n*TAU; p.push([Math.cos(a)*r, Math.sin(a)*r, 0]); } return p; };
    const bord = suit(trait(cercle(S*1.95), "#b98d3a", 1.6, {op:.55})), bord2 = suit(trait(cercle(S*2.08), "#b98d3a", 1, {op:.35})); table.add(bord, bord2);
    for(let s = 0; s < 72; s++){ const a = s*5*DEG, long = s % 6 === 0, r0 = S*(long ? 1.88 : 1.92); table.add(suit(trait([[Math.cos(a)*r0, Math.sin(a)*r0, 0], [Math.cos(a)*S*1.95, Math.sin(a)*S*1.95, 0]], "#b98d3a", long ? 1.4 : .9, {op:long ? .6 : .35}))); }
    ZOD.forEach((z, i) => { const {t} = texteTex(z, 110), sp = sprite(t, 1.5, .85), a = (i + .5)*30*DEG; sp.position.set(Math.cos(a)*S*2.02, Math.sin(a)*S*2.02, 0); table.add(sp); });
    const terreT = sprite(halo("rgba(110,160,255,.9)"), 2.6, 1); table.add(terreT);
    /* la cible : le vrai chemin de Mars autour de la Terre, sur huit ans, en pointillés bleus */
    const ANS = 8, NP = 480, vrai = []; for(let i = 0; i <= NP; i++){ const [x, y] = geo("mars", ANS*i/NP); vrai.push([x/1.5237*S, y/1.5237*S, -.02]); }
    const lv = suit(trait(vrai, "#8fb4ff", 1.3, {tirets:true, dash:.35, gap:.45, op:0})); table.add(lv);
    /* le modèle du joueur : un déférent, un épicycle, Mars dessus */
    let r = .32, k = 1.1; const M = t => { const A = TAU*t/1.8809 + PHI.mars, B = Math.PI + k*TAU*t/1.8809; return [Math.cos(A)*S + Math.cos(B)*r*S, Math.sin(A)*S + Math.sin(B)*r*S, 0]; };
    const courbe = () => { const p = []; for(let i = 0; i <= NP; i++) p.push(M(ANS*i/NP)); return p; };
    const lj = suit(trait(courbe(), "#ffcf6e", 2.6, {op:0})); table.add(lj);
    const def = suit(trait(cercle(S), "#e2bd5a", 1.2, {op:0})); table.add(def);
    const epi = suit(trait(cercle(1, 90), "#ffe2a0", 1.4, {op:0})); table.add(epi); const bras1 = suit(trait([[0, 0, 0], [1, 0, 0]], "#e2bd5a", 1, {op:0})), bras2 = suit(trait([[0, 0, 0], [1, 0, 0]], "#ffe2a0", 1, {op:0})); table.add(bras1, bras2);
    const pm = sprite(halo("rgba(255,120,70,.95)"), 2.2, 0); table.add(pm);
    const tete = sprite(halo("rgba(255,210,130,.9)"), 1.6, 0); table.add(tete);
    /* la caméra monte au-dessus du plan */
    cam.up.set(0, 1, 0); veut(44); const hFit = () => { const half = S*2.2, vf = cam.fov*DEG/2, hf = Math.atan(Math.tan(vf)*cam.aspect); return half/Math.tan(Math.min(vf, hf)); };
    await tw(2400, q => { cam.position.set(0, -hFit()*(1 - q)*.6, lerp(4, hFit(), q)); cam.lookAt(0, 0, 0); [bord, bord2].forEach(l => montre(l, q)); }, ease.inOut);
    cam.position.set(0, 0, hFit()); cam.lookAt(0, 0, 0);
    await tw(1200, q => { lv.material.opacity = q*.75; def.material.opacity = q*.6; epi.material.opacity = q*.8; bras1.material.opacity = q*.35; bras2.material.opacity = q*.5; pm.material.opacity = q; lj.material.opacity = q*.85; tete.material.opacity = q; });
    await parle("Claude Ptolémée", "Vu d'en haut, voici le chemin de Mars autour de la Terre, en pointillés bleus : huit ans de boucles. Le grand cercle porte un petit cercle, et Mars tourne sur le petit.");
    cap("Tourne les deux molettes jusqu'à ce que ton tracé d'or recouvre les pointillés bleus.");
    /* les deux molettes */
    bas.innerHTML = `<div class="cq-mols"><div class="cq-mol" data-m="r"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" class="cq-mol-f"/><circle cx="50" cy="50" r="36" class="cq-mol-i"/><g class="cq-mol-t">${Array.from({length:24}, (_, i) => `<line x1="50" y1="${i % 6 ? 9 : 6}" x2="50" y2="14" transform="rotate(${i*15} 50 50)"/>`).join("")}</g><g class="cq-mol-a"><line x1="50" y1="50" x2="50" y2="18"/><circle cx="50" cy="18" r="4"/></g></svg><b>Le petit cercle</b><small data-v="r"></small></div>
      <div class="cq-jauge"><span data-j></span><small>ressemblance</small></div>
      <div class="cq-mol" data-m="k"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" class="cq-mol-f"/><circle cx="50" cy="50" r="36" class="cq-mol-i"/><g class="cq-mol-t">${Array.from({length:24}, (_, i) => `<line x1="50" y1="${i % 6 ? 9 : 6}" x2="50" y2="14" transform="rotate(${i*15} 50 50)"/>`).join("")}</g><g class="cq-mol-a"><line x1="50" y1="50" x2="50" y2="18"/><circle cx="50" cy="18" r="4"/></g></svg><b>Sa vitesse</b><small data-v="k"></small></div></div>`;
    const lim = {r:[.12, 1.2], k:[.4, 4]}, val = {r:() => r, k:() => k}, set = {r:v => r = v, k:v => k = v};
    const dessineMol = m => { const [a, b] = lim[m], f = (val[m]() - a)/(b - a); bas.querySelector(`[data-m=${m}] .cq-mol-a`).setAttribute("transform", `rotate(${-135 + f*270} 50 50)`); bas.querySelector(`[data-v=${m}]`).textContent = m === "r" ? `${Math.round(r*100)} % du grand` : `${k.toFixed(2)} tour${k >= 2 ? "s" : ""} par tour`; };
    let sale = true, gagne = false, ecart = 1, tSans = 0, aide = 0;
    bas.querySelectorAll(".cq-mol").forEach(el => { const m = el.dataset.m; let a0 = null;
      const ang = e => { const b = el.querySelector("svg").getBoundingClientRect(); return Math.atan2(e.clientY - (b.top + b.height/2), e.clientX - (b.left + b.width/2)); };
      el.addEventListener("pointerdown", e => { if(gagne) return; Son.init(); a0 = ang(e); el.setPointerCapture(e.pointerId); el.classList.add("prise"); });
      el.addEventListener("pointermove", e => { if(a0 == null) return; const a = ang(e); let d = a - a0; d = Math.atan2(Math.sin(d), Math.cos(d)); a0 = a; const [lo, hi] = lim[m]; const v = clamp(val[m]() + d/(1.5*Math.PI)*(hi - lo), lo, hi); if(Math.abs(v - val[m]()) > 1e-4){ const pas = Math.floor(v*20) !== Math.floor(val[m]()*20); set[m](v); sale = true; dessineMol(m); if(pas) Son.tic(Math.floor(v*20)); } });
      const fin = () => { a0 = null; el.classList.remove("prise"); }; el.addEventListener("pointerup", fin); el.addEventListener("pointercancel", fin); dessineMol(m); });
    requestAnimationFrame(() => bas.firstChild.classList.add("on"));
    const jauge = bas.querySelector("[data-j]");
    let th = 0;
    await new Promise(res => { const fn = (dt) => {
        if(triche && !gagne){ r = .6563; k = 1.8809; sale = true; dessineMol("r"); dessineMol("k"); }
        if(sale){ sale = false; remplace(lj, courbe()); let e = 0; for(let i = 0; i <= 120; i++){ const t = ANS*i/120, a = M(t), [x, y] = geo("mars", t); e += Math.hypot(a[0] - x/1.5237*S, a[1] - y/1.5237*S)/S; } ecart = e/121;
          const ress = clamp(1 - ecart/.9, 0, 1); jauge.style.transform = `scaleX(${ress})`; jauge.parentNode.classList.toggle("chaud", ress > .8); }
        /* Mars court sur le tracé, l'épicycle tourne avec lui */
        th += dt*.55; const t = th % ANS, A = TAU*t/1.8809 + PHI.mars, B = Math.PI + k*TAU*t/1.8809, cx = Math.cos(A)*S, cy = Math.sin(A)*S;
        epi.position.set(cx, cy, 0); epi.scale.setScalar(r*S); bras1.rotation.z = A; bras1.scale.set(S, 1, 1); bras2.position.set(cx, cy, 0); bras2.rotation.z = B; bras2.scale.set(r*S, 1, 1);
        pm.position.set(cx + Math.cos(B)*r*S, cy + Math.sin(B)*r*S, .01); tete.position.copy(pm.position); montre(lj, (t/ANS)*.15 + .85);
        if(!gagne){ tSans += dt; if(tSans > 28 && aide < 1){ aide = 1; cap("Commence par la vitesse : Mars recule à peu près une fois tous les deux ans. Combien de tours du petit cercle pour un tour du grand ?", 9000); }
          if(tSans > 55 && aide < 2){ aide = 2; cap("Presque deux tours du petit cercle pour un tour du grand. Et le petit cercle fait environ les deux tiers du grand.", 9000); }
          if(ecart < .045){ gagne = true; maj.splice(maj.indexOf(fn), 1); res(); } } };
      maj.push(fn); });
    vit(); Son.accord(); bas.firstChild.classList.add("ok"); capOff();
    /* la boucle exacte : on aimante, on illumine */
    const r0 = r, k0 = k; await tw(900, q => { r = lerp(r0, .6563, q); k = lerp(k0, 1.8809, q); remplace(lj, courbe()); dessineMol("r"); dessineMol("k"); });
    const etin = []; for(let i = 0; i < 60; i++){ const s = sprite(halo("rgba(255,220,150,.9)"), .9, 0); table.add(s); etin.push({s, o:Math.random()*ANS}); }
    maj.push(dt => etin.forEach(e => { e.o = (e.o + dt*.9) % ANS; e.s.position.set(...M(e.o)); e.s.material.opacity = Math.min(1, e.s.material.opacity + dt); }));
    await tw(1600, q => { lj.material.linewidth = 2.6 + q*1.6; lv.material.opacity = .75*(1 - q); });
    await parle("Claude Ptolémée", "Voilà. Le petit cercle fait un tour par an, le grand un tour en presque deux ans. Et Mars, vu de la Terre, recule exactement quand il le faut.");
    await parle("Claude Ptolémée", "Personne n'a vu ces cercles. Mais ils prédisent le ciel. Pour nous, c'est cela, comprendre.");
    bas.innerHTML = ""; maj.length = 0;
    await tw(1400, q => table.children.forEach(o => { if(o.material && o.material.opacity != null) o.material.opacity *= (1 - q*.12); }));
    return {table, lj}; }

  /* ================================================================ 4. LES ROSACES : le ciel entier dessine */
  async function rosaces(prec){ etape = "rosaces"; lieu("Alexandrie · le ciel entier");
    const {table} = prec, S = 10;
    await tw(1500, q => table.children.forEach(o => { if(o.material && o.material.opacity != null) o.material.opacity *= (1 - q*.12); }));
    table.children.slice().forEach(o => { if(o.material && o.material.opacity < .02) o.visible = false; }); prec.lj.visible = false;
    table.children.slice().forEach(o => { if(o.isSprite && o.material.map && o.scale.x < 1) table.remove(o); });
    const groupe = new THREE.Group(); scene.add(groupe);
    const defs = [["venus", 8, "#fff0c8", 2.4, S*.5], ["mars", 15, "#ff9a62", 1.8, S*.85], ["jupiter", 12, "#f3cf8a", 1.6, S*1.3], ["saturne", 30, "#d9ccff", 1.4, S*1.65]];
    const traces = defs.map(([id, ans, c, w, ech]) => { const p = []; const n = id === "saturne" ? 1400 : 900, sc = ech/PLANETES[id].a; for(let i = 0; i <= n; i++){ const [x, y] = geo(id, ans*i/n); p.push([x*sc, y*sc, 0]); } const l = suit(trait(p, c, w*.8, {op:.5})); montre(l, 0); groupe.add(l); return l; });
    cap("Toutes les planètes errantes, vues de la Terre. Vénus dessine une rose à cinq pétales en huit ans.", 11000);
    Son.carillon(0); setTimeout(() => Son.carillon(2), 1400); setTimeout(() => Son.carillon(4), 2800); setTimeout(() => Son.carillon(7), 4600);
    await tw(saut === "rosaces" ? 300 : 10500, q => traces.forEach((l, i) => montre(l, clamp(q*1.15 - i*.05, 0, 1))), ease.inOut);
    Son.accord(); await attends(800);
    /* on recule : la rosace reste au cœur de la sphère, qui revient */
    armi.visible = true; armi.children.forEach(o => o.visible = true); glyphes.children.forEach(s => s.material.opacity = .9); groupe.scale.setScalar(.3); table.scale.setScalar(.3); table.visible = false;
    await tw(3200, q => { const h = lerp(cam.position.z, 22, q); cam.position.set(Math.sin(q*.9)*-14*q, -16*q, h); cam.up.set(0, lerp(1, 0, q), lerp(0, 1, q)); cam.lookAt(0, 0, 0); }, ease.inOut);
    orbite.az = Math.atan2(cam.position.y, cam.position.x); orbite.d = cam.position.length(); orbite.el = Math.asin(cam.position.z/orbite.d); orbite.cible.set(0, 0, 0); orbite.actif = true; orbite.libre = true; orbite.vaz = -.002;
    await parle("Claude Ptolémée", "Treize livres pour calculer tout cela. Je les ai appelés la <i>Composition mathématique</i>. On s'en servira pendant quatorze siècles.");
    await parle("Claude Ptolémée", "Mais calculer le ciel ne me suffit pas. Le premier livre dit où sont les astres. Le second dira ce qu'ils signifient pour chacun de nous.");
  }

  /* ================================================================ 5. LE SEUIL : trois questions, trois volets */
  const DESSINS = {
    epicycle:`<svg viewBox="0 0 220 160" class="cq-svg"><circle cx="110" cy="80" r="5" class="f"/><circle cx="110" cy="80" r="54" class="d"/><circle cx="164" cy="80" r="26" class="d e"/><path d="M110 80L164 80L182 62" class="d"/><circle cx="182" cy="62" r="5" class="m"/><path class="d t" d="${(() => { let s = ""; for(let i = 0; i <= 260; i++){ const t = i/260*6, A = t*1.1, B = t*2.1*1.1; s += (i ? "L" : "M") + (110 + 54*Math.cos(A) + 26*Math.cos(B)).toFixed(1) + " " + (80 - 54*Math.sin(A) - 26*Math.sin(B)).toFixed(1); } return s; })()}"/></svg>`,
    monde:`<svg viewBox="0 0 220 160" class="cq-svg">${[14, 22, 30, 38, 46, 54, 62, 72].map((r, i) => `<circle cx="110" cy="80" r="${r}" class="d" style="animation-delay:${i*.18}s"/>`).join("")}<circle cx="110" cy="80" r="6" class="f"/>${["☽", "☿", "♀", "☉", "♂", "♃", "♄"].map((g, i) => { const r = 14 + i*8, a = .7 + i*.83; return `<text x="${(110 + r*Math.cos(a)).toFixed(1)}" y="${(84 - r*Math.sin(a)).toFixed(1)}" class="g">${g}︎</text>`; }).join("")}</svg>`,
    roue:`<svg viewBox="0 0 220 160" class="cq-svg"><circle cx="110" cy="80" r="66" class="d"/><circle cx="110" cy="80" r="48" class="d"/><circle cx="110" cy="80" r="18" class="d"/>${Array.from({length:12}, (_, i) => { const a = i*30*Math.PI/180; return `<path d="M${(110 + 18*Math.cos(a)).toFixed(1)} ${(80 + 18*Math.sin(a)).toFixed(1)}L${(110 + 66*Math.cos(a)).toFixed(1)} ${(80 + 66*Math.sin(a)).toFixed(1)}" class="d" style="animation-delay:${i*.08}s"/>`; }).join("")}${ZOD.map((z, i) => { const a = -(i + .5)*30*Math.PI/180; return `<text x="${(110 + 57*Math.cos(a)).toFixed(1)}" y="${(84 + 57*Math.sin(a)).toFixed(1)}" class="g">${z}</text>`; }).join("")}</svg>`};
  async function seuil(){ etape = "seuil"; orbite.libre = true;
    for(let n = 0; n < VOLETS.length; n++){ const v = VOLETS[n]; vit();
      const rep = await new Promise(res => { pan.hidden = false; pan.className = "cq-panneau q"; pan.innerHTML = `<p class="cq-qui">Claude Ptolémée · question ${n + 1} sur 3</p><h2>${v.q}</h2><div class="cq-opts">${v.o.map((o, i) => `<button type="button" data-o="${i}">${o}</button>`).join("")}</div><p class="cq-non" hidden></p>`;
        requestAnimationFrame(() => pan.classList.add("on"));
        pan.querySelectorAll("[data-o]").forEach(b => b.onclick = e => { e.stopPropagation(); const i = +b.dataset.o; if(i === v.ok){ b.classList.add("bon"); Son.accord(); setTimeout(() => res(i), 650); } else { b.classList.add("faux"); Son.faux(); const p = pan.querySelector(".cq-non"); p.hidden = false; p.textContent = v.non; setTimeout(() => b.classList.remove("faux"), 600); } }); });
      await volet(v, !st.volets.includes(v.id)); if(!st.volets.includes(v.id)){ st.volets.push(v.id); ecrire(st); } }
    st.faits.ptolemee = true; ecrire(st); pan.classList.remove("on"); await attends(400); pan.hidden = true; }
  const volet = (v, neuf) => new Promise(res => { pan.className = "cq-panneau v"; pan.innerHTML = `<p class="cq-qui">${neuf ? "Nouveau volet" : "Volet"} · l'histoire de l'astrologie</p><div class="cq-img">${DESSINS[v.img]}</div><h2>${v.t}</h2>${v.txt.map(p => `<p>${p}</p>`).join("")}<button type="button" class="cq-go on" data-ok>Continuer</button>`;
    pan.scrollTop = 0; requestAnimationFrame(() => pan.classList.add("on")); pan.querySelector("[data-ok]").onclick = e => { e.stopPropagation(); res(); }; });

  /* ================================================================ 6. LA FIN */
  async function fin(){ etape = "fin"; lieu("Le ciel qui tourne");
    pan.hidden = false; pan.className = "cq-panneau v fin"; pan.innerHTML = `<p class="cq-qui">Premier niveau terminé</p><h2>La suite du voyage</h2>
      <ol class="cq-suite-l"><li class="fait"><b>Alexandrie, vers 150</b> Ptolémée et la boucle de Mars</li><li><b>Babylone, vers 650 avant notre ère</b> Les tablettes de Vénus</li><li><b>Bagdad, vers 850</b> L'astrolabe et l'heure des étoiles</li><li><b>Prague, 1609</b> Kepler et la musique des sphères</li><li><b>Ton ciel</b> Ta naissance, en constellation d'or</li></ol>
      <p>Ce niveau est un prototype : les autres époques viendront si celle-ci te plaît.</p><div class="cq-acts"><button type="button" class="cq-go on" data-f>Revenir à l'astrologie</button><button type="button" class="cq-go on ghost" data-r>Rester dans la sphère</button></div>`;
    requestAnimationFrame(() => pan.classList.add("on"));
    pan.querySelector("[data-f]").onclick = e => { e.stopPropagation(); fermer(); };
    pan.querySelector("[data-r]").onclick = e => { e.stopPropagation(); pan.classList.remove("on"); setTimeout(() => pan.hidden = true, 400); cap("Fais tourner la sphère. Le bouton ✕ te ramène à l'astrologie.", 6000); }; }

  /* ---- le fil */
  (async () => { try{
      if(opt.direct === "volets"){ await intro(); return; }
      await intro(); await observe(); const e = await enigme(); await rosaces(e); await seuil(); await fin();
    }catch(e){ if(vivant) console.error(e); } })();
  return {fermer};
}

/* le corpus du jeu, lisible depuis l'astrologie sans relancer la partie */
export const volets = () => { const s = lire(); return VOLETS.filter(v => s.volets.includes(v.id)); };
