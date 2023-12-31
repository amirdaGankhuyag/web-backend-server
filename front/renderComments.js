getComments = async function () {
  fetch("http://localhost:3000/animelist")
    .then((response) => response.json())
    .then((data) => {
      console.log(document.getElementById("commentsId"));
      const commentContainer = document.getElementById("commentsId");
      const commentValue = `
        <!-- <article class="userComment">
        <i class="fa-solid fa-user" style="color: #ffffff"></i>
        <em>User</em>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam et
          earum perferendis fugiat labore eaque possimus aut odit excepturi
          dignissimos.
        </p>
      </article>
        `;
      let count = 0;
      for (let animeInfo of data) {
        commentContainer.insertAdjacentHTML("beforeend");
      }
    });
};