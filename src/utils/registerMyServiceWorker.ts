// tslint:disable
const isSupported = "serviceWorker" in navigator;
const swName = "static/js/sw.js";
export default function register() {
  if (!isSupported) {
    console.warn("SW is not supported");
    return;
  }
  window.addEventListener("load", () => {
    const swUrl = `${process.env.PUBLIC_URL}/${swName}`;
    registerSW(swUrl);
  });
}

function registerSW(url: string) {
  navigator.serviceWorker
    .register(url)
    .then(onSW_Registered)
    .catch(error => {
      console.error("Error during service worker registration:", error);
    });
}

function onSW_Registered(registration: ServiceWorkerRegistration) {
  console.info("Registered");
  registration.onupdatefound = () => {
    const installingWorker = registration.installing;
    if (installingWorker) {
      onSW_Insalling(installingWorker);
    }
  };
}

function onSW_Insalling(installingWorker: ServiceWorker) {
  installingWorker.onstatechange = () => {
    if (installingWorker.state === "installed") {
      if (navigator.serviceWorker.controller) {
        // At this point, the old content will have been purged and
        // the fresh content will have been added to the cache.
        // It's the perfect time to display a 'New content is
        // available; please refresh.' message in your web app.
        console.log("New content is available; please refresh.");
      } else {
        // At this point, everything has been precached.
        // It's the perfect time to display a
        // 'Content is cached for offline use.' message.
        console.log("Content is cached for offline use.");
      }
    }
  };
}

// @ts-ignore
export const unregister = () => {
  if (!isSupported) {
    return;
  }
  navigator.serviceWorker.ready.then(registration => {
    registration.unregister();
  });
};
