// Company contact details, as published on the original engoldconsultingllc.com site.
// Used by the header top bar, Contact page and footer so they always stay in sync.

export const EMAIL = 'info@engoldconsultingllc.com';
// IT Recruitment enquiries (all calls to action on the IT Recruitment page)
export const RECRUITMENT_EMAIL = 'As@engoldconsultingllc.com';
export const PHONE = '+888 252 7899';
export const PHONE_HREF = 'tel:+8882527899';
export const HOURS = '8am - 6pm EST';

const mapsUrl = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

export const OFFICES = [
  {
    name: 'Chicago Office',
    lines: ['9784 Bedford Drive', 'Huntley, IL 60142'],
    mapsUrl: mapsUrl('9784 Bedford Drive, Huntley, IL 60142'),
  },
  {
    name: 'Dallas Office',
    lines: ['11325 Pegasus Street, # E-266', 'Dallas, TX 75238'],
    mapsUrl: mapsUrl('11325 Pegasus Street, Dallas, TX 75238'),
  },
];

// Company LinkedIn page (confirmed by the client). Job openings are posted there too.
export const LINKEDIN_URL = 'https://www.linkedin.com/company/engold-consulting/';
export const CAREERS_URL = LINKEDIN_URL;
