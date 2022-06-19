
// Label des fichiers statiques to precache
const staticCacheName = "site-static-v8"

// Fichier qui seront cacher
const assets = [
    '/',
    '/index.html',
    'styles/style.css',
    '/scripts/dialog-polyfill.js',
    '/scripts/script.js',
    '/images/icons/favicon-196.png',
    '/images/icons/favicon-180.png'

    
    
]
// Service worker installation
self.addEventListener("install", event=>{
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache =>{
                return cache.addAll(assets)
        })
            .catch(err =>{
                console.log(err)
            })
    )
    self.skipWaiting();
});

// Activation 
self.addEventListener("activate", event =>{
    event.waitUntil(
        caches.keys().then(keys =>{
            return Promise.all(keys
            .filter(key => key !== staticCacheName)
            .map(key => caches.delete(key))
            )
        })
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event)=>{
    event.respondWith(
        caches.match(event.request)
        .then(cachedResponse =>{
            return cachedResponse || 
            fetch(event.request).then(
                (response) => {
                    return response
                },
                (error) =>{
                    return caches.match('/index.html');
                }
            )
        })
        .catch(()=> {
                console.log("the requested link doesn't exist")
        })
    )
})

