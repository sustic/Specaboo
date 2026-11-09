// Specaboo ghost kit: draws the Geometric ghost with any expression.
// White body, dark outline and dark features in every theme. Floating text extras use currentColor.
const GhostKit = (() => {
  const RED = "var(--gk-red, #fb5151)", BLUE = "var(--gk-blue, #36a2eb)", GREEN = "var(--gk-green, #4cc07c)";
  // The ghost itself never changes with the theme: white sheet, dark outline.
  const INK = "var(--gk-ink, #1a1a1a)", WHITE = "var(--gk-body, #ffffff)";
  const FRONT = new Set(["face", "peek", "cheeks", "mouth", "think", "cross", "facepalm", "heart", "clap", "typing", "pray", "rub"]);
  const BODY = "M20 92V48a30 30 0 0 1 60 0v44a10 10 0 0 1-20 0a10 10 0 0 1-20 0a10 10 0 0 1-20 0Z";
  const EL = [39.5, 47], ER = [60.5, 47];
  let uid = 0;

  // ---- eyes: return [maskMarkup (black = hole, white = solid), topMarkup (coloured)] ----
  const S = (d, w = 3.4) => `<path d="${d}" fill="none" stroke="#000" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  function eye(type, cx, cy, side) {
    const o = cx + side * 4.5, i = cx - side * 4.5; // outer / inner x
    switch (type) {
      case "open":   return [`<rect x="${cx-4.5}" y="${cy-7}" width="9" height="14" rx="4.5"/>`, ""];
      case "small":  return [`<circle cx="${cx}" cy="${cy}" r="3.4"/>`, ""];
      case "tiny":   return [`<circle cx="${cx}" cy="${cy+1}" r="2.2"/>`, ""];
      case "wide":   return [`<rect x="${cx-5.5}" y="${cy-9}" width="11" height="18" rx="5.5"/>`, ""];
      case "happy":  return [S(`M${cx-5} ${cy+2}Q${cx} ${cy-6} ${cx+5} ${cy+2}`), ""];
      case "down":   return [S(`M${cx-5} ${cy-1}Q${cx} ${cy+5} ${cx+5} ${cy-1}`), ""];
      case "shut":   return [S(`M${cx-5} ${cy+1}H${cx+5}`), ""];
      case "half":   return [`<path d="M${cx-4.5} ${cy}H${cx+4.5}V${cy+3}a4.5 4.5 0 0 1-9 0Z"/>`, ""];
      case "glare":  return [`<rect x="${cx-5.5}" y="${cy-1}" width="11" height="4.5" rx="2.2"/>`, ""];
      case "angry":  return [`<path d="M${o} ${cy-7}L${i} ${cy-2}V${cy+3}Q${i} ${cy+7} ${cx} ${cy+7}Q${o} ${cy+7} ${o} ${cy+3}Z"/>`, ""];
      case "sad":    return [`<path d="M${i} ${cy-7}L${o} ${cy-2}V${cy+3}Q${o} ${cy+7} ${cx} ${cy+7}Q${i} ${cy+7} ${i} ${cy+3}Z"/>`, ""];
      case "chev":   return [S(`M${cx+side*4} ${cy-5}L${cx-side*4} ${cy}L${cx+side*4} ${cy+5}`), ""];
      case "x":      return [S(`M${cx-4} ${cy-4}L${cx+4} ${cy+4}M${cx+4} ${cy-4}L${cx-4} ${cy+4}`), ""];
      case "ring":   return [`<circle cx="${cx}" cy="${cy}" r="5.6" fill="none" stroke="#000" stroke-width="3"/>`, ""];
      case "spiral": return [S(`M${cx} ${cy}m0 0a1.5 1.5 0 0 1 3 0a3 3 0 0 1-6 0a4.5 4.5 0 0 1 9 0`, 2.2), ""];
      case "sparkle":return [`<circle cx="${cx}" cy="${cy}" r="6.2"/><circle cx="${cx+2.2}" cy="${cy-2.2}" r="2" fill="#fff"/><circle cx="${cx-2}" cy="${cy+2.6}" r="1" fill="#fff"/>`, ""];
      case "lookL":  return [`<rect x="${cx-7}" y="${cy-6}" width="9" height="13" rx="4.5"/>`, ""];
      case "lookR":  return [`<rect x="${cx-2}" y="${cy-6}" width="9" height="13" rx="4.5"/>`, ""];
      case "lookU":  return [`<rect x="${cx-4.5}" y="${cy-10}" width="9" height="13" rx="4.5"/>`, ""];
      case "lookD":  return [`<rect x="${cx-4.5}" y="${cy-3}" width="9" height="12" rx="4.5"/>`, ""];
      case "heart":  return ["", heartPath(cx, cy + 1, 7.5, RED)];
      case "star":   return ["", starPath(cx, cy, 7.5, BLUE)];
      case "shades": return ["", ""];
      default: return ["", ""];
    }
  }

  // ---- mouths (mask, black = hole) and coloured tops ----
  function mouth(type) {
    const F = d => `<path d="${d}"/>`;
    switch (type) {
      case "smile":  return [S("M43 64Q50 71 57 64"), ""];
      case "grin":   return [F("M41 62H59Q58 74 50 74Q42 74 41 62Z"), ""];
      case "big":    return [F("M38 60H62Q60 79 50 79Q40 79 38 60Z"), ""];
      case "frown":  return [S("M43 70Q50 63 57 70"), ""];
      case "flat":   return [S("M44 67H56"), ""];
      case "o":      return [`<ellipse cx="50" cy="67" rx="3" ry="3.6"/>`, ""];
      case "O":      return [`<ellipse cx="50" cy="68" rx="6" ry="7.5"/>`, ""];
      case "yawn":   return [`<ellipse cx="50" cy="69" rx="5.5" ry="9"/>`, ""];
      case "wavy":   return [S("M41 67q2.25-3 4.5 0t4.5 0t4.5 0t4.5 0", 3), ""];
      case "smirk":  return [S("M44 67Q52 69 57 62"), ""];
      case "cat":    return [S("M42 64q4 5 8 0q4 5 8 0", 3), ""];
      case "teeth":  return [`<rect x="39" y="61" width="22" height="11" rx="3.5"/><path d="M39 66.5H61M45.5 61V72M50 61V72M54.5 61V72" stroke="#fff" stroke-width="1.6"/>`, ""];
      case "sadO":   return [F("M41 74Q42 62 50 62Q58 62 59 74Z"), ""];
      case "tiny":   return [`<circle cx="50" cy="66" r="1.8"/>`, ""];
      case "kiss":   return [S("M48 61q6 2 0 5q6 2 0 5", 3), ""];
      case "pout":   return [S("M45 69Q50 65 55 69", 3), ""];
      case "tongue": return [S("M42 63Q50 70 58 63"), `<path d="M50 66.5h5v4a2.5 2.5 0 0 1-5 0Z" fill="${RED}"/>`];
      case "lol":    return [F("M41 62H59Q58 74 50 74Q42 74 41 62Z"), `<path d="M44 71Q50 66 56 71Q53 74 50 74Q47 74 44 71Z" fill="${RED}"/>`];
      case "none":   return ["", ""];
      default: return ["", ""];
    }
  }

  // ---- arms: polylines from the shoulder, [left, right] ----
  const D = { L: [24, 64, 12, 80], R: [76, 64, 88, 80] };
  const ARMS = {
    down: [D.L, D.R],
    out: [[24, 63, 6, 60], [76, 63, 94, 60]],
    up: [[24, 62, 9, 38], [76, 62, 91, 38]],
    wave: [D.L, [76, 62, 93, 40]],
    hips: [[24, 62, 9, 70, 19, 80], [76, 62, 91, 70, 81, 80]],
    face: [[22, 74, 40, 49], [78, 74, 60, 49]],
    peek: [[22, 74, 40, 49], D.R],
    cheeks: [[21, 74, 29, 63], [79, 74, 71, 63]],
    mouth: [D.L, [79, 78, 54, 68]],
    shrug: [[24, 64, 9, 67, 7, 52], [76, 64, 91, 67, 93, 52]],
    point: [D.L, [76, 62, 99, 55]],
    pointUp: [D.L, [76, 62, 88, 52, 88, 30]],
    think: [D.L, [80, 80, 60, 80, 56, 74]],
    cross: [[21, 66, 63, 78], [79, 66, 37, 78]],
    facepalm: [D.L, [80, 72, 60, 54, 50, 40]],
    salute: [D.L, [76, 62, 86, 46, 70, 33]],
    heart: [[22, 68, 44, 79], [78, 68, 56, 79]],
    flex: [[24, 64, 7, 58, 11, 42], [76, 64, 93, 58, 89, 42]],
    raise: [D.L, [76, 62, 89, 30]],
    clap: [[21, 68, 47, 76], [79, 68, 53, 76]],
    scratch: [D.L, [76, 62, 92, 40, 76, 20]],
    hug: [[24, 62, 5, 50], [76, 62, 95, 50]],
    typing: [[22, 70, 33, 87], [78, 70, 67, 87]],
    pencil: [D.L, [76, 64, 90, 58]],
    pray: [[21, 70, 48, 62], [79, 70, 52, 62]],
    dance: [[24, 62, 8, 46], [76, 64, 93, 70]],
    zombie: [[24, 60, 4, 56], [76, 60, 96, 56]],
    rub: [[21, 72, 48, 70], [79, 72, 52, 72]],
    none: [[], []],
  };
  const armPath = p => p.length ? "M" + p.join(" ").replace(/(\S+ \S+) /g, "$1L").replace(/L$/, "") : "";

  // ---- extras (coloured or ink) ----
  function heartPath(x, y, s, fill) {
    const k = s / 10;
    return `<path transform="translate(${x} ${y}) scale(${k})" d="M0 8C-9 2-10-4-6-7C-3-9 0-7 0-4C0-7 3-9 6-7C10-4 9 2 0 8Z" fill="${fill}"/>`;
  }
  function starPath(x, y, r, fill) {
    const p = [];
    for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; p.push((x + rr * Math.cos(a)).toFixed(1) + "," + (y + rr * Math.sin(a)).toFixed(1)); }
    return `<polygon points="${p.join(" ")}" fill="${fill}" stroke="${fill}" stroke-width="1" stroke-linejoin="round"/>`;
  }
  const twinkle = (x, y, s, fill) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-5L1.3-1.3L5 0L1.3 1.3L0 5L-1.3 1.3L-5 0L-1.3-1.3Z" fill="${fill}"/>`;
  const drop = (x, y, s, fill) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-6C2 -2 4 0 4 2.5A4 4 0 0 1-4 2.5C-4 0-2-2 0-6Z" fill="${fill}"/>`;
  const txt = (x, y, t, size, fill = "currentColor", w = 700) => `<text x="${x}" y="${y}" font-family="Inter, Arial, sans-serif" font-weight="${w}" font-size="${size}" fill="${fill}" text-anchor="middle">${t}</text>`;
  const line = (d, c = "currentColor", w = 2.6) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

  // Each extra returns a list of parts; every part is wrapped in its own <g> so it can animate.
  const EXTRAS = {
    blush: () => [`<ellipse cx="30" cy="58" rx="5" ry="3" fill="${RED}" opacity=".7"/>`, `<ellipse cx="70" cy="58" rx="5" ry="3" fill="${RED}" opacity=".7"/>`],
    tear: () => [drop(34, 60, .8, BLUE)],
    tears: () => [`<path d="M36 54v26a3 3 0 0 0 6 0V54Z" fill="${BLUE}" opacity=".9"/>`, `<path d="M58 54v26a3 3 0 0 0 6 0V54Z" fill="${BLUE}" opacity=".9"/>`],
    joy: () => [drop(28, 44, .7, BLUE), drop(72, 44, .7, BLUE)],
    sweat: () => [drop(82, 26, 1.1, BLUE)],
    hearts: () => [heartPath(12, 22, 7, RED), heartPath(88, 16, 9, RED), heartPath(92, 36, 5, RED)],
    heart: () => [heartPath(84, 14, 10, RED)],
    heartChest: () => [heartPath(50, 80, 9, RED)],
    broken: () => [`<path transform="translate(84 16)" d="M0 8C-9 2-10-4-6-7C-3-9 0-7 0-4L-2 0L1 3Z" fill="${RED}"/>`, `<path transform="translate(86 17) rotate(10)" d="M1.5 8.5C10 2 10.5-4 6.5-7C3.5-9 1-7 1-4.5L-.5 0L2.5 3Z" fill="${RED}"/>`],
    sparkles: () => [twinkle(10, 26, 1.1, BLUE), twinkle(90, 20, 1.4, BLUE), twinkle(88, 94, .9, BLUE)],
    anger: () => [`<g transform="translate(80 22)" stroke="${RED}" stroke-width="2.6" stroke-linecap="round" fill="none"><path d="M-6-2q4 0 4-4M2-6q0 4 4 4M6 2q-4 0-4 4M-2 6q0-4-4-4"/></g>`],
    zzz: () => [txt(84, 22, "z", 11), txt(92, 10, "Z", 15)],
    question: () => [txt(88, 24, "?", 22)],
    exclaim: () => [txt(87, 24, "!", 24)],
    note: () => [txt(88, 26, "♪", 20), txt(10, 34, "♫", 14)],
    steam: () => [line("M14 20q-4-4 0-8t0-8"), line("M86 20q4-4 0-8t0-8")],
    idea: () => [`<g transform="translate(50 4)"><circle r="6" fill="${BLUE}"/>${line("M-11 0h-3M11 0h3M-8-8l-2-2M8-8l2-2M0-10v-3", BLUE, 2.2)}</g>`],
    dizzy: () => [line("M24 12q26-14 54 0", "currentColor", 1.4), twinkle(30, 10, .9, BLUE), twinkle(52, 4, 1.1, BLUE), twinkle(72, 10, .9, BLUE)],
    shiver: () => [line("M6 50l-4 4 4 4-4 4"), line("M94 50l4 4-4 4 4 4")],
    waves: () => [line("M96 30q4 6 2 12", BLUE), line("M90 24q8 4 10 12", BLUE)],
    motion: () => [line("M40 86l-4 6", BLUE), line("M50 88v7", BLUE), line("M60 86l4 6", BLUE)],
    dots: () => [`<circle cx="74" cy="12" r="2.6" fill="currentColor"/>`, `<circle cx="83" cy="12" r="2.6" fill="currentColor"/>`, `<circle cx="92" cy="12" r="2.6" fill="currentColor"/>`],
    cloud: () => [`<g transform="translate(50 2)" fill="currentColor" opacity=".35"><circle cx="-8" cy="2" r="6"/><circle cx="2" cy="-1" r="8"/><circle cx="11" cy="3" r="5"/><rect x="-14" y="2" width="30" height="6" rx="3"/></g>`, drop(42, 18, .5, BLUE), drop(54, 20, .5, BLUE)],
    confetti: () => [`<rect x="8" y="14" width="5" height="3" fill="${RED}" transform="rotate(30 10 15)"/>`, `<rect x="86" y="10" width="5" height="3" fill="${BLUE}" transform="rotate(-20 88 11)"/>`, `<rect x="92" y="34" width="5" height="3" fill="${GREEN}" transform="rotate(50 94 35)"/>`, `<rect x="4" y="38" width="5" height="3" fill="${BLUE}"/>`, `<circle cx="20" cy="6" r="2" fill="${GREEN}"/>`, `<circle cx="76" cy="4" r="2" fill="${RED}"/>`],
    pencil: () => [`<g transform="translate(92 54) rotate(30)"><rect x="-3" y="-20" width="6" height="22" rx="1" fill="${BLUE}"/><path d="M-3 2h6l-3 7Z" fill="currentColor"/></g>`],
    keyboard: () => [`<g><rect x="26" y="86" width="48" height="12" rx="3" fill="${BLUE}"/><path d="M31 90.5h38M31 94h38" stroke="#ffffff" stroke-width="1.4" stroke-dasharray="3 2"/></g>`],
    paper: () => [`<g transform="translate(12 60) rotate(-10)"><rect x="-8" y="-11" width="16" height="22" rx="1.5" fill="#ffffff" stroke="currentColor" stroke-width="2"/><path d="M-4-5h8M-4 0h8M-4 5h5" stroke="${BLUE}" stroke-width="1.6"/></g>`],
    check: () => [`<g transform="translate(86 16)"><circle r="9" fill="${GREEN}"/>${line("M-4 0l3 3 5-6", "#ffffff", 2.6)}</g>`],
    fire: () => [`<path d="M86 30C78 26 78 16 84 8C84 14 88 14 88 10C94 16 94 26 86 30Z" fill="${RED}"/>`],
    shades: () => [`<g><path d="M30 42H70V47Q70 54 63 54Q57 54 56 47H44Q43 54 37 54Q30 54 30 47Z" fill="${BLUE}"/><path d="M33 44h4" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round"/></g>`],
    smoke: () => [`<circle cx="44" cy="10" r="5" fill="currentColor" opacity=".3"/>`, `<circle cx="54" cy="6" r="6" fill="currentColor" opacity=".3"/>`, `<circle cx="62" cy="12" r="4" fill="currentColor" opacity=".3"/>`],
    wind: () => [line("M2 58h10M0 66h14M4 74h8", "currentColor", 2)],
    sick: () => [`<ellipse cx="30" cy="58" rx="6" ry="3" fill="${GREEN}" opacity=".8"/>`, `<ellipse cx="70" cy="58" rx="6" ry="3" fill="${GREEN}" opacity=".8"/>`],
    halo: () => [`<ellipse cx="50" cy="8" rx="16" ry="4" fill="none" stroke="${BLUE}" stroke-width="3"/>`],
    horns: () => [`<path d="M30 26L24 10L38 20Z M70 26L76 10L62 20Z" fill="${RED}"/>`],
    crown: () => [`<path d="M36 18L34 4L43 11L50 2L57 11L66 4L64 18Z" fill="${BLUE}"/>`],
    party: () => [`<g><path d="M42 19L52 -6L62 19Z" fill="${BLUE}"/><circle cx="52" cy="-6" r="3" fill="${RED}"/></g>`],
  };

  // ---- motion: which loop each part plays ----
  const ARM_MOTION = {
    wave: ["swing", "wave"], up: ["flap", "flap"], flex: ["flap", "flap"], raise: ["swing", "flap"], pointUp: ["swing", "flap"],
    clap: ["clap", "clap"], heart: ["clap", "clap"], pray: ["clap", "clap"], rub: ["clap", "clap"],
    typing: ["tap", "tap2"], shrug: ["shrug", "shrug"], hug: ["flap", "flap"], out: ["flap", "flap"],
    scratch: ["swing", "scratch"], facepalm: ["swing", "scratch"], zombie: ["reach", "reach"], dance: ["flap", "flap2"],
    pencil: ["swing", "scratch"], salute: ["swing", "swing"], point: ["swing", "swing"],
  };
  const EYE_MOTION = { open: "blink", small: "blink", tiny: "blink", wide: "blink", glare: "blink", angry: "blink", sad: "blink", half: "blink",
    lookL: "blink", lookR: "blink", lookU: "blink", lookD: "blink", sparkle: "shimmer", heart: "beat", star: "spin", spiral: "spin", ring: "beat" };
  const MOUTH_MOTION = { O: "oh", o: "oh", yawn: "oh", lol: "chatter", big: "chatter", wavy: "jitter", teeth: "jitter", kiss: "pucker", tongue: "pucker", cat: "pucker" };

  // spec: {eyes:"open" | "open|happy", mouth, arms, extras:"a b", tilt, squash:[sx,sy], dy, fade, motion, d}
  function svg(spec, opts = {}) {
    const [eL, eR = eL] = (spec.eyes || "open").split("|");
    const pose = spec.arms || "down";
    const left = eye(eL, EL[0], EL[1], -1), right = eye(eR, ER[0], ER[1], 1);
    const m = mouth(spec.mouth || "none");
    const front = FRONT.has(pose);
    const ink = str => str.replace(/#000/g, INK).replace(/#fff\b/g, WHITE);
    const pivot = (x, y, cls, inner, style = "") => `<g transform="translate(${x} ${y})"><g class="${cls}"${style}><g transform="translate(${-x} ${-y})">${inner}</g></g></g>`;
    const [motL, motR] = ARM_MOTION[pose] || ["swing", "swing"];
    const armMarkup = ARMS[pose].map((p, i) => {
      if (!p.length) return "";
      const d = armPath(p);
      const inner = `<path d="${d}" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${WHITE}" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round"/>`;
      return pivot(p[0], p[1], `gk-arm gk-arm-${i ? "R" : "L"} gk-am-${i ? motR : motL}`, inner, ` style="--dir:${i ? -1 : 1}"`);
    }).join("");
    const eyeG = (e, t, c) => pivot(c[0], c[1], `gk-eye gk-em-${EYE_MOTION[t] || "none"}`, `<g fill="${INK}">${ink(e[0])}</g>${e[1]}`);
    const mouthG = pivot(50, 67, `gk-mouth gk-mm-${MOUTH_MOTION[spec.mouth] || "none"}`, `<g fill="${INK}">${ink(m[0])}</g>${m[1]}`);
    const extras = (spec.extras || "").split(/\s+/).filter(Boolean).map(k => EXTRAS[k] ? `<g class="gk-x gk-x-${k}">${EXTRAS[k]().map(part => `<g>${part}</g>`).join("")}</g>` : "").join("");
    const t = [];
    if (spec.dy) t.push(`translate(0 ${spec.dy})`);
    if (spec.tilt) t.push(`rotate(${spec.tilt} 50 70)`);
    if (spec.squash) t.push(`translate(50 102) scale(${spec.squash[0]} ${spec.squash[1]}) translate(-50 -102)`);
    const size = opts.size ? ` width="${opts.size}" height="${opts.size}"` : "";
    const motion = opts.still ? "still" : (spec.motion || "bob");
    const dur = spec.d || 2;
    const content = (front ? "" : armMarkup) +
      `<path d="${BODY}" fill="${WHITE}" stroke="${INK}" stroke-width="3.4" stroke-linejoin="round"/>` +
      (front ? armMarkup : "") +
      eyeG(left, eL, EL) + eyeG(right, eR, ER) + mouthG + extras;
    return `<svg viewBox="-6 -14 112 124"${size} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${opts.label || "Specaboo ghost"}" class="gk${opts.still ? " gk-still" : ""}" style="--d:${dur}s">` +
      `<g transform="${t.join(" ")}"${spec.fade ? ` opacity="${spec.fade}"` : ""}>` +
      pivot(50, 102, `gk-body gk-bm-${motion}`, content) + `</g></svg>`;
  }

  // ---- the animation stylesheet (inject once per page with GhostKit.css) ----
  const css = `
.gk g { transform-box: view-box; }
.gk-body, .gk-arm, .gk-eye, .gk-mouth { transform-origin: 0 0; animation-duration: var(--d); animation-iteration-count: infinite; animation-timing-function: ease-in-out; }
.gk-x > g { transform-box: fill-box; transform-origin: center; animation-duration: var(--d); animation-iteration-count: infinite; animation-timing-function: ease-in-out; }
.gk-x > g:nth-child(2) { animation-delay: calc(var(--d) * -.33); }
.gk-x > g:nth-child(3) { animation-delay: calc(var(--d) * -.66); }
.gk-x > g:nth-child(4) { animation-delay: calc(var(--d) * -.2); }
.gk-x > g:nth-child(5) { animation-delay: calc(var(--d) * -.5); }
.gk-x > g:nth-child(6) { animation-delay: calc(var(--d) * -.8); }

/* body */
.gk-bm-bob { animation-name: gk-bob; }
.gk-bm-bounce { animation-name: gk-bounce; }
.gk-bm-hop { animation-name: gk-hop; }
.gk-bm-sway { animation-name: gk-sway; }
.gk-bm-shake { animation-name: gk-shake; }
.gk-bm-tremble { animation-name: gk-tremble; animation-timing-function: linear; }
.gk-bm-droop { animation-name: gk-droop; }
.gk-bm-breathe { animation-name: gk-breathe; }
.gk-bm-wobble { animation-name: gk-wobble; }
.gk-bm-pop { animation-name: gk-pop; }
.gk-bm-float { animation-name: gk-float; }
.gk-bm-dizzy { animation-name: gk-dizzy; animation-timing-function: linear; }
.gk-bm-lean { animation-name: gk-lean; }
.gk-bm-boo { animation-name: gk-boo; }
.gk-bm-nod { animation-name: gk-nod; }
.gk-bm-stomp { animation-name: gk-stomp; }
@keyframes gk-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
@keyframes gk-bounce { 0%,100% { transform: translateY(0) scale(1,1); } 15% { transform: translateY(0) scale(1.06,.94); } 45% { transform: translateY(-9px) scale(.97,1.04); } 72% { transform: translateY(0) scale(1.04,.96); } 86% { transform: translateY(0) scale(1,1); } }
@keyframes gk-hop { 0%,100% { transform: translateY(0) scale(1,1); } 18% { transform: translateY(0) scale(1.1,.88); } 48% { transform: translateY(-18px) scale(.95,1.07); } 74% { transform: translateY(0) scale(1.08,.92); } 88% { transform: translateY(0) scale(1,1); } }
@keyframes gk-sway { 0%,100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
@keyframes gk-shake { 0%,60%,100% { transform: translateX(0); } 8% { transform: translateX(-3px) rotate(-2deg); } 16% { transform: translateX(3px) rotate(2deg); } 24% { transform: translateX(-3px) rotate(-2deg); } 32% { transform: translateX(3px) rotate(2deg); } 40% { transform: translateX(-2px); } 48% { transform: translateX(1px); } }
@keyframes gk-tremble { 0%,100% { transform: translate(0,0); } 10% { transform: translate(-1.2px,.4px); } 20% { transform: translate(1.2px,-.4px); } 30% { transform: translate(-1px,-.4px); } 40% { transform: translate(1px,.4px); } 50% { transform: translate(-1.2px,0); } 60% { transform: translate(1.2px,.4px); } 70% { transform: translate(-1px,-.4px); } 80% { transform: translate(1px,0); } 90% { transform: translate(-1.2px,.4px); } }
@keyframes gk-droop { 0%,100% { transform: translateY(0) scale(1,1); } 50% { transform: translateY(2px) scale(1.04,.95); } }
@keyframes gk-breathe { 0%,100% { transform: scale(1,1); } 50% { transform: scale(1.035,1.05); } }
@keyframes gk-wobble { 0%,50%,100% { transform: rotate(0) translateY(0); } 25% { transform: rotate(-8deg) translateY(-4px); } 75% { transform: rotate(8deg) translateY(-4px); } }
@keyframes gk-pop { 0%,45%,100% { transform: scale(1) translateY(0); } 10% { transform: scale(.92,1.06) translateY(0); } 22% { transform: scale(1.12) translateY(-6px); } 34% { transform: scale(.98) translateY(0); } }
@keyframes gk-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes gk-dizzy { 0%,100% { transform: rotate(-6deg) translateX(0); } 25% { transform: rotate(0) translateX(3px); } 50% { transform: rotate(6deg) translateX(0); } 75% { transform: rotate(0) translateX(-3px); } }
@keyframes gk-lean { 0%,100% { transform: rotate(0) translateX(0); } 40%,60% { transform: rotate(-5deg) translateX(-2px); } }
@keyframes gk-boo { 0%,60%,100% { transform: scale(1) translateY(0); } 12% { transform: scale(.9,1.08) translateY(0); } 26% { transform: scale(1.18) translateY(-8px); } 40% { transform: scale(1) translateY(0); } }
@keyframes gk-nod { 0%,50%,100% { transform: rotate(0); } 15% { transform: rotate(3deg) translateY(1px); } 30% { transform: rotate(0); } 40% { transform: rotate(3deg) translateY(1px); } }
@keyframes gk-stomp { 0%,100% { transform: translateY(0) rotate(0); } 20% { transform: translateY(-5px) rotate(-4deg); } 30% { transform: translateY(0) rotate(0) scale(1.05,.95); } 60% { transform: translateY(-5px) rotate(4deg); } 70% { transform: translateY(0) rotate(0) scale(1.05,.95); } }

/* arms (rotate around the shoulder; --dir mirrors left and right) */
.gk-am-swing { animation-name: gk-a-swing; }
.gk-am-wave { animation-name: gk-a-wave; }
.gk-am-flap { animation-name: gk-a-flap; }
.gk-am-flap2 { animation-name: gk-a-flap; animation-delay: calc(var(--d) * -.5); }
.gk-am-clap { animation-name: gk-a-clap; }
.gk-am-tap { animation-name: gk-a-tap; }
.gk-am-tap2 { animation-name: gk-a-tap; animation-delay: calc(var(--d) * -.25); }
.gk-am-shrug { animation-name: gk-a-shrug; }
.gk-am-scratch { animation-name: gk-a-scratch; }
.gk-am-reach { animation-name: gk-a-reach; }
@keyframes gk-a-swing { 0%,100% { transform: rotate(0); } 50% { transform: rotate(calc(var(--dir) * 7deg)); } }
@keyframes gk-a-wave { 0%,50%,100% { transform: rotate(0); } 25% { transform: rotate(calc(var(--dir) * -24deg)); } 75% { transform: rotate(calc(var(--dir) * 14deg)); } }
@keyframes gk-a-flap { 0%,100% { transform: rotate(0); } 50% { transform: rotate(calc(var(--dir) * -16deg)); } }
@keyframes gk-a-clap { 0%,50%,100% { transform: rotate(0); } 25%,75% { transform: rotate(calc(var(--dir) * 16deg)); } }
@keyframes gk-a-tap { 0%,50%,100% { transform: rotate(0); } 25% { transform: rotate(calc(var(--dir) * -10deg)); } 75% { transform: rotate(calc(var(--dir) * -6deg)); } }
@keyframes gk-a-shrug { 0%,100% { transform: translateY(0) rotate(0); } 40%,60% { transform: translateY(-4px) rotate(calc(var(--dir) * -8deg)); } }
@keyframes gk-a-scratch { 0%,50%,100% { transform: rotate(0); } 25%,75% { transform: rotate(calc(var(--dir) * 9deg)); } }
@keyframes gk-a-reach { 0%,100% { transform: translateX(0) rotate(0); } 50% { transform: translateY(3px) rotate(calc(var(--dir) * 5deg)); } }

/* eyes and mouth (scale around their own centre) */
.gk-em-blink { animation-name: gk-blink; }
.gk-em-shimmer { animation-name: gk-shimmer; }
.gk-em-beat { animation-name: gk-beat; }
.gk-em-spin { animation-name: gk-spin; animation-timing-function: linear; }
.gk-mm-oh { animation-name: gk-oh; }
.gk-mm-chatter { animation-name: gk-chatter; }
.gk-mm-jitter { animation-name: gk-jitter; }
.gk-mm-pucker { animation-name: gk-pucker; }
@keyframes gk-blink { 0%,86%,100% { transform: scaleY(1); } 91% { transform: scaleY(.1); } }
@keyframes gk-shimmer { 0%,100% { transform: scale(1); } 50% { transform: scale(1.12); } }
@keyframes gk-beat { 0%,60%,100% { transform: scale(1); } 15% { transform: scale(1.25); } 30% { transform: scale(1); } 45% { transform: scale(1.18); } }
@keyframes gk-spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
@keyframes gk-oh { 0%,100% { transform: scale(1,1); } 50% { transform: scale(.9,1.2); } }
@keyframes gk-chatter { 0%,50%,100% { transform: scaleY(1); } 25%,75% { transform: scaleY(.7); } }
@keyframes gk-jitter { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-1px); } 75% { transform: translateX(1px); } }
@keyframes gk-pucker { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }

/* extras */
.gk-x-sparkles > g, .gk-x-dizzy > g:not(:first-child) { animation-name: gk-twinkle; }
.gk-x-hearts > g, .gk-x-zzz > g, .gk-x-steam > g, .gk-x-smoke > g, .gk-x-note > g { animation-name: gk-rise; }
.gk-x-heart > g, .gk-x-heartChest > g, .gk-x-anger > g, .gk-x-idea > g, .gk-x-check > g { animation-name: gk-beat; }
.gk-x-tear > g, .gk-x-sweat > g, .gk-x-joy > g, .gk-x-cloud > g:not(:first-child) { animation-name: gk-drip; }
.gk-x-cloud > g:first-child { animation-name: gk-drift; }
.gk-x-tears > g { transform-origin: top; animation-name: gk-stream; }
.gk-x-blush > g, .gk-x-sick > g { animation-name: gk-glow; }
.gk-x-question > g, .gk-x-exclaim > g { transform-origin: bottom; animation-name: gk-popx; }
.gk-x-shiver > g, .gk-x-waves > g, .gk-x-motion > g, .gk-x-wind > g { animation-name: gk-flicker; }
.gk-x-dots > g { animation-name: gk-dot; }
.gk-x-dots > g:nth-child(2) { animation-delay: calc(var(--d) * .15); }
.gk-x-dots > g:nth-child(3) { animation-delay: calc(var(--d) * .3); }
.gk-x-confetti > g { animation-name: gk-fall; animation-timing-function: linear; }
.gk-x-pencil > g { transform-origin: bottom; animation-name: gk-scribble; }
.gk-x-keyboard > g { animation-name: gk-press; }
.gk-x-fire > g { transform-origin: bottom; animation-name: gk-flame; }
.gk-x-halo > g { animation-name: gk-halo; }
.gk-x-party > g { transform-origin: bottom; animation-name: gk-tilt; }
.gk-x-broken > g:first-child { animation-name: gk-split-l; }
.gk-x-broken > g:last-child { animation-name: gk-split-r; }
.gk-x-shades > g { animation-name: gk-glint; }
@keyframes gk-twinkle { 0%,100% { transform: scale(.4); opacity: .3; } 50% { transform: scale(1.15); opacity: 1; } }
@keyframes gk-rise { 0% { transform: translateY(6px); opacity: 0; } 30% { opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(-10px); opacity: 0; } }
@keyframes gk-drip { 0% { transform: translateY(-2px); opacity: 0; } 20% { opacity: 1; } 80% { transform: translateY(8px); opacity: 1; } 100% { transform: translateY(10px); opacity: 0; } }
@keyframes gk-drift { 0%,100% { transform: translateX(-3px); } 50% { transform: translateX(3px); } }
@keyframes gk-stream { 0%,100% { transform: scaleY(.85); } 50% { transform: scaleY(1.05); } }
@keyframes gk-glow { 0%,100% { opacity: .45; } 50% { opacity: 1; } }
@keyframes gk-popx { 0%,60%,100% { transform: scale(1) rotate(0); } 15% { transform: scale(1.3) rotate(-8deg); } 30% { transform: scale(.95) rotate(4deg); } 45% { transform: scale(1) rotate(0); } }
@keyframes gk-flicker { 0%,100% { opacity: .2; } 50% { opacity: 1; } }
@keyframes gk-dot { 0%,60%,100% { opacity: .25; transform: translateY(0); } 20% { opacity: 1; transform: translateY(-2px); } }
@keyframes gk-fall { 0% { transform: translateY(-6px) rotate(0); opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { transform: translateY(12px) rotate(180deg); opacity: 0; } }
@keyframes gk-scribble { 0%,50%,100% { transform: rotate(0) translateX(0); } 25% { transform: rotate(-8deg) translateX(-1px); } 75% { transform: rotate(6deg) translateX(1px); } }
@keyframes gk-press { 0%,50%,100% { transform: translateY(0); } 25%,75% { transform: translateY(1px); } }
@keyframes gk-flame { 0%,100% { transform: scale(1,1); } 25% { transform: scale(.92,1.12); } 50% { transform: scale(1.05,.94); } 75% { transform: scale(.96,1.08); } }
@keyframes gk-halo { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
@keyframes gk-tilt { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(8deg); } }
@keyframes gk-split-l { 0%,100% { transform: translateX(0) rotate(0); } 50% { transform: translateX(-2px) rotate(-8deg); } }
@keyframes gk-split-r { 0%,100% { transform: translateX(0) rotate(0); } 50% { transform: translateX(2px) rotate(8deg); } }
@keyframes gk-glint { 0%,70%,100% { opacity: 1; } 80% { opacity: .75; } }

.gk-still *, .gk-paused * { animation-play-state: paused !important; }
.gk-still * { animation: none !important; }
@media (prefers-reduced-motion: reduce) { .gk * { animation: none !important; } }
`;
  function injectCss() {
    if (typeof document === "undefined" || document.getElementById("gk-css")) return;
    const st = document.createElement("style"); st.id = "gk-css"; st.textContent = css; document.head.append(st);
  }
  return { svg, css, injectCss, ARMS: Object.keys(ARMS), EXTRAS: Object.keys(EXTRAS) };
})();

if (typeof module !== "undefined") module.exports = GhostKit;
