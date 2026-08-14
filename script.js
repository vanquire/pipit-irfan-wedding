const CONFIG = {
  eventDate: "2026-09-26T09:00:00+08:00",
  mapUrl: "https://maps.google.com/",
  // Leave empty until your Google Form is ready. See README for the required IDs.
  googleForm: { url: "", name: "", attendance: "", count: "", message: "", guestId: "" }
};
const $ = (selector) => document.querySelector(selector);
const params = new URLSearchParams(window.location.search);
const guestId = params.get("to");
const guest = window.WEDDING_GUESTS?.[guestId];
if (guest) {
  $("#guest-name").textContent = guest.name;
  $("#rsvp-name").value = guest.name;
  document.title = `Undangan untuk ${guest.name}`;
  const count = $("#guest-count");
  [...count.options].forEach((option) => option.hidden = Number(option.value) > guest.maxGuests);
  count.value = "1";
}
$("#map-link").href = CONFIG.mapUrl;
$("#open-invitation").addEventListener("click", () => {
  $("#cover").hidden = true;
  $("#invitation").hidden = false;
  window.scrollTo(0, 0);
});
function updateCountdown() {
  const total = Math.max(0, new Date(CONFIG.eventDate) - Date.now());
  const values = [["Hari", 86400000], ["Jam", 3600000], ["Menit", 60000], ["Detik", 1000]];
  let remaining = total;
  $("#countdown").innerHTML = values.map(([label, size]) => {
    const value = Math.floor(remaining / size); remaining %= size;
    return `<div class="time-unit"><strong>${String(value).padStart(2, "0")}</strong><span>${label}</span></div>`;
  }).join("");
}
updateCountdown(); setInterval(updateCountdown, 1000);
$("#rsvp-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const status = $("#form-status");
  const form = CONFIG.googleForm;
  if (!form.url || !form.name || !form.attendance || !form.count) {
    status.textContent = "RSVP belum dihubungkan ke Google Form. Tambahkan pengaturannya di script.js.";
    return;
  }
  const data = new FormData(event.currentTarget);
  const response = new URLSearchParams({
    [form.name]: data.get("name"), [form.attendance]: data.get("attendance"),
    [form.count]: data.get("count"), [form.message]: data.get("message"),
    ...(form.guestId && guestId ? { [form.guestId]: guestId } : {})
  });
  try {
    await fetch(form.url, { method: "POST", mode: "no-cors", body: response });
    status.textContent = "Terima kasih. Konfirmasi Anda sudah dikirim.";
    event.currentTarget.reset();
  } catch { status.textContent = "Belum terkirim. Silakan coba lagi."; }
});
document.querySelectorAll("[data-copy]").forEach((button) => button.addEventListener("click", async () => {
  await navigator.clipboard.writeText(button.dataset.copy);
  button.textContent = "Nomor tersalin";
}));