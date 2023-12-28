class HeaderSection extends HTMLElement {
  constructor() {
    super();
    this.#render();
  }

  connectedCallback() {
    const button = document.getElementById("logoutButton");
    button.addEventListener("click", () => {
      document.getElementById("logoutWindow").style.display = "flex";
    });
  }

  #render() {
    this.innerHTML = `
        <header>
        <div class="rightMenu">
          <i class="fa-solid fa-bars sidebarActivator" id="activator" onclick="appearSideBarView()"></i>
          <a href="index.html"><img src="https://i.ibb.co/hD8WWBT/logo-no-bck.png" alt="logo" style="width: 100px; height: 68px;"></a>
          <input type="text" aria-label="Search" placeholder="Search..."/>
          <i class="fa-solid fa-magnifying-glass" style="color: #6d6b6b"></i>
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
      
      <section id="logoutWindow" style="display: none; height: 100%; width: 100%; align-items: center; justify-content: center; background-color: rgba(0, 0, 0, 0.5); position: fixed; z-index: 8;">
        <article style="width: 300px; height: 150px; background-color: brown;display: flex; flex-direction: column; align-items: center; padding: 8px 16px 16px 16px;" >
            <p style="padding-top: 16px; color: white; font-size: 18px; font-weight: 450;">Та гарахдаа итгэлтэй байна уу?</p>
            <div style="width: 100%; display: flex; align-items: center; justify-content: space-around; padding-top: 24px;">
                <button class="logoutBtn" onclick="logout()">Yes</button>
                <button class="logoutBtn" onclick="closeWindow()">No</button>
            </div>
        </article>
      </section>
    `;
  }
}

window.customElements.define("header-section", HeaderSection);
