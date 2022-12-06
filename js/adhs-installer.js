/* For the home screen thingy.  From https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen
and https://github.com/mdn/pwa-examples/blob/master/a2hs/index.js */


// Register service worker to control making site work offline
const init = () => {
  if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./sw.js')
    .then(() => { console.log('Service Worker Registered'); })
    .catch((e)=> { console.error('There was an error registering the Service Worker.', e)})
  }
}

// Run when all the page content is loaded
document.addEventListener('DOMContentLoaded', init, false);

// Code to handle install prompt on desktop
let deferredPrompt;
let a2hsButton;
let installer;

window.addEventListener('beforeinstallprompt', (e) => {

  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();

  // Save the event so it can be triggered later.
  deferredPrompt = e;

  // Update UI to notify the user they can add to home screen
  console.log('showing the installer')
  a2hsButton = document.getElementById('a2hs-button')
  a2hsButton.style.display = 'block';

  a2hsButton.addEventListener('click', () => {

    // Show the Add To Home Screen (A2HS) prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {

      if (choiceResult.outcome === 'accepted') {

        console.log('User accepted the A2HS prompt');

        // hide our user interface that shows our A2HS button
        installer = document.getElementById('installer')
        installer.style.display = 'none';

      } else {

        console.log('User dismissed the A2HS prompt');

      }
      deferredPrompt = null;
    });
  });
});