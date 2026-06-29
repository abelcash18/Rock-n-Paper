    const choices = ['rock', 'paper', 'scissors'];

    const icons = {
      rock: '\u270A',
      paper: '\u270B',
      scissors: '\u270C\uFE0F'
    };

    const winningMoves = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper'
    };

    let playerScore = 0;
    let computerScore = 0;
    let rounds = 0;

    const els = {
      playerScore: document.getElementById('playerScore'),
      computerScore: document.getElementById('computerScore'),
      rounds: document.getElementById('rounds'),
      playerPick: document.getElementById('playerPick'),
      computerPick: document.getElementById('computerPick'),
      result: document.getElementById('result'),
      reset: document.getElementById('reset')
    };

    const choiceButtons = document.querySelectorAll('.choice');

    choiceButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const playerChoice = button.dataset.choice;
        if (!playerChoice || !choices.includes(playerChoice)) return;
        playRound(playerChoice);
      });
    });

    els.reset.addEventListener('click', resetGame);

    const playRound = (playerChoice) => {
      const computerChoice = choices[Math.floor(Math.random() * choices.length)];
      const outcome = getOutcome(playerChoice, computerChoice);

      rounds += 1;
      els.playerPick.textContent = icons[playerChoice];
      els.computerPick.textContent = icons[computerChoice];

      els.result.classList.remove('win', 'lose', 'draw');
      els.result.classList.add('result');

      if (outcome === 'draw') {
        els.result.textContent = `It's a draw! You both chose ${capitalize(playerChoice)}.`;
        els.result.classList.add('draw');
      } else if (outcome === 'win') {
        playerScore += 1;
        els.result.textContent = `You win! ${capitalize(playerChoice)} beats ${capitalize(computerChoice)}.`;
        els.result.classList.add('win');
      } else {
        computerScore += 1;
        els.result.textContent = `You lose! ${capitalize(computerChoice)} beats ${capitalize(playerChoice)}.`;
        els.result.classList.add('lose');
      }

      updateScoreboard();
    };

    const getOutcome = (playerChoice, computerChoice) => {
      if (playerChoice === computerChoice) return 'draw';
      return winningMoves[playerChoice] === computerChoice ? 'win' : 'lose';
    };

    const updateScoreboard = () => {
      els.playerScore.textContent = playerScore;
      els.computerScore.textContent = computerScore;
      els.rounds.textContent = rounds;
    };

    const resetGame = () => {
      playerScore = 0;
      computerScore = 0;
      rounds = 0;
      els.playerPick.textContent = '\u2754';
      els.computerPick.textContent = '\u2754';
      els.result.classList.remove('win', 'lose', 'draw');
      els.result.classList.add('result');
      els.result.textContent = 'Make your first move!';
      updateScoreboard();
    };

    const capitalize = (word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    };

