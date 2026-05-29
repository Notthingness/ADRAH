let DATA = [];
let current = [];

const q = document.getElementById('q');
const list = document.getElementById('list');
const results = document.getElementById('results');
const cats = document.getElementById('cats');
const backTop = document.getElementById('backTop');

const dName = document.getElementById('d-name');
const dCat = document.getElementById('d-cat');
const dTel = document.getElementById('d-tel');
const dCall = document.getElementById('d-call');
const dType = document.getElementById('d-type');
const dAssist = document.getElementById('d-assist');
const dExtra = document.getElementById('d-extra');
const dLogo = document.getElementById('d-logo');

/* ---------------- CATEGORIES ---------------- */
const CATEGORIES = [
{key:"VL",label:"VL"},
{key:"PL",label:"PL"},
{key:"MOTO",label:"MOTO"},
{key:"LOCATION",label:"LOCATION"},
{key:"ASSURANCE",label:"ASSURANCE"}
];

cats.innerHTML = CATEGORIES.map(c=>
`<div class="card" data-cat="${c.key}">${c.label}</div>`
).join('');

/* ---------------- DATA ---------------- */
fetch('data.json')
.then(r=>{
  if(!r.ok) throw new Error("JSON introuvable");
  return r.json();
})
.then(json=>{
  DATA = json;
  console.log("DATA OK", DATA.length);
})
.catch(err=>console.error(err));

/* ---------------- SEARCH ---------------- */
function search(v){

  const n = v.trim().toLowerCase();

  if(!n){
    results.classList.add('hidden');
    return;
  }

  const rows = DATA.filter(d=>{
    const hay = Object.values(d).join(" ").toLowerCase();
    return hay.includes(n);
  });

  render(rows);
}

/* ---------------- RENDER ---------------- */
function render(rows){

  current = rows;

  if(!rows.length){
    results.classList.add('hidden');
    return;
  }

  results.classList.remove('hidden');

  list.innerHTML = rows.map(r=>`
    <div class="row">
      <div>${r.nom}</div>

      <a href="tel:${(r.telephone||'').replace(/\s/g,'')}">
        Appeler
      </a>
    </div>
  `).join('');
}

/* ---------------- EVENTS ---------------- */
q.addEventListener('input',e=>{
  search(e.target.value);
});

cats.addEventListener('click',e=>{
  const c = e.target.closest('[data-cat]');
  if(!c) return;

  const rows = DATA.filter(d=>d.categorie === c.dataset.cat);
  render(rows);
});
