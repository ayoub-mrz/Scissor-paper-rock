const CACHE_NAME = 'static_cache'
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/main.js',
    '/IMG/favicon-32x32.png',
    '/IMG/bg-triangle.svg',
    '/IMG/icon-close.svg',
    '/IMG/icon-paper.svg',
    '/IMG/icon-rock.svg',
    '/IMG/icon-scissor.svg',
    '/IMG/image-rules.svg',
    '/IMG/logo.svg',
    '/audio/click.mp3',
    '/audio/draw.mp3',
    '/audio/lose.mp3',
    '/audio/win.mp3'
]

self.addEventListener('install', e => {
    self.skipWaiting()
    e.waitUntil(preCach())
})

self.addEventListener('activate', e => {
    e.waitUntil(cleanCache())
})

self.addEventListener('fetch', e => {
    e.respondWith(fetchAssets(e))
})

async function preCach() {
    const cache = await caches.open(CACHE_NAME)
    return cache.addAll(STATIC_ASSETS)
}

async function fetchAssets(e) {
    try {
        const response = await fetch(e.request)
        return response
    } catch (err) {
        const cache = await caches.open(CACHE_NAME)
        return cache.match(e.request)
    }
}

async function cleanCache() {
    const keys = await caches.keys()
    const keysToDelete = keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key)
    })

    return Promise.all(keysToDelete)

}