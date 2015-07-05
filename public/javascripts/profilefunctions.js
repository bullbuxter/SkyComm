function w3_open() {
    document.getElementById("main").style.marginLeft = "18%";
    document.getElementById("main2").style.marginLeft = "19%";
    document.getElementsByClassName("w3-sidenav")[0].style.width = "18%";
    document.getElementsByClassName("w3-sidenav")[0].style.display = "block";
    document.getElementsByClassName("w3-opennav")[0].style.display = 'none';
}
function w3_close() {
    document.getElementById("main").style.marginLeft = "0%";
    document.getElementById("main2").style.marginLeft = "10%";
    document.getElementsByClassName("w3-sidenav")[0].style.display = "none";
    document.getElementsByClassName("w3-opennav")[0].style.display = "inline-block";
}
$(function() {
    switch(window.location.href.substr(window.location.href.lastIndexOf("/"))) {
        case '/overview': $('.menu0').addClass('activate'); break;
        case '/services': $('.menu1').addClass('activate'); break;
        case '/products': $('.menu2').addClass('activate'); break;
        case '/data': $('.menu3').addClass('activate'); break;
        case '/history': $('.menu4').addClass('activate'); break;
        case '/settings': $('.menu5').addClass('activate'); break;
    }
});