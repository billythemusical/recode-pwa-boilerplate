/* 

To handle a manual install situation. Will also check if the app is already installed.  

References: 
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen
- https://github.com/mdn/pwa-examples/blob/master/a2hs/index.js 

*/

// Code to handle install prompt on desktop
let deferredPrompt;
let a2shButton;

// Register service worker to control making site work offline
const init = () => {

  // register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('sw.js')
      .then(function (reg) {
        if (reg.installing) {
          console.log('Service worker installing');
        } else if (reg.waiting) {
          console.log('Service worker installed');
        } else if (reg.active) {
          console.log('Service worker active');
        }
      })
      .catch(function (error) {
        // registration failed
        console.log('Registration failed with ' + error);
      });
  }
  
  a2hsButton = document.getElementById('a2hs-button')

  a2hsButton.addEventListener('click', () => {

    // Show the Add To Home Screen (A2HS) prompt
    if (deferredPrompt) {

      // Give the install prompt.
      deferredPrompt.prompt()

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
      })

      deferredPrompt = null;

    } else {
      alert("This app is already installed, yo.")
    }
  })
}


// Run when all the page content is loaded
document.addEventListener('DOMContentLoaded', init, false);


window.addEventListener('beforeinstallprompt', (e) => {

  // Prevent Chrome 67 and earlier from automatically showing the install prompt.
  e.preventDefault();

  // Saving the install prompt for later when we click the Install button.
  deferredPrompt = e;
  
})


  