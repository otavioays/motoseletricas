document.addEventListener('DOMContentLoaded',()=>{
  if(window.lucide) lucide.createIcons();

  const whatsappNumber='5545999311614';
  const whatsappMessages={
    'Electric Scooter 5 Plus 12':'Tenho interesse no Patinete Elétrico Xiaomi Electric Scooter 5 Plus 12 e queria saber mais informações.',
    'HL08 8"':'Tenho interesse no Patinete Elétrico Audisat HL08 8 polegadas e queria saber mais informações.',
    'Cappuccino':'Tenho interesse na Moto Elétrica Smart Wheel Cappuccino e queria saber mais informações.',
    'Q-500 Black 48V20AH':'Tenho interesse na Moto Elétrica Quatro e 500WATTS Q-500 Black 48V20AH e queria saber mais informações.'
  };

  const whatsappUrl=message=>`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const style=document.createElement('style');
  style.textContent=`
    .whatsapp-product-button{margin-top:18px;width:100%;display:flex;align-items:center;justify-content:center;gap:9px;padding:14px 18px;border-radius:999px;background:#72ff4f;color:#050505;text-decoration:none;font-weight:800;transition:transform .25s ease,box-shadow .25s ease}
    .whatsapp-product-button:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(114,255,79,.2)}
    .whatsapp-product-button svg{width:18px;height:18px}
    .lead-form button{width:100%}
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.model-card').forEach(card=>{
    const title=card.querySelector('h3')?.textContent.trim();
    const info=card.querySelector('.model-info');
    const message=whatsappMessages[title];
    if(!info||!message) return;

    const link=document.createElement('a');
    link.className='whatsapp-product-button';
    link.href=whatsappUrl(message);
    link.target='_blank';
    link.rel='noopener noreferrer';
    link.setAttribute('aria-label',`Pedir informações sobre ${title} pelo WhatsApp`);
    link.innerHTML='<i data-lucide="message-circle"></i> Tenho interesse';
    info.appendChild(link);
  });

  if(window.lucide) lucide.createIcons();

  const menuBtn=document.querySelector('.menu-button');
  const mobileMenu=document.querySelector('.mobile-menu');
  menuBtn?.addEventListener('click',()=>mobileMenu?.classList.toggle('open'));
  document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>mobileMenu?.classList.remove('open')));

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.14});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  const hero=document.querySelector('.film-stage');
  const heroImg=document.querySelector('.hero-media img');
  if(hero&&heroImg){
    hero.addEventListener('mousemove',e=>{
      const r=hero.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      heroImg.style.transform=`scale(1.04) translate(${x*-12}px,${y*-10}px)`;
    });
    hero.addEventListener('mouseleave',()=>heroImg.style.transform='scale(1) translate(0,0)');
  }

  const speed=document.querySelector('.speed-panel strong');
  let t=0;
  setInterval(()=>{
    t+=.14;
    if(speed) speed.textContent=Math.round(100+Math.sin(t)*2);
  },120);

  const form=document.querySelector('.lead-form');
  const submitButton=form?.querySelector('button[type="submit"]');
  if(submitButton) submitButton.innerHTML='Falar no WhatsApp <i data-lucide="message-circle"></i>';
  if(window.lucide) lucide.createIcons();

  form?.addEventListener('submit',e=>{
    e.preventDefault();
    const selected=form.querySelector('select')?.value;
    const name=form.querySelector('input[type="text"]')?.value.trim();
    const baseMessage=`Tenho interesse na ${selected} e queria saber mais informações.`;
    const personalized=name?`Olá, meu nome é ${name}. ${baseMessage}`:baseMessage;
    window.open(whatsappUrl(personalized),'_blank','noopener,noreferrer');
  });

  let lastY=window.scrollY;
  const header=document.querySelector('.site-header');
  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    if(header){
      header.style.transform=y>lastY&&y>180?'translateY(-110%)':'translateY(0)';
      header.style.transition='transform .35s ease';
    }
    lastY=y;
  });

  const cursor=document.createElement('div');
  cursor.style.cssText='position:fixed;width:220px;height:220px;border-radius:50%;pointer-events:none;z-index:-1;background:radial-gradient(circle,rgba(114,255,79,.12),transparent 68%);transform:translate(-50%,-50%);transition:opacity .25s;opacity:0';
  document.body.appendChild(cursor);
  window.addEventListener('mousemove',e=>{
    cursor.style.left=e.clientX+'px';
    cursor.style.top=e.clientY+'px';
    cursor.style.opacity='1';
  });
  window.addEventListener('mouseleave',()=>cursor.style.opacity='0');
});
