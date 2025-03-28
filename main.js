document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audioPlayer"),
          loader = document.getElementById("preloader"),
          emptyArea = document.getElementById("emptyarea"),
          mobileToggleMenu = document.getElementById("mobiletogglemenu"),
          myButton = document.getElementById("backtotopbutton");

    // Toggle settings menu
    function settingToggle() {
        document.getElementById("setting-container").classList.toggle("settingactivate");
        document.getElementById("visualmodetogglebuttoncontainer").classList.toggle("visualmodeshow");
        document.getElementById("soundtogglebuttoncontainer").classList.toggle("soundmodeshow");
    }

    // Play/pause audio
    function playPause() {
        const soundSwitch = document.getElementById("switchforsound");
        soundSwitch.checked ? audio.play() : audio.pause();
    }

    // Toggle light/dark mode
    function visualMode() {
        document.body.classList.toggle("light-mode");

        document.querySelectorAll(".needtobeinvert").forEach(el => {
            el.classList.toggle("invertapplied");
        });

        // Save theme preference in local storage
        localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
    }

    // Load theme from local storage
    function loadTheme() {
        if (localStorage.getItem("theme") === "light") {
            document.body.classList.add("light-mode");
            document.getElementById("switchforvisualmode").checked = true;
        }
    }

    // Hide loader and show popup after load
    window.addEventListener("load", function () {
        loader.style.display = "none";
        document.querySelector(".hey").classList.add("popup");
    });

    // Hamburger menu toggle
    function hamburgerMenu() {
        document.body.classList.toggle("stopscrolling");
        mobileToggleMenu.classList.toggle("show-toggle-menu");
        
        ["burger-bar1", "burger-bar2", "burger-bar3"].forEach(id => {
            document.getElementById(id).classList.toggle(`hamburger-animation${id.slice(-1)}`);
        });
    }

    // Hide mobile menu when clicking a link
    function hideMenuByLi() {
        document.body.classList.remove("stopscrolling");
        mobileToggleMenu.classList.remove("show-toggle-menu");

        ["burger-bar1", "burger-bar2", "burger-bar3"].forEach(id => {
            document.getElementById(id).classList.remove(`hamburger-animation${id.slice(-1)}`);
        });
    }

    // Update active section tab on scroll
    const sections = document.querySelectorAll("section"),
          navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li"),
          mobileNavLi = document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            let sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        mobileNavLi.forEach(li => {
            li.classList.toggle("activeThismobiletab", li.classList.contains(current));
        });

        navLi.forEach(li => {
            li.classList.toggle("activeThistab", li.classList.contains(current));
        });

        // Show/hide back-to-top button
        myButton.style.display = document.documentElement.scrollTop > 400 ? "block" : "none";
    });

    // Scroll to top function
    function scrollToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    // Prevent image right-click
    document.addEventListener("contextmenu", function (e) {
        if (e.target.nodeName === "IMG") {
            e.preventDefault();
        }
    });

    // Pupil follow mouse effect
    const pupils = document.getElementsByClassName("footer-pupil"),
          pupilsArr = Array.from(pupils);
    
    let pupilStartPoint = -10,
        pupilRangeX = 20,
        pupilRangeY = 15,
        mouseXStartPoint = 0,
        mouseXEndPoint = window.innerWidth,
        currentXPosition = 0,
        fracXValue = 0,
        mouseYEndPoint = window.innerHeight,
        currentYPosition = 0,
        fracYValue = 0,
        mouseXRange = mouseXEndPoint - mouseXStartPoint;

    function mouseMove(e) {
        fracXValue = (e.clientX - mouseXStartPoint) / mouseXRange;
        fracYValue = e.clientY / mouseYEndPoint;

        let translateX = pupilStartPoint + fracXValue * pupilRangeX;
        let translateY = pupilStartPoint + fracYValue * pupilRangeY;

        pupilsArr.forEach(pupil => {
            pupil.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
    }

    function windowResize() {
        mouseXEndPoint = window.innerWidth;
        mouseYEndPoint = window.innerHeight;
        mouseXRange = mouseXEndPoint - mouseXStartPoint;
    }

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("resize", windowResize);

    // Apply stored theme preference
    loadTheme();

    console.log(
        "%c Designed and Developed by Prince Kumar ",
        "background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white; font-weight:900; font-size:1rem; padding:20px;"
    );
});
