# Specaboo 👻

A quiet, full-screen page to type on, in your browser. A little ghost keeps watch.

- Autosaves to your browser's localStorage as you type
- Word, character and reading-time count
- Dark mode toggle (remembers your choice, follows your system by default)
- Download your text as a `.txt` file (button or Ctrl/⌘+S)
- Select text to get a small formatting popup: bold, italic, strikethrough and code (monospace), written as WhatsApp-style markers (`*bold*`, `_italic_`, `~strike~`, ```` ```mono``` ````). Shortcuts: Ctrl/⌘+B, Ctrl/⌘+I, Ctrl/⌘+Shift+X, Ctrl/⌘+Shift+M.
- Live styling: headings, bold, italic, strikethrough and lists show styled as you type. The Markdown markers (`#`, `*`, `_`, `~`) are kept in the text but only appear on the line you're editing.
- Code: select whole lines and press the code button (or Ctrl/Cmd+Shift+M) to make a code block; a few words become inline code. Typing ``` and Enter also opens a block. The language is detected automatically and highlighted with [highlight.js](https://highlightjs.org/) (loaded from cdnjs). Pasted code becomes a code block on its own; Ctrl/Cmd+Z turns it back into plain text.
- Headings and lists: the popup also has H1, H2, H3, bullet list and numbered list, written as Markdown (`# `, `## `, `### `, `- `, `1. `). Shortcuts: Ctrl/Cmd+Alt+1/2/3, Ctrl/Cmd+Shift+8 and Ctrl/Cmd+Shift+7.
- Lists are recognised as you type: Enter continues a list, Enter on an empty item ends it, numbered lists renumber themselves, and Tab / Shift+Tab indent items.
- The bottom bar fades while you type and returns when you move the mouse

## Run it

It's a single static file with no build step. Open `index.html` in a browser, or serve the folder with any static host and point your domain at it.

Your text never leaves your browser: there is no server and no account.
