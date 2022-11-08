var items = new vis.DataSet();
var container = document.getElementById("mytimeline");
var groups = new vis.DataSet();
var options = {
  hiddenDates: [
    {
      start: "2017-03-05 00:00:00",
      end: "2017-03-06 00:00:00",
      repeat: "weekly",
    },
    {
      start: "2017-03-04 17:30:00",
      end: "2017-03-05 07:45:00",
      repeat: "daily",
    },
  ],
  onMove: function (item) {
    timerRunner = 0
    let text = "Thay Đổi kế hoạch xe " + item.content;
    if (item) {
      capnhatthoigian(item);
    }
    //if (confirm(text) == true) { capnhatthoigian(item)} else {LoadTimeLine()};
  },
  onAdd: function (item) { },
  onUpdate: function (item) {
    timerRunner = 0
    var BienSo = item.content.slice(0, item.content.indexOf(" "));
    $("#buttonSCC").html("");
    document.getElementById("FormSCC").reset();
    $("#ModalSCC").modal("show");
    var chiudaichip = item.end - item.start;
    $("#ChieuDaiChip").val(chiudaichip);
    document.getElementById("BienSoXe").value = BienSo;
    changvalue();
    //timeSuaChua()
    $("#inputThoiGianSCC").val((chiudaichip * 1) / (60 * 60 * 1000));
  },
  timeAxis: { scale: "minute", step: 15 },
  orientation: "top",
  start: new Date(new Date().valueOf()).setHours(7),
  end: new Date(new Date().valueOf()).setHours(18),
  editable: true,
  autoResize: false,
  zoomable: false,
  moveable: false,

  margin: {
    item: 0.5, // distance between items
    axis: 0.5, // distance between items and the time axis
  },
  stack: true,
};

for (i in KhoangSC) {
  hiddenGruop = true
  if (KhoangKoSuDung.indexOf(KhoangSC[i]) > -1) { hiddenGruop = false }
  groups.add({
    id: KhoangSC[i],
    content: KhoangSC[i],
    visible: hiddenGruop,
  });


}
groups.add({
  id: "Rửa Xe",
  content: "Rửa Xe",
});

var timeline = new vis.Timeline(container, items, groups, options);

$("#mytimeline").mouseleave(function () {
  document.getElementById("contextMenu2").style.display = "none";
});
timeline.on("mouseOver", function (properties) {
  document.getElementById("contextMenu2").style.display = "none";
});
var timekeo;

timeline.on("mouseMove", function (properties) {
  // if(properties.item!==null){
  var menu = document.getElementById("contextMenu2");
  menu.style.display = "block";
  menu.style.left = properties.pageX + "px";
  menu.style.top = properties.pageY + 15 + "px";
  var aa = TimesClick(properties.time);
  timekeo = properties.time;
  $("#ThoiGian").html(TimesClick(properties.time).slice(11, 16));
  //}else{document.getElementById("contextMenu2").style.display = 'none'}
});

timeline.on("click", function (props) {
  document.getElementById("contextMenu").style.display = "none";
});
timeline.on("contextmenu", function (props) {
  $("#biensomenu").html("");
  document.getElementById("FormSCC").reset();
  if (props.item) {
    console.log(props);
    if (document.getElementById("contextMenu").style.display == "block") {
      document.getElementById("contextMenu").style.display = "none";
    } else {
      var menu = document.getElementById("contextMenu");
      menu.style.display = "block";
      menu.style.left = props.pageX + "px";
      menu.style.top = props.pageY + "px";
    }
    var ojb = useCaher;
    for (var a in ojb) {
      if (ojb[a].MaSo == props.item) {
        document.getElementById("BienSoXe").value = ojb[a].BienSoXe;
        var start = new Date(DoiNgayDangKy(ojb[a].TimeStartGJ));
        var end = new Date(DoiNgayDangKy(ojb[a].TimeEndGJ));

        var chiudaichip = end - start;

        $("#ChieuDaiChip").val(chiudaichip);

        $("#biensomenu").html(ojb[a].BienSoXe);
        changvalue();
        timeSuaChua();
      }
    }
    $("#TTHuyChip").val(props.item);
  }
  props.event.preventDefault();
});
function clearitem() {
  items.clear();
  LoadTimeLine()
}
function LoadTimeLine() {
  items.clear();
  $("#XeChoSuaChua").html("");
  $("#XeDungCV").html("");
  setgiaoxe()
  var dataArray0 = useCaher;

  var dataArray1 = dataArray0.filter(function (r) { return (r.LoaiHinhSuaChua === "EM" || r.LoaiHinhSuaChua === "SCC" || r.LoaiHinhSuaChua === "EM60"); });
  dataArray1.sort(function (a, b) { return a.TrangThaiXuong < b.TrangThaiXuong ? 1 : -1; });
  console.log("update");
  for (var a in dataArray1) {
    r = dataArray1[a];
    var hoanthanh = document.getElementById("checkbox-3").checked;
    var tthen = "";
    var start = new Date(DoiNgayDangKy(r.TimeStartGJ));
    var timeNow = new Date();
    var end = new Date(DoiNgayDangKy(r.TimeEndGJ));
    var khoang,
      mau = "",
      edit1 = {
        add: false, // add new items by double tapping
        updateTime: true, // drag items horizontally
        updateGroup: true, // drag items from one group to another
        remove: false, // delete an item by tapping the delete button top right
        overrideItems: true, // allow these options to override item.editable
      };

    if (r.TrangThaiSCC == "Đang SC") { mau = "green"; }
    if (r.TrangThaiSCC == "Dừng SC") { mau = "red"; }
    if (r.TrangThaiSCC == "Chờ SC") { mau = "orange"; }
    if (r.TrangThaiSCC == "Đã SC") { mau = "magenta"; }
    if (r.TrangThaiHen == "Đúng Giờ") { tthen = "DungGio"; }
    if (r.TrangThaiHen == "Đến Sớm") { tthen = "DenSom"; }
    if (r.TrangThaiXuong == "04 Đã Tiếp Nhận" && r.TimeStartGJ == null) {
      additembienso(r.BienSoXe, r.MaSo, "success Datiepnhan", tthen, r.LoaiHinhSuaChua, r.CoVanDichVu);
    }
    if (r.TrangThaiXuong == "03 Đang Tiếp Nhận" && r.TimeStartGJ == null) {
      additembienso(r.BienSoXe, r.MaSo, "success", tthen, r.LoaiHinhSuaChua, r.CoVanDichVu);
    }
    if ((r.TrangThaiXuong == "02 Chờ Tiếp Nhận" || r.TrangThaiXuong == "02 Chuẩn Bị Tiếp") && r.TimeStartGJ == null) {
      additembienso(r.BienSoXe, r.MaSo, "outline-secondary btn-sm", tthen, r.LoaiHinhSuaChua, r.CoVanDichVu);
    }
    if (r.TrangThaiXuong == "05 Dừng Công Việc") { additembiensodung(r.BienSoXe, r.MaSo, "danger", r.LoaiHinhSuaChua); }
    if (r.TimeEndGJ) { var endRX = new Date(DoiNgayDangKy(r.TimeEndGJ).valueOf() + 15 * 60 * 1000); }
    if (new Date(DoiNgayDangKy(r.TimeEndGJ)).valueOf() < timeNow.valueOf()) { mau = "magenta"; }
    if (r.TrangThaiSCC !== "Dừng CV") {
      if (hoanthanh && r.TrangThaiSCC == "Đã SC" && r.TimeStartGJ) {
        items.update({
          className: mau,
          id: r.MaSo,
          group: r.KhoangSuaChua,
          start: start,
          end: end,
          editable: edit1,
          //title:r.CoVanDichVu,
          content: r.BienSoXe + " " + r.KyThuatVien1,
        });
      }
      if (r.TrangThaiSCC != "Đã SC" && r.TimeStartGJ) {
        items.update({
          className: mau,
          id: r.MaSo,
          group: r.KhoangSuaChua,
          start: start,
          end: end,
          editable: edit1,

          //title:r.CoVanDichVu,
          content: r.BienSoXe + " " + r.KyThuatVien1,
        });
      }


      if (r.KhachRuaXe == "Rửa Xe" && r.TrangThaiXuong != "08 Chờ Giao Xe" && r.TimeEndGJ) {
        var classname2 = "orange";
        if (r.TrangThaiXuong == "07 Đang Rửa Xe") { classname2 = "green"; }
        items.update({
          className: classname2,
          id: r.BienSoXe + "_RuaXe",
          group: "Rửa Xe",
          start: end,
          end: endRX,
          type: "point",
          editable: edit1,
          content: r.BienSoXe + " " + r.CoVanDichVu,
        });
      }



      if (r.ThoiGianHen && document.getElementById("checkbox-hen").checked) {
        if (r.TimeStartGJ) {
        } else {
          var start = DoiNgayDangKy(r.ThoiGianHen);
          var end;
          if (r.LoaiHinhSuaChua == "EM" || r.LoaiHinhSuaChua == "EM60") { end = new Date(1000 * 60 * 29 + new Date(start).valueOf()); }
          if (r.LoaiHinhSuaChua == "SCC" || r.LoaiHinhSuaChua == "FIR") { end = new Date(1000 * 60 * 59 + new Date(start).valueOf()); }
          if (r.NoiDungHen.toUpperCase().indexOf("BD40K") >= 0) {
            end = new Date(1000 * 60 * 59 + new Date(start).valueOf());
          }
          if (r.NoiDungHen.toUpperCase().indexOf("BD80K") >= 0) {
            end = new Date(1000 * 60 * 59 + new Date(start).valueOf());
          }
          if (r.NoiDungHen.toUpperCase().indexOf("LEXUS") >= 0) {
            end = new Date(1000 * 60 * 59 + new Date(start).valueOf());
          }
          var classnamehen = "blue";
          if (r.TDGapLeTan) {
            classnamehen = "orange";
          }
          items.update({
            className: classnamehen,
            id: r.BienSoXe + "_Hen",
            group: r.KhoangSuaChua,
            start: start,
            end: end,
            editable: edit1,
            content: r.BienSoXe + " [H]",
            title: r.BienSoXe + "<br>" + r.NoiDungHen + "<br>" + r.NguoiDatHen,
          });
        }
      }


    }
  }
  timeline.redraw();

  document.getElementById("loading").style.display = "none"
}
function additembienso(value, MaSo, trangthai, tthen, LoaiHinh, covan) {
  $("#XeChoSuaChua").html(
    $("#XeChoSuaChua").html() +
    '<button  draggable="true" style="width: 100%" ondrag="showtime(event)" dragstart="teststart(event)" ondragend="handleDragStart(event)" class="btn btn-' +
    trangthai +
    " " +
    tthen +
    " " +
    LoaiHinh +
    '" value="' +
    MaSo +
    '"  data-toggle="tooltip" data-placement="top" title="' + covan + '" ondblclick=clickbienso("' + value + '") >' +
    value +
    "</button >"
  );
}
function additembiensodung(value, MaSo, trangthai, LoaiHinh) {
  $("#XeDungCV").html(
    $("#XeDungCV").html() +
    '<button draggable="true" tyle="width: 100%" ondrag="showtime(event)" ondragend="handleDragStart(event)" class="btn btn-' +
    trangthai +
    " " +
    LoaiHinh +
    '" value="' +
    MaSo +
    '" ondblclick=clickbienso("' + value + '")  >' +
    value +
    "</button>"
  );
}

function showtime(event) {
  event.dataTransfer.effectAllowed = "move";
  var timelineProperties = timeline.getEventProperties(event);
  var menu = document.getElementById("contextMenu2");
  menu.style.display = "block";
  menu.style.left = timelineProperties.pageX + "px";
  menu.style.top = timelineProperties.pageY + 15 + "px";
  $("#ThoiGian").html(
    TimesClick(timelineProperties.time) + "<br>" + timelineProperties.group
  );
}

function handleDragStart(event) {
  var dragSrcEl = event.target;
  event.dataTransfer.effectAllowed = "move";
  var timelineProperties = timeline.getEventProperties(event);
  var maso = event.target.attributes.value.textContent;
  let text = "Chạy Chip Tiến Độ Xe " + dragSrcEl.innerHTML;
  var KTV1 = "None",
    KTV2 = "None",
    NhomSC = "None";
  document.getElementById("contextMenu2").style.display = "none";
  if (timelineProperties.group == "EM 01") {
    NhomSC = "EM";
    KTV1 = "Vinh";
    KTV2 = "Hưng";
  }
  if (timelineProperties.group == "EM 02") {
    NhomSC = "EM";
    KTV1 = "Đ Anh";
    KTV2 = "Khoa";
  }
  if (timelineProperties.group == "EM 03") {
    NhomSC = "EM";
    KTV1 = "Hiển";
    KTV2 = "Cường";
  }
  if (timelineProperties.group == "EM 04") {
    NhomSC = "EM";
    KTV1 = "Trí";
    KTV2 = "";
  }
  if (timelineProperties.group == "SCC 05") {
    NhomSC = "Bạo";
    KTV1 = "Phước";
    KTV2 = "";
  }
  if (timelineProperties.group == "SCC 06") {
    NhomSC = "Bạo";
    KTV1 = "Hiếu";
    KTV2 = "";
  }
  if (timelineProperties.group == "SCC 07") {
    NhomSC = "Bạo";
    KTV1 = "Duy";
    KTV2 = "";
  }
  if (timelineProperties.group == "SCC 08") {
    NhomSC = "Hoan";
    KTV1 = "Lâm";
    KTV2 = "";
  }
  if (timelineProperties.group == "SCC 09") {
    NhomSC = "Hoan";
    KTV1 = "Sơn";
    KTV2 = "";
  }
  if (timelineProperties.group == "SCC 10") {
    NhomSC = "Hoan";
    KTV1 = "Thiên";
    KTV2 = "";
  }

  //if (confirm(text) == true) {
  var json2 = {
    TimeStartGJ: TimesClick(new Date(timelineProperties.time)),
    TrangThaiSCC: "Chờ SC",
    //TrangThaiXuong: "04 Đã Tiếp Nhận",
    KhoangSuaChua: timelineProperties.group,
    TimeEndGJ: TimesClick(
      new Date(1000 * 60 * ChipGJ + new Date(timelineProperties.time).valueOf())
    ),
    KyThuatVien1: KTV1,
    KyThuatVien2: KTV2,
    NhomKTV: NhomSC,
  };
  postData(json2, urlTX + "/" + checkID(maso), "PATCH");
}

function huyChip(item) {
  item = $("#TTHuyChip").val();
  var ojb = useCaher;
  for (var a in ojb) {
    if (ojb[a].MaSo == item) {
      delete ojb[a].NhomKTV;
      delete ojb[a].KyThuatVien1;
      delete ojb[a].KyThuatVien2;
      delete ojb[a].TimeStartGJ;
      delete ojb[a].TimeEndGJ;
      ojb[a].TrangThaiSCC = "Chờ SC";
      ojb[a].TrangThaiXuong = "04 Đã Tiếp Nhận";

      let text = "Bạn muốn Xóa Chíp Tiếp Độ: " + ojb[a].BienSoXe;
      if (
        confirm(text) == true &&
        (localStorage.getItem("PhanQuyen") == "DieuPhoi" ||
          localStorage.getItem("PhanQuyen") == "admin")
      ) {
        $.ajax({
          url: urlTX + "/" + ojb[a].id,
          type: "PUT",
          data: ojb[a],
          success: function (data) {
            getData();
          },
        });
      } else {
        alert("Bạn không Thể xóa chíp");
      }
    }
  }
}

function redraw() {
  timeline.redraw();
}
function capnhatthoigian(item) {
  var ojb = useCaher;

  var a = new Date(item.start).valueOf();
  var b = new Date(item.end).valueOf();

  if (item.id && a < b) {
    var json2 = {
      TimeStartGJ: TimesClick(item.start),
      TimeEndGJ: TimesClick(item.end),
      KhoangSuaChua: item.group,
      //TrangThaiSCC: "Chờ SC",
      // KyThuatVien1: KTV1,
      // KyThuatVien2: KTV2,
      // NhomKTV: NhomSC,
    };

    for (var a in ojb) {
      if (ojb[a].MaSo == item.id) {
        if (ojb[a].KhoangSuaChua !== item.group) {
          json2['TrangThaiSCC'] = "Chờ SC"
        }

      }
    }
    postData(json2, urlTX + "/" + checkID(item.id), "PATCH");
  } else {
    alert(item.id + " loi");
  }
}
function changdate(value) {

  var option1 = {
    start: new Date(new Date(value).valueOf()).setHours(7),
    end: new Date(new Date(value).valueOf()).setHours(18),
  };

  timeline.setOptions(option1);
}