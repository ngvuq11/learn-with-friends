const closeMenu = document.querySelector(".close-menu");
const menu = document.querySelector(".header-menu");
const openMenu = document.querySelector(".open-menu");
closeMenu.addEventListener("click", function () {
    menu.style.right = "-100%";
});
openMenu.addEventListener("click", function () {
    menu.style.right = "0";
});
