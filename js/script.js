// script.js
window.addEventListener("scroll", function() {
    var navbar = document.getElementById("navbar");
    if (window.pageYOffset > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
