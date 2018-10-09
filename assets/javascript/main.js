  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDR2-15Tdhu7iFhT4MbpbyoxP157PtISIk",
    authDomain: "doorsteppe.firebaseapp.com",
    databaseURL: "https://doorsteppe.firebaseio.com",
    projectId: "doorsteppe",
    storageBucket: "doorsteppe.appspot.com",
    messagingSenderId: "808880878005"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
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
    // getDataBridge()
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





// ================================================================================PROPERTY SEARCH CODE===========================================================================================================
$('#submit').on('click',function (event){
    event.preventDefault();
    var URL = ' https://rets.io/api/v2/' + $('#city').val() + '/listings?access_token=520a691140619b70d86de598796f13c1&limit=25&BathroomsFull.eq=' + $('#bathroom').val() + '&BedroomsTotal.eq=' + $('#bed').val() + '&LotSizeSquareFeet.gte=' + $('#minsqft').val() + '&ListPrice.lte=' + $('#maxprice').val()
    $.ajax({ 
        url: URL,
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {
        },
        success: function (result) {
            var object = {url: URL, response : result}
            localStorage.removeItem('result')
            localStorage.setItem('result', JSON.stringify(object));
            window.location.href = 'results.html'
            
        },
        error: function () {
            console.log("error");
        }
    });
        
    });
// ==================================================================================================PROPERTY SEARCH CODE===========================================================================================================

//Map api location data
function newLocation(newLat,newLng){
    map.setCenter({
        lat : newLat,
        lng : newLng
    });
}
$('.dropdown-trigger').dropdown();
$(".sidenav").sidenav();
$(".tabs").tabs();
$('.parallax').parallax();
$('.slider').slider({full_width: true});
$('.carousel-slider').slider({full_width: true});

$('.carousel').carousel();
setInterval (function(){
    $('.carousel').carousel('next');
}, 2000);
// autoplay function for carousel



$("#1").on('click', function ()
{
    newLocation(37.773972,-122.431297);
});

$("#2").on('click', function (){
    newLocation(32.715736,-117.161087);
});

$("#3").on('click', function ()
{
newLocation(30.267153, -97.7430608);
});

var map;
function initMap(){

map = new google.maps.Map(document.getElementById('map'), {
center: new google.maps.LatLng(37.774,-122.431297),
zoom: 13
})
}

//grab this code.....
$('#1').on('click',function (event){
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: "https://rets.io/api/v2/test_sf/listings?access_token=520a691140619b70d86de598796f13c1&limit=100",
        data: "",
        success: function(results) {
            for (var i = 0; i < results.bundle.length; i++) {
                var coords = results.bundle[i].Coordinates;
                var latLng = new google.maps.LatLng(coords[1],coords[0]);
                var info = "<h5>" + "  Address  " + "</h5>" + results.bundle[i].UnparsedAddress + "<br>" + "<br>" +  "<h5>"+"  Listed Price  " + "</h5>"+ results.bundle[i].ListPrice +  "<br>" +   "<br>" +  "<h5>" + "  Square Foot  " + "</h5>" + results.bundle[i].LotSizeSquareFeet + "  Bedrooms  " + results.bundle[i].BedroomsTotal  + "  Full baths  " + results.bundle[i].BathroomsFull + "  Half baths  " + results.bundle[i].BathroomsHalf 

                var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  customInfo: info
            });
            google.maps.event.addListener(marker, 'click', function() {
                //TODO: append clicked house markers in cards below the map
                $('#modal1').modal('open'); 
                $("#modal-text").html(this.customInfo)
            });
        }
}});

$('#2').on('click',function (event){
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: "https://rets.io/api/v2/test_sd/listings?access_token=520a691140619b70d86de598796f13c1&limit=100",
        data: "",
        success: function(results) {
            for (var i = 0; i < results.bundle.length; i++) {
                var coords = results.bundle[i].Coordinates;
                var latLng = new google.maps.LatLng(coords[1],coords[0]);
                var info = "<h5>" + "  Address  " + "</h5>" + results.bundle[i].UnparsedAddress + "<br>" + "<br>" +  "<h5>"+"  Listed Price  " + "</h5>"+ results.bundle[i].ListPrice +  "<br>" +   "<br>" +  "<h5>" + "  Square Foot  " + "</h5>" + results.bundle[i].LotSizeSquareFeet + "  Bedrooms  " + results.bundle[i].BedroomsTotal  + "  Full baths  " + results.bundle[i].BathroomsFull + "  Half baths  " + results.bundle[i].BathroomsHalf 
                var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  customInfo:info
            });
            google.maps.event.addListener(marker, 'click', function() {
                $('#modal1').modal('open'); 
                $("#modal-text").html(this.customInfo)
            });
        }
}});

$('#3').on('click',function (event){
    event.preventDefault();
    $.ajax({
        type: "GET",
        url: "https://rets.io/api/v2/abor_ref/listings?access_token=520a691140619b70d86de598796f13c1&limit=100",
        data: "",
        success: function(results) {
            for (var i = 0; i < results.bundle.length; i++) {
                var coords = results.bundle[i].Coordinates;
                var latLng = new google.maps.LatLng(coords[1],coords[0]);
                var info = "<h5>" + "  Address  " + "</h5>" + results.bundle[i].UnparsedAddress + "<br>" + "<br>" +  "<h5>"+"  Listed Price  " + "</h5>"+ results.bundle[i].ListPrice +  "<br>" +   "<br>" +  "<h5>" + "  Square Foot  " + "</h5>" + results.bundle[i].LotSizeSquareFeet + "  Bedrooms  " + results.bundle[i].BedroomsTotal  + "  Full baths  " + results.bundle[i].BathroomsFull + "  Half baths  " + results.bundle[i].BathroomsHalf 
                var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  customInfo:info
            });
            google.maps.event.addListener(marker, 'click', function() {
                $('#modal1').modal('open'); 
                $("#modal-text").html(this.customInfo)
            });
        }
}});
});
});
});
$(".modal-close").on('click' , function(){
    $("#modal-text").empty();
})
//end of what you need------------------------------------------------
// end of Map script





// ==================================================================================================END OF MAP SEARCH CODE===========================================================================================================





// ==================================================================================================RESULTS CODE===========================================================================================================
// no need for ajax call getting data from local storage
// //Text Search Ajax Call
function getDataBridge(){
    var Data =JSON.parse(localStorage.getItem('result'));
    console.log(Data)
    generateCards(Data.response)
};



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

        else imgurl = './assets/images/placeholderhouse2.jpeg'      

        
    //card generation 
            a.append(
                $('<div/>',{'class': 'col s10 m4 listCard'}).append(
                    $('<div/>',{'class':'card hoverable'}).append(
                        $('<div/>',{'class':'card-image waves-effect waves-block waves-light'}).append(
                        //image block=================
                            $('<img>', {'class':'responsive-img imageLink'}).attr('data-set',(result.OriginatingSystemKey)).attr('data-lid',(result.ListingKey)).attr('src',imgurl).attr('alt','test pic')
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
    }
};
// ==================================================================================================END OF RESULTS CODE===========================================================================================================




//================================================property page code(ajax and population)============================================================
//result image click gets the id, sends you to property page and calls ajax
$(document).on('click', 'img.imageLink', function (){
    console.log($(this).attr('data-lid'));
    localStorage.removeItem('lid','dataset')
    localStorage.setItem('lid', $(this).attr('data-lid'))
    localStorage.setItem('dataset', $(this).attr('data-set'))
    window.location.replace('propertyPage.html')
});
function populateInfo(){
    let lid = localStorage.getItem('lid');
    let dataset = localStorage.getItem('dataset')
    let URL = 'https://rets.io/api/v2/'+dataset+'/listings/'+lid+'?access_token=520a691140619b70d86de598796f13c1'
    $.ajax({ 
        url: URL,
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {
        },
        success: function (result) {
            console.log(result); 
            listPage(result.bundle)

        },
        error: function () {
            console.log("error");
        }
    });
};
function listPage(result){
    $('#propertyAdd').attr('value', result.UnparsedAddress).text(result.UnparsedAddress)
    $('#address').attr('value', result.UnparsedAddress)
    for( var i =0; i < result.Media.length; i++){
        $('#propCarousel').append(
          $('<a/>',{'class':'carousel-item'}).append(
              $('<img>').attr('src', result.Media[i].MediaURL)
          )
        )
    }$('.carousel').carousel();

    let a = $('#propPostPoint')
    a.append(
        $('<div/>',{'class':'card-tabs'}).append(
            $('<ul/>',{'class':'tabs tabs-fixed-width'}).append(                           
                $('<li/>',{'class':'tab'}).append(
                    $('<a/>',{'class':'active'}).attr('href', '#tab1').text('Housing Data')
                )
            ).append(
                $('<li/>',{'class':'tab'}).append(
                    $('<a/>').attr('href', '#tab2').text('Agent Data')
                )
            ).append(
                $('<li/>',{'class':'tab'}).append(
                    $('<a/>').attr('href', '#tab3').text('Lot Data')
                )
            )
        )
    ).append(
    //card blades========================
        $('<div/>', {'class':'card-content'}).append(
                    $('<div/>',{'id': 'tab1'}).append(//house data
                        $('<ul/>').text(result.UnparsedAddress).append(
                            $('<li/>').text('Listing Price: $' + result.ListPrice)
                        ).append(
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
                    $('<div/>',{'id': 'tab2'}).append(//Agent Data====
                        $('<ul/>').text('Listing Agent: ' + result.ListAgentFullName).append(
                            $('<br>')
                        ).append(
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
                        )
                    )
                ).append(
                    $('<div/>',{'id': 'tab3'}).append(//Lot Data====
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
    $(".tabs").tabs();
};






// ==================================================================================================END OF PROPERTY PAGE CODE===========================================================================================================





// ==================================================================================================USER AUTHENTICATION CODE===========================================================================================================
// add signup event 

  //create firebase references
  var Auth = firebase.auth(); 
  var dbRef = firebase.database();
  var usersRef = dbRef.ref()
  var auth = null;
  var user = Auth.currentUser;
  //Register
  $('#signbtn').on('click', function (e) {
    e.preventDefault();
    var data = {
      email: $('#email').val().trim(), //get the email from Form
      firstName: $('#name').val().trim()
    };
    var passwords = {
      password : $('#password').val().trim(), //get the pass from Form
    }
    if( data.email != '' && passwords.password != '')
        //create the user
        firebase.auth()
          .createUserWithEmailAndPassword(data.email, passwords.password)
          .then(function() {
            var user = firebase.auth().currentUser; 
            var user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: $('#name').val().trim()
                    });
          })
            .catch(function(error){
                console.log("Error creating user:", error);
                });
    });
  
    $('#favoriteButton').on('click', function (e) {
        e.preventDefault();
        var LID = $(this).attr('data-lid');
        var ds =$(this).attr('data-set');
        var user = firebase.auth().currentUser;
        var faveLi = {
            LID: LID,
            dataSet: ds,
        }

        dbRef.ref('user/' + user).push({
           faveLi: faveLi,
        });
    });

    dbRef.ref('user/' + user).on('child_added', function(childSnapshot){
        let LID = childSnapshot.LID;
        let dataSet = childSnapshot.dataSet;    
        let URL = 'https://rets.io/api/v2/'+ dataSet +'/listings/'+ LID +'?access_token=520a691140619b70d86de598796f13c1'
        $.ajax({ 
            url: URL,
            type: "GET", /* or type:"GET" or type:"PUT" */
            dataType: "json",
            data: {
            },
            success: function (result) {
                console.log(result); 
                populateFavorites(result)
            },
            error: function () {
                console.log("error");
            }
        });
        
        function populateFavorites(result){
            $('#favePost').append(
                // all the fuckin info we need
            )

        }
        

        
    });
    

// ==================================================================================================END OF USER AUTHENTICATION CODE===========================================================================================================
//=======================more firebase stufffffff=============================






//==================================================================================================Index Code==================================================
$('#indexSubmit').on('click',function (event){
    event.preventDefault();
    var URL = 'https://rets.io/api/v2/' + $('#indexcity').val() + '/listings?access_token=520a691140619b70d86de598796f13c1&limit=25'
    $.ajax({ 
        url: URL,
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {
        },
        success: function (result) {
            var object = {url: URL, response : result}
            localStorage.removeItem('result')
            localStorage.setItem('result', JSON.stringify(object));
            window.location.href = 'results.html'         
        },
        error: function () {
            console.log("error");
        }
    });

});

    $('#advanced').on('click',function (){
        // event.preventDefault();

        window.location.href ="propertysearch.html"

        $('.carousel.carousel-slider').carousel({
            fullWidth: true
            })
    });
