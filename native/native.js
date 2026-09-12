/* Vitamin Village — native bridge
   ==============================
   Loaded after the game script. Adds two things the web version doesn't have:

   1. HAPTICS: a gentle tap when a new buddy pair is discovered, and a stronger
      "success" buzz when the badge book is complete. Uses the Capacitor Haptics
      plugin on iOS; on the plain web it does nothing.

   2. PERSISTENT PROGRESS: the discovered set is saved on the device and restored
      when the app reopens, so a child doesn't lose their badges between sessions.
      Storage is localStorage inside the app's own WebView; nothing leaves the phone.

   It works by wrapping the game's own global functions (updateProgress,
   openCelebration) rather than editing them, so the game file stays identical to
   the web version and can be refreshed from the storefront repo at any time.
*/
(function () {
  "use strict";

  /* ---------- haptics ---------- */
  var Haptics = null;
  try {
    if (window.Capacitor && typeof window.Capacitor.registerPlugin === "function" &&
        window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) {
      Haptics = window.Capacitor.registerPlugin("Haptics");
    }
  } catch (e) { Haptics = null; }

  function tap()     { if (Haptics) Haptics.impact({ style: "MEDIUM" }).catch(function () {}); }
  function success() { if (Haptics) Haptics.notification({ type: "SUCCESS" }).catch(function () {}); }

  /* ---------- persistence ---------- */
  var KEY = "vitamin-village.discovered.v1";
  var store = null;
  try { store = window.localStorage; store.getItem(KEY); } catch (e) { store = null; }

  function save() {
    if (!store || typeof discovered === "undefined") return;
    try { store.setItem(KEY, JSON.stringify(Array.from(discovered))); } catch (e) {}
  }
  function restore() {
    if (!store || typeof discovered === "undefined") return;
    var raw = null;
    try { raw = store.getItem(KEY); } catch (e) {}
    if (!raw) return;
    var list = [];
    try { list = JSON.parse(raw); } catch (e) { return; }
    if (!Array.isArray(list)) return;
    list.forEach(function (k) { if (typeof k === "string") discovered.add(k); });
    // If the badge book was already complete, don't replay the graduation on every launch.
    if (typeof BUDDY_KEYS !== "undefined" && discovered.size >= BUDDY_KEYS.length) {
      window._celebrationShown = true;
    }
  }

  /* ---------- wrap the game's functions ---------- */
  var lastCount = 0;

  if (typeof window.updateProgress === "function") {
    var origUpdate = window.updateProgress;
    window.updateProgress = function () {
      var before = lastCount;
      var result = origUpdate.apply(this, arguments);
      var now = (typeof discovered !== "undefined") ? discovered.size : before;
      if (now > before) { tap(); save(); }
      lastCount = now;
      return result;
    };
  }

  if (typeof window.openCelebration === "function") {
    var origCelebrate = window.openCelebration;
    window.openCelebration = function () {
      success();
      return origCelebrate.apply(this, arguments);
    };
  }

  /* ---------- boot ---------- */
  restore();
  if (typeof discovered !== "undefined") lastCount = discovered.size;
  if (typeof window.updateProgress === "function") {
    try { window.updateProgress(); } catch (e) {}
  }

  // Exposed for the grown-ups screen or debugging: VVNative.reset() clears saved progress.
  window.VVNative = {
    reset: function () { try { store && store.removeItem(KEY); } catch (e) {} },
    hasHaptics: !!Haptics
  };
})();
