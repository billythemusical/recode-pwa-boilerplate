/* For the home screen thingy.  From https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen
and https://github.com/mdn/pwa-examples/blob/master/a2hs/index.js */

// Register service worker to control making site work offline

const init = () => {
  if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    // .register('/js/sw.js', { scope:  '/' })
    .then(() => { console.log('Service Worker Registered'); })
    .catch((e)=> { console.error('There was an error registering the Service Worker.', e)})
  }
}

document.addEventListener('DOMContentLoaded', init, false);

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.getElementById('add-button');
// addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('did the beforeinstallprompt')
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  console.log("deferredPrompt:", deferredPrompt)
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', () => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});