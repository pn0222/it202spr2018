$(document).ready(function(){
    console.log("stockit.js installed.");
    $("#home").show();
    $("#search").hide();
    $("#stock").hide();
    // $("#login").hide();
    
    // $(window).resize(resizeHome);
    $("#signupbtn").hide();
    $("#login_field").hide();
    
    
    
    
});

var userDB= initDB();

$("#homebtn").click(function(){
    if ($(window).width() <= 600){	
        if($("#about").hasClass("toggle-down")){
            console.log("Moving home screen up");
            $("#about").animate({top: "-=60%"});
            $("#login").animate({top: "-=60%"});
            $("#homebtn").html("<i class=\"material-icons\">file_download</i>");
            $("#about").addClass("toggle-up");
            $("#about").removeClass("toggle-down");
            $("#login").show();
        }
        else if($("#about").hasClass("toggle-up")){
            console.log("Moving home screen down");
            $("#about").animate({top: "+=60%"});
            $("#login").animate({top: "+=60%"});
            $("#homebtn").html("<i class=\"material-icons\">file_upload</i>");
            $("#about").addClass("toggle-down");
            $("#about").removeClass("toggle-up");
        }
    }
    else{
        if($("#about").hasClass("toggle-down")){
            console.log("Moving home screen up");
            $("#about").animate({top: "-=75%"});
            $("#login").animate({top: "-=75%"});
            $("#homebtn").html("<i class=\"material-icons\">file_download</i>");
            $("#about").addClass("toggle-up");
            $("#about").removeClass("toggle-down");
            $("#login").show();
        }
        else if($("#about").hasClass("toggle-up")){
            console.log("Moving home screen down");
            $("#about").animate({top: "+=75%"});
            $("#login").animate({top: "+=75%"});
            $("#homebtn").html("<i class=\"material-icons\">file_upload</i>");
            $("#about").addClass("toggle-down");
            $("#about").removeClass("toggle-up");
        }
    }
})

$("#signup_field").click(function(){
    console.log("Sign up link pressed");
    $("#signupbtn").show();
    $("#loginbtn").hide();
    $("#signup_field").hide();
    $("#login_field").show();
})

$("#login_field").click(function(){
    console.log("Log in link pressed");
    $("#signupbtn").hide();
    $("#loginbtn").show();
    $("#signup_field").show();
    $("#login_field").hide();
    
})

$("#signupbtn").click(function(){
    console.log("Sign up new member");
})
$("#loginbtn").click(function(){
    console.log("Login in");
})

function initDB(){
    var userDB = new Dexie("UserDB");
    userDB.version(1).stores({
        Users: '++id, name, password'
    });
    return(userDB);
}


$("#signupbtn").click(function(){
    var user = $("#user_field").val();
    var password = $("#password_field").val();
    console.log(user);
    console.log(password);
    var pass = false;
    userDB.Users.where('name').equals(user).first(function(u){
        if(password.length < 8){
            
            $("#alert").css("color", "red")
            $("#alert").text("Password is too short. Please try again");
        }
        if(u){
            $("#alert").css("color", "red")
            $("#alert").text(u.name + " already exist. Please try again.")
            pass = true;
        }
    }).then(function(){
        if(!pass){
            console.log(user + " has been added successfully.")
            userDB.Users.add({
                name: user,
                password: password
            })
            $("#alert").css("color", "green")
            $("#alert").text("Account creation successfully.")
        }
        $("#home").hide();
        $("#search").show();
    })
    
    
    
    
    // db.Restaurants.where('cuisine').noneOf(['Thai']).each(function(restaurant) {
    //     $("#result").append('<li>Name: ' + restaurant.name + ", Cuisine: " + restaurant.cuisine + '</li>');
    // });
    
})



// function resizeHome(){
//     if ($(window).width() <= 600){	
//         if($("#about").hasClass("toggle-down")){
//             console.log("Resizing screen with home screen up");
//             $("#about").css({top: "=50%"});
//         }
//         else if($("#about").hasClass("toggle-up")){
//             console.log("Resizing screen with home screen down");
//             $("#about").css({bottom: "=10%"});
//         }
//     }
//     else{
//         if($("#about").hasClass("toggle-down")){
//             console.log("Resizing screen with home screen up");
//             $("#about").css({top: "=50%"});
//         }
//         else if($("#about").hasClass("toggle-up")){
//             console.log("Resizing screen with home screen down");
//             $("#about").css({top: "=125%"});
//         }
//     }
// }
