const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
async function loadJSON(path){try{const r=await fetch(path+'?v='+Date.now());return r.ok?await r.json():null}catch(e){return null}}
async function init(){
 const about=await loadJSON('content/about.json');
 if(about){
  $('#about-title').textContent=about.title||'VEČ KOT PLES.';
  $('#about-lead').textContent=about.lead||'';
  $('#about-text').textContent=about.schoolText||'';
  $('#about-dance-word').textContent=about.danceTitle||'DANCE';
  $('#about-dance-text').textContent=about.danceText||'';
  $('#about-flow-word').textContent=about.flowTitle||'FLOW';
  $('#about-flow-text').textContent=about.flowText||'';
  $('#about-elevate-word').textContent=about.elevateTitle||'ELEVATE';
  $('#about-elevate-text').textContent=about.elevateText||'';
 }
 const app=await loadJSON('content/application.json');
 if(app){
  $('#application-title').textContent=app.title||'PRIJAVNICA D.F.E.';
  $('#application-description').textContent=app.description||'Aktualna prijavnica v PDF obliki.';
  if(app.file){$('#application-link').href=app.file;$('#application-link').style.display='inline-flex'}
  else $('#application-link').style.display='none';
 }
 const c=await loadJSON('content/contact.json');
 if(c){
  $('#contact-heading').textContent=c.heading||'KONTAKT';
  $('#contact-title').innerHTML=[c.heading1,c.heading2,c.heading3].filter(Boolean).map(esc).join('<br>');
  $('#contact-location').textContent=c.location||'';
  $('#contact-address').textContent=c.address||'';
  $('#contact-city').textContent=c.city||'';
  $('#contact-phone').textContent=c.phone||'';
  $('#contact-phone').href='tel:'+String(c.phone||'').replace(/\s/g,'');
  $('#contact-email').textContent=c.email||'';
  $('#contact-email').href='mailto:'+String(c.email||'');
 }
}
init();