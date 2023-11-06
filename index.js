const OPTIONS = ["Rock", "Paper", "Scissors"];

function capitalize(selection) {
  return selection[0].toUpperCase() + selection.slice(1).toLowerCase().trim();
}

function getComputerChoice() {
  const selected = Math.floor(Math.random() * 3);
  return OPTIONS[selected];
}

function playRound(playerSelection, computerSelection) {
  playerSelection = capitalize(playerSelection);
  if (
    (playerSelection === "Scissors" && computerSelection === "Rock") ||
    (playerSelection === "Paper" && computerSelection === "Scissors") ||
    (playerSelection === "Rock" && computerSelection === "Paper")
  ) {
    console.log(`You Lose! ${computerSelection} beats ${playerSelection}`);
    return "computer";
  } else if (playerSelection === computerSelection) {
    console.log("It's a tie!");
  } else {
    console.log(`You Win! ${playerSelection} beats ${computerSelection}`);
    return "player";
  }
}

function game() {
  const scores = {
    player: 0,
    computer: 0,
  };
  for (let i = 0; i < 5; i++) {
    const playerSelection = prompt("Write your choice");
    const computerSelection = getComputerChoice();
    const winner = playRound(playerSelection, computerSelection);
    if (winner !== undefined) {
      scores[winner] += 1;
    }
  }
  if (scores["player"] > scores["computer"]) {
    return "The winner is the player!";
  } else if (scores["player"] < scores["computer"]) {
    return "The winner is the computer!";
  } else {
    return "The match is a tie! Play again :)";
  }
}
