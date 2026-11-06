const express = require('express');
const router = express.Router();

// A transparent adapter for the public BypassURL service.
// Availability/coverage depends on the upstream provider.
const BASE = process.env.BYPASS_API_BASE || 'https://bypassurl.com';

router.get('/health', (_req,res) => res.json({ok:true, name:'BypassLink BRUTALL'}));
router.get('/supported', async (_req,res) => {
  try {
    const r = await fetch(`${BASE.replace(/\\/$/,'')}/api/supported`);
    const body = await r.text();
    res.status(r.status).type(r.headers.get('content-type') || 'application/json').send(body);
  } catch (e) { res.status(502).json({error:'Provider unavailable', detail:e.message}); }
});
router.post('/fetch', async (req,res) => {
  const url = String(req.body?.url || '').trim();
  if (!url) return res.status(400).json({error:'Masukkan URL terlebih dahulu.'});
  let parsed;
  try { parsed = new URL(url); } catch { return res.status(400).json({error:'URL tidak valid.'}); }
  if (!['http:','https:'].includes(parsed.protocol)) return res.status(400).json({error:'Hanya URL http/https yang didukung.'});
  try {
    const r = await fetch(`${BASE.replace(/\\/$/,'')}/api/fetch`, {
      method:'POST', headers:{'content-type':'application/json'},
      body:JSON.stringify({url})
    });
    const body = await r.text();
    res.status(r.status).type(r.headers.get('content-type') || 'application/json').send(body);
  } catch (e) { res.status(502).json({error:'Provider tidak dapat dihubungi.', detail:e.message}); }
});
module.exports = router;
