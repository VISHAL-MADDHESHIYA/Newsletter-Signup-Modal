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
## Customize

- Change the delay in `script.js` by editing the `4000` value in `window.setTimeout`.
- Update the text and brand in `index.html`.
- Adjust colors and spacing in the `:root` section of `style.css`.
- The dismissal key is `northstar-newsletter-modal-dismissed`. Clear session storage or open a new tab to test the automatic popup again.

## Email subscription note

This is a front-end demo. It validates the email in the browser but does **not** send or store subscriptions. To make it production-ready, connect the submit handler in `script.js` to a trusted newsletter service or your own backend. Validate addresses server-side as well, protect any API credentials, and add your privacy/consent wording as appropriate.
