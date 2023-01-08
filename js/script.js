function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var msg = getParameterByName('msg');
if (msg) {
  document.getElementsByClassName("popup")[0].classList.remove("hide");
  document.getElementById("message").innerHTML = msg;
}

document.getElementsByClassName("popup")[0].onclick = () => {
  document.getElementsByClassName("popup")[0].classList.add("hide");
}

window.addEventListener("orientationchange", function() {
  if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
    document.documentElement.innerHTML = document.documentElement.innerHTML;
  }
}, false);
