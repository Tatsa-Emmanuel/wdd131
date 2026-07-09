// 1. Dynamic Footer Dates
const year = document.querySelector("#currentyear");
const today = new Date();
year.innerHTML = today.getFullYear();

const lastModified = document.querySelector("#lastModified");
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;

// 2. Hamburger Menu Toggle
const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#menu');

// Add a click event listener to the hamburger button
hambutton.addEventListener('click', () => {
    // Toggle the 'open' class on the navigation list
    mainnav.classList.toggle('open');
    // Toggle the 'open' class on the button itself (changes ☰ to ✖)
    hambutton.classList.toggle('open');
});