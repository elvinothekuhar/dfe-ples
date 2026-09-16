const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
async function loadJSON(path){try{const r=await fetch(path+'?v='+Date.now());return r.ok?await r.json():null}catch(e){return null}}
async function loadCollection(name){const manifest=await loadJSON('content/manifest.json');const files=manifest?.[name]||[];const out=[];for(const f of files){const d=await loadJSON('content/'+name+'/'+f);if(d)out.push(d)}return out}
async function init(){
 const programs=(await loadCollection('programs')).filter(x=>x.active!==false).slice(0,3);
 const grid=$('#program-grid');
 const fallback=[['OTROCI','ZA NAJMLAJŠE PLESALEC','assets/children.jpg'],['MLADINA','RAZVIJAJ SVOJ SLOG','assets/youth.jpg'],['ODRASLI','PLES BREZ OMEJITEV','assets/adults.jpg']];
 grid.innerHTML=(programs.length?programs:fallback.map(x=>({title:x[0],category:x[1],image:x[2]}))).map((p,i)=>`<article class="program-card"><img src="${esc(p.image||fallback[i]?.[2]||'assets/hero.jpg')}" alt="${esc(p.title)}"><div class="program-info"><div class="tag">${esc(p.category||'D.F.E. PROGRAM')}</div><h3>${esc(p.title)}</h3><p>${esc(p.description||'Ples, energija in rast.')}</p></div></article>`).join('');
 const about=await loadJSON('content/about.json');if(about){$('#about-title').textContent=about.title||$('#about-title').textContent;$('#about-lead').textContent=about.lead||'';$('#about-text').textContent=[about.text1,about.text2,about.text3].filter(Boolean).join('\n\n')}
 const app=await loadJSON('content/application.json');if(app){$('#application-title').textContent=app.title||'PRIJAVNICA D.F.E.';$('#application-description').textContent=app.description||'Aktualna prijavnica v PDF obliki.';if(app.file){$('#application-link').href=app.file}else{$('#application-link').style.display='none'}}
 const gallery=(await loadCollection('gallery')).filter(x=>x.published!==false).slice(0,6);const gg=$('#gallery-grid');gg.innerHTML=(gallery.length?gallery:[{image:'assets/children.jpg',title:'Otroci'},{image:'assets/youth.jpg',title:'Mladina'},{image:'assets/adults.jpg',title:'Odrasli'}]).map(g=>g.image?`<div class="gallery-item"><img src="${esc(g.image)}" alt="${esc(g.title||'D.F.E. galerija')}"></div>`:`<div class="gallery-item"><div class="gallery-video">VIDEO</div></div>`).join('');
 const c=await loadJSON('content/contact.json');if(c){$('#contact-heading').textContent=c.heading||'KONTAKT';$('#contact-title').innerHTML=[c.heading1,c.heading2,c.heading3].filter(Boolean).map(esc).join('<br>');$('#contact-location').textContent=c.location||'';$('#contact-address').textContent=c.address||'';$('#contact-city').textContent=c.city||'';$('#contact-phone').textContent=c.phone||'';$('#contact-phone').href='tel:'+String(c.phone||'').replace(/\s/g,'');$('#contact-email').textContent=c.email||'';$('#contact-email').href='mailto:'+String(c.email||'')}
}
init();
