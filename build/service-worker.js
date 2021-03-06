"use strict";
var precacheConfig = [
    ["/index.html", "048cf22ebac38d8c239c8cb2bd5448bb"],
    ["/static/css/main.6a5ae7c8.css", "6a5ae7c86d1084b5af8ea940e2938c14"],
    ["/static/js/0.fa0c304a.chunk.js", "4e82dce6a3474b47da1bb297f3fd0763"],
    ["/static/js/1.b59daede.chunk.js", "de771f084329f52e14b7528a87ff17c5"],
    ["/static/js/2.c06afb7a.chunk.js", "f12ca623c4d32d64654742e60159a9d6"],
    ["/static/js/3.287758d0.chunk.js", "b1ea638726eb3b0816683a4c03e87e58"],
    ["/static/js/4.28da61c6.chunk.js", "ef78efc35236a81fc042489547f38c45"],
    ["/static/js/5.7acae70d.chunk.js", "e07d1c01a3ee3a101dc64940343bbb86"],
    [
      "/static/media/Simple-Line-Icons.0cb0b9c5.woff2",
      "0cb0b9c589c0624c9c78dd3d83e946f6"
    ],
    [
      "/static/media/Simple-Line-Icons.2fe2efe6.svg",
      "2fe2efe63441d830b1acd106c1fe8734"
    ],
    [
      "/static/media/Simple-Line-Icons.78f07e2c.woff",
      "78f07e2c2a535c26ef21d95e41bd7175"
    ],
    [
      "/static/media/Simple-Line-Icons.d2285965.ttf",
      "d2285965fe34b05465047401b8595dd0"
    ],
    [
      "/static/media/Simple-Line-Icons.f33df365.eot",
      "f33df365d6d0255b586f2920355e94d7"
    ],
    ["/static/media/avatar.e7937e2e.png", "e7937e2e95be3986cec36ec149571bbd"],
    ["/static/media/balloon.a760c8b2.JPG", "a760c8b23939facf17f7dd2facd9cb8d"],
    [
      "/static/media/brand-icons.13db00b7.eot",
      "13db00b7a34fee4d819ab7f9838cc428"
    ],
    [
      "/static/media/brand-icons.a046592b.woff",
      "a046592bac8f2fd96e994733faf3858c"
    ],
    [
      "/static/media/brand-icons.a1a749e8.svg",
      "a1a749e89f578a49306ec2b055c073da"
    ],
    [
      "/static/media/brand-icons.c5ebe0b3.ttf",
      "c5ebe0b32dc1b5cc449a76c4204d13bb"
    ],
    [
      "/static/media/brand-icons.e8c322de.woff2",
      "e8c322de9658cbeb8a774b6624167c2c"
    ],
    ["/static/media/city_new.b139602c.jpg", "b139602c902cd017f00ec5648bacd889"],
    [
      "/static/media/defaultThumbnail.98bb4d2d.jpg",
      "98bb4d2d622541c057859125fffeb846"
    ],
    ["/static/media/ebanner.71a0d178.jpg", "71a0d17896ca0b89a735481353e70f46"],
    ["/static/media/flags.9c74e172.png", "9c74e172f87984c48ddf5c8108cabe67"],
    [
      "/static/media/fontawesome-webfont.674f50d2.eot",
      "674f50d287a8c48dc19ba404d20fe713"
    ],
    [
      "/static/media/fontawesome-webfont.912ec66d.svg",
      "912ec66d7572ff821749319396470bde"
    ],
    [
      "/static/media/fontawesome-webfont.af7ae505.woff2",
      "af7ae505a9eed503f8b8e6982036873e"
    ],
    [
      "/static/media/fontawesome-webfont.b06871f2.ttf",
      "b06871f281fee6b241d60582ae9369b9"
    ],
    [
      "/static/media/fontawesome-webfont.fee66e71.woff",
      "fee66e712a8a08eef5805a46892932ad"
    ],
    ["/static/media/forget.fed1a869.jpeg", "fed1a86936ccb2bb8faff70920ac5e5f"],
    ["/static/media/icons.0ab54153.woff2", "0ab54153eeeca0ce03978cc463b257f7"],
    ["/static/media/icons.8e3c7f55.eot", "8e3c7f5520f5ae906c6cf6d7f3ddcd19"],
    ["/static/media/icons.962a1bf3.svg", "962a1bf31c081691065fe333d9fa8105"],
    ["/static/media/icons.b87b9ba5.ttf", "b87b9ba532ace76ae9f6edfe9f72ded2"],
    ["/static/media/icons.faff9214.woff", "faff92145777a3cbaf8e7367b4807987"],
    [
      "/static/media/logo-symbol.e7937e2e.png",
      "e7937e2e95be3986cec36ec149571bbd"
    ],
    ["/static/media/logo_hd.8ae38422.png", "8ae384221a8df7b45a8c286d26cb6e92"],
    [
      "/static/media/outline-icons.701ae6ab.eot",
      "701ae6abd4719e9c2ada3535a497b341"
    ],
    [
      "/static/media/outline-icons.82f60bd0.svg",
      "82f60bd0b94a1ed68b1e6e309ce2e8c3"
    ],
    [
      "/static/media/outline-icons.ad97afd3.ttf",
      "ad97afd3337e8cda302d10ff5a4026b8"
    ],
    [
      "/static/media/outline-icons.cd6c777f.woff2",
      "cd6c777f1945164224dee082abaea03a"
    ],
    [
      "/static/media/outline-icons.ef60a4f6.woff",
      "ef60a4f6c25ef7f39f2d25a748dbecfe"
    ]
  ],
  cacheName =
    "sw-precache-v3-sw-precache-webpack-plugin-" +
    (self.registration ? self.registration.scope : ""),
  ignoreUrlParametersMatching = [/^utm_/],
  addDirectoryIndex = function(e, a) {
    var t = new URL(e);
    return "/" === t.pathname.slice(-1) && (t.pathname += a), t.toString();
  },
  cleanResponse = function(a) {
    return a.redirected
      ? ("body" in a ? Promise.resolve(a.body) : a.blob()).then(function(e) {
          return new Response(e, {
            headers: a.headers,
            status: a.status,
            statusText: a.statusText
          });
        })
      : Promise.resolve(a);
  },
  createCacheKey = function(e, a, t, c) {
    var n = new URL(e);
    return (
      (c && n.pathname.match(c)) ||
        (n.search +=
          (n.search ? "&" : "") +
          encodeURIComponent(a) +
          "=" +
          encodeURIComponent(t)),
      n.toString()
    );
  },
  isPathWhitelisted = function(e, a) {
    if (0 === e.length) return !0;
    var t = new URL(a).pathname;
    return e.some(function(e) {
      return t.match(e);
    });
  },
  stripIgnoredUrlParameters = function(e, t) {
    var a = new URL(e);
    return (
      (a.hash = ""),
      (a.search = a.search
        .slice(1)
        .split("&")
        .map(function(e) {
          return e.split("=");
        })
        .filter(function(a) {
          return t.every(function(e) {
            return !e.test(a[0]);
          });
        })
        .map(function(e) {
          return e.join("=");
        })
        .join("&")),
      a.toString()
    );
  },
  hashParamName = "_sw-precache",
  urlsToCacheKeys = new Map(
    precacheConfig.map(function(e) {
      var a = e[0],
        t = e[1],
        c = new URL(a, self.location),
        n = createCacheKey(c, hashParamName, t, /\.\w{8}\./);
      return [c.toString(), n];
    })
  );
function setOfCachedUrls(e) {
  return e
    .keys()
    .then(function(e) {
      return e.map(function(e) {
        return e.url;
      });
    })
    .then(function(e) {
      return new Set(e);
    });
}
self.addEventListener("install", function(e) {
  e.waitUntil(
    caches
      .open(cacheName)
      .then(function(c) {
        return setOfCachedUrls(c).then(function(t) {
          return Promise.all(
            Array.from(urlsToCacheKeys.values()).map(function(a) {
              if (!t.has(a)) {
                var e = new Request(a, { credentials: "same-origin" });
                return fetch(e).then(function(e) {
                  if (!e.ok)
                    throw new Error(
                      "Request for " +
                        a +
                        " returned a response with status " +
                        e.status
                    );
                  return cleanResponse(e).then(function(e) {
                    return c.put(a, e);
                  });
                });
              }
            })
          );
        });
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
}),
  self.addEventListener("activate", function(e) {
    var t = new Set(urlsToCacheKeys.values());
    e.waitUntil(
      caches
        .open(cacheName)
        .then(function(a) {
          return a.keys().then(function(e) {
            return Promise.all(
              e.map(function(e) {
                if (!t.has(e.url)) return a.delete(e);
              })
            );
          });
        })
        .then(function() {
          return self.clients.claim();
        })
    );
  }),
  self.addEventListener("fetch", function(a) {
    if ("GET" === a.request.method) {
      var e,
        t = stripIgnoredUrlParameters(
          a.request.url,
          ignoreUrlParametersMatching
        ),
        c = "index.html";
      (e = urlsToCacheKeys.has(t)) ||
        ((t = addDirectoryIndex(t, c)), (e = urlsToCacheKeys.has(t)));
      var n = "/index.html";
      !e &&
        "navigate" === a.request.mode &&
        isPathWhitelisted(["^(?!\\/__).*"], a.request.url) &&
        ((t = new URL(n, self.location).toString()),
        (e = urlsToCacheKeys.has(t))),
        e &&
          a.respondWith(
            caches
              .open(cacheName)
              .then(function(e) {
                return e.match(urlsToCacheKeys.get(t)).then(function(e) {
                  if (e) return e;
                  throw Error(
                    "The cached response that was expected is missing."
                  );
                });
              })
              .catch(function(e) {
                return (
                  console.warn(
                    'Couldn\'t serve response for "%s" from cache: %O',
                    a.request.url,
                    e
                  ),
                  fetch(a.request)
                );
              })
          );
    }
  });
