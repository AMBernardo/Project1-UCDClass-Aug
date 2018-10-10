jQuery(document).ready(function(){

    // getDataBridge()
   
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
    $('.slider').slider({full_width: true});
    $('.carousel-slider').slider({full_width: true});
    $('.carousel.carousel-slider').carousel({
        fullWidth: true
    });

    $('.carousel').carousel();
    // setInterval (function(){
    //     $('.carousel').carousel('next');
    // }, 3000);
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        padding: 200
      }, setTimeout(autoplay, 4500));
     
      function autoplay() {
        $('.carousel').carousel('next');
        setTimeout(autoplay, 4500);
      }
    });



 // Initialize Firebase
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


// ================================================================================PROPERTY SEARCH CODE===========================================================================================================
$('#submit').on('click',function (event){
    event.preventDefault();
    if(!$('#city').val() || !$('#bathroom').val() || ! $('#bed').val() || !$('#minsqft').val() || !$('#maxprice').val()) return M.toast({html: 'PLEASE FILL OUT EVERYTHING', classes: 'errorToast ' });
    else{
    var URL = ' https://rets.io/api/v2/' + $('#city').val() + '/listings?access_token=520a691140619b70d86de598796f13c1&limit=100&BathroomsFull.eq=' + $('#bathroom').val() + '&BedroomsTotal.eq=' + $('#bed').val() + '&LotSizeSquareFeet.gte=' + $('#minsqft').val() + '&ListPrice.lte=' + $('#maxprice').val()
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
            
            if(result.bundle.length <= 0){
                M.toast({html: 'ERROR NO RESULTS', classes: 'errorToast ' })
              
               
                
            }else{
                window.location.href = 'results.html'
               
            }

        },
        error: function () {
            console.log("error");
        }
    });
        
    }
})
// ==================================================================================================PROPERTY SEARCH CODE===========================================================================================================


// ==================================================================================================MAP SEARCH CODE===========================================================================================================
//Map api location data
function newLocation(newLat,newLng){
    map.setCenter({
        lat : newLat,
        lng : newLng
    });
}



$("#1").on('click', function ()
{
newLocation(37.774,-122.431297);
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
                // var imgurl = results.bundle[1].Media[1].MediaURL;
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





// ==================================================================================================END OF MAP SEARCH CODE===========================================================================================================

//adds more cards


// ==================================================================================================RESULTS CODE===========================================================================================================


// ==================================================================================================RESULTS CODE===========================================================================================================

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
var x = 0;
$(".more").on('click' , function(Data){
    x += 18
    getDataBridge();
     $(".tabs").tabs();
     
});
   


function generateCards(Data){
    console.log(x)
    var a = $('div#rowPost');
    for(var i = x; i < x + 18; i++){
        var result = Data.bundle[i];
       console.log(i)

       if (x >= 100){
        M.toast({html: 'ERROR NO MORE HOMES', classes: 'errorToast ' });
     }
        
  
        //image fallback
        if(result.Media[0]) {imgurl = result.Media[0].MediaURL;}
        //else if(street view) show street view

        else imgurl = './assets/images/placeholderHouse2.jpeg'      

        //price format
        var number = result.ListPrice;
            
    //card generation 
            a.append(
                $('<div/>',{'class': 'col s10 m4 listCard'}).append(
                    $('<div/>',{'class':'card hoverable'}).append(
                        $('<div/>',{'class':'card-image waves-effect waves-block waves-light'}).append(
                        //image block=================
                            $('<img>', {'class':'responsive-img imageLink'}).attr('data-set',(result.OriginatingSystemKey)).attr('data-lid',(result.ListingKey)).attr('src',imgurl).attr('alt','test pic')
                        ).append(
                            $('<div/>', {'class': 'caption white black-text text-lighten-2 right-align'}).append(
                                $('<h4/>').text('$'+ number.toLocaleString()  )//Price Header 
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
    window.location.href='propertyPage.html'
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
    $('#propertyAdd').attr('value', result.UnparsedAddress).text(result.UnparsedAddress);
    $('#address').attr('value', result.UnparsedAddress);
    $('#favoriteButton').attr('data-set',(result.OriginatingSystemKey)).attr('data-lid',(result.ListingKey))
    
    if (result.Media[0]){
        // image fallback
        for( var i =0; i < result.Media.length; i++){
            $('#propCarousel').append(
                $('<a/>',{'class':'carousel-item'}).append(
                    $('<img>').attr('src', result.Media[i].MediaURL)
                )
              )
          }$('.carousel').carousel();
        }
    else {
        $('#propCarousel').append(
          $('<a/>',{'class':'carousel-item'}).append(
              $('<img>').attr('src','./assets/images/placeholderHouse2.jpeg')
          )
        )
    }$('.carousel').carousel();

    var number = result.ListPrice

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
                            $('<li/>').text('Listing Price: $' + number.toLocaleString())
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


//create firebase references
var Auth = firebase.auth(); 
var dbRef = firebase.database();
var usersRef = dbRef.ref()
var auth = null;
var activeUser;
var uid;
var name;
var email;


// current user check
firebase.auth().onAuthStateChanged(user=> {
    if (user) {
        //if there is a signed in user
      activeUser = user;
      uid = activeUser.uid;
      email = activeUser.email;
      console.log(email, activeUser, uid);
      $('#sideNavEmail').text(email);
      $('#usergreet').text('Welcome    ' + email);
      $('.loginNav').attr('style', 'display: none');
      $('.userDisplay').attr('style', 'display: inline');
      $('#favoriteButton').attr('style', 'display: inline')
    } else {
        console.log('no user signed in')
        localStorage.removeItem('user id:')
        $('.loginNav').attr('style', 'display: inline');
        $('.userDislay').attr('style', 'display: none');
        $('#favoriteButton').attr('style', 'display: none')
    }
  });

  $('#logout').on('click', function(e){
    e.preventDefault()
    firebase.auth().signOut()
      .then(function() {
        console.log('user signed out')
        localStorage.removeItem('user id:');
        window.location.replace('Login.html')
        window.location.replace('Login.html')
      })
      .catch(function(error) {
        console.log(error)
      });
  })


  //Register
  $('#signbtn').on('click', function (e) {
    e.preventDefault();
    if(!$('#email').val().trim() || !$('#password').val().trim()) return M.toast({html: 'ERROR PLEASE FILL OUT EVERYTHING', classes: 'errorToast ' });
    
    var data = {
      email: $('#email').val().trim(), //get the email from Form
      displayName: $('#displayName').val().trim(),
      password : $('#password').val().trim(), //get the pass from Form
      phoneNumber: $('#poneNumber').val(),
      address: $('#userAddress').val(),
      state: $('#userState').val()
    }
    if( data.email != '' && data.password != '')
        //create the user
        firebase.auth()
          .createUserWithEmailAndPassword(data.email, data.password)
          .then(function() {
            activeUser = firebase.auth().currentUser; 
            activeUser.updateProfile(
                firebase.database().ref('users' + firebase.auth().currentUser.uid).set({
                    displayName: $('#displayName').val(),
                    email : $('#email').val(),  
                    Number: $('#phoneNumber').val(),
                    address: $('#userAddress').val(), 
                    state: $('#userState').val(),
                    uid: firebase.auth().currentUser.uid
                })
            );
                
        if (firebase.auth().currentUser !== null) 
            console.log("user id: " + firebase.auth().currentUser.uid);
            localStorage.setItem('user id:', JSON.stringify(activeUser));
            name = dbRef.ref(firebase.auth().currentUser.uid).displayName;
            email = Auth.currentUser.email;
            console.log(name, email, activeUser)
            window.location.href = 'userPage.html'
            })
                .catch(function(error){
                    console.log("Error creating user:", error);
                });
    });
  

    $('#btnLogIn').on('click', function(e){
        e.preventDefault();
        if (!$('#logEmail').val()|| !$('#logPassword').val())return  M.toast({html: 'ERROR PLEASE FILL OUT EVERYTHING', classes: 'errorToast '}); 
        var data = {
            email: $('#logEmail').val(), //get the email from Form
          password : $('#logPassword').val(), //get the pass from Form
        }
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                localStorage.setItem('user id:', JSON.stringify(user));
                window.location.href = 'userPage.html'
            } else {
              // No user is signed in.
            }
        });
        
        
    })
    
    
    
    // ==================================================================================================END OF USER AUTHENTICATION CODE===========================================================================================================
    
    
  //============================favorite mechanism===============================================\\
  firebase.auth().onAuthStateChanged(function(user) {
    activeUser = user;
    uid = activeUser.uid 
    if (user) {
        firebase.database().ref('users/' + uid +  '/favorites' ).on('child_added',function(snapshot){
            
            console.log(snapshot.val())
            
            let LID = snapshot.val().LID;
            let dataSet =snapshot.val().ds;    
            let URL = 'https://rets.io/api/v2/'+ dataSet +'/listings/'+ LID +'?access_token=520a691140619b70d86de598796f13c1'
            $.ajax({ 
                url: URL,
                type: "GET", /* or type:"GET" or type:"PUT" */
                dataType: "json",
                data: {
                },
                success: function (result) {
                    console.log(result)
                    populateFavorites(result.bundle)
                },
                error: function () {
                    console.log("error");
                }
            });
            // 
            
        });
    }
    else{ return}
});

function newFavorite(LID, uid, ds){
    var newFavoriteData =   {
        LID: LID,
        ds: ds
    };

    var newFavoriteKey = firebase.database().ref('users/' + uid).child('favorites').push().key;

    var updates = {};
    updates['/favorites/' + newFavoriteKey] = newFavoriteData;

    return  firebase.database().ref('users/' + uid).update(updates);

}

function populateFavorites(result){
    if(result.Media[0]) {imgurl = result.Media[0].MediaURL;}
    else imgurl = './assets/images/placeholderhouse2.jpeg';

    $('#favePost').append(
         $('<div/>',{'class': 'card col s3 m3 '}).append(
            $('<div/>',{'class':'card-image waves-effect waves-block waves-light'}).append(
                //image block=================
                    $('<img>', {'class':'responsive-img imageLink'}).attr('data-set',(result.OriginatingSystemKey)).attr('data-lid',(result.ListingKey)).attr('src',imgurl).attr('alt','test pic')
                ).append(
                    $('<div/>', {'class': 'caption white black-text text-lighten-2 right-align'}).append(
                        $('<h4/>').text('$'+result.ListPrice)//Price Header 
                    )
                )
         )
    )             
};



$('#favoriteButton').on('click', function (e) {
    e.preventDefault();
    var LID = $(this).attr('data-lid');
    var ds =$(this).attr('data-set');
    console.log('ON CLICK DS AND LID= ' + ds, LID)
    // var user = firebase.auth().currentUser;
    newFavorite(LID, uid, ds)
   
});

//========================================end favoriting===========================\\
    //=======================more firebase stufffffff=============================





//=====================================================================================================USER PAGE CODE================================================================================================================

$('#update').on('click',function updateUser(e, uid) {
e.preventDefault()
firebase.auth().onAuthStateChanged(function(user) {
    activeUser = user;
    uid = activeUser.uid
if(user){
    var postData = {
      displayName: $('#full_name').val(),
      uid: uid,
      email: $('#updateEmail').val(),
      Number: $('#updateNumber').val(),
      address: $('#updateAddress').val(),
      state: $('#updateState').val()
    };
    var user = firebase.auth().currentUser;
    user.updateProfile({
        displayName:$('#full_name').val(),
        email: $('#updateEmail').val()
      }).then(function() {
        // Update successful.
      })
    var newUpdateKey = firebase.database().ref(uid).push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates[newUpdateKey] = postData;
  
    return firebase.database().ref(uid).update(updates);
    
  }})})


//==================================================================================================Index Code==================================================
$('#indexSubmit').on('click',function (event){
    event.preventDefault();
    var URL = 'https://rets.io/api/v2/' + $('#city').val() + '/listings?access_token=520a691140619b70d86de598796f13c1&limit=100'
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
            window.location.href = "results.html"; 
            
        },
        error: function () {
            console.log("error");
        }
    });

});

    $('#advanced').on('click',function (event){
        event.preventDefault();

        window.location.href= "propertySearch.html"; 

    });
