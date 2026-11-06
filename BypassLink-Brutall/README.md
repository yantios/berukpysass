# BypassLink BRUTALL — Made by Jelan

Dark brutal/cyber UI. Repo ini berdiri sendiri; tidak menimpa repo lama.

## Local (Termux / laptop)
```bash
npm install
npm start
```
Buka `http://localhost:3000`.

## Deploy Vercel
1. Upload folder/repo ini ke **repo GitHub baru** (mis. `BypassLink-Brutall`).
2. Import repo baru di Vercel, Framework Preset: **Other**.
3. Deploy. `public/` adalah frontend; folder `api/` berisi Vercel Functions.
4. Opsional Environment Variable: `BYPASS_API_BASE` = `https://bypassurl.com` (default sudah diatur).

## Catatan
- Hasil bergantung pada provider upstream dan link yang didukung; tidak menjamin semua URL.
- Gunakan hanya untuk link/konten yang memang boleh kamu akses.
- API upstream dapat berubah, membatasi request, atau tidak tersedia.
