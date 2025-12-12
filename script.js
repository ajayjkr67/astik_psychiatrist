// script.js - lightweight interactivity


// Mobile menu toggle
const mobileBtn = document.getElementById('mobileBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuOpen = document.getElementById('menuOpen');
const menuClose = document.getElementById('menuClose');
if(mobileBtn){
mobileBtn.addEventListener('click', ()=>{
mobileMenu.classList.toggle('hidden');
menuOpen.classList.toggle('hidden');
menuClose.classList.toggle('hidden');
})
}


// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
a.addEventListener('click', (e)=>{
const target = document.querySelector(a.getAttribute('href'));
if(target){
e.preventDefault();
window.scrollTo({top: target.offsetTop-64, behavior:'smooth'});
if(!mobileMenu.classList.contains('hidden')){
mobileMenu.classList.add('hidden');
menuOpen.classList.remove('hidden');
menuClose.classList.add('hidden');
}
}
})
})


// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item=>{
const btn = item.querySelector('.faq-q');
const ans = item.querySelector('.faq-a');
const icon = item.querySelector('.faq-icon');
btn.addEventListener('click', ()=>{
const isHidden = ans.classList.contains('hidden');
document.querySelectorAll('.faq-a').forEach(a=>a.classList.add('hidden'));
document.querySelectorAll('.faq-icon').forEach(i=>i.textContent = '+');
if(isHidden){
ans.classList.remove('hidden');
icon.textContent = '-';
} else {
ans.classList.add('hidden');
icon.textContent = '+';
}
})
})




// Contact form (client-side only)
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
if(form){
form.addEventListener('submit', (e)=>{
e.preventDefault();
const data = new FormData(form);
status.textContent = 'Sending...';
// Simulate async send (replace with real API)
setTimeout(()=>{
status.textContent = 'Request sent. Clinic will contact you via phone/email. (Client-side demo)';
form.reset();
}, 800);
})
}


// Fill copyright year
document.getElementById('year').textContent = new Date().getFullYear();


// Small accessibility: collapse all FAQ answers on load
window.addEventListener('load', ()=>{
document.querySelectorAll('.faq-a').forEach(a=>a.classList.add('hidden'));
document.querySelectorAll('.faq-icon').forEach(i=>i.textContent = '+');
});



