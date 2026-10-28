self.addEventListener('push',event=>{event.waitUntil(self.registration.showNotification('DROPZONE 새 소식',{body:'관심 채널에 새 활동이 있습니다. 사이트에서 확인하세요.',tag:'dropzone-update',data:{url:'/#notifications'}}))});
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(clients.openWindow('/#notifications'))});
