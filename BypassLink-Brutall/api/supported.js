module.exports = async (_req,res) => {
  const base=(process.env.BYPASS_API_BASE||'https://bypassurl.com').replace(/\/$/,'');
  try{const r=await fetch(`${base}/api/supported`);res.status(r.status);res.setHeader('content-type',r.headers.get('content-type')||'application/json');res.send(await r.text());}
  catch(e){res.status(502).json({error:'Provider tidak dapat dihubungi.',detail:e.message});}
};
