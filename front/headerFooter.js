  hideSideBarView = function() {
    document.getElementById("sidebarId").style.display = "none";
  }

  appearSideBarView = function() {
    document.getElementById("sidebarId").style.display = "flex";
  }

  closeWindow = function() {
    document.getElementById('logoutWindow').style.display = 'none'
  }

  closeAddAnimeWindow = function() {
    document.getElementById('addAnimeWindow').style.display = 'none'
  }

  addAnime = function() {
    const name = document.getElementById("addAnimeName").value;
    const releasedDate = document.getElementById("addAnimeReleasedDate").value;
    const totalEpisode = document.getElementById("addedAnimeTotalEpisode").value;
    const totalDuration = document.getElementById("addedAnimeTotalDuration").value;
    const songType = document.getElementById("addedAnimeSongType").value;
    const malRank = document.getElementById("addedAnimeMalRank").value;
    const imageURL = document.getElementById("addedAnimeImgURL").value;
    const category = document.getElementById("addedAnimeCategory").value;
    console.log(name , releasedDate , totalEpisode ,totalDuration, songType,  malRank, category, imageURL);
    if(name == "" || releasedDate == null || totalEpisode =="" || totalDuration == null || songType =="" || malRank == null || imageURL == "" || category =="") {
      window.alert('Талбаруудыг бүтэн бөглөнө үү!');
    } else {
      fetch("http://localhost:3000/addAnime" , {
        method: 'POST',
        cachde: 'no-cache',
        headers: {
          "Content-Type" : 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(
          {
            name : name,
            releasedDate : releasedDate,
            totalEpisode : totalEpisode,
            totalDuration : totalDuration,
            songType : songType,
            malRank :  malRank,
            category : category,
            animeImg : imageURL,
          }
        )
      }).then(result => {
        if(result.status === 200) {
          window.alert("Амжилттай нэмэгдлээ.");
          location.reload();
          return;
        } else {
          window.alert("Амжилтгүй!!");
          return;
        }
      })
    }

  }

  logout = function() {
    localStorage.setItem("userToken", -1);
    window.location.href = "/";
  }
hideSideBarView = function() {
  document.getElementById("sidebarId").style.display = "none";
}
appearSideBarView = function() {
  document.getElementById("sidebarId").style.display = "flex";
}
closeWindow = function() {
  document.getElementById('logoutWindow').style.display = 'none'
}
logout = function() {
  localStorage.setItem("userToken", -1);
  window.location.href = "/";
}
