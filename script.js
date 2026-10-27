(() => {
  const examples = [
    {id:"watts-bw3",name:"BW3",brand:"Watts",category:"E-bike dobrável",filter:"bike",power:"1.000 W",range:"Até 43 km*",battery:"10,4 Ah removível",speed:"Até 32 km/h",capacity:"130 kg",frame:"Aro 20 · dobrável",source:"https://www.wattsmobilidade.com.br/produto-bw3",sourceLabel:"Página oficial Watts BW3",description:"E-bike dobrável com bateria removível, indicada pela fabricante como opção para deslocamentos urbanos.",facts:[["Motor","1.000 W"],["Autonomia","Até 43 km*"],["Bateria","10,4 Ah removível"],["Velocidade","Até 32 km/h"],["Quadro","Aro 20 · dobrável"]]},
    {id:"watts-w1",name:"W1",brand:"Watts",category:"Scooter elétrica",filter:"scooter",power:"2.000 W",range:"Até 40 km*",battery:"Removível",speed:"Informação não listada",capacity:"200 kg",frame:"Scooter urbana",source:"https://www.wattsmobilidade.com.br/scooter-watts-w1-inglaterra-2000w-15a-40km-velmax-45kmh",sourceLabel:"Página oficial Watts W1",description:"Scooter elétrica com bateria removível e autonomia declarada pelo fabricante de até 40 km.",facts:[["Motor","2.000 W"],["Autonomia","Até 40 km*"],["Bateria","Removível"],["Carga máxima","200 kg"]]},
    {id:"shineray-pt3",name:"PT3",brand:"Shineray",category:"Triciclo elétrico",filter:"trike",power:"2.000 W",range:"Até 40 km por bateria*",battery:"60 V · 20 Ah removível",speed:"Até 45 km/h",capacity:"150 kg",frame:"3 rodas · aro 10",source:"https://www.shineray.com.br/produto/pt3-triciclo/",sourceLabel:"Página oficial Shineray PT3",description:"Triciclo elétrico com bateria removível; a ficha oficial informa espaço para uma segunda bateria.",facts:[["Motor","2.000 W"],["Autonomia","Até 40 km por bateria*"],["Bateria","60 V · 20 Ah removível"],["Velocidade","Até 45 km/h"],["Carga máxima","150 kg"]]}
  ];
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const grid=$("#product-grid"),search=$("#catalog-search"),toast=$("#toast"),saved=new Set(),compare=new Set(),wa="https://wa.me/5547989215624";
  let filter="all",savedOnly=false,timer,returnFocus=null;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function messageLink(text){return wa+"?text="+encodeURIComponent(text)}
  function notify(text){toast.textContent=text;toast.classList.add("show");clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove("show"),2300)}
  function vehicleArt(type,index){
    const color=["#ee6749","#5bc0b5","#153d49"][index%3];
    if(type==="bike")return '<svg viewBox="0 0 460 250" role="img" aria-label="Ilustração conceitual de uma bicicleta elétrica"><path d="M0 193 Q110 138 220 184 T460 166V250H0Z" fill="#c6ddd4"/><path d="M0 213 Q120 169 230 210T460 191" fill="none" stroke="#79bfb4" stroke-width="2"/><circle cx="118" cy="177" r="52" fill="none" stroke="#153d49" stroke-width="4"/><circle cx="344" cy="177" r="52" fill="none" stroke="#153d49" stroke-width="4"/><path d="m118 177 76-85 76 85H118l34-61h91l34 61m-83-85-12-24m-15 0h33m93 0h32l18 18" fill="none" stroke="'+color+'" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><rect x="202" y="105" width="42" height="14" rx="7" fill="#153d49" transform="rotate(30 202 105)"/><circle cx="194" cy="92" r="12" fill="#5bc0b5"/><circle cx="118" cy="177" r="4" fill="'+color+'"/><circle cx="344" cy="177" r="4" fill="'+color+'"/><text x="19" y="27" font-family="monospace" font-size="9" letter-spacing="2" fill="#153d49">REFERÊNCIA DE MERCADO</text></svg>';
    if(type==="scooter")return '<svg viewBox="0 0 460 250" role="img" aria-label="Ilustração conceitual de uma scooter elétrica"><path d="M0 196 Q100 155 210 194T460 173V250H0Z" fill="#c6ddd4"/><path d="M0 216 Q130 174 260 214T460 198" fill="none" stroke="#79bfb4" stroke-width="2"/><circle cx="132" cy="181" r="28" fill="none" stroke="#153d49" stroke-width="5"/><circle cx="337" cy="181" r="28" fill="none" stroke="#153d49" stroke-width="5"/><path d="M132 181h118l54-16 18 16h15m-94-1-11-89h43l34 90m-66-90h44m-30-5v-20h34" fill="none" stroke="'+color+'" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/><path d="M233 146h40l-8 15h-31z" fill="#153d49"/><path d="M303 82h28l10 7" fill="none" stroke="#153d49" stroke-width="7" stroke-linecap="round"/><text x="19" y="27" font-family="monospace" font-size="9" letter-spacing="2" fill="#153d49">REFERÊNCIA DE MERCADO</text></svg>';
    return '<svg viewBox="0 0 460 250" role="img" aria-label="Ilustração conceitual de um triciclo elétrico"><path d="M0 195 Q95 157 200 197T460 172V250H0Z" fill="#c6ddd4"/><path d="M0 215 Q130 176 280 213T460 196" fill="none" stroke="#79bfb4" stroke-width="2"/><circle cx="108" cy="182" r="27" fill="none" stroke="#153d49" stroke-width="5"/><circle cx="314" cy="182" r="27" fill="none" stroke="#153d49" stroke-width="5"/><circle cx="385" cy="182" r="27" fill="none" stroke="#153d49" stroke-width="5"/><path d="M108 182h185l31-73h63l28 73m-161 0 48-73h53m-95 73 48-73m-102 73h-38" fill="none" stroke="'+color+'" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><rect x="188" y="82" width="82" height="45" rx="7" fill="#153d49"/><path d="M194 82h70" stroke="#5bc0b5" stroke-width="4"/><text x="19" y="27" font-family="monospace" font-size="9" letter-spacing="2" fill="#153d49">REFERÊNCIA DE MERCADO</text></svg>';
  }
  function filtered(){
    const q=search.value.trim().toLowerCase();
    return examples.filter(p=>(filter==="all"||p.filter===filter)&&(!savedOnly||saved.has(p.id))&&(!q||[p.name,p.brand,p.category,p.description,...p.facts.map(x=>x.join(" "))].join(" ").toLowerCase().includes(q)));
  }
  function render(){
    const list=filtered();
    grid.innerHTML=list.length?list.map((p,n)=>'<article class="product-card" data-id="'+p.id+'"><div class="product-art"><span class="product-number">MERCADO / '+String(examples.indexOf(p)+1).padStart(2,"0")+'</span><span class="product-badge">'+esc(p.category)+'</span>'+vehicleArt(p.filter,n)+'</div><div class="product-copy"><span class="product-source">'+esc(p.brand)+' · EXEMPLO EXTERNO</span><div class="product-title-row"><h3>'+esc(p.name)+'</h3><button class="favorite" type="button" aria-label="'+(saved.has(p.id)?"Remover dos salvos":"Salvar exemplo")+'" aria-pressed="'+saved.has(p.id)+'">'+(saved.has(p.id)?"♥":"♡")+'</button></div><p class="product-description">'+esc(p.description)+'</p><div class="specs"><div><span>Motor</span><b>'+esc(p.power)+'</b></div><div><span>Autonomia</span><b>'+esc(p.range)+'</b></div><div><span>Bateria</span><b>'+esc(p.battery)+'</b></div></div><span class="external-note">Referência do fabricante · não confirma estoque Wave</span><div class="card-actions"><button class="details" type="button" data-action="details">Ficha ↗</button><button class="compare" type="button" data-action="compare" aria-pressed="'+compare.has(p.id)+'">'+(compare.has(p.id)?"✓":"＋")+' Comparar</button></div></div></article>').join(""):'<div class="empty-state">Nenhuma referência combina com esse filtro. Tente outra busca.</div>';
    $("#saved-count").textContent=saved.size;
    $("#compare-count").textContent=compare.size;
    $("#compare-trigger").setAttribute("aria-pressed",String($("#compare-panel").classList.contains("open")));
    updateCompare();
  }
  function updateCompare(){
    const list=examples.filter(p=>compare.has(p.id));
    if(!list.length){$("#compare-items").innerHTML='<p class="catalog-note">Selecione até três referências para comparar lado a lado.</p>';return}
    const fields=[["Categoria","category"],["Motor","power"],["Alcance declarado","range"],["Bateria","battery"],["Velocidade declarada","speed"],["Carga máxima","capacity"]];
    $("#compare-items").innerHTML='<table class="compare-table"><thead><tr><th>Detalhe</th>'+list.map(p=>'<th>'+esc(p.brand)+' '+esc(p.name)+'</th>').join("")+'</tr></thead><tbody>'+fields.map(([label,key])=>'<tr><td>'+label+'</td>'+list.map(p=>'<td>'+esc(p[key])+'</td>').join("")+'</tr>').join("")+'</tbody></table>';
    $("#compare-contact").href=messageLink("Oi, Guilherme! Vi algumas referências de mercado no conceito de site e queria conhecer quais categorias e modelos vocês trabalham na Wave.");
  }
  function openDetails(p){
    returnFocus=document.activeElement;
    $("#dialog-content").innerHTML='<div class="detail-grid"><div class="detail-art">'+vehicleArt(p.filter,examples.indexOf(p))+'</div><div><span class="eyebrow">REFERÊNCIA EXTERNA · '+esc(p.brand)+'</span><h2>'+esc(p.name)+'</h2><p>'+esc(p.description)+' São dados publicados pela fabricante; versão e condições podem mudar.</p><dl>'+p.facts.map(([label,value])=>'<div><dt>'+esc(label)+'</dt><dd>'+esc(value)+'</dd></div>').join("")+'</dl><p class="detail-alert">Este exemplo mostra como uma ficha pode organizar as informações. Não confirma que a Wave venda ou tenha este produto em estoque.</p><a class="button button-primary source-link" href="'+p.source+'" target="_blank" rel="noopener noreferrer">Abrir fonte oficial ↗</a></div></div>';
    $("#product-dialog").showModal();
  }
  function openCompare(){
    if(!compare.size){notify("Marque exemplos para comparar.");return}
    returnFocus=document.activeElement;
    const panel=$("#compare-panel");panel.classList.add("open");panel.setAttribute("aria-hidden","false");$("#scrim").hidden=false;document.body.style.overflow="hidden";render();$("#compare-close").focus();
  }
  function closeCompare(){const panel=$("#compare-panel");panel.classList.remove("open");panel.setAttribute("aria-hidden","true");$("#scrim").hidden=true;document.body.style.overflow="";returnFocus?.focus()}
  grid.addEventListener("click",e=>{
    const card=e.target.closest(".product-card");if(!card)return;const p=examples.find(x=>x.id===card.dataset.id);
    if(e.target.closest(".favorite")){saved.has(p.id)?saved.delete(p.id):saved.add(p.id);render()}
    else if(e.target.closest('[data-action="details"]'))openDetails(p);
    else if(e.target.closest('[data-action="compare"]')){if(compare.has(p.id))compare.delete(p.id);else if(compare.size<3)compare.add(p.id);else notify("Compare até três referências.");render()}
  });
  $$(".category-tab").forEach(b=>b.addEventListener("click",()=>{filter=b.dataset.filter;$$(".category-tab").forEach(x=>{const on=x===b;x.classList.toggle("is-active",on);x.setAttribute("aria-pressed",String(on))});render()}));
  search.addEventListener("input",render);
  function toggleSaved(){savedOnly=!savedOnly;["#saved-filter","#saved-catalog-toggle"].forEach(s=>{const b=$(s);b.setAttribute("aria-pressed",String(savedOnly));b.style.color=savedOnly?"var(--accent)":""});render()}
  $("#saved-filter").addEventListener("click",toggleSaved);$("#saved-catalog-toggle").addEventListener("click",()=>{toggleSaved();$("#categorias").scrollIntoView({behavior:"smooth"})});
  $("#compare-trigger").addEventListener("click",openCompare);$("#compare-close").addEventListener("click",closeCompare);$("#scrim").addEventListener("click",closeCompare);
  $("#compare-panel").addEventListener("keydown",e=>{if(e.key==="Escape"){closeCompare();return}if(e.key==="Tab"){const els=$$("a[href],button:not([disabled]),input:not([disabled])",$("#compare-panel")).filter(x=>x.offsetParent!==null);if(!els.length)return;const first=els[0],last=els.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
  $("#product-dialog").addEventListener("click",e=>{if(e.target===e.currentTarget||e.target.closest(".dialog-close"))e.currentTarget.close()});
  $("#product-dialog").addEventListener("close",()=>returnFocus?.focus());
  $("#menu-toggle").addEventListener("click",e=>{const nav=$("#main-nav"),open=nav.classList.toggle("open");e.currentTarget.setAttribute("aria-expanded",String(open));e.currentTarget.setAttribute("aria-label",open?"Fechar menu":"Abrir menu")});
  $$("#main-nav a").forEach(a=>a.addEventListener("click",()=>{$("#main-nav").classList.remove("open");$("#menu-toggle").setAttribute("aria-expanded","false")}));
  $$("[data-theme-choice]").forEach(b=>b.addEventListener("click",()=>{$$("[data-theme-choice]").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));document.body.dataset.theme=b.dataset.themeChoice;localStorage.setItem("wave-theme",b.dataset.themeChoice)}));
  const themeQuery=new URLSearchParams(location.search).get("theme"),stored=localStorage.getItem("wave-theme"),theme=themeQuery&&["0","1","2"].includes(themeQuery)?themeQuery:stored;
  if(theme&&["0","1","2"].includes(theme)){document.body.dataset.theme=theme;$$("[data-theme-choice]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.themeChoice===theme)))}
  document.addEventListener("keydown",e=>{if(e.key==="/"&&!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){e.preventDefault();search.focus()}});
  $("#wave-contact").href=messageLink("Oi, Guilherme! Vi o conceito de catálogo para a Wave e gostaria de saber quais modelos de e-bikes e scooters vocês estão trabalhando.");
  render();
  if(new URLSearchParams(location.search).get("section")==="categorias")requestAnimationFrame(()=>$("#categorias").scrollIntoView({behavior:"instant"}));
})();
