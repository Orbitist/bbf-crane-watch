// set starting and ending label zooms
var startLabel = 8;
var fadeLabel = startLabel - 1;
var endLabel = startLabel + 2;

// Set Url for map info API
var mapInfoApi = 'data/mapinfo.json';

// Do things if in edit mode
if (mode == 'edit'){
  var mapInfoApi = 'data/mapinfo.json';
}

// Is this a numbered map?
var numberedPoints = "false";
$.ajax({
  url: mapInfoApi,
  async: false,
  dataType: 'json',
  success: function(data){
    numberedPoints = data[0].map_numbered_points;
  }
})

$(document).ready(
  function() {
    $.ajax({
      url: mapInfoApi,
      async: false,
      dataType: 'json',
      success: function(data){
        // ciclo l'array
        for(i=0; i<data.length; i++){
            var  content  = '<img src="';
                 content +=  data[i].map_image;
                 content  += '">';
                 content  += '<div class="map-info-body"><h3 class="map-info-title">';
                 content +=  data[i].map_title;
                 content  += '</h3><p>By <a target="_parent" href="https://app.orbitist.com/u/' + data[i].map_author_name + '" >';
                 content +=  data[i].map_author_full_name;
                 content +=  '</a></p>';
                 content +=  data[i].map_body;
                 content += '<a target="_parent" href="https://app.orbitist.com/u/' + data[i].map_author_name + '" ><div class="author-profile-link"><img src="' + data[i].map_author_profile_image + '" class="author-profile-image" />';
                 content += '<p><small>More maps by:</small><br />' + data[i].map_author_full_name + '</p></div></a>';
                 content +=  '<p style="text-align:center;"><small><a href="http://www.orbitist.com/learn/how-to-use/">Help</a> | Map powered by <a href="http://orbitist.com">Orbitist</a></small></p></div></a>';
            $('div.map-info').append(content); // Add content to map-info pane
            $('div.map-help').append(data[i].map_title); // Add map title to map-help page
            $('head').append('<style>' + data[i].map_css + '</style>'); // Add custom styles to map
            if ( data[i].map_custom_mapbox_access_token.length > 5 ) {
              mapboxgl.accessToken = data[i].map_custom_mapbox_access_token;
              map.setStyle(data[i].map_custom_mapbox_style);
            }
            else {
              map.setStyle(data[i].map_mapbox_style);
            }
            //Google Analytics
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            //If user submitted google analytics cods
            if ( data[i].map_google_analytics.length > 5 ) {
              ga('create', data[i].map_google_analytics, 'auto', {'name':'b'});
              ga('create', 'UA-50308061-3', 'auto');
              ga('send', 'pageview');
              ga('b.send', 'pageview');
            }
            //Otherwise just load the Orbitist Tracking code
            else {
              ga('create', 'UA-50308061-3', 'auto');
              ga('send', 'pageview');
            }
            // Do things if in edit mode
            if (mode == 'edit'){
              $('.map-info-title').append(' <a target="_parent" href="/node/' + mapid + '/edit?destination=edit-map/' + mapid +'"><span class="edit-button"><i class="fa fa-pencil"></i> Edit</span></a>');
            }
            // Assign start and end labels
            if ( data[i].map_start_label >= 1 ) {
              startLabel = Number(data[i].map_start_label);
              fadeLabel = Number(data[i].map_start_label) - 1;
              endLabel = Number(data[i].map_start_label) + 2;
            }
        }
      }
    })
  }
);

// $(document).ready(
//     function(){
//         $.ajaxSetup({
//           async: false
//         });
//         $.getJSON(
//           mapInfoApi,
//             function(data){
//                 // ciclo l'array
//                 for(i=0; i<data.length; i++){
//                     var  content  = '<img src="';
//                          content +=  data[i].map_image;
//                          content  += '">';
//                     	 	 content  += '<div class="map-info-body"><h3 class="map-info-title">';
//                          content +=  data[i].map_title;
//                          content  += '</h3><p>By <a target="_parent" href="/u/' + data[i].map_author_name + '" >';
//                          content +=  data[i].map_author_full_name;
//                          content +=  '</a></p>';
//                          content +=  data[i].map_body;
//                          content += '<a target="_parent" href="/u/' + data[i].map_author_name + '" ><div class="author-profile-link"><img src="' + data[i].map_author_profile_image + '" class="author-profile-image" />';
//                          content += '<p><small>More maps by:</small><br />' + data[i].map_author_full_name + '</p></div></a>';
//                          content +=  '<p style="text-align:center;"><small><a href="http://www.orbitist.com/learn/how-to-use/">Help</a> | Map powered by <a href="http://orbitist.com">Orbitist</a></small></p></div></a>';
//                     $('div.map-info').append(content); // Add content to map-info pane
//                     $('div.map-help').append(data[i].map_title); // Add map title to map-help page
//                     $('head').append('<style>' + data[i].map_css + '</style>'); // Add custom styles to map
//                     // Tell numberedPoints if this map uses numbered points
//                     numberedPoints = data[i].map_numbered_points;
//                     if ( data[i].map_custom_mapbox_access_token.length > 5 ) {
//                       mapboxgl.accessToken = data[i].map_custom_mapbox_access_token;
//                       map.setStyle(data[i].map_custom_mapbox_style);
//                     }
//                     else {
//                       mapboxgl.accessToken = data[i].map_mapbox_access_token;
//                       map.setStyle(data[i].map_mapbox_style);
//                     }
//                     //Google Analytics
//                     (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//                     (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//                     m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//                     })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
//                     //If user submitted google analytics cods
//                   	if ( data[i].map_google_analytics.length > 5 ) {
//                   		ga('create', data[i].map_google_analytics, 'auto', {'name':'b'});
//                   		ga('create', 'UA-50308061-3', 'auto');
//                   		ga('send', 'pageview');
//                   		ga('b.send', 'pageview');
//                   	}
//                   	//Otherwise just load the Orbitist Tracking code
//                   	else {
//                   		ga('create', 'UA-50308061-3', 'auto');
//                   		ga('send', 'pageview');
//                   	}
//                     // Do things if in edit mode
//                     if (mode == 'edit'){
//                       $('.map-info-title').append(' <a target="_parent" href="/node/' + mapid + '/edit?destination=edit-map/' + mapid +'"><span class="edit-button"><i class="fa fa-pencil"></i> Edit</span></a>');
//                     }
//                 }
//             }
//         );
//     }
// );
$(document).ready(function(){
  $('body a').attr('target', '_blank');
});
