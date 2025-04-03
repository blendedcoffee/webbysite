document.addEventListener("DOMContentLoaded", function () {
    const burger = document.getElementById("burger");
    const navLinks = document.getElementById("nav-links");

    burger.addEventListener("click", function () {
        this.classList.toggle("active");
        navLinks.classList.toggle("active");
    });
});
