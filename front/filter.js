// main
const  apiUrl ="http://localhost:3000/animeList"

class Anime {
  constructor(animeListItem) {
    this.name = animeListItem.name;
    this.releasedDate = animeListItem.released_date;
    this.totalEpisode = animeListItem.total_episode;
    this.animeImg = animeListItem.anime_img;
    this.malRank = animeListItem.mal_rank;
    this.category = animeListItem.category;
    this.id = animeListItem.id;
  }

  getCatogeries = function () {
    let categoryList = "";
    for (let i = 0; i < this.category.length; i++) {
      if (i !== this.category.length - 1) {
        categoryList += `${this.category[i]}, `;
      } else {
        categoryList += `${this.category[i]}`;
      }
    }
    return categoryList;
  };

  render = function () {
    return `
          <li>
          <div class="anime-card">
            <div class="anime-card-inner anime-card-front">
              <img src="${this.animeImg}" alt="Recommended anime" />
            </div>
            <div class="anime-card-inner anime-card-back">
              <div class="anime-card-back-content">
                <p><strong>Нэр: </strong>${this.name}</p>
                <p><strong>Гарсан он: </strong>${this.releasedDate}</p>
                <p><strong>Ангийн тоо: </strong>${this.totalEpisode}</p>
                <p><strong>Төрөл: <br></strong>${this.getCatogeries()}</p>
              </div>
              <button class="anime-card-button" onclick= "moveToAnimeDetailPage('${this.id}')" >Дэлгэрэнгүй</button>
            </div>
          </div>
        </li>
          `;
  };
}

let listCatogeries =  document.getElementById("categoryList").getElementsByTagName('li');

for(let list of listCatogeries) {
  list.addEventListener("click" , (event) => {
    let categoryType = event.target.textContent; // li dotorh text
    const nowUrl = new URL(window.location.href);
    let newUrl = nowUrl.origin; 
    newUrl += `${nowUrl.pathname}?category=${categoryType}`;
    window.location.href = newUrl; // url aa solij page aa shinechilne
  })
}

// mobile iinh
document.getElementById("animeSelection").addEventListener("change" , (event) => {
  const categoryType = event.target.value;
  const nowUrl = new URL(window.location.href);
  let newUrl = nowUrl.origin; 
  newUrl += `${nowUrl.pathname}?category=${categoryType}`;
  window.location.href = newUrl;
});


document.addEventListener("DOMContentLoaded" , async() => {
    let response = await fetch(apiUrl);
    let listOfAnime = await response.json();
    let urlParams = new URLSearchParams(window.location.search);
    let categoryType = urlParams.get("category");
    let target = document.getElementById("filteredAnimeList");

    // type songogdoogui ued buh anime aa haruulna
    if(categoryType === null) {
      for(let item of listOfAnime){
        const renderedAnime = new Anime(item);
        target.insertAdjacentHTML("beforeend" , renderedAnime.render()); 
      }
    // songogdson ued tuhain category giin animuudiig haruulna
    } else {
      document.getElementById("filteredType").value = categoryType;
      let selectedAnimes = listOfAnime.filter((anime) => anime.category.includes(categoryType));
      selectedAnimes.map((anime) => {
        const renderedAnime = new Anime(anime);
        target.insertAdjacentHTML("beforeend" , renderedAnime.render());
      })
    }

});

// enuuger anime iin delgerengu page iihe dataga url aar damjulad avn deer render dree onclick der ni zaagd ugcin
moveToAnimeDetailPage = function(id) {
  let nowUrl = new URL(window.location.href);
  let newUrl = nowUrl.origin;
  newUrl += nowUrl.pathname;
  let lastUrl = newUrl.replace("filter.html", "animeDetails.html");
  lastUrl += `?id=${id}`
  window.location.href = lastUrl;
}
