const setFavicon = (iconUrl) => {
    // From https://stackoverflow.com/questions/260857/changing-website-favicon-dynamically
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    // link.href = iconUrl;  // http could be effecting the PWA install
}