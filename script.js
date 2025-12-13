
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


// SERVICES SECTION OPTIMIZATION

const servicesData = {
  child: [
    {
      title: "Learning Disorder",
      img: "./images/learning_disorder.jpg",
      desc: "Learning disability refers to difficulty in skills like reading, writing, or mathematics despite normal intelligence. With early identification and support, children can learn effectively and build confidence."
    },
    {
      title: "Autism Spectrum Disorder",
      img: "./images/autism.jpg",
      desc: "Autism is a developmental condition affecting communication, social interaction, and behaviour. Early intervention and supportive therapies help individuals reach their full potential."
    },
    {
      title: "Attention Deficit Hyperactivity Disorder (ADHD)",
      img: "./images/adhd.jpg",
      desc: "ADHD causes problems with attention, impulsivity, and restlessness that affect academic and social functioning. Proper treatment helps children improve focus, behaviour, and self-esteem."
    }
  ],

  adult: [
    {
      title: "Depression / Anxiety",
      img: "./images/depression2.jpg",
      desc: "Anxiety and depression involve excessive worry, fear, or nervousness and persistent low mood, loss of interest, and reduced energy that interfere with daily functioning. Both are medical conditions and respond well to appropriate treatment."
    },
    {
      title: "Obsessive Compulsive Disorder (OCD)",
      img: "./images/ocd.jpg",
      desc: "OCD involves unwanted repetitive thoughts and compulsive behaviours performed to reduce anxiety. With appropriate treatment, people can gain good control over symptoms."
    },
    {
      title: "Schizophrenia",
      img: "./images/schiz.jpg",
      desc: "Schizophrenia affects thinking, perception, and behaviour, causing symptoms like hallucinations and delusions. Early diagnosis and sustained treatment significantly improve long-term outcomes."
    }
  ],

  geriatric: [
    {
      title: "Dementia",
      img: "./images/dementia.jpg",
      desc: "Dementia leads to a gradual decline in memory, thinking, and daily functioning beyond normal ageing. Early diagnosis helps in planning care and improving quality of life."
    },
    {
      title: "Depression in Older Adults",
      img: "./images/depression_old.jpg",
      desc: "Depression in the elderly may present with sadness, withdrawal, or physical complaints. It is treatable and should not be considered a normal part of ageing."
    },
    {
      title: "Delirium",
      img: "./images/confusion.jpg",
      desc: "Delirium is a sudden state of confusion caused by medical illness, infections, or medications. It is a medical emergency and usually reversible when treated promptly."
    }
  ]
};

function renderServiceCards(data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = data.map(item => `
    <article class="bg-white rounded-lg shadow hover:shadow-lg hover:-translate-y-1 animate-fadeInSlow delay-800 transition cursor-pointer">
      <img src="${item.img}"
           loading="lazy"
           decoding="async"
           class="w-full h-48 object-cover rounded-md">
      <div class="p-5">
        <h3 class="font-semibold">${item.title}</h3>
        <p class="mt-2 text-sm text-slate-600">${item.desc}</p>
      </div>
    </article>
  `).join('');
}

renderServiceCards(servicesData.child, 'childServices');
renderServiceCards(servicesData.adult, 'adultServices');
renderServiceCards(servicesData.geriatric, 'geriatricServices');
