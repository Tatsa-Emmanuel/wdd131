// Get the current year dynamically for the copyright span
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Get the date the document was last modified
const lastModifiedDate = document.lastModified;
document.getElementById("lastModified").textContent = `Last Modification: ${lastModifiedDate}`;