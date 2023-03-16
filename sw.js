var APP_PREFIX = 'ApplicationName_'     
var VERSION = 'v_01'              
var CACHE_NAME = APP_PREFIX + VERSION
var URLS = [                            
    '/Scissor-paper-rock/',                     
    '/Scissor-paper-rock/index.html',
    '/Scissor-paper-rock/style.css',
    '/Scissor-paper-rock/main.js',
    '/Scissor-paper-rock/IMG/favicon-32x32.png',
    '/Scissor-paper-rock/IMG/bg-triangle.svg',
    '/Scissor-paper-rock/IMG/icon-close.svg',
    '/Scissor-paper-rock/IMG/icon-paper.svg',
    '/Scissor-paper-rock/IMG/icon-rock.svg',
    '/Scissor-paper-rock/IMG/icon-scissor.svg',
    '/Scissor-paper-rock/IMG/image-rules.svg',
    '/Scissor-paper-rock/IMG/logo.svg',
    '/Scissor-paper-rock/audio/click.mp3',
    '/Scissor-paper-rock/audio/draw.mp3',
    '/Scissor-paper-rock/audio/lose.mp3',
    '/Scissor-paper-rock/audio/win.mp3'
]

// Respond with cached resources
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { 
        return request
      } else {       
        return fetch(e.request)
      }
    })
  )
})

// Cache resources
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})