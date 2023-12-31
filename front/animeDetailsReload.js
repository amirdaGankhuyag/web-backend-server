// main
const apiUrl = "http://localhost:3000/animeList";

// ene functionoor page ee shinechlene parameteree huleej avaad info haruulas section doo bicsn htmlee renderlesen
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const animeId = urlParams.get("id");
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      let animes = data;
      const animeDetails = getAnimeById(animeId, animes);
      const animeInfoSection = document.getElementById("renderAnimeInfo");
      animeInfoSection.innerHTML = `
        <section class="animeInfo" id="renderAnimeInfo">
              <h3>Дэлгэрэнгүй мэдээлэл</h3>
              <article class="animeDetails">
                <img class="animeImage" src="${animeDetails.anime_img}" alt="Anime img" />
                <ul>
                  <li>
                    <i class="fa-solid fa-pen"></i>
                    Нэр: <span><strong id="animeName">${animeDetails.name}</strong></span>
                  </li>
                  <li>
                    <i class="fa-solid fa-calendar"></i>
                    Гарсан он: <span><strong>${animeDetails.released_date}</strong></span>
                  </li>
                  <li>
                    <i class="fa-solid fa-arrow-down-1-9"></i>
                    Анги: <span><strong>${animeDetails.total_episode}</strong></span>
                  </li>
                  <li>
                    <i class="fa-solid fa-clock"></i>
                    Нийт хугацаа: <span><strong>${animeDetails.total_duration}</strong></span>
                  </li>
                  <li>
                    <i class="fa-solid fa-list-ul"></i>
                    Төрөл: <span><strong>${animeDetails.category}</strong></span>
                  </li>
                  <li>
                    <i class="fa-solid fa-music"></i>
                    Дууны төрөл: <span><strong>${animeDetails.song_type}</strong></span>
                  </li>
                  <li>
                    <i class="fa-solid fa-ranking-star"></i>
                    MyAnimeList Rank: <span><strong>${animeDetails.mal_rank}</strong></span>
                  </li>  
                </ul>
                </article>
                <article class="watchAccessBuySection">
                  <button class="playButton addComment"><i class="fa-solid fa-play" style="color: #042834;"></i><p>PLAY</p></button>
                  <ul>
                    <li><i class="fa-regular fa-star" style="color: #fbff00"></i></li>
                    <li><i class="fa-regular fa-star" style="color: #fbff00"></i></li>
                    <li><i class="fa-regular fa-star" style="color: #fbff00"></i></li>
                    <li><i class="fa-regular fa-star" style="color: #fbff00"></i></li>
                    <li><i class="fa-regular fa-star" style="color: #fbff00"></i></li>
                  </ul>
                  <button class="addComment" onclick = "moveToShoppingPage()"" ><i class="fa-solid fa-cart-shopping"></i><p>Дэлгүүр хэсэх</p> </button>
              </article>
           `;
            const animeComments = animeDetails.comments;
            const commentContainer = document.getElementById("commentsId");
            let count = 0;
            for (let comment of animeComments.reverse()) {
              let commentValue = `
                <article class="userComment">
                <i class="fa-solid fa-user" style="color: #ffffff"></i>
                <em>${comment.split(",")[1]}</em>
                <p>
                ${comment.split(",")[0]}
                </p>
              </article>
                `;
              commentContainer.insertAdjacentHTML("afterbegin", commentValue);
              count++;
              if (count === 6) {
                break;
              }
            }
    });
});

// enuuugeer jsonoo oosoo anime name r ni anime infogo avsan
function getAnimeById(animeId, list) {
  return list.find((anime) => anime.id == animeId);
}

function moveToShoppingPage() {
  const nowUrl = new URL(window.location.href);
  nowUrl.search = "";
  let newUrl = nowUrl.href.replace("animeDetails.html", "shopping.html");
  console.log(newUrl);
  window.location.href = newUrl;
}