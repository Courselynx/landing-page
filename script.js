const textElement = document.querySelector(".text");
const arrowElement = document.querySelector(".arrow");
const infoElement = document.querySelector(".info");
const containerElement = document.querySelector(".container");
const logoElement = document.querySelector(".logo");
const bodyElement = document.querySelector("body");
const t1 = document.querySelector(".box.t1");
const t2 = document.querySelector(".box.t2");
const t3 = document.querySelector(".box.t3");
const t4 = document.querySelector(".box.t4");
const t5 = document.querySelector(".box.t5");
const t6 = document.querySelector(".t6");

let sliderShown = false;

window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight / 2) {
    arrowElement.style.animation = "fadeOut 1s ease-in-out forwards";
    textElement.style.animation = "fadeOut 1s ease-in-out forwards";
  }
  if (window.scrollY >= window.innerHeight && !sliderShown) {
    console.log("show slider");
    // Hide the text and show the first slide
    infoElement.style.mixBlendMode = "normal";
    textElement.style.animation = "fadeOut 1.5s ease-in-out forwards";
    infoElement.style.animation = "slideIn 1.0s ease-in-out forwards 1.5s";
    containerElement.style.background = "none";
    t1.style.animation = "fadeIn 0.5s ease-in-out forwards 1s";
    t2.style.animation = "fadeIn 1s ease-in-out forwards 2s";
    t3.style.animation = "fadeIn 1s ease-in-out forwards 3s";
    t4.style.animation = "fadeIn 1s ease-in-out forwards 4s";
    t5.style.animation = "fadeIn 1s ease-in-out forwards 5s";
    t6.style.animation = "fadeIn 1s ease-in-out forwards 6s";


    sliderShown = true;
  } else if (window.scrollY < window.innerHeight && sliderShown) {
    // Show the text and hide the slider
    console.log("show text");
    sliderShown = false;
  }
});

const slidesContainer = document.querySelector(".slides");
const slides = document.querySelectorAll(".slide");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");
const m1 = document.querySelector(".m1");
const m2 = document.querySelector(".m2");
const m3 = document.querySelector(".m3");
const m4 = document.querySelector(".m4");
let currentSlide = 0;

function updateSlides() {
  const offset = -currentSlide * 100; // 100vw per slide
  slidesContainer.style.transform = `translateX(${offset}vw)`;
  console.log(currentSlide);
  if (currentSlide == 1) {
    m1.style.animation = "fadeIn 0.5s ease-in-out forwards 1s";
    m2.style.animation = "fadeInDown 1s ease-in-out forwards 1s";
    m3.style.animation = "fadeInDown 1s ease-in-out forwards 2s";
    m4.style.animation = "fadeInDown 1s ease-in-out forwards 3s";
  }
  else if (currentSlide == 0) {
    console.log("slide 0");

  }
}

leftArrow.addEventListener("click", () => {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  updateSlides();
});

rightArrow.addEventListener("click", () => {
  currentSlide++;
  if (currentSlide > slides.length - 1) {
    currentSlide = 0;
  }
  updateSlides();
});
