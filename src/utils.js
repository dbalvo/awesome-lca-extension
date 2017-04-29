
class Utils {
  getASIN(url) {
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
}
