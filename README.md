# The Victoria Battersea

A responsive redesign of The Victoria Battersea website. Source and deployable static assets live in `dist/`. No framework, runtime packages, build step, secrets or database are required.

## Work locally

Use Node.js 22 or later (through asdf if configured).

- `npm run dev` starts the preview at `http://127.0.0.1:4173`.
- `npm run check` validates JavaScript syntax, HTML references, menu data and brand colour tokens.
- `npm test` checks London dates, booking validation and the DesignMyNight handoff contract.
- `npm run test:live` performs read-only checks against the existing reservation embed and provider. It never creates a booking.

## Content

- `dist/index.html`: homepage, booking form, Saturday live music, weekly offers, pub facilities, story, hours, policies and recruitment.
- `dist/menu-data.json`: all 57 food items and 29 wines, imported from the current website, including source dietary labels and prices.
- `dist/menu.html` and `dist/menu-components.js`: reusable, semantic menu rendering. Components only read their data and can render frozen fixtures.
- `dist/styles.css`: shared branding tokens, locally hosted fonts and responsive layouts.
- `docs/content-audit.md`: source inventory, carried-over content, discrepancies and items needing owner review before a public launch.
- `docs/assets.md`: the source of every reused image and font.

## Bookings

The venue’s existing Wix embed identifies DesignMyNight / Access Collins venue `608a81ecccb4d71f5264baff`. The form sends the guest’s selected date and party size to that same venue using the provider’s documented GET booking URL. Guests choose a time, provide their personal details, and complete the reservation on DesignMyNight. Availability, confirmation, deposits and cancellation terms remain controlled by the venue’s existing booking configuration.

This site does not create a parallel reservation database, collect guest personal data, promise table availability or simulate a successful reservation. It loads no third-party tracking or booking scripts on page load. The native form works without JavaScript; JavaScript adds London-date validation and the next-Saturday shortcut. Parties above 20 are directed to the venue’s existing email address.

An optional, feature-detected WebMCP tool, `prepare_table_booking`, updates the same form. Its response explicitly states that no reservation has been created. Full browser WebMCP validation requires a supported browser; unsupported browsers continue using the regular form.

## Publishing

The public GitHub repository is `jaydsingh1193/VicBat`. GitHub Pages is configured to publish the website at https://jaydsingh1193.github.io/VicBat/. The original Sites preview also remains publicly accessible. No DNS or existing Wix configuration has been changed.

The GitHub Pages workflow in `.github/workflows/pages.yml` validates the site and publishes only `dist/`. It supports manual runs and redeploys when site changes reach `main`. All local links, fonts, scripts and the menu JSON request are relative, so the same source works at a domain root or the `/VicBat/` project path.

GitHub Pages uses GitHub Actions as its publishing source. The repository was made public with the user’s explicit approval on 10 September 2026, enabling Pages on the current GitHub plan. The workflow publishes only website assets; documentation, tests and project metadata remain in the source repository rather than the hosted site.

Before replacing the public site, resolve the factual questions in the content audit, confirm the booking journey in the venue’s production account, and add redirects for the existing URLs. Domain cutover is a separate action.
