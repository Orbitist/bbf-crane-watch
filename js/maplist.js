function renderMapList(category) {

  // Create the map list items
  for (var i = 0; i < orbitistPointsGeojsonCleaned.features.length; i++) {
    var feature = orbitistPointsGeojsonCleaned.features[i];


    //skip anything not checked in the array
          // CONTAINS FUNCTION
          var contains = function(needle) {
          // Per spec, the way to identify NaN is that it is not equal to itself
          var findNaN = needle !== needle;
          var indexOf;
          if(!findNaN && typeof Array.prototype.indexOf === 'function') {
              indexOf = Array.prototype.indexOf;
          } else {
              indexOf = function(needle) {
                  var i = -1, index = -1;
                  for(i = 0; i < this.length; i++) {
                      var item = this[i];
                      if((findNaN && item !== item) || item === needle) {
                          index = i;
                          break;
                      }
                  }
                  return index;
              };
          }
          return indexOf.call(this, needle) > -1;
        };
        // END CONTAINS FUNCTION

    if (category != null) {
      var checkedIncludes = contains.call(category, feature.properties.category);
      if (checkedIncludes == false) {
        continue;
      }
    }

    // get propertyImage
    var propertyImage = '<img src="' + feature.properties.image + '" />';
    if (feature.properties.image == null){
      propertyImage = '';
    }
    // get propertyCategoryImage
    var propertyCategoryImage = null;
    if (feature.properties.category == 'Recently Sold Rehab Properties'){
      propertyCategoryImage = '<img src="img/sold-rehab.png" class="propertyCategoryImage" /> Recently Sold Rehab';
    }
    if (feature.properties.category == 'Rehabs for Sale'){
      propertyCategoryImage = '<img src="img/for-sale.png" class="propertyCategoryImage" /> For Sale';
    }
    if (feature.properties.category == 'Recently Demolished'){
      propertyCategoryImage = '<img src="img/recently-demolished.png" class="propertyCategoryImage" /> Recently Demolished';
    }
    if (feature.properties.category == 'Future Demolitions'){
      propertyCategoryImage = '<img src="img/future-demolitions.png" class="propertyCategoryImage" /> Future Demolition';
    }

    // build the propertyValue
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    var propertyValue = numberWithCommas(feature.properties.TotalAssessedValue);

    //build the propertySquareFootage
    var propertySquareFootage = numberWithCommas(feature.properties.SquareFootage);

    //build the building style and condition
    var propertyBuildingStyle = feature.properties.BuildingStyle.toLowerCase();
    var propertyCondition = feature.properties.OverallCondition.toLowerCase();

    //build bathroom statement
    var propertyBathrooms = feature.properties.NumberOfBaths + ' bathroom';
    if (feature.properties.NumberOfBaths > 1) {
      propertyBathrooms = feature.properties.NumberOfBaths + ' bathrooms';
    }

    //build bedroom statement
    var propertyBedrooms = feature.properties.NumberOfBedrooms + ' bedroom';
    if (feature.properties.NumberOfBedrooms > 1) {
      propertyBedrooms = feature.properties.NumberOfBedrooms + ' bedrooms';
    }

    //Build Year build statement
    var propertyYearBuilt = 'in ' + feature.properties.StructureYearBuilt;
    if (feature.properties.StructureYearBuilt == 0){
      propertyYearBuilt = 'at an unknown time'
    }

    // build the listItem
    var  listItem  = '<li class="map-list-item" id="' + 'property' + i + '"><hr>' + propertyImage +
    '<p>' + propertyCategoryImage + '</p>' +
    '<p><strong>' + feature.properties.name + '</strong></p>' +
    '<p><strong>Assessed Value: </strong> $' + propertyValue + '</p>' +
    '<p>This ' + propertySquareFootage + ' square foot ' + propertyBuildingStyle + ' home was built ' + propertyYearBuilt + '. It has ' + propertyBedrooms + ' and ' + propertyBathrooms + '. Overall, the property is in ' + propertyCondition + ' condition.</p>' +
    '</li><script>document.getElementById("' + 'property' + i + '").addEventListener("click", function () {map.flyTo({center:[' + feature.geometry.coordinates + '],zoom: 18,bearing: 90 * (.5 - Math.random()),pitch: 60});});</script>';

    $('div#map-list-items').append(listItem);
  }

};


function filterMapList () {
  var selected = [];
  $('input:checked').each(function() {
    selected.push($(this).attr('id'));
  });
  document.getElementById('map-list-items').innerHTML = "";
  renderMapList(selected);
};
