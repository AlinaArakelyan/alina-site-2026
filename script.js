const $ = (sel) => document.querySelector(sel);

const toast = (msg) => {
  const el = $("#toast");
  if (!el) return;
  el.textContent = msg;
  el.style.opacity = "1";
  clearTimeout(toast._t);
  toast._t = setTimeout(() => (el.style.opacity = "0"), 1800);
};

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

(function initYear(){
  const y = new Date().getFullYear();
  const el = $("#year");
  if (el) el.textContent = String(y);
})();

(function theme(){
  const saved = localStorage.getItem("theme");
  if (saved) document.documentElement.dataset.theme = saved;

  const icon = $("#themeIcon");
  const setIcon = () => {
    const isLight = document.documentElement.dataset.theme === "light";
    if (icon) icon.textContent = isLight ? "☀" : "☾";
  };
  setIcon();

  $("#toggleTheme")?.addEventListener("click", () => {
    const cur = document.documentElement.dataset.theme;
    const next = cur === "light" ? "" : "light";
    if (next) document.documentElement.dataset.theme = next;
    else delete document.documentElement.dataset.theme;

    localStorage.setItem("theme", next || "");
    setIcon();
  });
})();

(function tilt(){
  const card = $("#tiltCard");
  if (!card) return;

  const onMove = (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (0.5 - y) * 10;
    const ry = (x - 0.5) * 10;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  };

  const reset = () => { card.style.transform = ""; };

  card.addEventListener("mousemove", onMove);
  card.addEventListener("mouseleave", reset);
  card.addEventListener("touchend", reset, { passive: true });
})();

(function vibe(){
  const btn = $("#vibeBtn");
  const fill = $("#vibeFill");
  const val = $("#vibeValue");
  if (!btn || !fill || !val) return;

  let vibe = 92;

  btn.addEventListener("click", () => {
    // If already maxed, re-open llama every time
    if (vibe >= 100) {
      vibe = 100;
      fill.style.width = `100%`;
      val.textContent = `100%`;
      toast("100% vibe 🦙✨");
      sparkleBurst();
      if (window.__openLlamaEasterEgg) window.__openLlamaEasterEgg();
      return;
    }

    const bump = Math.floor(Math.random() * 6) + 1;
    vibe = clamp(vibe + bump, 0, 100);
    fill.style.width = `${vibe}%`;
    val.textContent = `${vibe}%`;
    toast(`Vibe boosted to ${vibe}% ✨`);
    sparkleBurst();

    // Easter egg
    if (vibe === 100 && !window.__llamaUnlocked) {
      window.__llamaUnlocked = true;
      setTimeout(() => {
        toast("100% vibe unlocked 🦙✨");
        if (window.__openLlamaEasterEgg) window.__openLlamaEasterEgg();
      }, 350);
    }
  });

  function sparkleBurst(){
    const n = 18;
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.textContent = Math.random() > 0.5 ? "✦" : "✧";
      s.style.position = "fixed";
      s.style.left = `${window.innerWidth * (0.58 + Math.random() * 0.18)}px`;
      s.style.top = `${window.innerHeight * (0.20 + Math.random() * 0.20)}px`;
      s.style.pointerEvents = "none";
      s.style.opacity = "1";
      s.style.fontSize = `${10 + Math.random() * 18}px`;
      s.style.transform = "translate(-50%,-50%)";
      s.style.transition = "transform 700ms ease, opacity 700ms ease";
      document.body.appendChild(s);

      requestAnimationFrame(() => {
        const dx = (Math.random() - 0.5) * 160;
        const dy = (Math.random() - 0.5) * 160;
        s.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${Math.random() * 120}deg)`;
        s.style.opacity = "0";
      });

      setTimeout(() => s.remove(), 750);
    }
  }
})();


(function copyStuff(){
  const email = "alinaarakelyan90@gmail.com";
  const site = "https://alinaarakelyan.com";

  $("#copyEmail")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast("Email copied 💌");
    } catch {
      toast("Copy blocked — long-press/select instead");
    }
  });

  $("#copyLink")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(site);
      toast("Link copied 🔗");
    } catch {
      toast("Copy blocked — long-press/select instead");
    }
  });

  const emailBtn = $("#emailBtn");
  if (emailBtn) emailBtn.href = `mailto:${email}`;
})();

(function cutenessModal(){
    const openBtn = document.getElementById("openCuteness");
    const modal = document.getElementById("cutenessModal");
    const closeBtn = document.getElementById("closeCuteness");
  
    if (!openBtn || !modal || !closeBtn) return;
  
    let lastFocus = null;
  
    const open = () => {
      lastFocus = document.activeElement;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      closeBtn.focus();
      document.body.style.overflow = "hidden";
    };
  
    const close = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
  
    openBtn.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
  
    modal.addEventListener("click", (e) => {
      if (e.target && e.target.dataset && e.target.dataset.close === "true") close();
    });
  
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) close();
    });
  })();

  (function flipCard(){
    const card = document.getElementById("aboutFlip");
    if (!card) return;
  
    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
    });
  })();

  (function llamaEasterEgg(){
    const modal = document.getElementById("llamaModal");
    const closeBtn = document.getElementById("closeLlama");
  
    if (!modal || !closeBtn) return;
  
    let lastFocus = null;
  
    const open = () => {
      lastFocus = document.activeElement;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      closeBtn.focus();
      document.body.style.overflow = "hidden";
    };
  
    const close = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };
  
    closeBtn.addEventListener("click", close);
  
    modal.addEventListener("click", (e) => {
      if (e.target && e.target.dataset && e.target.dataset.closeLlama === "true") close();
    });
  
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) close();
    });
  
    window.__openLlamaEasterEgg = open;
  })();

  (function portraitFlip(){
    const btn = document.getElementById("portraitFlip");
    if (!btn) return;
  
    btn.addEventListener("click", () => {
      btn.classList.toggle("is-flipped");
    });
  })();
  const topbar = document.querySelector(".topbar");
  const onScroll = () => topbar.classList.toggle("is-scrolled", window.scrollY > 4);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  
  
    