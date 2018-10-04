jQuery(document).ready(function(){
    $('.dropdown-trigger').dropdown();
    $(".sidenav").sidenav();
    $(".tabs").tabs();

});
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDU1RNQPTorPNLi0J9wZYXJY_kOwa9_B60",
    authDomain: "realestate-459b5.firebaseapp.com",
    databaseURL: "https://realestate-459b5.firebaseio.com",
    projectId: "realestate-459b5",
    storageBucket: "realestate-459b5.appspot.com",
    messagingSenderId: "770633504288"
  };
  firebase.initializeApp(config);
//We will use this function once we have the pub dataset
// $('#submit').on('click',function (event){
//     event.preventDefault();
//     var URL =  ' https://rets.io/api/v2/test/listings?access_token=520a691140619b70d86de598796f13c1&limit=9' 
//     URL += '&' + $.param({
//         'near': $('#city').val(),
        
//     });
//     $.ajax({ 
//         url: URL,
//         type: "GET", /* or type:"GET" or type:"PUT" */
//         dataType: "json",
//         data: {
//         },
//         success: function (result) {
//             console.log(result);    
//         },
//         error: function () {
//             console.log("error");
//         }
//     });
// });

$('#submit').on('click',function (event){
    event.preventDefault();
    $.ajax({ 
        url: ' https://rets.io/api/v2/' + $('#city').val() + '/listings?access_token=520a691140619b70d86de598796f13c1&BathroomsFull.eq=' + $('#bathroom').val() + '&BedroomsTotal.eq=' + $('#bed').val() + '&LotSizeSquareFeet.gte=' + $('#minsqft').val().trim() + '&ListPrice.lte=' + $('#maxprice').val().trim(),
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {
        },
        success: function (result) {
            console.log(result);   
            // window.location.replace("results.html"); 
        },
        error: function () {
            console.log("error");
        }
    });
        
    });
  

    $('#submit').on('click',function (event){
        event.preventDefault();
        $.ajax({
            url: ' https://rets.io/api/v2/' + $('#city').val() + '/listings?access_token=520a691140619b70d86de598796f13c1&limit=1000&BathroomsFull.eq=' + $('#bathroom').val() + '&BedroomsTotal.eq=' + $('#bed').val() + '&LotSizeSquareFeet.gte=' + $('#minsqft').val().trim() + '&ListPrice.lte=' + $('#maxprice').val().trim(),
            dataType: "json",
            success: function (e) {
    
                localStorage.result = (JSON.stringify(e));
                var result = localStorage.result;
                var result = $.parseJSON(result)
                console.log(result)
            }
        });
    })






//Map api location data
function newLocation(newLat,newLng)
{
map.setCenter({
lat : newLat,
lng : newLng
});
}



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
})

var map;
function initMap(){
map = new google.maps.Map(document.getElementById('map'), {
center: new google.maps.LatLng(37.773972,-122.431297),
zoom: 11
})
}
$('#1').on('click',function (event){
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: "https://rets.io/api/v2/test_sf/listings?access_token=520a691140619b70d86de598796f13c1",
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

$('#2').on('click',function (event){
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: "https://rets.io/api/v2/test_sd/listings?access_token=520a691140619b70d86de598796f13c1",
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

$('#3').on('click',function (event){
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: "https://rets.io/api/v2/abor_ref/listings?access_token=520a691140619b70d86de598796f13c1",
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
});
});
});



// end of Map script
