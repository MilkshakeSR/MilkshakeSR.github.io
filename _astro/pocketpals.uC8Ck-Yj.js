import{SVG as e}from"./pet.BDMlFRid.js";function t(t){let n=document.createElement(`div`);n.className=`pp-demo`,n.innerHTML=`
    <div class="pp-room" aria-hidden="true"><div class="pp-window"></div><div class="pp-bed"></div><div class="pp-ball"></div></div>
    <div class="pp-pal" data-mood="happy" aria-hidden="true"></div>
    <p class="pp-say" aria-live="polite">Hi! I'm Pip. I live at the bottom of every page on this site.</p>
    <div class="pp-ui">
      <button type="button" class="btn btn-sm" data-pp="pet">Pet</button>
      <button type="button" class="btn btn-sm" data-pp="fetch">Play fetch</button>
      <button type="button" class="btn btn-sm" data-pp="nap">Nap time</button>
      <button type="button" class="btn btn-sm" data-pp="stretch">Stretch break</button>
    </div>`;let r=n.querySelector(`.pp-pal`);r.innerHTML=e,r.classList.add(`pet`);let i=document.createElement(`style`);i.textContent=`.pp-demo{position:absolute;inset:0;background:linear-gradient(#ffe9d6,#ffd2b8 70%,#e8a97f 70%);overflow:hidden;color:#3a2618}
  :root[data-theme=dark] .pp-demo,.pp-demo{--x:50%}
  .pp-window{position:absolute;left:8%;top:10%;width:22%;aspect-ratio:1.2;border-radius:12px;background:linear-gradient(#9fd8ff,#d8f0ff);border:8px solid #fff4ea}
  .pp-bed{position:absolute;right:10%;bottom:22%;width:20%;aspect-ratio:2.2;border-radius:50% 50% 18px 18px;background:#ff8fa3;box-shadow:inset 0 -12px 0 #e86f86}
  .pp-ball{position:absolute;left:30%;bottom:26%;width:28px;height:28px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff 0 12%,#ffcf3f 13%);transition:left 1s cubic-bezier(.3,1.4,.5,1),bottom 1s}
  .pp-pal.pet{display:block!important;position:absolute;left:var(--x);bottom:26%;top:auto;width:168px;height:144px;transform:translateX(-50%);transition:left 1s var(--ease);filter:drop-shadow(0 10px 12px rgb(0 0 0 / .2))}
  .pp-pal.pet svg{width:168px;height:144px}
  .pp-say{position:absolute;left:50%;top:10%;transform:translateX(-50%);max-width:min(420px,80%);margin:0;padding:12px 16px;border-radius:16px;background:#fff;box-shadow:0 10px 30px -10px rgb(0 0 0 / .3);text-align:center;font-weight:560}
  .pp-ui{position:absolute;left:0;right:0;bottom:14px;display:flex;flex-wrap:wrap;gap:8px;justify-content:center}.pp-ui .btn{--btn-bg:#fff;--btn-fg:#3a2618;border-color:#f0c9a8}`,n.append(i),t.mount.append(n);let a=n.querySelector(`.pp-say`),o=n.querySelector(`.pp-ball`),s=(e,t)=>{r.dataset.state=e,t&&n.style.setProperty(`--x`,t)};s(`idle`),n.querySelectorAll(`[data-pp]`).forEach(e=>e.addEventListener(`click`,()=>{switch(r.classList.remove(`happy`),e.dataset.pp){case`pet`:s(`idle`,`50%`),r.offsetWidth,r.classList.add(`happy`),a.textContent=`Purrrr… that's the spot!`;break;case`fetch`:{let e=15+Math.random()*60;o.style.left=`${e}%`,o.style.bottom=`40%`,setTimeout(()=>{o.style.bottom=`26%`},350),s(`walk`,`${e}%`),a.textContent=`Got it! Again, again!`,setTimeout(()=>s(`idle`),1100);break}case`nap`:s(`sleep`,`78%`),a.textContent=`Zzz… (I nap on the site too, if you stop scrolling.)`;break;case`stretch`:s(`hop`,`50%`),a.textContent=`Stretch time! Roll your shoulders and look at something far away for 20 seconds.`,setTimeout(()=>s(`idle`),1200)}})),t.ready()}export{t as start};