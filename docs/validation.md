# Validation

Completed 10 September 2026:

- `npm run check`: JavaScript syntax, local links/assets/fonts, internal anchors, unique IDs, one H1 per page, image alternative text and centralised colour tokens passed.
- Menu inventory: 57 food items, 29 wines and all 15 explicit dietary-label icons from the existing source are retained. Duplicate wine sources match.
- `npm test`: all 5 booking tests passed, covering London midnight/DST, next Saturday and year boundaries, impossible dates, party-size validation, frozen inputs and the provider URL contract.
- `npm run test:live`: the existing Wix reservation embed, DesignMyNight venue widget and booking landing page each returned HTTP 200 and the expected content. No reservation was submitted.
- Local preview readiness returned HTTP 200.

There is no framework compilation, TypeScript or external linter in this dependency-free static project. Node syntax checks and the repository’s validation script are the available source checks.

Browser interaction/visual QA was not run because it was not requested, in accordance with the Sites workflow. The optional WebMCP tool could not be validated in a permitted supported browser context. Its ordinary form behaviour and domain logic were checked, and lack of WebMCP support does not block using the site.

Read-only provider checks verify integration reachability and the venue identity, not live table availability, booking acceptance, confirmation-email delivery or deposits. Full booking completion needs a venue-approved test before public launch.
