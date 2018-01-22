// don't want to use jQuery, so grabbed solution from https://stackoverflow.com/a/10063405/571227. With thanks.
function currentYPosition() {
  // Firefox, Chrome, Opera, Safari
  if (self.pageYOffset) return self.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
}


function elmYPosition(eID) {
  var elm = document.getElementById(eID);
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
  } return y;
}


function smoothScroll(eID) {
  var startY = currentYPosition();
  var stopY = elmYPosition(eID);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
      scrollTo(0, stopY); return;
  }
  var speed = Math.round(distance / 100);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
      for ( var i=startY; i<stopY; i+=step ) {
          setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
          leapY += step; if (leapY > stopY) leapY = stopY; timer++;
      } return;
  }
  for ( var i=startY; i>stopY; i-=step ) {
      setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
      leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
  }
}

// grabbed solution (modified) from https://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling. With thanks.
function isScrolledIntoView(elemName, fullyInView) {
  var elem = document.getElementById(elemName);
  if (elem == null)
    return;

  // this line grabbed from https://stackoverflow.com/a/47310547/571227
  var docViewTop = (document.documentElement && document.documentElement.scrollTop) || (document.body.scrollTop) || (document.scrollingElement);
  var docViewBottom = docViewTop + window.innerHeight;
  var elemTop = elem.offsetTop;
  var elemBottom = elemTop + elem.offsetHeight;

  if (fullyInView === true) {
    return ((docViewTop < elemTop) && (docViewBottom > elemBottom));
  }
  else {
    return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
  }
}

function logic() {
  // hook up button to scroll the page to relevant section
  document.getElementById("blog-button").addEventListener('click', function() {
    window.location = "https://blog.wasin.io/";
  });
  document.getElementById("games-button").addEventListener('click', function() {
    smoothScroll('games-section');
  });
  document.getElementById("tech-button").addEventListener('click', function() {
    smoothScroll('tech-section');
  });

  window.onscroll = function(e) {
    if (isScrolledIntoView('haxpor-img-elem')) {
      var elem1 = document.getElementById('haxpor-img-elem');
      if (elem1.className.search("anim-comeinleft") == -1) {
        elem1.className += " anim-comeinleft";
      }
    }
    if (isScrolledIntoView('abzico-img-elem')) {
      var elem1 = document.getElementById('abzico-img-elem');
      if (elem1.className.search("anim-comeinright") == -1) {
        elem1.className += " anim-comeinright";
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  logic();
});