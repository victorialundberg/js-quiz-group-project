"use strict";
const renderResults = function () {
    let resultHTML = `
    <div class="result-text-container">
        <div class="result-title-your-result">
            <h2 class="result-title">Results</h2>
            <p class="your-result">You got 4/10 correct answers</p>
        </div>

        <div class="answers-container">
            <h3 class="answers-title">Your answers</h3>

            <div class="answers-1to5">
                <p class="answer">1. <span>-</span></p>
                <p class="answer">2. <span>-</span></p>
                <p class="answer">3. <span>-</span></p>
                <p class="answer">4. <span>-</span></p>
                <p class="answer">5. <span>-</span></p>
            </div>

            <div class="answers-6to10">
                <p class="answer">6. <span>-</span></p>
                <p class="answer">7. <span>eflknsdlfkn</span></p>
                <p class="answer">8. <span>-</span></p>
                <p class="answer">9. <span>-</span></p>
                <p class="answer">10. <span>-</span></p>
            </div>
        </div>

        <input type="text" class="input-name" placeholder="Your name here">
        <a href="./highscorepage.html"><button class="next-button">Submit</button></a>
        
    </div>
  `;
    const resultsList = document.querySelector('.content-container');
    resultsList.innerHTML = resultHTML;
};
renderResults();
console.log();
