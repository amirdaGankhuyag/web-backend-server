// main
const  apiUrl ="http://localhost:3000/animeList"


const carousels = [
  {
  source: "https://i.ibb.co/8bYT85P/j-test.png",
  description: "J-TEST шалгалтын тов гарлаа. "
  },
  {
    source: "https://i.ibb.co/yhwdfRt/monboshu.png",
    description: "Монбошү тэтгэлгт бүртгүүлэгчидийн анхааралд."
  },
  {
      source: "https://i.ibb.co/sHGpqYf/040820231691143972-1458689631.webp",
      description: "Монгол япон соёлын өдөрлөг болно."
  },
] 
// baruun sum
changeCarouselImageRight = function() {
  let nowImage = document.getElementById("carouselImage").src;
  for(let i = 0 ; i < carousels.length ; i++) {
    //hamgin suuliih bish bol daragih ru
    if(nowImage === carousels[i].source && i !== carousels.length -1) {
      document.getElementById("carouselImage").src = carousels[i+1].source
      document.getElementById("carouselDescription").innerText = carousels[i+1].description;
      break;
    } else if(nowImage === carousels[i].source &&  i === carousels.length -1) {
      // mun bol ehnees ni
      document.getElementById("carouselImage").src = carousels[0].source;
      document.getElementById("carouselDescription").innerText = carousels[0].description;
      break;
    }
  }
}

// zuun sum
changeCarouselImageLeft = function() {
  let nowImage = document.getElementById("carouselImage").src;
  for(let i = 0 ; i < carousels.length ; i++) {
    if(nowImage === carousels[i].source && i !== 0) {
      document.getElementById("carouselImage").src = carousels[i-1].source
      document.getElementById("carouselDescription").innerText = carousels[i-1].description;
      break;
    } else if(nowImage === carousels[i].source &&  i === 0) {
      document.getElementById("carouselImage").src = carousels[carousels.length-1].source
      document.getElementById("carouselDescription").innerText = carousels[carousels.length-1].description;
      break;
    }
  }
}

// neg anime card ilerhiileh class
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

  // categoruudiig avah
  getCatogeries = function() {
    let categoryList = "";
    for(let i = 0 ; i < this.category.length ; i++) {
        if(i !== this.category.length -1 ) {
            categoryList += `${this.category[i]}, `;
        } else {
            categoryList += `${this.category[i]}`;
        }

    }
    return categoryList;
  }

  // neg card renderleh
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

class App {
  constructor(targetId) {
    this.target = targetId; // anime bur id tai
    this.apiUrl = apiUrl; 
  }

  // taarsan hesegt ni animuud gargah
  init = function(sortType) {
    fetch(this.apiUrl).then(response => response.json()).then(data => {
      let animes = data;
      const trgt = document.getElementById(this.target);
      let sortedAnimeList = this.sortAnimeType(animes ,sortType);
      let count = 0;
      for (const anime of sortedAnimeList) {
        if (count === 6) {
          break;
        }
        const renderedAnime = new Anime(anime);
        trgt.insertAdjacentHTML("beforeend", renderedAnime.render());
        count++;
      }
    })
  }

  // anime aa sortloh
  sortAnimeType = function(list ,sortType) {
    switch(sortType) {
      case "RecentlyAdded": return this.sortByDate(list);
      case "MalRank": return this.sortByMalRank(list);
      case "MostViews": return this.sortByViews(list);
    }
  }

  sortByDate = function(list) {
    const sortedArray = list.sort((anime1, anime2) => {
      return anime2.released_date - anime1.released_date;
    });
    return sortedArray;
  };

  sortByViews = function(list) {
    const sortedArray = list.sort((anime1, anime2) => {
      return anime2.views - anime1.views;
    });
    return sortedArray;
  };

  sortByMalRank = function(list) {
    const sortedArray = list.sort((anime1, anime2) => {
      return anime1.malRank - anime2.malRank;
    });
    return sortedArray;
  };
}

// enuuger anime iin delgerengu page iihe dataga url aar damjulad avn deer render dree onclick der ni zaagd ugcin
moveToAnimeDetailPage = function(id) {
  console.log("hello");
  let currentURL = window.location.href;
  let newUrl = currentURL.replace("index.html" , "animeDetails.html");
  newUrl += `?id=${id}`
  window.location.href = newUrl;
}