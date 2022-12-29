var header = document.body.querySelector("header");
var sections = document.body.querySelectorAll("section")
var headerButtons = document.body.querySelectorAll("nav button")
var lastSection = "none";
mainMenuSVG = [
    document.getElementById("svg1"),
    document.getElementById("svg2"),
    document.getElementById("svg3"),
    document.getElementById("svg4"),
    document.getElementById("svg5")
]

mainMenuSVG.forEach(element => {
    element.style.opacity = 0
});

document.body.querySelector("nav").style.opacity = 0

startEverything();

function startEverything(button) {
    console.log("lets go.")
    mainMenuSVG.forEach(element => {
        element.style.opacity = 1
    });

    var tl = anime.timeline({
        easing: "easeOutExpo",
        duration: 1000
    });

    tl.add({
        targets: button,
        left: "-10%",
        duration: 250
    })
    .add({
        targets: "#svg1",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1250,
        direction: 'alternate',
    })
    .add({
        targets: "#svg1",
        opacity: 0,
        duration: 250
    })
    .add({
        targets: "#svg2",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1250,
        direction: 'alternate',
    })
    .add({
        targets: "#svg2",
        opacity: 0,
        duration: 250
    })
    .add({
        targets: "#svg3",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1250,
        direction: 'alternate',
    })
    .add({
        targets: "#svg3",
        opacity: 0,
        duration: 250
    })
    .add({
        targets: "#svg4",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 2000,
        direction: 'alternate',
    })
    .add({
        targets: "#svg5",
        opacity: [0, 1],
        duration: 750
    })
    .add({
        targets: ".welcome-menu ul",
        opacity: 1
    })
    .add({
        targets: ".welcome-menu li",
        paddingTop: "0px"
    })
    .add({
        targets: ".navbar ul li",
        top: "-100px",
        delay: function(el, i, l) {
            return i * 100;
        }
    })

    anime({
        targets: "body",
        delay: 6750,
        backgroundColor: "rgb(52, 52, 52)",
        easing: 'easeInOutSine',
        duration: 750
    })
    anime({
        targets: "nav",
        delay: 6750,
        opacity: 1
    })
}

function crossSection(button) {
    headerButtons.forEach(el => {
        if(el == button) {
            el.classList.remove("lineThrough")
        } else {
            el.classList.add("lineThrough")
        }
    })
}

function getSection(item, button) {
    crossSection(button)
    if(lastSection != item) {
        if(!header.classList.contains("topWindow")) {
            //get header to top and bring from bottom a selected item
            header.classList.add("topWindow")
            anime({
                targets: item,
                top: "0%",
                easing: "easeOutQuad"
            })
            anime({
                targets: document.body.querySelector("main"),
                height: "80%",
                easing: "easeOutQuad"
            })
        } else {
            //header is on top already
            //make the visible section change brightness
            //bring up clicked section
            setZindex(item)
            item.classList.remove("lowerBrightness");
            lastSection.classList.add("lowerBrightness");
            anime({
                targets: item,
                delay: 500,
                easing: 'easeInOutSine',
                keyframes: [
                    {top: ["100%", "15%"], width: ["0%", "75%"], borderTopLeftRadius: "25px",
                    borderTopRightRadius: "25px", easing: "easeOutCubic"},
                    {top: 0, width: "100%", delay: 150, borderTopRightRadius: "0px",
                    borderTopLeftRadius: "0px", easing: "easeInQuint"},
                ]
            });
        }
        lastSection = item
    }
}

function setZindex(item) {
    //item clicked
    let temp = sections.length

    item.style.zIndex = temp--;
    lastSection.style.zIndex = temp--;
    sections.forEach(el => {
        if(el != item && el != lastSection) {
            el.style.zIndex = temp--;
        }
    })
}

function removeTopWindow() {
    document.body.querySelector("header").classList.remove("topWindow")
    sections.forEach(el => {
        el.classList.remove("lowerBrightness");
    })
    console.log("remove")
    anime({
        targets: sections,
        top: "100%",
        duration: 1000,
        easing: "easeOutQuad"
    })
    anime({
        targets: document.body.querySelector("main"),
        height: "0%",
        easing: "easeOutQuad"
    })
    lastSection = "none"
}