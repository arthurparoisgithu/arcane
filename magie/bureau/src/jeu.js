/* ===== Arcanes · Magie : Sans suite, le pilote (le hall du Bureau) =====
   Un jeu scénarisé à la première personne. Le héros est muet : il répond par gestes. Tout le monde parle à sa place.
   Rendu « Dark Deco » : la scène 3D est calculée puis redessinée en aplats sombres, deux gammes (froide, chaude), filets d'or sur les arêtes,
   ciel rouge derrière les verrières. Décor et personnages construits en code ; son synthétisé ; répliques dans magie/magie-bureau.js. */
import * as THREE from "three";
const TAU = Math.PI*2, lerp = (a, b, t) => a + (b - a)*t, clamp = (x, a, b) => Math.max(a, Math.min(b, x)), CLE = "arcanes.bureau.v1";
const rng = s => () => (s = (s*1664525 + 1013904223) >>> 0)/4294967296, doux = t => t*t*(3 - 2*t);

export function ouvrir(opt = {}){
  if(document.querySelector(".bq")) return;
  const D = window.BUREAU_DATA || {REPLIQUES:{}, QUI:{}, VOIX:[], CLAUSES:[], SCEAU:""};
  const S = {etape:0, lus:[], fin:false}; try{ Object.assign(S, JSON.parse(localStorage.getItem(CLE) || "{}")); }catch(e){}
  const garde = () => { try{ localStorage.setItem(CLE, JSON.stringify(S)); }catch(e){} };
  const root = document.createElement("div"); root.className = "bq";
  root.innerHTML = `<canvas class="bq-gl"></canvas>
    <div class="bq-noir"><div class="bq-titre"><small>Arcanes · Magie</small><b>Sans suite</b><i>Le pilote</i></div><svg class="bq-voeu" viewBox="0 0 300 70" aria-hidden="true"><path pathLength="1" d="M8 40c10-22 16 18 26-2s8 20 18 0 10 16 20 2 14-30 20 0 10 8 18-4 12 18 22 2 6-20 16 2 14 6 22-6 10 20 20 4 12-18 20 0 16 8 26-4 10 14 22 2 14-10 22 4"/><path pathLength="1" d="M30 60c16-6 34 4 50-2s30 6 48 0 30 4 44 0"/></svg>
      <div class="bq-recu"><b>Reçu</b><small>Bureau des demandes · guichet de nuit</small></div><p class="bq-toucher">Toucher l'écran</p></div>
    <div class="bq-haut"><button type="button" class="bq-b" data-q aria-label="Quitter">✕</button><span class="bq-heure"></span><button type="button" class="bq-b" data-son aria-label="Son">♪</button><button type="button" class="bq-b" data-contrat aria-label="Le contrat" hidden>§</button></div>
    <p class="bq-cap"></p><div class="bq-sous" hidden><i></i><p></p></div><div class="bq-gestes" hidden></div><div class="bq-ui"></div>
    <button type="button" class="bq-agir" hidden></button><button type="button" class="bq-marche" aria-label="Avancer"><span></span><b>Avancer</b></button>`;
  document.body.appendChild(root); document.documentElement.classList.add("bq-ouvert");
  const $ = s => root.querySelector(s), canvas = $(".bq-gl");

  /* ---------------------------------------------------------------- le rendu */
  const renderer = new THREE.WebGLRenderer({canvas, antialias:false, powerPreference:"high-performance"}); renderer.setPixelRatio(1);
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(70, 1, .1, 600); cam.rotation.order = "YXZ"; scene.add(cam);
  let rt = null, RW = 2, RH = 2, fin = window.__bqFin || Math.min(window.devicePixelRatio || 1, 2), lent = .02, nImg = 0;
  const post = new THREE.ShaderMaterial({depthTest:false, depthWrite:false, uniforms:{tD:{value:null}, tZ:{value:null}, uRes:{value:new THREE.Vector2(2, 2)}, uPI:{value:cam.projectionMatrixInverse}, uCW:{value:cam.matrixWorld}, uCam:{value:cam.position}, uNF:{value:new THREE.Vector2(.1, 600)},
      uT:{value:0}, uNoir:{value:1}, uSombre:{value:0}, uEP:{value:new THREE.Vector3()}, uEf:{value:0}, uPix:{value:0}, uSec:{value:0}},
    vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }`,
    fragmentShader:`precision highp sampler2D; uniform sampler2D tD, tZ; uniform vec2 uRes, uNF; uniform mat4 uPI, uCW; uniform vec3 uCam, uEP; uniform float uT, uNoir, uSombre, uEf, uPix, uSec; varying vec2 vUv;
      float h21(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x*p.y); }
      float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3. - 2.*f); return mix(mix(h21(i), h21(i + vec2(1., 0.)), f.x), mix(h21(i + vec2(0., 1.)), h21(i + vec2(1., 1.)), f.x), f.y); }
      float b2(vec2 a){ a = floor(a); return fract(a.x/2. + a.y*a.y*.75); }
      float W(vec2 u){ return 1. - texture2D(tZ, u).x; }
      vec3 ton(vec2 u){ vec3 c = texture2D(tD, u).rgb; c = c/(c + .6)*1.6; return pow(max(c, 0.), vec3(1./2.2)); }
      void main(){ vec2 px = 1./uRes; float pas = 1. + floor(uPix*uRes.y/150.); vec2 uv = uPix > .001 ? (floor(vUv*uRes/pas) + .5)*pas/uRes : vUv, fc = uv*uRes;
        float d = texture2D(tZ, uv).x, w = 1. - d, n = uNF.x, f = uNF.y, z = f*n/((f - n)*w + n); bool ciel = d > .999995;
        vec4 v4 = uPI*vec4(uv*2. - 1., d*2. - 1., 1.); v4 /= v4.w; vec3 P = (uCW*v4).xyz, dir = normalize(P - uCam);
        vec3 c = ton(uv); float l = dot(c, vec3(.3, .59, .11)), sat = max(c.r, max(c.g, c.b)) - min(c.r, min(c.g, c.b));
        /* les aplats : quatre paliers, deux gammes ; ce que la lumière chaude touche passe du pétrole au laiton */
        float t = smoothstep(.015, .7, l), q = t*4., b = (floor(q) + smoothstep(.36, .64, fract(q)))/4.;
        vec3 froid = b < .34 ? mix(vec3(.012, .016, .03), vec3(.04, .13, .17), b/.34) : mix(vec3(.04, .13, .17), vec3(.6, .84, .82), (b - .34)/.66);
        vec3 chaud = b < .34 ? mix(vec3(.02, .012, .02), vec3(.27, .11, .04), b/.34) : b < .7 ? mix(vec3(.27, .11, .04), vec3(.86, .58, .22), (b - .34)/.36) : mix(vec3(.86, .58, .22), vec3(1., .94, .78), (b - .7)/.3);
        vec3 col = mix(froid, chaud, clamp((c.r - c.b)*3.4 + .06, 0., 1.)); col = mix(col, c*1.15, smoothstep(.36, .62, sat)*smoothstep(.34, .62, l));
        float bord = 0.;
        if(ciel){ float h = clamp(dir.y, -1., 1.), az = atan(dir.x, dir.z); col = mix(vec3(.78, .2, .07), vec3(.09, .015, .03), smoothstep(-.06, .5, h));
          col += vec3(.5, .16, .05)*smoothstep(.5, .9, vn(vec2(az*3., h*8.) + uT*.012))*.4*(1. - h);
          for(int i = 0; i < 2; i++){ float a = az - 1.2 - float(i)*.55 - sin(uT*.11 + float(i)*2.3)*.45; col += vec3(1., .78, .5)*exp(-abs(a)*(26. + h*40.))*smoothstep(-.05, .1, h)*.22; }
          col += smoothstep(.94, 1., vn(vec2(fc.x*.33 + fc.y*.04, fc.y*.018 + uT*11.)))*.13; col *= 1. - uSombre*.6; }
        else { vec2 u = uv + (vec2(vn(fc*.03), vn(fc*.03 + 9.)) - .5)*px*1.2; float e = 1.15, wc = W(u), wl = W(u - vec2(px.x*e, 0.)), wr = W(u + vec2(px.x*e, 0.)), wu = W(u + vec2(0., px.y*e)), wd = W(u - vec2(0., px.y*e));
          float lap = abs(wl + wr + wu + wd - 4.*wc)/max(max(wc, max(max(wl, wr), max(wu, wd))), 1e-7), loin = smoothstep(16., 85., z); bord = smoothstep(.012, .05, lap);
          col = mix(col, vec3(.92, .72, .36)*(.4 + .65*b), bord*.72*(1. - loin*.85)); col = mix(col, vec3(.016, .018, .034), loin*.55);
          /* l'Audit : ce qui est tamponné redevient du papier blanc */
          col *= 1. - uSombre*.6; if(uEf > .001){ float eb = smoothstep(uEf, uEf*.85, length((P - uEP)*vec3(1.9, .8, 1.)) + (vn(P.xy*2.6 + P.z*1.7) - .5)*1.1); col = mix(col, vec3(.95, .93, .87)*(1. - bord*.3), eb); } }
        /* l'étage du dessus est dessiné autrement : gros pixels, trame, violet */
        if(uPix > .001){ vec3 pv = mix(vec3(.07, .04, .15), vec3(.95, .8, 1.), clamp(floor(l*5. + b2(fc/pas)*.25 + b2(.5*fc/pas)) /5., 0., 1.)); col = mix(col, pv, uPix); }
        vec2 qv = vUv - .5; col *= 1. - dot(qv, qv)*.75; col += (h21(fc + uT) - .5)*.03; col += vec3(1., .96, .9)*uSec;
        gl_FragColor = vec4(col*(1. - uNoir), 1.); }`});
  const U = post.uniforms, quadScene = new THREE.Scene(), quadCam = new THREE.Camera(); quadScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), post));
  function taille(){ const W = root.clientWidth, H = root.clientHeight; RW = Math.max(160, Math.round(W*fin)); RH = Math.max(160, Math.round(H*fin));
    renderer.setSize(RW, RH, false); if(rt){ rt.depthTexture.dispose(); rt.dispose(); } rt = new THREE.WebGLRenderTarget(RW, RH, {minFilter:THREE.LinearFilter, magFilter:THREE.LinearFilter, depthBuffer:true});
    rt.depthTexture = new THREE.DepthTexture(RW, RH); rt.depthTexture.type = THREE.FloatType; rt.depthTexture.minFilter = rt.depthTexture.magFilter = THREE.NearestFilter;
    U.tD.value = rt.texture; U.tZ.value = rt.depthTexture; U.uRes.value.set(RW, RH); cam.aspect = W/H; cam.fov = W < H ? 80 : 62; cam.updateProjectionMatrix(); if(typeof main !== "undefined") main.position.x = Math.min(.24, .55*Math.tan(cam.fov*Math.PI/360)*cam.aspect*.42); }

  /* ---------------------------------------------------------------- matières, formes */
  const L = (c, o) => new THREE.MeshLambertMaterial(Object.assign({color:c}, o)), B = (c, o) => new THREE.MeshBasicMaterial(Object.assign({color:c}, o));
  const M = {porte:L(0x8a6426), bronze:L(0x5c431c), noir:L(0x1c1d26), pierre:L(0x9a9ca6), sombre:L(0x4a4c58), laiton:L(0xd09a3a), ivoire:L(0xece2cc), rouge:L(0x5a1614), lampe:B(0xffdca6), neon:B(0xeaffff), nuit:B(0x05050a)};
  const V = (x, y, z) => new THREE.Vector3(x, y, z), bo = (w, h, d, x, y, z, m, ry) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); if(ry) o.rotation.y = ry; scene.add(o); return o; };
  const cy = (r1, r2, h, x, y, z, m, seg = 16) => { const o = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, seg), m); o.position.set(x, y, z); scene.add(o); return o; };
  const lot = (geo, m, li) => { const im = new THREE.InstancedMesh(geo, m, li.length), o = new THREE.Object3D(); li.forEach((q, i) => { o.position.set(q[0], q[1], q[2]); o.scale.set(q[3] || 1, q[4] || 1, q[5] || 1); o.rotation.set(0, q[6] || 0, q[7] || 0); o.updateMatrix(); im.setMatrixAt(i, o.matrix); }); im.frustumCulled = false; scene.add(im); return im; };
  const peint = (w, h, fn) => { const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d"); fn(x, w, h); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; };
  const plaque = (txt, w, h, x, y, z, ry, o = {}) => { const t = peint(256, Math.round(256*h/w), (c, W, H) => { c.fillStyle = o.fond || "#0a0a10"; c.fillRect(0, 0, W, H); c.strokeStyle = c.fillStyle = o.c || "#f2c060"; c.lineWidth = 6; c.strokeRect(8, 8, W - 16, H - 16); c.font = `600 ${Math.round(H*(o.k || .56))}px Georgia, serif`; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText(txt, W/2, H/2 + H*.03); });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), B(0xffffff, {map:t})); m.position.set(x, y, z); m.rotation.y = ry || 0; scene.add(m); return m; };
  const lathe = (pts, seg = 16) => new THREE.LatheGeometry(pts.map(p => new THREE.Vector2(p[0], p[1])), seg);
  const halo = (s, c, op) => { const t = halo.t || (halo.t = peint(64, 64, x => { const g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(.35, "rgba(255,255,255,.4)"); g.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = g; x.fillRect(0, 0, 64, 64); })); const sp = new THREE.Sprite(new THREE.SpriteMaterial({map:t, color:c, transparent:true, opacity:op, depthWrite:false, blending:THREE.AdditiveBlending})); sp.scale.set(s, s, 1); return sp; };

  /* ---------------------------------------------------------------- le hall : une nef de 26 m sur 70, des verrières à droite, les guichets à gauche */
  const HX = 13, ZS = 7.4, ZN = -62, HH = 16, BAIES = [0, -8, -16, -24, -32, -40, -48, -56];
  { const t = peint(256, 256, x => { x.fillStyle = "#15161d"; x.fillRect(0, 0, 256, 256); const r = rng(5); x.strokeStyle = "rgba(120,125,150,.16)"; for(let i = 0; i < 26; i++){ x.lineWidth = .6 + r()*1.4; x.beginPath(); let px = r()*256, py = r()*256; x.moveTo(px, py); for(let k = 0; k < 5; k++){ px += (r() - .5)*90; py += (r() - .5)*90; x.lineTo(px, py); } x.stroke(); }
      x.strokeStyle = "#c79a44"; x.lineWidth = 5; x.strokeRect(2.5, 2.5, 251, 251); x.lineWidth = 3; x.beginPath(); x.moveTo(128, 14); x.lineTo(242, 128); x.lineTo(128, 242); x.lineTo(14, 128); x.closePath(); x.stroke(); x.fillStyle = "#c79a44"; x.fillRect(120, 120, 16, 16); });
    t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(13, 36); const sol = new THREE.Mesh(new THREE.PlaneGeometry(2*HX, ZS - ZN + 6), L(0xffffff, {map:t})); sol.rotation.x = -Math.PI/2; sol.position.set(0, 0, (ZS + ZN)/2 + 3); scene.add(sol); }
  bo(3.4, .04, 56, 0, .02, -24.5, M.rouge); bo(.16, .05, 56, -1.78, .03, -24.5, M.laiton); bo(.16, .05, 56, 1.78, .03, -24.5, M.laiton);                 /* le tapis */
  bo(2*HX + 2, .6, ZS - ZN + 4, 0, HH + .3, (ZS + ZN)/2, M.sombre);                                                                                           /* le plafond */
  bo(1, HH, ZS - ZN + 4, -HX - .5, HH/2, (ZS + ZN)/2, M.sombre); bo(2*HX + 2, HH, 1, 0, HH/2, ZN - .5, M.sombre);                                           /* mur des guichets, mur du fond */
  bo(1, 2, ZS - ZN + 4, HX + .5, 1, (ZS + ZN)/2, M.sombre); bo(1, 2.4, ZS - ZN + 4, HX + .5, HH - 1.2, (ZS + ZN)/2, M.sombre);                              /* allège et linteau des verrières */
  { const pil = [], cap = [], pou = [], men = []; for(let z = 4; z >= -60; z -= 8){ for(const s of [-1, 1]){ pil.push([s*(HX - .55), HH/2, z, 2.2, HH, 1.5]); for(let k = 0; k < 3; k++) cap.push([s*(HX - .55 - k*.12), HH - 1.2 - k*.9, z, 2.5 + k*.5, .5, 1.9 + k*.5]); pil.push([s*(HX - 1.5), 1.1, z, .5, 2.2, 2.1]); } pou.push([0, HH - .5, z, 2*HX, 1, .9]); }
    for(const z of BAIES){ for(const dz of [-1.4, 1.4]) men.push([HX + .2, 8, z + dz, .14, 12, .14]); for(const y of [5, 8, 11]) men.push([HX + .2, y, z, .14, .14, 5.6]); }
    const g = new THREE.BoxGeometry(1, 1, 1); lot(g, M.pierre, pil); lot(g, M.pierre, cap); lot(g, M.sombre, pou); lot(g, M.laiton, men); }
  /* la ville, dehors : des tours à gradins sous un ciel rouge */
  { const r = rng(11), li = [], fen = []; for(let i = 0; i < 15; i++){ const x = 60 + r()*90, z = 30 - i*9 + (r() - .5)*5, w = 6 + r()*7, h = 14 + r()*r()*62; li.push([x, h/2 - 8, z, w, h, w]); li.push([x, h - 8 + 3, z, w*.62, 6, w*.62]); li.push([x, h - 8 + 8, z, w*.3, 5, w*.3]); li.push([x, h - 8 + 14, z, .3, 8, .3]);
      for(let k = 0; k < 7; k++) fen.push([x - w/2 - .1, r()*(h - 14), z + (r() - .5)*(w - 1.6), .1, .9, .6]); }
    lot(new THREE.BoxGeometry(1, 1, 1), M.nuit, li); lot(new THREE.BoxGeometry(1, 1, 1), B(0xffc860), fen); }
  /* le mur du fond : un soleil de laiton, une horloge, la porte de l'Audit */
  { const li = []; for(let i = 0; i < 17; i++){ const a = (i/16 - .5)*Math.PI*.92, len = i % 2 ? 9 : 12.5; li.push([Math.sin(a)*(3 + len/2), 6 + Math.cos(a)*(3 + len/2), ZN + .12, i % 2 ? .12 : .2, len, .14, 0, -a]); } lot(new THREE.BoxGeometry(1, 1, 1), M.laiton, li);
    const h = cy(2.6, 2.6, .2, 0, 6, ZN + .2, M.lampe, 40); h.rotation.x = Math.PI/2; const c2 = cy(2.9, 2.9, .12, 0, 6, ZN + .12, M.laiton, 40); c2.rotation.x = Math.PI/2; bo(.12, 1.9, .1, 0, 6.8, ZN + .36, M.nuit); bo(1.3, .12, .1, .6, 6, ZN + .36, M.nuit);
    bo(2.6, 4, .3, -8, 2, ZN + .1, M.nuit); bo(3.2, .3, .5, -8, 4.15, ZN + .2, M.laiton); bo(.3, 4.2, .5, -9.5, 2.1, ZN + .2, M.laiton); bo(.3, 4.2, .5, -6.5, 2.1, ZN + .2, M.laiton); }
  /* les guichets : un comptoir, une grille de laiton, un numéro */
  const GUICHETS = [28, 29, 30, 31, 32, 33].map((n, i) => ({n, z:-8 - i*8}));
  { const bar = [], g = new THREE.BoxGeometry(1, 1, 1); for(const q of GUICHETS){ bo(1.5, 1.15, 5.2, -HX + .8, .575, q.z, M.noir); bo(1.7, .1, 5.4, -HX + .8, 1.2, q.z, M.laiton); for(let k = -5; k <= 5; k++) bar.push([-HX + 1.4, 2.3, q.z + k*.46, .05, 2.1, .05]); bar.push([-HX + 1.4, 3.4, q.z, .14, .14, 5.2]); bar.push([-HX + 1.4, 2.3, q.z - 2.55, .14, 2.3, .14]); bar.push([-HX + 1.4, 2.3, q.z + 2.55, .14, 2.3, .14]);
      plaque(String(q.n), 1.5, 1, -HX + 1.5, 4.25, q.z, Math.PI/2); } lot(g, M.laiton, bar); }
  /* l'ascenseur : une cage de laiton, deux vantaux, un éventail au-dessus de la porte */
  bo(HX - 1.3, HH, .8, -(HX + 1.3)/2, HH/2, ZS + .4, M.sombre); bo(HX - 1.3, HH, .8, (HX + 1.3)/2, HH/2, ZS + .4, M.sombre); bo(2.6, HH - 3.3, .8, 0, 3.3 + (HH - 3.3)/2, ZS + .4, M.sombre);
  bo(.2, 3.3, 3.4, -1.4, 1.65, ZS + 2.4, M.porte); bo(.2, 3.3, 3.4, 1.4, 1.65, ZS + 2.4, M.porte); bo(3, 3.3, .2, 0, 1.65, ZS + 4.1, M.porte); bo(3, .2, 3.6, 0, 3.4, ZS + 2.4, M.sombre); bo(3, .06, 3.6, 0, .03, ZS + 2.4, M.rouge);
  { const li = []; for(const s of [-1, 1]) for(const z of [1.2, 2.4, 3.6]){ li.push([s*1.28, 1.65, ZS + z, .06, 3.3, .22]); li.push([s*1.27, 1.0, ZS + z - .6, .04, .05, 1]); li.push([s*1.27, 2.5, ZS + z - .6, .04, .05, 1]); } for(const x of [-.75, 0, .75]) li.push([x, 1.65, ZS + 3.98, .22, 3.3, .06]); lot(new THREE.BoxGeometry(1, 1, 1), M.bronze, li);
    bo(.05, .05, 2.2, -1.27, 1.05, ZS + 2.6, M.laiton); bo(.05, .05, 2.2, 1.27, 1.05, ZS + 2.6, M.laiton);                                                 /* les mains courantes */
    bo(.16, .5, .3, 1.25, 1.2, ZS + .75, M.noir); }
  const levier = bo(.05, .42, .05, 1.14, 1.42, ZS + .75, M.laiton); cy(.06, .06, .08, 1.14, 1.64, ZS + .75, M.ivoire, 8);
  /* le cadran d'étage, au-dessus de la porte : rez-de-chaussée à gauche, sept étages */
  bo(2.6, .62, .1, 0, 3.0, ZS + .3, M.noir); bo(2.6, .05, .14, 0, 2.7, ZS + .3, M.laiton);
  { const c = new THREE.Mesh(new THREE.CircleGeometry(.27, 24, 0, Math.PI), B(0xf2e6c6)); c.position.set(0, 2.78, ZS + .36); scene.add(c); const li = []; for(let i = 0; i < 8; i++){ const a = Math.PI*(1 - i/7)*.92 + .12; li.push([Math.cos(a)*.22, 2.78 + Math.sin(a)*.22, ZS + .365, .014, .05, .01, 0, a - Math.PI/2]); } lot(new THREE.BoxGeometry(1, 1, 1), M.nuit, li); }
  const aiguille = new THREE.Group(); { const a = new THREE.Mesh(new THREE.BoxGeometry(.016, .21, .01), B(0x8a1c14)); a.position.y = .105; aiguille.add(a); aiguille.position.set(0, 2.78, ZS + .372); scene.add(aiguille); }
  const etage = k => { aiguille.rotation.z = Math.PI*(1 - k/7)*.92 + .12 - Math.PI/2; }; etage(0);
  { const li = []; for(let i = 0; i < 9; i++){ const a = (i/8 - .5)*Math.PI*.8; li.push([Math.sin(a)*1.5, 3.5 + Math.cos(a)*1.5, ZS - .06, .07, 2.6, .08, 0, -a]); } lot(new THREE.BoxGeometry(1, 1, 1), M.laiton, li); bo(.3, 3.5, .3, -1.45, 1.75, ZS - .05, M.laiton); bo(.3, 3.5, .3, 1.45, 1.75, ZS - .05, M.laiton); }
  const vantaux = [-1, 1].map(s => { const v = bo(1.3, 3.3, .1, s*.65, 1.65, ZS + .15, M.porte); for(const z of [.06, -.06]){ for(let k = 0; k < 6; k++){ const c = new THREE.Mesh(new THREE.BoxGeometry(1.5, .07, .02), M.bronze); c.position.set(0, -1.1 + k*.5, z); c.rotation.z = s*.6; c.scale.x = .8; v.add(c); } const m = new THREE.Mesh(new THREE.BoxGeometry(.06, 3.3, .03), M.laiton); m.position.set(-s*.6, 0, z); v.add(m); } return v; }), lampeCab = cy(.3, .3, .08, 0, 3.26, ZS + 2.4, M.lampe);
  /* la borne à tickets, le tableau, les lustres, les bancs, le poste pneumatique */
  const BORNE = V(3.4, 0, -5); cy(.28, .36, 1.25, BORNE.x, .625, BORNE.z, M.laiton, 12); cy(.4, .4, .1, BORNE.x, 1.28, BORNE.z, M.noir, 12); bo(.3, .06, .2, BORNE.x, 1.36, BORNE.z, M.ivoire);
  bo(5.4, 2.1, .3, 0, 8.6, -12, M.noir); bo(.08, 6.4, .08, -2.2, 12.8, -12, M.laiton); bo(.08, 6.4, .08, 2.2, 12.8, -12, M.laiton); const tableau = plaque("N° 72", 5, 1.7, 0, 8.6, -11.84, 0, {k:.66});
  const LUSTRES = [-2, -20, -50].map(z => { cy(.03, .03, 5.2, 0, 13.3, z, M.laiton, 5); const s = new THREE.Mesh(new THREE.SphereGeometry(.7, 16, 12), M.lampe); s.position.set(0, 10.4, z); scene.add(s); cy(.9, .9, .08, 0, 10.9, z, M.laiton, 16); const h = halo(6, 0xffb060, .35); h.position.copy(s.position); scene.add(h); return s.position; });
  for(const z of [-13, -21]){ bo(1, .12, 4.4, 10, .6, z, M.noir); bo(.2, 1.3, 4.4, 10.5, .95, z, M.noir); bo(.9, .6, .2, 10, .3, z - 2, M.laiton); bo(.9, .6, .2, 10, .3, z + 2, M.laiton); }
  const TUBE = V(-6.6, 0, -27.5); bo(.8, 1.2, .8, TUBE.x, .6, TUBE.z, M.noir); bo(.9, .08, .9, TUBE.x, 1.24, TUBE.z, M.laiton); bo(.9, .08, .9, TUBE.x, .06, TUBE.z, M.laiton); bo(.5, .5, .04, TUBE.x, .7, TUBE.z + .41, M.laiton); bo(.36, .36, .05, TUBE.x, .7, TUBE.z + .42, M.noir);
  cy(.16, .16, HH - 1.3, TUBE.x, 1.3 + (HH - 1.3)/2, TUBE.z, L(0x9ad0d0, {transparent:true, opacity:.3}), 10); for(const y of [1.34, 4, 8, 12]) cy(.21, .21, .1, TUBE.x, y, TUBE.z, M.laiton, 10);
  const capsule = cy(.11, .11, .46, TUBE.x, 12, TUBE.z, M.ivoire, 10); { const b = new THREE.Mesh(new THREE.CylinderGeometry(.118, .118, .1, 10), L(0x9c2a1c)); capsule.add(b); } capsule.visible = false;
  /* l'accueil : un comptoir rond sous un anneau de néon */
  const ACC = V(0, 0, -34); { const c = new THREE.Mesh(new THREE.CylinderGeometry(3, 3.1, 1.15, 28, 1, true), M.noir); c.position.set(0, .575, ACC.z); c.material = L(0x1c1d26, {side:THREE.DoubleSide}); scene.add(c);
    for(const [r, y] of [[3.05, 1.18], [3.12, .1]]){ const t = new THREE.Mesh(new THREE.TorusGeometry(r, .07, 6, 40), M.laiton); t.rotation.x = Math.PI/2; t.position.set(0, y, ACC.z); scene.add(t); } }
  const neon = new THREE.Mesh(new THREE.TorusGeometry(1.5, .07, 8, 48), M.neon); neon.rotation.x = Math.PI/2; neon.position.set(0, 4.5, ACC.z); scene.add(neon); const haloN = halo(7, 0xdffcff, .42); haloN.position.set(0, 3.6, ACC.z - 1.6); scene.add(haloN);
  bo(.03, HH - 4.5, .03, -1.5, 4.5 + (HH - 4.5)/2, ACC.z, M.laiton); bo(.03, HH - 4.5, .03, 1.5, 4.5 + (HH - 4.5)/2, ACC.z, M.laiton);

  /* ce qu'on voit quand les portes se rouvrent : le premier étage, peint en gros pixels */
  const lune = new THREE.Group(); { const t = peint(64, 64, x => { for(let y = 0; y < 45; y++){ const k = y/45; x.fillStyle = `rgb(${10 + k*30|0},${6 + k*20|0},${28 + k*50|0})`; x.fillRect(0, y, 64, 1); }
      const r = rng(21); x.fillStyle = "#cfc0f0"; for(let i = 0; i < 46; i++) x.fillRect(r()*64|0, r()*43|0, 1, 1);
      x.fillStyle = "#efe6ff"; for(let y = -9; y <= 9; y++) for(let xx = -9; xx <= 9; xx++) if(xx*xx + y*y <= 84) x.fillRect(32 + xx, 33 + y, 1, 1);
      x.fillStyle = "#b9a8e2"; for(const [cx, cy, w, h] of [[27, 28, 3, 2], [35, 27, 2, 2], [36, 34, 3, 3], [28, 36, 2, 2], [32, 31, 2, 1]]) x.fillRect(cx, cy, w, h);
      x.fillStyle = "#3a2c68"; x.fillRect(0, 45, 64, 19); x.fillStyle = "#5a4a92"; for(let xx = 0; xx < 64; xx++) x.fillRect(xx, 45 + Math.round(Math.sin(xx*.33)*.8 + .8), 1, 1);
      x.fillStyle = "#cbbcf2"; for(let y = 46; y < 56; y++) x.fillRect(y < 50 ? 32 : 31, y, y < 50 ? 1 : 2, 1);
      x.fillStyle = "#05030c"; for(const cx of [26, 32, 38]){ x.fillRect(cx - 1, 38, 3, 9); x.fillRect(cx - 1, 35, 3, 2); x.fillRect(cx, 0, 1, 35); x.fillRect(cx - 2, 39, 1, 4); x.fillRect(cx + 2, 39, 1, 4); } });
    t.magFilter = t.minFilter = THREE.NearestFilter; t.generateMipmaps = false; const f = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), B(0xffffff, {map:t})); f.position.set(0, 3.6, ZS - 6);
    const g = new THREE.Mesh(new THREE.PlaneGeometry(12, 6.2), B(0x3a2c68)); g.rotation.x = -Math.PI/2; g.position.set(0, .08, ZS - 2.95); const c = new THREE.Mesh(new THREE.PlaneGeometry(.7, 6.2), B(0xcbbcf2)); c.rotation.x = -Math.PI/2; c.position.set(0, .09, ZS - 2.95);
    const pa = c.geometry.attributes.position; for(let i = 0; i < pa.count; i++) if(pa.getY(i) > 0) pa.setX(i, pa.getX(i)*.45); lune.add(f, g, c); lune.visible = false; scene.add(lune); }

  /* ---------------------------------------------------------------- la lumière */
  const hemi = new THREE.HemisphereLight(0x7fa6c0, 0x0c0c14, .55); scene.add(hemi);
  const dehors = new THREE.DirectionalLight(0xff6a38, .9); dehors.position.set(10, 5, 2); scene.add(dehors);
  const feux = LUSTRES.map(p => { const l = new THREE.PointLight(0xffb060, 160, 34, 1.7); l.position.copy(p); scene.add(l); return l; });
  const lNeon = new THREE.PointLight(0xdffcff, 60, 20, 1.7); lNeon.position.set(0, 4.3, ACC.z); scene.add(lNeon);
  const lCab = new THREE.PointLight(0xffc070, 13, 9, 1.6); lCab.position.set(0, 2.9, ZS + 2.4); scene.add(lCab);
  const lMur = new THREE.PointLight(0xffb060, 0, 22, 1.5); lMur.position.set(-8, 2.6, -24); scene.add(lMur);

  /* ---------------------------------------------------------------- les personnages : des silhouettes tournées, sans visage */
  function figure(o){ const g = new THREE.Group(), mc = L(o.c), P = (geo, m, x = 0, y = 0, z = 0) => { const q = new THREE.Mesh(geo, m || mc); q.position.set(x, y, z); g.add(q); return q; }, H = o.h;
    if(o.jambes) g.userData.j = [-1, 1].map(s => { const j = new THREE.Group(); j.position.set(s*.1, o.jambes, 0); const q = new THREE.Mesh(new THREE.CylinderGeometry(.08, .06, o.jambes, 8), mc); q.position.y = -o.jambes/2; j.add(q); g.add(j); return j; });
    P(lathe(o.profil)); const tete = P(new THREE.SphereGeometry(o.tete || .125, 14, 10), o.peau ? L(o.peau) : mc, 0, H + .2, 0); tete.scale.set(.92, 1.22, 1); g.userData.tete = tete;
    if(o.col) P(new THREE.CylinderGeometry(.075, .09, .1, 10), M.ivoire, 0, H + .04, 0);
    g.userData.bras = [-1, 1].map(s => { const b = new THREE.Group(); b.position.set(s*(o.ep || .27), H - .06, 0); const q = new THREE.Mesh(new THREE.CylinderGeometry(.052, .042, o.bras || .72, 7), mc); q.position.y = -(o.bras || .72)/2; b.add(q); const m = new THREE.Mesh(new THREE.SphereGeometry(.055, 8, 6), o.gants ? M.ivoire : mc); m.position.y = -(o.bras || .72) - .03; b.add(m); b.rotation.z = s*.07; g.add(b); return b; });
    if(o.chapeau === "melon"){ const c = P(new THREE.SphereGeometry(.14, 14, 8, 0, TAU, 0, Math.PI/2), null, 0, H + .27, 0); c.scale.y = 1.05; P(new THREE.CylinderGeometry(.2, .2, .025, 18), null, 0, H + .275, 0); }
    if(o.chapeau === "kepi"){ P(new THREE.CylinderGeometry(.135, .125, .13, 14), null, 0, H + .37, 0); P(new THREE.CylinderGeometry(.16, .16, .02, 14, 1, false, -1, 2), M.noir, 0, H + .31, .06); P(new THREE.CylinderGeometry(.137, .137, .03, 14), M.laiton, 0, H + .33, 0); }
    if(o.visiere){ const v = P(new THREE.CylinderGeometry(.19, .19, .02, 14, 1, false, -1.2, 2.4), L(0x2f6a4a), 0, H + .27, .04); v.rotation.x = .25; }
    if(o.monocle){ P(new THREE.TorusGeometry(.034, .008, 6, 14), M.laiton, .05, H + .23, .118); const ch = P(new THREE.CylinderGeometry(.004, .004, .2, 4), M.laiton, .1, H + .12, .1); ch.rotation.z = -.35; }
    if(o.cheveux){ const c = P(new THREE.SphereGeometry(o.tete || .125, 14, 10), B(0x08080c), 0, H + .235, -.03); c.scale.set(.96, 1.2, 1); }
    if(o.lunettes) for(const sx of [-1, 1]){ const l = P(new THREE.CircleGeometry(.034, 14), B(0xf4f4ee), sx*.048, H + .225, .121); l.rotation.y = sx*.3; }
    if(o.moustache) for(const sx of [-1, 1]){ const m = P(new THREE.SphereGeometry(.03, 8, 6), M.ivoire, sx*.04, H + .13, .108); m.scale.set(1.8, .55, .7); m.rotation.z = -sx*.35; }
    /* le devant du costume : plastron, cravate, revers, boutons ; r(y) est le rayon du torse à cette hauteur */
    if(o.devant){ const d = o.devant, rr = y => { const pr = o.profil; for(let i = 1; i < pr.length; i++) if(y <= pr[i][1]) return lerp(pr[i - 1][0], pr[i][0], (y - pr[i - 1][1])/Math.max(1e-4, pr[i][1] - pr[i - 1][1])); return .2; }, y0 = H - .22, inc = Math.atan((rr(H - .08) - rr(H - .36))/.28);
      if(d.plastron){ const q = P(new THREE.BoxGeometry(.13, .36, .012), B(d.plastron), 0, y0, rr(y0) + .004); q.rotation.x = inc; }
      if(d.cravate){ const q = P(new THREE.BoxGeometry(.045, .34, .012), B(d.cravate), 0, y0 - .01, rr(y0) + .014); q.rotation.x = inc; }
      if(d.revers) for(const sx of [-1, 1]){ const q = P(new THREE.BoxGeometry(.085, .42, .014), L(d.revers), sx*.1, y0 - .02, rr(y0) + .0); q.rotation.set(inc, sx*.35, sx*.3); }
      if(d.boutons) for(let i = 0; i < d.boutons; i++){ const y = y0 - .26 - i*.11; for(const sx of d.rangs === 2 ? [-1, 1] : [0]) P(new THREE.SphereGeometry(.016, 6, 5), M.laiton, sx*.075, y, Math.sqrt(Math.max(.001, rr(y)*rr(y) - .0056*sx*sx)) + .004); }
      if(d.pochette){ const q = P(new THREE.BoxGeometry(.07, .035, .012), B(d.pochette), .17, H - .2, Math.sqrt(Math.max(.001, rr(H - .2)**2 - .0289)) + .006); q.rotation.y = .6; }
      if(d.epaulettes) for(const sx of [-1, 1]) P(new THREE.BoxGeometry(.14, .03, .12), M.laiton, sx*(o.ep || .27), H + .0, 0); }
    if(!o.sansOmbre){ const om = new THREE.Mesh(new THREE.CircleGeometry(o.h*.3, 18), B(0x000000, {transparent:true, opacity:.55, depthWrite:false})); om.rotation.x = -Math.PI/2; om.position.y = .045; g.add(om); }
    g.position.set(o.x, 0, o.z); g.rotation.y = o.ry || 0; scene.add(g); return g; }
  const vers = (g, x, z) => { g.rotation.y = Math.atan2(x - g.position.x, z - g.position.z); };
  const ASC = figure({c:0x6a1c18, h:1.42, x:.7, z:ZS + .95, ry:Math.PI, chapeau:"kepi", moustache:true, peau:0xc0a890, devant:{boutons:4, rangs:2, epaulettes:true}, profil:[[0, 0], [.3, 0], [.27, .5], [.24, .95], [.3, 1.3], [.31, 1.42], [.1, 1.5], [0, 1.5]], sansOmbre:true});
  const ANGE = figure({c:0xf4f2ea, h:3.05, x:0, z:ACC.z + .9, ep:.5, bras:1.55, tete:.17, peau:0x0c0c12, profil:[[0, 0], [.62, 0], [.54, 1.1], [.36, 1.86], [.37, 1.98], [.42, 2.5], [.5, 2.88], [.44, 3.05], [.2, 3.12], [.17, 3.2], [0, 3.2]]});
  ANGE.userData.tete.material = B(0x06060a);
  { const sombre = B(0x2c2e3a), P = (geo, x, y, z, rx, rz) => { const q = new THREE.Mesh(geo, sombre); q.position.set(x, y, z); q.rotation.set(rx || 0, 0, rz || 0); ANGE.add(q); return q; };
    P(new THREE.CylinderGeometry(.385, .375, .11, 18), 0, 1.92, 0); P(new THREE.BoxGeometry(.13, .15, .05), 0, 1.92, .38);                                  /* la ceinture et sa boucle */
    for(const s of [-1, 1]){ P(new THREE.BoxGeometry(.2, .62, .03), s*.15, 2.74, .4, -.2, s*.36); for(const y of [2.3, 2.1, 1.6, 1.3]) P(new THREE.SphereGeometry(.028, 6, 5), s*.13, y, lerp(.62, .36, y/1.9 > 1 ? 1 : y/1.9) + (y > 1.9 ? .05 : .0)); } }
  const MARQ = figure({c:0x30303c, h:2.02, x:-HX + .5, z:-24, ry:Math.PI/2, jambes:1.06, col:true, gants:true, monocle:true, cheveux:true, peau:0xc8c2b6, devant:{plastron:0xf2ecdc, cravate:0x7a1410, revers:0x50505e, boutons:3, pochette:0x9c2a1c}, ep:.3, bras:.98, profil:[[0, 1], [.19, 1], [.2, 1.3], [.27, 1.72], [.33, 1.95], [.3, 2.02], [.1, 2.1], [0, 2.1]]}); MARQ.visible = false;
  const AUD = figure({c:0x8a8c94, h:1.5, x:-8, z:ZN + 1.5, jambes:.8, chapeau:"melon", lunettes:true, col:true, peau:0xb8b6b0, devant:{plastron:0xe8e8e4, cravate:0x101014}, profil:[[0, .78], [.23, .78], [.25, 1.1], [.28, 1.4], [.29, 1.5], [.1, 1.57], [0, 1.57]]}); AUD.visible = false;
  { const t = new THREE.Mesh(new THREE.CylinderGeometry(.05, .07, .16, 10), M.noir); t.position.y = -.82; AUD.userData.bras[1].add(t); const s = new THREE.Mesh(new THREE.BoxGeometry(.34, .26, .09), M.noir); s.position.set(0, -.9, 0); AUD.userData.bras[0].add(s); }
  const COMMIS = GUICHETS.filter(q => q.n !== 30).map(q => figure({c:0x3c3e4a, h:1.42, x:-HX + .35, z:q.z, ry:Math.PI/2, visiere:true, peau:0xb0aaa0, sansOmbre:true, profil:[[0, .9], [.26, .9], [.28, 1.2], [.3, 1.42], [.1, 1.5], [0, 1.5]]}));
  const COMMIS31 = COMMIS[2];
  [[10, -12], [10, -14.2], [10, -21.5]].forEach(([x, z], i) => { const f = figure({c:[0x4a4a56, 0x56505a, 0x44484e][i], h:1.25, x, z, ry:-Math.PI/2, chapeau:i === 1 ? "melon" : null, sansOmbre:true, profil:[[0, .62], [.3, .62], [.27, .95], [.29, 1.25], [.1, 1.33], [0, 1.33]]}); f.userData.tete.rotation.x = .5; });
  /* l'ombre du Marquis : celle d'une bête ailée, sur le mur au-dessus des guichets */
  const ombreBete = new THREE.Mesh(new THREE.PlaneGeometry(13, 10), B(0x000000, {transparent:true, opacity:0, depthWrite:false, map:peint(512, 400, (x, W, H) => { x.fillStyle = "#000"; x.fillRect(0, 0, W, H); x.fillStyle = "#fff"; x.translate(256, 0);
    for(const s of [-1, 1]){ x.save(); x.scale(s, 1); x.beginPath(); x.moveTo(0, 400); x.lineTo(40, 400); x.lineTo(54, 196); x.lineTo(28, 176); x.lineTo(20, 150); x.quadraticCurveTo(30, 132, 22, 108);                           /* le corps, l'épaule, la tête */
      x.quadraticCurveTo(46, 84, 40, 40); x.quadraticCurveTo(26, 66, 12, 96); x.lineTo(0, 92); x.lineTo(0, 400); x.fill();                                                                             /* la corne */
      x.beginPath(); x.moveTo(40, 190); x.quadraticCurveTo(70, 120, 132, 26); x.quadraticCurveTo(200, 50, 250, 132); x.quadraticCurveTo(214, 128, 200, 176); x.quadraticCurveTo(170, 160, 150, 214); x.quadraticCurveTo(120, 196, 100, 250); x.quadraticCurveTo(76, 236, 50, 280); x.closePath(); x.fill(); x.restore(); } })}));
  ombreBete.material.alphaMap = ombreBete.material.map; ombreBete.material.map = null; ombreBete.rotation.y = Math.PI/2; ombreBete.position.set(-HX + .06, 8.4, -24); scene.add(ombreBete);
  /* les yeux de l'ange, dans les plis du manteau */
  const yeux = []; { const r = rng(3), gI = new THREE.SphereGeometry(.078, 10, 8); for(let i = 0; i < 18; i++){ const y = .5 + r()*2.25, a = (r() - .5)*1.5, rr = (y < 1.9 ? lerp(.6, .37, y/1.9) : lerp(.38, .5, (y - 1.9)/1)) + .012, e = new THREE.Group(); const bl = new THREE.Mesh(gI, B(0x06060a)); bl.scale.set(1.5, 1, .35); const ir = new THREE.Mesh(gI, B(0xffc04a)); ir.scale.set(.5, .62, .38); ir.position.z = .008; e.add(bl, ir); e.position.set(Math.sin(a)*rr, y, Math.cos(a)*rr); e.rotation.y = a; e.scale.setScalar(.001); e.userData.p = r()*9; ANGE.add(e); yeux.push(e); } }

  const main = new THREE.Group(); { const m = new THREE.Mesh(new THREE.CylinderGeometry(.045, .055, .5, 8), L(0x2a2c36)); m.position.y = -.25; const h = new THREE.Mesh(new THREE.SphereGeometry(.06, 10, 8), L(0xd8c4a8)); h.scale.set(.8, 1.25, .5); h.position.y = .06; const d = new THREE.Mesh(new THREE.CylinderGeometry(.014, .016, .1, 6), L(0xd8c4a8)); d.position.set(0, .16, 0); d.visible = false; main.add(m, h, d); main.userData.doigt = d; main.position.set(.2, -.9, -.55); main.rotation.z = .12; main.visible = false; cam.add(main); }
  const papier = new THREE.Mesh(new THREE.PlaneGeometry(.13, .18), B(0xffe0a0)); papier.position.set(0, .2, .012); papier.visible = false; main.add(papier); taille();
  /* geste du héros : "main" (la lever), "haut" (montrer), "non" (secouer la tête), "epaules", "rien" */
  async function mime(k){ if(etat.vite) return; const q0 = cam.quaternion.clone(), tourne = (ax, a) => cam.quaternion.copy(q0).multiply(new THREE.Quaternion().setFromAxisAngle(ax, a)), cine = etat.cine; etat.cine = true;
    if(k === "main" || k === "haut"){ main.visible = true; main.userData.doigt.visible = k === "haut"; await tw(450, t => main.position.y = lerp(-.9, k === "haut" ? -.2 : -.32, t)); await attends(700); await tw(400, t => main.position.y = lerp(k === "haut" ? -.2 : -.32, -.9, t)); main.visible = false; }
    else if(k === "non") await tw(900, t => tourne(up, Math.sin(t*TAU*2)*.13*(1 - t*.3)), t => t);
    else if(k === "epaules") await tw(800, t => tourne(V(0, 0, 1), Math.sin(t*Math.PI)*.06), t => t);
    else await attends(900);
    cam.quaternion.copy(q0); etat.cine = cine; }
  async function tend(montre){ if(etat.vite) return; main.visible = true; papier.visible = true; main.userData.doigt.visible = false; await tw(500, t => main.position.y = lerp(-.9, -.38, t)); await attends(montre || 900); await tw(400, t => main.position.y = lerp(-.38, -.9, t)); main.visible = false; papier.visible = false; }

  /* ---------------------------------------------------------------- le son : tout est synthétisé */
  const Son = (() => { let ac = null, sortie = null, muet = false, bruit = null;
    const init = () => { if(ac) return; try{ ac = new (window.AudioContext || window.webkitAudioContext)(); sortie = ac.createGain(); sortie.gain.value = .9; sortie.connect(ac.destination);
        const n = ac.sampleRate*2, buf = ac.createBuffer(1, n, ac.sampleRate), d = buf.getChannelData(0); for(let i = 0; i < n; i++) d[i] = Math.random()*2 - 1; bruit = buf;
        const s = ac.createBufferSource(); s.buffer = buf; s.loop = true; const f = ac.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = 2600; f.Q.value = .4; const g = ac.createGain(); g.gain.value = .018; s.connect(f).connect(g).connect(sortie); s.start();      /* la pluie sur les verrières */
        const o = ac.createOscillator(); o.type = "sine"; o.frequency.value = 55; const g2 = ac.createGain(); g2.gain.value = .03; o.connect(g2).connect(sortie); o.start(); }catch(e){ ac = null; } };
    const note = (f, v = .05, d = .5, type = "sine", f2) => { if(!ac || muet) return; const t = ac.currentTime, o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.setValueAtTime(f, t); if(f2) o.frequency.exponentialRampToValueAtTime(f2, t + d); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .012); g.gain.exponentialRampToValueAtTime(.0001, t + d); o.connect(g).connect(sortie); o.start(t); o.stop(t + d + .05); };
    const souffle = (v = .12, d = .4, f = 800) => { if(!ac || muet) return; const t = ac.currentTime, s = ac.createBufferSource(), fl = ac.createBiquadFilter(), g = ac.createGain(); s.buffer = bruit; fl.type = "lowpass"; fl.frequency.setValueAtTime(f, t); fl.frequency.exponentialRampToValueAtTime(90, t + d); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.0001, t + d); s.connect(fl).connect(g).connect(sortie); s.start(t); s.stop(t + d + .05); };
    return {init, note, souffle, tampon:() => { note(70, .5, .5, "sine", 32); souffle(.5, .22, 1400); }, ding:() => { note(1318, .1, 1.6); note(1976, .04, 1.2); }, bip:(f) => note(f*(1 + (Math.random() - .5)*.08), .035, .07, "triangle"), bascule:() => { muet = !muet; if(sortie) sortie.gain.value = muet ? 0 : .9; return muet; }, fin:() => { try{ ac && ac.close(); }catch(e){} }}; })();

  /* ---------------------------------------------------------------- le temps, la caméra de cinéma */
  const anims = [], etat = {vite:false, occupe:false, fige:true, cine:null}, majs = [];
  const tw = (ms, fn, e = doux) => new Promise(res => anims.push({t:0, ms:etat.vite ? Math.min(ms, 30) : ms, fn, e, res})), attends = ms => tw(ms, () => {});
  const J = {x:0, z:ZS + 2.9, yaw:0, pitch:0, v:0, touches:{}, pas:0}, up = V(0, 1, 0), mL = new THREE.Matrix4(), vise = (p, c) => new THREE.Quaternion().setFromRotationMatrix(mL.lookAt(p, c, up));
  async function plan(ms, pos, cible, e){ const p0 = cam.position.clone(), q0 = cam.quaternion.clone(), q1 = vise(pos, cible); etat.cine = true; await tw(ms, k => { cam.position.lerpVectors(p0, pos, k); cam.quaternion.slerpQuaternions(q0, q1, k); }, e); }
  async function rends(ms = 1100){ const p = V(J.x, 1.7, J.z), c = V(J.x - Math.sin(J.yaw)*10, 1.7 + Math.tan(J.pitch)*10, J.z - Math.cos(J.yaw)*10); await plan(ms, p, c); etat.cine = null; }
  const regardeVers = (x, z) => { J.yaw = Math.atan2(-(x - J.x), -(z - J.z)); J.pitch = 0; };
  const va = (g, x, z, v = 1.5) => { const x0 = g.position.x, z0 = g.position.z, d = Math.hypot(x - x0, z - z0); vers(g, x, z); return tw(d/v*1000, (k, lin) => { g.position.x = lerp(x0, x, k); g.position.z = lerp(z0, z, k); const ph = lin*d*3.4; g.position.y = Math.abs(Math.sin(ph))*.03; if(g.userData.j){ g.userData.j[0].rotation.x = Math.sin(ph)*.5; g.userData.j[1].rotation.x = -Math.sin(ph)*.5; } }, k => k).then(() => { g.position.y = 0; if(g.userData.j) g.userData.j.forEach(j => j.rotation.x = 0); }); };

  /* ---------------------------------------------------------------- l'interface : légende, répliques, gestes, contrat */
  const capEl = $(".bq-cap"), sous = $(".bq-sous"), gestesEl = $(".bq-gestes"), ui = $(".bq-ui"), agir = $(".bq-agir"); let capT = 0;
  const cap = (txt, ms = 6000) => { clearTimeout(capT); capEl.textContent = txt; capEl.classList.add("on"); capT = setTimeout(() => capEl.classList.remove("on"), ms); };
  const TON = {asc:150, ang:520, mar:110, aud:230, gui:300, dir:200};
  /* une réplique : le texte s'écrit lettre à lettre avec la « voix » du personnage ; on touche pour passer */
  const dit = id => new Promise(res => { const qui = id.replace(/[a-z]?\d+[a-z]?$/, "").replace(/a$/, ""), k = id.slice(0, 3), txt = D.REPLIQUES[id] || id; if(etat.vite) return res();
    sous.hidden = false; sous.dataset.qui = k; sous.querySelector("i").textContent = D.QUI[k] || ""; const p = sous.querySelector("p"); p.textContent = ""; let i = 0, finie = false, t0 = performance.now();
    let audio = null; if(D.VOIX.includes(id)){ try{ audio = new Audio(new URL("magie/bureau/voix/" + id + ".mp3", document.baseURI).href); audio.play().catch(() => {}); }catch(e){} }
    const pas = () => { if(finie) return; i = Math.min(txt.length, i + 2); p.textContent = txt.slice(0, i); if(!audio && i % 4 === 0 && /[a-zà-ÿ]/i.test(txt[i - 1] || "")) Son.bip(TON[k] || 200); if(i >= txt.length){ finie = true; sous.classList.add("fin"); } else tm = setTimeout(pas, 34); }; let tm = setTimeout(pas, 60);
    const clic = e => { if(e.target.closest(".bq-haut")) return; if(!finie){ clearTimeout(tm); i = txt.length; p.textContent = txt; finie = true; sous.classList.add("fin"); return; } if(performance.now() - t0 < 250) return; root.removeEventListener("click", clic); if(audio) audio.pause(); sous.classList.remove("fin"); sous.hidden = true; res(); };
    root.addEventListener("click", clic); });
  /* un geste : le héros ne parle pas, il choisit ce qu'il fait de son corps */
  const geste = opts => new Promise(res => { if(etat.vite) return res(0); gestesEl.innerHTML = opts.map((t, i) => `<button type="button" data-g="${i}">${t[0]}</button>`).join(""); gestesEl.hidden = false;
    gestesEl.querySelectorAll("[data-g]").forEach(b => b.onclick = async e => { e.stopPropagation(); gestesEl.hidden = true; Son.note(330, .04, .2); await mime(opts[+b.dataset.g][1]); res(+b.dataset.g); }); });
  const lit = id => { if(!S.lus.includes(id)){ S.lus.push(id); garde(); } $("[data-contrat]").hidden = false; };
  /* le contrat : on touche un article pour lire sa note ; pendant la scène, il faut trouver ce qui manque */
  const contrat = chasse => new Promise(res => { if(etat.vite){ D.CLAUSES.slice(0, 5).forEach(c => lit(c.id)); return res(); }
    const C = D.CLAUSES.filter(c => c.id !== "audit" || S.lus.includes("audit"));
    ui.innerHTML = `<div class="bq-contrat${chasse ? " chasse" : ""}"><p class="bq-eye">Bureau des demandes · formulaire 12-B</p><h2>Convention n° 73</h2>${chasse ? `<p class="bq-consigne">Lis ton exemplaire. Quelque chose cloche.</p>` : ""}
      ${C.map(c => `<button type="button" class="bq-art" data-a="${c.id}"><small>${c.n} · ${c.t}</small><span>${c.id === "sceau" ? D.SCEAU : c.txt}${c.vide ? "<u></u>" : ""}</span></button>`).join("")}<p class="bq-note" hidden></p>${chasse ? "" : `<button type="button" class="bq-go" data-ok>Ranger le contrat</button>`}</div>`;
    requestAnimationFrame(() => ui.classList.add("on")); const ici = new Set(), note = ui.querySelector(".bq-note"), ferme = v => { ui.classList.remove("on"); setTimeout(() => { ui.innerHTML = ""; res(v); }, 320); };
    ui.querySelectorAll("[data-a]").forEach(b => b.onclick = e => { e.stopPropagation(); const c = D.CLAUSES.find(x => x.id === b.dataset.a); ui.querySelectorAll(".bq-art").forEach(x => x.classList.toggle("on", x === b)); lit(c.id); Son.note(392, .03, .15);
      if(chasse && c.vide){ b.classList.add("faille"); setTimeout(() => ferme("nom"), 900); return; } note.hidden = false; note.innerHTML = `<b>${c.mot}.</b> ${c.note}`;
      if(chasse){ chasse(c.id); ici.add(c.id); if(ici.size >= C.filter(x => !x.vide).length) ui.querySelector(".bq-consigne").textContent = "Tout est en ordre. Sauf une ligne."; } });
    const ok = ui.querySelector("[data-ok]"); if(ok) ok.onclick = e => { e.stopPropagation(); ferme(); }; });
  $("[data-contrat]").onclick = e => { e.stopPropagation(); if(!etat.occupe && !ui.innerHTML) contrat(); }; if(S.lus.length) $("[data-contrat]").hidden = false;

  /* ---------------------------------------------------------------- se déplacer */
  let ouvert = false; const OBST = [[ACC.x, ACC.z, 3.6], [BORNE.x, BORNE.z, .8], [TUBE.x, TUBE.z, 1], [10, -13, 2.4], [10, -21, 2.4]];
  const regle = (nx, nz) => { if(!ouvert){ nx = clamp(nx, -1, 1); nz = clamp(nz, ZS + 1.2, ZS + 3.6); return [nx, nz]; }
    nz = clamp(nz, ZN + 2, ZS + 3.6); if(nz > ZS - .9) nx = clamp(nx, -.95, .95); else nx = clamp(nx, -HX + 2.4, HX - 2);
    for(const [ox, oz, r] of OBST){ const dx = nx - ox, dz = nz - oz, d = Math.hypot(dx, dz); if(d < r && d > .001){ nx = ox + dx/d*r; nz = oz + dz/d*r; } } return [nx, nz]; };
  const lieux = [], lieu = (id, pos, r, label, run, si) => lieux.push({id, x:pos.x, z:pos.z, r, label, run, si});
  async function lance(l){ if(etat.occupe) return; etat.occupe = true; etat.fige = true; agir.hidden = true; agir._l = null; root.classList.add("scene"); clearTimeout(capT); capEl.classList.remove("on"); try{ await l.run(); }catch(e){ console.error(e); } etat.cine = null; etat.fige = false; etat.occupe = false; root.classList.remove("scene"); garde(); }
  agir.onclick = e => { e.stopPropagation(); if(agir._l) lance(agir._l); };
  majs.push(() => { if(etat.occupe) return; let best = null, bd = 1e9; for(const l of lieux){ if(!l.si()) continue; const d = Math.hypot(l.x - J.x, l.z - J.z); if(d < l.r && d < bd){ bd = d; best = l; } } if(best !== agir._l){ agir._l = best; agir.hidden = !best; if(best) agir.textContent = best.label; } });

  /* les curiosités du hall : une légende quand on passe devant, une seule fois */
  const CURIO = [[-9.6, -8, 3, "Guichet 28, envoûtements. Fermé pour inventaire."], [-9.6, -16, 3, "Guichet 29, objets trouvés : âmes, ombres, prénoms."], [-9.6, -40, 3, "Guichet 32, horoscopes. Réclamations uniquement."], [-9.6, -48, 3, "Guichet 33, prodiges. Revenez hier."],
    [8.6, -13, 3.2, "Ils attendent. Le premier a le ticket numéro 4."], [9, -32, 4, "Dehors, il pleut et il fait nuit. D'après le règlement, c'est provisoire."], [0, -55, 5, "L'horloge marque trois heures. Elle les marque toujours."]].map(c => ({x:c[0], z:c[1], r:c[2], t:c[3], vu:false}));
  majs.push(() => { if(etat.occupe || !ouvert || capEl.classList.contains("on")) return; for(const c of CURIO) if(!c.vu && Math.hypot(c.x - J.x, c.z - J.z) < c.r){ c.vu = true; cap(c.t, 5200); break; } });

  /* ================================================================ LE PILOTE */
  const heure = $(".bq-heure"), porte = k => { vantaux[0].position.x = -.65 - k*1.25; vantaux[1].position.x = .65 + k*1.25; };
  const pA = V(.2, 1.7, ACC.z + 5.2), pM = V(-1.5, 0, ACC.z + 5.7), cM = V(pM.x, 2.05, pM.z), pB = V(-3.4, 1.7, -29.4), pC = V(-6.2, 1.7, -30.2), EFF = 4.1;
  const eclair = async () => { const v = feux.map(l => l.intensity), m = lMur.intensity; feux.forEach(l => l.intensity = 0); lMur.intensity = 0; hemi.intensity = .1; Son.note(52, .3, .5, "sawtooth", 40); await attends(170); feux.forEach((l, i) => l.intensity = v[i]); lMur.intensity = m; hemi.intensity = .55; };
  const tourneVers = (g, x, z, ms = 500) => { const a0 = g.rotation.y; let a1 = Math.atan2(x - g.position.x, z - g.position.z); while(a1 - a0 > Math.PI) a1 -= TAU; while(a1 - a0 < -Math.PI) a1 += TAU; return tw(ms, k => g.rotation.y = lerp(a0, a1, k)); };
  /* 2. l'ascenseur : on se réveille debout, derrière l'Ascensoriste */
  async function sceneAscenseur(){ etat.occupe = true; etat.fige = true; root.classList.add("scene"); const pJ = V(-.5, 1.7, ZS + 3.05); J.x = pJ.x; J.z = pJ.z; J.yaw = 0; J.pitch = 0;
    cam.position.copy(pJ); cam.quaternion.copy(vise(pJ, V(-.2, 2.2, ZS))); etat.cine = true; Son.note(60, .12, 6, "sine", 64); tw(5200, k => { cam.position.y = 1.7 + Math.sin(k*90)*.008*(1 - k); etage(-.6 + k*.6); }, k => k); await attends(2600);
    await plan(1700, pJ, V(ASC.position.x, 1.3, ASC.position.z)); await tourneVers(ASC, pJ.x, pJ.z, 600); await dit("asc1");
    await geste([["Hausser les épaules", "epaules"], ["Montrer le haut", "haut"], ["Ne rien faire", "rien"]]); await dit("asc2"); await dit("asc3"); await dit("asc4"); await attends(700); await dit("asc5");
    await tourneVers(ASC, ASC.position.x, ZS - 5, 500); await tw(350, k => levier.rotation.x = k*.7); Son.souffle(.2, .3, 900); Son.ding(); regardeVers(.4, ZS - 6);
    await Promise.all([tw(1700, k => porte(k)), rends(1700)]); ouvert = true; S.etape = 2; etat.occupe = false; etat.fige = false; root.classList.remove("scene"); garde(); cap("Le Bureau. Sur la droite, une borne à tickets.", 4200);
    setTimeout(() => { if(vivant && !etat.occupe) cap(matchMedia("(pointer:coarse)").matches ? "Glisse le doigt pour regarder. Maintiens « Avancer » pour marcher." : "Flèches ou ZQSD pour marcher, souris pour regarder, Entrée pour agir.", 7000); }, 4600); }
  /* 3. le ticket */
  lieu("ticket", BORNE, 2.6, "Prendre un ticket", async () => { await plan(1200, V(BORNE.x - 1.3, 1.75, BORNE.z + 1.2), V(BORNE.x, 1.3, BORNE.z)); Son.souffle(.2, .3, 3000); Son.note(880, .05, .2); cap("Numéro 73.", 3500); await tend(1300);
    await plan(2200, V(0, 2.2, -3), V(0, 8.6, -12)); cap("Le tableau affiche le 72. Depuis très longtemps.", 5500); await attends(3600); S.etape = 3; regardeVers(0, ACC.z); await rends(); cap("Au fond, sous l'anneau de lumière, quelqu'un attend.", 6000); }, () => S.etape === 2);
  /* 4 à 8. l'accueil, le Marquis, le contrat, l'Audit, le tube : une seule longue scène */
  lieu("accueil", V(0, 0, ACC.z + 3.4), 4.8, "S'avancer vers l'accueil", async () => {
    J.x = pA.x; J.z = pA.z; regardeVers(0, ACC.z + .9); const cAnge = V(0, 2.55, ACC.z + .9);
    await plan(1600, pA, cAnge); await dit("ang1"); await dit("ang2"); await dit("ang3"); tw(700, k => ANGE.userData.bras[1].rotation.x = -k*.9); await dit("ang4"); await dit("ang5"); tw(700, k => ANGE.userData.bras[1].rotation.x = -(1 - k)*.9); await dit("ang6");
    const g = await geste([["Lever la main", "main"], ["Secouer la tête", "non"], ["Se taire", "rien"]]); await dit(["ang7a", "ang7b", "ang7c"][g]); await attends(400);
    Son.tampon(); tw(380, k => U.uSec.value = Math.sin(k*Math.PI)*.5, k => k); const p0 = cam.position.clone(); await tw(380, k => cam.position.set(p0.x + Math.sin(k*40)*.03*(1 - k), p0.y + Math.sin(k*53)*.03*(1 - k), p0.z), k => k); await dit("ang8");
    /* les yeux s'ouvrent dans le manteau */
    plan(2600, V(.1, 1.75, ACC.z + 3.3), V(0, 1.95, ACC.z + .9)); Son.note(82, .12, 3, "sine", 78); for(const e of yeux) tw(500 + e.userData.p*120, k => e.scale.setScalar(Math.max(.001, k))); await attends(2600); await dit("ang9");
    for(const e of yeux) tw(600, k => e.scale.setScalar(Math.max(.001, 1 - k)));
    /* 5. une ombre s'ouvre au-dessus du guichet trente ; la lumière saute ; il est là */
    tw(1600, k => lMur.intensity = k*85); await plan(2200, V(1.2, 1.75, ACC.z + 7.2), V(-HX, 5.4, -24)); Son.note(49, .14, 3.5, "sawtooth", 46); await tw(2400, k => { ombreBete.material.opacity = k*.9; ombreBete.scale.x = lerp(.3, 1, k); });
    await attends(500); MARQ.position.set(-10.6, 0, -24); MARQ.rotation.y = Math.PI/2; await eclair(); MARQ.visible = true; await attends(900);
    tw(2600, k => { ombreBete.material.opacity = .9*(1 - k); ombreBete.scale.x = lerp(1, .3, k); }); await va(MARQ, -4.6, -25.8, 1.9); await Promise.all([va(MARQ, pM.x, pM.z, 1.8), plan(2200, pA, cM)]); await tourneVers(MARQ, pA.x, pA.z, 400);
    regardeVers(pM.x, pM.z); for(const id of ["mar1", "mar2"]) await dit(id); await attends(900); for(const id of ["mar3", "mar4", "mar5", "mar6"]) await dit(id);
    heure.textContent = "Échéance : l'aube"; heure.classList.add("on"); await tw(600, k => MARQ.userData.bras[1].rotation.x = -k*1.2); await dit("mar7"); tw(600, k => MARQ.userData.bras[1].rotation.x = -(1 - k)*1.2);
    /* 6. la première faille : la case du nom est vide */
    const vus = new Set(); await contrat(async id => { if(vus.has(id)) return; vus.add(id); const r = {objet:"mara1", heure:"mara2", grade:"mara3", sceau:"mara4"}[id]; if(r){ sous.classList.add("haut"); await dit(r); sous.classList.remove("haut"); } });
    await dit("mar8"); await attends(1200); await dit("mar9"); await attends(1500); await dit("mar10"); await dit("mar11"); await tw(500, k => MARQ.userData.tete.rotation.y = k*.8); await dit("mar12"); tw(500, k => MARQ.userData.tete.rotation.y = (1 - k)*.8);
    S.etape = 5; garde(); await sceneAudit(); }, () => S.etape === 3);
  /* 7. l'Audit passe */
  async function sceneAudit(){
    tw(2500, k => { U.uSombre.value = k; feux.forEach(l => l.intensity = 160*(1 - k*.7)); }); Son.note(41, .16, 6, "sine", 39); AUD.visible = true; const approche = va(AUD, -8, -41, 2.3); await dit("mar13");
    J.x = pB.x; J.z = pB.z; await plan(2600, pB, V(-8, 1.4, -46)); await approche; await Promise.all([va(AUD, -HX + 2.7, -32, 1.5), plan(3200, pC, V(-HX + 1.6, 1.5, -32))]); await tourneVers(AUD, -HX, -32, 300);
    await dit("aud1"); await dit("aud2"); COMMIS31.userData.tete.rotation.x = -.3; await dit("gui1");
    await tw(350, k => AUD.userData.bras[1].rotation.x = -k*1.5); Son.tampon(); U.uEP.value.set(-HX - .2, 1.6, -32); tw(300, k => U.uSec.value = Math.sin(k*Math.PI)*.6, k => k); tw(2600, k => U.uEf.value = k*EFF, k => 1 - (1 - k)*(1 - k)); tw(500, k => AUD.userData.bras[1].rotation.x = -(1 - k)*1.5);
    await attends(1500); COMMIS31.visible = false; await dit("aud3"); lit("audit"); await attends(500);
    await Promise.all([tourneVers(AUD, pC.x, pC.z, 900), plan(1500, pC, V(-HX + 2.7, 1.5, -32))]); await dit("aud4"); await attends(1100); await dit("aud5"); await dit("aud6");
    plan(3600, pC, V(-8, 1.5, -50)); va(AUD, -8, -42, 2.6).then(() => va(AUD, -8, ZN + 1.2, 3)).then(() => AUD.visible = false); await attends(3800); tw(2500, k => { U.uSombre.value = 1 - k; feux.forEach(l => l.intensity = 160*(.3 + k*.7)); });
    tourneVers(MARQ, pB.x, pB.z, 600); await plan(1500, pB, cM); await dit("mar14");
    /* 8. un tube pneumatique crache une capsule */
    Son.souffle(.4, .9, 2400); capsule.visible = true; await Promise.all([plan(1800, pB, V(TUBE.x, 2.6, TUBE.z)), tw(1700, k => capsule.position.y = lerp(12, 1.66, k), k => k*k)]); Son.note(190, .12, .15, "square"); S.etape = 7; tw(1500, k => lMur.intensity = 85 - k*40);
    tourneVers(MARQ, TUBE.x, TUBE.z, 600); regardeVers(TUBE.x, TUBE.z); await rends(900); cap("Un tube pneumatique vient de cracher quelque chose.", 6000); }
  lieu("tube", TUBE, 3.4, "Ouvrir la capsule", async () => { const pT = V(TUBE.x + 1.9, 1.75, TUBE.z + 1.5); await plan(1300, pT, V(TUBE.x, 1.5, TUBE.z)); Son.note(660, .05, .2); capsule.visible = false; tend(2200); await attends(600); await dit("dir1");
    if(!MARQ.visible){ MARQ.visible = true; MARQ.position.set(pM.x, 0, pM.z); } await va(MARQ, TUBE.x + 2.6, TUBE.z + 3.3, 1.9); await Promise.all([tourneVers(MARQ, pT.x, pT.z, 400), plan(1300, pT, V(TUBE.x + 2.6, 2.05, TUBE.z + 3.3))]);
    for(const id of ["mar15", "mar16", "mar17"]) await dit(id); await tw(500, k => MARQ.userData.bras[0].rotation.x = -k*1.1); await dit("mar18"); tw(500, k => MARQ.userData.bras[0].rotation.x = -(1 - k)*1.1); S.etape = 8; J.x = pT.x; J.z = pT.z; regardeVers(0, ZS); await rends(); cap("L'ascenseur est au bout du tapis rouge.", 6000); }, () => S.etape === 7);
  /* 9. retour à l'ascenseur : premier étage, la Lune */
  lieu("monte", V(0, 0, ZS + 1.4), 3.6, "Monter", async () => { const pJ = V(.1, 1.7, ZS + 3.6); J.x = pJ.x; J.z = pJ.z; J.yaw = 0; J.pitch = 0; await plan(1200, pJ, V(0, 1.75, ZS - 4)); MARQ.visible = true; MARQ.position.set(-.3, 0, ZS - 3.5); const entre = va(MARQ, -.55, ZS + 1.3, 2.4);
    await tourneVers(ASC, pJ.x, pJ.z, 500); await dit("asc6"); await entre; await tourneVers(ASC, ASC.position.x, ZS - 5, 400); levier.rotation.x = 0; await tw(350, k => levier.rotation.x = k*.7); Son.souffle(.2, .3, 900); await tw(1400, k => porte(1 - k)); lune.visible = true; vers(MARQ, MARQ.position.x, ZS - 5);
    Son.note(60, .2, 5, "sine", 90); tw(5200, k => { cam.position.y = 1.7 + Math.sin(k*110)*.012*Math.sin(k*Math.PI); lCab.intensity = 13 + Math.sin(k*40)*5; etage(k); }, k => k); await attends(700); await tw(500, k => MARQ.userData.tete.rotation.y = -k*.9); await dit("mar19"); await attends(800); await dit("mar20"); tw(500, k => MARQ.userData.tete.rotation.y = -(1 - k)*.9);
    await attends(1400); Son.ding(); tw(1000, k => U.uPix.value = k*.35); await attends(500); tw(2200, k => porte(k)); await tw(4200, k => U.uPix.value = .35 + k*.65);
    S.fin = true; S.etape = 9; garde(); await attends(1600);
    ui.innerHTML = `<div class="bq-contrat bq-fin"><p class="bq-eye">Sans suite · fin du pilote</p><h2>Premier étage : la Lune</h2><p class="bq-consigne">À suivre. Le Marquis monte avec toi, l'Audit aussi, et la case du nom est toujours vide.</p><p class="bq-note">Tu as lu ${S.lus.length} article${S.lus.length > 1 ? "s" : ""} du contrat sur ${D.CLAUSES.length}.</p>
      <button type="button" class="bq-go" data-c>Relire le contrat</button><button type="button" class="bq-go ghost" data-r>Rejouer le pilote</button><button type="button" class="bq-go ghost" data-f>Revenir à la magie</button></div>`; ui.classList.add("on");
    ui.querySelector("[data-c]").onclick = e => { e.stopPropagation(); window.ArcanesBureauJeu && window.ArcanesBureauJeu.contrat(); }; ui.querySelector("[data-f]").onclick = e => { e.stopPropagation(); fermer(); };
    ui.querySelector("[data-r]").onclick = e => { e.stopPropagation(); S.etape = 0; S.fin = false; garde(); fermer(); setTimeout(() => ouvrir(opt), 600); }; await new Promise(() => {}); }, () => S.etape === 8);

  /* ---------------------------------------------------------------- commandes */
  let glisse = null; const marche = $(".bq-marche");
  canvas.addEventListener("pointerdown", e => { glisse = {x:e.clientX, y:e.clientY, id:e.pointerId}; try{ canvas.setPointerCapture(e.pointerId); }catch(_){} });
  canvas.addEventListener("pointermove", e => { if(!glisse || glisse.id !== e.pointerId) return; J.yaw -= (e.clientX - glisse.x)*.0042; J.pitch = clamp(J.pitch - (e.clientY - glisse.y)*.003, -.7, .8); glisse.x = e.clientX; glisse.y = e.clientY; });
  const lache = e => { if(glisse && glisse.id === e.pointerId) glisse = null; }; canvas.addEventListener("pointerup", lache); canvas.addEventListener("pointercancel", lache);
  const av = v => e => { e.preventDefault(); J.touches.av = v; marche.classList.toggle("on", v); }; marche.addEventListener("pointerdown", av(true)); marche.addEventListener("pointerup", av(false)); marche.addEventListener("pointercancel", av(false)); marche.addEventListener("pointerleave", av(false));
  const clavier = v => e => { if(e.target.closest && e.target.closest("input")) return; const k = e.code; if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "KeyW", "KeyZ", "KeyS", "KeyA", "KeyQ", "KeyD"].includes(k)){ J.touches[k] = v; e.preventDefault(); } if(v && (k === "Enter" || k === "KeyE") && agir._l && !etat.occupe){ e.preventDefault(); lance(agir._l); } if(v && k === "Escape") fermer(); };
  const kd = clavier(true), ku = clavier(false); document.addEventListener("keydown", kd); document.addEventListener("keyup", ku);
  $("[data-q]").onclick = e => { e.stopPropagation(); fermer(); }; $("[data-son]").onclick = e => { e.stopPropagation(); e.currentTarget.classList.toggle("off", Son.bascule()); };

  /* ---------------------------------------------------------------- la boucle */
  let vivant = true, raf = 0, last = performance.now(), temps = 0, manuel = false;
  function image(now, pas){ if(!vivant) return; if(pas == null){ raf = requestAnimationFrame(image); if(manuel) return; } const dt = pas != null ? pas : Math.min(.05, (now - last)/1000); last = now; temps += dt;
    for(let i = anims.length - 1; i >= 0; i--){ const a = anims[i]; a.t += dt*1000; const k = clamp(a.t/a.ms, 0, 1); a.fn(a.e(k), k); if(k >= 1){ anims.splice(i, 1); a.res(); } }
    const T = J.touches, av = (T.av || T.ArrowUp || T.KeyW || T.KeyZ ? 1 : 0) - (T.ArrowDown || T.KeyS ? 1 : 0), tr = (T.ArrowLeft || T.KeyA || T.KeyQ ? 1 : 0) - (T.ArrowRight || T.KeyD ? 1 : 0);
    J.yaw += tr*1.8*dt; J.v = lerp(J.v, etat.fige ? 0 : av*3.6, 1 - Math.exp(-dt*7)); let nx = J.x - Math.sin(J.yaw)*J.v*dt, nz = J.z - Math.cos(J.yaw)*J.v*dt; [nx, nz] = regle(nx, nz); J.x = nx; J.z = nz; J.pas += Math.abs(J.v)*dt;
    if(!etat.cine){ cam.position.set(J.x, 1.7 + Math.sin(J.pas*3.3)*.035*clamp(Math.abs(J.v)/3, 0, 1), J.z); cam.rotation.set(J.pitch, J.yaw, 0); }
    for(const f of majs) f(dt, temps);
    /* ce qui vit tout seul : le néon qui grésille, les yeux qui clignent, les commis qui tamponnent */
    const gr = Math.sin(temps*47) > .96 ? .55 : 1; lNeon.intensity = 60*gr; haloN.material.opacity = .42*gr; for(const e of yeux) e.scale.y = e.scale.x*(Math.sin(temps*1.3 + e.userData.p) > .93 ? .1 : 1);
    COMMIS.forEach((c, i) => { c.userData.bras[1].rotation.x = -Math.max(0, Math.sin(temps*1.7 + i*1.9))*.6; }); ANGE.rotation.y = Math.sin(temps*.4)*.06;
    U.uT.value = temps; U.uNF.value.set(cam.near, cam.far);
    if(pas == null && fin > 1 && !window.__bqFin){ lent = lerp(lent, dt, .05); if(++nImg > 90 && lent > .036){ fin = Math.max(1, fin - .25); nImg = 0; lent = .02; taille(); } }
    renderer.setRenderTarget(rt); renderer.render(scene, cam); renderer.setRenderTarget(null); renderer.render(quadScene, quadCam); }
  function fermer(){ if(!vivant) return; vivant = false; cancelAnimationFrame(raf); Son.fin(); garde(); document.removeEventListener("keydown", kd); document.removeEventListener("keyup", ku); window.removeEventListener("resize", taille);
    root.classList.add("sort"); setTimeout(() => { scene.traverse(o => { if(o.geometry) o.geometry.dispose(); if(o.material){ (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => { if(m.map) m.map.dispose(); m.dispose(); }); } }); if(rt){ rt.depthTexture.dispose(); rt.dispose(); } renderer.dispose(); root.remove(); document.documentElement.classList.remove("bq-ouvert"); opt.ferme && opt.ferme(); }, 450); }
  window.addEventListener("resize", taille); taille(); raf = requestAnimationFrame(image);
  window.__bqDbg = {J, cam, S, etat, lieux, lance, U, MARQ, AUD, ANGE, fermer, pas:dt => { manuel = true; image(performance.now(), dt); }, ouvre:() => { ouvert = true; porte(1); }};

  /* ---------------------------------------------------------------- l'ouverture : 1. le noir, le vœu, le tampon ; puis là où l'on en était */
  const noir = $(".bq-noir"), debut = async () => { Son.init(); noir.classList.add("ecrit"); for(let i = 0; i < 9; i++) setTimeout(() => Son.souffle(.05, .12, 5000), 300 + i*230); await new Promise(r => setTimeout(r, etat.vite ? 10 : 2700)); noir.classList.add("tampon"); Son.tampon(); await new Promise(r => setTimeout(r, etat.vite ? 10 : 2100));
    noir.classList.add("off"); setTimeout(() => noir.remove(), 1600); root.classList.add("joue"); tw(2200, k => U.uNoir.value = 1 - k);
    if(S.etape >= 9){ S.etape = 0; S.fin = false; } if(S.etape < 2){ S.etape = 1; sceneAscenseur(); return; }
    if(S.etape === 5){ ouvert = true; porte(1); J.x = pA.x; J.z = pA.z; regardeVers(pM.x, pM.z); MARQ.visible = true; MARQ.position.set(pM.x, 0, pM.z); vers(MARQ, pA.x, pA.z); lMur.intensity = 85; heure.textContent = "Échéance : l'aube"; heure.classList.add("on"); setTimeout(() => lance({run:sceneAudit}), etat.vite ? 50 : 2400); return; }
    /* reprise : dans le hall, portes ouvertes */
    ouvert = true; porte(1); etat.fige = false; J.z = ZS - 3; if(S.etape >= 7){ J.x = pB.x; J.z = pB.z; regardeVers(TUBE.x, TUBE.z); MARQ.visible = true; MARQ.position.set(pM.x, 0, pM.z); vers(MARQ, pB.x, pB.z); lMur.intensity = 45; heure.textContent = "Échéance : l'aube"; heure.classList.add("on"); U.uEP.value.set(-HX - .2, 1.6, -32); U.uEf.value = EFF; COMMIS31.visible = false; if(S.etape === 7){ capsule.visible = true; capsule.position.y = 1.66; } }
    cap(S.etape === 2 ? "Le Bureau. Sur la droite, une borne à tickets." : S.etape === 3 ? "Au fond, sous l'anneau de lumière, quelqu'un attend." : S.etape === 7 ? "Le tube pneumatique a craché quelque chose." : "L'ascenseur est au bout du tapis rouge.", 6000); };
  noir.addEventListener("click", function une(){ noir.removeEventListener("click", une); debut(); });
}
