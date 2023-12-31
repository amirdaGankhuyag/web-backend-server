class HeaderSection extends HTMLElement {
  constructor() {
    super();
    this.#render();
  }

  connectedCallback() {
    const button1 = document.getElementById("logoutButton");
    button1.addEventListener("click", () => {
      document.getElementById("logoutWindow").style.display = "flex";
    });

    const button2 = document.getElementById("addAnimeButton");
    button2.addEventListener("click", () => {
      document.getElementById("addAnimeWindow").style.display = "flex";
    });
  }

  #render() {
    this.innerHTML = `
        <header>
        <div class="rightMenu">
          <i class="fa-solid fa-bars sidebarActivator" id="activator" onclick="appearSideBarView()"></i>
          <a href="index.html"><img src="https://i.ibb.co/hD8WWBT/logo-no-bck.png" alt="logo" style="width: 100px; height: 68px; margin-left: 25px"></a>
          <input type="text" aria-label="Search" placeholder="Search..." style="margin-left: 25px;"/>
          <i class="fa-solid fa-magnifying-glass" style="color: #6d6b6b;"></i>
        </div>
        <div class="leftMenu">
          <nav class="menu">
            <ul>
              <li><a href="filter.html"><i class="fa-solid fa-bars"></i>Anime list</a></li>
              <li><a href="shopping.html"><i class="fa-solid fa-cart-shopping"></i>Shopping</a></li>
              <li><a href="service.html"><i class="fa-regular fa-credit-card"></i>Service</a></li>
            </ul>
          </nav>
          <nav class="btns">          
            <button id="addAnimeButton"><i class="fa-solid fa-user" ></i>Add</button>
            <button id="logoutButton"><i class="fa-solid fa-user" ></i>Log out</button>
          </nav>
        </div>
      </header>

      <nav class="sidebar" id="sidebarId">
        <ul>
          <i class="fa-solid fa-xmark sidebarActivator" id="remover" onclick="hideSideBarView()"></i>
          <li><a href="filter.html"><i class="fa-solid fa-bars"></i>Anime list</a></li>
          <li><a href="shopping.html"><i class="fa-solid fa-cart-shopping"></i>Shopping</a></li>
          <li><a href="service.html"><i class="fa-regular fa-credit-card"></i>Service</a></li>
          <li><a href="login.html"><i class="fa-solid fa-user"></i>Log out</a></li>
        </ul>
      </nav>
      
      <section id="logoutWindow">
        <article>
            <p>Та гарахдаа итгэлтэй байна уу?</p>
            <div id="logoutBtnContainer">
                <button class="logoutBtn" onclick="logout()">Тийм</button>
                <button class="logoutBtn" onclick="closeWindow()">Үгүй</button>
            </div>
        </article>
      </section>

      <section id="addAnimeWindow">
        <article id="details">
          <center><p>Шинэ аниме нэмэх</p></center>
          <div class="dataContainer">
              <article>
                <label>Name</label>
                <input id="addAnimeName" type="text">
              </article>
              <article>
                <label>Released Date</label>
                <input id="addAnimeReleasedDate" type="number">
              </article>
              <article>
                <label >Total episode</label>
                <input id="addedAnimeTotalEpisode" type="number">
              </article>
              <article>
                <label>Total duration</label>
                <input id="addedAnimeTotalDuration" type="number">
              </article>
              <article>
                <label>Song type</label>
                <input id="addedAnimeSongType" type="text">
              </article>
              <article>
                <label>Mal rank</label>
                <input id="addedAnimeMalRank" type="number">
              </article>
              <article>
                <label>image URL</label>
                <input id="addedAnimeImgURL" type="text">
              </article>
              <article>
                <label>Category</label>
                <select id="addedAnimeCategory" name="categories" id="categories">
                  <option value="Drama">Drama</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Action">Action</option>
                  <option value="Superpower">Superpower</option>
                  <option value="School">School</option>
                  <option value="Space">Space</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Shonen">Audi</option>
                  <option value="Fight">Fight</option>
                </select>
              </article>
          </div>
          <div class="windowButtonContainer">
            <button onclick="addAnime()">Add</button>
            <button onclick="closeAddAnimeWindow()">Cancel</button>
          </div>
        </article>
      </section>


    `;
  }
}

window.customElements.define("header-section", HeaderSection);