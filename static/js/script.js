const boxes = document.querySelectorAll(".box");

boxes.forEach((box) => {
  box.addEventListener("click", function () {
    this.classList.toggle("flipped");
  });
});

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

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
const box = document.querySelector(".box");
const logo = document.querySelector(".logo");
const btn = document.querySelectorAll(".btn");
const footer = document.querySelector("footer");
const social = document.querySelector(".footer-links a");

let sliderShown = false;

window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight / 2) {
    arrowElement.style.animation = "fadeOut 1s ease-in-out forwards";
    animateCSS(".text", "backInOut");
  }
  if (window.scrollY >= window.innerHeight && !sliderShown) {
    console.log("show slider");
    // Hide the text and show the first slide
    infoElement.style.mixBlendMode = "normal";
    animateCSS(".text", "backOutUp").then(() => {
      textElement.style.display = "none";
    });
    infoElement.style.color = "rgb(8, 8, 183)";
    infoElement.style.animation = "slideIn 1.0s ease-in-out forwards ";
    containerElement.style.background = "none";
    t1.style.animation = "fadeIn 0.5s ease-in-out forwards 0.5s";
    t2.style.animation = "fadeIn 1s ease-in-out forwards 0.7s";
    t3.style.animation = "fadeIn 1s ease-in-out forwards 0.9s";
    t4.style.animation = "fadeIn 1s ease-in-out forwards 1.1s";
    t5.style.animation = "fadeIn 1s ease-in-out forwards 1.3s";
    t6.style.animation = "fadeIn 1s ease-in-out forwards 1.5s";

    sliderShown = true;
  } else if (window.scrollY < window.innerHeight && sliderShown) {
    // Show the text and hide the slider
    console.log("show text");
    sliderShown = false;
  } else if (window.scrollY > window.innerHeight / 2 && !sliderShown) {
    // Show the text and hide the slider
    textElement.style.color = "rgb(8, 8, 183)";
  } else if (window.scrollY > window.innerHeight * 0.9) {
    logo.style.color = "rgb(8, 8, 183)";
    // footer.style.color = "rgb(8, 8, 183)";
    for (let i = 0; i < btn.length; i++) {
      btn[i].style.color = "rgb(8, 8, 183)";
      btn[i].style.borderColor = "rgb(8, 8, 183)";
    }
  } else if (window.scrollY < window.innerHeight * 0.1) {
    console.log("here mfer");
    footer.style.color = "rgb(8,8,183)";
    social.style.color = "rgb(8,8,183)";
  }
});

box.addEventListener("click", function () {
  console.log("clicked");
  t1.classList.add("animate__animated", "animate__");
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
  } else if (currentSlide == 0) {
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


document.querySelector('.email-btn').addEventListener('click', function() {
  const emailInput = document.getElementById('emailInput');
  const feedback = document.querySelector('.email-feedback');

  if (emailInput.value) {
      // Here you can send the email to your server or email list provider
      // For now, we'll just provide feedback to the user
      feedback.textContent = "Thanks for subscribing!";
      emailInput.value = ''; // Clear the input
  } else {
      feedback.textContent = "Please enter a valid email.";
  }
});
