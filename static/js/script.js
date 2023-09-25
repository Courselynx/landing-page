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

document.querySelector('.email-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  let email = document.querySelector('.email-input').value;

  fetch('/save-email', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
  })
  .then(response => response.json())
  .then(data => {
      if(data.success) {
          alert('Email saved successfully!');
      } else {
          alert('There was an error saving the email.');
      }
  });
});
