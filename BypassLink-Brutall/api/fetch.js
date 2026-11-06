module.exports = async (req,res) => {
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const url=String(req.body?.url||'').trim();
  if(!url) return res.status(400).json({error:'Masukkan URL terlebih dahulu.'});
  try{const u=new URL(url);if(!['http:','https:'].includes(u.protocol))throw new Error();}
  catch{return res.status(400).json({error:'URL tidak valid.'});}
  const base=(process.env.BYPASS_API_BASE||'https://bypassurl.com').replace(/\/$/,'');
  try{
    const upstream=await fetch(`${base}/api/fetch`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({url})});
    const text=await upstream.text();res.status(upstream.status);
    res.setHeader('content-type',upstream.headers.get('content-type')||'application/json');res.send(text);
  }catch(e){res.status(502).json({error:'Provider tidak dapat dihubungi.',detail:e.message});}
};
