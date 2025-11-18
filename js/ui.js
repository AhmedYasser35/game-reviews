export var gameId = null; // the clicked game ID

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
    options
  );
  var data = await response.json();
  console.log(data)
  spinner.classList.add("d-none");

  return data.map(
    (item) =>
      new Game(
        item.title,
        item.short_description,
        item.thumbnail,
        item.genre,
        item.platform,
        item.id
      )
  );
}

export async function displayGame(category) {
  const games = await loadGames(category);
  let cartona = "";

  for (let game of games) {
    cartona += `
      <div class="game-card col-md-3 p-0 rounded-2 d-flex flex-column justify-content-between" role='button' data-id='${game.id}'>
        <div class="body p-3">
          <div class="game-img">
            <img src="${game.thumbnail}" alt="" class="w-100 border-0 mb-4 rounded-2">
          </div>
          <div class="game-content">
            <div class='game-title d-flex justify-content-between'>
              <h3 class="fs-5 text-white">${game.title}</h3>
              <p class='text-white bg-primary py-1 fw-bolder px-2 border-0 rounded-3' id='free'>Free</p>
            </div>
            <p class="text-center">${game.desc}</p>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-between border-bottom-0 border-end-0 border-start-0 px-3 py-2">
          <p class="m-0 text-white border-0 rounded-3 fw-bolder">${game.genre}</p>
          <p class="m-0 text-white border-0 rounded-3 fw-bolder">${game.platform}</p>
        </div>
      </div>
    `;
  }
  document.getElementById("content").innerHTML = cartona;
}
