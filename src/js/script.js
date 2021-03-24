import "../scss/styles.scss";


(function () {
    "use strict";

    const header = document.querySelector(".header");
    const main = document.querySelector(".main");

    //уменьшение высоты шапки
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("small");
        } else {
            header.classList.remove("small");
        }
    });
})();
