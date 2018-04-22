$(document).ready(function(){
    console.log("stockit.js installed.");
    $("#home").show();
    $("#search").hide();
    $("#stock").hide();
});

$("#homebtn").click(function(){
    // console.log("Transfering from home screen to login.");
    if($("#about").hasClass("toggle-down")){
        console.log("Moving home screen up");
        $("#about").animate({top: "-=900"}, 1000);
        $("#homebtn").html("<i class=\"material-icons\">file_download</i>");
        $("#about").addClass("toggle-up");
        $("#about").removeClass("toggle-down");
    }
    else if($("#about").hasClass("toggle-up")){
        console.log("Moving home screen down");
        $("#about").animate({top: "+=900"}, 1000);
        $("#homebtn").html("<i class=\"material-icons\">file_upload</i>");
        $("#about").addClass("toggle-down");
        $("#about").removeClass("toggle-up");
    }
    
})

// $("#homebtn").toggle(
//     function () { 
//         $("#home").animate({"top": "+50px",opacity: 1}, "slow"); 
//     },
//     function () { 
//         $("#home").animate({"top": "-30px",opacity: 0.25}, "slow"); 
//     }
// ); 
