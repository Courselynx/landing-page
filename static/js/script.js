
const box = document.querySelector(".box");
const dbs = document.querySelector(".dbs");
const photo = document.querySelector(".phoneputer");
const chat = document.querySelector(".chat-group");
const gif = document.querySelector(".gigf");
const profile = document.querySelector(".profile-pic");
const profileText = document.querySelector(".prof-text");


// Function to handle the animations
function handleAnimation(entries, observer) {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          // console.log(here);
          const target = entry.target;
          if (target.classList.contains('box')) {
            target.classList.add('animate__animated', 'animate__fadeInUp');

            const gcElements = target.querySelectorAll('.gc');
            gcElements.forEach((gc, index) => {
              setTimeout(() => {
                  gc.classList.add('animate__animated', 'animate__fadeInDown');
              }, index * 150); // 100ms delay between each .gc animation
          });

          } else if (target.classList.contains('dbs') || target.classList.contains('phoneputer')) {
              target.classList.add('animate__animated', 'animate__fadeInLeft');
          } else if (target.classList.contains('chat-group') || target.classList.contains('gigf')) {
              target.classList.add('animate__animated', 'animate__fadeInRight');
          } else if (target.classList.contains('profile-pic')) {
              target.classList.add('animate__animated', 'animate__fadeInLeft');
          } else if (target.classList.contains('prof-text')) {
              target.classList.add('animate__animated', 'animate__fadeInRight');
          }

          // Stop observing the current target
          observer.unobserve(target);
      }
  });
}

// Create a new Intersection Observer instance
const observer = new IntersectionObserver(handleAnimation, {
  root: null, // use the viewport
  rootMargin: '0px',
  threshold: 0.7 // trigger when at least 10% of the element is visible
});

// Start observing the elements
const elements = [box, dbs, photo, chat, gif, profile, profileText];
elements.forEach(el => observer.observe(el));


buttons = document.querySelectorAll(".to-bottom");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector('.email').scrollIntoView({ behavior: 'smooth' });
  });
});


document.getElementById('school-dropdown').addEventListener('change', function() {
  const otherSchoolInput = document.getElementById('other-school-input');
  if (this.value === 'other') {
      otherSchoolInput.style.display = 'block';
      otherSchoolInput.required = true;
  } else {
      otherSchoolInput.style.display = 'none';
      otherSchoolInput.required = false;
  }
});


setTimeout(function() {
  let flashes = document.querySelectorAll('.flashes li');
  const success = document.querySelector('.messages');
  for (let flash of flashes) {
      flash.style.opacity = 0;
      success.style.opacity = 0;
  }
}, 3000);
