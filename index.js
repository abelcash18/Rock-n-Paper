    const choices = ['rock', 'paper', 'scissors'];
    const icons = {
      rock: '\u270A',
      paper: '\u270B',
      scissors: '\u270C\uFE0F'
    };

    let playerScore = 0;
    let computerScore = 0;
    let rounds = 0;

    const playerScoreEl = document.getElementById('playerScore');
    const computerScoreEl = document.getElementById('computerScore');
    const roundsEl = document.getElementById('rounds');
    const playerPickEl = document.getElementById('playerPick');
    const computerPickEl = document.getElementById('computerPick');
    const resultEl = document.getElementById('result');
    const resetBtn = document.getElementById('reset');

    document.querySelectorAll('.choice').forEach((button) => {
      button.addEventListener('click', () => playRound(button.dataset.choice));
    });

    resetBtn.addEventListener('click', resetGame);

    function playRound(playerChoice) {
      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      const outcome = getOutcome(playerChoice, computerChoice);

      rounds += 1;
      playerPickEl.textContent = icons[playerChoice];
      computerPickEl.textContent = icons[computerChoice];

      resultEl.className = 'result';

      if (outcome === 'draw') {
        resultEl.textContent = `It's a draw! You both chose ${capitalize(playerChoice)}.`;
        resultEl.classList.add('draw');
      } else if (outcome === 'win') {
        playerScore += 1;
        resultEl.textContent = `You win! ${capitalize(playerChoice)} beats ${capitalize(computerChoice)}.`;
        resultEl.classList.add('win');
      } else {
        computerScore += 1;
        resultEl.textContent = `You lose! ${capitalize(computerChoice)} beats ${capitalize(playerChoice)}.`;
        resultEl.classList.add('lose');
      }

      updateScoreboard();
    }

    function getOutcome(playerChoice, computerChoice) {
      if (playerChoice === computerChoice) return 'draw';

      const winningMoves = {
        rock: 'scissors',
        paper: 'rock',
        scissors: 'paper'
      };

      return winningMoves[playerChoice] === computerChoice ? 'win' : 'lose';
    }

    function updateScoreboard() {
      playerScoreEl.textContent = playerScore;
      computerScoreEl.textContent = computerScore;
      roundsEl.textContent = rounds;
    }

    function resetGame() {
      playerScore = 0;
      computerScore = 0;
      rounds = 0;
      playerPickEl.textContent = '\u2754';
      computerPickEl.textContent = '\u2754';
      resultEl.className = 'result';
      resultEl.textContent = 'Make your first move!';
      updateScoreboard();
    }

    function capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }