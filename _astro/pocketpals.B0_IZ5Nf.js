const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["_astro/dog.t-4eddjb.js","_astro/Base.astro_astro_type_script_index_0_lang.xwOnjcl-.js"])))=>i.map(i=>d[i]);
import{t as e}from"./Base.astro_astro_type_script_index_0_lang.xwOnjcl-.js";async function t(t){let n=await e(()=>import(`./dog.t-4eddjb.js`),__vite__mapDeps([0,1])),r=document.createElement(`div`);r.className=`pp-demo`,r.innerHTML=`
    <p class="pp-say">The dog along the bottom of this page is a little like a Pocket Pal. Try these:</p>
    <div class="pp-ui">
      <button type="button" class="btn" data-pp="ball"><span class="face">Throw the ball</span></button>
      <button type="button" class="btn" data-pp="come"><span class="face">Call it over</span></button>
      <button type="button" class="btn" data-pp="trick"><span class="face">Ask for a trick</span></button>
      <button type="button" class="btn" data-pp="nap"><span class="face">Nap time</span></button>
    </div>
    <p class="pp-note">Tip: double-click near the bottom of the page to throw the ball somewhere else.</p>`;let i=document.createElement(`style`);i.textContent=`.pp-demo{position:absolute;inset:0;display:grid;place-content:center;justify-items:center;gap:18px;padding:24px;text-align:center;background:linear-gradient(#ffe9d6,#ffd2b8);color:#3a2618}
  .pp-say{margin:0;max-width:46ch;font-weight:600;font-size:1.05rem}.pp-ui{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}.pp-ui .btn{--btn-bg:#fff;--btn-fg:#3a2618;--btn-line:#f0c9a8}.pp-note{margin:0;font-size:.85rem;opacity:.8}`,r.append(i),t.mount.append(r),document.documentElement.dataset.dog===`off`&&document.querySelector(`[data-dog-toggle]`)?.click(),n.start(),r.querySelectorAll(`[data-pp]`).forEach(e=>e.addEventListener(`click`,()=>{let r=t.root.getBoundingClientRect();switch(e.dataset.pp){case`ball`:n.throwBall();break;case`come`:n.command(`come`,r.left+r.width/2);break;case`trick`:n.command(`trick`);break;case`nap`:n.command(`nap`)}})),t.ready()}export{t as start};