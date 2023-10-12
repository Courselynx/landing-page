// Get the .box element
const box = document.querySelector(".box");
const dbs = document.querySelector(".dbs");
const photo = document.querySelector(".phoneputer");
const chat = document.querySelector(".chat-group");
const gif = document.querySelector(".gigf");
const profile = document.querySelector(".profile");
const joinBox = document.querySelector(".join");

// Listen for the scroll event on the window
window.addEventListener("scroll", () => {
  console.log("y", window.scrollY);
  if (window.scrollY >= window.innerHeight / 1.6) {
    // Add the animate.css class to trigger the animation
    box.classList.add("animate__animated", "animate__fadeInUp");
  }
  if (window.scrollY >= window.innerHeight / 0.8) {
    console.log("made it");
    dbs.classList.add("animate__animated", "animate__fadeInLeft");
    photo.classList.add("animate__animated", "animate__fadeInRight");
  }
  if (window.scrollY >= window.innerHeight / 0.6) {
    chat.classList.add("animate__animated", "animate__fadeInLeft");
    gif.classList.add("animate__animated", "animate__fadeInRight");
  }
  if (window.scrollY >= window.innerHeight / 0.4) {
    profile.classList.add("animate__animated", "animate__fadeInUp");
  }
});

document.querySelector('.nav-sign').addEventListener('click', function() {
  document.querySelector('.email').scrollIntoView({ behavior: 'smooth' });
  console.log('clicked');
});

