const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const alphabetContainer = document.getElementById('alphabet');
    const inputBox = document.getElementById('input-box');
    const timerDisplay = document.getElementById('timer');
    const resultDisplay = document.getElementById('result');
    const resetBtn = document.getElementById('reset-btn');

    let currentIndex = 0;
    let startTime = null;
    let timerInterval = null;
    let finished = false;
    let bestTime = null;

    function renderAlphabet() {
      alphabetContainer.innerHTML = '';
      for (let i = 0; i < alphabet.length; i++) {
        const span = document.createElement('span');
        span.textContent = alphabet[i].toUpperCase();
        span.classList.add('letter');
        if (i === 0) span.classList.add('current');
        alphabetContainer.appendChild(span);
      }
    }

    function startTimer() {
      startTime = performance.now();
      timerInterval = setInterval(() => {
        const elapsed = (performance.now() - startTime) / 1000;
        timerDisplay.textContent = `Time: ${elapsed.toFixed(3)}s`;
      }, 50);
    }

    function stopTimer() {
      clearInterval(timerInterval);
    }

    function resetGame() {
      currentIndex = 0;
      finished = false;
      inputBox.value = '';
      resultDisplay.textContent = '';
      timerDisplay.textContent = 'Time: 0.000s';
      startTime = null;
      stopTimer();
      renderAlphabet();
      inputBox.classList.remove('wrong');
      inputBox.disabled = false;
      inputBox.placeholder = "Start typing...";
      inputBox.focus();
    }

    function markLetter(index, className) {
      const letters = alphabetContainer.querySelectorAll('.letter');
      if (index < letters.length) {
        letters[index].classList.remove('current', 'correct', 'incorrect');
        letters[index].classList.add(className);
      }
    }

    /*

    inputBox.addEventListener('input', (e) => {
      if (finished) return;

      const value = e.target.value.toLowerCase();
      const expected = alphabet[currentIndex];

      if (value === '') return;

      inputBox.placeholder = ''; // remove placeholder after first key
      inputBox.classList.remove('wrong');

      if (value === expected) {
        markLetter(currentIndex, 'correct');
        currentIndex++;

        if (currentIndex < alphabet.length) {
          alphabetContainer.children[currentIndex].classList.add('current');
        } else {
          stopTimer();
          finished = true;
          inputBox.disabled = true;
          const finalTime = (performance.now() - startTime) / 1000;
          resultDisplay.textContent = `✅ Done! Your time: ${finalTime.toFixed(3)}s`;
          if (!bestTime || finalTime < bestTime) {
            bestTime = finalTime;
            resultDisplay.textContent += ` (🔥 Best Time!)`;
          }
        }

        if (currentIndex === 1 && !startTime && value === 'a') {
          startTimer();
        }

        // Show letter briefly before clearing
        inputBox.value = value;
        setTimeout(() => {
          inputBox.value = '';
        }, 200);

      } else {
        // Wrong letter
        markLetter(currentIndex, 'incorrect');
        inputBox.classList.add('wrong');
        inputBox.value = value; // Keep showing typed wrong letter
      }
    });

    */
  inputBox.addEventListener('input', (e) => {
  if (finished) return;

  const value = e.target.value.toLowerCase();
  const expected = alphabet[currentIndex];

  if (!startTime && value.length === 1 && value[0] === 'a') {
    startTimer();
  }

  const currentChar = value.slice(-1); // get last typed character

  if (currentChar === expected) {
    markLetter(currentIndex, 'correct');
    currentIndex++;

    if (currentIndex < alphabet.length) {
      alphabetContainer.children[currentIndex].classList.add('current');
    } else {
      stopTimer();
      finished = true;
      inputBox.disabled = true;
      const finalTime = (performance.now() - startTime) / 1000;
      resultDisplay.textContent = `✅ Done! Your time: ${finalTime.toFixed(3)}s`;

      if (!bestTime || finalTime < bestTime) {
        bestTime = finalTime;
        resultDisplay.textContent += ` (🔥 Best Time!)`;
      }
    }

    inputBox.classList.remove('wrong');
  } else {
    inputBox.classList.add('wrong');
    markLetter(currentIndex, 'incorrect');
  }

  // Clear the box only after a correct letter
  if (!finished) {
    e.target.value = '';
  }
});

    resetBtn.addEventListener('click', resetGame);
    inputBox.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') resetGame();
    });

    renderAlphabet();
    inputBox.focus();