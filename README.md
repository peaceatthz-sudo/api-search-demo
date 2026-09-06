# Secure API Search Demo

## Run locally
1. Copy `.env.example` to `.env.local`.
2. Set `API_BASE_URL` to the API provider's host.
3. Set `API_KEY` to a newly issued key. Do not commit `.env.local`.
4. Run `npm install`
5. Run `npm run dev`

The browser calls `/api/search`; the Next.js server then calls the provider. The API key is never sent to the browser.

## Deploy
This can be deployed to Vercel or another Next.js host. Add `API_BASE_URL` and `API_KEY` as server environment variables in the host dashboard.

The uploaded documentation should be treated as authoritative for the provider's exact endpoint and permitted fields. This starter intentionally exposes only first/last name in the UI.
