// ==========================================
// 1. GLOBAL UI (Menu & Footer)
// ==========================================
const menuBtn = document.getElementById("menu-btn");
const mainNav = document.getElementById("main-nav");

if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", () => {
        mainNav.classList.toggle("open");
        menuBtn.textContent = mainNav.classList.contains("open") ? "✖" : "☰";
    });
}

const currentYearElement = document.getElementById("currentyear");
const lastModifiedElement = document.getElementById("lastModified");
if (currentYearElement) currentYearElement.textContent = new Date().getFullYear();
if (lastModifiedElement) lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;

// ==========================================
// 2. THE MASTER VOCABULARY ARRAY
// ==========================================
const masterVocab = [
    { word: "Commute", type: "verb", definition: "To travel regularly between work and home." },
    { word: "Colleague", type: "noun", definition: "A person you work with." },
    { word: "Accomplish", type: "verb", definition: "To succeed in doing something." },
    { word: "Frequent", type: "adjective", definition: "Happening often." },
    { word: "Expand", type: "verb", definition: "To become larger in size or amount." },
    { word: "Hesitate", type: "verb", definition: "To pause before saying or doing something." },
    { word: "Crucial", type: "adjective", definition: "Extremely important or necessary." },
    { word: "Determine", type: "verb", definition: "To discover the facts or truth about something." },
    { word: "Evident", type: "adjective", definition: "Easily seen or understood; obvious." },
    { word: "Maintain", type: "verb", definition: "To keep something in good condition." },
    { word: "Persuade", type: "verb", definition: "To convince someone to do or believe something." },
    { word: "Reliable", type: "adjective", definition: "Able to be trusted or believed." },
    { word: "Significant", type: "adjective", definition: "Important or noticeable." },
    { word: "Analyze", type: "verb", definition: "To examine the details of something carefully." },
    { word: "Clarify", type: "verb", definition: "To make something easier to understand." },
    { word: "Demonstrate", type: "verb", definition: "To show or prove something clearly." },
    { word: "Emphasize", type: "verb", definition: "To show that something is very important." },
    { word: "Interpret", type: "verb", definition: "To explain the meaning of something." },
    { word: "Objective", type: "noun", definition: "Something that you plan to do or achieve." },
    { word: "Relevant", type: "adjective", definition: "Connected with what is happening or being discussed." },
    { word: "Sufficient", type: "adjective", definition: "Enough for a particular purpose." },
    { word: "Valid", type: "adjective", definition: "Based on truth or reason; able to be accepted." },
    { word: "Approach", type: "noun", definition: "A way of considering or doing something." },
    { word: "Concept", type: "noun", definition: "A principle or idea." },
    { word: "Context", type: "noun", definition: "The situation within which something exists or happens." }
];

// Helper Function: Get random items from an array
function getRandomItems(arr, count) {
    let shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// ==========================================
// 3. DATABASE (LocalStorage Initialization)
// ==========================================
let studiedWords = JSON.parse(window.localStorage.getItem("lexi-studied")) || [];
let recentQuizzes = JSON.parse(window.localStorage.getItem("lexi-quizzes")) || [];

// NEW LOGIC: Create a pool of unseen words. If it doesn't exist, populate it with all master words.
let unseenWords = JSON.parse(window.localStorage.getItem("lexi-unseen"));
if (!unseenWords) {
    unseenWords = [...masterVocab];
    window.localStorage.setItem("lexi-unseen", JSON.stringify(unseenWords));
}

// ==========================================
// 4. HOME PAGE DASHBOARD
// ==========================================
const wordCountElement = document.getElementById("today-word-count");
const progressFill = document.getElementById("daily-progress");
const sessionContainer = document.getElementById("session-container");

if (wordCountElement && progressFill && sessionContainer) {
    wordCountElement.textContent = `Mastered: ${studiedWords.length} words`;
    let progressPercentage = Math.min((studiedWords.length / masterVocab.length) * 100, 100);
    progressFill.style.width = `${progressPercentage}%`;

    if (recentQuizzes.length === 0) {
        document.getElementById("see-all-btn").style.display = "none";
        sessionContainer.innerHTML = `<p class="empty-state">No quiz data yet. Study some flashcards and take a quiz!</p>`;
    } else {
        document.getElementById("see-all-btn").style.display = "block";
        sessionContainer.innerHTML = "";
        recentQuizzes.forEach(quiz => {
            let card = document.createElement("div");
            card.className = "session-card";
            card.innerHTML = `
                <div class="play-btn check-icon">✔</div>
                <div class="session-info">
                    <h4>Quiz Session</h4>
                    <p>Score: ${quiz.score}% • ${quiz.date}</p>
                </div>
            `;
            sessionContainer.appendChild(card);
        });
    }
}

// ==========================================
// 5. FLASHCARD (STUDY) LOGIC
// ==========================================
const flashcardContainer = document.getElementById("flashcard-container");
const studyControls = document.getElementById("study-controls");
const studyCompletion = document.getElementById("completion-screen");

if (flashcardContainer && document.getElementById("btn-next-word")) {
    
    // NEW LOGIC: Check if unseen pool is empty. If it is, start the cycle over!
    if (unseenWords.length === 0) {
        unseenWords = [...masterVocab];
    }

    // Shuffle the unseen pool and pull out up to 5 words
    unseenWords.sort(() => 0.5 - Math.random());
    // .splice removes the words from the unseen pool so they don't repeat
    let currentStudySession = unseenWords.splice(0, Math.min(5, unseenWords.length)); 
    let studyIndex = 0;

    function renderStudyCard() {
        if (studyIndex >= currentStudySession.length) {
            flashcardContainer.classList.add("hidden");
            studyControls.classList.add("hidden");
            studyCompletion.classList.remove("hidden");
            document.getElementById("card-counter").textContent = "Done!";
            
            // Save the reduced unseen pool back to local storage
            window.localStorage.setItem("lexi-unseen", JSON.stringify(unseenWords));

            // Add the viewed words to the studied pool for quizzing
            currentStudySession.forEach(wordObj => {
                if (!studiedWords.some(w => w.word === wordObj.word)) {
                    studiedWords.push(wordObj);
                }
            });
            window.localStorage.setItem("lexi-studied", JSON.stringify(studiedWords));
            return;
        }

        let word = currentStudySession[studyIndex];
        document.getElementById("card-counter").textContent = `Word ${studyIndex + 1} of ${currentStudySession.length}`;
        flashcardContainer.innerHTML = `
            <div class="card-front">
                <h2>${word.word}</h2>
                <p class="word-type">${word.type}</p>
            </div>
            <div class="card-back" style="border-top: none; padding-top: 0;">
                <p class="definition"><strong>Definition:</strong><br> ${word.definition}</p>
            </div>
        `;
    }

    document.getElementById("btn-next-word").addEventListener("click", () => {
        studyIndex++;
        renderStudyCard();
    });

    renderStudyCard();
}

// ==========================================
// 6. QUIZ LOGIC
// ==========================================
const quizContainer = document.getElementById("quiz-container");
const quizCompletion = document.getElementById("quiz-completion");

if (quizContainer) {
    if (studiedWords.length < 3) {
        quizContainer.classList.add("hidden");
        document.getElementById("quiz-warning").classList.remove("hidden");
    } else {
        let quizSession = getRandomItems(studiedWords, Math.min(5, studiedWords.length));
        let quizIndex = 0;
        let quizScore = 0;
        let missedWords = []; 

        function renderQuizCard() {
            if (quizIndex >= quizSession.length) {
                quizContainer.classList.add("hidden");
                quizCompletion.classList.remove("hidden");
                document.getElementById("quiz-counter").textContent = "Done!";
                
                let accuracy = Math.round((quizScore / quizSession.length) * 100);
                document.getElementById("final-score-text").textContent = `You got ${quizScore} out of ${quizSession.length} correct (${accuracy}%).`;
                
                recentQuizzes.unshift({ score: accuracy, date: new Date().toLocaleDateString() });
                if (recentQuizzes.length > 3) recentQuizzes = recentQuizzes.slice(0, 3);
                window.localStorage.setItem("lexi-quizzes", JSON.stringify(recentQuizzes));

                if (missedWords.length > 0) {
                    missedWords.forEach(missed => {
                        if (!unseenWords.some(w => w.word === missed.word)) {
                            unseenWords.push(missed);
                        }
                    });
                    window.localStorage.setItem("lexi-unseen", JSON.stringify(unseenWords));
                }
                return;
            }

            let correctWord = quizSession[quizIndex];
            document.getElementById("quiz-counter").textContent = `Question ${quizIndex + 1} of ${quizSession.length}`;
            
            let options = [correctWord];
            let distractors = masterVocab.filter(w => w.word !== correctWord.word);
            options.push(...getRandomItems(distractors, 2));
            options = options.sort(() => 0.5 - Math.random());

            let optionsHTML = options.map(opt => 
                `<button class="btn secondary-btn quiz-option" data-correct="${opt.word === correctWord.word}">
                    <span class="status-icon"></span> ${opt.definition}
                </button>`
            ).join("");

            quizContainer.innerHTML = `
                <div class="card-front" style="margin-bottom: 2rem;">
                    <h2>What is the definition of:</h2> 
                    <h3 style="color: var(--accent-blue); font-size: 2.5rem;">${correctWord.word}</h3> 
                </div>
                <div class="quiz-options-container" style="display: flex; flex-direction: column; gap: 1rem;">
                    ${optionsHTML}
                </div>
                <button id="btn-next-question" class="btn primary-btn hidden" style="width: 100%; margin-top: 1.5rem;">Next Question ➔</button>
            `;

            const optionButtons = document.querySelectorAll(".quiz-option");
            const nextBtn = document.getElementById("btn-next-question");

            optionButtons.forEach(btn => {
                btn.addEventListener("click", function() {
                    // Disable all buttons to prevent changing answers
                    optionButtons.forEach(b => b.disabled = true);

                    // Check if the clicked button is correct
                    if (this.dataset.correct === "true") {
                        quizScore++;
                    } else {
                        missedWords.push(correctWord);
                    }

                    // Provide immediate visual feedback for all options
                    optionButtons.forEach(b => {
                        if (b.dataset.correct === "true") {
                            b.classList.add("correct-answer");
                            b.querySelector(".status-icon").textContent = "✔";
                        } else {
                            b.classList.add("wrong-answer");
                            b.querySelector(".status-icon").textContent = "✖";
                        }
                    });

                    // Reveal the 'Next Question' button
                    nextBtn.classList.remove("hidden");
                });
            });

            // Move to the next question when the 'Next' button is clicked
            nextBtn.addEventListener("click", () => {
                quizIndex++;
                renderQuizCard();
            });
        }

        renderQuizCard();

        document.getElementById("btn-restart-quiz").addEventListener("click", () => {
            location.reload(); 
        });
    }
}

// ==========================================
// 7. RESET PROGRESS LOGIC
// ==========================================
const resetBtn = document.getElementById("reset-btn");

if (resetBtn) {
    resetBtn.addEventListener("click", () => {
        // Confirm with the user before deleting data
        const userConfirmed = window.confirm("Are you sure you want to reset all your progress? This cannot be undone.");
        
        if (userConfirmed) {
            // Remove all LexiLearn data from LocalStorage
            window.localStorage.removeItem("lexi-studied");
            window.localStorage.removeItem("lexi-quizzes");
            window.localStorage.removeItem("lexi-unseen");
            
            // Redirect back to the home page to see the fresh slate
            window.location.href = "index.html";
        }
    });
}

// ==========================================
// 8. CONTACT FORM SUBMISSION LOGIC
// ==========================================
const contactForm = document.getElementById("contact-form");
const successMsg = document.getElementById("form-success-msg");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        // Prevent the page from immediately reloading
        e.preventDefault();
        
        // Hide the form and display the success message
        contactForm.style.display = "none";
        successMsg.classList.remove("hidden");
        
        // Wait 3 seconds, then refresh the page to a clean state
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    });
}