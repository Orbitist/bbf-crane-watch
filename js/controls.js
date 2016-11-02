// Small Screens
jQuery(document).ready(function () {
  if (jQuery(window).width() < 800){
    jQuery('.map-info-toggle, .map-help').click(function () {
      jQuery('.map').css({"left": "-100%"}),
      jQuery('.map-info').css({"left": "0"}),
      jQuery('.map-toggle-info').css({"left": "10px"}),
      jQuery('.map-info-toggle').css({"right": "calc(100% + 10px)"}),
      jQuery('.map-list-toggle').css({"left": "calc(-100% + 10px)"})
    });
    jQuery('.map-list-toggle').click(function () {
      jQuery('.map').css({"left": "100%"}),
      jQuery('.map-list').css({"left": "0"}),
      jQuery('.map-toggle-list').css({"right": "10px"}),
      jQuery('.map-info-toggle').css({"right": "calc(-100% + 10px)"}),
      jQuery('.map-list-toggle').css({"left": "calc(100% + 10px)"}),
      jQuery('.mapboxgl-popup').css({"top": "-100%"}),
      jQuery('.mapboxgl-popup-close-button').css({"top": "-100%"})
    });
    jQuery('.map-toggle-info').click(function () {
      jQuery('.map').css({"left": "0"}),
      jQuery('.map-info').css({"left": "100%"}),
      jQuery('.map-toggle-info').css({"left": "calc(100% + 10px)"}),
      jQuery('.map-info-toggle').css({"right": "10px"}),
      jQuery('.map-list-toggle').css({"left": "10px"})
    });
    jQuery('.map-toggle-list').click(function () {
      jQuery('.map').css({"left": "0"}),
      jQuery('.map-list').css({"left": "-100%"}),
      jQuery('.map-toggle-list').css({"right": "calc(100% + 10px)"}),
      jQuery('.map-info-toggle').css({"right": "10px"}),
      jQuery('.map-list-toggle').css({"left": "10px"})
    });
    jQuery('.map-list').click(function () {
      jQuery('.map').css({"left": "0"}),
      jQuery('.map-list').css({"left": "-100%"}),
      jQuery('.map-toggle-list').css({"right": "calc(100% + 10px)"}),
      jQuery('.map-info-toggle').css({"right": "10px"}),
      jQuery('.map-list-toggle').css({"left": "10px"})
    });
    jQuery('.map').on('mousedown', function(e) {
        jQuery(this).data('p0', { x: e.pageX, y: e.pageY });
    }).on('mouseup', function(e) {
      var p0 = $(this).data('p0'),
          p1 = { x: e.pageX, y: e.pageY },
          d = Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
      if (d < 4) {
          jQuery('.map-help').css({"top": "-60px"})
      }
    })
  }
});

// Big Screens
jQuery(document).ready(function () {
  if (jQuery(window).width() >= 800){
    jQuery('.map-info-toggle, .map-help').click(function () {
      jQuery('.map-info').css({"left": "calc(100% - 500px)"}),
      jQuery('.map-toggle-info').css({"left": "calc(100% - 490px)"}),
      jQuery('.map-toggle-list').css({"right": "calc(100% + 10px)"}),
      jQuery('.map-list-toggle').css({"left": "10px"})
    });
    jQuery('.map-list-toggle').click(function () {
      jQuery('.map').css({"left": "0px","width":"calc(100%)"}),
      jQuery('.map-list').css({"left": "0"}),
      jQuery('.map-info').css({"left": "100%"}),
      jQuery('.map-toggle-list').css({"right": "calc(100% - 290px)"}),
      jQuery('.map-toggle-info').css({"left": "calc(100% + 10px)"}),
      jQuery('.mapboxgl-popup').css({"top": "-100%"})
    });
    jQuery('.map-toggle-info').click(function () {
      jQuery('.map-info').css({"left": "100%"}),
      jQuery('.map-toggle-info').css({"left": "calc(100% + 10px)"})
    });
    jQuery('.map-toggle-list').click(function () {
      jQuery('.map').css({"left": "0","width": "100%"}),
      jQuery('.map-list').css({"left": "-300px"}),
      jQuery('.map-toggle-list').css({"right": "calc(100% + 10px)"})
    });
    jQuery('.map').on('mousedown', function(e) {
        jQuery(this).data('p0', { x: e.pageX, y: e.pageY });
    }).on('mouseup', function(e) {
      var p0 = $(this).data('p0'),
          p1 = { x: e.pageX, y: e.pageY },
          d = Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
      if (d < 4) {
          jQuery('.map-info').css({"left": "100%"}),
          jQuery('.map-toggle-info').css({"left": "calc(100% + 10px)"}),
          jQuery('.map-toggle-list').css({"right": "calc(100% + 10px)"}),
          jQuery('.map-help').css({"top": "-60px"})
      }
    })
  }
});
