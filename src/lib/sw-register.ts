// Service Worker registration utility
export function registerServiceWorker(): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  // Only register in production
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      
      console.log('SW registered: ', registration);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, inform the user
              if (confirm('New content is available. Refresh to update?')) {
                window.location.reload();
              }
            }
          });
        }
      });

    } catch (error) {
      console.log('SW registration failed: ', error);
    }
  });
}

// Unregister service worker (for development)
export function unregisterServiceWorker(): void {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  navigator.serviceWorker.ready
    .then((registration) => {
      registration.unregister();
    })
    .catch((error) => {
      console.error(error.message);
    });
}