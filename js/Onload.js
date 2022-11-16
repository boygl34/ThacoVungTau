
window.addEventListener("DOMContentLoaded", (event) => {
  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector("#sidebarToggle");
  if (localStorage.getItem("TabDaDong") !== "") {
    gethtml(localStorage.getItem("TabDaDong"));
  } else {
    localStorage.setItem("TabDaDong", "html/Home.html");
    gethtml(localStorage.getItem("TabDaDong"));
  }



  if (sidebarToggle) {
    //Uncomment Below to persist sidebar toggle between refreshes
    if (localStorage.getItem("sb|sidebar-toggle") === "true") {
      document.body.classList.toggle("sb-sidenav-toggled");
    }
    sidebarToggle.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem("sb|sidebar-toggle", document.body.classList.contains("sb-sidenav-toggled")
      );
    });
  }


  checkdangnhap();

});





function hidemodal() {
  $(".modal").modal("hide");
}

function gethtml(value) {
  localStorage.setItem("TabDaDong", value);
  $("#layoutSidenav_content").html("")
  $.ajax({
    url: value,
    cache: false,
  })
    .done(function (html) {
      $("#layoutSidenav_content").html("")
      $("#layoutSidenav_content").html(html);
    })
    .then(function () {
      getData();
    });
}

function Logout() {
  localStorage.setItem("userName", "");
  localStorage.setItem("Password", "");
  localStorage.setItem("Ten", "");
  localStorage.setItem("id", "");
  localStorage.setItem("PhanQuyen", "");
  localStorage.setItem("BoPhan", "");
  localStorage.setItem("ThongSo", "");
  console.log("logout");
  window.location = "login.html";
}






function checkdangnhap() {
  var urlUser = "https://morning-chill-hammer.glitch.me/User/"
  var password = localStorage.getItem("Password");
  var use = localStorage.getItem("id");
  if (use == null) {
    window.location = "login.html";
  }
  if (password !== "" && use !== "") {
    fetch(urlUser + use)
      .then((response) => response.json())
      .then((data) => {
        if (password == data.Password && use == data.id) {
          //document.getElementById("TrangDangNhap").hidden=true
          // document.getElementById("BaoCao").hidden=false
          document.getElementById("navbarDropdown").innerHTML =
            localStorage.getItem("userName");
          //  checkPhanQuyen()
          console.log("login");
        } else { window.location = "login.html"; }
      });
  } else {
    window.location = "login.html";
    $("#layoutSidenav").html(
      '<a class="btn btn-primary" href="login.html">Login</a>'
    );
    console.log("out");
  }
}


$.ajax({
  url: "https://morning-chill-hammer.glitch.me/ThongSo/",
  type: 'GET',
  success: function (data) {
    localStorage.setItem("ThongSo", JSON.stringify(data))

  }
})
startWorker()
//startWorker2()
function getData() {
  document.getElementById("loading").style.display = "block"
  $.ajax({
    url: urlTX,
    type: "GET",
    success: function (data) {
      useCaher = data;
      LoadTimeLine()

    },
  });
}

var w;

function startWorker() {
  if (typeof (Worker) !== "undefined") {
    if (typeof (w) == "undefined") {
      w = new Worker("worker/SCC.js");
    }
    w.onmessage = function (event) {
      useCaher = event.data;
      document.getElementById("loading").style.display = "block"
      LoadTimeLine()
    };
  }
}

var r;

function startWorker2() {
  if (typeof (Worker) !== "undefined") {
    if (typeof (r) == "undefined") {
      r = new Worker("worker/worker2.js");
    }
    r.onmessage = function (event) {
      MasterData = event.data
    };
  }
}


