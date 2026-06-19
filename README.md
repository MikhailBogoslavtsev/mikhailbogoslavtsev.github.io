# mikhailbogoslavtsev.github.io

Personal portfolio for Mikhail Bogoslavtsev. Static HTML/CSS/JS, deployed via GitHub Pages.

Live site: <https://mikhailbogoslavtsev.github.io>

## Structure

- `index.html` — single-page layout (hero, about, work, contact)
- `styles.css` — design tokens + components (dark / light auto via `prefers-color-scheme`)
- `script.js` — contact-form submission, honeypot + timing checks, char counter

## Contact form

Submissions go through [Web3Forms](https://web3forms.com) to `bogoslavtsevm@gmail.com`.

Anti-spam layers:

1. **Honeypot field** (`botcheck`) — hidden checkbox; Web3Forms drops messages where it's set.
2. **Timing check** — form must be open for at least 3 seconds before submit.
3. **HTML5 validation** — name, email, and a 20-char minimum message are required.
4. **Web3Forms server-side filtering** — built-in spam scoring on their side.

To rotate the access key, edit the `<input name="access_key">` value in `index.html`.

## Local preview

Open `index.html` directly in a browser, or run any static server:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Pushing to `main` auto-publishes via GitHub Pages (configured under repo Settings → Pages).
