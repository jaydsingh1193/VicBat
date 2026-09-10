import test from 'node:test';
import assert from 'node:assert/strict';
import { bookingUrl, londonDate, nextSaturday, validateBooking, VENUE_ID } from '../dist/booking.js';

test('booking dates follow London across midnight and daylight saving', () => {
  assert.equal(londonDate(new Date('2026-09-10T23:30:00Z')), '2026-09-11');
  assert.equal(londonDate(new Date('2026-01-10T23:30:00Z')), '2026-01-10');
  assert.equal(londonDate(new Date('2026-03-29T23:30:00Z')), '2026-03-30');
});

test('Saturday shortcut handles weekends, month and year boundaries', () => {
  assert.equal(nextSaturday(new Date('2026-09-10T12:00:00Z')), '2026-09-12');
  assert.equal(nextSaturday(new Date('2026-09-12T12:00:00Z')), '2026-09-12');
  assert.equal(nextSaturday(new Date('2026-09-13T12:00:00Z')), '2026-09-19');
  assert.equal(nextSaturday(new Date('2026-12-31T12:00:00Z')), '2027-01-02');
});

test('past, impossible and malformed dates do not start a booking', () => {
  const now = new Date('2026-09-10T12:00:00Z');
  for (const date of ['2026-09-09', '2027-02-29', '2026-13-02', '2026-9-12', '', 'invalid']) {
    assert.throws(() => validateBooking({ guests: 2, date }, now));
  }
  assert.deepEqual(validateBooking({ guests: 2, date: '2028-02-29' }, now), { guests: 2, date: '2028-02-29' });
});

test('party size bounds are enforced without mutating frozen inputs', () => {
  const now = new Date('2026-09-10T12:00:00Z');
  for (const guests of [0, -1, 21, 1.5, NaN, Infinity, true, null, {}, 'two']) {
    assert.throws(() => validateBooking({ guests, date: '2026-09-12' }, now));
  }
  const input = Object.freeze({ guests: '20', date: '2026-09-12' });
  assert.deepEqual(validateBooking(input, now), { guests: 20, date: '2026-09-12' });
  assert.equal(input.guests, '20');
});

test('handoff keeps the real venue, date and party size and leaves time selection to the provider', () => {
  const url = new URL(bookingUrl({ guests: 6, date: '2026-09-12' }, new Date('2026-09-10T12:00:00Z')));
  assert.equal(url.origin, 'https://www.designmynight.com');
  assert.equal(url.pathname, '/book');
  assert.deepEqual(Object.fromEntries(url.searchParams), {
    venue_id: VENUE_ID, source: 'partner', num_people: '6', date: '2026-09-12',
  });
});
