/* ===== Arcanes · Les pages d'histoire =====
   Un même gabarit de lecture pour l'histoire de la magie et celle de l'astrologie :
   tout est ouvert, illustré, avec les lieux, les figures et les questions qu'on se pose.
   window.ArcanesHistoire = { render(o) -> html, bind(root) }
   Mode « par chapitre » : mount(root, o) affiche une couverture (la liste illustrée des chapitres), puis un chapitre à la fois.
   Un chapitre peut porter une accroche (c.accroche, pour la couverture) et une scène d'ouverture (c.scene = [lieu et date, récit]). */
window.ArcanesHistoire = (() => {
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const nb = s => String(s).replace(/ ([:;?!»])/g, " $1").replace(/« /g, "« ");
  const fig = (f, cls) => !f ? "" : `<figure class="hx-fig ${cls || ""}" data-hxz><img src="${f[0]}" alt="${esc((f[1] || "").replace(/<[^>]+>/g, ""))}" loading="lazy" decoding="async"><figcaption>${f[1] || ""}</figcaption></figure>`;
  function chapter(c, i, pfx){
    const id = `${pfx}-${c.id}`;
    let s = `<section class="hx-ch" id="${id}" data-hxc="${i}">
      <header class="hx-ch-h"><span class="hx-n" aria-hidden="true">${c.n}</span><p class="hx-per">${c.per}</p><h2>${nb(c.t)}</h2>
        ${c.lieux ? `<ul class="hx-lieux" aria-label="Les lieux">${c.lieux.map(l => `<li><b>${l[0]}</b>${l[1] ? `<small>${l[1]}</small>` : ""}</li>`).join("")}</ul>` : ""}</header>
      ${c.scene ? `<div class="hx-scene"><p class="hx-scene-l">${nb(c.scene[0])}</p>${[].concat(c.scene[1]).map(p => `<p>${nb(p)}</p>`).join("")}</div>` : ""}
      ${c.hero ? fig(c.hero, "hero") : ""}
      <p class="hx-lead${c.scene ? " sans" : ""}">${nb(c.lead)}</p>`;
    (c.blocs || []).forEach((b, k) => {
      s += `<div class="hx-bloc">${b.h ? `<h3>${nb(b.h)}</h3>` : ""}${b.fig ? fig(b.fig, k % 2 ? "l" : "r") : ""}${b.p.map(p => `<p>${nb(p)}</p>`).join("")}
        ${b.gal ? `<div class="hx-gal" role="group" aria-label="Galerie">${b.gal.map(g => fig(g, "g")).join("")}</div>` : ""}
        ${b.cite ? `<blockquote class="hx-cite"><p>${nb(b.cite[0])}</p><footer>${b.cite[1]}</footer></blockquote>` : ""}</div>`; });
    if(c.gens && c.gens.length) s += `<section class="hx-gens"><h3>Les figures</h3>${c.gens.map(g => `<article class="hx-gen${g.img ? " pic" : ""}">${g.img ? `<img src="${g.img}" alt="" loading="lazy" decoding="async" data-hxz1 data-cap="${esc(g.cap || g.n)}">` : ""}<div><h4>${g.n}${g.d ? ` <small>${g.d}</small>` : ""}</h4>${g.role ? `<p class="hx-role">${g.role}</p>` : ""}<p>${nb(g.t)}</p></div></article>`).join("")}</section>`;
    if(c.qr && c.qr.length) s += `<section class="hx-qr"><h3>Les questions qu'on se pose</h3><dl>${c.qr.map(q => `<div><dt>${nb(q[0])}</dt><dd>${nb(q[1])}</dd></div>`).join("")}</dl></section>`;
    if(c.mots && c.mots.length) s += `<aside class="hx-mots"><h3>Les mots du chapitre</h3><dl>${c.mots.map(m => `<div><dt>${m[0]}</dt><dd>${nb(m[1])}</dd></div>`).join("")}</dl></aside>`;
    if(c.globe && c.globe.length) s += `<p class="hx-globe"><span>Sur le globe</span>${c.globe.map(g => `<button type="button" class="chip" data-globe="${g[0]}">${g[1]}</button>`).join("")}</p>`;
    if(c.suite) s += `<p class="hx-suite"><span aria-hidden="true">❧</span> ${nb(c.suite)}</p>`;
    return s + `</section>`;
  }
  function render(o){
    const pfx = o.pfx || "hx";
    return `<div class="hxb" data-hx="${pfx}">
      <header class="hx-top"><p class="eyebrow">${o.eyebrow}</p><h1>${o.titre}</h1><p class="hx-lede">${nb(o.lede)}</p>${o.avant ? `<div class="hx-avant">${o.avant}</div>` : ""}</header>
      <nav class="hx-toc" aria-label="Les chapitres">${o.chapitres.map((c, i) => `<a href="#${pfx}-${c.id}" data-hxt="${i}"><span>${c.n}</span>${c.court || c.t}</a>`).join("")}</nav>
      <div class="hx-body">${o.chapitres.map((c, i) => chapter(c, i, pfx)).join("")}${o.fin || ""}</div></div>`;
  }
  let obs = null, box = null;
  function zoom(src, cap){
    if(!box){ box = document.createElement("div"); box.className = "hx-zoom"; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", "Image agrandie");
      box.innerHTML = `<button type="button" class="hx-zoom-x" aria-label="Fermer">×</button><div class="hx-zoom-in"><img alt=""><p></p></div>`; document.body.appendChild(box);
      const close = () => { box.classList.remove("on"); document.documentElement.classList.remove("hx-lock"); };
      box.addEventListener("click", e => { if(e.target.tagName !== "IMG") close(); });
      document.addEventListener("keydown", e => { if(e.key === "Escape" && box.classList.contains("on")) close(); }); }
    box.querySelector("img").src = src; box.querySelector("p").innerHTML = cap || ""; box.classList.add("on"); document.documentElement.classList.add("hx-lock"); box.querySelector("button").focus({preventScroll:true});
  }
  function bind(root){
    const hx = root.querySelector(".hxb"); if(!hx) return;
    const toc = hx.querySelector(".hx-toc"), reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(toc) toc.querySelectorAll("a").forEach(a => a.onclick = e => { e.preventDefault(); const t = document.getElementById(a.getAttribute("href").slice(1)); if(t) window.scrollTo({top:t.getBoundingClientRect().top + scrollY - 64, behavior:reduce ? "auto" : "smooth"}); });
    hx.querySelectorAll("[data-hxz]").forEach(f => { f.tabIndex = 0; f.setAttribute("role", "button"); const go = () => zoom(f.querySelector("img").src, f.querySelector("figcaption").innerHTML); f.onclick = go; f.onkeydown = e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); go(); } }; });
    hx.querySelectorAll("[data-hxz1]").forEach(im => { im.onclick = () => zoom(im.src, im.dataset.cap); });
    hx.querySelectorAll(".hx-fig.hero img").forEach(im => { const f = () => { if(im.naturalHeight > im.naturalWidth*1.08) im.parentNode.classList.add("pt"); }; if(im.complete && im.naturalWidth) f(); else im.addEventListener("load", f, {once:true}); });
    if(obs) obs.disconnect();
    if("IntersectionObserver" in window){
      if(toc) obs = new IntersectionObserver(es => es.forEach(en => { if(!en.isIntersecting) return; const i = en.target.dataset.hxc;
        toc.querySelectorAll("a").forEach(a => { const on = a.dataset.hxt === i; a.classList.toggle("on", on); if(on && toc.scrollWidth > toc.clientWidth) toc.scrollTo({left:a.offsetLeft - 16, behavior:reduce ? "auto" : "smooth"}); }); }), {rootMargin:"-25% 0px -65% 0px"});
      if(toc) hx.querySelectorAll(".hx-ch").forEach(s => obs.observe(s));
      if(!reduce){ const rv = new IntersectionObserver(es => es.forEach(en => { if(en.isIntersecting){ en.target.classList.add("in"); rv.unobserve(en.target); } }), {rootMargin:"0px 0px -8% 0px"});
        hx.querySelectorAll(".hx-fig, .hx-gen, .hx-ch-h").forEach(x => { x.classList.add("hx-rv"); rv.observe(x); }); }
    }
  }
  /* ---------- un chapitre à la fois ---------- */
  const OUVERT = {};   // le chapitre ouvert, par histoire, le temps de la visite
  const minutes = c => Math.max(2, Math.round(JSON.stringify([c.lead, c.scene, c.blocs, c.gens, c.qr]).replace(/<[^>]+>/g, "").split(/\s+/).length/210));
  function mount(root, o){
    const pfx = o.pfx || "hx", CH = o.chapitres, n = CH.length, E = o.etat || {lu:[]}, reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(!Array.isArray(E.lu)) E.lu = [];
    const vu = id => E.lu.includes(id), suivant = () => { const k = CH.findIndex(c => !vu(c.id)); return k < 0 ? 0 : k; };
    const thumb = c => c.hero ? `<span class="hxc-img"><img src="${c.hero[0]}" alt="" loading="lazy" decoding="async"></span>` : `<span class="hxc-img vide"></span>`;
    const couverture = () => { const k = suivant(), fait = E.lu.length;
      return `<div class="hxb hxc" data-hx="${pfx}">
        <header class="hx-top"><p class="eyebrow">${o.eyebrow}</p><h1>${o.titre}</h1><p class="hx-lede">${nb(o.lede)}</p>
          <div class="hxc-go"><button type="button" class="btn" data-hxgo="${k}">${fait === 0 ? "Commencer : chapitre I" : fait >= n ? "Relire depuis le début" : `Reprendre : chapitre ${CH[k].n}`}</button><span>${fait === 0 ? `${n} chapitres, à lire dans l'ordre ou au hasard` : `${fait} chapitre${fait > 1 ? "s" : ""} lu${fait > 1 ? "s" : ""} sur ${n}`}</span></div></header>
        <ol class="hxc-list">${CH.map((c, i) => `<li><button type="button" class="hxc-card${vu(c.id) ? " lu" : ""}" data-hxgo="${i}">${thumb(c)}
          <span class="hxc-tx"><span class="hxc-k"><b>${c.n}</b>${c.per}</span><span class="hxc-t">${nb(c.court || c.t)}</span>${c.accroche ? `<span class="hxc-a">${nb(c.accroche)}</span>` : ""}<span class="hxc-s">${vu(c.id) ? "Lu" : `${minutes(c)} min de lecture`}</span></span></button></li>`).join("")}</ol>
        ${o.fin || ""}</div>`; };
    const page = i => { const c = CH[i], nx = CH[i + 1];
      return `<div class="hxb hxp" data-hx="${pfx}">
        <nav class="hxp-bar" aria-label="Navigation dans l'histoire"><button type="button" class="hxp-back" data-hxgo="-1">‹ Les chapitres</button><span>Chapitre ${c.n} sur ${CH[n - 1].n}</span>
          <span class="hxp-dots" aria-hidden="true">${CH.map((x, j) => `<i class="${j === i ? "on" : vu(x.id) ? "lu" : ""}"></i>`).join("")}</span></nav>
        <div class="hx-body">${chapter(c, i, pfx)}</div>
        <footer class="hxp-end" data-hxend>${nx ? `<button type="button" class="hxp-next" data-hxgo="${i + 1}">${thumb(nx)}<span class="hxc-tx"><span class="hxc-k">Chapitre suivant · <b>${nx.n}</b></span><span class="hxc-t">${nb(nx.t)}</span>${nx.accroche ? `<span class="hxc-a">${nb(nx.accroche)}</span>` : ""}</span></button>` : (o.finChap || "")}
          <div class="hxp-nav">${i > 0 ? `<button type="button" class="btn ghost small" data-hxgo="${i - 1}">‹ Chapitre ${CH[i - 1].n}</button>` : ""}<button type="button" class="btn ghost small" data-hxgo="-1">Tous les chapitres</button></div></footer></div>`; };
    let endObs = null;
    const lu = i => { const id = CH[i].id; if(!vu(id)){ E.lu.push(id); if(o.onEtat) o.onEtat(E); } };
    const draw = top => { const i = OUVERT[pfx]; if(endObs){ endObs.disconnect(); endObs = null; }
      root.innerHTML = i == null ? couverture() : page(i); bind(root);
      root.querySelectorAll("[data-hxgo]").forEach(b => b.onclick = () => { const k = +b.dataset.hxgo; if(OUVERT[pfx] != null && k > OUVERT[pfx]) lu(OUVERT[pfx]); OUVERT[pfx] = k < 0 ? null : k; draw(true); });
      if(i != null && "IntersectionObserver" in window){ const end = root.querySelector("[data-hxend]"); endObs = new IntersectionObserver(es => { if(es.some(e => e.isIntersecting)){ lu(i); endObs.disconnect(); } }); endObs.observe(end); }
      if(o.apres) o.apres(root);
      if(top) window.scrollTo({top:0, behavior:"auto"}); };
    if(OUVERT[pfx] != null && !CH[OUVERT[pfx]]) OUVERT[pfx] = null;
    draw(false);
    return {ouvrir:i => { OUVERT[pfx] = i; draw(true); }};
  }
  return {render, bind, zoom, mount};
})();
