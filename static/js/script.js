// Get the .box element
const box = document.querySelector('.box');

// Listen for the scroll event on the window
window.addEventListener('scroll', () => {
    console.log("window", window.innerHeight/2)
    console.log("y", window.scrollY)
    if (window.scrollY >= window.innerHeight/2) {
        console.log("made it")
        // Add the animate.css class to trigger the animation
        box.classList.add('animate__animated', 'animate__fadeInUp');
    }
});
