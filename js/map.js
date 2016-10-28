// Map Variables
var hasHash = false;
if(window.location.hash) {
  hasHash = true;
}
else {
  hasHash = false;
}
var scrollZoomSetting = true;
if (mode == 'embed') {
  scrollZoomSetting = false;
}
else {
  scrollZoomSetting = true;
}
var textFieldCode = "{point_title}";
// if (numberedPoints == "true") {
//   textFieldCode = "{point_position_number} - {point_title}";
// }

// The Map
var map = new mapboxgl.Map({
    container: 'map',
    pitch: 0,
    hash: false,
    scrollZoom: scrollZoomSetting
});

// The Layers
var orbitistLayers = {"layers":[
                      {"title":"Other","id":3890},
                      {"title":"Warehouse/Distribution","id":3889},
                      {"title":"Sports","id":3888},
                      {"title":"Retail","id":3887},
                      {"title":"Restaurants","id":3886},
                      {"title":"Residential","id":3885},
                      {"title":"Office","id":3884},
                      {"title":"Mixed-Use","id":3883},
                      {"title":"Hotels","id":3882},
                      {"title":"Hospitality","id":3881},
                      {"title":"Commercial","id":3880}
                    ]}

map.on('load', function() {
  // Loop through the layers
  for (var i = 0; i < orbitistLayers.layers.length; i++) {

    var orbitistPointsGeojson = (function () {
        var orbitistPointsGeojson = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': 'https://app.orbitist.com/api/v1/points/' + orbitistLayers.layers[i].id + '.json',
            'dataType': "json",
            'success': function (data) {
                orbitistPointsGeojson = data;
            }
        });
        return orbitistPointsGeojson;
    })();
    var jsonCleaner = JSON.stringify(orbitistPointsGeojson).replace(/&amp;/g, '&').replace(/&#039;/g, '\'');
    var orbitistPointsGeojsonCleaned = JSON.parse(jsonCleaner);

    map.addSource(orbitistLayers.layers[i].title + orbitistLayers.layers[i].id, {
      type: "geojson",
      data: orbitistPointsGeojsonCleaned
    });
    map.addLayer({
      "id": "points",
      "type": "symbol",
      "source": "orbitistPoints",
      "layout": {
        "icon-image": "circle-15",
        "icon-size": 2,
        "icon-allow-overlap": true,
        "icon-offset": [0, -5],
        "icon-ignore-placement": true,
        "text-field": textFieldCode,
        "text-font": ["Open Sans Semibold"],
        "text-size": {
          "stops": [
            [fadeLabel, 0],
            [startLabel, 8],
            [endLabel, 16]
          ]
        },
        "text-offset": [0, 0.5],
        "text-anchor": "top",
        "text-allow-overlap": true
      },
      "paint": {
        "icon-opacity": 0,
        "text-halo-width": 1,
        "text-halo-color": "white"
      }
    });


    // Add custom markers to map
    for (var i = 0; i < orbitistPointsGeojsonCleaned.features.length; i++) {
        var feature = orbitistPointsGeojsonCleaned.features[i];

        // create an img element for the marker
        var marker = document.createElement('img');
        marker.src = feature.properties.point_marker_url;
        marker.style.width = "30px";
        marker.style.height = "30px";

        // add marker to map
        new mapboxgl.Marker(marker)
            .setLngLat(feature.geometry.coordinates)
            .addTo(map);
    }

  }
});






map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['points'] });
  if (!features.length) {
      return;
  }
  var feature = features[0];
  var popup = new mapboxgl.Popup({anchor: 'none'})
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<a href="' + feature.properties.point_image + '" data-lightbox="' + feature.properties.point_id + '" data-title="' + feature.properties.point_image_caption + '" class="popup-image-anchor"></a>' + feature.properties.point_lightbox_images + '<div class="popup-body"><div class="popuptitle"><h3>' + feature.properties.point_title + '</h3></div>' + feature.properties.point_body + feature.properties.point_links + '<div class="action-items"><div class="action-item"><a href="https://www.google.com/maps/dir/Current+Location/' + feature.geometry.coordinates[1] + ',' + feature.geometry.coordinates[0] + '" target="_blank"><span class="fa fa-car center-block"></span></a></div><div class="action-item"><a href="https://app.orbitist.com/print/' + feature.properties.point_id + '" target="_blank"><span class="fa fa-print center-block"></span></a></div></div></div>')
    .addTo(map);
  if (feature.properties.point_image.length > 5 && feature.properties.point_lightbox_images.length > 5) {
    $('.popup-image-anchor').append('<img src="' + feature.properties.point_popup_image + '" class="popup-top-image"><div class="popupimage-expand"><span class="fa fa-clone"></span> More Images</div>');
  }
  else if (feature.properties.point_image.length > 5) {
    $('.popup-image-anchor').append('<img src="' + feature.properties.point_popup_image + '" class="popup-top-image"><div class="popupimage-expand"><span class="fa fa-clone"></span> Expand Image</div>');
  }
  // Do things if in edit mode
  if (mode == 'edit'){
    $('div.popuptitle h3').append(' <a target="_parent" href="/node/' + feature.properties.point_id + '/edit?destination=edit-map/' + mapid + '"><span class="edit-button"><i class="fa fa-pencil"></i> Edit</span></a>');
  }
});

// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
  var features = map.queryRenderedFeatures(e.point, { layers: ['points'] });
  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});

// Map Controls
map.addControl(new mapboxgl.Navigation({position: 'top-right'}));

// If in embed mode, add fullscreen button
if (mode == 'embed'){
  $('body').append('<a target="_blank" href="http://labs.orbitist.com/bbf-core-2016/?mapid=' + mapid + '"><div class="map-fullscreen-toggle control"><i class="fa fa-arrows-alt"></i></div></a>');
}

// Geolocate map
var allowFlyTo = false;
var geolocationMarker = null;
var globalCoords = null;

//Reset map view
jQuery('.map-reset').click(function () {
  allowFlyTo = false;
  map.fitBounds(bounds, { padding: '50', pitch: '0' });
});

function centerMap (position){
  jQuery('.map-geolocate').removeClass("pulsate");
  if (allowFlyTo == true) {
    map.flyTo({center:[position.coords.longitude, position.coords.latitude],zoom:18,bearing:0,pitch:0});
  }
  if (geolocationMarker != null) {
    geolocationMarker.remove();
  }
  // create an img element for the marker
  geolocationMarker = document.createElement('img');
  geolocationMarker.src = "https://app.orbitist.com/launch/cdn/orbitist-icons/orbitist_smile.gif";
  geolocationMarker.style.width = "40px";
  geolocationMarker.style.height = "40px";
  new mapboxgl.Marker(geolocationMarker).setLngLat([position.coords.longitude, position.coords.latitude]).addTo(map);

  globalCoords = position;
};

function locateError () {
  jQuery('.map-geolocate').removeClass("pulsate");
  alert("There was a problem finding your location. Please try again.");
};

jQuery('.map-geolocate').click(function () {
  allowFlyTo = true;
  jQuery('.map-geolocate').addClass("pulsate");
  if (globalCoords != null) {
    map.flyTo({center:[globalCoords.coords.longitude, globalCoords.coords.latitude],zoom:18,bearing:0,pitch:0});
    jQuery('.map-geolocate').removeClass("pulsate");
  }
  navigator.geolocation.watchPosition(centerMap, locateError, {enableHighAccuracy: true, maximumAge:5000});
});

// Turn off geolocation recenter
jQuery('body').mousedown(function () {
  allowFlyTo = false;
});
jQuery('body').on({ 'touchstart': function () {
  allowFlyTo = false;
}});


// renderMapList();
removeSpinner();
