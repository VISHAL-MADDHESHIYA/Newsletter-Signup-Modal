# Newsletter Signup Modal

A responsive newsletter landing page with a delayed signup modal, client-side email validation, and accessible dismissal behavior. Built with plain HTML, CSS, and JavaScript.

## Features

- Automatically opens after 4 seconds on a fresh tab session.
- Close button, backdrop click, and Escape-key dismissal.
- Prevents the automatic modal from reappearing after dismissal during the same tab session (`sessionStorage`).
- Email field validation with clear inline error messages.
- Responsive layout for mobile and desktop.
- Accessible dialog semantics, visible focus styles, keyboard focus trap, and focus restoration.
- Respects reduced-motion preferences.
- No framework, build step, or paid resource required.

## Project files

```text
newsletter-signup-modal/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Wait 4 seconds for the modal, or click **Join the newsletter** to open it manually.
4. Try invalid email addresses to see validation. Close the modal using ×, the backdrop, or Escape.

You can also use the VS Code **Live Server** extension, but it is optional.

## Customize

- Change the delay in `script.js` by editing the `4000` value in `window.setTimeout`.
- Update the text and brand in `index.html`.
- Adjust colors and spacing in the `:root` section of `style.css`.
- The dismissal key is `northstar-newsletter-modal-dismissed`. Clear session storage or open a new tab to test the automatic popup again.

## Email subscription note

This is a front-end demo. It validates the email in the browser but does **not** send or store subscriptions. To make it production-ready, connect the submit handler in `script.js` to a trusted newsletter service or your own backend. Validate addresses server-side as well, protect any API credentials, and add your privacy/consent wording as appropriate.

## Deploy with GitHub Pages

1. Create a public repository on GitHub named `newsletter-signup-modal`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. Wait for the deployment URL shown in the Pages section and open it to test the live site.

No build command is needed because this is a static site.

## Suggested Git commands

```bash
git init
git add .
git commit -m "Build newsletter signup modal"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/newsletter-signup-modal.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username and create the remote repository before pushing.

## Testing checklist

- [ ] Modal appears after approximately 4 seconds in a fresh tab session.
- [ ] Main CTA opens the modal.
- [ ] Close button, backdrop, and Escape dismiss it.
- [ ] Invalid and empty emails show an error.
- [ ] A valid-looking email shows the demo success message.
- [ ] Dismissed modal does not automatically reappear in the same tab session.
- [ ] Keyboard focus stays within the dialog and returns to the opener on close.
- [ ] Layout works on mobile and desktop.
- [ ] GitHub Pages deployment loads without missing assets.

## Interview questions and sample answers

### 1. How would you validate an email format?

Use an `<input type="email">` and a JavaScript check to provide immediate feedback. The regex here checks for a non-space local part, an `@`, a domain, a dot, and a final segment of at least two characters. Client-side checks improve user experience, but they cannot prove that an inbox exists; a backend must validate again.

### 2. How do you prevent the modal from repeatedly appearing?

Store a dismissal flag in `sessionStorage`. When the page loads, check the flag before starting the delayed popup. `sessionStorage` lasts for the tab session, which fits this demo. Use `localStorage` or a server-side preference if dismissal should persist across browser sessions.

### 3. What accessibility considerations apply to modals?

Use dialog semantics (`role="dialog"` and `aria-modal="true"`), label the dialog, move focus into it, keep keyboard focus inside while open, support Escape, restore focus on close, provide clear validation messages, and respect reduced-motion settings. Production dialogs should also account for inert background content and screen-reader testing.

## Limitations

- A valid-looking email is not actually subscribed until a backend or newsletter provider is connected.
- `sessionStorage` may be unavailable in some restricted browser contexts; the code gracefully falls back to normal modal behavior.
- The Google Fonts import is optional; the page uses fallback fonts if unavailable.
