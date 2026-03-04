var MSGS = [
  {t:'💪 Antrenman Vakti!', b:'Seni seviyorum, hadi çalışma vakti.'},
  {t:'🌟 Hey Güzel!', b:'Aşkımm, bugün çalıştın mı? Hadi biraz çalışalım. Seni çok seviyorum.'},
  {t:'✨ Kontrol', b:"Çalıştın mı güzelim? 'Evet' cevabını duymak istiyorum."},
  {t:'💌 Mini Kontrol', b:'Mini kontrol: Bugün çalıştın mı sevgilim?'},
  {t:'🔥 Motivasyon', b:'Hatırlatma: Gelecekteki sen, bugünkü seni izliyor.'},
  {t:'😌 Uyarı', b:'Telefonu bırak, işe dön. (Bu mesaj hariç 😌)'}
];

self.addEventListener('install', function(e) { self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('notificationclick', function(e) {
  e.notification.close();
  e.waitUntil(clients.matchAll({type:'window'}).then(function(list) {
    if (list.length) return list[0].focus();
    return clients.openWindow('/');
  }));
});

// Ana sayfadan bildirim zamanı gelince mesaj alır
self.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'SHOW_NOTIFICATION') {
    var msg = MSGS[new Date().getDay() % MSGS.length];
    self.registration.showNotification(msg.t, {
      body: msg.b,
      tag: 'antrenman-daily',
      renotify: true,
      vibrate: [200, 100, 200]
    });
  }
});
