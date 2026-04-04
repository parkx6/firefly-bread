
class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    this.generatedNumbers = [];
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'lotto-generator');

    const title = document.createElement('h1');
    title.textContent = 'Lotto Number Generator';

    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('class', 'button-container');

    const generateButton = document.createElement('button');
    generateButton.textContent = 'Generate Numbers';

    const copyContainer = document.createElement('div');
    copyContainer.setAttribute('class', 'copy-container');

    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('class', 'copy-button');
    copyButton.style.display = 'none';

    const tooltip = document.createElement('span');
    tooltip.textContent = 'Copied!';
    tooltip.setAttribute('class', 'tooltip');

    const numbersDisplay = document.createElement('div');
    numbersDisplay.setAttribute('class', 'numbers-display');

    generateButton.addEventListener('click', () => {
      const numbers = this.generateLottoNumbers();
      this.generatedNumbers = numbers;
      this.displayNumbers(numbers, numbersDisplay);
      copyButton.style.display = 'inline-block';
    });

    copyButton.addEventListener('click', () => {
      if (this.generatedNumbers.length > 0) {
        navigator.clipboard.writeText(this.generatedNumbers.join(', ')).then(() => {
          tooltip.classList.add('visible');
          setTimeout(() => {
            tooltip.classList.remove('visible');
          }, 1500);
        });
      }
    });

    const style = document.createElement('style');
    style.textContent = `
      .lotto-generator {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 4px );
        -webkit-backdrop-filter: blur( 4px );
        border: 1px solid rgba( 255, 255, 255, 0.18 );
      }
      h1 {
          color: #fff;
          text-shadow: 0 0 10px rgba(255,255,255,0.8);
      }
      .button-container {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-top: 1rem;
      }
      button {
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
        color: #fff;
        background-color: #4CAF50;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 0 10px #4CAF50, 0 0 20px #4CAF50, 0 0 30px #4CAF50;
      }
      button:hover {
        background-color: #45a049;
        box-shadow: 0 0 15px #45a049, 0 0 25px #45a049, 0 0 35px #45a049;
      }
      .copy-container {
        position: relative;
        display: inline-block;
      }
      .copy-button {
        background-color: #007bff;
        box-shadow: 0 0 10px #007bff, 0 0 20px #007bff, 0 0 30px #007bff;
      }
      .copy-button:hover {
        background-color: #0056b3;
        box-shadow: 0 0 15px #0056b3, 0 0 25px #0056b3, 0 0 35px #0056b3;
      }
      .tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 5px;
        background-color: #333;
        color: #fff;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 14px;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
      }
      .tooltip.visible {
        opacity: 1;
        visibility: visible;
      }
      .numbers-display {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
      }
      .number-ball {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        color: #fff;
        font-size: 1.2rem;
        font-weight: bold;
        opacity: 0;
        transform: scale(0.5);
        animation: appear 0.5s forwards;
      }
      @keyframes appear {
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(title);
    wrapper.appendChild(buttonContainer);
    buttonContainer.appendChild(generateButton);
    buttonContainer.appendChild(copyContainer);
    copyContainer.appendChild(copyButton);
    copyContainer.appendChild(tooltip);
    wrapper.appendChild(numbersDisplay);
  }

  generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
  }

  displayNumbers(numbers, container) {
    container.innerHTML = '';
    numbers.forEach((number, index) => {
      const ball = document.createElement('div');
      ball.setAttribute('class', 'number-ball');
      ball.textContent = number;
      ball.style.backgroundColor = this.getBallColor(number);
      ball.style.animationDelay = `${index * 0.2}s`;
      container.appendChild(ball);
    });
  }

  getBallColor(number) {
    if (number <= 10) return '#fbc400';
    if (number <= 20) return '#69c8f2';
    if (number <= 30) return '#ff7272';
    if (number <= 40) return '#aaa';
    return '#b0d840';
  }
}

customElements.define('lotto-generator', LottoGenerator);
