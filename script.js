
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
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  const ans = item.querySelector('.faq-a');
  const icon = item.querySelector('.faq-icon');

  btn.addEventListener('click', () => {
    const open = ans.style.maxHeight;

    // close all
    document.querySelectorAll('.faq-a').forEach(a => {
      a.style.maxHeight = null;
      a.classList.add('opacity-0');
    });
    document.querySelectorAll('.faq-icon').forEach(i => i.textContent = '+');

    // open current
    if (!open) {
      ans.style.maxHeight = ans.scrollHeight + 'px';
      ans.classList.remove('opacity-0');
      icon.textContent = '−';
    }
  });
});


// Contact form

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
    // const res = await fetch('http://localhost:3000/send-email', {
    const res = await fetch('/api/send-email', {
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

// FOOTER YEAR
document.getElementById('year').textContent = new Date().getFullYear();


// TREATMENTS

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