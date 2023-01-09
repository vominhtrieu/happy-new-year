function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function waitForLoadImages(element, callback) {
  var allImgsLength = 0;
  var allImgsLoaded = 0;
  var allImgs = [];

  var filtered = Array.prototype.filter.call(element.querySelectorAll('img'), function (item) {
    if (item.src === '') {
      return false;
    }

    // Firefox's `complete` property will always be `true` even if the image has not been downloaded.
    // Doing it this way works in Firefox.
    var img = new Image();
    img.src = item.src;
    return !img.complete;
  });

  filtered.forEach(function (item) {
    allImgs.push({
      src: item.src,
      element: item
    });
  });

  allImgsLength = allImgs.length;
  allImgsLoaded = 0;

  // If no images found, don't bother.
  if (allImgsLength === 0) {
    callback.call(element);
  }

  allImgs.forEach(function (img) {
    var image = new Image();

    // Handle the image loading and error with the same callback.
    image.addEventListener('load', function () {
      allImgsLoaded++;

      if (allImgsLoaded === allImgsLength) {
        callback.call(element);
        return false;
      }
    });

    image.src = img.src;
  });
};

waitForLoadImages(document, function () {
  document.getElementById("main").classList.remove("hide");
})

var msg = getParameterByName('msg');
if (msg) {
  document.getElementsByClassName("popup")[0].classList.remove("hide");
  document.getElementById("message").innerHTML = msg;
}

document.getElementsByClassName("popup")[0].onclick = () => {
  document.getElementsByClassName("popup")[0].classList.add("hide");
}

window.addEventListener("orientationchange", function () {
  if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
    document.documentElement.innerHTML = document.documentElement.innerHTML;
  }
}, false);

fetch("https://analytic.vominhtrieu.com/log", {
  method: "POST",
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    url: location.pathname + location.search,
  }),
})