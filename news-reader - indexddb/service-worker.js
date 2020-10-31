const CACHE_NAME = 'CACHE';
var urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/pages/home.html',
	'/pages/about.html',
	'/pages/contact.html',
	'/pages/Sertifikat.html',
	'/article.html',
	'/css/materialize.min.css',
	'/css/navcolor.css',
	'/js/materialize.min.js',
	'/manifest.json',
	'js/Modals.js',
	'js/api.js',
	'/image1.jpg',
	'/background.jpg',
	'/background1.jpg',
	'/icon.png',
	'/Android-Nexus-5-Lollipop-wallpaper-5.png',
	'/Belajar Dasar Pemrograman Web-1.jpg',
	'/Belajar Fundamental Front-end Web Development-1.jpg',
	'/Belajar pemrograman solid-1.jpg',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/fontawesome.min.css',
	'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js',
	'/js/script.js'
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	var base_url = "https://readerapi.codepolitan.com/";
	
	if (event.request.url.indexOf(base_url) > -1) {
		event.respondWith(
		  caches.open(CACHE_NAME).then(function(cache) {
			return fetch(event.request).then(function(response) {
			  cache.put(event.request.url, response.clone());
			  return response;
			})
		  })
		);
	}
	
	else {
		event.respondWith(
			caches.match(event.request, { ignoreSearch: true }).then(function(response) {
				return response || fetch (event.request);
			})
		)
	}
});

