//SCROLL COLOR NAVBAR
$(window).scroll(function () {
    if ($("#menu").offset().top > 56) {
        $("#menu").addClass("color-scroll");
    } else {
        $("#menu").removeClass("color-scroll");
    }
});
//SMOOTH SCROLLING
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//SCROLL REVEAL//
window.sr = ScrollReveal({ reset: false });

sr.reveal('.navbar', {
    origin: 'bottom',
    duration: 1200
});
sr.reveal('.carousel-title', {
    origin: 'left',
    duration: 800
});

sr.reveal('.about-container, .teachers-container, .contact-container, .sponsor-container, .container-footer-all', {
    origin: 'right',
    duration: 1000
});

sr.reveal('.about-card, .slider', {
    origin: 'bottom',
    duration: 2000
});

//CAROUSEL IMG//
let slideIndex = 1;
showSlides(slideIndex)

function plusSlides(n) {
    showSlides(slideIndex += n)
}
function currentSlide(n) {
    showSlides(slideIndex = n)
}
function showSlides(n) {
    let i;
    let slides = document.querySelectorAll(".mySlides");
    let quadrates = document.querySelectorAll(".quadrate");
    if (n > slides.length) slideIndex = 1
    if (n < 1) slideIndex = slides.length
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"
    }
    for (i = 0; i < quadrates.length; i++) {
        quadrates[i].className = quadrates[i].className.replace("active", "")
    }
    slides[slideIndex - 1].style.display = "block";
    quadrates[slideIndex - 1].className += " active";
}

//TEACHERS SLIDER//
(function () {
    const sliders = [...document.querySelectorAll('.slider-body')];
    const arrowNext = document.querySelector('#after');
    const arrowBefore = document.querySelector('#before');
    let value;

    arrowNext.addEventListener('click', () => changePosition(1));
    arrowBefore.addEventListener('click', () => changePosition(-1));

    function changePosition(change) {
        const currentElement = Number(document.querySelector('.slider-body--show').
            dataset.id);
        value = currentElement;
        value += change;

        console.log(sliders.length)
        if (value === 0 || value == sliders.length + 1) {
            value = value === 0 ? sliders.length : 1;
        }

        sliders[currentElement - 1].classList.toggle('slider-body--show');
        sliders[value - 1].classList.toggle('slider-body--show');
    }
})()