// Sends a form to Netlify Forms (https://docs.netlify.com/forms/setup/).
//
// Netlify only accepts fields it found at deploy time, so every form name and field sent from here
// must also appear in the hidden static forms in index.html. Keep the two in sync.
// Submissions show in the Netlify dashboard (Forms) and are emailed to the address set under
// Site configuration > Notifications > Form submission notifications (info@engoldconsultingllc.com).

// Netlify's limit for a whole submission is 8 MB; keep files comfortably under it.
export const MAX_FILE_BYTES = 6 * 1024 * 1024;

/**
 * @param {string} formName  name of the form in index.html (e.g. "hire", "job", "contact")
 * @param {Record<string, string>} fields  field name -> value
 * @param {File | null} [file]  optional upload, sent as the "attachment" field
 */
export async function submitNetlifyForm(formName, fields, file = null) {
    const data = new FormData();
    data.append('form-name', formName);
    Object.entries(fields).forEach(([name, value]) => data.append(name, value ?? ''));
    if (file) data.append('attachment', file, file.name);

    // Multipart body; the browser sets the Content-Type boundary itself.
    const res = await fetch('/', { method: 'POST', body: data });
    if (!res.ok) throw new Error(`Form submission failed (HTTP ${res.status})`);
}
