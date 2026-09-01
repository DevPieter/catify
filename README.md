# Catify - Spicetify Extension

**Catify** is a [Spicetify](https://spicetify.app/) extension that adds cute cat related features to your client. :3

## Installation

### Requirements

- Spicetify installed
- Node.js + npm

1. Download or clone this repository
2. Build the extension:

```bash
npm install
npm run build
```

3. The file `catify.js` will be generated in:
- %appdata%\spicetify\Extensions (Windows)

4. Enable the extension:

```bash
spicetify config extensions catify.js
spicetify apply
```