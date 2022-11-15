

$.ajax({
  url: urlThongSo,
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
      LoadTimeLine();
    });
}

function Logout() {
  localStorage.setItem("userName", "");
  localStorage.setItem("Password", "");
  localStorage.setItem("Ten", "");
  localStorage.setItem("id", "");
  localStorage.setItem("PhanQuyen", "");
  localStorage.setItem("BoPhan", "");
  console.log("logout");
  window.location = "login.html";
}


