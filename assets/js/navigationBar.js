document.addEventListener("DOMContentLoaded", function() {
    const heroContainer = document.getElementById("hero-container");
    const navbar = document.querySelector(".navbar");
    const navbarHeight = navbar.offsetHeight;
    const heroContainerBottom = heroContainer.offsetTop + heroContainer.offsetHeight;
    const navbarPlaceholder = document.createElement("div");
    navbarPlaceholder.classList.add("navbar-placeholder");
    navbar.parentNode.insertBefore(navbarPlaceholder, navbar.nextSibling);

    function updateNavbarPosition() {
        if (window.scrollY >= heroContainerBottom) {
            navbar.classList.add("sticky");
            navbarPlaceholder.style.display = "block";
            document.body.style.paddingTop = `${navbarHeight}px`;
        } else {
            navbar.classList.remove("sticky");
            navbarPlaceholder.style.display = "none";
            document.body.style.paddingTop = "0";
        }
    }

    window.addEventListener("scroll", updateNavbarPosition);
    updateNavbarPosition(); // Initial check in case the user loads the page at a scrolled position
});
