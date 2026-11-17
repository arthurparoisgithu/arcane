/* ===== Arcanes · Le globe des traditions : l'entrée =====
   Pose un bandeau en tête des pages Histoire des quatre univers et charge le globe à la demande
   (bibliothèque de projection, fond de carte, données, moteur : environ 370 ko, jamais chargés avant). */
(() => {
  const FILES = ["globe/vendor/d3-array.min.js", "globe/vendor/d3-geo.min.js", "globe/globe-terre.js", "globe/globe-relief.js", "globe/globe-data.js", "globe/globe-plus-1.js", "globe/globe-plus-2.js", "globe/globe-images.js", "globe/globe-liens.js", "globe/globe-plus-3.js", "globe/globe-plus-4.js", "globe/globe-moteur.js"];
  const load = src => new Promise((ok, ko) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = () => ko(new Error(src)); document.head.appendChild(s); });
  let loading = null, veil = null;
  const DEEP = location.hash === "#globe" || /[?&]globe\b/.test(location.search);   // lien direct : …/#globe ou …/?globe
  function open(id){
    if(window.ArcanesGlobeMoteur) return window.ArcanesGlobeMoteur.show(id);
    if(!veil){ veil = document.createElement("div"); veil.className = "gl-veil"; veil.setAttribute("role", "status"); document.body.appendChild(veil); }
    veil.innerHTML = `<span class="gl-veil-o" aria-hidden="true"></span><p>On déroule la carte…</p>`; veil.hidden = false;
    loading = loading || FILES.reduce((p, f) => p.then(() => load(f)), Promise.resolve());
    loading.then(() => { veil.hidden = true; window.ArcanesGlobeMoteur.show(id); })
      .catch(() => { loading = null; veil.innerHTML = `<p>Le globe n'a pas pu se charger. Vérifie ta connexion, puis réessaie.</p><button type="button" class="btn small">Fermer</button>`; veil.querySelector("button").onclick = () => { veil.hidden = true; }; });
  }
  const MINI = `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="25" class="s"/><circle cx="32" cy="32" r="29" class="r"/><path d="M7 32h50M32 7c-13 8-13 42 0 50M32 7c13 8 13 42 0 50M11 20c12 5 30 5 42 0M11 44c12-5 30-5 42 0" class="g"/><path d="M22 18c4-2 9-1 11 2s-1 6-4 7-3 5-7 4-5-9 0-13zM38 34c4-1 8 1 8 5s-3 8-6 7-5-10-2-12z" class="l"/><circle cx="25" cy="24" r="2.6" class="d"/><circle cx="42" cy="39" r="2.6" class="d2"/></svg>`;
  const banner = () => { const b = document.createElement("button"); b.type = "button"; b.className = "gl-banner"; b.setAttribute("data-globe", "");
    b.innerHTML = `${MINI}<span><b>Le globe des traditions</b><small>Une carte ancienne à faire tourner : 90 traditions spirituelles et ésotériques, leurs voyages, leurs symboles et 47 événements.</small></span><i aria-hidden="true">Ouvrir</i>`; return b; };
  function place(v){
    if(!v || !v.firstElementChild || v.querySelector(".gl-banner")) return;
    const anchor = v.querySelector(".hx-top") || v.querySelector(":scope > header") || v.firstElementChild; anchor.after(banner());
  }
  const IDS = ["v-histoire", "v-a-histoire", "v-m-histoire", "v-al-histoire"];
  function watch(){ IDS.forEach(id => { const v = document.getElementById(id); if(!v) return; place(v); if(v._gl) return; v._gl = 1; new MutationObserver(() => place(v)).observe(v, {childList:true}); }); }
  function init(){
    watch(); const main = document.querySelector("main"); if(main) new MutationObserver(watch).observe(main, {childList:true});   // les vues de la magie et de l'alchimie naissent plus tard
    document.addEventListener("click", e => { const b = e.target.closest && e.target.closest("[data-globe]"); if(b){ e.preventDefault(); open(b.dataset.globe || null); } });
    if(DEEP){ setTimeout(() => open(), 500);
      // le lien direct n'ouvre le globe qu'une fois : on nettoie l'adresse pour que l'app rouvre ensuite sur son accueil
      try { const u = new URL(location.href); u.searchParams.delete("globe"); if(u.hash === "#globe") u.hash = ""; history.replaceState(null, "", u.pathname + (u.searchParams.toString() ? "?" + u.searchParams : "") + u.hash); } catch(e){} }
  }
  window.ArcanesGlobe = {open};
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(init, 0)); else setTimeout(init, 0);
})();
