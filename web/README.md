# Vitamin Village — Plates (game source)

`index.html` is the whole game: a self-contained page (data, avatar parts, the plate round,
team and grown-ups tabs) with no build step and no network use. It is the baseline for the
app going forward and replaces the storefront's village prototype. Keep it here, in the
private app repo; do not copy it into the public storefront repo.

- Preview: `cd web && python3 -m http.server 8080` → http://localhost:8080/
- The Capacitor shell copies it into `www/` (`npm run prepare-www` — point the script at this
  folder) and adds `native/native.js` for haptics.
- Progress keys (localStorage): vv-discovered, vvv-cooked, vv-avatar, vv-space, vv-plates,
  vv-gear, vv-team, vv-shop-done. Character ids never change; names may.
