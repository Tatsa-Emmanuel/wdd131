// LocalStorage Counter Logic
const reviewCountElement = document.getElementById("review-count");

// Get the current number of reviews from localStorage, or default to 0 if it doesn't exist
let numReviews = Number(window.localStorage.getItem("completed-reviews")) || 0;

// Increment the count since they just completed a review
numReviews++;

// Save the updated count back to localStorage
window.localStorage.setItem("completed-reviews", numReviews);

// Display the updated count on the page
reviewCountElement.textContent = numReviews;

// Dynamic Footer Dates
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;