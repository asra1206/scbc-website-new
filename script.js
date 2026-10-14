// ===== Edit branches here =====
const branches=[
{n:"Mount Lavinia",d:"Colombo",live:true},
{n:"Colombo Fort",d:"Colombo"},{n:"Negombo",d:"Gampaha"},{n:"Gampaha",d:"Gampaha"},
{n:"Kalutara",d:"Kalutara"},{n:"Panadura",d:"Kalutara"},{n:"Galle",d:"Galle"},
{n:"Matara",d:"Matara"},{n:"Hambantota",d:"Hambantota"},{n:"Ratnapura",d:"Ratnapura"},
{n:"Kegalle",d:"Kegalle"},{n:"Kandy",d:"Kandy"},{n:"Matale",d:"Matale"},
{n:"Nuwara Eliya",d:"Nuwara Eliya"},{n:"Badulla",d:"Badulla"},{n:"Kurunegala",d:"Kurunegala"},
{n:"Puttalam",d:"Puttalam"},{n:"Anuradhapura",d:"Anuradhapura"},{n:"Polonnaruwa",d:"Polonnaruwa"},
{n:"Trincomalee",d:"Trincomalee"},{n:"Batticaloa",d:"Batticaloa"},{n:"Ampara",d:"Ampara"},
{n:"Jaffna",d:"Jaffna"},{n:"Kilinochchi",d:"Kilinochchi"},{n:"Vavuniya",d:"Vavuniya"}];

// ===== Mount Lavinia opening hours (24h: [open, close] or null = closed) =====
const hours={Monday:[8.5,17.5],Tuesday:null,Wednesday:null,Thursday:null,Friday:null,Saturday:null,Sunday:null};
const order=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const fmt=h=>{const H=Math.floor(h),M=Math.round((h-H)*60),s=H>=12?'PM':'AM';return`${((H+11)%12)+1}:${String(M).padStart(2,'0')} ${s}`};
const now=new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Colombo'}));
const today=now.toLocaleDateString('en-US',{weekday:'long'}),cur=now.getHours()+now.getMinutes()/60;
const rowsHtml=order.map(d=>`<tr class="${d===today?'today':''}"><td>${d}</td><td>${hours[d]?fmt(hours[d][0])+' – '+fmt(hours[d][1]):'Closed'}</td></tr>`).join('');
document.querySelectorAll('.hours').forEach(t=>t.innerHTML=rowsHtml);
const h=hours[today],isOpen=h&&cur>=h[0]&&cur<h[1],st=document.getElementById('status');
st.textContent=isOpen?'Open now':'Closed now';st.className='badge st '+(isOpen?'open':'closed');

const grid=document.getElementById('grid'),q=document.getElementById('q'),cnt=document.getElementById('cnt');
function draw(f=''){
 const l=branches.filter(b=>(b.n+b.d).toLowerCase().includes(f.toLowerCase()));
 grid.innerHTML=l.map(b=>`<article class="b ${b.live?'is-live':'soon'}"><h3>${b.n}</h3><small>${b.d}</small><br>${b.live?'<em>● Live now</em>':'<em>Details coming soon</em>'}</article>`).join('')||'<p>No branch found.</p>';
 cnt.textContent=l.length;}
q.addEventListener('input',e=>draw(e.target.value));draw();
