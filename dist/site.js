import { bookingUrl, londonDate, nextSaturday, validateBooking } from './booking.js';

function showBookingError(error) {
  const message = document.querySelector('#booking-error');
  if (!message) throw error;
  message.textContent = error.message;
  message.hidden = false;
}

function stageBooking(input) {
  const booking = validateBooking(input);
  document.querySelector('#guests').value = String(booking.guests);
  document.querySelector('#booking-date').value = booking.date;
  document.querySelector('#booking-error').hidden = true;
  document.querySelector('#book').scrollIntoView({ block: 'center' });
  document.querySelector('.booking-form button').focus({ preventScroll: true });
  return { status: 'prepared', ...booking, url: bookingUrl(booking), reservationCreated: false };
}

function setupBooking() {
  const form = document.querySelector('.booking-form');
  if (!form) return;
  const date = form.querySelector('#booking-date');
  date.min = londonDate();
  date.value = date.min;
  form.addEventListener('submit', event => {
    try {
      validateBooking({ guests: form.elements.num_people.value, date: date.value });
      document.querySelector('#booking-error').hidden = true;
    } catch (error) {
      event.preventDefault();
      showBookingError(error);
      date.focus();
    }
  });
  document.querySelector('[data-book-saturday]').addEventListener('click', event => {
    event.preventDefault();
    stageBooking({ guests: form.elements.num_people.value, date: nextSaturday() });
  });
}

async function setupAgentTool() {
  const context = document.modelContext;
  if (!context?.registerTool || !document.querySelector('.booking-form')) return;
  const lifecycle = new AbortController();
  window.addEventListener('pagehide', () => lifecycle.abort(), { once: true });
  try {
    await context.registerTool({
      name: 'prepare_table_booking',
      title: 'Prepare a table booking at The Victoria Battersea',
      description: 'Set the visible party size and date. Does not check availability, submit personal details or create a reservation. The guest completes booking with DesignMyNight.',
      inputSchema: { type: 'object', properties: { guests: { type: 'integer', minimum: 1, maximum: 20 }, date: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' } }, required: ['guests', 'date'], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: stageBooking,
    }, { signal: lifecycle.signal });
  } catch (error) {
    console.error('Could not register the optional booking assistant:', error);
  }
}

for (const label of document.querySelectorAll('[data-year]')) label.textContent = new Date().getFullYear();
for (const link of document.querySelectorAll('.mobile-nav a')) {
  link.addEventListener('click', () => { link.closest('details').open = false; });
}
setupBooking();
await setupAgentTool();
