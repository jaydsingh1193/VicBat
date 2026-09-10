export const VENUE_ID = '608a81ecccb4d71f5264baff';

export function londonDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function validateBooking(input, now = new Date()) {
  if (!input || typeof input !== 'object') throw new Error('Choose your party size and date.');
  if (!['number', 'string'].includes(typeof input.guests)) throw new Error('Choose a valid party size.');
  const guests = Number(input.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 20) {
    throw new Error('Choose between 1 and 20 guests. Please email us for larger groups.');
  }
  if (typeof input.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
    throw new Error('Choose a valid date for your visit.');
  }
  const date = new Date(`${input.date}T12:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== input.date) {
    throw new Error('Choose a valid date for your visit.');
  }
  if (input.date < londonDate(now)) throw new Error('Choose today or a future date.');
  return { guests, date: input.date };
}

export function bookingUrl(input, now = new Date()) {
  const { guests, date } = validateBooking(input, now);
  const url = new URL('https://www.designmynight.com/book');
  url.search = new URLSearchParams({ venue_id: VENUE_ID, source: 'partner', num_people: String(guests), date });
  return url.href;
}

export function nextSaturday(now = new Date()) {
  const date = new Date(`${londonDate(now)}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + (6 - date.getUTCDay() + 7) % 7);
  return date.toISOString().slice(0, 10);
}
