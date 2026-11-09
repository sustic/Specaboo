# Specaboo ghost

The Geometric ghost with a simple mouth and arms. It is always a white sheet with a dark outline, in light and dark mode.

- `index.html`: all 100 moods on one page. Click a mood to copy its SVG.
- `live.html`: one ghost that plays a mood, then morphs into a random new one, forever.
- `svg/`: the 100 moods as standalone animated SVG files. Each loops for 1 to 3 seconds and works in any browser or `<img>` tag.
- `ghostkit.js`: draws the ghost with any combination of eyes, mouth, arms and extras. `GhostKit.svg({ eyes, mouth, arms, extras, motion, d })` returns an SVG string; `motion` is the body loop and `d` its length in seconds. Call `GhostKit.injectCss()` once on a page to make the ghosts move. For morphing, `GhostKit.pose(name)` gives a pose's arm points, and `svg()` takes `armPts`, `face`, `xop` and `squish` options to draw in-between frames (see `live.html`).
- `moods.js`: the list of 100 moods as `[name, group, eyes, mouth, arms, extras, options]`, plus the motion and loop length for each. `moodSpec(mood)` turns an entry into a spec for `GhostKit.svg`.

The editor in `../index.html` uses the same kit. The ghost smiles when idle, types along while you write, cheers when your page is saved and says boo when you click it.
