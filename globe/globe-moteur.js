/* ===== Arcanes · Le globe des traditions : le moteur et l'interface =====
   Un globe dessiné comme une carte ancienne (parchemin, côtes à l'encre, roses des vents, noms latins).
   On tourne, on zoome : les sceaux se regroupent de loin et se séparent de près. Toucher une tradition
   ouvre sa fiche et trace son voyage sur le globe. Chargé à la demande par globe.js. */
(() => {
  const D = window.GLOBE_DATA, T = window.GLOBE_TERRE, d3 = window.d3; if(!D || !T || !d3) return;
  const q1 = (s, r = document) => r.querySelector(s), qa = (s, r = document) => [...r.querySelectorAll(s)];
  const h = s => String(s ?? "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  const nb = t => String(t ?? "").replace(/ ([?!:;»])/g, " $1").replace(/« /g, "« ");
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v)), lerp = (a, b, t) => a + (b - a)*t, ease = t => t < .5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2)/2;
  const RAD = Math.PI/180, ST = {doc:"Documenté", trad:"Tradition", mod:"Lecture moderne", leg:"Légende"};
  const badge = k => `<span class="gl-st gl-st-${k}">${ST[k]}</span>`;
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const F_DISP = css("--f-display") || "Georgia,serif", F_TEXT = css("--f-text") || "Georgia,serif", F_UI = css("--f-ui") || "system-ui,sans-serif";
  const TRI = Object.fromEntries(D.TR.map(t => [t.id, t]));
  const EVS = D.EV.map(e => ({ev:1, id:"e_" + e[0], lon:e[1], lat:e[2], lieu:e[3], an:e[4], quand:e[5], nom:e[6], st:e[7], x:e[8], tr:e[9]}));
  const EVI = Object.fromEntries(EVS.map(e => [e.id, e]));
  const STORE = "arcanes.globe.v1";
  let mem = (() => { try{ return Object.assign({vus:[], best:0}, JSON.parse(localStorage.getItem(STORE) || "{}")); }catch(e){ return {vus:[], best:0}; } })();
  const save = () => { try{ localStorage.setItem(STORE, JSON.stringify(mem)); }catch(e){} };
  const an = n => n < 0 ? "−" + Math.abs(n) : String(n);
  const dates = t => t.dt || (t.a == null ? `Depuis ${t.de < 0 ? "−" + Math.abs(t.de) : t.de}` : `De ${an(t.de)} à ${an(t.a)}`);

  /* ---------- la terre ---------- */
  const decode = P => ({type:"MultiPolygon", coordinates:P.map(poly => poly.map(a => { const r = []; let x = 0, y = 0; for(let i = 0; i < a.length; i += 2){ x += a[i]; y += a[i + 1]; r.push([x/100, y/100]); }
    const f = r[0], l = r[r.length - 1]; if(f[0] !== l[0] || f[1] !== l[1]) r.push([f[0], f[1]]); return r; }))});
  const LAND_LO = decode(T.a), LAND_HI = decode(T.b);
  const GRAT = d3.geoGraticule().step([15, 15])();
  const par = lat => ({type:"LineString", coordinates:d3.range(-180, 181, 3).map(l => [l, lat])});
  const PARS = [[0, 1], [23.44, 0], [-23.44, 0], [66.56, 0], [-66.56, 0]].map(p => ({g:par(p[0]), main:p[1]}));
  const dest = (lon, lat, brg, dist) => { const f = lat*RAD, l = lon*RAD, b = brg*RAD, d = dist*RAD, f2 = Math.asin(Math.sin(f)*Math.cos(d) + Math.cos(f)*Math.sin(d)*Math.cos(b));
    return [(l + Math.atan2(Math.sin(b)*Math.sin(d)*Math.cos(f), Math.cos(d) - Math.sin(f)*Math.sin(f2)))/RAD, f2/RAD]; };
  const ROSES = [[-38, 24], [80, -24], [-152, 6]];
  const RHUMBS = ROSES.flatMap(r => d3.range(16).map(i => ({i, g:{type:"LineString", coordinates:[r, dest(r[0], r[1], i*22.5, 58)]}})));
  const LABELS = [
    [-42,31,"Oceanus Atlanticus",0],[-22,-24,"Oceanus Æthiopicus",0],[-138,24,"Mare Pacificum",0],[-118,-32,"Mare del Zur",0],[78,-34,"Oceanus Indicus",0],[158,24,"Oceanus Orientalis",0],[4,75,"Mare Glaciale",0],[18,34.6,"Mare Mediterraneum",3],
    [16,50,"Europa",1],[20,6,"Africa",1],[92,46,"Asia",1],[-100,46,"America Septentrionalis",1],[-58,-12,"America Meridionalis",1],[134,-25,"Terra Australis",1],
    [2.5,46.7,"Gallia",2],[-4,40.2,"Hispania",2],[12.6,42.9,"Italia",2],[10,51.2,"Germania",2],[-1.6,53,"Britannia",2],[22,39.4,"Græcia",2],[30,27,"Ægyptus",2],[54,32.6,"Persia",2],[43.5,35,"Mesopotamia",2],[46,23,"Arabia",2],
    [86,60,"Tartaria",2],[138,36.6,"Iaponia",2],[105,34,"Sina",2],[79,21,"India",2],[88,32.5,"Tibet",2],[33,39,"Anatolia",2],[40,57,"Moscovia",2],[15,63.5,"Scandia",2],[39,9,"Æthiopia",2],[5,13.5,"Nigritia",2],
    [-102,24,"Nova Hispania",2],[-75,-9,"Peruvia",2],[-50,-10,"Brasilia",2],[-98,41,"Magnæ Planities",2],[-42,73,"Groenlandia",2]
  ].map(l => ({lon:l[0], lat:l[1], t:l[2], k:l[3]}));

  /* ---------- l'état ---------- */
  const proj = d3.geoOrthographic().clipAngle(90).precision(.5);
  let root = null, cv = null, ctx = null, path = null, W = 0, H = 0, dpr = 1, R0 = 100, tex = null;
  const view = {lon:15, lat:30, k:1, cx:0, cy:0, tcx:0, tcy:0};
  let moving = false, raf = 0, settleT = 0, fly = null, inertia = null, hits = [];
  const filt = {fam:new Set(Object.keys(D.FAM)), ev:true};
  let sel = null, route = null, tour = null, game = null, panelOpen = false;
  const KMAX = 16;

  function resize(){
    const r = root.getBoundingClientRect(); W = r.width; H = r.height; dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(W*dpr); cv.height = Math.round(H*dpr); R0 = Math.max(110, Math.min(W - 36, H - (W < 860 ? 170 : 130))/2);
    target(true); draw();
  }
  /* le centre du globe se décale quand un volet est ouvert */
  function target(now){
    const wide = W >= 860, card = (tour || game) ? (wide ? 0 : 150) : 0;
    view.tcx = panelOpen && wide ? (W - 420)/2 : W/2;
    view.tcy = panelOpen && !wide ? Math.max(R0*.5 + 40, (H*.44)/2 + 30) : (H - card)/2 + (wide ? 24 : 34);
    if(now){ view.cx = view.tcx; view.cy = view.tcy; }
  }
  const ask = () => { if(!raf) raf = requestAnimationFrame(frame); };
  function frame(ts){
    raf = 0; let again = false;
    if(Math.abs(view.cx - view.tcx) > .5 || Math.abs(view.cy - view.tcy) > .5){ view.cx = lerp(view.cx, view.tcx, .18); view.cy = lerp(view.cy, view.tcy, .18); again = true; }
    if(fly){ const u = clamp((ts - fly.t0)/fly.ms, 0, 1), e = ease(u), p = fly.ip(e); view.lon = p[0]; view.lat = p[1];
      view.k = Math.max(.85, Math.exp(lerp(fly.lk0, fly.lk1, e))*(1 - fly.dip*Math.sin(Math.PI*e)));
      if(u >= 1){ const cb = fly.cb; fly = null; if(cb) cb(); } again = true; }
    if(inertia){ view.lon -= inertia.vx; view.lat = clamp(view.lat + inertia.vy, -85, 85); inertia.vx *= .93; inertia.vy *= .93; if(Math.abs(inertia.vx) + Math.abs(inertia.vy) < .02) inertia = null; again = true; }
    if(route && route.p < route.n){ route.p = Math.min(route.n, route.p + (ts - (route.last || ts))/1000/route.pace); route.last = ts; const i = Math.min(route.n, Math.floor(route.p + .02)); if(i !== route.shown){ route.shown = i; if(route.onStep) route.onStep(i); } again = true; }
    else if(route) route.last = 0;
    if(game && game.pulse){ again = true; }
    moving = again || !!drag;
    draw(ts);
    if(again) ask(); else if(!drag){ clearTimeout(settleT); settleT = setTimeout(() => { moving = false; draw(); }, 90); }
  }
  function flyTo(lon, lat, k, ms, cb){
    inertia = null; const a = [view.lon, view.lat], b = [lon, lat], dist = d3.geoDistance(a, b);
    fly = {t0:performance.now(), ms:ms || clamp(700 + dist*500, 700, 1700), ip:d3.geoInterpolate(a, b), lk0:Math.log(view.k), lk1:Math.log(clamp(k || view.k, 1, KMAX)), dip:clamp(dist/1.3, 0, 1)*.42, cb}; ask();
  }
  /* cadrer un ensemble de points */
  function fit(pts, kmin, cb){
    if(pts.length === 1) return flyTo(pts[0][0], pts[0][1], Math.max(view.k, kmin || 3.2), 0, cb);
    const c = d3.geoCentroid({type:"MultiPoint", coordinates:pts}), md = Math.max(...pts.map(p => d3.geoDistance(c, p)));
    const half = Math.min(W - (panelOpen && W >= 860 ? 420 : 0), H - (panelOpen && W < 860 ? H*.5 : 140))/2*.82;
    const k = md > 1.25 ? 1 : clamp(half/(R0*Math.sin(md + .06)), 1, 9);
    flyTo(c[0], c[1], k, 0, cb);
  }

  /* ---------- le dessin ---------- */
  function texture(){
    const c = document.createElement("canvas"); c.width = c.height = 256; const x = c.getContext("2d");
    for(let i = 0; i < 2600; i++){ x.fillStyle = `rgba(${90 + Math.random()*40 | 0},${60 + Math.random()*30 | 0},${20 + Math.random()*20 | 0},${Math.random()*.07})`; const s = Math.random()*2.4; x.fillRect(Math.random()*256, Math.random()*256, s, s); }
    for(let i = 0; i < 46; i++){ x.strokeStyle = `rgba(110,75,30,${.03 + Math.random()*.05})`; x.lineWidth = .6; x.beginPath(); const px = Math.random()*256, py = Math.random()*256; x.moveTo(px, py); x.bezierCurveTo(px + 30, py + Math.random()*20 - 10, px + 60, py + Math.random()*30 - 15, px + 90 + Math.random()*40, py + Math.random()*30 - 15); x.stroke(); }
    return c;
  }
  const visible = (lon, lat, m = .06) => d3.geoDistance([view.lon, view.lat], [lon, lat]) < Math.PI/2 - m;
  function spaced(txt, x, y, sp){ // texte aux lettres espacées, centré
    if("letterSpacing" in ctx){ ctx.letterSpacing = sp + "px"; ctx.textAlign = "center"; ctx.fillText(txt, x + sp/2, y); ctx.letterSpacing = "0px"; return; }
    let w = 0; for(const ch of txt) w += ctx.measureText(ch).width + sp; let px = x - w/2; ctx.textAlign = "left"; for(const ch of txt){ ctx.fillText(ch, px, y); px += ctx.measureText(ch).width + sp; }
  }
  function rose(r){
    if(!visible(r[0], r[1], .12)) return; const p = proj(r), n = proj([r[0], r[1] + 3]); if(!p || !n) return;
    const a = Math.atan2(n[1] - p[1], n[0] - p[0]) + Math.PI/2, s = clamp(R0*view.k*.075, 15, 46), d = d3.geoDistance([view.lon, view.lat], r);
    ctx.save(); ctx.translate(p[0], p[1]); ctx.rotate(a); ctx.globalAlpha = clamp((Math.cos(d) - .1)/.35, 0, 1)*.85;
    ctx.strokeStyle = "#3b2a1a"; ctx.lineWidth = .8; ctx.beginPath(); ctx.arc(0, 0, s*.62, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, s*.68, 0, 7); ctx.stroke();
    for(let i = 0; i < 8; i++){ const L = i % 2 ? s*.6 : s, w = L*.17; ctx.save(); ctx.rotate(i*Math.PI/4);
      ctx.beginPath(); ctx.moveTo(0, -L); ctx.lineTo(w, 0); ctx.lineTo(0, 0); ctx.closePath(); ctx.fillStyle = i % 2 ? "#7a3524" : "#2a2018"; ctx.fill();
      ctx.beginPath(); ctx.moveTo(0, -L); ctx.lineTo(-w, 0); ctx.lineTo(0, 0); ctx.closePath(); ctx.fillStyle = "#efe2bf"; ctx.fill(); ctx.stroke(); ctx.restore(); }
    ctx.fillStyle = "#2a2018"; ctx.font = `${Math.round(s*.34)}px ${F_DISP}`; ctx.textAlign = "center"; ctx.fillText("N", 0, -s*1.12); ctx.restore();
  }
  function seal(x, y, r, col, on){
    if(on){ ctx.beginPath(); ctx.arc(x, y, r + 7, 0, 7); ctx.strokeStyle = "rgba(255,246,214,.95)"; ctx.lineWidth = 2.5; ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, r + 10, 0, 7); ctx.strokeStyle = col; ctx.lineWidth = 1.2; ctx.stroke(); }
    ctx.beginPath(); ctx.arc(x, y + 1.5, r + 1, 0, 7); ctx.fillStyle = "rgba(40,20,5,.35)"; ctx.fill();
    const g = ctx.createRadialGradient(x - r*.35, y - r*.4, r*.1, x, y, r); g.addColorStop(0, "rgba(255,255,255,.55)"); g.addColorStop(.35, col); g.addColorStop(1, col);
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fillStyle = col; ctx.fill(); ctx.fillStyle = g; ctx.globalAlpha = .55; ctx.fill(); ctx.globalAlpha = 1;
    ctx.strokeStyle = "rgba(30,14,4,.75)"; ctx.lineWidth = 1.1; ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y, r*.56, 0, 7); ctx.strokeStyle = "rgba(255,240,205,.6)"; ctx.lineWidth = .9; ctx.stroke();
  }
  function lozenge(x, y, r, on){
    ctx.beginPath(); ctx.moveTo(x, y - r); ctx.lineTo(x + r, y); ctx.lineTo(x, y + r); ctx.lineTo(x - r, y); ctx.closePath();
    ctx.fillStyle = on ? "#f3e2b2" : "#efe0b8"; ctx.fill(); ctx.strokeStyle = "#8c2318"; ctx.lineWidth = on ? 2.6 : 1.8; ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y, r*.28, 0, 7); ctx.fillStyle = "#8c2318"; ctx.fill();
  }
  function items(){
    if(game) return []; const a = D.TR.filter(t => filt.fam.has(t.fam)); return filt.ev ? a.concat(EVS) : a;
  }
  function draw(ts){
    if(!ctx) return; const R = R0*view.k, cx = view.cx, cy = view.cy;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    proj.scale(R).translate([cx, cy]).rotate([-view.lon, -view.lat]);
    const land = moving ? LAND_LO : LAND_HI;
    // la lueur derrière le globe, puis l'anneau de laiton
    let g = ctx.createRadialGradient(cx, cy, R*.9, cx, cy, R*1.5); g.addColorStop(0, "rgba(255,214,140,.2)"); g.addColorStop(1, "rgba(255,214,140,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const ringA = clamp(2.1 - view.k, 0, 1);
    if(ringA > 0){ ctx.globalAlpha = ringA; g = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R); g.addColorStop(0, "#e9c877"); g.addColorStop(.5, "#8a6424"); g.addColorStop(1, "#d6b05c");
      ctx.beginPath(); ctx.arc(cx, cy, R + 8, 0, 7); ctx.strokeStyle = g; ctx.lineWidth = 11; ctx.stroke(); ctx.strokeStyle = "rgba(30,18,6,.8)"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, R + 13.5, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(cx, cy, R + 2.5, 0, 7); ctx.stroke();
      ctx.beginPath(); for(let i = 0; i < 72; i++){ const a = i*Math.PI/36, r1 = R + (i % 6 ? 9 : 4), r2 = R + 13; ctx.moveTo(cx + Math.cos(a)*r1, cy + Math.sin(a)*r1); ctx.lineTo(cx + Math.cos(a)*r2, cy + Math.sin(a)*r2); } ctx.stroke(); ctx.globalAlpha = 1; }
    // la sphère de parchemin
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7);
    g = ctx.createRadialGradient(cx - R*.3, cy - R*.35, R*.05, cx, cy, R); g.addColorStop(0, "#f4e8c6"); g.addColorStop(.7, "#e7d5a6"); g.addColorStop(1, "#d3bb84"); ctx.fillStyle = g; ctx.fill();
    ctx.save(); ctx.clip();
    // les lignes de rhumb des portulans
    ctx.lineWidth = .6; RHUMBS.forEach(r => { ctx.beginPath(); path(r.g); ctx.strokeStyle = r.i % 4 === 0 ? "rgba(60,40,20,.26)" : r.i % 2 === 0 ? "rgba(40,95,80,.2)" : "rgba(140,50,30,.16)"; ctx.stroke(); });
    // le lavis le long des côtes, puis les terres
    ctx.lineJoin = "round"; ctx.beginPath(); path(land);
    ctx.strokeStyle = "rgba(58,110,112,.09)"; ctx.lineWidth = clamp(16*Math.sqrt(view.k), 14, 34); ctx.stroke();
    ctx.strokeStyle = "rgba(58,110,112,.13)"; ctx.lineWidth = clamp(8*Math.sqrt(view.k), 7, 18); ctx.stroke();
    ctx.strokeStyle = "rgba(48,96,104,.2)"; ctx.lineWidth = clamp(3.4*Math.sqrt(view.k), 3, 8); ctx.stroke();
    ctx.fillStyle = "#efe1b9"; ctx.fill();
    ctx.save(); ctx.clip(); ctx.strokeStyle = "rgba(176,128,58,.2)"; ctx.lineWidth = clamp(7*Math.sqrt(view.k), 6, 16); ctx.stroke(); ctx.restore();
    // le canevas : méridiens, parallèles, tropiques
    ctx.beginPath(); path(GRAT); ctx.strokeStyle = "rgba(70,48,22,.17)"; ctx.lineWidth = .55; ctx.stroke();
    PARS.forEach(p => { ctx.beginPath(); path(p.g); ctx.setLineDash(p.main ? [] : [5, 5]); ctx.strokeStyle = p.main ? "rgba(70,48,22,.42)" : "rgba(70,48,22,.3)"; ctx.lineWidth = p.main ? .9 : .7; ctx.stroke(); }); ctx.setLineDash([]);
    // le trait d'encre des côtes
    ctx.beginPath(); path(land); ctx.strokeStyle = "#3b2a1a"; ctx.lineWidth = view.k > 3 ? 1.15 : .95; ctx.stroke();
    ROSES.forEach(rose);
    // les noms latins
    const c0 = [view.lon, view.lat];
    LABELS.forEach(l => { if(l.k === 2 && view.k < 2.3) return; if(l.k === 3 && view.k < 1.7) return; if(l.k === 1 && view.k > 5.5) return;
      const d = d3.geoDistance(c0, [l.lon, l.lat]); if(d > 1.35) return; const p = proj([l.lon, l.lat]); if(!p) return;
      const a = clamp((Math.cos(d) - .2)/.4, 0, 1); if(a <= 0) return;
      const sea = l.k === 0 || l.k === 3, size = l.k === 1 ? clamp(R*.05, 12, 30) : l.k === 2 ? clamp(R*.011, 11, 17) : l.k === 3 ? clamp(R*.012, 10, 15) : clamp(R*.036, 10.5, 21);
      ctx.font = `${sea ? "italic " : ""}${size}px ${sea ? F_TEXT : F_DISP}`; ctx.fillStyle = sea ? `rgba(40,84,92,${a*.7})` : `rgba(74,44,18,${a*(l.k === 1 ? .5 : .62)})`; ctx.textBaseline = "middle";
      spaced(sea ? l.t : l.t.toUpperCase(), p[0], p[1], size*(l.k === 1 ? .42 : sea ? .2 : .26)); });
    // le grain du parchemin et l'ombre du bord
    if(!tex) tex = ctx.createPattern(texture(), "repeat");
    ctx.globalCompositeOperation = "multiply"; ctx.fillStyle = tex; ctx.fillRect(cx - R, cy - R, R*2, R*2); ctx.globalCompositeOperation = "source-over";
    g = ctx.createRadialGradient(cx - R*.28, cy - R*.34, R*.1, cx, cy, R*1.02); g.addColorStop(0, "rgba(255,250,232,.2)"); g.addColorStop(.62, "rgba(120,80,30,0)"); g.addColorStop(.9, "rgba(84,52,16,.2)"); g.addColorStop(1, "rgba(50,28,6,.6)");
    ctx.fillStyle = g; ctx.fillRect(cx - R, cy - R, R*2, R*2);
    // le voyage de la tradition ouverte
    if(route) drawRoute();
    ctx.restore();
    drawMarkers(); if(game) drawGame();
  }
  function drawRoute(){
    const pts = route.pts, n = Math.min(route.p, route.n);
    ctx.lineCap = "round"; ctx.setLineDash([7, 6]); ctx.lineWidth = 2.2; ctx.strokeStyle = "rgba(140,35,24,.92)";
    for(let i = 0; i < pts.length - 1; i++){ const f = clamp(n - i, 0, 1); if(f <= 0) break;
      const ip = d3.geoInterpolate(pts[i], pts[i + 1]), m = Math.max(2, Math.ceil(f*24)), seg = {type:"LineString", coordinates:d3.range(m + 1).map(j => ip(f*j/m))};
      ctx.beginPath(); path(seg); ctx.stroke(); }
    ctx.setLineDash([]);
  }
  function drawMarkers(){
    hits = []; const its = items(), cl = [], RC = view.k > 6 ? 22 : 30, c0 = [view.lon, view.lat];
    for(const it of its){ if(d3.geoDistance(c0, [it.lon, it.lat]) > Math.PI/2 - .07) continue; const p = proj([it.lon, it.lat]); if(!p || p[0] < -20 || p[0] > W + 20 || p[1] < -20 || p[1] > H + 20) continue;
      let c = null; for(const k of cl){ if(Math.hypot(k.x - p[0], k.y - p[1]) < RC){ c = k; break; } }
      if(c){ c.items.push(it); c.x = (c.x*(c.items.length - 1) + p[0])/c.items.length; c.y = (c.y*(c.items.length - 1) + p[1])/c.items.length; } else cl.push({x:p[0], y:p[1], items:[it]}); }
    // les étapes du voyage en cours
    if(route){ const c = [view.lon, view.lat]; route.stops.forEach((s, i) => { if(i > route.shown && route.p < route.n) return; if(d3.geoDistance(c, [s[0], s[1]]) > Math.PI/2 - .05) return; const p = proj([s[0], s[1]]); if(!p) return;
      const cur = i === route.cur; ctx.beginPath(); ctx.arc(p[0], p[1], cur ? 7 : 5, 0, 7); ctx.fillStyle = cur ? "#8c2318" : "#f3e6c0"; ctx.fill(); ctx.strokeStyle = "#8c2318"; ctx.lineWidth = 2; ctx.stroke();
      if(cur || route.stops.length <= 5 || view.k > 2.4) tag(p[0], p[1] - 13, `${s[3]} · ${s[2]}`, cur);
      hits.push({x:p[0], y:p[1], r:16, step:i}); }); }
    const boxes = [], showLab = cl.length <= 16 || view.k >= 2.6;
    cl.sort((a, b) => a.items.length - b.items.length);
    const dim = !!(route && (sel || tour));
    for(const c of cl){
      ctx.globalAlpha = dim && !(sel && c.items.some(i => i.id === sel.id)) ? .3 : 1;
      if(c.items.length > 1){ const n = c.items.length, r = clamp(11 + Math.sqrt(n)*3.2, 14, 26);
        ctx.beginPath(); ctx.arc(c.x, c.y + 2, r + 1, 0, 7); ctx.fillStyle = "rgba(40,20,5,.3)"; ctx.fill();
        ctx.beginPath(); ctx.arc(c.x, c.y, r, 0, 7); ctx.fillStyle = "#f6ecd0"; ctx.fill(); ctx.strokeStyle = "#3b2a1a"; ctx.lineWidth = 1.6; ctx.stroke();
        ctx.beginPath(); ctx.arc(c.x, c.y, r - 3.5, 0, 7); ctx.strokeStyle = "#8c2318"; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = "#2a1a0c"; ctx.font = `${Math.round(r*.92)}px ${F_DISP}`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(String(n), c.x, c.y + 1);
        hits.push({x:c.x, y:c.y, r:r + 8, items:c.items}); boxes.push([c.x - r, c.y - r, c.x + r, c.y + r]);
      } else { const it = c.items[0], on = sel && sel.id === it.id;
        if(it.ev) lozenge(c.x, c.y, on ? 9 : 7.5, on); else seal(c.x, c.y, on ? 10.5 : 9, D.FAM[it.fam].hex, on);
        hits.push({x:c.x, y:c.y, r:20, items:[it]}); boxes.push([c.x - 10, c.y - 10, c.x + 10, c.y + 10]); c.one = it; }
    }
    ctx.globalAlpha = 1;
    if(showLab && !dim) for(const c of cl){ if(!c.one) continue; const it = c.one, txt = it.ev ? `${it.quand.replace(/^.* (\d{3,4})$/, "$1")} · ${it.nom}` : it.nom;
      ctx.font = `600 ${it.ev ? 11.5 : 12.5}px ${F_UI}`; const w = ctx.measureText(txt).width, right = c.x + 14 + w < W - 6, x0 = right ? c.x + 14 : c.x - 14 - w, b = [x0 - 3, c.y - 9, x0 + w + 3, c.y + 9];
      if(boxes.some(o => !(b[2] < o[0] || b[0] > o[2] || b[3] < o[1] || b[1] > o[3]))) continue; boxes.push(b);
      ctx.textAlign = "left"; ctx.textBaseline = "middle"; ctx.lineJoin = "round"; ctx.strokeStyle = "rgba(244,232,198,.92)"; ctx.lineWidth = 3.6; ctx.strokeText(txt, x0, c.y + .5); ctx.fillStyle = it.ev ? "#7a1d14" : "#2a1a0c"; ctx.fillText(txt, x0, c.y + .5); }
  }
  function tag(x, y, txt, strong){
    ctx.font = `${strong ? 700 : 600} 12px ${F_UI}`; const w = ctx.measureText(txt).width + 14; x = clamp(x, w/2 + 4, W - w/2 - 4);
    ctx.fillStyle = strong ? "#8c2318" : "rgba(246,236,208,.95)"; ctx.strokeStyle = "#8c2318"; ctx.lineWidth = 1; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x - w/2, y - 10, w, 20, 10) : ctx.rect(x - w/2, y - 10, w, 20); ctx.fill(); ctx.stroke();
    ctx.fillStyle = strong ? "#fff3d6" : "#5a1810"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(txt, x, y + .5);
  }

  /* ---------- les gestes ---------- */
  let drag = null; const ptrs = new Map(); let lastTap = 0;
  function bindCanvas(){
    cv.addEventListener("pointerdown", e => { cv.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, [e.clientX, e.clientY]); fly = null; inertia = null;
      if(ptrs.size === 1) drag = {x:e.clientX, y:e.clientY, x0:e.clientX, y0:e.clientY, t:performance.now(), vx:0, vy:0, moved:0};
      else if(ptrs.size === 2){ const [a, b] = [...ptrs.values()]; drag = {pinch:Math.hypot(a[0] - b[0], a[1] - b[1]), k:view.k, moved:99}; } ask(); });
    cv.addEventListener("pointermove", e => { if(!ptrs.has(e.pointerId)) return; ptrs.set(e.pointerId, [e.clientX, e.clientY]); if(!drag) return;
      if(drag.pinch && ptrs.size >= 2){ const [a, b] = [...ptrs.values()]; view.k = clamp(drag.k*Math.hypot(a[0] - b[0], a[1] - b[1])/drag.pinch, 1, KMAX); ask(); return; }
      if(drag.pinch) return; const dx = e.clientX - drag.x, dy = e.clientY - drag.y, f = 180/(Math.PI*R0*view.k); drag.x = e.clientX; drag.y = e.clientY; drag.moved += Math.abs(dx) + Math.abs(dy);
      view.lon -= dx*f; view.lat = clamp(view.lat + dy*f, -85, 85); drag.vx = dx*f; drag.vy = dy*f; ask(); });
    const up = e => { if(!ptrs.has(e.pointerId)) return; ptrs.delete(e.pointerId); const d = drag; if(ptrs.size){ if(ptrs.size === 1){ const p = [...ptrs.values()][0]; drag = {x:p[0], y:p[1], vx:0, vy:0, moved:99}; } return; } drag = null;
      if(d && !d.pinch && d.moved < 7){ const r = cv.getBoundingClientRect(), now = performance.now(); tap(e.clientX - r.left, e.clientY - r.top, now - lastTap < 320); lastTap = now; }
      else if(d && !d.pinch && Math.abs(d.vx) + Math.abs(d.vy) > .08) inertia = {vx:d.vx, vy:d.vy}; ask(); };
    cv.addEventListener("pointerup", up); cv.addEventListener("pointercancel", up);
    cv.addEventListener("wheel", e => { e.preventDefault(); fly = null; view.k = clamp(view.k*Math.exp(-e.deltaY*.0016), 1, KMAX); ask(); }, {passive:false});
    cv.addEventListener("keydown", e => { const s = 12/view.k; if(e.key === "ArrowLeft") view.lon -= s; else if(e.key === "ArrowRight") view.lon += s; else if(e.key === "ArrowUp") view.lat = clamp(view.lat + s, -85, 85); else if(e.key === "ArrowDown") view.lat = clamp(view.lat - s, -85, 85); else if(e.key === "+" || e.key === "=") view.k = clamp(view.k*1.4, 1, KMAX); else if(e.key === "-") view.k = clamp(view.k/1.4, 1, KMAX); else return; e.preventDefault(); ask(); });
  }
  function tap(x, y, dbl){
    if(game){ if(game.wait) guess(x, y); return; }
    let best = null, bd = 1e9; for(const hh of hits){ const d = Math.hypot(hh.x - x, hh.y - y); if(d < hh.r && d < bd){ bd = d; best = hh; } }
    if(best && best.step != null){ stepTo(best.step); return; }
    if(best && best.items.length === 1){ open(best.items[0]); return; }
    if(best){ const its = best.items, c = d3.geoCentroid({type:"MultiPoint", coordinates:its.map(i => [i.lon, i.lat])}), spread = Math.max(...its.map(i => d3.geoDistance(c, [i.lon, i.lat])));
      const need = 46/(spread*R0 + 1e-6);   // le zoom qu'il faut pour les séparer
      if(need > KMAX){ if(view.k >= 5) return listHere(its); return flyTo(c[0], c[1], 6, 850); }
      flyTo(c[0], c[1], clamp(Math.max(view.k*1.9, need), 1, KMAX), 850); return; }
    if(dbl){ const p = proj.invert([x, y]); if(p) flyTo(p[0], p[1], clamp(view.k*2, 1, KMAX), 600); }
  }

  /* ---------- les fiches ---------- */
  function glyph(id, cls = ""){
    const s = D.SY[id]; if(!s) return "";
    return `<svg class="gl-gly ${cls}" viewBox="0 0 100 100" aria-hidden="true">${s.d.map((p, i) => { const o = typeof p === "string" ? {d:p} : p;
      return `<path d="${o.d}" pathLength="1" style="--i:${Math.min(i, 9)}" ${o.f === 1 ? 'class="f"' : o.f === 2 ? 'class="f2"' : ""} ${o.r ? `transform="rotate(${o.r} 50 50)"` : ""}/>`; }).join("")}</svg>`;
  }
  const dot = t => `<i class="gl-dot" style="background:${t.ev ? "#8c2318" : D.FAM[t.fam].hex}"></i>`;
  const link = (t, sub) => `<button type="button" class="gl-link" data-glgo="${t.id}">${dot(t)}<span><b>${h(t.nom)}</b><small>${h(sub || (t.ev ? t.quand + " · " + t.lieu : t.lieu))}</small></span></button>`;
  const ARC = {tarot:["Le tarot", "tarot", "histoire"], astro:["L'astrologie", "astro", "histoire"], magie:["La magie", "magie", "ecole"], alchimie:["L'alchimie", "alchimie", "histoire"]};
  function panel(html, cls){
    const p = q1(".gl-panel", root); q1(".gl-panel-in", p).innerHTML = html; p.hidden = false; p.className = "gl-panel " + (cls || ""); p.scrollTop = 0; q1(".gl-panel-in", p).scrollTop = 0;
    if(!panelOpen){ panelOpen = true; target(); ask(); } root.classList.add("gl-has-panel");
  }
  function closePanel(keep){
    q1(".gl-panel", root).hidden = true; panelOpen = false; root.classList.remove("gl-has-panel"); if(!keep){ sel = null; route = null; } target(); ask();
  }
  function meme(t){ // trois traditions vivantes à la même époque, ailleurs
    const a0 = t.de, a1 = t.a == null ? 2026 : t.a, mid = clamp((a0 + Math.min(a1, a0 + 400))/2, -3000, 2026);
    return D.TR.filter(o => o.id !== t.id && o.fam !== t.fam && o.fam !== "art" && !o.dt && o.de <= mid && (o.a == null ? 2026 : o.a) >= mid && d3.geoDistance([t.lon, t.lat], [o.lon, o.lat]) > .45)
      .sort((x, y) => Math.abs(x.de - a0) - Math.abs(y.de - a0)).slice(0, 3);
  }
  function open(it, quiet){
    if(tour) endTour(true); sel = it; if(!mem.vus.includes(it.id)){ mem.vus.push(it.id); save(); count(); }
    if(it.ev){ const t = it.tr && TRI[it.tr]; route = null;
      panel(`<p class="gl-eye">${dot(it)}Événement · ${h(it.lieu)}</p><h2>${h(it.nom)}</h2><p class="gl-dates">${h(it.quand)} ${badge(it.st)}</p><p class="gl-p">${nb(h(it.x))}</p>
        ${t ? `<h3>La tradition concernée</h3>${link(t)}` : ""}`);
      if(!quiet) flyTo(it.lon, it.lat, Math.max(view.k, 3.4)); return; }
    const t = it, evs = EVS.filter(e => e.tr === t.id), mm = meme(t), NOTE = {sacre:"Cette tradition appartient à celles et ceux qui la vivent. Arcanes n'en montre ni les objets sacrés ni le détail des cérémonies.", leg:"Une partie de ce qu'on raconte ici relève de la légende : le texte le signale.", mod:"Attention aux lectures modernes : le texte distingue ce qui est ancien de ce qui a été ajouté récemment.", trad:"Une partie repose sur la tradition, sans preuve extérieure."};
    panel(`<p class="gl-eye">${dot(t)}${h(D.FAM[t.fam].nom)} · ${h(t.lieu)}</p><h2>${h(t.nom)}</h2><p class="gl-dates">${h(dates(t))} ${badge(t.st)}</p>
      <p class="gl-p">${nb(h(t.x))}</p>${t.n && NOTE[t.n] ? `<p class="gl-note">${h(NOTE[t.n])}</p>` : ""}
      ${t.r ? `<h3>Son voyage</h3><ol class="gl-route">${t.r.map((s, i) => `<li><button type="button" data-glstep="${i}"><b>${h(s[3])}</b><span><strong>${h(s[2])}</strong>${nb(h(s[4]))}</span></button></li>`).join("")}</ol><button type="button" class="gl-btn" data-glreplay>Rejouer le voyage</button>` : ""}
      ${t.s ? `<h3>Ses signes</h3><div class="gl-syms">${t.s.map(s => `<button type="button" class="gl-sym" data-glsym="${s}">${glyph(s)}<span>${h(D.SY[s].nom)}</span></button>`).join("")}</div>` : ""}
      ${evs.length ? `<h3>Ce qui s'est passé</h3>${evs.map(e => link(e)).join("")}` : ""}
      ${mm.length ? `<h3>Au même moment dans le monde</h3>${mm.map(o => link(o)).join("")}` : ""}
      ${t.l ? `<h3>Dans Arcanes</h3><div class="gl-arc">${t.l.map(l => `<button type="button" class="gl-btn" data-glarc="${l}">${h(ARC[l][0])}</button>`).join("")}</div>` : ""}`);
    if(t.r){ startRoute(t.r, i => qa("[data-glstep]", root).forEach(b => b.parentNode.classList.toggle("on", +b.dataset.glstep <= i))); if(!quiet) fit(t.r.map(s => [s[0], s[1]]).concat([[t.lon, t.lat]]), 1, () => { route.p = 0; route.last = 0; ask(); }); }
    else { route = null; if(!quiet) flyTo(t.lon, t.lat, Math.max(view.k, 3.4)); }
  }
  function startRoute(stops, onStep){ route = {stops, pts:stops.map(s => [s[0], s[1]]), n:stops.length - 1, p:stops.length - 1, shown:-1, cur:-1, pace:1.15, onStep:i => { route.cur = i; onStep && onStep(i); }}; route.p = route.n; }
  function stepTo(i){ if(!route) return; route.cur = i; route.shown = Math.max(route.shown, i); const s = route.stops[i]; qa("[data-glstep]", root).forEach(b => b.parentNode.classList.toggle("cur", +b.dataset.glstep === i)); flyTo(s[0], s[1], Math.max(view.k, 3)); }
  function symSheet(id){
    const s = D.SY[id]; route = null; sel = null;
    panel(`<p class="gl-eye">Symbole</p><h2>${h(s.nom)}</h2><div class="gl-sym-big">${glyph(id, "draw")}</div><p class="gl-p">${nb(h(s.x))}</p>
      <h3>Où le trouver</h3>${s.ou.map(o => link(TRI[o])).join("")}<button type="button" class="gl-btn" data-glatlas>Tous les symboles</button>`);
  }
  function atlas(){ route = null; sel = null;
    panel(`<p class="gl-eye">${Object.keys(D.SY).length} signes tracés à la main</p><h2>L'atlas des symboles</h2><p class="gl-p">Touche un signe pour le voir se tracer, lire d'où il vient et voler jusqu'à sa tradition.</p>
      <div class="gl-syms big">${Object.keys(D.SY).map(s => `<button type="button" class="gl-sym" data-glsym="${s}">${glyph(s)}<span>${h(D.SY[s].nom)}</span></button>`).join("")}</div>`); }
  function list(){ route = null; sel = null;
    panel(`<p class="gl-eye">${D.TR.length} traditions · ${EVS.length} événements</p><h2>Tout le globe</h2>
      <label class="gl-search"><span class="sr-only">Chercher</span><input type="search" placeholder="Chercher : kabbale, Prague, 1307…" data-glq></label>
      ${Object.entries(D.FAM).map(([k, f]) => `<div class="gl-grp"><h3><i class="gl-dot" style="background:${f.hex}"></i>${h(f.nom)}</h3>${D.TR.filter(t => t.fam === k).map(t => link(t)).join("")}</div>`).join("")}
      <div class="gl-grp"><h3><i class="gl-dot" style="background:#8c2318"></i>Les événements</h3>${EVS.slice().sort((a, b) => a.an - b.an).map(e => link(e)).join("")}</div><p class="gl-note" data-glnone hidden>Rien ne correspond.</p>`);
    const inp = q1("[data-glq]", root), norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    inp.oninput = () => { const v = norm(inp.value.trim()); let n = 0; qa(".gl-grp", root).forEach(g => { let c = 0; qa(".gl-link", g).forEach(b => { const it = TRI[b.dataset.glgo] || EVI[b.dataset.glgo], ok = !v || norm(it.nom + " " + it.lieu + " " + (it.quand || "") + " " + it.x + " " + (it.r || []).map(r => r[2] + " " + r[3] + " " + r[4]).join(" ")).includes(v); b.hidden = !ok; if(ok) c++; }); g.hidden = !c; n += c; }); q1("[data-glnone]", root).hidden = n > 0; };
  }
  function listHere(its){ route = null; sel = null; panel(`<p class="gl-eye">Au même endroit</p><h2>${its.length} sceaux ici</h2>${its.map(i => link(i)).join("")}`); }
  function tours(){ route = null; sel = null;
    panel(`<p class="gl-eye">Balades racontées</p><h2>Les parcours</h2><p class="gl-p">Le globe tourne tout seul d'une étape à l'autre. Tu n'as qu'à lire.</p>
      ${D.PARCOURS.map(p => `<button type="button" class="gl-tour" data-gltour="${p.id}"><b>${h(p.nom)}</b><span>${nb(h(p.x))}</span><small>${p.stops.length} étapes</small></button>`).join("")}`); }

  /* ---------- les parcours ---------- */
  function startTour(id){
    const P = D.PARCOURS.find(p => p.id === id); if(!P) return; closePanel(); if(game) endGame();
    tour = {P, i:0}; startRoute(P.stops, null); route.p = 0; route.shown = 0; route.pace = 1e9; root.classList.add("gl-has-card"); target(); tourStep(0);
  }
  function tourStep(i){
    const P = tour.P, s = P.stops[i]; tour.i = i; route.cur = i; route.shown = Math.max(route.shown, i); route.p = i; route.pace = 1e9;
    q1(".gl-card", root).hidden = false;
    q1(".gl-card", root).innerHTML = `<p class="gl-eye">${h(P.nom)} · étape ${i + 1} sur ${P.stops.length}</p><h3>${h(s[2])} <small>${h(s[3])}</small></h3><p class="gl-p">${nb(h(s[4]))}</p>
      <div class="gl-card-nav">${i ? `<button type="button" class="gl-btn ghost" data-gltprev>Précédent</button>` : ""}${s[5] ? `<button type="button" class="gl-btn ghost" data-glgo="${s[5]}">La fiche</button>` : ""}<button type="button" class="gl-btn ${i < P.stops.length - 1 ? "main" : ""}" data-gltnext>${i < P.stops.length - 1 ? "Suivant" : "Terminer"}</button></div>`;
    flyTo(s[0], s[1], clamp(view.k < 2.2 ? 3 : view.k, 2.6, 4.2));
  }
  function endTour(keepRoute){ tour = null; q1(".gl-card", root).hidden = true; root.classList.remove("gl-has-card"); if(!keepRoute) route = null; target(); ask(); }

  /* ---------- le jeu : « D'où vient-elle ? » ---------- */
  function startGame(){
    closePanel(); if(tour) endTour(); const pool = D.TR.filter(t => t.fam !== "art").sort(() => Math.random() - .5).slice(0, 5);
    game = {pool, i:0, score:0, wait:true, g:null}; root.classList.add("gl-has-card", "gl-is-game"); target(); flyTo(view.lon, 20, 1, 700); ask(); gameCard();
  }
  function gameCard(res){
    const t = game.pool[game.i], c = q1(".gl-card", root); c.hidden = false;
    c.innerHTML = res ? `<p class="gl-eye">Manche ${game.i + 1} sur 5 · ${game.score} points</p><h3>${h(res.v)} <small>${res.km.toLocaleString("fr-FR")} km</small></h3><p class="gl-p">${h(t.nom)} : ${h(t.lieu)}. ${nb(h(t.x.split(". ")[0]))}.</p>
        <div class="gl-card-nav"><button type="button" class="gl-btn ghost" data-glquit>Arrêter</button><button type="button" class="gl-btn main" data-glnextq>${game.i < 4 ? "Suivante" : "Voir le score"}</button></div>`
      : `<p class="gl-eye">D'où vient-elle ? · manche ${game.i + 1} sur 5 · ${game.score} points</p><h3>${h(t.nom)}</h3><p class="gl-p">Tourne le globe et touche l'endroit où cette tradition est née. Les sceaux sont cachés.</p>
        <div class="gl-card-nav"><button type="button" class="gl-btn ghost" data-glquit>Arrêter</button></div>`;
  }
  function guess(x, y){
    const p = proj.invert([x, y]); if(!p || Math.hypot(x - view.cx, y - view.cy) > R0*view.k) return; const t = game.pool[game.i];
    const km = Math.round(d3.geoDistance(p, [t.lon, t.lat])*6371/10)*10, pts = Math.max(0, Math.round(100 - km/45)); game.score += pts; game.wait = false; game.g = {a:p, b:[t.lon, t.lat]};
    gameCard({km, v:km <= 400 ? "Dans le mille !" : km <= 1500 ? "Tout près." : km <= 4000 ? "Le bon coin du monde." : "Assez loin."}); fit([p, [t.lon, t.lat]], 1.6);
  }
  function drawGame(){
    if(!game.g) return; const {a, b} = game.g; ctx.save(); ctx.beginPath(); ctx.arc(view.cx, view.cy, R0*view.k, 0, 7); ctx.clip();
    ctx.setLineDash([6, 5]); ctx.strokeStyle = "#8c2318"; ctx.lineWidth = 2; ctx.beginPath(); path({type:"LineString", coordinates:[a, b]}); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
    const c = [view.lon, view.lat]; [[a, 0], [b, 1]].forEach(([q, ok]) => { if(d3.geoDistance(c, q) > Math.PI/2 - .04) return; const p = proj(q); if(!p) return; if(ok) seal(p[0], p[1], 10, "#2c6a5c", true); else { ctx.beginPath(); ctx.arc(p[0], p[1], 7, 0, 7); ctx.fillStyle = "#f3e6c0"; ctx.fill(); ctx.strokeStyle = "#2a1a0c"; ctx.lineWidth = 2; ctx.stroke(); } });
  }
  function nextQ(){
    if(game.i >= 4){ const s = game.score, rec = s > (mem.best || 0); if(rec){ mem.best = s; save(); }
      q1(".gl-card", root).innerHTML = `<p class="gl-eye">Partie terminée</p><h3>${s} points sur 500 ${rec ? "<small>record</small>" : ""}</h3><p class="gl-p">${s >= 400 ? "Tu connais la carte du monde invisible." : s >= 250 ? "Belle géographie. Encore quelques balades et tu seras imbattable." : "Le globe est grand. Promène-toi, puis reviens jouer."} Ton meilleur score : ${mem.best}.</p>
        <div class="gl-card-nav"><button type="button" class="gl-btn ghost" data-glquit>Revenir au globe</button><button type="button" class="gl-btn main" data-glgame>Rejouer</button></div>`; game.g = null; game.wait = false; ask(); return; }
    game.i++; game.g = null; game.wait = true; gameCard(); flyTo(view.lon, 20, 1, 700);
  }
  function endGame(){ game = null; q1(".gl-card", root).hidden = true; root.classList.remove("gl-has-card", "gl-is-game"); target(); ask(); }

  /* ---------- l'habillage ---------- */
  const count = () => { const e = q1("[data-glcount]", root); if(e) e.textContent = `${mem.vus.length} sur ${D.TR.length + EVS.length} explorés`; };
  function build(){
    root = document.createElement("div"); root.className = "glb"; root.id = "globe"; root.setAttribute("role", "dialog"); root.setAttribute("aria-label", "Le globe des traditions");
    root.innerHTML = `<canvas class="gl-cv" tabindex="0" aria-label="Le globe : glisse pour tourner, pince ou molette pour zoomer, touche un sceau pour ouvrir sa fiche. La liste complète est dans le bouton Liste."></canvas>
      <header class="gl-top"><button type="button" class="gl-x" data-glclose aria-label="Quitter le globe">←</button>
        <div class="gl-title"><b>Le globe des traditions</b><small data-glcount></small></div></header>
      <nav class="gl-tools" aria-label="Outils du globe"><button type="button" data-gllist>Liste</button><button type="button" data-gltours>Parcours</button><button type="button" data-glatlas>Symboles</button><button type="button" data-glgame>Jeu</button><button type="button" data-glfilt aria-expanded="false">Filtrer</button></nav>
      <div class="gl-filters" hidden>${Object.entries(D.FAM).map(([k, f]) => `<button type="button" class="on" data-glfam="${k}"><i class="gl-dot" style="background:${f.hex}"></i>${h(f.nom)}</button>`).join("")}<button type="button" class="on" data-glfam="ev"><i class="gl-dot lz"></i>Événements</button><button type="button" class="all" data-glall>Tout afficher</button></div>
      <div class="gl-zoom"><button type="button" data-glz="1" aria-label="Zoomer">+</button><button type="button" data-glz="-1" aria-label="Dézoomer">−</button><button type="button" data-glz="0" aria-label="Revenir au globe entier">◎</button></div>
      <p class="gl-hint">Tourne, zoome, touche un sceau.</p>
      <aside class="gl-panel" hidden><button type="button" class="gl-px" data-glpx aria-label="Fermer la fiche">×</button><div class="gl-panel-in"></div></aside>
      <div class="gl-card" hidden aria-live="polite"></div>`;
    document.body.appendChild(root);
    cv = q1(".gl-cv", root); ctx = cv.getContext("2d"); path = d3.geoPath(proj, ctx); bindCanvas(); count();
    root.addEventListener("click", e => {
      const b = e.target.closest("button"); if(!b) return; const d = b.dataset;
      if("glclose" in d) return close();
      if("glpx" in d) return closePanel();
      if("gllist" in d) return list(); if("gltours" in d) return tours(); if("glatlas" in d) return atlas();
      if("glgame" in d) return startGame(); if("glquit" in d) return endGame(); if("glnextq" in d) return nextQ();
      if("glfilt" in d){ const f = q1(".gl-filters", root); f.hidden = !f.hidden; b.setAttribute("aria-expanded", !f.hidden); return; }
      if(d.glfam){ const on = b.classList.toggle("on"); if(d.glfam === "ev") filt.ev = on; else on ? filt.fam.add(d.glfam) : filt.fam.delete(d.glfam); return ask(); }
      if("glall" in d){ qa("[data-glfam]", root).forEach(x => x.classList.add("on")); filt.fam = new Set(Object.keys(D.FAM)); filt.ev = true; return ask(); }
      if(d.glz){ fly = null; if(d.glz === "0") flyTo(view.lon, clamp(view.lat, -40, 50), 1, 700); else flyTo(view.lon, view.lat, clamp(view.k*(d.glz === "1" ? 1.8 : 1/1.8), 1, KMAX), 380); return; }
      if(d.glgo){ const it = TRI[d.glgo] || EVI[d.glgo]; if(it){ if(tour) endTour(); open(it); } return; }
      if(d.glstep) return stepTo(+d.glstep);
      if("glreplay" in d && sel && sel.r){ qa(".gl-route li", root).forEach(l => l.classList.remove("on", "cur")); route.shown = -1; route.cur = -1; fit(sel.r.map(s => [s[0], s[1]]), 1, () => { route.p = 0; route.last = 0; ask(); }); return; }
      if(d.glsym) return symSheet(d.glsym);
      if(d.gltour) return startTour(d.gltour);
      if("gltnext" in d){ if(tour.i < tour.P.stops.length - 1) tourStep(tour.i + 1); else endTour(); return; }
      if("gltprev" in d) return tourStep(tour.i - 1);
      if(d.glarc){ const a = ARC[d.glarc]; close(); try{ window.ArcanesAstro.switchTo(a[1], a[2]); }catch(x){} return; }
    });
    window.addEventListener("resize", () => { if(root && !root.hidden) resize(); });
    document.addEventListener("keydown", e => { if(e.key === "Escape" && root && !root.hidden){ if(panelOpen) closePanel(); else close(); } });
  }
  let prevFocus = null;
  function show(id){
    if(!root) build(); prevFocus = document.activeElement; root.hidden = false; document.body.classList.add("gl-open"); resize();
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => draw());
    const it = id && (TRI[id] || EVI[id] || EVI["e_" + id]); if(it) setTimeout(() => open(it), 300); else { view.k = 1; flyTo(15, 30, 1, 1); }
    q1(".gl-x", root).focus({preventScroll:true});
  }
  function close(){ if(!root) return; if(tour) endTour(); if(game) endGame(); closePanel(); root.hidden = true; document.body.classList.remove("gl-open"); try{ prevFocus && prevFocus.focus({preventScroll:true}); }catch(e){} }
  window.ArcanesGlobeMoteur = {show, close, state:() => ({view, sel, hits, n:D.TR.length}), open:id => open(TRI[id] || EVI[id]), flyTo, tap};
})();
