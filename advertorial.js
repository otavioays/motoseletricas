document.addEventListener('DOMContentLoaded',()=>{
  const progress=document.querySelector('.reading-progress');
  const updateProgress=()=>{
    const scrollable=document.documentElement.scrollHeight-window.innerHeight;
    const value=scrollable>0?(window.scrollY/scrollable)*100:0;
    if(progress) progress.style.width=`${Math.min(100,Math.max(0,value))}%`;
  };
  window.addEventListener('scroll',updateProgress,{passive:true});
  updateProgress();

  const menuButton=document.querySelector('.menu-trigger');
  const mobileNav=document.querySelector('.mobile-nav');
  menuButton?.addEventListener('click',()=>{
    const open=mobileNav?.classList.toggle('open');
    menuButton.setAttribute('aria-expanded',String(Boolean(open)));
  });

  document.querySelectorAll('[data-share]').forEach(button=>{
    button.addEventListener('click',async()=>{
      const title=document.title;
      const url=window.location.href;
      if(navigator.share){
        try{await navigator.share({title,url});}catch(error){/* cancelamento do usuário */}
        return;
      }
      try{
        await navigator.clipboard.writeText(url);
        const original=button.textContent;
        button.textContent='✓';
        setTimeout(()=>button.textContent=original,1400);
      }catch(error){
        window.prompt('Copie o link desta matéria:',url);
      }
    });
  });

  const cookie=document.querySelector('.cookie-note');
  const cookieButton=cookie?.querySelector('button');
  if(sessionStorage.getItem('advertorialCookieAccepted')==='1') cookie?.remove();
  cookieButton?.addEventListener('click',()=>{
    sessionStorage.setItem('advertorialCookieAccepted','1');
    cookie?.remove();
  });
});
