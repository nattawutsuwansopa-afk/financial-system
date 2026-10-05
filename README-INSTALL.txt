บัญชีสำนักงาน PWA v5.1 — Clean Build

ไฟล์เว็บที่ต้องอัป GitHub Pages:
index.html, app.js, cloud-sync.js, style.css, manifest.webmanifest, service-worker.js, icon.svg

Backend Google Sheet:
1. เปิด Apps Script ที่ผูกกับ Google Sheet
2. แทนที่โค้ดด้วย GOOGLE-APPS-SCRIPT.gs
3. Run setup() หนึ่งครั้ง
4. Deploy > Manage deployments > New version > Web app
5. Execute as: Me / Who has access: Anyone
6. หาก URL /exec เปลี่ยน ให้แก้ ENDPOINT ใน cloud-sync.js

สำคัญ: v5.1 เป็นชุด Clean Build ห้ามนำ script0.js-script4.js หรือไฟล์ Supabase รุ่นเก่ากลับมาอัปปน
