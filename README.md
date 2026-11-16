# photo-to-ascii

Turn any photo into ASCII art, right in your browser. No build step, no dependencies — plain HTML, CSS and JavaScript.

## Features

- 📷 Upload or take a photo (works with your phone camera too, via `capture`)
- Live preview of the chosen image
- Detail slider — control the width of the ASCII output (30–120 characters)
- Brightness-mapped character ramp: `@%#*+=-:. ` (dark → light)
- One-click **Copy ASCII** to put the art on your clipboard
- Dark, mobile-friendly UI

## How it works

1. The image is drawn onto an offscreen `<canvas>` at the chosen width (height is scaled for the aspect ratio of monospace characters).
2. Each pixel's RGB value is converted to brightness with the standard luminance weights: `0.299 R + 0.587 G + 0.114 B`.
3. Each brightness level maps to a character in the ramp, building the art line by line into a `<pre>`.

## Run it

Just open `index.html` in any modern browser — no server or install needed.

```bash
git clone https://github.com/Roy0x/photo-to-ascii.git
cd photo-to-ascii
start index.html   # or just double-click it
```

## Project structure

```
index.html   # page + controls
style.css    # dark theme styling
app.js       # upload, ASCII conversion, clipboard
```
