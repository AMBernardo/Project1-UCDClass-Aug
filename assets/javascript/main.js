jQuery(document).ready(function(){
$('.dropdown-trigger').dropdown();
$('.sidenav').sidenav();

});



function getDataBridge(){
    var URL =  ' https://rets.io/api/v2/test/listings?access_token=520a691140619b70d86de598796f13c1' 
    URL += '?' + $.param({
        'near': $('#locationname').val().trim(),
        
    });
    $.ajax({
        url: queryURL,
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {
        },
        success: function (result) {
            console.log(result);    
        },
        error: function () {
            console.log("error");
        }
    });
};


$.ajax({
    type: "GET",
    url: "https://rets.io/api/v2/test/listings?access_token=520a691140619b70d86de598796f13c1",
    data: "",
    success: function(results) {
        for (var i = 0; i < results.bundle.length; i++) {
            var coords = results.bundle[i].Coordinates;
            var latLng = new google.maps.LatLng(coords[1],coords[0]);
            var marker = new google.maps.Marker({
              position: latLng,
              map: map
        });
    }
}});

var map;
function initMap(){
map = new google.maps.Map(document.getElementById('map'), {
center: new google.maps.LatLng(37.773972,-122.431297),
zoom: 11

})}


      // Loop through the results array and place a marker for each
      // set of coordinates.
      window.eqfeed_callback = function(result) {
        $.ajax({
            url:  ' https://rets.io/api/v2/test/listings?access_token=520a691140619b70d86de598796f13c1',
            type: "GET", /* or type:"GET" or type:"PUT" */
            dataType: "json",
            data: {
            },
            success: function (result) {
                console.log(result)  
            },
            error: function () {
                console.log("error");
            }
        });
        for (var i = 0; i < result.bundle.length; i++) {
          var coords = result.bundle[i].Coordinates;
        var latLng = new google.maps.LatLng(coords[0],coords[1]);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            marker: marker
          });
        }
      }

function newLocation(newLat,newLng)
{
map.setCenter({
lat : newLat,
lng : newLng
});
}

$(document).ready(function ()
{
$("#1").on('click', function ()
{
newLocation(37.773972,-122.431297);
});

$("#2").on('click', function ()
{
newLocation(32.715736,-117.161087);
});

$("#3").on('click', function ()
{
newLocation(30.267153, -97.7430608);
});
});