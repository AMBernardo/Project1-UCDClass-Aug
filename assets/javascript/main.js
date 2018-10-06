
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




// var start = 0;
// var working = false;
// //Text Search Ajax Call
// function getDataBridge(){
//     var URL = ' https://rets.io/api/v2/test/listings?access_token=520a691140619b70d86de598796f13c1&offset=' + start;
//     URL += '&' + $.param({
//         // 'BathroomsFull.eq': $('#bathroom').val(),
//         // 'BedroomsTotal.eq': $('#bed').val(),
//         // 'ListPrice.lte': $('#maxprice').val().trim(),
//         // 'LotSizeSquareFeet.gte': $('#minsqft').val().trim(),
//        //query param
//     });
//     $.ajax({
// my code
$('#submit').on('click',function (event){
    event.preventDefault();
    var URL = ' https://rets.io/api/v2/' + $('#city').val() + '/listings?access_token=520a691140619b70d86de598796f13c1&limit=25&BathroomsFull.eq=' + $('#bathroom').val() + '&BedroomsTotal.eq=' + $('#bed').val() + '&LotSizeSquareFeet.gte=' + $('#minsqft').val().trim() + '&ListPrice.lte=' + $('#maxprice').val().trim()
    $.ajax({ 
        url: URL,
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {
        },
        success: function (result) {
            console.log(result);   
            var object = {url: URL, response : result}
            localStorage.removeItem('result')
            localStorage.setItem('result', JSON.stringify(object));
            window.location.replace("results.html"); 
            
        },
        error: function () {
            console.log("error");
        }
    });
        
    });

//Map api location data
function newLocation(newLat,newLng){
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

//grab this code.....
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
                var info = "<h5>" + "  Address  " + "</h5>" + results.bundle[i].UnparsedAddress + "<br>" + "<br>" +  "<h5>"+"  Listed Price  " + "</h5>"+ results.bundle[i].ListPrice +  "<br>" +   "<br>" +  "<h5>" + "  Square Foot  " + "</h5>" + results.bundle[i].LotSizeSquareFeet + "  Bedrooms  " + results.bundle[i].BedroomsTotal  + "  Full baths  " + results.bundle[i].BathroomsFull + "  Half baths  " + results.bundle[i].BathroomsHalf 
                // var imgurl = results.bundle[1].Media[1].MediaURL;
                var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  customInfo: info
                //   customInfo:"  Address  " + results.bundle[i].UnparsedAddress + "  Listed Price  "+ results.bundle[i].ListPrice + "  Lot size sqft.  " +  results.bundle[i].LotSizeSquareFeet + "  Bedrooms  " + results.bundle[i].BedroomsTotal  + "  Full baths  " + results.bundle[i].BathroomsFull + "  Half baths  " + results.bundle[i].BathroomsHalf 
            });
            google.maps.event.addListener(marker,  'click', function() {
               
                $('#modal1').modal('open'); 
                $("#modal-text").append(this.customInfo).append(
                    $('<img>', {'class':'responsive-img ' }).attr('src', imgurl).attr('alt','test pic')
                )
               
               
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
                var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  customInfo:"  Address  " + results.bundle[i].UnparsedAddress + "  Listed Price  "+ results.bundle[i].ListPrice + "  Lot size sqft.  " +  results.bundle[i].LotSizeSquareFeet + "  Bedrooms  " + results.bundle[i].BedroomsTotal  + "  Full baths  " + results.bundle[i].BathroomsFull + "  Half baths  " + results.bundle[i].BathroomsHalf 
            });
            google.maps.event.addListener(marker, 'click', function() {
                alert(this.customInfo);
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
                var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  customInfo:"  Address  " + results.bundle[i].UnparsedAddress + $("<br>") + "  Listed Price  "+ results.bundle[i].ListPrice + "  Lot size sqft.  " +  results.bundle[i].LotSizeSquareFeet + "  Bedrooms  " + results.bundle[i].BedroomsTotal  + "  Full baths  " + results.bundle[i].BathroomsFull + "  Half baths  " + results.bundle[i].BathroomsHalf 
            });
            google.maps.event.addListener(marker, 'click', function() {
                $("#modal1").append(this.customInfo)
                // alert(this.customInfo);
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
//     var a = $('div#rowPost');
//     for(var i = 0; i < Data.bundle.length; i++){
//         var result = Data.bundle[i];
// =======
//my code for more cards
}
$(".more").on('click' , function(Data){

    getDataBridge();
});
    function generateCards(Data){
    
   

    var a = $('div#rowPost');
  
    for(var i = 0; i < 12; i++){
       
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
                $('<div/>',{'class': 'col s10 m4 listCard'}).append(
                    $('<div/>',{'class':'card hoverable'}).append(
                        $('<div/>',{'class':'card-image' /*waves-effect waves-block waves-light*/}).append(
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
    }//loop close===========
};


//================================================property page code(ajax and population)
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
                            $('<li/>').text('Listing Price: ' + result.ListPrice)
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






//================================================end property page



// user sign up/in
// get user login elements
var txtEmail = $('#logemail');
var txtPass =  $('#logpassword');
var loginBtn =  $('#btnLogIn');

// get user sign up elements
var txtSEmail = $('#email');
var txtSPass = $('#password');
var userName = $('#name')
var btnSignIn = $('#signbtn')
var displayName = $('#name')
// add login event
$('#btnLogIn').on('click', e =>{
// get email and password fields
var email = txtEmail.val()
var pass = txtPass.val()
var auth = firebase.auth()
// sign in
var promise = auth.signInWithEmailAndPassword(email, pass)
promise.catch(e => console.log(e.message));

});

// add signup event 

$('#signbtn').on('click', e =>{
    // get email and password fields
    var email = txtSEmail.val()
    var pass = txtSPass.val()
    var auth = firebase.auth()
    var userName = displayName.val()
    // sign in
    var promise = auth.createUserWithEmailAndPassword(email, pass).then(function(user) {
        user.firebase.auth()({
            displayName: userName   
        });   
    promise.catch(e => console.log(e.message));
    
    });

    // add a realtime listener to detect user suthentication state changes
    firebase.auth().onAuthStateChanged(firebaseUser =>{
        if(firebaseUser){
            console.log(firebaseUser)
        } else {
            console.log('not logged in');
        }

        });
    });
