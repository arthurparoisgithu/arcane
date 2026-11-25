/* ===== Arcanes · Psyché · Le Miroir : le jeu =====
   Trois actes. I : la nuit, le miroir, le cabinet de Jung, le rêve, l'orage, la cabane. II : la maison et ses cinq ailes,
   chacune avec sa façon de jouer (les masques, le couloir des mots, la galerie, la grotte, la tour). III : le cercle,
   les trois coups, le choix, et la nuit de nouveau. Tout reste sur l'appareil (localStorage « arcanes.miroir.v1 »). */
window.ArcanesMiroir = (() => {
  const PX = window.MiroirPix, W = PX.W, S = PX.S, KEY = "arcanes.miroir.v1";
  const DEF = () => ({v:1, niv:"hub", saga:{faits:{}, volets:[], agit:[]}, etape:"nuit", nom:"", reve:"", motReve:"", mots:[], lent:null, agace:"", lame:null, ailes:{}, carnet:[], lueurs:[], fin:null, lu1913:false, mandala:"", son:true, finie:0});
  let st = DEF(), root = null, eng = null, c3 = null, c2 = null, x2 = null, mode = "", paint = null, popt = {}, raf2 = 0, t2 = 0, busy = false, alive = false, capT = 0, lieu = "";
  const load = () => { try{ const o = JSON.parse(localStorage.getItem(KEY)); if(o && o.v === 1){ st = Object.assign(DEF(), o); if(!o.saga){ st.saga = {faits:{}, volets:[], agit:[]}; st.niv = (o.etape === "nuit" || o.etape === "fin") ? "hub" : "VII"; if(o.etape === "fin") st.saga.faits.VII = "jeu"; } } }catch(e){} };
  const save = () => { try{ localStorage.setItem(KEY, JSON.stringify(st)); }catch(e){} };
  const $ = s => root.querySelector(s), esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  const wait = ms => new Promise(r => setTimeout(r, ms));
  const nb = s => String(s).replace(/ ([:;?!»])/g, " $1").replace(/« /g, "« ");

  /* ================================================================ LE SON (tout est synthétisé) */
  const Snd = (() => { let ac = null, out = null, nz = null, amb = {}, pianoG = null, pianoT = null, step = 0;
    const ok = () => ac && st.son;
    function init(){ if(ac) return; try{ ac = new (window.AudioContext || window.webkitAudioContext)(); }catch(e){ return; } out = ac.createGain(); out.gain.value = st.son ? .9 : 0; out.connect(ac.destination);
      const n = ac.sampleRate*2, b = ac.createBuffer(1, n, ac.sampleRate), d = b.getChannelData(0); let l = 0; for(let i = 0; i < n; i++){ const w = Math.random()*2 - 1; l = (l + .02*w)/1.02; d[i] = w*.5 + l*8; } nz = b;
      pianoG = ac.createGain(); pianoG.gain.value = 0; const f = ac.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 2100; pianoG.connect(f); f.connect(out); }
    const mute = v => { st.son = v; save(); if(out) out.gain.setTargetAtTime(v ? .9 : 0, ac.currentTime, .1); };
    function loop(name, type, freq, q, vol){ if(!ac) return; let a = amb[name]; if(!a){ const s = ac.createBufferSource(); s.buffer = nz; s.loop = true; const f = ac.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q; const g = ac.createGain(); g.gain.value = 0; s.connect(f); f.connect(g); g.connect(out); s.start(); a = amb[name] = {g, f}; } a.g.gain.setTargetAtTime(vol, ac.currentTime, .8); }
    const ambiance = o => { if(!ac) return; o = o || {}; loop("vent", "bandpass", 420, .7, o.vent || 0); loop("pluie", "highpass", 2600, .4, o.pluie || 0); loop("feu", "bandpass", 1500, 1.2, o.feu || 0); loop("foule", "bandpass", 300, .5, o.foule || 0); loop("gaz", "highpass", 5200, .3, o.gaz || 0); };
    function burst(type, freq, dur, vol, q){ if(!ok()) return; const s = ac.createBufferSource(); s.buffer = nz; const f = ac.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q || 1; const g = ac.createGain(), t = ac.currentTime; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + dur); s.connect(f); f.connect(g); g.connect(out); s.start(t, Math.random()); s.stop(t + dur + .05); }
    function tone(freq, dur, vol, type, when){ if(!ok()) return; const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + (when || 0); o.type = type || "sine"; o.frequency.value = freq; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + .01); g.gain.exponentialRampToValueAtTime(.001, t + dur); o.connect(g); g.connect(out); o.start(t); o.stop(t + dur + .05); }
    const pas = () => { step ^= 1; burst("lowpass", step ? 190 : 150, .09, .1, .6); };
    const tonnerre = () => { burst("lowpass", 120, 2.6, 1.1, .5); setTimeout(() => burst("lowpass", 70, 3, .8, .5), 220); };
    const toc = () => { tone(96, .16, .5, "sine"); burst("lowpass", 300, .08, .35, 1); };
    const vitre = () => { tone(1900, .05, .14, "triangle"); burst("highpass", 3000, .03, .12, 1); };
    const craque = () => { burst("bandpass", 900, .12, .7, 3); setTimeout(() => burst("bandpass", 500, .2, .5, 2), 60); };
    const clair = () => { tone(784, 1.6, .07, "sine"); tone(1175, 2.2, .05, "sine", .12); };
    const grave = () => { tone(55, 1.8, .4, "sine"); tone(58, 1.8, .25, "sine"); };
    const or = () => { [523, 659, 784, 1047].forEach((f, i) => tone(f, 1.8, .06, "triangle", i*.14)); };
    /* le piano du miroir : un motif lent, original, en la mineur */
    const N = m => 440*Math.pow(2, (m - 69)/12), PAT = [[45, 52, 57, 60, 64, 60, 57, 52], [41, 48, 53, 57, 60, 57, 53, 48], [38, 45, 50, 53, 57, 53, 50, 45], [40, 47, 52, 56, 59, 56, 52, 47]], MEL = [[76, 0, 0, 72, 0, 71, 0, 0], [72, 0, 0, 69, 0, 0, 67, 0], [69, 0, 65, 0, 0, 64, 0, 0], [68, 0, 0, 0, 71, 0, 0, 0]];
    function note(m, t, v, d){ const o = ac.createOscillator(), o2 = ac.createOscillator(), g = ac.createGain(); o.type = "triangle"; o2.type = "sine"; o.frequency.value = N(m); o2.frequency.value = N(m)*2.003; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .012); g.gain.exponentialRampToValueAtTime(.0008, t + d); o.connect(g); const g2 = ac.createGain(); g2.gain.value = .25; o2.connect(g2); g2.connect(g); g.connect(pianoG); o.start(t); o2.start(t); o.stop(t + d + .1); o2.stop(t + d + .1); }
    let pi = 0, pNext = 0; function piano(on){ if(!ac) return; if(on && !pianoT){ pNext = ac.currentTime + .2; pianoT = setInterval(() => { while(pNext < ac.currentTime + .6){ const bar = (pi >> 3) % 4, k = pi & 7; note(PAT[bar][k], pNext, k === 0 ? .2 : .11, 3.2); if(MEL[bar][k]) note(MEL[bar][k], pNext, .17, 4.2); pi++; pNext += .46; } }, 200); } if(!on && pianoT){ clearInterval(pianoT); pianoT = null; pianoG.gain.setTargetAtTime(0, ac.currentTime, .5); } }
    const pianoVol = v => { if(pianoG) pianoG.gain.setTargetAtTime(v, ac.currentTime, .4); };
    /* l'harmonica de verre : des sons tenus, très doux, un motif lent et original */
    let verreT = null, vi = 0, vNext = 0; const VER = [69, 72, 76, 74, 72, 67, 69, 64, 65, 69, 72, 71, 69, 64, 62, 64];
    function verre(on){ if(!ac) return; if(on && !verreT){ vNext = ac.currentTime + .2; verreT = setInterval(() => { if(!ok()) return; while(vNext < ac.currentTime + .8){ const m = VER[vi % VER.length], t = vNext; for(const [mm, v] of [[m, .07], [m - 12, .035], [m + 7, .02]]){ const o = ac.createOscillator(), g = ac.createGain(), lf = ac.createOscillator(), lg = ac.createGain(); o.type = "sine"; o.frequency.value = N(mm + 12); lf.frequency.value = 5.2; lg.gain.value = 3; lf.connect(lg); lg.connect(o.frequency); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .5); g.gain.linearRampToValueAtTime(v*.7, t + 1.4); g.gain.exponentialRampToValueAtTime(.0008, t + 2.6); o.connect(g); g.connect(out); o.start(t); lf.start(t); o.stop(t + 2.8); lf.stop(t + 2.8); } vi++; vNext += 1.25; } }, 300); } if(!on && verreT){ clearInterval(verreT); verreT = null; } }
    const oiseau = () => { if(!ok()) return; const t = ac.currentTime, f0 = 2200 + Math.random()*1400; for(let i = 0; i < 2 + ((Math.random()*3) | 0); i++){ const o = ac.createOscillator(), g = ac.createGain(), tt = t + i*.11; o.type = "sine"; o.frequency.setValueAtTime(f0, tt); o.frequency.exponentialRampToValueAtTime(f0*(1.2 + Math.random()*.5), tt + .07); g.gain.setValueAtTime(0, tt); g.gain.linearRampToValueAtTime(.035, tt + .01); g.gain.exponentialRampToValueAtTime(.001, tt + .09); o.connect(g); g.connect(out); o.start(tt); o.stop(tt + .1); } };
    const gong = () => { [110, 164.8, 220, 277].forEach((f, i) => tone(f, 3.2, .09 - i*.015, "sine")); };
    const cri = () => { if(!ok()) return; const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime; o.type = "triangle"; o.frequency.setValueAtTime(500 + Math.random()*200, t); o.frequency.exponentialRampToValueAtTime(900 + Math.random()*300, t + .25); o.frequency.exponentialRampToValueAtTime(420, t + .6); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.05, t + .05); g.gain.exponentialRampToValueAtTime(.001, t + .65); o.connect(g); g.connect(out); o.start(t); o.stop(t + .7); };
    const stop = () => { piano(false); verre(false); ambiance({}); };
    return {init, mute, ambiance, pas, tonnerre, toc, vitre, craque, clair, grave, or, piano, pianoVol, verre, oiseau, gong, cri, tone, stop, resume:() => { if(ac && ac.state === "suspended") ac.resume(); }};
  })();

  /* ================================================================ L'INTERFACE */
  function build(){
    root = document.createElement("div"); root.id = "mir"; root.className = "mir";
    root.innerHTML = `<canvas class="mir-3d" aria-label="La scène du jeu"></canvas><canvas class="mir-ov" aria-hidden="true"></canvas><div class="mir-2d"><canvas width="160" height="100" aria-hidden="true"></canvas></div><div class="mir-fade on"></div>
      <div class="mir-top"><button type="button" class="mir-b" data-m="menu" aria-label="Menu">☰</button><span class="mir-lieu" aria-live="polite"></span><button type="button" class="mir-b" data-m="carnet" aria-label="Le corpus">✎</button></div>
      <p class="mir-cap" aria-live="polite"></p><div class="mir-stick" aria-hidden="true"><i></i></div>
      <div class="mir-ctl"><button type="button" class="mir-act" hidden></button><button type="button" class="mir-walk" aria-label="Avancer">▲</button></div>
      <div class="mir-dlg" hidden><p class="mir-who"></p><p class="mir-txt"></p><div class="mir-in"></div><span class="mir-more" aria-hidden="true">▾</span></div>
      <div class="mir-sheet" hidden></div>`;
    document.body.appendChild(root); document.documentElement.classList.add("mir-lock");
    c3 = $(".mir-3d"); c2 = $(".mir-2d canvas"); x2 = c2.getContext("2d");
    eng = window.MiroirR3D(c3, $(".mir-ov"));
    eng.onTarget = lab => { const b = $(".mir-act"); if(lab && !busy){ b.textContent = lab; b.hidden = false; } else b.hidden = true; };
    eng.onAct = t => { if(busy) return; const f = t.sprite ? t.sprite.act : (eng.level().wallAct[t.wall] || {}).act; if(f) run(() => f(t)); };
    eng.onStep = () => Snd.pas();
    eng.onStick = (on, x, y, dx, dy) => { const s = $(".mir-stick"); s.classList.toggle("on", !!on && dx != null); if(on){ s.style.left = x + "px"; s.style.top = y + "px"; if(dx != null){ const m = Math.hypot(dx, dy), k = m > 34 ? 34/m : 1; s.firstChild.style.transform = `translate(${dx*k}px,${dy*k}px)`; } } };
    $(".mir-act").onclick = () => { if(eng.target) eng.onAct(eng.target); };
    const wk = $(".mir-walk"); const wOn = e => { e.preventDefault(); eng.auto = true; wk.classList.add("on"); }, wOff = () => { eng.auto = false; wk.classList.remove("on"); };
    wk.addEventListener("pointerdown", wOn); wk.addEventListener("pointerup", wOff); wk.addEventListener("pointerleave", wOff); wk.addEventListener("pointercancel", wOff);
    root.querySelector("[data-m=menu]").onclick = () => menu(); root.querySelector("[data-m=carnet]").onclick = () => { if($(".mir-sheet").hidden) window.MiroirSaga.corpus(kit); };
    root.addEventListener("pointerdown", () => { Snd.init(); Snd.resume(); }, {capture:true});
    addEventListener("keydown", onKey); eng.start(); loop2();
  }
  const onKey = e => { if(!alive) return; if(e.key === "Escape"){ const sh = $(".mir-sheet"); if(!sh.hidden) closeSheet(); else menu(); } else if((e.key === "Enter" || e.key === " ") && dlgNext && !e.target.closest("input,textarea,button")){ e.preventDefault(); dlgNext(); } };
  const setLieu = s => { lieu = s; $(".mir-lieu").textContent = s; };
  const cap = (txt, ms) => { const c = $(".mir-cap"); c.textContent = nb(txt || ""); c.classList.toggle("on", !!txt); clearTimeout(capT); if(txt && ms !== 0) capT = setTimeout(() => c.classList.remove("on"), ms || 6500); };
  const fade = async (on, ms) => { const f = $(".mir-fade"); f.style.transitionDuration = (ms || 700) + "ms"; f.classList.toggle("on", on); await wait(ms || 700); };
  const flash = async c => { const f = $(".mir-fade"); f.style.transitionDuration = "0ms"; f.style.background = c || "#cfd9ea"; f.classList.add("on"); await wait(90); f.style.transitionDuration = "500ms"; f.classList.remove("on"); await wait(500); f.style.background = ""; };
  function setMode(m){ mode = m; root.dataset.mode = m; eng.pause = m !== "3d"; eng.clearKeys(); $(".mir-act").hidden = true; if(m === "3d") setTimeout(() => eng.resize(), 0); }
  function loop2(){ raf2 = requestAnimationFrame(loop2); if(mode !== "2d" || !paint) return; const now = performance.now()/1000; if(now - t2 < .075) return; t2 = now; x2.imageSmoothingEnabled = false; paint(x2, now, popt); }
  const scene2 = (fn, o) => { paint = fn; popt = o || {}; setMode("2d"); };
  const visage = (x, t, o) => { if(!visage.c){ visage.c = PX.cv(80, 50); } PX.visage(visage.c.getContext("2d"), t, o); x.drawImage(visage.c, 0, 0, 160, 100); };
  async function run(fn){ if(busy) return; busy = true; eng.pause = true; eng.clearKeys(); $(".mir-act").hidden = true; try{ await fn(); }catch(e){ console.error(e); } busy = false; if(alive){ eng.target = null; if(mode === "3d" && $(".mir-sheet").hidden) eng.pause = false; } }

  /* ---------- les dialogues ---------- */
  let dlgNext = null;
  function say(who, txt){ return new Promise(res => { const d = $(".mir-dlg"), w = $(".mir-who"), p = $(".mir-txt"); d.hidden = false; d.dataset.who = who ? (who === "Jung" ? "jung" : who === "L'ombre" ? "ombre" : "autre") : "nar"; w.textContent = who || ""; w.hidden = !who; $(".mir-in").innerHTML = ""; popt.parle = who === "Jung";
      txt = nb(txt); let i = 0, done = false; p.textContent = ""; const iv = setInterval(() => { i += 2; p.textContent = txt.slice(0, i); if(i >= txt.length){ clearInterval(iv); done = true; popt.parle = false; d.classList.add("fin"); } }, 26);
      d.classList.remove("fin"); const next = () => { if(!done){ clearInterval(iv); p.textContent = txt; done = true; popt.parle = false; d.classList.add("fin"); return; } d.onclick = null; dlgNext = null; res(); }; d.onclick = next; dlgNext = next; }); }
  const endDlg = () => { $(".mir-dlg").hidden = true; dlgNext = null; };
  function ask(who, txt, o){ o = o || {}; return new Promise(res => { const d = $(".mir-dlg"), w = $(".mir-who"), p = $(".mir-txt"), box = $(".mir-in"); d.hidden = false; d.onclick = null; dlgNext = null; d.classList.remove("fin"); d.dataset.who = who === "Jung" ? "jung" : who === "L'ombre" ? "ombre" : who ? "autre" : "nar"; w.textContent = who || ""; w.hidden = !who; p.textContent = nb(txt);
      box.innerHTML = `${o.long ? `<textarea rows="4" maxlength="${o.max || 600}" placeholder="${esc(o.ph || "")}"></textarea>` : `<input type="text" maxlength="${o.max || 40}" placeholder="${esc(o.ph || "")}" autocomplete="off" autocapitalize="${o.cap || "sentences"}">`}<div class="mir-row"><button type="button" class="mir-btn" data-ok>${esc(o.ok || "Répondre")}</button>${o.opt === false ? "" : `<button type="button" class="mir-btn ghost" data-no>${esc(o.no || "Passer")}</button>`}</div>`;
      const f = box.querySelector("input,textarea"), t0 = performance.now(); let t1 = 0; f.addEventListener("input", () => { if(!t1) t1 = performance.now() - t0; });
      const fin = v => { box.innerHTML = ""; res({v:(v || "").trim(), ms:performance.now() - t0, first:t1}); };
      box.querySelector("[data-ok]").onclick = () => fin(f.value); const no = box.querySelector("[data-no]"); if(no) no.onclick = () => fin("");
      if(!o.long) f.addEventListener("keydown", e => { if(e.key === "Enter"){ e.preventDefault(); fin(f.value); } }); if(o.focus !== false) setTimeout(() => { try{ f.focus({preventScroll:true}); }catch(e){} }, 60); }); }
  function choose(who, txt, opts){ return new Promise(res => { const d = $(".mir-dlg"), w = $(".mir-who"), p = $(".mir-txt"), box = $(".mir-in"); d.hidden = false; d.onclick = null; dlgNext = null; d.classList.remove("fin"); d.dataset.who = who === "Jung" ? "jung" : who ? "autre" : "nar"; w.textContent = who || ""; w.hidden = !who; p.textContent = nb(txt || "");
      box.innerHTML = `<div class="mir-col">${opts.map((t, i) => `<button type="button" class="mir-btn" data-i="${i}">${esc(nb(t))}</button>`).join("")}</div>`; const t0 = performance.now(); box.querySelectorAll("button").forEach(b => b.onclick = e => { e.stopPropagation(); if(performance.now() - t0 < 380) return; box.innerHTML = ""; res(+b.dataset.i); }); }); }
  const J = t => say("Jung", t), Nr = t => say("", t);

  /* ---------- le carnet ---------- */
  const PAGES = {
    maison:["Le rêve de la maison", "En 1909, Jung rêve d'une maison qu'il ne connaît pas et qui est pourtant la sienne. Plus il descend, plus les étages sont anciens. Il y lit le plan de la psyché : sous la conscience, des couches de plus en plus vieilles.", "p1l1"],
    persona:["La persona", "Tu as mis un masque pour être accueilli, et c'est le masque qu'on a aimé. Jung appelle persona ce visage qu'on montre au monde. Il est utile. Le danger commence le jour où on ne sait plus l'enlever.", "p2l2"],
    complexe:["Le complexe", "Tu as hésité sur un mot. Jung chronométrait ces hésitations : un mot qui accroche touche un nœud de souvenirs et d'émotions, qu'il nomme complexe. Tout le monde en a. Selon lui, ce n'est pas nous qui les avons, ce sont eux qui nous ont.", "p4l2"],
    ombre:["L'ombre", "Tu as fui, elle t'a rattrapé. Tu t'es retourné, elle s'est arrêtée. L'ombre est ce qu'on refuse de voir en soi. Ce qui agace tant chez les autres lui appartient souvent : on appelle cela la projection. La regarder ne la fait pas disparaître, mais elle rend ce qu'elle gardait.", "p5l1"],
    archetypes:["L'inconscient collectif", "Personne n'a creusé la grotte. Sous l'histoire de chacun, Jung suppose un fond commun à tous, peuplé de figures qui reviennent dans les mythes, les contes et les rêves : la mère, le vieux sage, le fripon. Les lames du tarot en sont une galerie. L'idée reste discutée : hérité, ou transmis par la culture ?", "p8l1"],
    synchro:["La synchronicité", "Une coïncidence qui te parle. Jung nomme synchronicité la rencontre de deux événements sans lien de cause, reliés seulement par le sens qu'on y trouve. Le hasard suffit à l'expliquer et rien ne prouve davantage. Il reste une question utile : qu'est-ce que cela me fait remarquer ?", "p10l1"],
    oeuvre:["L'œuvre", "La maison a changé trois fois de couleur : noire, blanche, rouge. Ce sont les trois temps du Grand Œuvre des alchimistes. Jung y a lu l'image d'un travail intérieur : traverser le noir, éclaircir, puis réunir.", null],
    soi:["Le Soi", "Tu as dessiné un cercle. Jung en a dessiné des dizaines : le mandala, image d'un centre qui tient ensemble le masque et l'ombre. Il appelle ce chemin l'individuation : devenir entier plutôt que parfait.", "p9l1"]
  };
  async function page(id){ if(st.carnet.includes(id)) return; st.carnet.push(id); save(); Snd.clair(); const P = PAGES[id]; await sheet(`<p class="mir-eye">Une page s'ajoute au carnet</p><h2>${esc(P[0])}</h2><p class="mir-page">${esc(nb(P[1]))}</p><div class="mir-row"><button type="button" class="mir-btn" data-x>Continuer</button></div>`); }
  function sheet(html, cls){ return new Promise(res => { const s = $(".mir-sheet"); s.className = "mir-sheet " + (cls || ""); s.innerHTML = `<div class="mir-sheet-in">${html}</div>`; s.hidden = false; eng.pause = true; eng.clearKeys(); sheet.close = v => { s.hidden = true; s.innerHTML = ""; sheet.close = null; eng.pause = busy || mode !== "3d"; res(v); };
      s.querySelectorAll("[data-x]").forEach(b => b.onclick = () => sheet.close(b.dataset.x || true)); const f = s.querySelector("button"); if(f) try{ f.focus({preventScroll:true}); }catch(e){} }); }
  const closeSheet = () => { if(sheet.close) sheet.close(null); };
  async function carnet(){ if(!$(".mir-sheet").hidden) return; const lame = st.lame ? `<p class="mir-note">Ta lame : <b>${esc(st.lame.nom)}</b></p>` : "";
    const v = await sheet(`<p class="mir-eye">Le carnet</p><h2>${st.carnet.length ? "Ce que tu as traversé" : "Il est encore vide"}</h2>${st.carnet.length ? "" : `<p class="mir-page">Une page s'écrit chaque fois que tu traverses quelque chose.</p>`}
      <div class="mir-pages">${st.carnet.map(id => `<article><h3>${esc(PAGES[id][0])}</h3><p>${esc(nb(PAGES[id][1]))}</p>${PAGES[id][2] ? `<button type="button" class="mir-lnk" data-x="lec:${PAGES[id][2]}">Lire la leçon</button>` : ""}</article>`).join("")}</div>${lame}<div class="mir-row"><button type="button" class="mir-btn" data-x>Fermer</button></div>`, "carnet");
    if(typeof v === "string" && v.startsWith("lec:")){ close(); try{ window.ArcanesPsyche.go(v); }catch(e){} } }
  async function menu(){ if(!$(".mir-sheet").hidden) return;
    const v = await sheet(`<p class="mir-eye">Le Miroir</p><h2>Pause</h2><div class="mir-col"><button type="button" class="mir-btn" data-x="go">Reprendre</button><button type="button" class="mir-btn ghost" data-x="son">${st.son ? "Couper le son" : "Remettre le son"}</button><button type="button" class="mir-btn ghost" data-x="corpus">Le corpus (${st.saga.volets.length} volets sur 24)</button>${lieu !== "La nuit" ? `<button type="button" class="mir-btn ghost" data-x="hub">Revenir dans la nuit</button>` : ""}<button type="button" class="mir-btn ghost" data-x="aide">Comment jouer</button><button type="button" class="mir-btn ghost" data-x="zero">Recommencer depuis le début</button><button type="button" class="mir-btn ghost" data-x="quit">Quitter le jeu</button></div><p class="mir-note">La partie est enregistrée sur cet appareil.</p>`);
    if(v === "son"){ Snd.init(); Snd.mute(!st.son); } else  if(v === "aide") await aide(); else if(v === "quit") close(); else if(v === "corpus") await window.MiroirSaga.corpus(kit); else if(v === "hub"){ endDlg(); busy = false; if(st.niv !== "VII") st.niv = "hub"; save(); await fade(true, 500); window.MiroirSaga.hub(kit); }
    else if(v === "zero"){ const c = await sheet(`<h2>Tout effacer ?</h2><p class="mir-page">Ta partie, ton rêve et ton carnet seront effacés de cet appareil.</p><div class="mir-row"><button type="button" class="mir-btn" data-x="oui">Effacer et recommencer</button><button type="button" class="mir-btn ghost" data-x>Annuler</button></div>`); if(c === "oui"){ const son = st.son; st = DEF(); st.son = son; save(); endDlg(); busy = false; start(); } } }
  const aide = () => sheet(`<p class="mir-eye">Comment jouer</p><h2>Marcher, regarder, toucher</h2><ul class="mir-aide"><li><b>Au doigt ou à la souris :</b> pose le doigt et glisse vers le haut pour avancer, sur les côtés pour tourner. Le bouton ▲ avance tout seul tant que tu le tiens.</li><li><b>Au clavier :</b> les flèches, ou ZQSD. Espace pour agir.</li><li><b>Agir :</b> quand un bouton apparaît en bas, touche-le, ou touche la scène.</li><li><b>Le corpus</b> (✎) garde les volets que tu as ouverts.</li></ul><div class="mir-row"><button type="button" class="mir-btn" data-x>Compris</button></div>`);

  /* ================================================================ ACTE I */
  const stars = (n, seed) => { const r = PX.rng(seed || 9), a = []; for(let i = 0; i < n; i++){ const b = Math.pow(r(), 2.2); a.push([r()*Math.PI*2, Math.pow(r(), 1.4)*.98 + .01, .35 + b*.65, .6 + r()*2.4, r() > .88 ? 19 : r() > .7 ? 6 : 7]); } return a; };
  const LUEURS = ["Épidaure, il y a 2 400 ans. On dormait dans le temple pour guérir : le dieu venait en rêve.", "Paris, 1778. Mesmer assoit ses malades autour d'un baquet. Il croit soigner par un fluide. C'est autre chose qui agit.", "La Salpêtrière, 1885. Charcot montre l'hypnose en public. Dans la salle, un jeune médecin viennois prend des notes.", "Vienne, 1900. Freud allonge ses patients et les écoute. Sous la conscience, il y a quelqu'un."];
  function nuit(fin){
    PX.setTheme("nuit"); Snd.ambiance({vent:.16}); Snd.piano(true); setLieu("La nuit");
    const MX = 72, MY = 50, maison = fin ? {on:PX.miroirMaison(true), off:PX.miroirMaison(false)} : null; let vuDos = false, vuFace = false, hint = 0;
    const mir = {x:MX, y:MY, h:1.95, em:true, emK:.012, emL:.95, emMin:.5, range:2.6,
      tex:(E) => { const face = E.P.x < MX, d = Math.hypot(E.P.x - MX, E.P.y - MY); mir.wf = Math.max(.07, Math.abs(E.P.x - MX)/Math.max(.01, d)); if(d < 9){ if(face) vuFace = true; else vuDos = true; }
        if(fin) return face ? (st.fin === "ouvert" ? maison.on : maison.off) : (st.fin === "ouvert" ? maison.on : PX.miroirDos(E.time(), Math.max(-1, Math.min(1, (E.P.y - MY)*.5))));
        return face ? PX.miroirFace(E.time()) : PX.miroirDos(E.time(), Math.max(-1, Math.min(1, (E.P.y - MY)*.5))); },
      label:() => eng.P.x < MX ? (fin ? "Regarder le miroir" : "Entrer dans le miroir") : (fin && st.fin === "ouvert" ? "Regarder le miroir" : "L'ombre te regarde"),
      act:async () => { if(fin) return finale(vuDos && vuFace); if(eng.P.x >= MX){ await Nr("Elle a ta taille. Elle ne dit rien. De ce côté du miroir, il n'y a qu'elle."); endDlg(); return; } await entrer(); } };
    const sp = [mir]; if(!fin) [[24, 45.6], [37, 54.6], [50, 45.4], [61, 54]].forEach((p, i) => sp.push({x:p[0], y:p[1], h:1.25, z:.3, em:true, emK:.05, emL:.8, emMin:.3, tex:S.lueurs[i], lu:i}));
    eng.load({map:[" "], walls:{}, sprites:sp, sky:[3, .03, .36], stars:stars(520, 4), floor:"spark", floorC:2, dens:.045, lum:.34, far:26, speed:1.55, turn:1.7, a0:0,
      tick:(dt, E) => { const P = E.P; P.x = Math.max(3, Math.min(97, P.x)); P.y = Math.max(20, Math.min(80, P.y)); const d = Math.hypot(P.x - MX, P.y - MY); Snd.pianoVol(Math.max(.05, Math.min(.5, 2.2/(d*.16 + 1))));
        for(const s of sp) if(s.lu != null && !st.lueurs.includes(s.lu) && Math.hypot(P.x - s.x, P.y - s.y) < 4.2){ st.lueurs.push(s.lu); save(); Snd.clair(); cap(LUEURS[s.lu], 9500); }
        hint += dt; if(!fin && hint > 55 && d > 30){ hint = 20; cap("Le miroir est la lumière chaude, droit devant. Tu peux tenir ▲ pour marcher.", 6000); } } }, fin ? [MX - 7, MY] : [10, 50]);
    setMode("3d");
    if(fin) cap("La nuit, de nouveau. Le miroir est là.", 7000); else cap("Une lumière, très loin. Marche.", 8000);
  }
  async function entrer(){
    st.etape = "cabinet"; save(); Snd.pianoVol(.5); await fade(true, 900); Snd.ambiance({feu:.2}); scene2(visage, {}); setLieu("Le cabinet"); await fade(false, 1200); await wait(500);
    await J("Debout, debout."); await J("Allons."); endDlg(); await fade(true, 500); Snd.piano(false); await cabinet1();
  }
  const SYMS = () => (window.PSY_DATA && window.PSY_DATA.SYM) || [];
  const trouve = txt => { const t = (txt || "").toLowerCase(); for(const s of SYMS()) for(const k of s.k) if(t.includes(k)) return k; const m = t.match(/[a-zàâçéèêëîïôûùüÿœ]{5,}/g); return m ? m.sort((a, b) => b.length - a.length)[0] : ""; };
  async function cabinet1(){
    PX.setTheme("nuit"); const o = {couche:true}; scene2(PX.cabinet, o); setLieu("Le cabinet"); Snd.ambiance({feu:.22}); await fade(false, 900);
    await Nr("Tu ouvres les yeux. Un plafond, un feu qui craque. Tu es allongé sur un divan.");
    await J("Levez-vous. Ce divan, je le garde par politesse pour mon ancien maître."); await J("Chez moi, on ne s'allonge pas. On se regarde en face.");
    o.couche = false; await Nr("Tu t'assois dans le fauteuil. Il est encore tiède, comme si quelqu'un venait d'en partir.");
    if(!st.nom){ const r = await ask("Jung", "Comment dois-je vous appeler ?", {ph:"Ton prénom", max:24, cap:"words"}); st.nom = r.v.slice(0, 24); save(); }
    await J(st.nom ? `Bien, ${st.nom}. Je ne vous demanderai pas ce qui ne va pas. Tout le monde sait répondre à cela.` : "Sans nom, alors. Dans les rêves, cela arrive. Je ne vous demanderai pas ce qui ne va pas.");
    o.pluie = true; Snd.ambiance({feu:.2, pluie:.12});
    const r = await ask("Jung", "De quoi avez-vous rêvé ?", {long:true, ph:"Un rêve récent, ou un rêve ancien dont tu te souviens encore. Quelques lignes suffisent.", max:700, no:"Je ne m'en souviens pas"});
    st.reve = r.v; st.motReve = trouve(r.v); save();
    if(r.v){ try{ const A = window.PSY_APP && window.PSY_APP._; if(A){ A.st().reves.unshift({id:"mir" + Date.now(), t:Date.now(), titre:"Le rêve raconté à Jung", txt:r.v, emo:"", sym:{}}); A.save(); } }catch(e){}
      await J("Hm."); if(st.motReve) await J(`Vous avez dit : « ${st.motReve} ». Gardez ce mot. Il reviendra.`); else await J("Gardez-le tel quel. Ne l'arrangez pas."); }
    else { await J("Vous ne vous en souvenez pas. Peu importe : lui se souvient de vous."); await J("Nous irons le chercher."); }
    endDlg(); await wait(500); Snd.tonnerre(); o.silhouette = true; for(const e of [1, .2, .9, .6, .3, 0]){ o.eclair = e; await wait(110); } await wait(300);
    await Nr("Un éclair. Au fond du jardin, entre les arbres, quelqu'un est debout sous la pluie.");
    Snd.tonnerre(); for(const e of [1, .7, .3, 0]){ o.eclair = e; await wait(100); } o.silhouette = false;
    await J("Vous l'avez vue aussi. Bien."); await J("Elle vient toujours quand on parle des rêves. Ne la cherchez pas dehors."); await J("Regardez plutôt la vitre.");
    o.vitre = "miroir"; Snd.clair(); await Nr("La vitre ne montre plus le jardin. Elle montre la pièce, et toi dedans. Derrière ton reflet, il y a des arbres.");
    await choose("", "", ["Toucher la vitre"]); endDlg(); st.etape = "foret"; save(); await fade(true, 1000); foret();
  }
  function foret(){
    PX.setTheme("nuit"); Snd.ambiance({vent:.14, pluie:.05}); setLieu("La forêt");
    const map = []; for(let y = 0; y < 23; y++){ let r = ""; for(let x = 0; x < 21; x++) r += (x === 0 || y === 0 || x === 20 || y === 22) ? "F" : (x >= 9 && x <= 11 && y >= 4 && y <= 6) ? (y === 6 ? (x === 10 ? "D" : "V") : "R") : "."; map.push(r); }
    const r = PX.rng(31), sp = []; for(let i = 0; i < 60; i++){ const x = 1.5 + r()*18, y = 1.5 + r()*20; if(Math.abs(x - 10.5) < 1.3 || (x > 7.6 && x < 13.4 && y > 2.6 && y < 8.2)) continue; sp.push({x, y, h:2.3 + r()*1.2, tex:S.arbre}); }
    eng.load({map, walls:{F:W.foret, R:W.rondin, D:W.rondinPorte, V:W.rondinFen}, sprites:sp, sky:[4, .03, .46], stars:stars(140, 8), floor:"earth", floorC:12, floorC2:13, dens:.15, lum:.58, far:18, speed:1.75, a0:-Math.PI/2, lights:[[10.5, 7.7, 3.4, .55], [9.5, 7.3, 2, .3], [11.5, 7.3, 2, .3]],
      wallAct:{D:{label:"Entrer dans la cabane", act:async () => { await fade(true, 800); st.etape = "hall"; save(); hall(true); }}} }, [10.5, 20.5]);
    setMode("3d"); fade(false, 1200); cap("Des arbres, la pluie. Au bout du sentier, une cabane pas plus grande qu'un abri de jardin.", 8000);
  }

  /* ================================================================ ACTE II : LA MAISON */
  const AILES = ["masques", "mots", "galerie", "grotte", "tour"], faites = () => AILES.filter(a => st.ailes[a]).length;
  const themeMaison = () => faites() >= 5 ? "rouge" : st.ailes.galerie ? "blanc" : "noir";
  function hall(first, from){
    PX.setTheme(themeMaison()); const n = faites(), fini = n >= 5; Snd.ambiance({pluie:n >= 2 && !fini ? .09 : .03, feu:fini ? .08 : 0}); setLieu("La maison");
    const map = ["PPPPP" + (fini ? "L" : "P") + "PPPPP", "P.........P", "P.........P", "1.........2", "P.........P", "P.........P", "3.........5", "P.........P", "P.........P", "PPPPP4PPPPP"];
    const door = (id, nom, go) => ({label:() => st.ailes[id] ? nom + " (déjà traversée)" : nom, act:async () => { if(st.ailes[id]){ await Nr("Tu y es déjà allé. La poignée ne tourne plus."); endDlg(); return; } await fade(true, 600); setTimeout(go, 0); }});
    const sp = [{x:5.5, y:4.5, h:.62, tex:S.table, range:1.7, label:() => st.lu1913 ? "Ouvrir le carnet" : "Regarder le carnet", act:async () => { if(st.lu1913){ endDlg(); return carnet(); } await carnet1913(); }}];
    if(n >= 2 && !st.ailes.galerie) sp.push({x:1.6, y:1.6, h:.95, tex:S.ombre, alpha:.8, spectre:true});
    const starts = {masques:[1.6, 3.5, 0], mots:[9.4, 3.5, Math.PI], galerie:[1.6, 6.5, 0], tour:[9.4, 6.5, Math.PI], grotte:[5.5, 7.6, -Math.PI/2]}, s0 = from && starts[from];
    eng.load({map, walls:{P:W.papier, 1:W.porte, 2:W.porte, 3:W.porte, 4:W.porte, 5:W.porte, L:W.porteLum}, sprites:sp, ceil:14, floor:"planks", floorC:15, floorC2:14, dens:.13, lum:.74, far:14, speed:1.9, a0:s0 ? s0[2] : -Math.PI/2, lights:[[5.5, 4.4, 4.2, .5]].concat(fini ? [[5.5, 1.2, 3.2, .6]] : []),
      wallAct:{1:door("masques", "La porte aux masques", masques), 2:door("mots", "La porte du couloir", mots), 3:door("galerie", "La porte de la galerie", galerie), 5:door("tour", "La porte de la tour", tour), 4:door("grotte", "Un escalier qui descend", grotte),
        L:{label:"Une porte que tu n'avais pas vue", act:async () => { await fade(true, 900); st.etape = "final"; save(); cabinet3(); }}},
      tick:(dt, E) => { for(const s of sp) if(s.spectre && !s.off && Math.hypot(E.P.x - s.x, E.P.y - s.y) < 4.4){ s.off = true; Snd.grave(); cap("Il y avait quelqu'un dans l'angle. Il n'y a plus personne.", 5000); } } }, s0 ? [s0[0], s0[1]] : [5.5, 8.3]);
    setMode("3d"); fade(false, 900);
    if(first) cap("Dedans, c'est immense. La cabane tenait en trois pas ; cette salle en fait dix.", 8000);
    else if(fini) cap("La maison a rougi. Au fond de la salle, une porte est éclairée par en dessous.", 9000);
    else if(from === "galerie") cap("La maison a pâli, comme sous la lune. On y voit plus loin.", 7000);
    else if(n) cap(`${n} porte${n > 1 ? "s" : ""} sur cinq.`, 4000);
  }
  async function carnet1913(){
    await Nr("Sur la table, une lampe et un carnet ouvert. L'encre est sèche depuis longtemps. Tu lis.");
    await Nr(st.reve ? `« ${st.reve.length > 260 ? st.reve.slice(0, 260).replace(/\s+\S*$/, "") + "…" : st.reve} »` : "« Je ne me souviens pas de mon rêve. Je sais seulement qu'il y avait une maison. »");
    await Nr("C'est ton rêve, mot pour mot. C'est ton écriture. En haut de la page, une date : 12 décembre 1913.");
    await Nr("Cinq portes autour de toi. Aucune ne mène dehors."); endDlg(); st.lu1913 = true; save(); await page("maison");
  }
  const retour = async id => { st.ailes[id] = true; save(); endDlg(); await fade(true, 700); hall(false, id); };

  /* ---------- l'aile des masques : la persona ---------- */
  function masques(){
    PX.setTheme(themeMaison()); setLieu("Les masques"); let porte = null, parle = false, fait = false;
    const NOMS = ["le masque qui sourit", "le masque sévère", "le masque lisse"], COL = [9, 11, 8];
    const REP = [["Ah, vous voilà ! Toujours de bonne humeur. C'est ce que j'aime chez vous.", "Avec vous, au moins, on ne s'ennuie pas. Ne changez rien."], ["Bonsoir. Tout est en ordre, comme vous l'exigez.", "On peut compter sur vous : vous ne faiblissez jamais. Ne changez rien."], ["Vous, au moins, vous ne dérangez personne. On ne sait jamais ce que vous pensez.", "C'est reposant. Ne changez rien."]];
    const sp = [0, 1, 2].map(i => ({x:2.5 + i*2, y:3.5, h:.9, tex:S.masques[i], range:1.5, label:"Regarder " + NOMS[i], act:async () => { if(porte != null || fait){ endDlg(); return; } await Nr(i === 0 ? "Un masque qui sourit. Il sourit même quand on le retourne." : i === 1 ? "Un masque sévère, lourd, froid dans la main." : "Un masque lisse. Aucune expression : on peut tout y lire.");
      const c = await choose("", "", ["Le mettre", "Le reposer"]); endDlg(); if(c === 0){ porte = i; sp.forEach((s, k) => { if(k === i) s.off = true; if(k < 3) s.noAct = true; }); Snd.grave(); cap("Le monde rétrécit à deux trous. Quelqu'un t'attend au fond de la pièce.", 6000); } }}));
    sp.push({x:5.5, y:1.4, h:.95, tex:S.habitant, range:1.9, label:"Parler à l'homme assis", act:async () => { if(fait){ await say("L'homme assis", "Tiens. Je ne vous avais pas reconnu."); endDlg(); return; } if(porte == null){ await Nr("Il regarde au-dessus de ton épaule, comme si tu n'étais pas là. Sans visage à lui montrer, tu n'existes pas pour lui."); endDlg(); return; }
      await say("L'homme assis", REP[porte][0]); await say("L'homme assis", REP[porte][1]); await Nr("Tu veux répondre autre chose. C'est le masque qui répond à ta place."); endDlg(); parle = true; }});
    sp.push({x:9.5, y:1.45, h:.95, tex:S.psyche, range:1.8, label:"Se regarder dans la glace", act:async () => { if(fait || porte == null){ await Nr("Une glace sur pied. Ton visage, sans rien."); endDlg(); return; } if(!parle){ await Nr("Le masque te va bien. Trop bien. Quelqu'un t'attend au fond de la pièce."); endDlg(); return; }
      await Nr("Dans la glace, le masque. Derrière les trous des yeux, quelqu'un cligne."); await Nr("Tu le reconnais. Le masque tombe tout seul."); porte = null; fait = true; Snd.or(); endDlg(); await page("persona"); cap("La porte s'est rouverte.", 5000); }});
    eng.load({map:["PPPPPPPPPPP", "P......P..P", "P......P..P", "P.........P", "P.........P", "PPPPPXPPPPP"], walls:{P:W.papier, X:W.porte}, sprites:sp, ceil:13, floor:"tiles", floorC:15, floorC2:14, dens:.2, lum:.55, far:12, speed:1.9, a0:-Math.PI/2, lights:[[5.5, 1.8, 3.2, .5], [9.4, 1.6, 2.4, .45]],
      wallAct:{X:{label:"La porte", act:async () => { if(fait) return retour("masques"); if(porte != null && parle){ await Nr("Tu tires sur le masque. Il ne vient pas. La porte ne s'ouvre pas : elle ne te reconnaît pas."); await Nr("Il faudrait que tu te voies."); } else if(porte != null) await Nr("Fermée. Quelqu'un t'attend au fond de la pièce."); else await Nr("Elle s'est refermée derrière toi. Sur des pieds de bois, trois masques."); endDlg(); }}},
      post:(buf, w, h) => { if(porte == null) return; const c = COL[porte], L = PX.LUT, B = PX.BAYER, ey = h*.44, rx = w*.2, ry = Math.min(h*.13, w*.17); for(let y = 0; y < h; y++) for(let x = 0; x < w; x++){ const ex = x < w/2 ? w*.27 : w*.73, q = ((x - ex)/rx)**2 + ((y - ey)/ry)**2; if(q < 1) continue; const v = q < 1.25 ? 1 : (3 + (y/h)*1.4 + B[(x & 3) | ((y & 3) << 2)]) | 0; buf[y*w + x] = L[c*8 + Math.min(6, v)]; } } }, [5.5, 4.4]);
    setMode("3d"); fade(false, 800); cap("Trois masques sur des pieds de bois. Au fond, un homme assis.", 7000);
  }

  /* ---------- le couloir des mots : le complexe ---------- */
  function mots(){
    PX.setTheme(themeMaison()); setLieu("Le couloir"); const POOL = ["tête", "eau", "argent", "enfant", "maison", "famille", "peur", "mentir", "porte", "dormir", "vieux", "aimer"], r = PX.rng(Date.now() & 65535), liste = []; while(liste.length < 3){ const m = POOL[(r()*POOL.length) | 0]; if(!liste.includes(m)) liste.push(m); }
    let k = 0, boucle = true, fait = false, asking = false, tours = 0; st.mots = [];
    const map = ["CKCCCKCCCKCCCKCCCKCCCKCCC", "C.......................E", "CCCKCCCKCCCKCCCKCCCKCCCKC"];
    const demande = async () => { asking = true; const m = liste[k]; const a = await ask("La voix de Jung", `« ${m.charAt(0).toUpperCase() + m.slice(1)}. »`, {ph:"Le premier mot qui vient", max:30, opt:false, ok:"Dire"}); st.mots.push({m, r:a.v, ms:a.v ? Math.round(a.ms) : 99999}); k++; endDlg();
      if(k >= 3){ const lent = st.mots.slice().sort((p, q) => q.ms - p.ms)[0], autres = st.mots.filter(x => x !== lent), moy = autres.reduce((s, x) => s + Math.min(x.ms, 20000), 0)/autres.length; st.lent = lent; save();
        await say("La voix de Jung", `Assez. Sur « ${lent.m} », vous avez mis ${lent.ms > 90000 ? "si longtemps que vous n'avez rien dit" : (lent.ms/1000).toFixed(1).replace(".", ",") + " secondes"}. Sur les autres, ${(moy/1000).toFixed(1).replace(".", ",")} en moyenne.`); await say("La voix de Jung", "Je ne vous demande pas pourquoi. Avancez : le couloir a une fin, maintenant."); endDlg(); boucle = false; Snd.craque(); }
      asking = false; };
    eng.load({map, walls:{C:W.couloir, K:W.couloirPorte, E:W.porte}, sprites:[], ceil:13, floor:"planks", floorC:14, floorC2:13, dens:.34, lum:.6, far:11, speed:1.95, a0:0,
      wallAct:{E:{label:() => st.lent ? `Une porte. Dessus, un mot : « ${st.lent.m} »` : "Une porte", act:async () => { if(fait) return; fait = true; await Nr(`La porte s'ouvre sur une pièce minuscule. Sur tous les murs, de ta main, le même mot : « ${st.lent.m} ».`); await Nr(st.lent.r ? `Et dessous, ce que tu as répondu : « ${st.lent.r} ».` : "Et dessous, rien. Un blanc, là où tu n'as pas trouvé de mot."); await Nr("Rien d'effrayant. Seulement un endroit où quelque chose accroche."); endDlg(); await page("complexe"); await retour("mots"); }}},
      tick:(dt, E) => { const P = E.P; if(boucle && P.x > 14){ P.x -= 8; tours++; if(!asking && !busy && k < 3) run(demande); } if(P.x < 1.4) P.x = 1.4; } }, [1.6, 1.5]);
    setMode("3d"); fade(false, 800);
    run(async () => { await say("La voix de Jung", "Marchez. Je vais dire un mot. Répondez par le premier qui vous vient, sans réfléchir."); await say("La voix de Jung", "Je compte les secondes."); endDlg(); await demande(); cap("Le couloir continue. Des portes de chaque côté, toutes pareilles.", 6000); });
  }

  /* ---------- la galerie : l'ombre ---------- */
  function galerie(){
    PX.setTheme(themeMaison()); setLieu("La galerie"); let etat = 0, regard = 0, prises = 0, fait = false; // 0 : pas encore là, 1 : elle suit, 2 : face à face
    const om = {x:1.3, y:2.5, h:1, tex:S.ombre, off:true, alpha:.94}, map = ["PQPQPQPQPQPQPQPQPQP", "P.................P", "P.................Y", "P.................P", "PQPQPQPQPQPQPQPQPQP"];
    const face = async () => { etat = 2; Snd.grave(); cap("", 0); await say("L'ombre", "Enfin."); await say("L'ombre", "Tu cours depuis longtemps.");
      const a = await ask("L'ombre", "Dis-moi ce qui t'agace le plus chez les autres.", {ph:"Un défaut qui te met hors de toi", max:80, no:"Ne rien dire"}); st.agace = a.v; save();
      if(a.v){ await say("L'ombre", `« ${a.v} ».`); await say("L'ombre", "Je connais. C'est moi qui le porte pour toi."); } else await say("L'ombre", "Tu ne veux pas le dire. Je le sais quand même.");
      await Nr("Elle ne te voulait aucun mal. Elle voulait que tu la regardes. Quelque chose brille dans sa poitrine : elle te le tend."); om.tex = S.ombreOr; om.em = true; om.alpha = 1; Snd.or(); await Nr("De l'or. Il était à toi."); endDlg(); fait = true; await page("ombre"); PX.setTheme("blanc"); cap("Au bout de la galerie, la porte s'est ouverte.", 6000); };
    eng.load({map, walls:{P:W.papier, Q:W.portrait, Y:W.porte}, sprites:[om], ceil:13, floor:"planks", floorC:15, floorC2:14, dens:.24, lum:.56, far:13, speed:1.85, a0:0,
      wallAct:{Y:{label:"La porte du fond", act:async () => { if(fait) return retour("galerie"); await Nr("Pas de poignée de ce côté. Derrière toi, le parquet craque."); endDlg(); }}},
      tick:(dt, E) => { if(fait || etat === 2 || busy) return; const P = E.P;
        if(etat === 0){ if(P.x > 5.5){ etat = 1; om.off = false; om.x = Math.max(1.3, P.x - 4.6); om.y = 2.5; Snd.craque(); cap("Le parquet craque derrière toi.", 3500); } return; }
        const vx = om.x - P.x, vy = om.y - P.y, d = Math.hypot(vx, vy); let da = Math.atan2(vy, vx) - P.a; da = Math.atan2(Math.sin(da), Math.cos(da)); const vue = Math.abs(da) < .56;
        if(vue){ regard += dt; E.dim = Math.max(.55, 1 - regard*.12); if(regard > .5) cap("Ne détourne pas les yeux.", 1200); if(regard > 3.3){ E.dim = 1; run(face); } }
        else { regard = Math.max(0, regard - dt*2); E.dim = 1; const v = 2.5*dt; om.x -= vx/d*v; om.y -= vy/d*v;
          if(d < .6){ prises++; etat = 0; om.off = true; regard = 0; Snd.grave(); flash("#000004"); P.x = 1.6; P.y = 2.5; P.a = 0; cap(prises >= 2 ? "Elle n'avance que lorsque tu lui tournes le dos." : "Le noir. Puis le début de la galerie, de nouveau.", 6500); } } } }, [1.6, 2.5]);
    setMode("3d"); fade(false, 800); cap("Une galerie de portraits. Tous ont le visage dans l'ombre.", 6000);
  }

  /* ---------- la grotte : l'inconscient collectif, les archétypes ---------- */
  const LAMES = ["Le Mat", "Le Bateleur", "La Papesse", "L'Impératrice", "L'Empereur", "Le Pape", "L'Amoureux", "Le Chariot", "La Justice", "L'Ermite", "La Roue de Fortune", "La Force", "Le Pendu", "L'Arcane sans nom", "Tempérance", "Le Diable", "La Maison Dieu", "L'Étoile", "La Lune", "Le Soleil", "Le Jugement", "Le Monde"];
  function grotte(){
    PX.setTheme(themeMaison()); setLieu("La grotte"); let menti = false, resolu = false; Snd.ambiance({vent:.05});
    const C = (m, tex, label, act) => ({mk:m, h:.9, z:.12, tex, em:true, emL:.74, emK:.1, emMin:.4, range:1.8, label, act});
    const defs = [C("B", S.cartes.bateleur, "Parler au Bateleur", async () => { if(!menti){ await say("Le Bateleur", "Bonsoir, bonsoir ! La sortie ? Derrière moi, naturellement."); menti = true; } else { await say("Le Bateleur", "J'ai menti. C'est mon métier : je déplace les choses pour qu'on les regarde."); await say("Le Bateleur", "Dans les contes, on m'appelle le fripon. Je suis plus vieux que les contes."); } endDlg(); }),
      C("I", S.cartes.imperatrice, "Parler à l'Impératrice", async () => { await say("L'Impératrice", "Rien de ce qui pousse ici n'est à toi seul."); await say("L'Impératrice", "La mère, le vieux sage, le fripon, l'enfant : on nous raconte partout, depuis toujours, sous d'autres noms."); endDlg(); }),
      C("M", S.cartes.mat, "Parler au Mat", async () => { if(st.lame){ await say("Le Mat", `${st.lame.nom}. Tu l'as déjà. Elle n'explique rien : elle te regarde.`); endDlg(); return; } await say("Le Mat", "Moi, je n'ai rien. C'est pour ça que je peux te donner quelque chose."); await choose("Le Mat", "Tire.", ["Tirer une lame"]); const n = (Math.random()*22) | 0; st.lame = {n, nom:LAMES[n]}; save(); Snd.or(); await say("Le Mat", `${LAMES[n]}. Garde-la. Elle n'explique rien : elle te regarde.`); endDlg(); }),
      C("E", S.cartes.ermite, "Parler à l'Ermite", async () => { if(resolu){ await say("L'Ermite", "Tu as répondu. Le chemin est derrière les crânes."); endDlg(); return; } await say("L'Ermite", "Une question, et j'éclaire le chemin."); const c = await choose("L'Ermite", "Qui a creusé cette grotte ?", ["Jung", "Moi", "Personne. Elle était là avant."]);
        if(c === 0) await say("L'Ermite", "Il l'a visitée. Il ne l'a pas creusée. Cherche encore."); else if(c === 1) await say("L'Ermite", "La maison est à toi, oui. Pas ce qu'il y a dessous. Cherche encore."); else { resolu = true; Snd.clair(); await say("L'Ermite", "Voilà. Elle était là avant toi, et avant lui."); } endDlg(); })];
    const lvl = {map:["RRRRRRRRRRRRR", "RR.B...RR.M.R", "R.......R...R", "R...........R", "R.....C.....R", "R...........R", "RR.I....R.E.R", "RRR.....RRRRR", "RRRRRRRRRRRRR"], walls:{R:W.roche}, sprites:[], ceil:13, floor:"earth", floorC:12, floorC2:13, dens:.2, lum:.66, far:13, speed:1.8, a0:-Math.PI/2, lights:[],
      init:(E, L) => { defs.forEach(d => { const p = L.mk[d.mk][0]; d.x = p[0]; d.y = p[1]; L.sprites.push(d); L.lights.push([p[0], p[1], 2.3, .45]); }); const c = L.mk.C[0]; L.sprites.push({x:c[0], y:c[1], h:.42, tex:S.cranes, range:1.8, label:"Regarder les crânes", act:async () => { await Nr("Des os très vieux, et deux crânes. Jung les a vus dans son rêve de 1909, sous la cave de sa maison.");
          if(resolu && st.lame){ await Nr("Derrière les crânes, des marches remontent."); endDlg(); await page("archetypes"); await retour("grotte"); } else { await Nr(resolu ? "Il te manque encore quelque chose. L'une des figures a les mains vides." : "Pas de sortie visible. Les figures qui luisent ont peut-être quelque chose à dire."); endDlg(); } }}); } };
    eng.load(lvl, [5.5, 7.4]); setMode("3d"); fade(false, 800); cap("Sous la maison, une grotte. Quatre figures luisent dans le noir.", 7000);
  }

  /* ---------- la tour : la synchronicité ---------- */
  const SIGNES = [["Capricorne", 120], ["Verseau", 219], ["Poissons", 320], ["Bélier", 420], ["Taureau", 520], ["Gémeaux", 621], ["Cancer", 722], ["Lion", 822], ["Vierge", 922], ["Balance", 1022], ["Scorpion", 1121], ["Sagittaire", 1221], ["Capricorne", 1231]];
  const theme = () => { try{ const a = JSON.parse(localStorage.getItem("arcanes.astro.v1")), t = a && a.themes && (a.themes.find(x => x.moi) || a.themes[0]); if(!t) return null; const k = t.m*100 + t.d; return {t, signe:SIGNES.find(s => k <= s[1])[0], date:new Date(t.y, t.m - 1, t.d)}; }catch(e){ return null; } };
  function coincidence(th){ const rv = (st.reve || "").toLowerCase(), now = new Date(), JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], norm = s => (s || "").toLowerCase().replace(/^(le |la |l')/, "");
    const m = ["maison", "miroir", "ombre", "porte", "nuit", "étoile", "escalier", "forêt", "arbre", "cabane", "masque", "grotte", "tour"].find(w => rv.includes(w)); if(m) return `Dans ton rêve, il y avait le mot « ${m} ». Tu l'as écrit avant d'entrer ici.`;
    if(st.lent && st.lent.m && rv.includes(st.lent.m)) return `Le mot sur lequel tu as hésité, « ${st.lent.m} », était déjà dans ton rêve.`;
    if(th && th.date.getDay() === now.getDay()) return `Tu es né un ${JOURS[now.getDay()]}. Nous sommes ${JOURS[now.getDay()]}.`;
    if(st.lame && st.lame.n && now.getDate() === st.lame.n) return `Nous sommes le ${now.getDate()}. Ta lame porte le numéro ${st.lame.n}.`;
    if(st.lame && st.nom && st.nom.length === st.lame.n) return `Ton prénom a ${st.nom.length} lettres. Ta lame porte le numéro ${st.lame.n}.`;
    if(st.lame && st.nom && norm(st.lame.nom)[0] === st.nom.toLowerCase()[0]) return `Ton prénom et ta lame, ${st.lame.nom}, commencent par la même lettre.`;
    if(th && th.t.d === now.getDate()) return `Tu es né un ${th.t.d}. Nous sommes le ${now.getDate()}.`; return null; }
  function tour(){
    PX.setTheme(themeMaison()); setLieu("La tour"); let ouvert = false; Snd.ambiance({vent:.1});
    const sc = {x:3.5, y:1.5, h:.16, z:.52, tex:S.scarabee, em:true, emL:.8, off:true};
    const lun = {x:3.5, y:2.6, h:.82, tex:S.lunette, range:1.7, label:"Regarder dans la lunette", act:async () => { if(!ouvert){ await Nr("Une lunette de cuivre, braquée vers le plafond. On frappe à la vitre."); endDlg(); return; }
      const th = theme(); await Nr("Tu colles l'œil à la lunette.");
      if(th) await Nr(`Le ciel du ${th.date.toLocaleDateString("fr-FR", {day:"numeric", month:"long", year:"numeric"})}. Le Soleil était en ${th.signe}. C'est ton ciel de naissance, celui que tu as confié à l'Astrologie.`); else await Nr("Un ciel sans date. Si tu enregistres ton thème dans l'Astrologie, la lunette montrera ton ciel de naissance.");
      await Nr("La maison cherche une coïncidence dans ce que tu lui as confié."); const c = coincidence(th); Snd.clair(); await Nr(c || "Elle n'en trouve aucune. C'est le cas le plus fréquent, et il faut le dire aussi.");
      await say("La voix de Jung", "Le hasard suffit à l'expliquer. Je ne vous demande pas d'y croire."); await say("La voix de Jung", "Je vous demande ce que cela vous fait remarquer."); endDlg(); await page("synchro"); await retour("tour"); }};
    eng.load({map:["OOOWOOO", "O.....O", "O.....O", "O.....O", "OOOOOOO"], walls:{O:W.tour, W:W.tourFen}, sprites:[lun, sc], ceil:12, floor:"tiles", floorC:11, floorC2:12, dens:.2, lum:.55, far:9, speed:1.8, a0:-Math.PI/2, lights:[[3.5, 1.4, 2.6, .4]],
      wallAct:{W:{label:() => ouvert ? "La fenêtre" : "On frappe à la vitre", act:async () => { if(ouvert){ await Nr("Dehors, la nuit que tu as traversée. Très loin, une lueur chaude."); endDlg(); return; }
        await say("La voix de Jung", "Une patiente me racontait son rêve : on lui offrait un scarabée d'or."); await say("La voix de Jung", "À ce moment, j'ai entendu frapper à la vitre, derrière moi."); Snd.vitre(); await wait(350); Snd.vitre(); await Nr("Toc. Toc.");
        await choose("", "", ["Ouvrir la fenêtre"]); sc.off = false; Snd.or(); await Nr("Un insecte entre et se pose devant toi. Vert et or : une cétoine, le scarabée de nos jardins.");
        await say("La voix de Jung", "Je l'ai attrapée et je la lui ai tendue : voici votre scarabée."); await say("La voix de Jung", "Rien ne relie le rêve et l'insecte. Sauf nous, qui étions là."); endDlg(); ouvert = true; cap("Au milieu de la pièce, une lunette.", 5000); }}} }, [3.5, 3.4]);
    setMode("3d"); fade(false, 800); cap("Une pièce ronde, tout en haut. Quelque chose cogne contre la vitre.", 6000); setTimeout(() => { if(alive && lieu === "La tour" && !ouvert) Snd.vitre(); }, 1800);
  }

  /* ================================================================ ACTE III */
  function mandala(){ return new Promise(res => { const s = $(".mir-sheet"); s.className = "mir-sheet mandala"; s.hidden = false; s.innerHTML = `<div class="mir-sheet-in"><p class="mir-eye">« Dessinez. Sans réfléchir. »</p><canvas width="320" height="320" class="mir-md" aria-label="Ta feuille : dessine avec le doigt ou la souris"></canvas><div class="mir-row"><button type="button" class="mir-btn" data-ok>C'est fini</button><button type="button" class="mir-btn ghost" data-cl>Effacer</button></div></div>`;
      const c = s.querySelector("canvas"), x = c.getContext("2d"); let n = 0, last = null; const clear = () => { x.fillStyle = "#f4efe2"; x.fillRect(0, 0, 320, 320); x.strokeStyle = "rgba(42,38,34,.12)"; x.lineWidth = 1; x.beginPath(); x.arc(160, 160, 150, 0, 7); x.stroke(); n = 0; }; clear();
      const pos = e => { const r = c.getBoundingClientRect(); return [(e.clientX - r.left)/r.width*320 - 160, (e.clientY - r.top)/r.height*320 - 160]; };
      const seg = (a, b) => { x.strokeStyle = "#1f2444"; x.lineWidth = 2.4; x.lineCap = "round"; for(let k = 0; k < 8; k++){ const an = k*Math.PI/4, cs = Math.cos(an), sn = Math.sin(an); for(const m of [1, -1]){ x.beginPath(); x.moveTo(160 + a[0]*cs - m*a[1]*sn, 160 + a[0]*sn + m*a[1]*cs); x.lineTo(160 + b[0]*cs - m*b[1]*sn, 160 + b[0]*sn + m*b[1]*cs); x.stroke(); } } n++; };
      c.onpointerdown = e => { e.preventDefault(); try{ c.setPointerCapture(e.pointerId); }catch(_){} last = pos(e); seg(last, [last[0] + .1, last[1]]); }; c.onpointermove = e => { if(!last) return; const p = pos(e); seg(last, p); last = p; }; c.onpointerup = c.onpointercancel = () => { last = null; };
      s.querySelector("[data-cl]").onclick = clear; s.querySelector("[data-ok]").onclick = () => { let url = ""; if(n > 2){ const k = PX.cv(96, 96); k.getContext("2d").drawImage(c, 0, 0, 96, 96); try{ url = k.toDataURL("image/png"); }catch(e){} } s.hidden = true; s.innerHTML = ""; res(url); }; }); }
  async function cabinet3(){
    PX.setTheme("nuit"); const o = {}; scene2(PX.cabinet, o); setLieu("Le cabinet"); Snd.ambiance({feu:.22}); await fade(false, 1000);
    await Nr("Tu pousses la porte. Le feu, le bureau, la pendule. Le cabinet.");
    await J("Vous voyez. Vous n'êtes jamais sorti d'ici."); await J("Ou bien c'est moi qui n'étais qu'une pièce de votre maison. Les deux se défendent.");
    await J("Le carnet de 1913, c'est vous qui l'avez écrit. Cette maison est la vôtre, et elle était là avant vous.");
    await J("Noire, blanche, rouge. Les alchimistes connaissaient ce chemin : ils croyaient chauffer du plomb."); endDlg(); await page("oeuvre");
    await J("Tenez, une feuille."); endDlg(); st.mandala = await mandala(); save();
    await J(st.mandala ? "Un cercle, et un centre. J'en ai dessiné des dizaines sans savoir pourquoi." : "Une feuille blanche. C'est un dessin aussi."); endDlg(); await page("soi");
    Snd.toc(); await wait(420); Snd.toc(); await wait(420); Snd.toc(); await Nr("On frappe. Trois coups. Pas à la porte du cabinet : à celle de la maison.");
    await J("Vous savez qui c'est."); await J("Je ne vous dirai pas quoi faire. C'est la seule règle de ce métier.");
    const c = await choose("", "Elle attend derrière la porte.", ["Ouvrir", "Laisser la porte fermée"]); st.fin = c === 0 ? "ouvert" : "ferme"; save();
    if(c === 0){ o.invite = true; Snd.grave(); await Nr("Tu ouvres. Elle entre sans bruit et s'assoit près du feu. Elle a ta taille."); if(st.agace) await Nr(`Tu repenses à ce que tu lui as dit : « ${st.agace} ». Ça pèse un peu moins.`); await J("Elle ne partira plus. Elle n'était jamais partie. Maintenant, au moins, elle a une chaise."); }
    else { await Nr("Tu ne bouges pas. Les coups s'arrêtent."); await J("C'est votre droit. Elle attendra : elle sait attendre."); await J("La porte, elle, reste où elle est."); }
    await J("Allez, maintenant. La nuit vous attend dehors."); endDlg(); st.etape = "epilogue"; save(); await fade(true, 1200); nuit(true); await fade(false, 1500);
  }
  async function finale(tour){
    if(st.fin === "ouvert"){ await Nr("Dans le miroir, la cabane entre les arbres. Une fenêtre est allumée."); await Nr(tour ? "Tu as fait le tour : c'est la même image des deux côtés. Il n'y a plus d'envers." : "Fais le tour si tu veux : c'est la même image des deux côtés. Il n'y a plus d'envers."); }
    else { await Nr("Dans le miroir, la cabane entre les arbres. La fenêtre est éteinte."); await Nr("De l'autre côté du miroir, elle attend toujours. Tu sais où est la porte."); }
    await say("La voix de Jung", "Debout, debout."); await say("La voix de Jung", "Allons."); endDlg(); st.etape = "fin"; st.finie = (st.finie || 0) + 1; st.saga.faits.VII = "jeu"; st.niv = "hub"; save(); await fade(true, 1400); setTimeout(() => window.MiroirSaga.apresMiroir(kit), 0);
  }
  async function fin(){
    Snd.piano(true); Snd.pianoVol(.4); setMode("2d"); paint = null; x2.fillStyle = "#0a0a14"; x2.fillRect(0, 0, 160, 100);
    const v = await sheet(`<p class="mir-eye">Le Miroir</p><h2>${st.fin === "ouvert" ? "Tu as ouvert la porte." : "Tu as laissé la porte fermée."}</h2><p class="mir-page">${st.fin === "ouvert" ? "L'ombre a une chaise près du feu. Rien n'est réglé : quelqu'un est seulement entré." : "L'ombre attend dehors. Rien n'est perdu : la porte est toujours là."}</p>${st.mandala ? `<img class="mir-mdi" src="${st.mandala}" alt="Ton mandala" width="96" height="96">` : ""}
      <p class="mir-note">${st.carnet.length} pages dans le carnet${st.lame ? ` · ta lame : ${esc(st.lame.nom)}` : ""}</p><div class="mir-col"><button type="button" class="mir-btn" data-x="carnet">Relire le carnet</button><button type="button" class="mir-btn ghost" data-x="zero">Rejouer depuis le début</button><button type="button" class="mir-btn ghost" data-x="quit">Revenir à Psyché</button></div><p class="mir-note">Ce jeu est une promenade, pas un soin. Jung y parle comme dans un rêve : ses répliques sont inventées.</p>`, "fin");
    if(v === "carnet"){ await carnet(); if(alive) return fin(); } else if(v === "zero"){ const son = st.son; st = DEF(); st.son = son; save(); start(); } else close();
  }

  /* ================================================================ OUVRIR, REPRENDRE, FERMER */
  async function start(){
    $(".mir-fade").classList.add("on"); endDlg(); cap("", 0); busy = false;
    if(st.niv !== "VII") return window.MiroirSaga.start(kit);
    const e = st.etape;
    if(e === "nuit" || e === "fin"){ st.niv = "hub"; save(); return window.MiroirSaga.start(kit); }
    else if(e === "cabinet"){ scene2(visage, {}); await run(cabinet1); }
    else if(e === "foret") foret(); else if(e === "hall") hall(false);
    else if(e === "final") run(cabinet3); else if(e === "epilogue"){ nuit(true); await fade(false, 1200); }
  }
  async function open(opt){
    if(alive) return; load(); alive = true; build();
    if(opt && opt.corpus){ PX.setTheme("nuit"); setMode("2d"); x2.fillStyle = "#0a0a14"; x2.fillRect(0, 0, 160, 100); await window.MiroirSaga.corpus(kit); return close(); } PX.setTheme("nuit"); setMode("2d"); x2.fillStyle = "#0a0a14"; x2.fillRect(0, 0, 160, 100);
    const neuf = st.etape === "nuit" && !st.nom && !Object.keys(st.saga.faits).length, tout = st.saga.faits.E === true;
    const v = await sheet(`<p class="mir-eye">Psyché · le jeu</p><h1>Le Miroir</h1><p class="mir-page">${neuf ? "Une nuit, et un miroir très loin. Entre toi et lui, des lueurs : vingt-cinq siècles de rêves, de fluides et de sommeils. Sept niveaux, en plusieurs fois si tu veux." : tout ? "Tu es allé au bout. Le ciel est plein. Tu peux t'y promener, relire le corpus ou recommencer." : "Ta nuit t'attend où tu l'as laissée."}</p>
      <div class="mir-col"><button type="button" class="mir-btn" data-x="go">${neuf ? "Commencer" : tout ? "Retourner dans la nuit" : "Reprendre"}</button>${st.saga.volets.length ? `<button type="button" class="mir-btn ghost" data-x="corpus">Le corpus (${st.saga.volets.length} volets sur 24)</button>` : ""}<button type="button" class="mir-btn ghost" data-x="aide">Comment jouer</button><button type="button" class="mir-btn ghost" data-x="quit">Plus tard</button></div>
      <p class="mir-note">Avec le son, c'est mieux. Ce que tu écris reste sur cet appareil. C'est un jeu, pas un soin : Jung y parle comme dans un rêve, ses répliques sont inventées.</p>`, "titre");
    if(!alive) return; if(v === "quit" || v == null) return close(); if(v === "aide") await aide(); if(v === "corpus") await window.MiroirSaga.corpus(kit); Snd.init(); Snd.resume(); start();
  }
  function close(){ if(!alive) return; alive = false; Snd.stop(); cancelAnimationFrame(raf2); removeEventListener("keydown", onKey); try{ eng.stop(); }catch(e){} clearTimeout(capT); if(root) root.remove(); root = null; document.documentElement.classList.remove("mir-lock"); PX.setTheme("nuit"); busy = false; paint = null;
    try{ if(window.PSY_APP && window.PSY_APP.active()) window.PSY_APP.view("jour"); }catch(e){} }
  /* la trousse que les niveaux de la saga utilisent */
  const kit = {PX, W, S, Snd, say, ask, choose, J, Nr, endDlg, scene2, visage, setMode, fade, flash, cap, setLieu, sheet, closeSheet, run, wait, stars, esc, nb, save, page, carnet, entrer, nuitMiroir:nuit, close,
    get eng(){ return eng; }, get st(){ return st; }, get alive(){ return alive; }, get busy(){ return busy; }, get lieu(){ return lieu; }, get popt(){ return popt; }, demarrer:() => start(), $:s => $(s), resetMiroir:() => { const g = DEF(); for(const k of ["etape", "reve", "motReve", "mots", "lent", "agace", "lame", "ailes", "fin", "lu1913", "mandala"]) st[k] = g[k]; st.carnet = st.carnet.filter(id => !PAGES[id]); save(); }, PAGES};
  return {open, close, state:() => st, kit, _dbg:{niv:(n, faits, patch) => { Object.assign(st, patch || {}); st.niv = n; Object.assign(st.saga.faits, faits || {}); save(); endDlg(); busy = false; start(); }, go:(e, patch) => { st.niv = "VII"; Object.assign(st, patch || {}); st.etape = e; save(); start(); }, fn:{nuit, foret, hall, masques, mots, galerie, grotte, tour, cabinet3, fin, cabinet1}, eng:() => eng, set:o => Object.assign(st, o)}};
})();
