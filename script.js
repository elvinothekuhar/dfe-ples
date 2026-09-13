const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

async function loadCollection(folder){
  // The live CMS writes JSON files into these folders. A static site cannot list
  // a directory by itself, so the deployed version can optionally use a generated
  // manifest at content/manifest.json. If unavailable, the built-in placeholders remain.
  try{
    const r=await fetch('content/manifest.json',{cache:'no-store'});
    if(!r.ok) throw new Error('manifest missing');
    const manifest=await r.json();
    const files=(manifest[folder]||[]);
    const items=await Promise.all(files.map(async f=>{
      const x=await fetch(`content/${folder}/${f}`,{cache:'no-store'});
      return x.ok?x.json():null;
    }));
    return items.filter(Boolean);
  }catch(e){return []}
}

function renderPrograms(items){
  if(!items.length)return;
  const list=document.querySelector('.program-list'); if(!list)return;
  list.innerHTML=items.filter(x=>x.active!==false).map((p,i)=>`
    <article class="program ${i===items.length-1?'featured':''}">
      <div class="program-no">${String(i+1).padStart(2,'0')}</div>
      <div><span>${p.category||''}</span><h3>${p.title||''}</h3><p>${p.description||''}</p>
      ${i===items.length-1?'<div class="program-tag">DISCIPLINE · FOCUS · GROWTH</div>':''}</div>
      <a href="#contact">→</a>
    </article>`).join('');
}
function renderSchedule(items){
  if(!items.length)return;
  const table=document.querySelector('.schedule-table'); if(!table)return;
  table.innerHTML=`<div class="row head"><span>DAN</span><span>PROGRAM</span><span>SKUPINA</span><span>TERMIN</span></div>`+
  items.filter(x=>x.active!==false).map(x=>`<div class="row"><span>${x.day||''}</span><span>${x.program||''}</span><span>${x.group||''}</span><strong>${x.time||'—'}</strong></div>`).join('');
}
function renderNews(items){
  if(!items.length)return;
  const wrap=document.querySelector('.news'); if(!wrap)return;
  const head=wrap.querySelector('.section-head'); const kicker=wrap.querySelector('.section-kicker');
  wrap.innerHTML='';
  if(kicker)wrap.append(kicker); if(head)wrap.append(head);
  items.filter(x=>x.published!==false).forEach((x,i)=>{
    wrap.insertAdjacentHTML('beforeend',`<article class="news-item"><span>${String(i+1).padStart(2,'0')}</span><div><small>${x.category||'OBVESTILO / D.F.E.'}</small><h3>${x.title||''}</h3><p>${x.text||''}</p></div><time>${x.status||'—'}</time></article>`);
  });
}
function renderDocuments(items){
  if(!items.length)return;
  const list=document.querySelector('.document-list'); if(!list)return;
  list.innerHTML=items.filter(x=>x.published!==false).map(x=>`<a href="${x.file||'#'}" class="doc" ${x.file?'target="_blank"':''}><span>PDF</span><div><strong>${x.title||''}</strong><small>${x.description||''}</small></div><b>↓</b></a>`).join('');
}

(async()=>{
  const [p,s,n,d]=await Promise.all([
    loadCollection('programs'),loadCollection('schedule'),loadCollection('news'),loadCollection('documents')
  ]);
  renderPrograms(p);renderSchedule(s);renderNews(n);renderDocuments(d);
})();

const form=document.getElementById('contactForm'),msg=document.getElementById('formMessage');
form?.addEventListener('submit',e=>{
  e.preventDefault(); const d=new FormData(form);
  const subject=encodeURIComponent(`Povpraševanje – ${d.get('ime')} ${d.get('priimek')}`);
  const body=encodeURIComponent(`Ime: ${d.get('ime')} ${d.get('priimek')}\nE-mail: ${d.get('email')}\nTelefon: ${d.get('telefon')}\n\n${d.get('sporocilo')}`);
  window.location.href=`mailto:plesniklub-dfe@gmail.com?subject=${subject}&body=${body}`;
  msg.textContent='Odpre se vaš e-poštni program za pošiljanje sporočila.';
});
const observer=new IntersectionObserver(entries=>entries.forEach(x=>{if(x.isIntersecting)x.target.classList.add('seen')}),{threshold:.12});
document.querySelectorAll('.section,.manifesto,.statement,.full-quote').forEach(x=>observer.observe(x));
