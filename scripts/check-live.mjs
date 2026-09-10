import assert from 'node:assert/strict';
import { bookingUrl, nextSaturday, VENUE_ID } from '../dist/booking.js';

const sources = [
  { name: 'Current reservation embed', url: 'https://www-thevictoriabattersea-co-uk.filesusr.com/html/9a23e8_10e88052a93613c49ed8985d585bd58b.html', contains: VENUE_ID },
  { name: 'Live provider widget', url: `https://partners.designmynight.com/pf/js?venue_id=${VENUE_ID}`, contains: VENUE_ID },
  { name: 'Booking handoff page', url: bookingUrl({ guests: 2, date: nextSaturday() }), contains: 'Make a booking | DesignMyNight' },
];

for (const source of sources) {
  const response = await fetch(source.url, { signal: AbortSignal.timeout(15000) });
  assert.ok(response.ok, `${source.name}: HTTP ${response.status}`);
  const body = await response.text();
  assert.ok(body.includes(source.contains), `${source.name}: expected content missing`);
  console.log(`${source.name}: HTTP ${response.status}, expected content verified.`);
}
console.log('Read-only upstream verification passed. No reservation was submitted.');
