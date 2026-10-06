# Content migration audit

Source checked on 10 September 2026: https://www.thevictoriabattersea.co.uk/

## Owner updates — 6 October 2026

The owner's new instructions supersede the original offers. All seven daily offers are now maintained in `src/components/offers.html` and appear on the homepage and dedicated What’s on page:

- Munchy Mondays: any two main meals, only pay for one.
- Tasty Tuesdays: 11oz Black Angus ribeye and chips, £15.
- Wobbly Wednesdays: 25% off any bottle or glass of wine.
- Tapas Thursdays: any four small plates or sides, £20.
- Finally Fridays: £5 cocktails, 8pm to midnight; open until 2am.
- Spritz Saturdays: order any brunch or main and get £5 spritz and cocktail slushies, all day and night until 2am.
- Sensible Sundays: farm2fork roasts and £5 Bloody Good Basil Mary’s.

The old burger, steak, Friday, boozy-lunch and seasonal spritz promotions have been removed. The old steak-weight and orphan-price conflicts below are historical, not unresolved details of the new offers. Regular menu dishes and prices have not been altered. No cheapest-meal rule, additional drink entitlement, discount-stacking restriction or new service time has been invented.

There are dedicated food, live-music, What’s on/events, groups-and-hire and website-terms pages. The new hire page advertises large group bookings, celebrations and corporate/private hire based on the owner's instruction, with all capacity, exclusivity, minimum-spend and booking arrangements left to the pub to confirm. Email enquiries do not create reservations.

The owner asked to leave the rugby competition unspecified. General live-sport copy is included, with no named new rugby competition, ITV partnership claim or fixture timetable. The original list of major terrestrial tournaments remains in the pub information. Saturday music is still weekly, with no invented acts, times or admission prices. Event announcements link to the venue's Instagram; no placeholder calendar events were added.

## Draft website terms

`src/pages/terms.html` is clearly marked as a draft for review and carries `noindex`. The legal company name, company number, registered office and place of registration remain explicit placeholders. The venue address is not presented as a confirmed registered office. These are website-use terms, not a new cancellation policy or a signed hire agreement. Finalise the company disclosures and obtain an appropriate legal review before treating the draft as adopted terms.

Primary guidance consulted on 6 October 2026:

- [CMA: Writing a fair contract for customers](https://www.gov.uk/guidance/writing-a-fair-contract-for-customers): clarity, fair terms and preserving consumer rights.
- [GOV.UK: Signs, stationery and promotional material](https://www.gov.uk/running-a-limited-company/signs-stationery-and-promotional-material): company website disclosures, where applicable.

The draft does not purport to be a privacy notice. Complete any required privacy information for the final hosting and booking setup before the main-domain launch.

## Migrated content

| Original page | New location | Content retained |
| --- | --- | --- |
| `/` | Homepage | Gastropub positioning, organic food, welcome, garden, dogs, games, terrestrial sports, weekly offers, dress code, hiring, address, email, hours and social profiles |
| `/reservations-1` | Homepage booking form | The actual DesignMyNight venue ID from the embedded widget; direct handoff to the same booking provider |
| `/menu` and `/menu?menu=menu` | `/food.html` (legacy `/menu.html` retained) | All 57 food items across 7 sections, descriptions, prices and 15 source dietary labels |
| `/wines` and `/menu?menu=wine` | `/menu.html?menu=wine` | All 29 wines across 4 sections, vintages, serving sizes and prices; both source lists were identical |
| `/specials` | `/whats-on.html` and homepage | Original promotions replaced by the seven owner-supplied daily offers above |
| `/about-us` | Our pub and Find us | Games room, outdoor dining, umbrellas/awnings/heaters caveat, dog facilities, terrestrial sports list, booking/enquiry distinction and walk-ins |
| `/our-story` | Story section | Early-1900s Victoria Hotel, Queen’s Road renamed in 1944, Browns period, corner building, typewriters and community character |
| `/team-3` | Food & drink | This is a secondary menu landing page, not a staff page; chef and trusted-supplier information plus main/brunch/roast menu links retained |
| `/book-online` | Superseded by the real reservation flow | An unused Wix bookings page reading “Nothing to book right now”; not reproduced as a false unavailability message |

The user confirmed that weekly live music is **every Saturday**. This is featured in the hero and a dedicated weekly music feature. No start time, act, genre or admission price was supplied, so none is invented.

Menu data preserves source wording and prices. The renderer only corrects the category display spelling “Rosè” to “Rosé” and “Champaige” to “Champagne”. Dietary labels are imported from explicit source icons rather than inferred from ingredients.

## Source conflicts and owner review

1. **Saturday opening:** the homepage, reservations, about, story, specials and standalone wines page say noon for both bar and kitchen; the food menu footer says 10am. The redesign uses the consistent noon schedule. Confirm before public launch.
2. **Steak-night portion:** homepage says 330g; specials says 10oz. The offer and price are retained, with the conflicting weight omitted until confirmed.
3. **Friday offer:** the specials page has an orphan £12.95 underneath drinks offers, while both pages explicitly list 2 frozen cocktails £12, 2 Aperol Spritz £14 and 2 seasonal spritzes £16. The redesign carries the explicitly associated prices, 30% Prosecco discount and shot deals; the unexplained £12.95 is recorded here.
4. **WhatsApp:** footers say “Drop us a message on whatsapp!” but expose no telephone number or WhatsApp link in the public content inspected. The functioning published email and social links are retained. A WhatsApp button needs the venue’s confirmed number.
5. **Wine source inconsistencies:** the Chablis label contains both “2015” and “2021”; a rosé magnum price reads “1.5L - £55.9”; Moët Ice reads “70.95” without a pound symbol. These source strings are retained in the wine data pending confirmation.
6. **Dietary accuracy:** the original menu labels are retained as written; they are not a substitute for allergy advice. Some descriptions have typos (for example “Creamy Three Sauce”); food descriptions have not been silently reinterpreted.
7. **Unused Wix events:** the sitemap includes `/event-details/open-stage`, `/event-details/trivia-night`, and `/event-details/movie-night`. Open Stage and Movie Night are unedited templates with placeholder instructions, a San Francisco address and a 2035 event date. Trivia Night returned no usable page content. These are not advertised as real Battersea events. Saturday music comes from the user’s explicit confirmation.

## Booking behaviour and verification boundary

The original booking embed is:

https://www-thevictoriabattersea-co-uk.filesusr.com/html/9a23e8_10e88052a93613c49ed8985d585bd58b.html

It loads `https://partners.designmynight.com/pf/js?venue_id=608a81ecccb4d71f5264baff`.

The redesign uses the documented booking URL with `venue_id`, `source=partner`, `date` and `num_people`. The provider handles available times, booking types, guests’ personal details and final confirmation:

https://developers.designmynight.com/faqs/booking-url/

Read-only live checks verify that the existing embed, provider script and handoff page respond successfully. This does not prove table availability or create a reservation. A full end-to-end booking should be checked with the venue before public domain cutover.

No existing website settings, booking-provider configuration or public DNS records were changed. The Sites preview was initially private and was subsequently made public at the user’s request. The user also explicitly approved making the source repository public to enable GitHub Pages.
