(()=>{
const ENDPOINT='https://script.google.com/macros/s/AKfycbwD9l8rOh2nv9iyex1PKekYsRuT2Sb4dCa2dS0JZvB_vgx3ncvz_EchemQinUm_cEOKHw/exec';
const MAP={'รายการ':'office_tx','เงินของหน่วย':'office_funds','ไปราชการ':'office_travels','บุคลากร':'office_people','ประวัติ':'office_audit'};
const status=()=>document.getElementById('netStatus');
const say=t=>{const e=status();if(e)e.textContent=t};
async function post(tab,data){await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action:'upsert',tab,data})})}
function localRows(key){try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return []}}
function merge(a,b){const m=new Map();[...a,...b].forEach(x=>{if(x&&x.id!=null)m.set(String(x.id),x)});return [...m.values()]}
async function sync(){if(!navigator.onLine){say('● ออฟไลน์ — บันทึกในเครื่องและรอซิงค์');return}say('● กำลังซิงค์ Google Sheet…');try{for(const [tab,key] of Object.entries(MAP)){for(const row of localRows(key))await post(tab,row)}const r=await fetch(ENDPOINT+'?t='+Date.now(),{cache:'no-store'});if(!r.ok)throw new Error('HTTP '+r.status);const all=await r.json();for(const [tab,key] of Object.entries(MAP)){const remote=(all[tab]||[]).map(r=>{try{return typeof r[6]==='string'?JSON.parse(r[6]):r[6]}catch{return null}}).filter(Boolean);localStorage.setItem(key,JSON.stringify(merge(localRows(key),remote)))}localStorage.setItem('office_last_sync',new Date().toISOString());say('● ซิงค์ Google Sheet แล้ว');}catch(e){console.warn('sync',e);say('● ออนไลน์ — ซิงค์ไม่สำเร็จ ข้อมูลยังอยู่ในเครื่อง')}}
window.officeSync=sync;window.addEventListener('online',sync);setTimeout(sync,1800);setInterval(sync,15000);
})();
