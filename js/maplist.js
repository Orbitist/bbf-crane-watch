// function renderMapList() {
//
//   // Create the map list items
//   for (var i = 0; i < orbitistPointsGeojsonCleaned.features.length; i++) {
//     var feature = orbitistPointsGeojsonCleaned.features[i];
//     var listImage = '';
//     if (feature.properties.point_image.length > 5) {
//       listImage = '<img src="' + feature.properties.point_popup_image + '" class="list-thumbnail" />';
//     }
//     if (numberedPoints == "true"){
//       var  listItem  = '<hr><div class="map-list-item" id="' + feature.properties.point_id + '">' + listImage + '<img src="' + feature.properties.point_marker_url + '" class="list-marker" /><div class="list-caption"><p>' + feature.properties.point_position_number + " - " + feature.properties.point_title + '</p></div></div><script>document.getElementById("' + feature.properties.point_id + '").addEventListener("click", function () {map.flyTo({center:[' + feature.geometry.coordinates + '],zoom: 18,bearing: 90 * (.5 - Math.random()),pitch: 60});});</script>';
//     } else {
//       var  listItem  = '<hr><div class="map-list-item" id="' + feature.properties.point_id + '">' + listImage + '<img src="' + feature.properties.point_marker_url + '" class="list-marker" /><div class="list-caption"><p>' + feature.properties.point_title + '</p></div></div><script>document.getElementById("' + feature.properties.point_id + '").addEventListener("click", function () {map.flyTo({center:[' + feature.geometry.coordinates + '],zoom: 18,bearing: 90 * (.5 - Math.random()),pitch: 60});});</script>';
//     }
//     $('div.map-list').append(listItem);
//   }
//
// };
