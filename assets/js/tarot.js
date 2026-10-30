(function () {
  var d = document;
  var CA = "51Z8YyKGgKvQFeb79PJrPANAzMNJ4edmaaoVSnY5pump";

  var toast = d.getElementById("cd-toast");
  var tTimer = null;
  function notify(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(tTimer);
    tTimer = setTimeout(function () { toast.classList.remove("show"); }, 2500);
  }

  d.querySelectorAll("[data-copy]").forEach(function (b) {
    b.addEventListener("click", function () {
      var v = b.getAttribute("data-copy") || CA;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(v);
      }
      notify("ARCANA SEAL CA COPIED: " + v.slice(0, 6) + "..." + v.slice(-6));
      var orig = b.textContent;
      b.textContent = "COPIED ✓";
      setTimeout(function () { b.textContent = orig; }, 1600);
    });
  });

  var aImg = d.getElementById("cd-altar-img");
  var aTag = d.getElementById("cd-altar-tag");
  var pills = d.querySelectorAll("[data-cd-img]");
  pills.forEach(function (p) {
    p.addEventListener("click", function () {
      if (aImg) aImg.setAttribute("src", p.getAttribute("data-cd-img"));
      if (aTag) aTag.textContent = p.getAttribute("data-cd-label");
      pills.forEach(function (x) { x.classList.toggle("active", x === p); });
    });
  });

  // Interactive 3-Card Tarot Spread Shuffle
  var PROPHECIES = [
    "THE CARDS HAVE SPOKEN: WEAK HANDS FOLD IN THE DARK; THE SEER HOLDS UNTIL THE MOON.",
    "ARCANA VERDICT: TEN RINGS ON TEN FINGERS — ZERO TAX, ZERO FEAR, PURE CONVICTION.",
    "MARSEILLE ORACLE: THE PURPLE SILK WAISTCOAT NEVER LIES. GRADUATION IS WRITTEN."
  ];
  var drawBtn = d.getElementById("cd-draw-btn");
  var oracleOut = d.getElementById("cd-oracle-out");
  var drawCount = 0;
  if (drawBtn) {
    drawBtn.addEventListener("click", function () {
      drawCount++;
      var msg = PROPHECIES[drawCount % PROPHECIES.length];
      if (oracleOut) oracleOut.textContent = msg;
      notify("TAROT PROPHECY DRAWN (#" + drawCount + ")");
    });
  }

  d.querySelectorAll(".cd-ba").forEach(function (ba) {
    var r = ba.querySelector(".cd-ba-range");
    if (!r) return;
    var up = function () { ba.style.setProperty("--pos", r.value + "%"); };
    r.addEventListener("input", up);
    up();
  });

  fetch("https://api.dexscreener.com/latest/dex/tokens/" + CA)
    .then(function (r) { return r.json(); })
    .then(function (j) {
      var p = (j && j.pairs && j.pairs[0]) || null;
      if (!p) return;
      var pr = d.getElementById("cd-price");
      var mc = d.getElementById("cd-mcap");
      if (pr && p.priceUsd) pr.textContent = "$" + p.priceUsd;
      if (mc && (p.marketCap || p.fdv)) mc.textContent = "$" + Number(p.marketCap || p.fdv).toLocaleString("en-US", { maximumFractionDigits: 0 });
    })
    .catch(function () {});
})();
