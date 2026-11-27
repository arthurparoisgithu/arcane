/* ===== Arcanes · Magie : La Tour =====
   Le jeu de l'univers magie. Pour l'instant, un plan d'ambiance : une marche à la première personne, de la colline
   au pied de la tour d'un magicien, à travers un village. Aucune énigme encore : on juge l'image, la lumière et le son.
   Vraie 3D (Three.js), calculée en très basse définition, puis réduite à quelques niveaux par couleur et tramée.
   Tout est construit en code : le terrain, la tour, les maisons, les arbres, les textures.
   Source lisible ; compilée en un seul fichier, tour.min.js, par build.sh. */
import * as THREE from "three";
import {mergeGeometries} from "three/examples/jsm/utils/BufferGeometryUtils.js";
import {installer} from "./histoire.js";

const TAU = Math.PI*2, clamp = (x, a, b) => Math.max(a, Math.min(b, x)), lerp = (a, b, t) => a + (b - a)*t, smooth = (a, b, x) => { x = clamp((x - a)/(b - a), 0, 1); return x*x*(3 - 2*x); };
const rng = s => () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0)/4294967296; };
const H2 = (x, y) => { let n = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263); n = Math.imul(n ^ n >>> 13, 1274126177); return ((n ^ n >>> 16) >>> 0)/4294967296; };
const noise = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, u = xf*xf*(3 - 2*xf), v = yf*yf*(3 - 2*yf); return lerp(lerp(H2(xi, yi), H2(xi + 1, yi), u), lerp(H2(xi, yi + 1), H2(xi + 1, yi + 1), u), v); };
const fbm = (x, y) => noise(x, y)*.5 + noise(x*2.1 + 9, y*2.1 + 4)*.27 + noise(x*4.3 + 2, y*4.3 + 7)*.14 + noise(x*8.7, y*8.7)*.09;

/* ---------------------------------------------------------------- le terrain : un chemin, de la colline à la tour */
/* le chemin serpente jusqu'au parvis, puis file droit vers la porte du château ; la tour est au fond de la cour */
const FIN = -309, TZ = -298, MUR = -258, CZ = -284;
const meandre = z => 14*Math.sin(z*.021) + 6*Math.sin(z*.047 + 1.3), TX = meandre(-250);
const chemin = z => lerp(meandre(z), TX, smooth(-218, -248, z));
const profil = z => { const t = -z; return 17*(1 - smooth(-10, 96, t)) + 2 + 21*smooth(176, 252, t); };
function sol(x, z){ const d = Math.abs(x - chemin(z)), village = smooth(-80, -100, z)*smooth(-190, -172, z), large = lerp(5, 15, village);
  let y = profil(z) + (fbm(x*.028, z*.028)*26 - 9)*smooth(large, large + 38, d) + (noise(x*.3, z*.3) - .5)*.35*smooth(2, 6, d);
  const r = Math.hypot(x - TX, z - CZ); y = lerp(y, 25.5, smooth(58, 40, r)); return y; }

/* ---------------------------------------------------------------- les textures, peintes en code */
let LISSE = false;
function tex(n, fn, rep){ const c = document.createElement("canvas"); c.width = c.height = n; const x = c.getContext("2d"); fn(x, n); const t = new THREE.CanvasTexture(c); t.magFilter = LISSE ? THREE.LinearFilter : THREE.NearestFilter; t.minFilter = LISSE ? THREE.LinearMipmapLinearFilter : THREE.NearestMipmapLinearFilter; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; if(rep) t.repeat.set(rep[0], rep[1]); return t; }
const grain = (x, n, cols, seed, dens = 1) => { const r = rng(seed); for(let i = 0; i < n*n*dens; i++){ x.fillStyle = cols[(r()*cols.length) | 0]; x.fillRect((r()*n) | 0, (r()*n) | 0, 1, 1); } };
const T = {
  pierre:() => tex(64, (x, n) => { x.fillStyle = "#6d6a78"; x.fillRect(0, 0, n, n); grain(x, n, ["#7c7988", "#5c5968", "#8a8796", "#514e5c"], 3, .7); x.fillStyle = "#34313c"; for(let j = 0; j < n; j += 8){ x.fillRect(0, j, n, 1); for(let i = (j/8 % 2)*8; i < n; i += 16) x.fillRect(i, j, 1, 8); } }),
  torchis:() => tex(64, (x, n) => { x.fillStyle = "#b9ad96"; x.fillRect(0, 0, n, n); grain(x, n, ["#c9bea8", "#a59a84", "#b0a48e", "#d4cab6"], 5, .6); x.fillStyle = "#2c2019"; x.fillRect(0, 0, n, 4); x.fillRect(0, n - 4, n, 4); x.fillRect(0, 30, n, 4); for(const i of [0, 30, 60]) x.fillRect(i, 0, 4, n); x.save(); x.translate(17, 17); x.rotate(.78); x.fillRect(-20, -1.5, 40, 3); x.restore(); x.save(); x.translate(47, 49); x.rotate(-.78); x.fillRect(-20, -1.5, 40, 3); x.restore(); }),
  ardoise:() => tex(32, (x, n) => { x.fillStyle = "#3b3a4b"; x.fillRect(0, 0, n, n); grain(x, n, ["#454458", "#31303f", "#4f4e63"], 7, .6); x.fillStyle = "#1d1c27"; for(let j = 0; j < n; j += 6){ x.fillRect(0, j, n, 1); for(let i = (j/6 % 2)*4; i < n; i += 8) x.fillRect(i, j, 1, 6); } }),
  chaume:() => tex(32, (x, n) => { x.fillStyle = "#6a5a3a"; x.fillRect(0, 0, n, n); const r = rng(9); for(let i = 0; i < 260; i++){ x.fillStyle = ["#7c6b46", "#584a2f", "#8a784f", "#4a3e27"][(r()*4) | 0]; x.fillRect((r()*n) | 0, (r()*n) | 0, 1, 3 + ((r()*4) | 0)); } }),
  bois:() => tex(32, (x, n) => { x.fillStyle = "#4a3526"; x.fillRect(0, 0, n, n); grain(x, n, ["#553e2c", "#3d2b1f", "#5f4733"], 11, .5); x.fillStyle = "#231710"; for(let i = 0; i < n; i += 8) x.fillRect(i, 0, 1, n); }),
  terre:() => tex(64, (x, n) => { x.fillStyle = "#8a8a8a"; x.fillRect(0, 0, n, n); grain(x, n, ["#949494", "#828282", "#9c9c9c", "#7a7a7a", "#a4a4a4"], 13, 1); }),
  fenetre:() => tex(16, (x, n) => { x.fillStyle = "#ffb656"; x.fillRect(0, 0, n, n); x.fillStyle = "#ffe2a0"; x.fillRect(2, 2, 5, 5); x.fillRect(9, 9, 5, 5); x.fillStyle = "#2a1a10"; x.fillRect(7, 0, 2, n); x.fillRect(0, 7, n, 2); x.fillRect(0, 0, n, 1); x.fillRect(0, n - 1, n, 1); x.fillRect(0, 0, 1, n); x.fillRect(n - 1, 0, 1, n); }),
  halo:() => { const c = document.createElement("canvas"); c.width = c.height = 64; const x = c.getContext("2d"), g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, "rgba(255,255,255,1)"); g.addColorStop(.25, "rgba(255,200,120,.55)"); g.addColorStop(1, "rgba(255,160,60,0)"); x.fillStyle = g; x.fillRect(0, 0, 64, 64); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }};

/* ---------------------------------------------------------------- le son, tout synthétisé */
const Son = (() => { let ac = null, maitre = null, on = true, vent = null;
  const init = () => { if(ac) return; try{ ac = new (window.AudioContext || window.webkitAudioContext)(); maitre = ac.createGain(); maitre.gain.value = on ? .6 : 0; maitre.connect(ac.destination);
      const rev = ac.createConvolver(), n = ac.sampleRate*3.5, b = ac.createBuffer(2, n, ac.sampleRate); for(let c = 0; c < 2; c++){ const d = b.getChannelData(c); for(let i = 0; i < n; i++) d[i] = (Math.random()*2 - 1)*Math.pow(1 - i/n, 2.4); } rev.buffer = b; const rg = ac.createGain(); rg.gain.value = .55; rev.connect(rg); rg.connect(maitre); Son.rev = rev;
      /* le vent : du bruit filtré, qui respire */
      const nb = ac.createBuffer(1, ac.sampleRate*4, ac.sampleRate), nd = nb.getChannelData(0); let l = 0; for(let i = 0; i < nd.length; i++){ l = l*.985 + (Math.random()*2 - 1)*.015; nd[i] = l*9; }
      const src = ac.createBufferSource(); src.buffer = nb; src.loop = true; const f = ac.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = 380; f.Q.value = .6; vent = ac.createGain(); vent.gain.value = .0; const lf = ac.createOscillator(), lg = ac.createGain(); lf.frequency.value = .09; lg.gain.value = 170; lf.connect(lg); lg.connect(f.frequency); src.connect(f); f.connect(vent); vent.connect(maitre); src.start(); lf.start(); vent.gain.linearRampToValueAtTime(.5, ac.currentTime + 3);
      /* un bourdon grave, très bas */
      [55, 82.4, 110.3].forEach((fr, i) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = i ? "sine" : "triangle"; o.frequency.value = fr; g.gain.value = [.05, .03, .02][i]; o.connect(g); g.connect(maitre); g.connect(rev); o.start(); });
    }catch(e){ ac = null; } };
  const ton = (f, dur, v, quand = 0, type = "sine") => { if(!ac) return; const t = ac.currentTime + quand, o = ac.createOscillator(), g = ac.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .01); g.gain.exponentialRampToValueAtTime(.0001, t + dur); o.connect(g); g.connect(maitre); g.connect(Son.rev); o.start(t); o.stop(t + dur + .1); };
  return {init, set on(v){ on = v; if(maitre) maitre.gain.value = v ? .6 : 0; }, get on(){ return on; },
    cloche(v = 1){ [[196, 6, .09], [392.5, 4, .05], [493, 3, .035], [588, 2.2, .03], [785, 1.4, .02]].forEach(([f, d, a]) => ton(f, d, a*v)); },
    pas(){ if(!ac) return; const t = ac.currentTime, b = ac.createBuffer(1, ac.sampleRate*.09, ac.sampleRate), d = b.getChannelData(0); for(let i = 0; i < d.length; i++) d[i] = (Math.random()*2 - 1)*Math.pow(1 - i/d.length, 2); const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain(); s.buffer = b; f.type = "lowpass"; f.frequency.value = 500 + Math.random()*300; g.gain.value = .16; s.connect(f); f.connect(g); g.connect(maitre); s.start(t); },
    note(f, v = .05){ ton(f, 3.5, v); ton(f*1.5, 3, v*.5, .12); },
    fin(){ try{ if(maitre && ac) maitre.gain.linearRampToValueAtTime(0, ac.currentTime + .5); }catch(e){} setTimeout(() => { try{ ac && ac.close(); }catch(e){} ac = null; }, 700); }};
})();

/* ================================================================ le jeu */
export function ouvrir(opt = {}){
  if(document.querySelector(".tq")) return;
  const GRAV = (opt.rendu || window.__tourRendu) === "gravure"; LISSE = GRAV;   /* essai : le monde rendu comme une eau-forte */
  let son = true; try{ son = localStorage.getItem("arcanes.tour.son") !== "0"; }catch(e){} Son.on = son;
  const root = document.createElement("div"); root.className = "tq"; root.setAttribute("role", "dialog"); root.setAttribute("aria-label", "La Tour");
  root.innerHTML = `<canvas class="tq-gl"></canvas><div class="tq-voile"></div>
    <div class="tq-haut"><button type="button" class="tq-b" data-q aria-label="Quitter">✕</button><button type="button" class="tq-b" data-son aria-label="Le son">${son ? "♪" : "♪̸"}</button></div>
    <div class="tq-titre"></div><div class="tq-cap" aria-live="polite"></div>
    <button type="button" class="tq-marche" aria-label="Avancer"><span></span><b>Avancer</b></button>
    <div class="tq-panneau" hidden></div>`;
  document.body.appendChild(root); document.documentElement.classList.add("tq-ouvert");
  const $ = s => root.querySelector(s), canvas = $(".tq-gl");
  let vivant = true, raf = 0, last = performance.now(), temps = 0;

  /* ---- le rendu : une petite image, tramée, agrandie en gros pixels */
  const renderer = new THREE.WebGLRenderer({canvas, antialias:false, powerPreference:"high-performance"}); renderer.setPixelRatio(1);
  const scene = new THREE.Scene(); scene.fog = new THREE.Fog(0x2a2440, 14, 200);
  const cam = new THREE.PerspectiveCamera(70, 1, .1, 1500); cam.rotation.order = "YXZ"; scene.add(cam);
  let rt = null, RW = 2, RH = 2, mainX = .42;
  const post = new THREE.ShaderMaterial({depthTest:false, depthWrite:false, uniforms:{tD:{value:null}, uNiv:{value:8}, uNuit:{value:0}, uMono:{value:0}, uTeinte:{value:new THREE.Color(1, 1, 1)}},
    vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }`,
    fragmentShader:`uniform sampler2D tD; uniform float uNiv, uNuit, uMono; uniform vec3 uTeinte; varying vec2 vUv;
      float bayer(vec2 p){ int x = int(mod(p.x, 4.)), y = int(mod(p.y, 4.)); int i = x + y*4; float m = 0.;
        if(i==0)m=0.; else if(i==1)m=8.; else if(i==2)m=2.; else if(i==3)m=10.; else if(i==4)m=12.; else if(i==5)m=4.; else if(i==6)m=14.; else if(i==7)m=6.;
        else if(i==8)m=3.; else if(i==9)m=11.; else if(i==10)m=1.; else if(i==11)m=9.; else if(i==12)m=15.; else if(i==13)m=7.; else if(i==14)m=13.; else m=5.; return (m + .5)/16.; }
      void main(){ vec3 c = texture2D(tD, vUv).rgb; c = c/(c + .55)*1.55;            /* les hautes lumières s'arrondissent */
        c = pow(max(c, 0.), vec3(1./2.2));
        float l = dot(c, vec3(.3, .59, .11)); c = mix(vec3(l), c, 1.18);               /* un peu plus de couleur */
        c = mix(c, uTeinte*pow(l, .85)*1.25, uMono);                                  /* les visions : une seule teinte */
        c += vec3(.012, .016, .05)*(1. - l)*(.6 + .4*uNuit)*(1. - uMono);                           /* les ombres tirent vers le bleu */
        vec2 q = vUv - .5; c *= 1. - dot(q, q)*.75;                                    /* les bords s'assombrissent */
        float t = bayer(gl_FragCoord.xy) - .5; c = floor(c*uNiv + .5 + t)/uNiv;        /* peu de niveaux, fondus à la trame */
        gl_FragColor = vec4(c, 1.); }`});
  /* ---- l'eau-forte : contours et hachures à l'encre sur papier, l'or pour les lumières.
     Les hachures sont accrochées au monde (et non à l'écran) pour ne pas « nager » quand on marche ; leur pas double avec la distance. */
  const postG = new THREE.ShaderMaterial({depthTest:false, depthWrite:false, uniforms:{tD:{value:null}, tZ:{value:null}, uRes:{value:new THREE.Vector2(2, 2)}, uPI:{value:cam.projectionMatrixInverse}, uCW:{value:cam.matrixWorld}, uCam:{value:cam.position}, uNF:{value:new THREE.Vector2(.1, 1500)}, uT:{value:0}, uLavis:{value:0}, uExpo:{value:1}},
    vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }`,
    fragmentShader:`precision highp sampler2D; uniform sampler2D tD, tZ; uniform vec2 uRes, uNF; uniform mat4 uPI, uCW; uniform vec3 uCam; uniform float uT, uLavis, uExpo; varying vec2 vUv;
      float h21(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x*p.y); }
      float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3. - 2.*f); return mix(mix(h21(i), h21(i + vec2(1., 0.)), f.x), mix(h21(i + vec2(0., 1.)), h21(i + vec2(1., 1.)), f.x), f.y); }
      float W(vec2 u){ return 1. - texture2D(tZ, u).x; }
      vec3 ton(vec2 u){ vec3 c = texture2D(tD, u).rgb*uExpo; c = c/(c + .55)*1.55; return pow(max(c, 0.), vec3(1./2.2)); }
      float lum(vec3 c){ return dot(c, vec3(.3, .59, .11)); }
      /* une famille de traits parallèles : v = coordonnée en travers des traits, hw = demi-épaisseur (0 à .5), fr = fondu vers l'octave suivante */
      float traits(float co, float sc, float hw, float fr){ float v = co*sc, fw = fwidth(co)*sc, k = floor(v + .5), impair = mod(k, 2.), dc = abs(v - k), h = hw*mix(1. + fr, 1. - fr, impair);
        float net = 1. - smoothstep(h - fw*.7, h + fw*.7, dc); return mix(net, 2.*hw, smoothstep(.45, .9, fw))*step(.004, hw); }
      void main(){ vec2 px = 1./uRes, fc = vUv*uRes; float d = texture2D(tZ, vUv).x, w = 1. - d, n = uNF.x, f = uNF.y, z = f*n/((f - n)*w + n); bool ciel = d > .999995;
        vec4 v4 = uPI*vec4(vUv*2. - 1., d*2. - 1., 1.); v4 /= v4.w; vec3 P = (uCW*v4).xyz, dir = normalize(P - uCam);
        vec3 c = ton(vUv); float l = lum(c), loin = ciel ? 0. : smoothstep(30., 340., z);
        /* le ton : clair = papier nu, sombre = traits serrés ; le lointain s'éclaircit */
        float t = smoothstep(.06, .56, l); t = t*t*(3. - 2.*t); t = mix(t, max(t, .82), loin*.85);
        float dore = smoothstep(.1, .38, c.r - c.b)*smoothstep(.22, .6, l); t = max(t, dore*.9);
        /* les contours : là où la profondeur casse (bords, arêtes), d'un trait un peu tremblé */
        vec2 u = vUv + (vec2(vn(fc*.03), vn(fc*.03 + 9.)) - .5)*px*1.8; float e = mix(1.25, .8, loin);
        float wc = W(u), wl = W(u - vec2(px.x*e, 0.)), wr = W(u + vec2(px.x*e, 0.)), wu = W(u + vec2(0., px.y*e)), wd = W(u - vec2(0., px.y*e));
        float lap = abs(wl + wr + wu + wd - 4.*wc)/max(max(wc, max(max(wl, wr), max(wu, wd))), 1e-7), bord = smoothstep(.012, .05, lap);
        float gl = abs(lum(ton(u + vec2(px.x*e, 0.))) - lum(ton(u - vec2(px.x*e, 0.)))) + abs(lum(ton(u + vec2(0., px.y*e))) - lum(ton(u - vec2(0., px.y*e)))); bord = max(bord, smoothstep(.09, .22, gl)*.75*(1. - dore));
        /* les hachures */
        float encre = 0.;
        if(ciel){ float el = asin(clamp(dir.y, -1., 1.)), az = atan(dir.x, dir.z), K = uRes.y*.115, v = el*K + (vn(vec2(az*4., el*9.)) - .5)*2.4 + (vn(vec2(az*30., el*40.)) - .5)*.35;
          encre = traits(v, 1., smoothstep(1., .2, t)*.3, 0.); encre = max(encre, traits(el*.8 + az*.6, K, smoothstep(.4, 0., t)*.28, 0.)); }
        else { vec3 N = abs(normalize(cross(dFdx(P), dFdy(P)))); vec2 q = N.y > .62 ? P.xz : (N.x > N.z ? P.zy : P.xy);
          float lod = log2(max(z, .3)), o = floor(lod), fr = lod - o, sc = uRes.y*.085*exp2(-o); q += mix((vn(q*sc*.11) - .5)*.5/sc, (vn(q*sc*.055) - .5)/sc, fr) + (vn(q*.6) - .5)*.04;
          float d1 = smoothstep(.9, .3, t), d2 = smoothstep(.5, .1, t), d3 = smoothstep(.24, 0., t);
          float sens = N.y > .62 ? 0. : 1.;
          encre = traits(q.x + q.y*mix(.35, 1., sens), sc, d1*.3, fr); encre = max(encre, traits(q.x - q.y*mix(2.2, 1., sens), sc, d2*.31, fr)); encre = max(encre, traits(q.y*1.35, sc, d3*.36, fr)); }
        encre = max(encre*(1. - loin*.45), bord*(1. - loin*.5));
        /* le papier, l'or, le lavis de couleur (les encres gagnées), puis l'encre */
        vec3 papier = vec3(.925, .885, .79)*(1. - vn(fc*.5)*.05 - h21(fc)*.035 - vn(fc*.012)*.06);
        vec3 col = mix(papier, papier*vec3(1., .78, .34), dore*.95);
        vec3 lav = mix(vec3(l), c, 1.9); lav = 1. - (1. - clamp(lav, 0., 1.))*.62; col = mix(col, col*mix(lav, vec3(1.), dore*.6)*1.08, uLavis);
        col = mix(col, vec3(.085, .065, .055), clamp(encre, 0., 1.)*.93);
        vec2 qv = vUv - .5; col *= 1. - dot(qv, qv)*.42; col *= 1. - smoothstep(.47, .5, max(abs(qv.x), abs(qv.y)))*.25;
        gl_FragColor = vec4(col, 1.); }`});
  const quadScene = new THREE.Scene(), quadCam = new THREE.Camera(); quadScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), GRAV ? postG : post));
  function taille(){ const W = root.clientWidth, H = root.clientHeight, px = Math.min(W, H) < 520 ? 3 : Math.min(W, H) < 800 ? 4 : 5; RW = Math.max(80, Math.round(W/px)); RH = Math.max(80, Math.round(H/px));
    if(GRAV){ const k = Math.min(window.devicePixelRatio || 1, 2); RW = Math.round(W*k); RH = Math.round(H*k); canvas.style.imageRendering = "auto"; }
    renderer.setSize(RW, RH, false); if(rt){ if(rt.depthTexture) rt.depthTexture.dispose(); rt.dispose(); } rt = new THREE.WebGLRenderTarget(RW, RH, {minFilter:GRAV ? THREE.LinearFilter : THREE.NearestFilter, magFilter:GRAV ? THREE.LinearFilter : THREE.NearestFilter, depthBuffer:true}); post.uniforms.tD.value = rt.texture;
    if(GRAV){ rt.depthTexture = new THREE.DepthTexture(RW, RH); rt.depthTexture.type = THREE.FloatType; rt.depthTexture.minFilter = rt.depthTexture.magFilter = THREE.NearestFilter; postG.uniforms.tD.value = rt.texture; postG.uniforms.tZ.value = rt.depthTexture; postG.uniforms.uRes.value.set(RW, RH); }
    cam.aspect = W/H; cam.fov = W < H ? 82 : 64; cam.updateProjectionMatrix(); mainX = W < H ? .2 : .42; main.scale.setScalar(W < H ? .7 : 1); }

  /* ---- la lumière */
  const hemi = new THREE.HemisphereLight(0x8a7ab8, 0x1a1420, 1.1); scene.add(hemi);
  const lune = new THREE.DirectionalLight(0x9db4ff, .55); lune.position.set(-60, 90, 40); scene.add(lune);
  const lanterne = new THREE.PointLight(0xffa24a, 0, 22, 1.4); cam.add(lanterne); lanterne.position.set(.5, -.35, -.6);
  const feux = [0, 1, 2].map(() => { const l = new THREE.PointLight(0xff9a40, 0, 20, 1.6); scene.add(l); return l; });

  /* ---- le ciel : la braise du soir derrière la tour, puis la nuit */
  const ciel = new THREE.Mesh(new THREE.SphereGeometry(1200, 32, 20), new THREE.ShaderMaterial({side:THREE.BackSide, depthWrite:false, fog:false,
    uniforms:{uZen:{value:new THREE.Color()}, uHor:{value:new THREE.Color()}, uEmb:{value:new THREE.Color(0xff6a2a)}, uNuit:{value:0}, uT:{value:0}, uTour:{value:new THREE.Vector3(0, 0, -1)}, uLune:{value:new THREE.Vector3(-.5, .55, -.67).normalize()}},
    vertexShader:`varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix*modelViewMatrix*vec4(position, 1.); }`,
    fragmentShader:`uniform vec3 uZen, uHor, uEmb, uTour, uLune; uniform float uNuit, uT; varying vec3 vD;
      float h1(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7)))*43758.5453); }
      float vn(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3. - 2.*f); return mix(mix(h1(i), h1(i + vec2(1, 0)), f.x), mix(h1(i + vec2(0, 1)), h1(i + vec2(1, 1)), f.x), f.y); }
      void main(){ vec3 d = normalize(vD); float h = d.y; vec3 c = mix(uHor, uZen, pow(smoothstep(-.03, .7, h), .65));
        float a = max(0., dot(normalize(vec3(d.x, 0., d.z)), uTour)); c += uEmb*exp(-abs(h - .015)*8.)*pow(a, 2.5)*(1. - uNuit*.82);
        float az = atan(d.x, d.z); float n = vn(vec2(az*2.4 + uT*.004, h*11.))*.6 + vn(vec2(az*6. - uT*.006, h*26.))*.4;
        float nu = smoothstep(.48, .74, n)*smoothstep(.02, .16, h)*(1. - smoothstep(.34, .62, h)); c = mix(c, c*.42 + uEmb*.1*pow(a, 3.)*(1. - uNuit), nu);
        vec3 g = floor(d*190.); float s = fract(sin(dot(g, vec3(12.9898, 78.233, 37.719)))*43758.5453);
        c += vec3(.85, .9, 1.)*step(.9972, s)*smoothstep(.04, .35, h)*uNuit*(1. - nu)*(.55 + .45*sin(uT*2. + s*90.));
        float m = dot(d, uLune); c += (vec3(.95, .96, 1.)*smoothstep(.99935, .9996, m) + vec3(.2, .26, .5)*pow(max(m, 0.), 90.)*.6)*smoothstep(.15, .8, uNuit);
        gl_FragColor = vec4(c, 1.); }`})); ciel.frustumCulled = false; scene.add(ciel);

  /* ---- les montagnes, au fond */
  { const N = 120, R = 640, p = [], idx = []; for(let i = 0; i <= N; i++){ const a = i/N*TAU, hh = 40 + fbm(Math.cos(a)*3 + 5, Math.sin(a)*3 + 5)*190 + noise(i*.9, 3)*22; p.push(Math.cos(a)*R, -30, Math.sin(a)*R, Math.cos(a)*R, hh, Math.sin(a)*R); if(i < N){ const k = i*2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); } }
    const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3)); g.setIndex(idx);
    var monts = new THREE.Mesh(g, new THREE.MeshBasicMaterial({color:0x221c38, fog:false, side:THREE.DoubleSide})); monts.position.set(0, 0, -150); monts.frustumCulled = false; scene.add(monts); }

  /* ---- le sol */
  const tTerre = T.terre(); tTerre.repeat.set(120, 136);
  { const g = new THREE.PlaneGeometry(440, 500, 150, 170); g.rotateX(-Math.PI/2); g.translate(0, 0, -160); const P = g.attributes.position, C = new Float32Array(P.count*3), col = new THREE.Color(), a = new THREE.Color(), b = new THREE.Color();
    for(let i = 0; i < P.count; i++){ const x = P.getX(i), z = P.getZ(i), y = sol(x, z); P.setY(i, y); const d = Math.abs(x - chemin(z)), n = noise(x*.11, z*.11), pente = Math.abs(sol(x + 2, z) - y) + Math.abs(sol(x, z + 2) - y), r = Math.hypot(x - TX, z - TZ);
      a.setRGB(.14, .2, .15).lerp(b.setRGB(.2, .22, .13), n);                                           /* l'herbe */
      col.copy(a).lerp(b.setRGB(.3, .3, .34), smooth(1.6, 3.4, pente));                                 /* la roche, là où ça monte */
      col.lerp(b.setRGB(.32, .31, .35), smooth(34, 16, r));                                             /* le socle de la tour */
      col.lerp(b.setRGB(.36, .27, .19).multiplyScalar(.8 + n*.4), smooth(3.6, 1.6, d + (n - .5)*1.6)); /* le chemin */
      C[i*3] = col.r; C[i*3 + 1] = col.g; C[i*3 + 2] = col.b; }
    g.setAttribute("color", new THREE.BufferAttribute(C, 3)); g.computeVertexNormals(); scene.add(new THREE.Mesh(g, new THREE.MeshLambertMaterial({vertexColors:true, map:tTerre}))); }

  /* ---- les matières */
  const M = {pierre:new THREE.MeshLambertMaterial({map:T.pierre()}), torchis:new THREE.MeshLambertMaterial({map:T.torchis()}), ardoise:new THREE.MeshLambertMaterial({map:T.ardoise()}), chaume:new THREE.MeshLambertMaterial({map:T.chaume()}),
    bois:new THREE.MeshLambertMaterial({map:T.bois()}), noir:new THREE.MeshLambertMaterial({color:0x0c0a10}), arbre:new THREE.MeshLambertMaterial({color:0x2a2228}), sapin:new THREE.MeshLambertMaterial({color:0x16241f}), roc:new THREE.MeshLambertMaterial({color:0x55535e, flatShading:true})};
  const tFen = T.fenetre(), tHalo = T.halo();
  const halo = (s, op = 1, col = 0xffb060) => { const sp = new THREE.Sprite(new THREE.SpriteMaterial({map:tHalo, color:col, transparent:true, opacity:op, depthWrite:false, blending:THREE.AdditiveBlending, fog:false})); sp.scale.set(s, s, 1); return sp; };
  const uvs = (g, u, v) => { const a = g.attributes.uv; for(let i = 0; i < a.count; i++) a.setXY(i, a.getX(i)*u, a.getY(i)*v); return g; };

  /* ---- les maisons : un corps à colombages, un toit pentu, une cheminée, des fenêtres qui s'allument à l'approche */
  const maisons = [], obstacles = [];
  function toit(w, d, h, deb){ const x = w/2 + deb, z = d/2 + deb, p = [-x, 0, z, x, 0, z, 0, h, z, -x, 0, -z, x, 0, -z, 0, h, -z], g = new THREE.BufferGeometry(), s = Math.hypot(x, h);
    const V = [], U = [], q = (a, b, c, ua, ub, uc) => { V.push(...p.slice(a*3, a*3 + 3), ...p.slice(b*3, b*3 + 3), ...p.slice(c*3, c*3 + 3)); U.push(...ua, ...ub, ...uc); };
    q(0, 1, 2, [0, 0], [w/3, 0], [w/6, h/3]); q(4, 3, 5, [0, 0], [w/3, 0], [w/6, h/3]);
    q(3, 0, 2, [0, 0], [d/2.2, 0], [d/2.2, s/2.2]); q(3, 2, 5, [0, 0], [d/2.2, s/2.2], [0, s/2.2]); q(1, 4, 5, [0, 0], [d/2.2, 0], [d/2.2, s/2.2]); q(1, 5, 2, [0, 0], [d/2.2, s/2.2], [0, s/2.2]);
    g.setAttribute("position", new THREE.Float32BufferAttribute(V, 3)); g.setAttribute("uv", new THREE.Float32BufferAttribute(U, 2)); g.computeVertexNormals(); return g; }
  function maison(x, z, rot, o){ const w = o.w, d = o.d, h = o.h, G = new THREE.Group(), y = Math.min(sol(x - 2, z), sol(x + 2, z), sol(x, z - 2), sol(x, z + 2)) - .3; G.position.set(x, y, z); G.rotation.y = rot;
    const base = new THREE.Mesh(uvs(new THREE.BoxGeometry(w + .3, 1.5, d + .3), w/3, .5), M.pierre); base.position.y = .75; G.add(base);
    const corps = new THREE.Mesh(uvs(new THREE.BoxGeometry(w, h, d), Math.round(w/2.6), Math.max(1, Math.round(h/2.6))), M.torchis); corps.position.y = 1.5 + h/2; G.add(corps);
    const rf = new THREE.Mesh(toit(w, d, o.th, .55), o.chaume ? M.chaume : M.ardoise); rf.position.y = 1.5 + h; G.add(rf);
    const pign = new THREE.Mesh(toit(w, d - .02, o.th, 0), M.torchis); pign.position.y = 1.5 + h - .01; pign.scale.set(.98, .97, 1); G.add(pign);
    const ch = new THREE.Mesh(uvs(new THREE.BoxGeometry(.9, o.th + 1.6, .9), .4, 1), M.pierre); ch.position.set(w*.28, 1.5 + h + o.th*.5, -d*.2); G.add(ch);
    const porte = new THREE.Mesh(new THREE.BoxGeometry(1.25, 2.3, .16), M.bois); porte.position.set(o.px || 0, 1.5 + 1.0, d/2 + .03); G.add(porte);
    const fens = [], fm = new THREE.MeshBasicMaterial({map:tFen, color:0x000000, fog:true}); fm.userData.c = new THREE.Color(1, .82, .55);
    for(const [fx, fy, fz, ry] of o.fen){ const f = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.15), fm); f.position.set(fx, 1.5 + fy, fz); f.rotation.y = ry; G.add(f); fens.push(f); }
    const hl = halo(3.2, 0); hl.position.set(o.fen[0][0], 1.5 + o.fen[0][1], o.fen[0][2] + .6); G.add(hl);
    scene.add(G); const m = {G, x, z, fm, hl, v:0, rot, porte:new THREE.Vector3(o.px || 0, 2.7, d/2 + .2).applyEuler(new THREE.Euler(0, rot, 0)).add(G.position), lum:new THREE.Vector3(o.fen[0][0], 1.5 + o.fen[0][1], o.fen[0][2] + 1.2).applyEuler(new THREE.Euler(0, rot, 0)).add(G.position), chem:new THREE.Vector3(w*.28, 1.5 + h + o.th + 1.2, -d*.2).applyEuler(new THREE.Euler(0, rot, 0)).add(G.position), seuil:o.seuil || 62};
    maisons.push(m); obstacles.push([x, z, Math.max(w, d)*.62]); return m; }
  { const r = rng(42); let cote = 1; for(let z = -92; z > -182; z -= 11.5){ cote = -cote; const w = 5.2 + r()*2.6, d = 4.6 + r()*2, h = 2.6 + r()*1.3, ecart = 7.2 + r()*3.5 + w/2, x = chemin(z) + cote*ecart;
      maison(x, z + (r() - .5)*3, cote > 0 ? -Math.PI/2 + (r() - .5)*.4 : Math.PI/2 + (r() - .5)*.4, {w, d, h, th:2.4 + r()*1.6, chaume:r() < .45, px:(r() - .5)*1.6, fen:[[-w*.28, 1.5, d/2 + .04, 0], [w*.3, 1.5, d/2 + .04, 0], [w/2 + .04, 1.4, 0, Math.PI/2]]}); } }
  /* le puits, au milieu du village */
  { const z = -136, x = chemin(z) + 1.2, y = sol(x, z), G = new THREE.Group(); G.position.set(x, y, z); const mar = new THREE.Mesh(uvs(new THREE.CylinderGeometry(1.25, 1.35, 1.1, 10, 1, true), 3, .5), M.pierre); mar.position.y = .5; G.add(mar);
    for(const s of [-1, 1]){ const p = new THREE.Mesh(new THREE.BoxGeometry(.18, 2.6, .18), M.bois); p.position.set(s*1.15, 1.8, 0); G.add(p); } const t = new THREE.Mesh(toit(2.9, 1.5, .9, .1), M.chaume); t.position.y = 3.1; G.add(t); const e = new THREE.Mesh(new THREE.CircleGeometry(1.2, 10), M.noir); e.rotation.x = -Math.PI/2; e.position.y = .7; G.add(e); scene.add(G); obstacles.push([x, z, 1.7]); }

  /* ---- les lanternes du chemin : elles s'allument une à une devant toi */
  const lampes = []; { const pg = new THREE.BoxGeometry(.16, 3.1, .16), bg = new THREE.BoxGeometry(.9, .1, .1), cg = new THREE.BoxGeometry(.3, .42, .3); let cote = 1;
    for(let z = -34; z > -236; z -= 23){ cote = -cote; const x = chemin(z) + cote*3.4, y = sol(x, z), G = new THREE.Group(); G.position.set(x, y, z);
      const p = new THREE.Mesh(pg, M.bois); p.position.y = 1.55; G.add(p); const b = new THREE.Mesh(bg, M.bois); b.position.set(-cote*.4, 3, 0); G.add(b);
      const cm = new THREE.MeshBasicMaterial({color:0x1a120c}), c = new THREE.Mesh(cg, cm); c.position.set(-cote*.8, 2.72, 0); G.add(c); const hl = halo(2.4, 0); hl.position.copy(c.position); G.add(hl); scene.add(G);
      lampes.push({x:x - cote*.8, y:y + 2.72, z, cm, hl, v:0}); } }

  /* ---- les arbres morts, les sapins, les rochers, les clôtures, les tombes */
  function arbreMort(seed){ const r = rng(seed), gs = [], m = new THREE.Matrix4(), q = new THREE.Quaternion(), up = new THREE.Vector3(0, 1, 0);
    (function br(pos, dir, len, rad, n){ const g = new THREE.CylinderGeometry(rad*.62, rad, len, 5, 1); g.translate(0, len/2, 0); q.setFromUnitVectors(up, dir); m.compose(pos, q, new THREE.Vector3(1, 1, 1)); g.applyMatrix4(m); gs.push(g);
      if(n <= 0) return; const fin = pos.clone().addScaledVector(dir, len), k = n > 2 ? 2 : 2 + (r() < .4 ? 1 : 0); for(let i = 0; i < k; i++){ const d = dir.clone().add(new THREE.Vector3((r() - .5)*1.5, r()*.5 - .05, (r() - .5)*1.5)).normalize(); br(fin, d, len*(.62 + r()*.2), rad*.62, n - 1); } })(new THREE.Vector3(), new THREE.Vector3((r() - .5)*.2, 1, (r() - .5)*.2).normalize(), 2.4 + r()*1.4, .3 + r()*.14, 4);
    return mergeGeometries(gs); }
  const pose = (g, mat, liste) => { const im = new THREE.InstancedMesh(g, mat, liste.length), o = new THREE.Object3D(); liste.forEach((p, i) => { o.position.set(p[0], p[1], p[2]); o.rotation.set(p[5] || 0, p[3] || 0, p[6] || 0); o.scale.setScalar(p[4] || 1); o.updateMatrix(); im.setMatrixAt(i, o.matrix); }); im.frustumCulled = false; scene.add(im); return im; };
  { const r = rng(7), libre = (x, z, m) => Math.abs(x - chemin(z)) > m && Math.hypot(x - TX, z - CZ) > 46 && !(Math.abs(x - TX) < 7 && z < -236) && !obstacles.some(o => Math.hypot(x - o[0], z - o[1]) < o[2] + 2.5);
    const A = [[], [], []], Sp = [], R = [];
    for(let i = 0; i < 900 && A[0].length + A[1].length + A[2].length < 84; i++){ const z = 14 - r()*300, x = chemin(z) + (r() < .5 ? -1 : 1)*(4.5 + r()*r()*40); if(!libre(x, z, 4.2)) continue; A[(r()*3) | 0].push([x, sol(x, z) - .2, z, r()*TAU, .8 + r()*.9]); }
    A.forEach((l, i) => l.length && pose(arbreMort(11 + i*17), M.arbre, l));
    for(let i = 0; i < 1400 && Sp.length < 240; i++){ const z = 60 - r()*420, x = (r() - .5)*400; if(Math.abs(x - chemin(z)) < 26 || Math.hypot(x - TX, z - CZ) < 50) continue; Sp.push([x, sol(x, z) - .4, z, r()*TAU, .8 + r()*1.3]); }
    const sg = mergeGeometries([new THREE.ConeGeometry(2.2, 5, 6).translate(0, 4, 0), new THREE.ConeGeometry(1.7, 4.4, 6).translate(0, 7, 0), new THREE.ConeGeometry(1.1, 3.6, 6).translate(0, 9.6, 0), new THREE.CylinderGeometry(.3, .35, 2, 5).translate(0, 1, 0)]); pose(sg, M.sapin, Sp);
    for(let i = 0; i < 500 && R.length < 70; i++){ const z = 10 - r()*290, x = chemin(z) + (r() < .5 ? -1 : 1)*(3.6 + r()*24); if(!libre(x, z, 3.4)) continue; R.push([x, sol(x, z) - .1, z, r()*TAU, .3 + r()*r()*1.6, r()*2, r()*2]); }
    pose(new THREE.IcosahedronGeometry(1, 0), M.roc, R);
    /* les clôtures, à l'entrée du village */
    const Pq = []; for(let z = -58; z > -90; z -= 2.2) for(const s of [-1, 1]){ const x = chemin(z) + s*(3.9 + noise(z*.3, s)*.6); Pq.push([x, sol(x, z) + .5, z, r()*.4, 1, (r() - .5)*.2, (r() - .5)*.2]); } pose(new THREE.BoxGeometry(.14, 1.25, .14), M.bois, Pq);
    /* le cimetière, entre le village et la tour */
    const Tb = [], Cx = []; for(let i = 0; i < 26; i++){ const z = -192 - (i % 6)*3.4 + r(), x = chemin(z) + 6.5 + Math.floor(i/6)*2.8 + r(); if(r() < .5) Tb.push([x, sol(x, z) + .5, z, (r() - .5)*.5, 1, (r() - .5)*.25, (r() - .5)*.2]); else Cx.push([x, sol(x, z) + .65, z, (r() - .5)*.5, 1, (r() - .5)*.2, (r() - .5)*.25]); }
    pose(new THREE.BoxGeometry(.75, 1.2, .16), M.pierre, Tb); pose(mergeGeometries([new THREE.BoxGeometry(.16, 1.5, .14), new THREE.BoxGeometry(.8, .16, .14).translate(0, .32, 0)]), M.pierre, Cx);
    /* trois pierres levées, au départ : la croisée des chemins */
    for(const [dx, dz, hh] of [[-4.5, -9, 3.6], [4.8, -11, 3], [5.6, -7, 2.2]]){ const s = new THREE.Mesh(uvs(new THREE.BoxGeometry(1.1, hh, .7), .5, 1.2), M.pierre); const x = chemin(dz) + dx; s.position.set(x, sol(x, dz) + hh/2 - .3, dz); s.rotation.set((r() - .5)*.16, r()*3, (r() - .5)*.16); scene.add(s); obstacles.push([x, dz, 1]); } }

  /* ---- la tour du magicien */
  const tour = new THREE.Group(), tourMats = []; tour.position.set(TX, sol(TX, TZ), TZ); scene.add(tour);
  { const tm = k => { const m = new THREE.MeshLambertMaterial({map:M[k].map, fog:false}); m.userData.c = new THREE.Color(k === "ardoise" ? 0x8a88a0 : 0xffffff); tourMats.push(m); return m; }, P = tm("pierre"), A = tm("ardoise"), N = new THREE.MeshLambertMaterial({color:0x050408, fog:false});
    const add = (g, m, x, y, z, rx = 0, rz = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.rotation.set(rx, 0, rz); tour.add(o); return o; };
    add(uvs(new THREE.CylinderGeometry(9.5, 12, 6, 9), 8, 1.5), P, 0, 2, 0);                                     /* le socle */
    add(uvs(new THREE.CylinderGeometry(5.6, 7.4, 44, 12), 9, 9), P, 0, 26, 0);                                   /* le fût */
    add(uvs(new THREE.CylinderGeometry(7.2, 5.4, 3.2, 12), 10, 1), P, 0, 49, 0);                                 /* l'encorbellement */
    add(uvs(new THREE.CylinderGeometry(6.6, 6.9, 11, 12), 10, 2.5), P, 0, 56, 0);                                /* la chambre haute */
    for(let i = 0; i < 12; i++){ const a = i/12*TAU; add(uvs(new THREE.BoxGeometry(1.7, 1.8, 1.2), .6, .6), P, Math.cos(a)*7, 62.4, Math.sin(a)*7).rotation.y = -a + Math.PI/2; }
    add(uvs(new THREE.ConeGeometry(7.6, 21, 12), 8, 5), A, .5, 72, 0, 0, .05); add(new THREE.CylinderGeometry(.12, .12, 6, 5), N, 1.1, 85, 0);  /* le toit, un peu de travers, et sa flèche */
    add(uvs(new THREE.CylinderGeometry(2.3, 2.6, 30, 8), 4, 6), P, 7.6, 30, 2.5); add(uvs(new THREE.ConeGeometry(3.2, 10, 8), 4, 3), A, 7.6, 50, 2.5);   /* la tourelle */
    add(uvs(new THREE.CylinderGeometry(1.7, 1.9, 16, 8), 3, 3), P, -6.2, 40, -3.4); add(uvs(new THREE.ConeGeometry(2.5, 7, 8), 3, 2), A, -6.2, 51.5, -3.4);
    add(uvs(new THREE.BoxGeometry(3.6, 1.4, 5), 1.2, .5), P, 5.6, 40, 2.2);                                       /* un pont entre les deux */
    for(let i = 0; i < 5; i++){ const a = i/5*TAU + .5; add(uvs(new THREE.BoxGeometry(2.4, 15, 3), 1, 4), P, Math.cos(a)*8, 9, Math.sin(a)*8, 0, 0).rotation.set(Math.sin(a)*.1, -a, Math.cos(a)*-.1); }
    add(new THREE.BoxGeometry(2.8, 4.6, .6), N, 0, 7.2, 7.25);                                                    /* la porte */
    for(const [a, y] of [[.4, 18], [-.5, 27], [.2, 35], [2.4, 22], [3.6, 33], [-2, 16], [1.3, 43]]) add(new THREE.BoxGeometry(.55, 1.9, .4), N, Math.sin(a)*6.4*(1 - y/200), y, Math.cos(a)*6.4*(1 - y/200)).rotation.y = a;
    /* la seule fenêtre allumée, tout en haut, tournée vers le chemin */
    const f = add(new THREE.PlaneGeometry(1.5, 2.3), new THREE.MeshBasicMaterial({map:tFen, fog:false}), 0, 56.5, 6.82);
    var phare = halo(26, .9, 0xffb866); phare.position.set(0, 56.5, 7.6); tour.add(phare); var phare2 = halo(46, .16, 0xff9a50); phare2.position.copy(phare.position); tour.add(phare2);
    /* des rochers au pied */
    const r = rng(5); for(let i = 0; i < 0; i++){ const a = r()*TAU, d = 11 + r()*9, s = 1.5 + r()*3.5, o = new THREE.Mesh(new THREE.IcosahedronGeometry(s, 0), M.roc); o.position.set(TX + Math.cos(a)*d, sol(TX + Math.cos(a)*d, TZ + Math.sin(a)*d) + s*.2, TZ + Math.sin(a)*d); o.rotation.set(r()*3, r()*3, r()*3); o.scale.y = 1 + r()*1.4; scene.add(o); }
    obstacles.push([TX, TZ, 12.6]); }
  /* des corbeaux, autour du toit */
  const corbeaux = []; { const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.Float32BufferAttribute([-1, 0, 0, 0, 0, .25, 0, 0, -.25, 1, 0, 0, 0, 0, .25, 0, 0, -.25], 3)); const m = new THREE.MeshBasicMaterial({color:0x05040a, side:THREE.DoubleSide, fog:false});
    for(let i = 0; i < 7; i++){ const c = new THREE.Mesh(g, m); c.scale.setScalar(.9 + (i % 3)*.25); scene.add(c); corbeaux.push({c, a:i*1.1, r:11 + i*2.6, h:64 + (i % 4)*5, v:.22 + (i % 3)*.06}); } }

  /* ---- ce qui flotte : des cendres dans l'air, la fumée des cheminées */
  const NP = 420, pp = new Float32Array(NP*3), cendres = new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial({color:0xcfc8e0, size:1.6, sizeAttenuation:false, transparent:true, opacity:.5, depthWrite:false}));
  { const r = rng(3); for(let i = 0; i < NP; i++){ pp[i*3] = (r() - .5)*44; pp[i*3 + 1] = r()*16; pp[i*3 + 2] = (r() - .5)*44; } cendres.geometry.setAttribute("position", new THREE.BufferAttribute(pp, 3)); cendres.frustumCulled = false; scene.add(cendres); }
  const fumees = []; { const tf = T.halo(); for(let i = 0; i < 36; i++){ const s = new THREE.Sprite(new THREE.SpriteMaterial({map:tf, color:0x8f88a8, transparent:true, opacity:0, depthWrite:false})); scene.add(s); fumees.push({s, m:maisons[i % maisons.length], t:i/36*9}); } }

  /* ---- la lanterne qu'on tient */
  const main = new THREE.Group(); cam.add(main); main.position.set(.42, -.36, -.8);
  { const b = new THREE.MeshBasicMaterial({color:0x0e0a08, fog:false}), fl = new THREE.MeshBasicMaterial({color:0xffc878, fog:false});
    for(const [x, z] of [[-.07, -.07], [.07, -.07], [-.07, .07], [.07, .07]]){ const p = new THREE.Mesh(new THREE.BoxGeometry(.018, .2, .018), b); p.position.set(x, 0, z); main.add(p); }
    const h = new THREE.Mesh(new THREE.BoxGeometry(.19, .03, .19), b); h.position.y = .11; main.add(h); const s = new THREE.Mesh(new THREE.BoxGeometry(.19, .03, .19), b); s.position.y = -.11; main.add(s);
    const an = new THREE.Mesh(new THREE.TorusGeometry(.05, .008, 4, 8), b); an.position.y = .17; main.add(an); var flamme = new THREE.Mesh(new THREE.BoxGeometry(.06, .1, .06), fl); main.add(flamme); var mainHalo = halo(.26, .5); main.add(mainHalo); }

  /* ---- la marche */
  const J = {x:chemin(2), z:2, yaw:0, pitch:-.02, v:0, bob:0, pas:0, avance:false, touches:{}};
  const versTour = () => Math.atan2(-(TX - J.x), -(TZ - J.z)); J.yaw = versTour(); let touche = 0;
  let tire = null; canvas.addEventListener("pointerdown", e => { Son.init(); tire = {x:e.clientX, y:e.clientY, id:e.pointerId}; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener("pointermove", e => { if(!tire || e.pointerId !== tire.id) return; touche = temps; J.yaw -= (e.clientX - tire.x)*.0052; J.pitch = clamp(J.pitch - (e.clientY - tire.y)*.004, -.7, .9); tire.x = e.clientX; tire.y = e.clientY; });
  const lache = e => { if(tire && e.pointerId === tire.id) tire = null; }; canvas.addEventListener("pointerup", lache); canvas.addEventListener("pointercancel", lache);
  const bm = $(".tq-marche"), mOn = e => { e.preventDefault(); Son.init(); J.avance = true; bm.classList.add("on"); }, mOff = () => { J.avance = false; bm.classList.remove("on"); };
  bm.addEventListener("pointerdown", mOn); bm.addEventListener("pointerup", mOff); bm.addEventListener("pointerleave", mOff); bm.addEventListener("pointercancel", mOff); bm.addEventListener("contextmenu", e => e.preventDefault());
  const kd = e => { if(e.key === "Escape") return fermer(); J.touches[e.code] = true; if(/^(Arrow|Key[WASDZQ]|Space)/.test(e.code)){ e.preventDefault(); Son.init(); } }, ku = e => { J.touches[e.code] = false; };
  document.addEventListener("keydown", kd); document.addEventListener("keyup", ku);

  /* ---- les mots : presque rien */
  let capT = 0; const cap = (txt, ms = 7000) => { const el = $(".tq-cap"); el.textContent = txt; el.classList.remove("on"); void el.offsetWidth; el.classList.add("on"); clearTimeout(capT); capT = setTimeout(() => el.classList.remove("on"), ms); };
  let cloche = 6;

  /* ---- une image */
  const cA = new THREE.Color(), cB = new THREE.Color(), v3 = new THREE.Vector3(), SOIR = {zen:0x2a2a5c, hor:0x6a4a6e, fog:0x4a3a5a, mont:0x2c2244}, NUIT = {zen:0x070a1c, hor:0x1a2040, fog:0x10142a, mont:0x0c0f22};
  const mel = (a, b, k) => cA.setHex(a).lerp(cB.setHex(b), k);
  let manuel = false;   /* pour filmer image par image, à pas fixe */
  function image(now, pas){ if(!vivant) return; if(pas == null){ raf = requestAnimationFrame(image); if(manuel) return; } const dt = pas != null ? pas : Math.min(.05, (now - last)/1000); last = now; temps += dt;
    /* marcher */
    const K = J.touches, av = (J.avance || K.ArrowUp || K.KeyW || K.KeyZ || K.Space ? 1 : 0) - (K.ArrowDown || K.KeyS ? 1 : 0), tr = (K.ArrowLeft || K.KeyA || K.KeyQ ? 1 : 0) - (K.ArrowRight || K.KeyD ? 1 : 0);
    J.yaw += tr*1.7*dt; J.v = lerp(J.v, G.fige ? 0 : av*(av < 0 ? 2.6 : 4.7), Math.min(1, dt*6));
    if(Math.abs(J.v) > .05){ let nx = J.x - Math.sin(J.yaw)*J.v*dt, nz = J.z - Math.cos(J.yaw)*J.v*dt;
      [nx, nz] = G.regle(nx, nz);
      for(const o of obstacles){ const d = Math.hypot(nx - o[0], nz - o[1]); if(d < o[2]){ nx = o[0] + (nx - o[0])/d*o[2]; nz = o[1] + (nz - o[1])/d*o[2]; } }
      const dist = Math.hypot(nx - J.x, nz - J.z); J.x = nx; J.z = nz; J.bob += dist*1.55; J.pas += dist; if(J.pas > 2.05){ J.pas = 0; Son.pas(); } }
    /* sans la main sur l'écran, le regard suit le chemin : on peut marcher d'un seul pouce */
    if(temps - touche > 1.6 && av > 0 && J.z > MUR + 14 && !G.fige){ const zc = J.z - 15; let dy = Math.atan2(-(chemin(zc) - J.x), 15) - J.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); J.yaw += dy*Math.min(1, dt*.8)*smooth(40, 110, Math.hypot(TX - J.x, TZ - J.z)); J.pitch = lerp(J.pitch, 0, Math.min(1, dt*.3)*smooth(60, 110, Math.hypot(TX - J.x, TZ - J.z))); }
    if(temps - touche > 2.5 && !G.fige && J.z > MUR + 2){ const dT0 = Math.hypot(TX - J.x, TZ - J.z), k = smooth(120, 60, dT0); if(k > 0){ J.pitch = lerp(J.pitch, .12 + k*.3, Math.min(1, dt*.5)); let dy = versTour() - J.yaw; dy = Math.atan2(Math.sin(dy), Math.cos(dy)); J.yaw += dy*Math.min(1, dt*.35*k); } }
    const y = sol(J.x, J.z) + 1.72 + Math.sin(J.bob*2)*.055*Math.min(1, Math.abs(J.v)/3);
    main.visible = !G.cine; if(G.cine) G.cine(dt, temps); else {cam.position.set(J.x, lerp(cam.position.y || y, y, Math.min(1, dt*12)), J.z); cam.rotation.set(J.pitch, J.yaw + Math.sin(J.bob)*.006, 0); }
    main.position.set(mainX + Math.sin(J.bob)*.02, -.36 + Math.abs(Math.cos(J.bob))*.018 + Math.sin(temps*1.3)*.004, -.8); main.rotation.z = Math.sin(J.bob)*.08;
    /* la nuit tombe à mesure qu'on avance */
    const p = clamp(-J.z/-FIN, 0, 1), nuit = smooth(.04, .5, p), U = ciel.material.uniforms;
    U.uZen.value.copy(mel(SOIR.zen, NUIT.zen, nuit)); U.uHor.value.copy(mel(SOIR.hor, NUIT.hor, nuit)); U.uNuit.value = nuit; U.uT.value = temps; U.uTour.value.set(TX - J.x, 0, TZ - J.z).normalize();
    scene.fog.color.copy(mel(SOIR.fog, NUIT.fog, nuit)); scene.fog.near = lerp(26, 12, nuit); scene.fog.far = lerp(240, 150, nuit); monts.material.color.copy(mel(SOIR.mont, NUIT.mont, nuit));
    hemi.intensity = lerp(1.25, .72, nuit); hemi.color.copy(mel(0x9a84c0, 0x4a5a9a, nuit)); lune.intensity = lerp(.25, .7, nuit);
    const fl = .86 + .1*Math.sin(temps*11) + .06*Math.sin(temps*23.7); lanterne.intensity = lerp(1.2, 6.5, nuit)*fl; flamme.scale.y = .8 + fl*.3; mainHalo.material.opacity = (.25 + .25*nuit)*fl; post.uniforms.uNuit.value = nuit;
    ciel.position.copy(cam.position);
    /* la tour : une ombre sur la braise, puis de la pierre */
    const dT = Math.hypot(TX - J.x, TZ - J.z), brume = smooth(36, 230, dT); for(const m of tourMats){ m.color.copy(m.userData.c).multiplyScalar(1 - brume*.93); m.emissive.copy(scene.fog.color).multiplyScalar(brume*.22); }
    phare.material.opacity = .65 + .3*Math.sin(temps*2.1)*Math.sin(temps*.7); phare.scale.setScalar(lerp(30, 9, smooth(260, 40, dT))); phare2.material.opacity = (.1 + .1*nuit)*smooth(30, 140, dT);
    /* les fenêtres et les lanternes s'allument à l'approche */
    const proches = []; for(const m of maisons){ const d = Math.hypot(m.x - J.x, m.z - J.z); m.v = Math.min(1, m.v + (d < m.seuil ? dt*.8 : 0)); const k = m.v*(.82 + .18*Math.sin(temps*7 + m.x)); m.fm.color.copy(m.fm.userData.c).multiplyScalar(k); m.hl.material.opacity = m.v*.3; if(m.v > .2) proches.push([d, m.lum, m.v]); }
    for(const l of lampes){ const d = Math.hypot(l.x - J.x, l.z - J.z); if(d < 40 && l.v === 0){ l.v = .001; Son.note([220, 261.6, 293.7, 329.6, 392][lampes.indexOf(l) % 5], .035); } if(l.v > 0) l.v = Math.min(1, l.v + dt*1.2); const k = l.v*(.85 + .15*Math.sin(temps*9 + l.z)); l.cm.color.setRGB(1*k + .1, .72*k + .07, .38*k + .05); l.hl.material.opacity = l.v*.5; if(l.v > .2) proches.push([d*.8, v3.set(l.x, l.y, l.z).clone(), l.v]); }
    for(const b of G.brasiers) proches.push([Math.hypot(b.x - J.x, b.z - J.z)*.7, b, 1]);
    proches.sort((a, b) => a[0] - b[0]); feux.forEach((f, i) => { const q = proches[i]; if(q){ f.position.copy(q[1]); f.intensity = 15*q[2]*smooth(60, 18, q[0])*fl; } else f.intensity = 0; });
    /* les cendres suivent, la fumée monte, les corbeaux tournent */
    for(let i = 0; i < NP; i++){ let x = pp[i*3] + Math.sin(temps*.4 + i)*dt*.5 + dt*.6; if(x > 22) x -= 44; let yy = pp[i*3 + 1] - dt*(.35 + (i % 5)*.07), z = pp[i*3 + 2]; if(yy < 0) yy = 16; pp[i*3] = x; pp[i*3 + 1] = yy; pp[i*3 + 2] = z; }
    cendres.geometry.attributes.position.needsUpdate = true; cendres.position.set(J.x, cam.position.y - 6, J.z);
    for(const f of fumees){ f.t = (f.t + dt) % 9; const k = f.t/9; f.s.position.set(f.m.chem.x + k*k*4 + Math.sin(f.t + f.m.x)*.5, f.m.chem.y + k*9, f.m.chem.z + Math.cos(f.t*.7)*.4); f.s.scale.setScalar(1.2 + k*5); f.s.material.opacity = f.m.v*.38*Math.sin(k*Math.PI); }
    for(const c of corbeaux){ c.a += c.v*dt; c.c.position.set(TX + Math.cos(c.a)*c.r, tour.position.y + c.h + Math.sin(c.a*3)*1.5, TZ + Math.sin(c.a)*c.r); c.c.rotation.y = -c.a; c.c.rotation.z = Math.sin(temps*9 + c.r)*.25; }
    /* les mots, la cloche, la fin */
    for(const f of G.maj) f(dt, temps, p);
    if(GRAV){ scene.fog.near = 1e5; scene.fog.far = 2e5; for(const m of tourMats){ m.color.copy(m.userData.c); m.emissive.setScalar(0); } hemi.intensity *= 1.7; lune.intensity = lune.intensity*2.2 + .5; postG.uniforms.uT.value = temps; postG.uniforms.uNF.value.set(cam.near, cam.far); }
    cloche -= dt; if(cloche < 0){ cloche = 21 + Math.random()*9; Son.cloche(lerp(.35, 1, p)); }
    renderer.setRenderTarget(rt); renderer.render(scene, cam); renderer.setRenderTarget(null); renderer.render(quadScene, quadCam); }

  function fermer(){ if(!vivant) return; vivant = false; cancelAnimationFrame(raf); Son.fin(); hist.garde(); hist.fin(); window.removeEventListener("resize", taille); document.removeEventListener("keydown", kd); document.removeEventListener("keyup", ku);
    scene.traverse(o => { if(o.geometry) o.geometry.dispose(); if(o.material){ (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => { if(m.map) m.map.dispose(); m.dispose(); }); } }); if(rt) rt.dispose(); renderer.dispose();
    root.classList.add("sort"); setTimeout(() => { root.remove(); document.documentElement.classList.remove("tq-ouvert"); opt.ferme && opt.ferme(); }, 450); }
  $("[data-q]").onclick = fermer;
  $("[data-son]").onclick = e => { Son.init(); Son.on = !Son.on; try{ localStorage.setItem("arcanes.tour.son", Son.on ? "1" : "0"); }catch(x){} e.currentTarget.textContent = Son.on ? "♪" : "♪̸"; };
  window.addEventListener("resize", taille); taille();
  /* ---- l'histoire : le château, les énigmes, les visions (histoire.js) */
  const G = {THREE, scene, cam, J, M, T, tFen, halo, uvs, toit, pose, sol, chemin, rng, smooth, lerp, clamp, TX, TZ, CZ, MUR, FIN, tour, tourMats, maisons, lampes, obstacles, post, ciel, hemi, lune, lanterne, phare, phare2, Son, cap, root, fermer,
    maj:[], brasiers:[], cine:null, fige:false, regle:(x, z) => [x, z], vivant:() => vivant, temps:() => temps, regarde:() => { touche = temps; }};
  const hist = installer(G);
  window.__tourDbg = {J, cam, scene, fermer, G, hist, postG, pas:dt => { manuel = true; image(performance.now(), dt); }, va:(z, x) => { J.z = z; J.x = x != null ? x : chemin(z); J.pitch = 0; J.yaw = Math.atan2(-(chemin(z - 14) - J.x), 14); }};

  /* ---- l'ouverture : le noir, le titre, puis la colline */
  const voile = $(".tq-voile"), titre = $(".tq-titre"); voile.style.opacity = 1;
  titre.innerHTML = `<small>Magie</small><b>${[..."La Tour"].map((c, i) => `<span style="animation-delay:${200 + i*110}ms">${c === " " ? "&nbsp;" : c}</span>`).join("")}</b><i>Touche l'écran pour commencer</i>`; titre.classList.add("on");
  requestAnimationFrame(t => { last = t; image(t); });
  const debut = () => { root.removeEventListener("pointerdown", debut); Son.init(); titre.classList.add("off"); voile.style.transition = "opacity 3.2s"; voile.style.opacity = 0; root.classList.add("joue"); setTimeout(() => Son.cloche(.4), 1200);
    setTimeout(() => { if(!G.fige) cap(window.matchMedia("(pointer:coarse)").matches ? "Maintiens « Avancer ». Fais glisser pour regarder." : "Flèches ou ZQSD pour marcher. Fais glisser pour regarder.", 6000); }, 5200); hist.debut(); };
  setTimeout(() => root.addEventListener("pointerdown", debut), 900);
  return {fermer};
}
