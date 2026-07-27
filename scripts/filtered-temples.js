// 1. Array of Temple Objects (Original + 3 New)
const temples = [
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
      templeName: "Manti Utah",
      location: "Manti, Utah, United States",
      dedicated: "1888, May, 21",
      area: 74792,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
      templeName: "Payson Utah",
      location: "Payson, Utah, United States",
      dedicated: "2015, June, 7",
      area: 96630,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
      templeName: "Yigo Guam",
      location: "Yigo, Guam",
      dedicated: "2020, May, 2",
      area: 6861,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
      templeName: "Washington D.C.",
      location: "Kensington, Maryland, United States",
      dedicated: "1974, November, 19",
      area: 156558,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
      templeName: "Lima Perú",
      location: "Lima, Perú",
      dedicated: "1986, January, 10",
      area: 9600,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
      templeName: "Mexico City Mexico",
      location: "Mexico City, Mexico",
      dedicated: "1983, December, 2",
      area: 116642,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // --- 3 Added Temples ---
    {
      templeName: "Salt Lake",
      location: "Salt Lake City, Utah",
      dedicated: "1893, April, 6",
      area: 382207,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
    },
    {
      templeName: "Rome Italy",
      location: "Rome, Italy",
      dedicated: "2019, March, 10",
      area: 40000,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/400x250/2-Rome-Temple-2190090.jpg"
    },
    {
      templeName: "Accra Ghana",
      location: "Accra, Ghana",
      dedicated: "2004, January, 11",
      area: 17500,
      imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/400x225/accra-ghana-temple-detail-249022-2400x1200.jpg"
    }
];

// 2. Select DOM Elements
const gallery = document.getElementById("temple-gallery");
const title = document.getElementById("gallery-title");

// 3. Function to build the HTML for the temple cards
function renderTemples(filteredTemples) {
    // Clear out existing cards before rendering new ones
    gallery.innerHTML = "";

    filteredTemples.forEach(temple => {
        // Create elements
        let card = document.createElement("div");
        card.className = "temple-card";

        card.innerHTML = `
            <h3>${temple.templeName}</h3>
            <p><span class="label">Location:</span> ${temple.location}</p>
            <p><span class="label">Dedicated:</span> ${temple.dedicated}</p>
            <p><span class="label">Size:</span> ${temple.area} sq ft</p>
            <!-- Native Lazy Loading added below -->
            <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy" width="400" height="250">
        `;
        
        // Append to the grid container
        gallery.appendChild(card);
    });
}

// 4. Initial Render (Show all temples on load)
renderTemples(temples);

// 5. Navigation Filter Event Listeners
document.getElementById("home").addEventListener("click", () => {
    title.textContent = "Home";
    renderTemples(temples);
});

document.getElementById("old").addEventListener("click", () => {
    title.textContent = "Old Temples";
    // Parse the year from the "YYYY, Month, DD" string
    renderTemples(temples.filter(temple => parseInt(temple.dedicated.split(",")[0]) < 1900));
});

document.getElementById("new").addEventListener("click", () => {
    title.textContent = "New Temples";
    renderTemples(temples.filter(temple => parseInt(temple.dedicated.split(",")[0]) > 2000));
});

document.getElementById("large").addEventListener("click", () => {
    title.textContent = "Large Temples";
    renderTemples(temples.filter(temple => temple.area > 90000));
});

document.getElementById("small").addEventListener("click", () => {
    title.textContent = "Small Temples";
    renderTemples(temples.filter(temple => temple.area < 10000));
});

// 6. Footer Dates
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;