// Verfying Browser Compatibility for Browser

if ('serviceWorker' in navigator) {
    console.log('Service Worker Supported Yayyyyy');

    //First Step is to Register the service worker once onload done
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('../service_worker.js')
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log(`Service Worker: Error: ${err}`))
    })
}