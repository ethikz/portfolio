function resizePersonal() {
  $('.personal').css({
    'height':($(window).height() + $('.header').outerHeight(true) - 100)+'px',
    'margin-top':($('.header').outerHeight(true))+'px'
  });
}

function unResizePersonal() {
  $('.personal').removeAttr('style');
}

function slider() {
  $("#slider").owlCarousel({
    items : 1,
    mouseDrag: true,
    navigation: true,
    navigationText: ['<span class="icon-arrow"></span>','<span class="icon-arrow"></span>'],
    singleItem: true,
    transitionStyle : "fade"
  });
}

function fadeTitle() {
  $('section h1').each( function() {
    $(this).waypoint( function( direction ) {
      if( direction === 'down' ) {
        $(this).addClass('fade');
      }
    }, {
      offset: '100%'
    });
  });
}

function fadeBG() {
  $('.personal').waypoint( function( direction ) {
    if( direction === 'down' ) {
      $(this).animate({
        backgroundColor: '#d53232'
      }, 1000 );
    }
  }, {
    offset: 'bottom-in-view'
  }).waypoint( function( direction ) {
    if( direction === 'up' ) {
      $(this).animate({
        backgroundColor: 'transparent'
      }, 1000 );
    }
  }, {
    offset: function() {
      return $.waypoints('viewportHeight') / 2 - $(this).outerHeight();
    }
  });
}


// Web Font Loader https://github.com/typekit/webfontloader
function webfonts() {
  WebFontConfig = {
    google: { families: ['Raleway:100,600', 'Ubuntu:400,700'] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
              '://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
}


$(document).ready(function() {
  slider();
  webfonts();
  fadeBG();
  fadeTitle();
});


enquire.register("screen and (min-width: 320px)", {

  match: function() {
    resizePersonal();
    $(window).resize(function($) {
      resizePersonal();
    });
  },

  unmatch: function() {
    unResizePersonal();
    $(window).resize(function($) {
      unResizePersonal();
    });
  }

});