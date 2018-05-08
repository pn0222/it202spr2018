$( document ).ready(function() {
    onLoad();
    $("#searchBtn").click(requestData);
});

function requestData(){
    var selectedType = $("input[name=clinic_type]:checked").val();
    console.log("Selected type to search for is: "+ selectedType);
    var url = "https://data.cityofchicago.org/resource/t57k-za2y.json?clinic_type="
    $.ajax({
        url: url+selectedType,
        dataType: 'json',
    }).done(function(resp){
        // console.log(resp);
        var n = resp.length;
        
        $("#clinic_data").empty();
        for (var i = 0; i < n; i++){
            // console.log(resp[i].site_name);
            // console.log(resp[i].street_address);
            // console.log(resp[i].city);
            // console.log(resp[i].state);
            // console.log(resp[i].zip);
            // console.log(resp[i].phone_1);
            // console.log(resp[i].hours_of_operation);
            $("#clinic_data").append("<a href=\"#\" class=\"list-group-item list-group-item-action flex-column align-items-start\"><div class=\"d-flex w-100 justify-content-between\"><h5 class=\"mb-1\">"+
            resp[i].site_name
            +"</h5><small>"+ resp[i].clinic_type + "</small></div><p class=\"mb-1\">"+ 
            resp[i].street_address +"<br>"+
            resp[i].city +", " + resp[i].state + " " + resp[i].zip + "<br>" + 
            resp[i].phone_1 +
            "</p><small>" +resp[i].hours_of_operation+ "</small></a>");
            
        }
    });
    
}

function onLoad(){
    var url = "https://data.cityofchicago.org/resource/t57k-za2y.json?$SELECT=distinct%20clinic_type"
    $.ajax({
        url: url,
        dataType: 'json',
    }).done(function(resp){
        // console.log(resp);
        var n = resp.length;
        $("#clinic_type").empty();
        for(var i = 0; i < n; i++){
            console.log(resp[i].clinic_type);
            $("#clinic_type").append("<input type=\"radio\" name=\"clinic_type\" value=\""+resp[i].clinic_type+"\">" + resp[i].clinic_type + "<br>");
        }
    });
}

function initMap() {
        var chicago = {lat: 41.8781, lng: -87.6298};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: chicago
        });

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var marker = new google.maps.Marker({
          position: chicago,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
        
        
        $.ajax({
            url: "https://data.cityofchicago.org/api/views/xpdx-8ivx/rows.json",
            success:function(result){
                console.log(result);
                console.log("length = " + result.data.length)
                
                var data = result.data;
                var n = data.length;
                
                for(var i = 0; i < n; i++){
                    
                    
                    var position = {lat: parseFloat(data[i][23]), lng: parseFloat(data[i][24])};
                    console.log(position);
                    
                    var marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: data[i][12]
                    });
                    var text = data[i][16];
                    var infowindow = new google.maps.InfoWindow({
                      content: text
                    });
                    
                    marker.addListener('click', function() {
                        infowindow.open(map, marker);
                    });
                    
                }
            }
        })
      }