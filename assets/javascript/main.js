jQuery(document).ready(function(){
    $('.dropdown-trigger').dropdown();
    $(".sidenav").sidenav();
    $(".tabs").tabs();
    $(".modal").modal();
    $(".parallax").parallax();
});


//Text Search Ajax Call
function getDataBridge(){
    var URL = ' https://rets.io/api/v2/test/listings?access_token=520a691140619b70d86de598796f13c1' 
    URL += '&' + $.param({
        'near': $('#city').val(),
        // 'filterpricegt': $('').val(),
        // 'filterpricele': $('.').val(),



    });
    $.ajax({
        url: URL,
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {
        },
        success: function (result) {
            console.log(result); 
            generateCards(result);

        },
        error: function () {
            console.log("error");
        }
    });
};
//getDataBridge();

function openResults(){
    window.open('results.html','_self');
}

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
function booleanArrayDisplay(bln, arry){
    if(bln === true){
        for(var i = 0; i< arry.length; i++){
            return arry[i]; 
        };
    }else return 'N/A';
};


function generateCards(data){
    var a = $('div#rowPost');
    for(var i = 0; i < data.bundle.length; i++){
        var result = data.bundle[i];
        //image fallback
        if(result.Media[0]) var imgurl = result.Media[0].MediaURL;
        //if(street view) show street view
        else var imgurl = './assets/images/image.png';
        
    //card generation 
    a.append(
        $('<div/>', {'class': 'col s12 m4'}).append(
            $('<div/>', {'class': 'card blue-grey darken-1'}).append(
                $('<div/>', {'class': 'card-content white-text'}).append(
                    $('<span/>', {'class': 'card-title cardTitle'}).text('$'+result.ListPrice)
                )
            ).append(//Price Header 
                $('<div/>', {'class': 'row'}).append(
                    $('<div/>',{'class': 'col s10 offset-s1'}).append(
                        $('<div/>',{'class':'card'}).append(
                            $('<div/>',{'class':'card-image waves-effect waves-block waves-light'}).append(
                            //image block=================
                                $('<img>', {'class':'responsive-img'}).attr('src',imgurl).attr('alt','test pic')
                            )
                    //data catagories
                        ).append(
                            $('<div/>',{'class':'card-content bladeCallParent'}).append(
                                $('<span/>',{'class':'card-title activator grey-text text-darken-4'}).text('Housing Data').append(
                                    $('<i/>', {'class':'material-icons right bladeCall'}).text('more_vert').attr('data-display', 'true')
                                )
                            ).append(
                                $('<span/>',{'class':'card-title activator grey-text text-darken-4'}).text('Agent Data').append(
                                    $('<i/>', {'class':'material-icons right bladeCall'}).text('more_vert').attr('data-display', 'false')
                                )
                            ).append(
                                $('<span/>',{'class':'card-title activator grey-text text-darken-4'}).text('Lot Data').append(
                                    $('<i/>', {'class':'material-icons right bladeCall'}).text('more_vert').attr('data-display', 'false')
                                )
                            ).append(
                                $('<p/>').append(
                                    $('<a/>',{'href': '#'}).text('More information').append(
                                        $('<i/>', {'class':'small material-icons'}).text('note_add')
                                    )
                                )
                            )
                        ).append(
                        //card blades========================
                            $('<div/>', {'class':'card-reveal'}).append(
                                $('<span/>',{'class':'card-title grey-text text-darken-4'}).append(
                                $('<i/>',{'class':'material-icons right'}).text('close')
                            ).append(
                                    $('<span/><br>',{'class':'housingData'}).attr('style', 'display:inline').text('Housing Info')
                                ).append(
                                    $('<span/><br>',{'class':'agentData'}).attr('style', 'display:none').text('Agent Info')
                                ).append(
                                    $('<span/><br>',{'class':'lotData'}).attr('style', 'display:none').text('Lot Info')
                                )
                            ).append(// Housing Data====
                                $('<p/>',{'class':'postPoint'}).append(
                                    $('<ul/>',{'class':'housingData'}).attr('style', 'display: inline').text(result.UnparsedAddress).append(
                                        $('<li/>').text(' Beds: ' + result.BedroomsTotal)
                                    ).append(
                                        $('<li/>').text(' Full Baths: ' + result.BathroomsFull)
                                    ).append(
                                        $('<li/>').text(' Half Baths: ' + result.BathroomsHalf)
                                    ).append(
                                        $('<li/>').text('Heating Options: ' + booleanArrayDisplay(result.HeatingYN, result.Heating))
                                    ).append(
                                        $('<li/>').text('Laundry Features: ' + arrayDisplay(result.LaundryFeatures))
                                    )// add appliances, assosiation fees, 
                                ).append(//Agent Data====
                                    $('<ul/>',{'class':'agentData'}).attr('style','display: none').text(result.ListAgentFullName).append(
                                        $('<li/>').text('Contact Number: ' + result.ListAgentPreferredPhone)
                                    ).append(
                                        $('<li/>').text('Showing Agent: ' + result.ShowingContactName)
                                    ).append(
                                        $('<li/>').text('Showing Agent Contact Number: ' + result.ShowingContactPhone)
                                    ).append(
                                        $('<li/>').text('Listing Office: ' + result.ListOfficeName)
                                    )
                                ).append(//Lot Data====
                                    $('<ul/>',{'class':'lotData'}).attr('style','display:none').append(
                                        $('<li/>').text('Lot Size: ' + result.LotSizeSquareFeet + ' SqFt.')
                                    ).append(
                                        $('<li/>').text('Living Area: ' + result.LivingArea + ' SqFt.' )
                                    ).append(
                                        $('<li/>').text('Exterior Features: ' + result.ExteriorFeatures)
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
    );
                            }//loop close===========
};


