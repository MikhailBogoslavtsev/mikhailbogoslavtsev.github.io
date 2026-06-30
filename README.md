# mikhailbogoslavtsev.github.io

Personal portfolio for Mikhail Bogoslavtsev. Single static page, deployed via GitHub Pages.

Live site: <https://mikhailbogoslavtsev.github.io>

## Structure

- `index.html` — the entire site (markup, CSS, and JS are inline in this one file)
- `headshot.jpg` — hero photo (displayed in a 300px circle via `object-fit: cover`)

To change the hero photo, replace `headshot.jpg` (a square image, ~600×600, looks best).
To adjust how it's framed in the circle, edit `object-position` on the `.headshot` rule in `index.html`.

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
