$(document).ready(function(){
    console.log("stockit.js installed.");
    $("#home").show();
    $("#search").hide();
    $("#stock").hide();
    // $("#login").hide();
    
    // $(window).resize(resizeHome);
    $("#signupbtn").hide();
    $("#login_field").hide();
    
    
    $.ajax({
        url: './data/ticker.csv',
        dataType: 'text',
    }).done(parseTickers);
    
    $("#searchbtn").click(function(){
        console.log("Searching...");
        var stock = $("#search_field").val();
        var url = 'https://www.quandl.com/api/v3/datasets/WIKI/' + stock + '/data.json'
        var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+ stock + '&interval=1min&apikey=UPX2UX9065UFLUP0'
        console.log(url);
        $.ajax({
            url: url,
            dataType: 'json',
        }).done(function(resp){
            console.log(resp);
            var length = 0;
            for(var x in resp){
                console.log(x);
                length++;
            }
            
            
            var data = new google.visualization.DataTable();
            // for(var x in resp["Time Series (1min)"]){
            //     for(var y in x)
            //         console.log(y);
            // }
            // console.log(resp["Time Series (1min)"])
            
            var priceData = []
            
            if(length > 1){
                data.addColumn('number', 'price');
                data.addColumn('number', stock.toUpperCase());
                var stockInfo = resp["Time Series (1min)"];
                var count = 0;
                for (var x in stockInfo){
                    // console.log(x);
                    // console.log(stockInfo[x])
                    for(var y in stockInfo[x]){
                        // console.log(y);
                        // console.log(stockInfo[x][y]);
                        count++;
                        console.log(stockInfo[x]["2. high"])
                        var price = stockInfo[x]["2. high"].parseFloat;
                        
                        data.addRow([count, price])
                        priceData.push([count, price]);
                        
                    }
                }
            
                $("#search").hide();
                $("#stock").show();
                var options = {
                    chart: {
                        title: stock.toUpperCase(),
                    },
                    width: 2000,
                    height: 2000,
                    axes: {
                        x: {
                            0: {side: 'top'}
                        },
                        y: {
                            0: {side: 'left'}
                        }
                    }
                };
                console.log(priceData);
                data.addRows(priceData);
                var chart = new google.charts.Line(document.getElementById('chart'));
                
                chart.draw(data, google.charts.Line.convertOptions(options));
                //Show data on the current stock.
                
                
            }
            
        });
    });

    
});

window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
var IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;

var userDB= initDB();
var stockDB = initStockDB();

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
function initStockDB(){
    var db = new Dexie("TickerDB");
    db.version(1).stores({
        Stock: '++id, name, tag'
    });
    return(db);
}


$("#signupbtn").click(function(){
    var user = $("#user_field").val();
    var password = $("#password_field").val();
    console.log(user);
    console.log(password);
    var pass = true;
    userDB.Users.where('name').equals(user).first(function(u){
        if(password.length < 8){
            
            $("#alert").css("color", "red")
            $("#alert").text("Password is too short. Please try again");
            pass = false;
        }
        if(u){
            $("#alert").css("color", "red")
            $("#alert").text(u.name + " already exist. Please try again.")
            pass = false;
        }
    }).then(function(){
        if(pass){
            console.log(user + " has been added successfully.")
            userDB.Users.add({
                name: user,
                password: password
            })
            $("#alert").css("color", "green")
            $("#alert").text("Account creation successfully.")
            
            $("#home").hide();
            $("#search").show();
        }
    })
})


$("#loginbtn").click(function(){
    var user = $("#user_field").val();
    var password = $("#password_field").val();
    console.log(user);
    console.log(password);
    var pass = true;
    userDB.Users.where('name').equals(user).first(function(u){
        if(u){
            console.log("password = " + u.password + " name = " + u.name);
            if(u.password !== password){
                $("#alert").css("color", "red")
                $("#alert").text("Invalid password. Please try again.")
                pass = false;
            }
        }
        else{
            $("#alert").css("color", "red")
            $("#alert").text("Invalid username. Please try again.")
            pass = false;
        }
    }).then(function(){
        if(pass){
            // console.log(user + " has been added successfully.")
            // userDB.Users.add({
            //     name: user,
            //     password: password
            // })
            $("#alert").css("color", "green")
            $("#alert").text("Account creation successfully.")
            
            $("#home").hide();
            $("#search").show();
        }
    })
})


function parseTickers(data) {
    var allRows = data.split(/\r?\n|\r/);
    var table = '<table>';
    for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
        var rowCells = allRows[singleRow].split(',');
            console.log(rowCells[0] + " " + rowCells[1])
            stockDB.Stock.add({
                name: rowCells[1],
                tag: rowCells[0]
            })
    }
}

function queryStock(){
    var stock = $("#search_field").val();
    var url = 'https://www.quandl.com/api/v3/datasets/WIKI/' + stock + '/data.json'
    console.log(url);
    $.ajax({
        url: url,
        dataType: 'json',
    }).done(function(resp){
        console.log(resp);
    });
    
}



google.charts.load('current', {'packages':['line']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'time');
    data.addColumn('number', 'Guardians of the Galaxy');
    
    data.addRows([
    [1,  37.8],
    [2,  30.9],
    [3,  25.4],
    [4,  11.7],
    [5,  11.9],
    [6,   8.8],
    [7,   7.6],
    [8,  12.3],
    [9,  16.9],
    [10, 12.8],
    [11,  5.3],
    [12,  6.6],
    [13,  4.8],
    [14,  4.2]
    ]);
    
    var options = {
        chart: {
            title: 'Box Office Earnings in First Two Weeks of Opening',
            subtitle: 'in millions of dollars (USD)'
        },
        width: 2000,
        height: 2000,
        axes: {
            x: {
                0: {side: 'center'}
            },
            y: {
                0: {side: 'center'}
            }
        }
    };
    
    var chart = new google.charts.Line(document.getElementById('chart'));
    
    chart.draw(data, google.charts.Line.convertOptions(options));
}


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
