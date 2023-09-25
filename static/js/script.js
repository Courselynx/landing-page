// typing effect

const words = ['study', 'collaborate', 'succeed', 'make ted money'];
let wordIndex = 0;
let letterIndex = 0;
let currentWord = '';
let isDeleting = false;

function typeEffect() {
    const typingElement = document.querySelector('.typing');
    if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, letterIndex);
        letterIndex--;
    } else {
        typingElement.textContent = currentWord.substring(0, letterIndex);
        letterIndex++;
    }

    if (!isDeleting && letterIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, 1000); // Wait for 1 second before starting to delete
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length; // Move to the next word
        currentWord = words[wordIndex];
    }

    setTimeout(typeEffect, isDeleting ? 30 : 30); // Speed of typing and deleting
}

document.addEventListener('DOMContentLoaded', function() {
    currentWord = words[wordIndex];
    typeEffect();
});


// const header = document.querySelector("header")

// document.addEventListener('scroll', () => {
//     if (window.scrollY > window.innerHeight * 0.9) {
//         header.style.backgroundColor = "rgb(240,240,240)"
//     }
//     else {
//         header.style.backgroundColor = "transparent"
//     }
// }); 
