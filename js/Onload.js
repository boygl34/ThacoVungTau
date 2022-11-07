window.addEventListener("DOMContentLoaded", (event) => {

  $.ajax({
    url: "https://big-road-newsstand.glitch.me/ThongSo/",
    type: 'GET',
    success: function (data) {
      localStorage.setItem("ThongSo", JSON.stringify(data))

    }
  })

  getData();
});
var timerRunner = 0
setInterval(function () {
  timerRunner++
  if (timerRunner >= 30) {
    timerRunner = 0
    getData();
  }
}, 3000);


function getData() {
  $.ajax({
    url: urlTX,
    type: "GET",
    success: function (data) {
      useCaher = data;
      LoadTimeLine()

    },
  });
}
