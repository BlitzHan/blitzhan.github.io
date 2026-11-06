(function () {
  const CATS = window.CATEGORIES.slice();
  const projects = window.PROJECTS.slice();
  const hidden = new Set(window.HIDDEN_REPOS.map((s) => s.toLowerCase()));
  const known = new Set(projects.filter((p) => p.repo).map((p) => p.repo.toLowerCase()));
  const NEW = { id: "yeni", name: "Yeni eklenenler", blurb: "GitHub'da yeni çıkmış, henüz kataloğa işlenmemiş" };

  const AY = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
  const AY_UZUN = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const fmtDate = (d) => (d ? `${AY[Number(d.slice(5, 7)) - 1]} ${d.slice(0, 4)}` : "");
  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const isExt = (u) => /^https?:/.test(u);
  const tgt = (u) => (isExt(u) ? ' target="_blank" rel="noopener"' : "");

  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
  document.getElementById("edition").textContent = `Katalog · ${AY_UZUN[now.getMonth()]} ${now.getFullYear()}`;

  // Katalog numarası: en eski proje No. 01
  function number() {
    projects
      .map((p, i) => ({ p, i }))
      .sort((a, b) => (a.p.date || "").localeCompare(b.p.date || "") || a.i - b.i)
      .forEach(({ p }, k) => (p.no = pad(k + 1)));
  }

  function linksOf(p) {
    if (p.links) return p.links;
    const out = [];
    const live = p.live || (p.repo ? `https://blitzhan.github.io/${p.repo}/` : null);
    if (live) out.push({ label: "Aç", url: live, primary: true });
    if (p.repo) out.push({ label: "Kod", url: `https://github.com/BlitzHan/${p.repo}` });
    return out;
  }

  const ARROW = '<svg class="arr" viewBox="0 0 12 12" aria-hidden="true"><path d="M3.5 8.5l5-5M4.5 3.5h4v4"/></svg>';

  function cover(p) {
    return `<div class="cover"><span class="cover-no mono">No. ${p.no}</span><span class="cover-name">${esc(p.name)}</span></div>`;
  }

  function entry(p) {
    const links = linksOf(p);
    const main = links.find((l) => l.primary);
    // Kapak her zaman altta durur; görsel yüklenemezse kaldırılır ve kapak görünür
    const shotInner =
      cover(p) +
      (p.img
        ? `<img${p.fit === "contain" ? ' class="contain"' : ""} src="${esc(p.img)}" alt="${esc(p.name)} ekran görüntüsü" width="1280" height="800" loading="lazy" decoding="async" onerror="this.remove()">`
        : "");
    const shot = main
      ? `<a class="shot" href="${esc(main.url)}"${tgt(main.url)} tabindex="-1" aria-hidden="true">${shotInner}</a>`
      : `<div class="shot">${shotInner}</div>`;
    const title = main
      ? `<a href="${esc(main.url)}"${tgt(main.url)}>${esc(p.name)}</a>`
      : esc(p.name);
    const actions = links
      .map((l) => `<a class="${l.primary ? "go" : "sub"}" href="${esc(l.url)}"${tgt(l.url)}>${esc(l.label)}${isExt(l.url) && l.primary ? ARROW : ""}</a>`)
      .join("");
    return `<article class="entry" id="p-${p.no}">
      ${shot}
      <div class="entry-meta mono"><span>No. ${p.no}</span>${p.note ? `<span class="note">${esc(p.note)}</span>` : ""}<time datetime="${esc(p.date)}">${fmtDate(p.date)}</time></div>
      <h3>${title}</h3>
      <p>${esc(p.desc)}</p>
      <div class="entry-links">${actions}</div>
    </article>`;
  }

  function months() {
    const first = projects.map((p) => p.date).filter(Boolean).sort()[0] || thisMonth;
    const out = [];
    let [y, m] = first.split("-").map(Number);
    const [ey, em] = thisMonth.split("-").map(Number);
    while (y < ey || (y === ey && m <= em)) {
      out.push(`${y}-${pad(m)}`);
      if (++m > 12) { m = 1; y++; }
    }
    return out.slice(-18);
  }

  function renderLedger() {
    const ms = months();
    const latest = projects.reduce((a, b) => (Number(b.no) > Number(a.no) ? b : a), projects[0]);
    document.getElementById("ledger-sum").textContent = `${projects.length} proje · ${ms.length} ay`;
    const el = document.getElementById("ledger");
    el.style.setProperty("--cols", ms.length);
    el.innerHTML = ms
      .map((ym, i) => {
        const list = projects.filter((p) => p.date === ym).sort((a, b) => Number(a.no) - Number(b.no));
        const showYear = i === 0 || ym.endsWith("-01");
        const dots = list.length
          ? list
              .map(
                (p) =>
                  `<a class="dot${p === latest ? " latest" : ""}" href="#p-${p.no}" data-jump="${p.no}" aria-label="No. ${p.no}, ${esc(p.name)}"><span class="mono">${p.no}</span><em class="tip">${esc(p.name)}</em></a>`
              )
              .join("")
          : `<span class="empty" aria-hidden="true"></span>`;
        return `<div class="col${ym === thisMonth ? " now" : ""}">
          <div class="stack">${dots}</div>
          <div class="mlabel mono">${AY[Number(ym.slice(5)) - 1]}${showYear ? `<b>${ym.slice(0, 4)}</b>` : ""}</div>
        </div>`;
      })
      .join("");
  }

  let active = "hepsi";

  function renderCatalog() {
    const cats = CATS.filter((c) => projects.some((p) => p.cat === c.id));
    const tab = (id, label, n) =>
      `<button type="button" data-id="${id}" aria-pressed="${active === id}">${esc(label)}<span class="mono">${pad(n)}</span></button>`;
    document.getElementById("filters").innerHTML =
      tab("hepsi", "Hepsi", projects.length) +
      cats.map((c) => tab(c.id, c.name, projects.filter((p) => p.cat === c.id).length)).join("");

    document.getElementById("sections").innerHTML = cats
      .filter((c) => active === "hepsi" || active === c.id)
      .map((c) => {
        const list = projects.filter((p) => p.cat === c.id).sort((a, b) => Number(b.no) - Number(a.no));
        return `<section class="cat" id="k-${c.id}">
          <header class="cat-head">
            <h2>${esc(c.name)}</h2>
            <span class="rule" aria-hidden="true"></span>
            <span class="mono cat-count">${pad(list.length)}</span>
          </header>
          <p class="cat-blurb">${esc(c.blurb)}</p>
          <div class="entries">${list.map(entry).join("")}</div>
        </section>`;
      })
      .join("");
  }

  function render() {
    number();
    renderLedger();
    renderCatalog();
  }

  document.getElementById("filters").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-id]");
    if (!b) return;
    active = b.dataset.id;
    renderCatalog();
    const bar = document.getElementById("katalog");
    if (bar.getBoundingClientRect().top < 0) bar.scrollIntoView({ block: "start" });
  });

  document.getElementById("ledger").addEventListener("click", (e) => {
    const a = e.target.closest("a[data-jump]");
    if (!a) return;
    e.preventDefault();
    if (active !== "hepsi") { active = "hepsi"; renderCatalog(); }
    const card = document.getElementById(`p-${a.dataset.jump}`);
    if (!card) return;
    card.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
    card.classList.remove("flash");
    void card.offsetWidth;
    card.classList.add("flash");
  });

  render();

  // GitHub'da listede olmayan, herkese açık ve yayında olan yeni repoları bul
  const pretty = (n) => n.replace(/[-_]+/g, " ").replace(/^\w/, (c) => c.toUpperCase());
  const ctrl = new AbortController();
  setTimeout(() => ctrl.abort(), 6000);
  fetch(`https://api.github.com/users/${window.GITHUB_USER}/repos?per_page=100&type=owner`, { signal: ctrl.signal })
    .then((r) => (r.ok ? r.json() : []))
    .then((repos) => {
      const fresh = repos.filter((r) => {
        const n = r.name.toLowerCase();
        return !r.private && !r.fork && !r.archived && (r.has_pages || r.homepage) && !known.has(n) && !hidden.has(n);
      });
      if (!fresh.length) return;
      fresh.forEach((r) => {
        const topicCat = (r.topics || []).find((t) => CATS.some((c) => c.id === t));
        projects.push({
          cat: topicCat || NEW.id,
          name: pretty(r.name),
          repo: r.name,
          date: (r.created_at || "").slice(0, 7),
          desc: r.description || "",
          live: r.homepage || null,
        });
      });
      if (projects.some((p) => p.cat === NEW.id)) CATS.unshift(NEW);
      render();
    })
    .catch(() => {});
})();
