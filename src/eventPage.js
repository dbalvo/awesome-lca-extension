function onLoaded() {
  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'loading') {
      chrome.tabs.get(tabId, onPageLoaded);
    };
  });
}

function onPageLoaded(tabInfo) {
  var asin = getASIN(tabInfo.url);
  if (asin) {
    chrome.tabs.executeScript(tabInfo.id, {file: 'amazonContentScript.js'});
  }
}

// NOTE: Currently copypasta'd in amazonContentScript.js
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

onLoaded();
