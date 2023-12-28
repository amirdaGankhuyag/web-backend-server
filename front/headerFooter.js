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