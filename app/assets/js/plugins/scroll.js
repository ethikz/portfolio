(function($) {
    "use strict";

  // 1. Smooth scroll for all links with "scrollto" class.
  // 2. Sticky nav
  // 3. Scrollspy

  // Set variables
  var stickyMenu = $('.header'), // Fixed Nav
    stickyMenuHeight = 54, // Height of the Fixed Nav
    stickyMenuOffset = 100,
    stickySpeed = 800,
    scrollyItems = $('.scrollto');



  // Sets the height and negative margin of all anchor divs to the height of the stickyMenu
  // This allows the scrolling to stop when the bottom of the stickyMenu reaches the top of the anchor, rather than the top.
  $('.anchor').css({
    'height':stickyMenuHeight+'px',
    'margin-top':-stickyMenuHeight+'px'
  });

  // Cache selectors
  var lastId,
    // All list items
    menuItems = stickyMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("data-target"));
      if (item.length) {
        return item;
      }
    });

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  scrollyItems.click(function(e) {
    var href = $(this).attr("data-target"),
      offsetTop = href === "#" ? 0 : $(href).offset().top;
    $('html, body').stop().animate({
      scrollTop: offsetTop
    }, stickySpeed);
    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function(){
    // Get container scroll position
    var fromTop = $(this).scrollTop() + stickyMenuOffset;

    // Get id of current scroll item
    var cur = scrollItems.map(function(){
      if ($(this).offset().top < fromTop) {
        return this;
      }
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
      lastId = id;
      // Set/remove active class
      menuItems
        .parent().removeClass("active")
        .end().filter("[data-target=#"+id+"]").parent().addClass("active");
    }
  });

}(jQuery));