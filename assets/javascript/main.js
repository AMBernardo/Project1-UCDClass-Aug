
  // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyDU1RNQPTorPNLi0J9wZYXJY_kOwa9_B60",
//     authDomain: "realestate-459b5.firebaseapp.com",
//     databaseURL: "https://realestate-459b5.firebaseio.com",
//     projectId: "realestate-459b5",
//     storageBucket: "realestate-459b5.appspot.com",
//     messagingSenderId: "770633504288"
//   };
//   firebase.initializeApp(config);
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
jQuery(document).ready(function(){
    getDataBridge()
    M.AutoInit();
    $('.dropdown-trigger').dropdown();
    $(".sidenav").sidenav();
    $(".tabs").tabs();
    $(".modal").modal();
    $(".parallax").parallax();
    $('.dropdown-trigger').dropdown();
    $(".sidenav").sidenav();
    $(".tabs").tabs();
    $('.parallax').parallax();
    $('.carousel').carousel();
    $('.slider').slider({full_width: true});
    $('.carousel-slider').slider({full_width: true});
    $('.carousel.carousel-slider').carousel({
        fullWidth: true
        });
    });

// my code
$('#submit').on('click',function (event){
    event.preventDefault();
    var URL = ' https://rets.io/api/v2/' + $('#city').val() + '/listings?access_token=520a691140619b70d86de598796f13c1&limit=100&BathroomsFull.eq=' + $('#bathroom').val() + '&BedroomsTotal.eq=' + $('#bed').val() + '&LotSizeSquareFeet.gte=' + $('#minsqft').val().trim() + '&ListPrice.lte=' + $('#maxprice').val().trim()
    $.ajax({ 
        url: URL,
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {
        },
        success: function (result) {
            console.log(result);   
            var object = {url: URL, response : result}
            localStorage.setItem('result', JSON.stringify(object));
            window.location.replace("results.html"); 
            
        },
        error: function () {
            console.log("error");
        }
    });
        
    });

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

var start = 0;
var working = false;
var Data =JSON.parse(localStorage.getItem('result'));
// no need for ajax call getting data from local storage
// //Text Search Ajax Call
function getDataBridge(){
    var Data =JSON.parse(localStorage.getItem('result'));
    console.log(Data)
    generateCards(Data.response)
     };


// function openResults(){
//     window.open('results.html','_self');
// }

$('div.card').on("click", function(event){
    //on click if postPoint>child.attr('display'==none) set child.display = inline & set otherchildren.display = none
    //need to denote what certain clicks do.
    //right now clicking on the picture opens the blade but i think that should just link to the reletive houses info page
    //its is making it hard to set the click event that changes the blade content. talk to ux about options there.
});
//Functions for displaying arrays 
    //ex. el.text(arrayDisplay(arry))
function arrayDisplay(arry){
    for(var i = 0; i< arry.length; i++){
        return arry[i]; 
    };
};

function booleanDisplay(bln){
    if(bln) return 'Yes';
    else return 'N/A';
};

function booleanArrayDisplay(bln, arry){
    if(bln === true){
        for(var i = 0; i< arry.length; i++){
            return arry[i]; 
        };
    }else return 'N/A';
};

function generateCards(Data){
    var a = $('div#rowPost');
    for(var i = 0; i < Data.bundle.length; i++){
        var result = Data.bundle[i];
        //image fallback
        if(result.Media[0]) {var imgurl = result.Media[0].MediaURL;}
        //else if(street view) show street view

        else function streetview() {
var address = result.UnparsedAddress
            $('.responsive-img').html('<img src="http://maps.googleapis.com/maps/api/streetview?size=500x500&sensor=false&location='+address+'">');
                
        };
        
        
    //card generation 
    a.append(
        $('<div/>',{'class': 'col s10 m4'}).append(
            $('<div/>',{'class':'card hoverable'}).append(
                $('<div/>',{'class':'card-image waves-effect waves-block waves-light'}).append(
                //image block=================
                    $('<img>', {'class':'responsive-img'}).attr('src',imgurl).attr('alt','test pic')
                ).append(
                    $('<div/>', {'class': 'caption white black-text text-lighten-2 right-align'}).append(
                        $('<h4/>').text('$'+result.ListPrice  )//Price Header 
                    )
                )
        //data catagories
            ).append(
                $('<div/>',{'class':'card-tabs'}).append(
                    $('<ul/>',{'class':'tabs tabs-fixed-width'}).append(                           
                        $('<li/>',{'class':'tab'}).append(
                            $('<a/>',{'class':'active'}).attr('href', '#'+ result.ListingId+'-tab1').text('Housing Data')
                        )
                    ).append(
                        $('<li/>',{'class':'tab'}).append(
                            $('<a/>').attr('href', '#'+ result.ListingId+'-tab2').text('Agent Data')
                        )
                    ).append(
                        $('<li/>',{'class':'tab'}).append(
                            $('<a/>').attr('href', '#'+ result.ListingId+'-tab3').text('Lot Data')
                        )
                    )
                )
            ).append(
            //card blades========================
                $('<div/>', {'class':'card-content'}).append(
                            $('<div/>',{'id': result.ListingId+'-tab1'}).append(//house data
                                $('<ul/>').text(result.UnparsedAddress).append(
                                    $('<li/>').text(' Beds: ' + result.BedroomsTotal)
                                ).append(
                                    $('<li/>').text(' Full Baths: ' + result.BathroomsFull)
                                ).append(
                                    $('<li/>').text(' Half Baths: ' + result.BathroomsHalf)
                                ).append(
                                    $('<li/>').text('Heating Options: ' + booleanArrayDisplay(result.HeatingYN, result.Heating))
                                ).append(
                                    $('<li/>').text('Laundry Features: ' + arrayDisplay(result.LaundryFeatures))
                                ).append(
                                    $('<li/>').text('Appliances: ' + arrayDisplay(result.Appliances))
                                ).append(
                                    $('<li/>').text('Garage: '+ booleanDisplay(result.GarageYN))
                                ).append(
                                    $('<li/>').text('Flooring Types: ' + arrayDisplay(result.Flooring))
                                )
                            )
                        ).append(
                            $('<div/>',{'id': result.ListingId+'-tab2'}).append(//Agent Data====
                                $('<ul/>').text('Listing Agent: ' + result.ListAgentFullName).append(
                                    $('<br>')
                                ).append(
                                    $('<li/>').text('Contact Number: ' + result.ListAgentPreferredPhone)
                                ).append(
                                    $('<br>')
                                ).append(
                                    $('<li/>').text('Showing Agent: ' + result.ShowingContactName)
                                ).append(
                                    $('<br>')
                                ).append(
                                    $('<li/>').text('Showing Agent Contact Number: ' + result.ShowingContactPhone)
                                ).append(
                                    $('<br>')
                                ).append(
                                    $('<li/>').text('Listing Office: ' + result.ListOfficeName)
                                ).append(
                                    $('<br>')
                                )
                            )
                        ).append(
                            $('<div/>',{'id': result.ListingId+'-tab3'}).append(//Lot Data====
                                $('<ul/>').append(
                                    $('<li/>').text('Lot Size: ' + result.LotSizeSquareFeet + ' SqFt.')
                                ).append(
                                    $('<li/>').text('Living Area: ' + result.LivingArea + ' SqFt.' )
                                ).append(
                                    $('<li/>').text('Exterior Features: ' + result.ExteriorFeatures)
                                ).append(
                                    $('<li/>').text('Year Built: est.'+ result.YearBuilt)
                                ).append(
                                    $('<li/>').text('Zoning: ' + result.Zoning)
                                ).append(
                                    $('<li/>').text('Building Faces: ' +result.DirectionFaces)
                                ).append(
                                    $('<li/>').text('Entry Location: ' +result.EntryLocation)
                                ).append(
                                    $('<br>')
                                ).append(
                                    $('<li/>').text('Contact For Further Details.')
                                )
                        )
                 )
             )
        )
    );
    M.AutoInit();
    $(".tabs").tabs();
                            }//loop close===========
};
