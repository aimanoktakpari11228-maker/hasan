
/* Hasan ♥ N — Firebase Cloud Messaging */

importScripts(
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js'
);

firebase.initializeApp({
  apiKey: "AIzaSyApRWz3VlVu5vJ-lr6XOvmU7xQ5LHXHajE",
  authDomain: "hasan-nadi-chat.firebaseapp.com",
  projectId: "hasan-nadi-chat",
  storageBucket: "hasan-nadi-chat.firebasestorage.app",
  messagingSenderId: "447911828704",
  appId: "1:447911828704:web:839f082973cc21735c8485"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  if (payload.notification) return;

  const data = payload.data || {};

  self.registration.showNotification(
    data.title || "Hasan ♥ N",
    {
      body: data.body || "پیام جدید داری ❤️",
      tag: "hasan-n-message",
      icon: "./favicon.ico",
      data: {
        url: self.registration.scope
      }
    }
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then((windows) => {
      for (const client of windows) {
        if ("focus" in client) {
          client.navigate(event.notification.data.url);
          return client.focus();
        }
      }

      return clients.openWindow(
        event.notification.data.url
      );
    })
  );
});
