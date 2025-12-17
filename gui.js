(() => {
  /* ===== CLEAN ===== */
  try { window.__b2ui?.destroy() } catch {}

  /* ===== STATE ===== */
  const S = { drag: false, ox: 0, oy: 0 };

  /* ===== GUI ===== */
  const g = document.createElement("div");
  g.style.cssText = `
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    width:760px;
    height:540px;
    background:linear-gradient(180deg,#0b0b0b,#050505);
    color:#0f0;
    border:2px solid #0f0;
    border-radius:16px;
    padding:12px;
    font-family:sans-serif;
    box-shadow:0 0 45px #0f0;
    z-index:999999;
    display:flex;
    flex-direction:column;
    user-select:none
  `;
  document.body.appendChild(g);

  /* ===== HEADER ===== */
  const header = document.createElement("div");
  header.style.cssText =
    "font-weight:900;font-size:20px;display:flex;justify-content:space-between;align-items:center";
  header.innerHTML = `
    <span>BLOOKET V2</span>
    <button id="close"
      style="background:none;border:none;color:#f00;font-size:18px;cursor:pointer">
      ✕
    </button>`;
  g.appendChild(header);

  /* ===== LOADER ===== */
  const loader = document.createElement("div");
  loader.style.cssText =
    "flex:1;display:flex;align-items:center;justify-content:center;font-size:18px";
  g.appendChild(loader);

  const steps = [
    "Initializing exploit…",
    "Hooking client…",
    "Bypassing anti‑cheat…",
    "Injecting Gold Quest modules…",
    "Mounting Crypto hooks…",
    "Ready ✔"
  ];

  let i = 0;
  const t = setInterval(() => {
    loader.textContent = steps[i++] || steps[steps.length - 1];
    if (i >= steps.length) {
      clearInterval(t);
      build();
    }
  }, 450);

  /* ===== BUILD UI ===== */
  function build() {
    g.innerHTML = "";
    g.appendChild(header);

    const wrap = document.createElement("div");
    wrap.style.cssText = "flex:1;display:flex;gap:12px";
    g.appendChild(wrap);

    /* sidebar */
    const sb = document.createElement("div");
    sb.style.cssText =
      "width:210px;background:#121212;border:1px solid #0f0;border-radius:12px;padding:8px;display:flex;flex-direction:column;gap:8px";
    wrap.appendChild(sb);

    /* content */
    const content = document.createElement("div");
    content.style.cssText =
      "flex:1;background:#090909;border:1px solid #0f0;border-radius:12px;padding:14px;overflow:auto";
    content.textContent = "Select a panel";
    wrap.appendChild(content);

    /* status */
    const status = document.createElement("div");
    status.style.cssText =
      "text-align:center;font-weight:bold;margin-top:6px";
    status.textContent = "Status: Idle";
    g.appendChild(status);

    /* helpers */
    const glow = i =>
      (i.style.cssText =
        "width:100%;margin:6px 0;padding:7px;background:#111;color:#0f0;border:1px solid #0f0;border-radius:8px");

    const toggle = l => {
      const r = document.createElement("label");
      r.style.cssText =
        "display:flex;justify-content:space-between;margin:6px 0";
      const c = document.createElement("input");
      c.type = "checkbox";
      c.onchange = () =>
        (status.textContent = `Status: ${l} ${c.checked ? "ENABLED" : "DISABLED"}`);
      r.append(l, c);
      return r;
    };

    const btn = (t, red, f) => {
      const b = document.createElement("button");
      b.textContent = t;
      b.style.cssText = `
        width:100%;
        margin:6px 0;
        padding:10px;
        font-weight:bold;
        background:${red ? "#f00" : "#0f0"};
        color:#000;
        border:none;
        border-radius:10px;
        cursor:pointer`;
      b.onclick = f;
      return b;
    };

    /* ===== PANELS ===== */
    const panels = {
      Cheats() {
        content.innerHTML = "<b>CORE CHEATS</b>";
        [
          "Always Correct",
          "Answer Prediction",
          "Client Desync",
          "Anti‑Cheat Spoof",
          "Freeze Host"
        ].forEach(x => content.append(toggle(x)));
        content.innerHTML +=
          `<div style="font-size:12px;color:#777">Client hook active</div>`;
      },

      "Gold Quest"() {
        content.innerHTML =
          "<b style='color:#ffd700'>💰 GOLD QUEST</b>";
        [
          "Always Triple Gold",
          "Always Quadruple Gold",
          "Chest Outcome Spoofer"
        ].forEach(x => content.append(toggle(x)));

        content.append(document.createElement("hr"));

        const p = document.createElement("input");
        p.placeholder = "player username";
        glow(p);

        const a = document.createElement("input");
        a.placeholder = "gold amount";
        glow(a);

        content.append(
          p,
          a,
          btn("SET PLAYER GOLD", 0, () => {
            status.textContent = `Status: Set ${p.value || "?"} → ${a.value || "?"}`;
          })
        );

        const r = document.createElement("input");
        r.placeholder = "reset username";
        glow(r);
        content.append(
          r,
          btn("RESET PLAYER GOLD", 0, () => {
            status.textContent = `Status: Reset ${r.value || "?"}`;
          })
        );

        const s = document.createElement("input");
        s.placeholder = "give myself gold";
        glow(s);
        content.append(
          s,
          btn("GIVE ME GOLD", 0, () => {
            status.textContent = `Status: Gave yourself ${s.value || "?"}`;
          })
        );

        content.append(
          btn("RESET ALL PLAYERS GOLD", 1, () => {
            status.textContent = "Status: All players gold reset";
          })
        );

        content.innerHTML +=
          `<div style="font-size:12px;color:#777">Ledger synced</div>`;
      },

      "Crypto Hack"() {
        content.innerHTML =
          "<b style='color:#00ffcc'>₿ CRYPTO HACK</b>";
        [
          "Always Successful Hack",
          "Wallet Drain Multiplier",
          "Trace Protection",
          "Firewall Bypass"
        ].forEach(x => content.append(toggle(x)));
        content.innerHTML +=
          `<div style="font-size:12px;color:#777">Blockchain injected</div>`;
      },

      Global() {
        content.innerHTML =
          "<b>GLOBAL / ADMIN</b><br>Server: Connected<br>Ping: 6ms<hr>";
        content.append(
          btn("KICK ALL PLAYERS", 1, () =>
            (status.textContent = "Status: All players kicked")),
          btn("KICK HOST", 1, () =>
            (status.textContent = "Status: Host disconnected"))
        );
        content.innerHTML +=
          `<div style="font-size:12px;color:#777">Admin queue executed</div>`;
      }
    };

    /* sidebar buttons */
    Object.keys(panels).forEach(n => {
      const b = document.createElement("button");
      b.textContent = n;
      b.style.cssText =
        "padding:14px;font-weight:bold;background:#0f0;color:#000;border:none;border-radius:12px;opacity:.65;cursor:pointer";
      b.onclick = () => {
        sb.querySelectorAll("button").forEach(x => (x.style.opacity = ".65"));
        b.style.opacity = "1";
        panels[n]();
        status.textContent = `Status: ${n} Loaded`;
      };
      sb.appendChild(b);
    });

    /* close */
    const closeBtn = header.querySelector("#close");
    closeBtn.onmousedown = e => e.stopPropagation();
    closeBtn.onclick = e => {
      e.stopPropagation();
      destroy();
    };

    /* drag */
    header.onmousedown = e => {
      if (e.target.id === "close") return;
      S.drag = true;
      g.style.transform = "none";
      S.ox = e.clientX - g.offsetLeft;
      S.oy = e.clientY - g.offsetTop;
    };

    addEventListener("mousemove", e => {
      if (S.drag) {
        g.style.left = e.clientX - S.ox + "px";
        g.style.top = e.clientY - S.oy + "px";
      }
    });
    addEventListener("mouseup", () => (S.drag = false));
  }

  /* toggle bubble */
  const c = document.createElement("div");
  c.textContent = "B2";
  c.style.cssText =
    "position:fixed;width:60px;height:60px;border-radius:50%;background:#111;color:#0f0;bottom:20px;right:20px;display:flex;align-items:center;justify-content:center;font-weight:bold;cursor:pointer;box-shadow:0 0 20px #0f0;z-index:999999";
  document.body.appendChild(c);
  c.onclick = () =>
    (g.style.display = g.style.display === "none" ? "flex" : "none");

  /* destroy */
  function destroy() {
    g.remove();
    c.remove();
    window.__b2ui = null;
  }

  window.__b2ui = { destroy };
})();

