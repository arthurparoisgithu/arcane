/* ===== Arcanes · Astrologie : trouver un lieu de naissance =====
   1. une grande liste intégrée (astro/villes.js, données GeoNames, CC BY 4.0), chargée seulement quand on commence à taper :
      toutes les communes de France et d'outre-mer, la francophonie proche, les villes du monde de plus de 15 000 habitants ;
   2. si le lieu est introuvable, une recherche en ligne (géocodage d'Open-Meteo, lui aussi fondé sur GeoNames) ;
   3. en dernier recours, les coordonnées à la main (déjà prévues dans le formulaire).
   window.ArcanesVilles = {attach(input), pick(input)} : pick rend [nom, région, lat, lon, fuseau] ou null. */
(() => {
  const SRC = "astro/villes.js";
  let data = null, loading = null;
  const norm = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[-'’.,()]/g, " ").replace(/\s+/g, " ").trim().replace(/^st /, "saint ").replace(/^ste /, "sainte ").replace(/ st /g, " saint ").replace(/ ste /g, " sainte ");
  const hx = s => String(s ?? "").replace(/[&<>"']/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));

  function load(){
    if(data) return Promise.resolve(data);
    if(loading) return loading;
    loading = new Promise((res, rej) => {
      const done = () => { const V = window.ARCANES_VILLES; if(!V) return rej(new Error("liste absente"));
        const L = V.V.split("\n"), n = L.length, rows = new Array(n);
        for(let i = 0; i < n; i++){ const f = L[i].split("|"); rows[i] = {nom:f[0], alt:f[1], reg:V.R[+f[2]], lat:+f[3], lon:+f[4], tz:V.Z[+f[5]], pop:+f[6]*100, k:norm(f[0]), ka:f[1] ? norm(f[1]) : ""}; }
        data = rows; window.ARCANES_VILLES = null; res(data); };
      if(window.ARCANES_VILLES) return done();
      const s = document.createElement("script"); s.src = SRC; s.async = true; s.onload = done; s.onerror = () => { loading = null; rej(new Error("chargement")); };
      document.head.appendChild(s);
    });
    return loading;
  }
  function search(q, max = 8){
    const k = norm(q); if(k.length < 2 || !data) return [];
    const out = [];
    for(const r of data){
      let s = -1;
      if(r.k === k || r.ka === k) s = 3;
      else if(r.k.startsWith(k) || r.ka.startsWith(k)) s = 2;
      else if(k.length >= 3 && (r.k.includes(" " + k) || r.ka.includes(" " + k))) s = 1;
      if(s >= 0) out.push([s, r]);
    }
    out.sort((a, b) => b[0] - a[0] || b[1].pop - a[1].pop);
    return out.slice(0, max).map(x => x[1]);
  }
  async function online(q){
    const u = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=8&language=fr&format=json`;
    const r = await fetch(u); if(!r.ok) throw new Error("réseau");
    const j = await r.json();
    return (j.results || []).filter(x => x.timezone).map(x => ({nom:x.name, reg:[x.admin1, x.country].filter((v, i, a) => v && a.indexOf(v) === i).join(", "), lat:+(+x.latitude).toFixed(3), lon:+(+x.longitude).toFixed(3), tz:x.timezone, pop:x.population || 0, web:true}));
  }
  const label = r => `${r.nom} (${r.reg})`;

  let uid = 0;
  function attach(input){
    if(!input || input._villes) return;
    input._villes = true; input.removeAttribute("list");
    const id = "vl" + (++uid), wrap = document.createElement("div");
    wrap.className = "vl-wrap"; input.parentNode.insertBefore(wrap, input); wrap.appendChild(input);
    const box = document.createElement("div"); box.className = "vl-box"; box.id = id; box.setAttribute("role", "listbox"); box.hidden = true; wrap.appendChild(box);
    const st = document.createElement("p"); st.className = "help vl-st"; st.setAttribute("aria-live", "polite"); wrap.appendChild(st);
    input.setAttribute("role", "combobox"); input.setAttribute("aria-autocomplete", "list"); input.setAttribute("aria-controls", id); input.setAttribute("aria-expanded", "false"); input.autocomplete = "off";
    let items = [], act = -1, tm = 0, q0 = "";
    const close = () => { box.hidden = true; input.setAttribute("aria-expanded", "false"); input.removeAttribute("aria-activedescendant"); act = -1; };
    const choose = r => {
      input._geo = {lab:label(r), c:[r.nom, r.reg, r.lat, r.lon, r.tz]};
      input.value = input._geo.lab; close();
      st.textContent = `${r.lat.toFixed(2)}°, ${r.lon.toFixed(2)}° · fuseau ${r.tz}${r.web ? " · trouvé en ligne" : ""}`;
      input.dispatchEvent(new Event("input", {bubbles:true})); input.dispatchEvent(new Event("change", {bubbles:true}));
    };
    const render = (list, extra) => {
      items = list; act = -1;
      box.innerHTML = list.map((r, i) => `<div class="vl-it" role="option" id="${id}-${i}" data-i="${i}" aria-selected="false"><b>${hx(r.nom)}</b>${r.alt ? ` <span class="vl-alt">${hx(r.alt)}</span>` : ""}<small>${hx(r.reg)}${r.web ? " · en ligne" : ""}</small></div>`).join("") + (extra || "");
      box.hidden = !list.length && !extra; input.setAttribute("aria-expanded", String(!box.hidden));
    };
    const webBtn = q => `<button type="button" class="vl-web" data-web>Chercher « ${hx(q)} » dans le monde entier <small>recherche en ligne</small></button>`;
    async function run(){
      const q = input.value.trim(); q0 = q;
      if(input._geo && input._geo.lab === q){ close(); return; }
      input._geo = null; st.textContent = "";
      if(norm(q).length < 2){ close(); return; }
      try{ if(!data){ st.textContent = "Chargement de la liste des villes…"; await load(); st.textContent = ""; } }
      catch(e){ st.textContent = "La liste des villes n'a pas pu se charger. Tu peux chercher en ligne, ou entrer les coordonnées."; render([], webBtn(q)); return; }
      if(q !== input.value.trim()) return;
      const res = search(q);
      render(res, q.length >= 3 ? webBtn(q) : "");
    }
    async function web(){
      const q = q0 || input.value.trim(); if(!q) return;
      box.innerHTML = `<p class="vl-wait">Recherche en ligne…</p>`; box.hidden = false;
      try{ const r = await online(q); if(r.length) render(r); else { render([]); st.textContent = "Rien trouvé en ligne non plus : entre les coordonnées à la main, juste en dessous."; } }
      catch(e){ render([]); st.textContent = "La recherche en ligne n'a pas répondu (pas de connexion ?). Tu peux entrer les coordonnées à la main."; }
    }
    const move = d => { if(!items.length) return; act = (act + d + items.length) % items.length;
      [...box.querySelectorAll(".vl-it")].forEach((el, i) => { el.classList.toggle("on", i === act); el.setAttribute("aria-selected", String(i === act)); });
      input.setAttribute("aria-activedescendant", `${id}-${act}`); const el = box.querySelector(`#${id}-${act}`); if(el) el.scrollIntoView({block:"nearest"}); };
    input.addEventListener("input", e => { if(e.isTrusted === false && input._geo && input._geo.lab === input.value) return; clearTimeout(tm); tm = setTimeout(run, 120); });
    input.addEventListener("focus", () => { load().catch(() => {}); });
    input.addEventListener("keydown", e => {
      if(e.key === "ArrowDown"){ e.preventDefault(); if(box.hidden) run(); else move(1); }
      else if(e.key === "ArrowUp"){ e.preventDefault(); move(-1); }
      else if(e.key === "Enter" && !box.hidden && act >= 0){ e.preventDefault(); choose(items[act]); }
      else if(e.key === "Escape" && !box.hidden){ e.preventDefault(); close(); }
    });
    box.addEventListener("mousedown", e => e.preventDefault());
    box.addEventListener("click", e => { const it = e.target.closest(".vl-it"); if(it) return choose(items[+it.dataset.i]); if(e.target.closest("[data-web]")) web(); });
    input.addEventListener("blur", () => setTimeout(close, 150));
  }
  /* le lieu choisi, si le texte correspond encore à un choix de la liste ; sinon une correspondance exacte */
  function pick(input){
    if(!input) return null;
    const v = input.value.trim();
    if(input._geo && input._geo.lab === v) return input._geo.c;
    if(data && v){ const m = v.match(/^(.*?)\s*\((.*)\)$/), nom = norm(m ? m[1] : v), reg = m ? m[2] : null;
      const r = data.filter(x => (x.k === nom || x.ka === nom) && (!reg || x.reg === reg)).sort((a, b) => b.pop - a.pop)[0];
      if(r) return [r.nom, r.reg, r.lat, r.lon, r.tz]; }
    return null;
  }
  window.ArcanesVilles = {attach, pick, load, search};
})();
