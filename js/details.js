var data
var image
var title
var description
var platform
var category
var url
var game
var cartona = ''
export async function detailsGames(id) {
  
  if (!id) return; // no game selected yet

  const options = {
    headers: {
      "x-rapidapi-key": "daca4354d0mshf675192a8b3e485p13f5adjsn25064d270512",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  var response = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
    data = await response.json();
    console.log(data.thumbnail);
    image = data.thumbnail
    title = data.title
    description = data.description;
    platform = data.platform;
    category = data.genre;
    url = data.game_url;
    console.log(url);
const spinner = document.getElementById("spinner");
spinner.classList.add("d-none");
    
}
    
export async function detailsDisplay(id){
    await detailsGames(id)
    cartona = `<div class="container">
    <div class="details-title text-white d-flex justify-content-between">
    <h3>Details Game</h3>
    <button class="btn "><i class="fa-solid fa-x"></i></button>
    </div>
    <div class="game-details">
    <div class="row">
    <div class="col-xl-4">
    <img src='${image}' alt="">
    </div>
    <div class="col-xl-8 text-white">
    <h4>Title: ${title}</h4>
    <h6>Category: <span class='bg-info p-1 border-0 rounded-2 text-black fw-bold'>${category}</span></h6>
    <h6>Platform: <span class='bg-info p-1 border-0 rounded-2 text-black fw-bold'>${platform}</span></h6>
    <h6>Status: <span class='bg-info p-1 border-0 rounded-2 text-black fw-bold'>Live</span></h6>
    <p>${description}</p>
    <a href="${url}" target='_blank'><button type="button" class="btn btn-outline-warning text-white fw-bold">show game</button></a>
    </div>
    </div>
    </div>
    </div>`;
    document.getElementById("details").innerHTML = cartona;
    document.querySelector('.btn').addEventListener('click',(event_1)=>{
      document.getElementById('details').classList.add('d-none')
      document.querySelector(".main-game").classList.remove("d-none");
      
    })
  }
