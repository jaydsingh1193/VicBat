# Validation

## Update: 6 October 2026

- `npm run build` generates seven complete static HTML pages from bounded, explicit shared-component includes. Output remains committed and readable without a build runtime on the host.
- `npm run check` passes on all seven pages, including relative references under `/` and `/VicBat/`, new menu anchors, footer terms links and source/output consistency. All 57 food items, 29 wines and original dietary labels remain.
- `npm test` passes all five existing booking tests. The Saturday shortcuts now work on pages without the homepage booking form, while homepage shortcuts retain the selected party size.
- Read-only HTTP checks returned 200 and exact source-content matches for all seven local pages. The existing reservation embed, provider widget and booking landing page also returned 200 with expected content; no reservation was submitted.
- Each of the seven updated daily offers is rendered from one shared component on both the homepage and What’s on page. No old promotional copy remains in the HTML.
- Draft terms are explicitly labelled, excluded from indexing, and linked from every footer. Legal entity fields are placeholders; no booking/deposit/cancellation policy has been invented.
- Local browser visual/interaction QA was attempted but blocked by the browser URL security policy. No alternate browser surface was used to bypass it. Responsive layout is source-checked, not visually verified in this pass.

## Original release

Completed 10 September 2026:

- `npm run check`: JavaScript syntax, local links/assets/fonts, internal anchors, unique IDs, one H1 per page, image alternative text and centralised colour tokens passed.
- Menu inventory: 57 food items, 29 wines and all 15 explicit dietary-label icons from the existing source are retained. Duplicate wine sources match.
- `npm test`: all 5 booking tests passed, covering London midnight/DST, next Saturday and year boundaries, impossible dates, party-size validation, frozen inputs and the provider URL contract.
- `npm run test:live`: the existing Wix reservation embed, DesignMyNight venue widget and booking landing page each returned HTTP 200 and the expected content. No reservation was submitted.
- Local preview readiness returned HTTP 200.
- GitHub Pages preparation: all page links, anchors and font references also pass validation under the `/VicBat/` project path. The menu JSON is resolved relative to its JavaScript module, preserving the project prefix.

There is no framework compilation, TypeScript or external linter in this dependency-free static project. Node syntax checks and the repository’s validation script are the available source checks.

Browser interaction/visual QA was not run because it was not requested, in accordance with the Sites workflow. The optional WebMCP tool could not be validated in a permitted supported browser context. Its ordinary form behaviour and domain logic were checked, and lack of WebMCP support does not block using the site.

Read-only provider checks verify integration reachability and the venue identity, not live table availability, booking acceptance, confirmation-email delivery or deposits. Full booking completion needs a venue-approved test before public launch.
