jQuery(document).ready(function(){
    $('.dropdown-trigger').dropdown();
    $('.sidenav').sidenav();
    
    });
    
    $('#submit').on('click', function(event) {
        event.preventDefault()
       
        var URL =  ' https://rets.io/api/v2/test/listings?access_token=520a691140619b70d86de598796f13c1&limit=9' 
        URL += '&' + $.param({
            'near': $('#city').val(),
            
        });
        $.ajax({
            url: URL,
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
    });
    

   
    var map;
function initMap()
{
map = new google.maps.Map(document.getElementById('map'), {
center: new google.maps.LatLng(37.773972,-122.431297),
zoom: 11
});
 
  var script = document.createElement('script');
  script.src ='https://rets.io/api/v2/test/listings?access_token=520a691140619b70d86de598796f13c1' ;
  document.getElementsByTagName('head')[0].appendChild(script);
      }

      // Loop through the results array and place a marker for each
      // set of coordinates.
      window.eqfeed_callback = function(result) {
        for (var i = 0; i < result.bundle.length; i++) {
          var Latitude = result.bundle[i].latitude;
          var Longitude = result.bundle[i].longitude;
          var latLng = Latitude.add(Longitude);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map
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


