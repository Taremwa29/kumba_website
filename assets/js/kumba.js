// Hide the preloader once everything has loaded (with a safety fallback).
function kumbaHidePreloader(){
  const p=document.getElementById('preloader');
  if(p)p.classList.add('is-done');
}
window.addEventListener('load',()=>setTimeout(kumbaHidePreloader,350));
// Fallback: never let the preloader trap the page if 'load' is delayed.
setTimeout(kumbaHidePreloader,4000);

document.addEventListener('DOMContentLoaded',()=>{
  const t=document.querySelector('[data-nav-toggle]');
  if(t)t.addEventListener('click',()=>document.body.classList.toggle('nav-open'));
  const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  const f=document.querySelector('#enquiry-form');
  if(f)f.addEventListener('submit',ev=>{
    ev.preventDefault();
    const val=n=>(f.elements[n]?.value||'').trim();
    const subject=`Enquiry: ${val('programme')}`;
    const body=`Name: ${val('name')}\r\nEmail: ${val('email')}\r\nProgramme: ${val('programme')}\r\n\r\n${val('message')}`;
    window.location.href=`mailto:info@kumbaeducenter.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
