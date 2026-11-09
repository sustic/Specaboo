# Specaboo ghost

The Geometric ghost with a simple mouth and arms. It is always a white sheet with a dark outline, in light and dark mode.

- `index.html`: all 100 moods on one page. Click a mood to copy its SVG.
- `svg/`: the 100 moods as standalone SVG files.
- `ghostkit.js`: draws the ghost with any combination of eyes, mouth, arms and extras. `GhostKit.svg({ eyes, mouth, arms, extras })` returns an SVG string.
- `moods.js`: the list of 100 moods as `[name, group, eyes, mouth, arms, extras, options]`.

The editor in `../index.html` uses the same kit. The ghost smiles when idle, types along while you write, cheers when your page is saved and says boo when you click it.
