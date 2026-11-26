import{o as e}from"./Base.astro_astro_type_script_index_0_lang.VoWNQRSP.js";var t=`precision highp float;
uniform vec2 uRes; uniform float uTime; uniform float uDay; // uDay: 0 = midnight, 0.5 = noon, 1 = midnight
float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=.5; } return v; }
float daylight(){ return smoothstep(.2,.35,uDay) * (1.-smoothstep(.65,.8,uDay)); }
float golden(){ return exp(-pow((uDay-.27)*14.,2.)) + exp(-pow((uDay-.73)*14.,2.)); }
`,n={starfield:t+`
void main(){
  vec2 uv = (gl_FragCoord.xy - .5*uRes) / uRes.y;
  float d = daylight(), g = golden();
  vec3 night = mix(vec3(.01,.015,.05), vec3(.05,.03,.12), uv.y+.5);
  vec3 day = mix(vec3(.45,.65,.95), vec3(.15,.35,.75), uv.y+.5);
  vec3 col = mix(night, day, d) + g*vec3(.9,.4,.2)*(.6-uv.y)*.8;
  float t = uTime*.04;
  for(float l=1.; l<4.; l++){
    vec2 p = uv*(8.*l) + vec2(t*l*3., t*l);
    vec2 id = floor(p); vec2 f = fract(p)-.5;
    float h = hash(id+l*13.);
    float star = smoothstep(.06*(1.-h*.5), 0., length(f-vec2(h-.5, fract(h*7.)-.5)*.6));
    float tw = .6+.4*sin(uTime*(1.+h*3.)+h*30.);
    col += star*tw*(1.-d*.95)*vec3(.8,.85,1.)*(h>.6?1.:0.)/l*1.5;
  }
  float neb = fbm(uv*2.+vec2(t,0.));
  col += (1.-d)*vec3(.25,.1,.4)*pow(neb,3.)*1.2;
  gl_FragColor = vec4(col,1.);
}`,liquid:t+`
void main(){
  vec2 uv = gl_FragCoord.xy / uRes; vec2 p = uv*3.;
  float t = uTime*.08;
  for(int i=0;i<4;i++){ p += .45*vec2(sin(p.y*1.3+t*2.), cos(p.x*1.1-t*1.7)); }
  float v = .5+.5*sin(p.x+p.y);
  float d = daylight(), g = golden();
  vec3 a = mix(vec3(.24,.11,.55), vec3(1.,.55,.7), d);
  vec3 b = mix(vec3(.05,.35,.6), vec3(.35,.85,.95), d);
  vec3 c = vec3(1.,.55,.25);
  vec3 col = mix(a, b, v);
  col = mix(col, c, g*.55*smoothstep(.3,1.,sin(p.x*.7)));
  col *= .85+.15*fbm(uv*6.+t);
  gl_FragColor = vec4(col,1.);
}`,aurora:t+`
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float d = daylight();
  vec3 sky = mix(vec3(.0,.02,.06), vec3(.02,.08,.18), uv.y);
  sky = mix(sky, mix(vec3(.55,.7,.9), vec3(.25,.45,.8), uv.y), d);
  float t = uTime*.05;
  vec3 col = sky;
  for(float i=0.; i<3.; i++){
    float y = .55 + .08*i + .08*sin(uv.x*3.+t*2.+i) + .05*fbm(vec2(uv.x*4.+t, i));
    float band = exp(-pow((uv.y - y)*(10.+i*4.), 2.)) * (.6+.4*fbm(vec2(uv.x*10.-t*3., i*5.)));
    float curtain = smoothstep(y-.25, y, uv.y) * (1.-smoothstep(y, y+.02, uv.y));
    vec3 c = mix(vec3(.1,1.,.6), vec3(.6,.3,1.), i/2.);
    col += (band + curtain*.25*fbm(vec2(uv.x*30., t))) * c * (1.-d*.9);
  }
  float stars = step(.995, hash(floor(uv*uRes/2.))) * (1.-d) * smoothstep(.4,1.,uv.y);
  col += stars;
  float hills = .18 + .05*sin(uv.x*5.) + .03*sin(uv.x*13.+1.);
  col = mix(col, vec3(.01,.02,.03)+d*vec3(.05,.12,.08), smoothstep(hills+.004, hills, uv.y));
  gl_FragColor = vec4(col,1.);
}`},r={starfield:`Starfield Drift`,liquid:`Liquid Gradient`,aurora:`Aurora`};function i(t){let i=document.createElement(`div`);i.className=`ds-demo`,i.innerHTML=`
    <canvas class="ds-canvas" role="img" aria-label="Animated wallpaper"></canvas>
    <div class="ds-ui">
      <div class="ds-picker" role="radiogroup" aria-label="Wallpaper">
        ${Object.entries(r).map(([e,t],n)=>`<button type="button" role="radio" class="chip" aria-checked="${n===0}" data-ds="${e}"><span class="face">${t}</span></button>`).join(``)}
      </div>
      <label class="ds-time"><span>Time of day <output data-ds-out>9:00 pm</output></span>
        <input type="range" min="0" max="1440" step="5" value="1260" data-ds-time aria-label="Time of day" />
      </label>
    </div>`;let a=document.createElement(`style`);a.textContent=`.ds-demo{position:absolute;inset:0}.ds-canvas{width:100%;height:100%}
  .ds-ui{position:absolute;left:12px;right:12px;bottom:12px;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;padding:10px 14px;border-radius:18px;background:rgb(0 0 0 / .45);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:#fff}
  .ds-ui .chip{--btn-fg:#ddd;--btn-line:rgb(255 255 255 / .2);--btn-bg:rgb(255 255 255 / .06)}.ds-ui .chip[aria-checked=true]{--btn-bg:#fff;--btn-fg:#000}
  .ds-picker{display:flex;flex-wrap:wrap;gap:6px}.ds-time{display:grid;gap:4px;font-size:.85rem;min-width:220px;flex:1;max-width:360px}.ds-time span{display:flex;justify-content:space-between}.ds-time input{width:100%;accent-color:#fff}`,i.append(a),t.mount.append(i);let o=i.querySelector(`canvas`),s=o.getContext(`webgl`,{antialias:!1,premultipliedAlpha:!1});if(!s){t.fail(`This demo needs WebGL.`);return}let c={},l=(e,t)=>{let n=s.createShader(e);if(s.shaderSource(n,t),s.compileShader(n),!s.getShaderParameter(n,s.COMPILE_STATUS))throw Error(`Shader error: `+s.getShaderInfoLog(n));return n},u=s.createBuffer();s.bindBuffer(s.ARRAY_BUFFER,u),s.bufferData(s.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),s.STATIC_DRAW);for(let[e,t]of Object.entries(n)){let n=s.createProgram();s.attachShader(n,l(s.VERTEX_SHADER,`attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`)),s.attachShader(n,l(s.FRAGMENT_SHADER,t)),s.linkProgram(n),c[e]={prog:n,uRes:s.getUniformLocation(n,`uRes`),uTime:s.getUniformLocation(n,`uTime`),uDay:s.getUniformLocation(n,`uDay`)}}let d=`starfield`,f=1260,p=i.querySelector(`[data-ds-out]`),m=e=>{let t=Math.floor(e/60)%24,n=e%60;return`${(t+11)%12+1}:${String(n).padStart(2,`0`)} ${t<12?`am`:`pm`}`};i.querySelector(`[data-ds-time]`).addEventListener(`input`,e=>{f=Number(e.target.value),p.textContent=m(f),h&&S(performance.now())}),i.querySelectorAll(`[data-ds]`).forEach(e=>e.addEventListener(`click`,()=>{d=e.dataset.ds,i.querySelectorAll(`[data-ds]`).forEach(t=>t.setAttribute(`aria-checked`,String(t===e))),o.setAttribute(`aria-label`,`${r[d]} wallpaper at ${m(f)}`),h&&S(performance.now())}));let h=e(),g=()=>{let e=Math.min(1.5,devicePixelRatio||1)*.75;o.width=Math.round(o.clientWidth*e),o.height=Math.round(o.clientHeight*e),s.viewport(0,0,o.width,o.height)},_=new ResizeObserver(g);_.observe(o),g();let v=0,y=!0,b=new IntersectionObserver(([e])=>{y=e.isIntersecting,y&&!v&&!h&&(v=requestAnimationFrame(S))});b.observe(o);let x=performance.now();function S(e){v=0;let t=c[d];s.useProgram(t.prog);let n=s.getAttribLocation(t.prog,`p`);s.enableVertexAttribArray(n),s.vertexAttribPointer(n,2,s.FLOAT,!1,0,0),s.uniform2f(t.uRes,o.width,o.height),s.uniform1f(t.uTime,h?20:(e-x)/1e3),s.uniform1f(t.uDay,f/1440),s.drawArrays(s.TRIANGLES,0,3),!h&&y&&!document.hidden&&(v=requestAnimationFrame(S))}S(performance.now()),t.ready();let C=()=>{!document.hidden&&y&&!v&&!h&&(v=requestAnimationFrame(S))};document.addEventListener(`visibilitychange`,C),t.onCleanup(()=>{cancelAnimationFrame(v),_.disconnect(),b.disconnect(),document.removeEventListener(`visibilitychange`,C),s.getExtension(`WEBGL_lose_context`)?.loseContext()})}export{i as start};