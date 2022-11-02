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

setInterval(function () {
  getData();
}, 60000);

function getData() {
  $.ajax({
    url: urlTX,
    type: "GET",
    success: function (data) {
      useCaher = data;
      if (LoadTimeLine()) {
        LoadTimeLine();
      }
    },
  });
}
