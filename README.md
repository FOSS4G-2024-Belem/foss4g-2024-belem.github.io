# FOSS4G 2024 Belém Website

<img src="/src/images/logo/logo-vertical.png" width="360px">

This repository contains the code for the FOSS4G 2024 Belém Brasil official conference website.

Link: [https://2024.foss4g.org](https://2024.foss4g.org)

## Development

### Required Software
- `git`
- `nodejs (>=16)`
- `npm`

### Quickstart
```bash
git clone git@github.com:FOSS4G-2024-Belem/foss4g-2024-belem.github.io.git
cd foss4g-2024-belem.github.io
npm install
npm run dev
```

### Editing Page Content
- Page content is stored in `/src/pages/${PAGE_URL}.mdx`
  - ex. for the url `https://2024.foss4g.org/en/visiting-belem`
  - the content is at `/src/pages/en/visiting-belem.mdx`
- Internationalization is done with a home-grown implementation
  - users are redirected to language code subfolder (ex. `/en/`) from homepage
  - page slug i18n for internal links is at: `/src/lib/languages.tsx`