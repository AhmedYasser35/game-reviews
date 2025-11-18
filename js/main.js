import { displayGame } from "./ui.js";
import { detailsGames ,detailsDisplay } from "./details.js";

const genreLinks = document.querySelectorAll(".genre");
genreLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    genreLinks.forEach((l) => l.classList.remove("link-active"));
    link.classList.add("link-active");
    const category = link.dataset.genre;
    displayGame(category);
  });
});
displayGame("mmorpg");

document.getElementById("content").addEventListener("click", (event) => {
  const card = event.target.closest(".game-card");
  if (!card) return;
  document.querySelector('.details').classList.remove('d-none')
  document.querySelector('.main-game').classList.add('d-none')
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("d-none");
  const id = card.dataset.id; // get clicked game id
  console.log("Clicked game ID:", id);
  detailsGames(id); // fetch details
  detailsDisplay(id)
});