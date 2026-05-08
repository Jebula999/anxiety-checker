# Anxiety Checker

A simple local-first progressive web app for recording panic/anxiety episodes and exporting the data for therapy discussions or graphing.

## Run locally

```powershell
python -m http.server 5173
```

Open `http://localhost:5173`.

## Install on phone

Android browsers require a secure origin for installable PWAs. Host this folder on HTTPS, then open the HTTPS URL on the phone and use the browser's install option.

The app stores entries in the phone browser's local storage. Use **Backup > Export CSV** or **Export JSON** before clearing browser data, changing phones, or uninstalling the browser.

## Data

- CSV export is best for spreadsheets and graphs.
- JSON export/import is best for full backup and restore.
- CSV import is supported for restoring exported CSV files.
