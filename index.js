const WINNER_INFO = {
  scissors: "paper",
  paper: "rock",
  rock: "scissors",
};

const OPTIONS = Object.keys(WINNER_INFO);

function capitalize(selection) {
  return selection[0].toUpperCase() + selection.slice(1).toLowerCase().trim();
}

function getComputerChoice() {
  const selected = Math.floor(Math.random() * 3);
  return OPTIONS[selected];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "tie";
  } else if (computerSelection === WINNER_INFO[playerSelection]) {
    return "player";
  } else {
    return "computer";
  }
}

function game() {
  const dialog = document.querySelector(".dialog");
  const winnerTag = document.querySelector(".winner-tag");
  const dialogButton = document.querySelector(".dialog button");
  const playerButtons = document.querySelectorAll(".player .card");
  const scores = {
    player: {
      points: 0,
      domObj: document.querySelector(".player .score-number"),
    },
    computer: {
      points: 0,
      domObj: document.querySelector(".computer .score-number"),
    },
    rounds: 0,
  };
  dialogButton.addEventListener("click", () => {
    scores.computer.points = 0;
    scores.player.points = 0;
    scores.rounds = 0;
    scores.computer.domObj = scores.computer.points;
    scores.player.domObj = scores.player.points;
    dialog.close();
  });
  playerButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const playerSelection = e.currentTarget.id;
      const computerSelection = getComputerChoice();
      const winner = playRound(playerSelection, computerSelection);
      const winnerHeader = document.querySelector(".banner h2");
      const winnerParagraph = document.querySelector(".banner p");
      winnerHeader.textContent =
        winner !== "tie" ? `${capitalize(winner)} wins!` : "It's a tie!";
      winnerParagraph.textContent = "Make your next move";

      const borderColors = {
        player: "",
        computer: "",
      };

      if (winner !== "tie") {
        if (winner === "computer") {
          borderColors.computer = "green";
          borderColors.player = "red";
        } else {
          borderColors.computer = "red";
          borderColors.player = "green";
        }
      } else {
        borderColors.player = "gray";
        borderColors.computer = "gray";
      }

      const playerButton = e.currentTarget;
      const computerButton = document.querySelector(
        `.computer .${computerSelection}`
      );
      computerButton.style.opacity = "1";
      computerButton.style.border = `5px solid ${borderColors.computer}`;

      e.currentTarget.style.border = `5px solid ${borderColors.player}`;

      playerButtons.forEach((playerBtn) => {
        playerBtn.setAttribute("disabled", "");
      });

      if (winner !== "tie") {
        scores[winner]["points"]++;
        scores[winner]["domObj"].textContent = scores[winner]["points"];
      }
      scores.rounds++;

      setTimeout(() => {
        computerButton.style.opacity = "0.5";
        computerButton.style.border = "3px solid rgba(0, 0, 0, 0.4)";
        playerButton.style.border = "3px solid rgba(0, 0, 0, 0.4)";
        playerButtons.forEach((playerBtn) => {
          playerBtn.removeAttribute("disabled");
        });
        if (scores.player.points === 5 || scores.computer.points === 5) {
          winnerTag.textContent = capitalize(winner);
          dialog.showModal();
        }
      }, 3000);
    });
  });
}

game();
