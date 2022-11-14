var items = new vis.DataSet();
var container = document.getElementById("mytimeline");
var groups = new vis.DataSet();
var today = vis.moment(vis.moment.utc("+7:00").format('YYYY-MM-DDT00:00:00.000Z'));

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
    document.getElementById("loading").style.display = "block"
    var json2 = {
      TimeStartGJ: item.start,
      TimeEndGJ: item.end,
      KhoangSuaChua: item.group
    };
    postData(json2, urlTX + "/" + item.id, "PATCH")
  },
  onAdd: function (item) { },
  onUpdate: function (item) {
    $.ajax({
      url: urlTX + "/" + item.id,
      type: 'GET',
      success: function (data) {
        var key = Object.keys(data)
        var value = Object.values(data)
        for (a in key) {
          $(`#${key[a]}`).val(value[a])
          if (key[a] == "TimeEndGJ") {
            var TimeEndGJ = new Date(new Date(value[a]).valueOf() + 7 * 60 * 60 * 1000).toJSON().slice(0, value[a].length - 8);
            $(`#${key[a]}`).val(TimeEndGJ)
          }
        }
        $("#ModalSCC").modal("show")
      }
    })
  },

  timeAxis: { scale: "minute", step: 15 },
  orientation: "top",
  start: new Date(new Date().valueOf()).setHours(7),
  end: new Date(new Date().valueOf()).setHours(18),
  editable: true,
  autoResize: true,
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
// groups.add({
//   id: "Rửa Xe",
//   content: "Rửa Xe",
// });
var timeline = new vis.Timeline(container, items, groups, options);

$("#mytimeline").mouseleave(function () {
  document.getElementById("contextMenu2").style.display = "none";
});
timeline.on("mouseOver", function (properties) {
  document.getElementById("contextMenu2").style.display = "none";
});


timeline.on("mouseMove", function (properties) {
  var menu = document.getElementById("contextMenu2");
  menu.style.display = "block";
  menu.style.left = properties.pageX + "px";
  menu.style.top = properties.pageY + 15 + "px";
  var aa = properties.time;
  $("#ThoiGian").html(new Date(properties.time).toLocaleTimeString());
});

timeline.on("click", function (props) {
  document.getElementById("contextMenu").style.display = "none";
});
timeline.on("contextmenu", function (props) {
  $("#biensomenu").html("");
  document.getElementById("FormSCC").reset();
  if (props.item) {
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
      if (ojb[a].id == props.item) {
        document.getElementById("BienSoXe").value = ojb[a].BienSoXe;
        var start = new Date(ojb[a].TimeStartGJ);
        var end = new Date(ojb[a].TimeEndGJ);
        var chiudaichip = end - start;
        $("#ChieuDaiChip").val(chiudaichip);
        $("#biensomenu").html(ojb[a].BienSoXe);
        //changvalue();
        // timeSuaChua();
      }
    }
    $("#TTHuyChip").val(props.item);
  }
  props.event.preventDefault();
});
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
function clearitem() {
  items.clear();
  LoadTimeLine()
}
function LoadTimeLine() {
  items.clear();
  $("#XeChoSuaChua").html("");
  $("#XeDungCV").html("");
  var dataArray0 = useCaher;
  var dataArray1 = dataArray0.filter(function (r) { return (r.LoaiHinhSuaChua === "EM" || r.LoaiHinhSuaChua === "SCC" || r.LoaiHinhSuaChua === "EM60"); });
  dataArray1.sort(function (a, b) { return a.TrangThaiXuong < b.TrangThaiXuong ? 1 : -1; });
  for (var a in dataArray1) {
    r = dataArray1[a];
    var hoanthanh = document.getElementById("checkbox-3").checked;
    var tthen = "";
    var start = new Date(r.TimeStartGJ);
    var timeNow = new Date();
    var end = new Date(r.TimeEndGJ);
    if (end.getHours() >= 17) { end = new Date(end.valueOf() + 18 * 60 * 60 * 1000); end.setHours(8) }
    var khoang, mau = "", edit1 = {
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
      additembienso(r.BienSoXe, r.id, "success Datiepnhan", tthen, r.LoaiHinhSuaChua, r.CoVanDichVu);
    }
    if (r.TrangThaiXuong == "03 Đang Tiếp Nhận" && r.TimeStartGJ == null) {
      additembienso(r.BienSoXe, r.id, "success", tthen, r.LoaiHinhSuaChua, r.CoVanDichVu);
    }
    if ((r.TrangThaiXuong == "02 Chờ Tiếp Nhận" || r.TrangThaiXuong == "02 Chuẩn Bị Tiếp") && r.TimeStartGJ == null) {
      additembienso(r.BienSoXe, r.id, "outline-secondary btn-sm", tthen, r.LoaiHinhSuaChua, r.CoVanDichVu);
    }
    if (r.TrangThaiXuong == "05 Dừng Công Việc") { additembiensodung(r.BienSoXe, r.MaSo, "danger", r.LoaiHinhSuaChua); }
    if (r.TimeEndGJ) { var endRX = new Date((r.TimeEndGJ).valueOf() + 15 * 60 * 1000); }
    if (new Date(r.TimeEndGJ).valueOf() < timeNow.valueOf()) { mau = "magenta"; }
    if (r.TrangThaiSCC !== "Dừng CV") {
      if (hoanthanh && r.TrangThaiSCC == "Đã SC" && r.TimeStartGJ) {
        items.update({
          className: mau,
          id: r.id,
          group: r.KhoangSuaChua,
          start: start,
          end: end,
          editable: edit1,
          content: r.BienSoXe,
        });
      }
      if (r.TrangThaiSCC != "Đã SC" && r.TimeStartGJ) {
        items.update({
          className: mau,
          id: r.id,
          group: r.KhoangSuaChua,
          start: start,
          end: end,
          editable: edit1,
          content: r.BienSoXe,
        });
      }
      // if (r.KhachRuaXe == "Rửa Xe" && r.TrangThaiXuong != "08 Chờ Giao Xe" && r.TimeEndGJ) {
      //   var classname2 = "orange";
      //   if (r.TrangThaiXuong == "07 Đang Rửa Xe") { classname2 = "green"; }
      //   items.update({
      //     className: classname2,
      //     id: r.BienSoXe + "_RuaXe",
      //     group: "Rửa Xe",
      //     start: end,
      //     end: endRX,
      //     type: "point",
      //     editable: edit1,
      //     content: r.BienSoXe + " " + r.CoVanDichVu,
      //   });
      // }
    }
  }
  timeline.redraw();
  document.getElementById("loading").style.display = "none"
}
function additembienso(value, id, trangthai, tthen, LoaiHinh, covan) {
  $("#XeChoSuaChua").html(
    $("#XeChoSuaChua").html() +
    '<button  draggable="true" style="width: 100%" ondrag="showtime(event)" dragstart="teststart(event)" ondragend="handleDragStart(event)" class="btn btn-' +
    trangthai +
    " " +
    tthen +
    " " +
    LoaiHinh +
    '" value="' +
    id +
    '"  data-toggle="tooltip" data-placement="top" title="' + covan + '" ondblclick=clickbienso("' + value + '") >' +
    value +
    "</button >"
  );
}
function additembiensodung(value, id, trangthai, LoaiHinh) {
  $("#XeDungCV").html(
    $("#XeDungCV").html() +
    '<button draggable="true" tyle="width: 100%" ondrag="showtime(event)" ondragend="handleDragStart(event)" class="btn btn-' +
    trangthai +
    " " +
    LoaiHinh +
    '" value="' +
    id +
    '" ondblclick=clickbienso("' + value + '")  >' +
    value +
    "</button>"
  );
}



function handleDragStart(event) {
  var dragSrcEl = event.target;
  event.dataTransfer.effectAllowed = "move";
  var timelineProperties = timeline.getEventProperties(event);
  var id = event.target.attributes.value.textContent;
  //if (confirm(text) == true) {
  var json2 = {
    TimeStartGJ: new Date(timelineProperties.time),
    TrangThaiSCC: "Chờ SC",
    KhoangSuaChua: timelineProperties.group,
    TimeEndGJ: new Date(1000 * 60 * ChipGJ + new Date(timelineProperties.time).valueOf())
  };
  postData(json2, urlTX + "/" + id, "PATCH");
}

function huyChip(item) {
  item = $("#TTHuyChip").val();
  var ojb = useCaher;
  for (var a in ojb) {
    if (ojb[a].id == item) {
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
      TimeStartGJ: item.start,
      TimeEndGJ: item.end,
      KhoangSuaChua: item.group
    };
    var aa = ojb.filter(function (r) { return r.MaSo == item.id })
    for (var a in aa) {
      if (aa[a].MaSo == item.id) {
        if (aa[a].KhoangSuaChua !== item.group) {
          json2['TrangThaiSCC'] = "Chờ SC"
        }
      }
    }
    postData(json2, urlTX + "/" + item.id, "PATCH");
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
function backwardtime() {
  Ngay = document.getElementById("datefield").value;
  var today = new Date(new Date(Ngay).valueOf() - 24 * 60 * 60 * 1000);
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;

  var option1 = {
    start: new Date(new Date(today).valueOf()).setHours(7),
    end: new Date(new Date(today).valueOf()).setHours(18),
  };
  timeline.setOptions(option1);
  document.getElementById("datefield").value = today;
}
function forwardtime() {
  Ngay = document.getElementById("datefield").value;
  var today = new Date(new Date(Ngay).valueOf() + 24 * 60 * 60 * 1000);
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = yyyy + "-" + mm + "-" + dd;

  var option1 = {
    start: new Date(new Date(today).valueOf()).setHours(7),
    end: new Date(new Date(today).valueOf()).setHours(18),
  };
  timeline.setOptions(option1);
  document.getElementById("datefield").value = today;
}


NhomSC(NhomKTV);
function NhomSC(values) {
  var list = document.getElementById("NhomKTV");
  for (var i = 0; i < values.length; i++) {
    var option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    list.appendChild(option);
  }
}
function changeNhom() {
  var nhom = document.getElementById("NhomKTV").value;
  var json2 = {
    NhomKTV: $("#NhomKTV").val(),
  };
  postData(json2, urlTX + "/" + checkID($(MaSo).val()), "PATCH");
  if (nhom == "Bạo") {
    NhanVienDropDown(KTVBao);
  }
  if (nhom == "Hoan") {
    NhanVienDropDown(KTVHoan);
  }
  if (nhom == "EM") {
    NhanVienDropDown(KTVEM);
  }
}

KhoangSuaChua(KhoangSC);
function KhoangSuaChua(values) {
  var list = document.getElementById("KhoangSuaChua");
  for (var i = 0; i < values.length; i++) {
    var option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    list.appendChild(option);
  }
}
CoVanlist(NhomCV);
function CoVanlist(values) {
  var list = document.getElementById("CoVanDichVu");
  for (var i = 0; i < values.length; i++) {
    var option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    list.appendChild(option);
  }
}
$(".Ngay").datetimepicker({
  format: "yyyy-mm-dd HH:MM:00",
  uiLibrary: "bootstrap4",
  modal: true,
  footer: true,
  datepicker: {
    disableDates: function (date) {
      const currentDate = new Date().setHours(0, 0, 0, 0);
      return date.setHours(0, 0, 0, 0) >= currentDate ? true : false;
    },
  },
});