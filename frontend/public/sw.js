if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>a(e,i),o={module:{uri:i},exports:c,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"4b59ea33a9daf151dfe9b1977768bc55"},{url:"/_next/static/WDtW0_aX7n6wrFAsKDsjM/_buildManifest.js",revision:"72f6eebe39421e7a5a4d7ded2c8bcad2"},{url:"/_next/static/WDtW0_aX7n6wrFAsKDsjM/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/117-e57c0a333535fe50.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/20-b065fec41f65208f.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/541-8f6d837157a4542e.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/648-95f3f5bd4b0a1ee7.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/66-305179ebba33d1f0.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/790-76b13fb10317b38c.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/821-bd79930113408988.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/853-37cfe166781b43e9.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/8e1d74a4-245173a5f4677c80.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/app/_not-found/page-876d1e47c918a8f4.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/app/form/page-9c2d8e2cab88c1c8.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/app/home/page-bafa076a4a9ed798.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/app/layout-f40eeb526c185a5a.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/app/notification/page-a5a51826d7a157f6.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/app/page-0220ec81ef75b8dd.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/app/profile/page-d6b1c43cd15e8323.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/app/register/page-4bf4d51ee8750559.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/app/select/page-82018ef73a4c971e.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/cb355538-26486694e3dd6120.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/ee8b1517-0a2133a567715e8c.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/fd9d1056-91aa9495991b9c80.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/framework-57772a29c06ec290.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/main-app-f46b1a4208616584.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/main-db7fe6bcff918694.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/pages/_app-d8c2719845302810.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/pages/dashboard-bc22ec2a7fa82492.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/pages/forgot-password-b86e2e452ea8d4a4.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/pages/gerencia/add-user-813e5fe3c7f45c30.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/pages/gerencia/dashboard-ff3982fac2944c23.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/pages/gerencia/graficos-0895fe475704ae47.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/pages/gerencia/verificar-rdos-791a331b2babdd45.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/pages/reset-password-7aa6240b6ae71284.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-0d7e37f49b1e261d.js",revision:"WDtW0_aX7n6wrFAsKDsjM"},{url:"/_next/static/css/5a56e3c1761e58ad.css",revision:"5a56e3c1761e58ad"},{url:"/_next/static/css/bc1c38d385ae8d80.css",revision:"bc1c38d385ae8d80"},{url:"/_next/static/css/f0530cd4ba8cf6ba.css",revision:"f0530cd4ba8cf6ba"},{url:"/_next/static/media/0596140cb8d9223a-s.woff2",revision:"ddd5de66d4a7c56eeac6e0b10c5d8521"},{url:"/_next/static/media/1a4dd1d7cd3232ea-s.woff2",revision:"91c6fe4b62b5ebda5ccee3c4aa1eb33d"},{url:"/_next/static/media/341baa6ce7a16e81-s.woff2",revision:"0c7b4bd9156673a090be9999002eaab1"},{url:"/_next/static/media/356abdd51b933898-s.woff2",revision:"4ed5a85b9b460c31a44ba541e277bcc0"},{url:"/_next/static/media/c22ccc5eb58b83e1-s.p.woff2",revision:"8a051a2b61e4a766fff21bb106142860"},{url:"/_next/static/media/d70c23d6fe66d464-s.woff2",revision:"7abbd25026a8e3994d885bd8704b9588"},{url:"/img/alumar-logo.png",revision:"f7ce43f90d9b939e810c22bbdb18d777"},{url:"/img/projeta.png",revision:"ad405bb7d0661749146aabe1f785f159"},{url:"/img/vale-logo.png",revision:"e2611e605d8e9ae3a2a2c411d9454594"},{url:"/index.html",revision:"250d876695399538d4afca2890bff692"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
