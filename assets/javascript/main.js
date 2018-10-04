jQuery(document).ready(function(){
    $('.dropdown-trigger').dropdown();
    $('.sidenav').sidenav();
    
    });
    
  
        
        
    
    function getDataBridge(){
        var URL = ' https://rets.io/api/v2/test/listings?access_token=520a691140619b70d86de598796f13c1' 
        URL += '&' + $.param({
            'near': $('#city').val(),
            // 'filterpricegt': $('').val(),
            // 'filterpricele': $('.').val(),
            // $('#city').val(),
    
    
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
                var searchny = (result.bundle[0].city)

                console.log(result.bundle[0])
               
            },
            error: function () {
                console.log("error");
            }
         
        });
       

       
           
    };
    
    getDataBridge();  
        

    function openResults(){
        window.open('results.html','_self');
    }
    function changeBlade(){
        //function that will change the display in the display blade
        //write all the info in 3 sepperate lists and set all to 'display:none'
        //on click if postPoint>child.attr('display'==none) set child.display = inline & set otherchildren.display = none
    }
    function generateCards(data){
        var a = $('div#rowPost');
        for(var i = 0; i < data.bundle.length; i++){
            var result = data.bundle[i];
            if(result.Media[0]) var imgurl = result.Media[0].MediaURL;
            else var imgurl = './assets/images/image.png';
            
         
        a.append(
            $('<div/>', {'class': 'col s12 m4'}).append(
                $('<div/>', {'class': 'card blue-grey darken-1'}).append(
                    $('<div/>', {'class': 'card-content white-text'}).append(
                        $('<span/>', {'class': 'card-title cardTitle'}).text('$'+result.ListPrice)
                    )
                ).append(
                    $('<div/>', {'class': 'row'}).append(
                        $('<div/>',{'class': 'col s10 offset-s1'}).append(
                            $('<div/>',{'class':'card'}).append(
                                $('<div/>',{'class':'card-image waves-effect waves-block waves-light'}).append(
                                    $('<img>', {'class':'responsive-img activator'}).attr('src',imgurl).attr('alt','test pic')
                                )
                            ).append(
                                $('<div/>',{'class':'card-content'}).append(
                                    $('<span/>',{'class':'card-title activator grey-text text-darken-4'}).text('Housing Data').append(
                                        $('<i/>', {'class':'material-icons right'}).text('more_vert')
                                    )
                                ).append(
                                    $('<span/>',{'class':'card-title activator grey-text text-darken-4'}).text('Agent Data').append(
                                        $('<i/>', {'class':'material-icons right'}).text('more_vert')
                                    )
                                ).append(
                                    $('<span/>',{'class':'card-title activator grey-text text-darken-4'}).text('Lot Data').append(
                                        $('<i/>', {'class':'material-icons right'}).text('more_vert')
                                    )
                                ).append(
                                    $('<p/>').append(
                                        $('<a/>',{'href': '#'}).text('More information').append(
                                            $('<i/>', {'class':'small material-icons'}).text('note_add')
                                        )
                                    )
                                )
                            ).append(
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
                                ).append(
                                    $('<p/>',{'class':'postPoint'}).text('text for blades here')
                                )
                            )
                        )
                    )
                )
            )
        );
                                }//loop close
    };
    