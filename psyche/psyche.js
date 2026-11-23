/* ===== Arcanes · Psyché : la porte =====
   Le cinquième univers ne pèse rien au démarrage : ce petit fichier déclare l'univers,
   et charge le reste (données, cours, histoire, interface, style) la première fois qu'on y entre. */
(() => {
  const FILES = ["psyche/psyche-data.js", "psyche/psyche-cours.js", "psyche/psyche-histoire.js", "psyche/psyche-app.js", "psyche/psyche-jeu.js"];
  let on = false, loading = null, want = null;
  const css = () => { if(document.querySelector('link[href="psyche/psyche.css"]')) return; const l = document.createElement("link"); l.rel = "stylesheet"; l.href = "psyche/psyche.css"; document.head.appendChild(l); };
  const one = src => new Promise((ok, ko) => { const s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = () => ko(new Error(src)); document.head.appendChild(s); });
  const load = () => loading || (loading = (async () => { css(); for(const f of FILES) await one(f); return window.PSY_APP; })().catch(e => { loading = null; throw e; }));
  const ready = () => window.PSY_APP || null;
  function enter(v){
    on = true; want = v || null;
    if(ready()) return ready().enter(v);
    document.documentElement.classList.add("u-psy"); document.body.classList.add("u-psy");
    load().then(A => { if(on && A) A.enter(want || undefined); }).catch(() => { on = false; document.documentElement.classList.remove("u-psy"); document.body.classList.remove("u-psy");
      try{ window.ArcanesAstro.switchTo("tarot"); }catch(e){} });
  }
  function leave(){ on = false; document.documentElement.classList.remove("u-psy"); document.body.classList.remove("u-psy"); if(ready()) ready().leave(); }
  const view = v => ready() ? ready().view(v) : enter(v);
  const go = t => { on = true; return ready() ? ready().go(t) : load().then(A => { if(A && on){ A.enter(); A.go(t); } }); };
  /* Le Miroir, le jeu : trois fichiers et une feuille de style, chargés seulement quand on le lance */
  let jeu = null;
  const miroir = () => { if(!jeu) jeu = (async () => { if(!document.querySelector('link[href="psyche/miroir/miroir.css"]')){ const l = document.createElement("link"); l.rel = "stylesheet"; l.href = "psyche/miroir/miroir.css"; document.head.appendChild(l); }
      for(const f of ["psyche/miroir/pix.js", "psyche/miroir/r3d.js", "psyche/miroir/miroir.js"]) await one(f); return window.ArcanesMiroir; })().catch(e => { jeu = null; throw e; }); return jeu.then(M => { M.open(); return M; }); };
  document.addEventListener("click", e => { const t = e.target.closest && e.target.closest("[data-miroir]"); if(t){ e.preventDefault(); miroir().catch(() => {}); } });
  window.ArcanesPsyche = {enter, leave, view, go, miroir, active:() => on, load, state:() => ready() ? ready().state() : null};
})();
