# Wedding invitation starter

A no-build static site: upload these files directly to GitHub Pages or Netlify.

## Before publishing

1. Edit the `CONFIG` object at the top of `script.js` (names, date, venue, map, gift details).
2. Add guest names to `data/guests.js`.
3. Create a Google Form and put its submission URL and `entry.*` field IDs in `script.js` to enable RSVP collection.

## Personalized links

The sample guest `andi-keluarga` becomes:

`https://YOUR-USERNAME.github.io/REPOSITORY/?to=andi-keluarga`

In Google Sheets, create each link with:

```text
="https://YOUR-USERNAME.github.io/REPOSITORY/?to="&A2
```

where column A contains the guest ID. Guest names in this file are public to anyone who views the site source. Use opaque IDs (for example `g7f2k`) if that matters to you. Personalization is a greeting, not access control.

## Netlify

In Netlify, import this GitHub repository. Leave the build command blank and set the publish directory to `.`.

No build command, database, or paid service is needed.
