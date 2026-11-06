const form=document.querySelector('#form'), input=document.querySelector('#url'), go=document.querySelector('#go');
const result=document.querySelector('#result'), message=document.querySelector('#message'), output=document.querySelector('#output');
function status(text,type=''){message.textContent=text;result.className='result '+type;}
form.addEventListener('submit',async e=>{
 e.preventDefault();const url=input.value.trim();output.hidden=true;output.textContent='';
 go.disabled=true;go.querySelector('span').textContent='WORKING';status('PROCESSING — menghubungi provider…');
 try{
  const r=await fetch('/api/fetch',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url})});
  const data=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(data.error||data.message||`Provider error (${r.status})`);
  const dest=data.destination||data.url||data.result||data.link||data.data?.url||data.data?.destination;
  if(typeof dest==='string'&&/^https?:\/\//i.test(dest)){
    status('SUCCESS — destination ditemukan','success');
    output.hidden=false;output.innerHTML=`<div style="margin-bottom:10px;color:#a18bb8">DESTINATION</div><a id="dest" href="${esc(dest)}" target="_blank" rel="noopener noreferrer">${esc(dest)}</a><div style="margin-top:15px"><button type="button" id="openDest">OPEN DESTINATION ↗</button></div>`;
    document.querySelector('#openDest').onclick=()=>window.open(dest,'_blank','noopener');
  }else{
    status('RESPONSE RECEIVED — cek hasil provider','success');output.hidden=false;output.textContent=JSON.stringify(data,null,2);
  }
 }catch(err){status('FAILED — '+err.message,'error');output.hidden=false;output.textContent='Pastikan link didukung dan provider sedang aktif. '+err.message;}
 finally{go.disabled=false;go.querySelector('span').textContent='BYPASS';}
});
function esc(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
