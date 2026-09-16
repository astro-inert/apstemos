const GUIDE_PATH = "/latex-master-sheet";

function enhanceFormulaGuide() {
  if (typeof window === "undefined" || window.location.pathname !== GUIDE_PATH) return;
  const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
  const main = document.querySelector<HTMLElement>("main[data-formula-guide-main]");
  const nav = document.querySelector<HTMLElement>('nav[aria-label="Guide sections"]');
  if (!main || !nav || sections.length === 0 || main.dataset.enhanced === "true") return;
  main.dataset.enhanced = "true";
  document.documentElement.classList.add("formula-guide-active");

  // Small source-preserving cleanup of two awkward phrases in the original sheet.
  main.querySelectorAll<HTMLElement>("article").forEach((article) => {
    if (article.textContent?.includes("for trig integrals, you can memorize sin and cos and derive the rest")) {
      article.querySelectorAll<HTMLElement>("span").forEach((node) => {
        if (node.childNodes.length === 1 && node.firstChild?.nodeType === Node.TEXT_NODE) {
          node.textContent = node.textContent?.replace("for trig integrals, you can memorize sin and cos and derive the rest", "for trig derivatives, you can memorize sin and cos and derive the rest") ?? "";
        }
      });
    }
  });

  const toolbar = document.createElement("div");
  toolbar.className = "formula-guide-toolbar";
  toolbar.innerHTML = `
    <label class="formula-guide-search-wrap">
      <span class="sr-only">Search the formula guide</span>
      <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
      <input type="search" inputmode="search" autocomplete="off" placeholder="Search formulas, theorems, topics…" aria-label="Search the formula guide" />
    </label>
    <div class="formula-guide-actions">
      <button type="button" data-action="collapse">Collapse all</button>
      <button type="button" data-action="expand">Expand all</button>
    </div>
    <div class="formula-guide-result" aria-live="polite"></div>`;
  main.prepend(toolbar);

  const input = toolbar.querySelector<HTMLInputElement>("input")!;
  const result = toolbar.querySelector<HTMLElement>(".formula-guide-result")!;
  const articles = Array.from(main.querySelectorAll<HTMLElement>("section article"));

  articles.forEach((article, index) => {
    article.dataset.guideCard = String(index);
    const heading = article.querySelector<HTMLElement>("h3");
    if (!heading) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "formula-guide-toggle";
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-label", `Collapse ${heading.textContent ?? "section"}`);
    button.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>';
    heading.appendChild(button);
    button.addEventListener("click", () => setCollapsed(article, !article.classList.contains("is-collapsed")));

    const link = document.createElement("button");
    link.type = "button";
    link.className = "formula-guide-copy-link";
    link.textContent = "link";
    link.setAttribute("aria-label", `Copy link to ${heading.textContent ?? "this formula"}`);
    link.addEventListener("click", async () => {
      const parent = article.closest<HTMLElement>("section[id]");
      if (!parent) return;
      const url = `${window.location.origin}${window.location.pathname}#${parent.id}`;
      try {
        await navigator.clipboard?.writeText(url);
        link.textContent = "copied";
        window.setTimeout(() => (link.textContent = "link"), 1200);
      } catch {
        window.location.hash = parent.id;
      }
    });
    heading.appendChild(link);
  });

  function setCollapsed(article: HTMLElement, collapsed: boolean) {
    article.classList.toggle("is-collapsed", collapsed);
    const toggle = article.querySelector<HTMLButtonElement>(".formula-guide-toggle");
    toggle?.setAttribute("aria-expanded", String(!collapsed));
    if (toggle) toggle.setAttribute("aria-label", `${collapsed ? "Expand" : "Collapse"} ${article.querySelector("h3")?.textContent?.replace(/link$/, "").trim() ?? "section"}`);
  }

  toolbar.querySelector<HTMLButtonElement>('[data-action="collapse"]')?.addEventListener("click", () => articles.filter((a) => !a.hidden).forEach((a) => setCollapsed(a, true)));
  toolbar.querySelector<HTMLButtonElement>('[data-action="expand"]')?.addEventListener("click", () => articles.filter((a) => !a.hidden).forEach((a) => setCollapsed(a, false)));

  input.addEventListener("input", () => {
    const q = input.value.trim().toLocaleLowerCase();
    let matches = 0;
    sections.forEach((section) => {
      let sectionMatches = 0;
      section.querySelectorAll<HTMLElement>("article").forEach((article) => {
        const show = !q || (article.textContent ?? "").toLocaleLowerCase().includes(q);
        article.hidden = !show;
        if (show) { matches += 1; sectionMatches += 1; }
      });
      section.hidden = !!q && sectionMatches === 0;
    });
    result.textContent = q ? `${matches} ${matches === 1 ? "result" : "results"}` : "";
  });

  const navLinks = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${visible.target.id}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-18% 0px -68% 0px", threshold: 0 });
  sections.forEach((section) => observer.observe(section));

  const progress = document.createElement("div");
  progress.className = "formula-guide-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.appendChild(progress);
  const updateProgress = () => {
    if (window.location.pathname !== GUIDE_PATH) { progress.remove(); return; }
    const rect = main.getBoundingClientRect();
    const total = Math.max(1, main.scrollHeight - window.innerHeight * 0.65);
    const passed = Math.min(total, Math.max(0, -rect.top + 120));
    progress.style.setProperty("--guide-progress", `${(passed / total) * 100}%`);
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
}

export function installFormulaGuideEnhancer() {
  if (typeof window === "undefined") return () => {};
  let frame = 0;
  const run = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(enhanceFormulaGuide); };
  run();
  const observer = new MutationObserver(run);
  observer.observe(document.body, { childList: true, subtree: true });
  window.addEventListener("popstate", run);
  return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("popstate", run); document.documentElement.classList.remove("formula-guide-active"); };
}
