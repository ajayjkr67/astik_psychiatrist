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
// const form = document.getElementById('contactForm');
// const status = document.getElementById('formStatus');
// if(form){
// form.addEventListener('submit', (e)=>{
// e.preventDefault();
// const data = new FormData(form);
// status.textContent = 'Sending...';
// // Simulate async send (replace with real API)
// setTimeout(()=>{
// status.textContent = 'Request sent. Clinic will contact you via phone/email.';
// form.reset();
// }, 800);
// })
// }


// const form = document.getElementById('contactForm');
// const alertBox = document.getElementById('formAlert');

// if (form) {
//   form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     alertBox.textContent = 'Sending...';
//     alertBox.classList.remove('hidden', '-translate-y-3');
//     alertBox.classList.add('translate-y-0');

//     setTimeout(() => {
//       alertBox.textContent = 'Request sent. Clinic will contact you.';
//     }, 600);

//     setTimeout(() => {
//       alertBox.classList.add('-translate-y-3');
//       setTimeout(() => alertBox.classList.add('hidden'), 300);
//       form.reset();
//     }, 3000);
//   });
// }

// // For Email Sending

//   const clinicPhone = "8976747475";

//   form?.addEventListener('submit', async e => {
//     e.preventDefault();
//     const data = ['first_name','last_name','email','user_phone','message'].reduce((acc,id) => {
//       acc[id] = document.getElementById(id).value.trim();
//       return acc;
//     }, {});
//     if (!data.first_name || !data.email || !data.message) return alert("Please fill all required fields.");
//     try {
//       const res = await fetch('http://localhost:3000/send-email', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(data)
//       });
//       if (!res.ok) throw new Error('Network error');
//       alert('Message sent!');
//       form.reset();
//     } catch (err) {
//       alert('Oops, something went wrong.');
//       console.error(err);
//     }
//   });


const form = document.getElementById('contactForm');
const alertBox = document.getElementById('formAlert');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // UI: show sending
  alertBox.textContent = 'Sending...';
  alertBox.classList.remove('hidden', '-translate-y-3');
  alertBox.classList.add('translate-y-0');

  const data = ['first_name','last_name','email','user_phone','message']
    .reduce((acc, id) => {
      acc[id] = document.getElementById(id).value.trim();
      return acc;
    }, {});

  if (!data.first_name || !data.email || !data.message) {
    alertBox.textContent = 'Please fill all required fields.';
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error('Send failed');

    // UI: success
    alertBox.textContent = 'Request sent. Clinic will contact you.';
    form.reset();

    setTimeout(() => {
      alertBox.classList.add('-translate-y-3');
      setTimeout(() => alertBox.classList.add('hidden'), 300);
    }, 3000);

  } catch (err) {
    console.error(err);
    alertBox.textContent = 'Failed to send. Try again.';
  }
});



// Fill copyright year
document.getElementById('year').textContent = new Date().getFullYear();


// Small accessibility: collapse all FAQ answers on load
window.addEventListener('load', ()=>{
document.querySelectorAll('.faq-a').forEach(a=>a.classList.add('hidden'));
document.querySelectorAll('.faq-icon').forEach(i=>i.textContent = '+');
});



  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.icon');
      const isOpen = content.style.maxHeight;

      // close all
      document.querySelectorAll('.accordion-content').forEach(c => {
        c.style.maxHeight = null;
      });
      document.querySelectorAll('.icon').forEach(i => i.textContent = '+');

      // toggle current
      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.textContent = '−';
      }
    });
  });