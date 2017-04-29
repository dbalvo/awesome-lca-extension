
// NOTE: Currently copypasta'd in eventPage.js
function getASIN(url) {
  if (!url) {
    return;
  }

  var parser = document.createElement('a');
  parser.href = url;
  if (parser.hostname != 'www.amazon.com') {
    return;
  }

  var splitPath = parser.pathname.split('/');
  var asin = null;
  for(var i = 0; i < splitPath.length - 1; i++) {
    if (splitPath[i] == 'dp') {
      asin = splitPath[i+1];
    }
  }

  return asin;
}


function onLoaded() {
  var asin = getASIN(window.location);
  if (!asin) {
    return;
  }

  insertIFrame(asin);
}

function insertIFrame(asin) {
  var iframe = document.createElement("iframe");
  var url = "https://lca.party/amazon-embed/" + asin;
  console.log(url);
  iframe.setAttribute("src", url);
  iframe.setAttribute("style", "position:absolute; border:none; z-index:1000; width:400px; height:600px; top:50px; right: 50px;");
  iframe.setAttribute("scrolling", "no");
  iframe.setAttribute("frameborder", "0");
  document.body.appendChild(iframe);
  console.log(iframe);
}

onLoaded();