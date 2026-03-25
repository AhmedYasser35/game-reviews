var data;
var image;
var title;
var description;
var platform;
var category;
var url;
var cartona = "";

export async function detailsGames(id) {
  if (!id) return;

  const spinner = document.getElementById("spinner");
  spinner.classList.remove("d-none");

  const options = {
    headers: {
      "x-rapidapi-key": "daca4354d0mshf675192a8b3e485p13f5adjsn25064d270512",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  var response = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options,
  );

  data = await response.json();
  image = data.thumbnail;
  title = data.title;
  description = data.description;
  platform = data.platform;
  category = data.genre;
  url = data.game_url;

  spinner.classList.add("d-none");
}

export async function detailsDisplay(id) {
  await detailsGames(id);

  cartona = `
    <div class="container py-4">
      <div class="details-title text-white d-flex justify-content-between align-items-center mb-4">
        <h3 class="m-0">Details Game</h3>
        <button class="btn btn-close btn-close-white" id="btnClose"></button>
      </div>
      <div class="game-details">
        <div class="row g-4">
          <div class="col-md-12 col-lg-4">
            <img src='${image}' class="w-100 rounded-3 shadow" alt="${title}">
          </div>
          <div class="col-md-12 col-lg-8 text-white">
            <h4 class="mb-3">Title: ${title}</h4>
            <div class="info-badges mb-3 d-flex flex-wrap gap-2">
               <h6 class="m-0">Category: <span class='bg-info p-1 px-2 border-0 rounded-2 text-black fw-bold'>${category}</span></h6>
               <h6 class="m-0">Platform: <span class='bg-info p-1 px-2 border-0 rounded-2 text-black fw-bold'>${platform}</span></h6>
               <h6 class="m-0">Status: <span class='bg-info p-1 px-2 border-0 rounded-2 text-black fw-bold'>Live</span></h6>
            </div>
            <p class="small lh-lg">${description}</p>
            <a href="${url}" target='_blank' class="btn btn-outline-warning text-white fw-bold mt-3 px-4">Show Game</a>
          </div>
        </div>
      </div>
    </div>`;

  const detailsContainer = document.getElementById("details");
  detailsContainer.innerHTML = cartona;
  detailsContainer.classList.remove("d-none");
  document.querySelector(".main-game").classList.add("d-none");

  document.getElementById("btnClose").addEventListener("click", () => {
    detailsContainer.classList.add("d-none");
    document.querySelector(".main-game").classList.remove("d-none");
    window.scrollTo(0, 0);
  });
}
