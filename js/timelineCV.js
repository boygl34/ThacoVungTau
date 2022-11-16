var containerCV = document.getElementById("LichCoVan");
var groupsCV = new vis.DataSet();
var itemsCV = new vis.DataSet();
groupsCV.add({
  id: localStorage.getItem("Ten"),
  content: localStorage.getItem("Ten"),
});
groupsCV.add({
  id: "Rửa Xe",
  content: "Rửa Xe",
});
var optionsCV = {
  hiddenDates: [
    //{start: '2017-03-05 00:00:00',end: '2017-03-06 00:00:00',repeat: 'weekly'},
    {
      start: "2017-03-04 17:30:00",
      end: "2017-03-05 07:30:00",
      repeat: "daily",
    },
  ],
  stack: true,
  start: new Date(),
  editable: false,
  end: new Date(1000 * 60 * 60 * 24 + new Date().valueOf()),
  margin: {
    item: 0, // distance between items
    axis: 0, // distance between items and the time axis
  },
  orientation: "top",
  start: new Date(new Date().valueOf()).setHours(6),
  end: new Date(new Date().valueOf()).setHours(17),
  timeAxis: { scale: "minute", step: 30 },
  orientation: "top",
};

var timelineCV = new vis.Timeline(containerCV, itemsCV, groupsCV, optionsCV);
loadDataCV();
function loadDataCV() {
  itemsCV.clear();
  var dataArray0 = useCaher;
  for (var a in dataArray0) {
    r = dataArray0[a];
    if (r.ThoiGianHen) {
      var start = new Date(DoiNgayDangKy(r.ThoiGianHen));
      itemsCV.add({
        id: r.BienSoXe + "_Hen" + a,
        className: "green",
        group: r.CoVanDichVu,
        start: start,
        end: new Date(1000 * 60 * 29 + start.valueOf()),
        content: r.BienSoXe,
      });
    }
    if (r.TDHenGiaoXe) {
      itemsCV.add({
        id: r.BienSoXe + "_Giao" + a,
        group: r.CoVanDichVu,
        start: new Date(DoiNgayDangKy(r.TDHenGiaoXe)),
        end: new Date(
          1000 * 60 * 29 + new Date(DoiNgayDangKy(r.TDHenGiaoXe)).valueOf()
        ),
        content: r.BienSoXe,
      });
    }

    if (
      r.KhachRuaXe == "Rửa Xe" &&
      r.TrangThaiXuong != "08 Chờ Giao Xe" &&
      r.TimeEndGJ
    ) {
      var classname2 = "orange";
      if (r.TrangThaiXuong == "07 Đang Rửa Xe") {
        classname2 = "green";
      }
      itemsCV.add({
        className: classname2,
        id: r.BienSoXe + "_RuaXe",
        group: "Rửa Xe",
        //type: "point",
        start: new Date(DoiNgayDangKy(r.TimeEndGJ)),
        end: new Date(
          1000 * 60 * 14 + new Date(DoiNgayDangKy(r.TimeEndGJ)).valueOf()
        ),
        content: r.BienSoXe + " " + r.CoVanDichVu,
      });
    }
  }
  document.getElementById("loading").style.display = "none"
}
