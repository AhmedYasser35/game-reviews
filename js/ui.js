export var gameId = null;

export class Game {
  constructor(title, desc, thumbnail, genre, platform, id) {
    this.title = title;
    this.desc = desc;
    this.thumbnail = thumbnail;
    this.genre = genre;
    this.platform = platform;
    this.id = id;
  }
}

export async function loadGames(category) {
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("d-none");

  const options = {
    headers: {
      "x-rapidapi-key": "daca4354d0mshf675192a8b3e485p13f5adjsn25064d270512",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  const response = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
    options,
  );
  var data = await response.json();
  spinner.classList.add("d-none");

  return data.map(
    (item) =>
      new Game(
        item.title,
        item.short_description,
        item.thumbnail,
        item.genre,
        item.platform,
        item.id,
      ),
  );
}

export async function displayGame(category) {
  const games = await loadGames(category);
  let cartona = "";

  for (let game of games) {
    cartona += `
      <div class="col-sm-6 col-md-4 col-lg-3 p-3">
        <div class="game-card h-100 rounded-2 d-flex flex-column justify-content-between" role='button' data-id='${game.id}'>
          <div class="body p-3">
            <div class="game-img">
              <img src="${game.thumbnail}" alt="${game.title}" class="w-100 border-0 mb-4 rounded-2">
            </div>
            <div class="game-content">
              <div class='game-title d-flex justify-content-between align-items-center gap-2'>
                <h3 class="fs-6 text-white mb-0">${game.title}</h3>
                <span class='badge bg-primary' id='free'>Free</span>
              </div>
              <p class="text-center mt-2 small">${game.desc}</p>
            </div>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center border-top px-3 py-2">
            <p class="m-0 text-white rounded-3 fw-bolder">${game.genre}</p>
            <p class="m-0 text-white rounded-3 fw-bolder">${game.platform}</p>
          </div>
        </div>
      </div>
    `;
  }
  document.getElementById("content").innerHTML = cartona;
}
