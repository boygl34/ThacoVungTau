



function getValueALL() {
  var use = {
    MaSo: $("#MaSo").val(),
    BienSoXe: $("#BienSoXe").val(),
    // TenKH: $("#TenKH").val(),
    // SoThe: $("#SoThe").val(),
    //TrangThaiHen: $("#TrangThaiHen").val(),
    TDHenGiaoXe: $("#TDHenGiaoXe").val(),
    LoaiHinhSuaChua: $("#LoaiHinhSuaChua").val(),
    LoaiHinhDongSon: $("#LoaiHinhDongSon").val(),
    TDGapLeTan: new Date().toISOString(),
    TrangThaiXuong: "02 Chờ Tiếp Nhận",
    CoVanDichVu: localStorage.getItem("Ten"),
  };
  if ($("#LoaiHinhSuaChua").val()) {
    use["TrangThaiSCC"] = "Chờ SC";
  } else {
    use["TrangThaiSCC"] = "";
  }
  if ($("#LoaiHinhDongSon").val()) {
    use["CongDoanDongSon"] = "Chờ SC";
    use["TrangThaiDongSon"] = "Chờ SC";
  } else {
    use["CongDoanDongSon"] = "";
    use["TrangThaiDongSon"] = "";
  }
  return use;
}

function DangKy() {
  if ($("#LoaiHinh").val() == "" && $("#LoaiHinhBP").val() == "") {
    $("#mesenge").html("<div class='alert alert-danger'>Chưa Loại Hình</div>");
    return false;
  }
  if ($("#TDHenGiaoXe").val() == "") {
    $("#mesenge").html("<div class='alert alert-danger'>Chưa có Giờ Giao Xe</div>");
    return false;
  }
  if (checkID($("#MaSo").val())) {
    postData(getValueALL(), urlTX + "/" + checkID($("#MaSo").val()), "PATCH");
  } else {
    postData(getValueALL(), urlTX, "POST");
  }
}

function GiaoXe() {

  var json2 = {
    TrangThaiXuong: "09 Đã Giao Xe",
    TDRaKhoicong: new Date().toJSON()
  }
  $.ajax({
    url: urlTX + '/' + $("#id").val(),
    method: "PATCH",
    data: json2,
    success: function (data) {
      delete data.id;
      $.ajax({
        url: urlDG,
        method: "POST",
        data: data,
        success: function (data2) {
          deleteData(urlTX + "/" + $("#id").val());
          getData()
        }
      });
    }
  });





}


function changvalue() {
  var ojb = useCaher;
  //getValueALL();
  NutNhan.innerHTML = "";
  document.getElementById("MaSo").value = TaoMaSo() + $("#BienSoXe").val();
  $("#mesenge").html("<div class='alert alert-success'>Hello!!</div>");
  NutNhan.innerHTML =
    '<button type="button" class="btn btn-primary" onclick="DangKy()" >Đăng Ký</button>';
  for (var a in ojb) {
    NutNhan.innerHTML =
      '<button type="button" class="btn btn-primary" onclick="DangKy()" >Đăng Ký</button>';
    if (ojb[a].BienSoXe == $("#BienSoXe").val()) {
      document.getElementById("BienSoXe").value = ojb[a].BienSoXe;
      if (ojb[a].MaSo) {
        document.getElementById("MaSo").value = ojb[a].MaSo;
      }
      if (ojb[a].LoaiHinhDongSon) {
        document.getElementById("LoaiHinhBP").value = ojb[a].LoaiHinhDongSon;
      }
      if (ojb[a].LoaiHinhSuaChua) {
        document.getElementById("LoaiHinh").value = ojb[a].LoaiHinhSuaChua;
      }
      if (ojb[a].SoThe) {
        document.getElementById("SoThe").value = ojb[a].SoThe;
      }
      if (ojb[a].TrangThaiXuong) {
        document.getElementById("ThongTin").value = ojb[a].TrangThaiXuong;
      }
      NutNhan.innerHTML = "";
      if (
        ojb[a].TrangThaiXuong == "00 Có Hẹn" ||
        ojb[a].TrangThaiXuong == "01 Đã Vào Cổng"
      ) {
        NutNhan.innerHTML =
          '<button type="button" class="btn btn-primary" onclick="DangKy()" >Đăng Ký</button>';
      }
      if (ojb[a].TrangThaiXuong == "02 Chuẩn Bị Tiếp") {
        NutNhan.innerHTML =
          '<button type="button" class="btn btn-primary" onclick="CapNhat()" >Cập Nhật</button>&emsp;<button type="button" class="btn btn-primary" onclick="ChoTiepNhan()" >Chờ Tiếp Nhận</button>&emsp; <button type="button" class="btn btn-danger" onclick="HuyDK()" >Hủy TN</button>';
      }
      if (ojb[a].TrangThaiXuong == "02 Chờ Tiếp Nhận") {
        NutNhan.innerHTML =
          '<button type="button" class="btn btn-primary" onclick="CapNhat()" >Cập Nhật</button>&emsp;<button type="button" class="btn btn-primary" onclick="ChuanBi()" >Chuẩn Bị Tiếp</button>&emsp;<button type="button" class="btn btn-danger" onclick="HuyDK()" >Hủy TN</button>';
      }
      if (ojb[a].MaSo !== TaoMaSo() + ojb[a].BienSoXe) {
        NutNhan.innerHTML =
          '<button type="button" class="btn btn-primary" onclick="DangKy()" >Đăng Ký</button>';
        document.getElementById("SoThe").value = "";
      }
      return;
    }
  }
}

LoadTimeLine()
//---------------------------------------------------------------------------------------------
function LoadTimeLine() {
  var dataArray0 = useCaher;
  var CoVan = TenCoVan;
  var dataArray = dataArray0.filter(function (r) {
    return r.CoVanDichVu === CoVan && r.TrangThaiXuong !== "09 Đã Giao Xe";
  });

  $("#tableTrongXuong").DataTable({
    data: dataArray,
    paging: false,
    destroy: true,
    ordering: true,
    info: false,
    searching: false,
    createdRow: function (row, data, dataIndex, cells) {
      if (data.TrangThaiDongSon == "Đang SC") {
        $(row).addClass("DangSuaChua");
      }
      if (data.TrangThaiDongSon == "Chờ SC") {
        $(row).addClass("ChoSuaChua");
      }
      if (data.TrangThaiDongSon == "Dừng SC") {
        $(row).addClass("DungSuaChua");
      }
      // $(cells[5]).html(data.TDHenGiaoXe.replace("T", " "));
      // $(cells[7]).html(Doingay(DoiNgayDangKy(data.TDKetThucSX)));
    },
    columns: [
      { data: "BienSoXe", defaultContent: "" },
      { data: "LoaiHinhSuaChua", defaultContent: "" },
      { data: "TrangThaiSCC", defaultContent: "" },
      { data: "LoaiHinhDongSon", defaultContent: "" },
      { data: "TrangThaiDongSon", defaultContent: "" },
      { data: "TDHenGiaoXe", defaultContent: "" },
      { data: "id", defaultContent: "" },
    ],
  });
  document.getElementById("loading").style.display = "none"

}


function clickTableTiepNhan() {
  var table = document.getElementById("tableTrongXuong");
  for (var i = 1; i < table.rows.length; i++) {
    table.rows[i].onclick = function () {
      var id = this.cells[6].innerHTML;
      $("#mesenge").html("<div class='alert alert-success'>Hello!!</div>");
      $.ajax({
        url: urlTX + "/" + id,
        type: 'GET',
        success: function (data) {
          console.log(data)
          var key = Object.keys(data)
          var value = Object.values(data)
          for (a in key) {
            $(`#${key[a]}`).val(value[a])
          }
          $("#NutNhan").html('<button type="button" class="btn btn-primary" onclick="GiaoXe()" >Giao Xe</button>')
        }
      })
    };
  }
}




function suabienso(myValue) {
  var myValue2 = myValue.toUpperCase();
  myValue = myValue.replace(" ", "");
  myValue = myValue.replace("-", "");
  myValue = myValue.replace(".", "");
  if (myValue.length > 5) {
    myValue = myValue.replace("[h] ", "");
    myValue = myValue.replace("[H] ", "");
    myValue = myValue.replace("[L] ", "");
    var ins = myValue.indexOf("-");
    var BiensoLD = myValue.slice(2, 4).toUpperCase();
    if (ins == "-1" && BiensoLD == "LD") {
      myValue = myValue.slice(0, 4) + "-" + myValue.slice(4, myValue.length);
    }
    if (ins == "-1" && BiensoLD != "LD") {
      myValue = myValue.slice(0, 3) + "-" + myValue.slice(3, myValue.length);
    }
    var myValue1 = myValue.replace(myValue.charAt(myValue.indexOf(".")), "");
    var soxe = myValue1.slice(myValue1.indexOf("-") + 1, myValue1.length);
    var aa = myValue1.slice(myValue1.length - 2, myValue1.length);
    if (soxe.length == 5) {
      var aaaa =
        soxe.charAt(0) +
        soxe.charAt(1) +
        soxe.charAt(2) +
        soxe.charAt(3) +
        soxe.charAt(4);
      var bbbb =
        soxe.charAt(0) +
        soxe.charAt(1) +
        soxe.charAt(2) +
        "." +
        soxe.charAt(3) +
        soxe.charAt(4);
      var myValue2 = myValue1.toString(6).replace(aaaa, bbbb).toUpperCase();
    } else {
      var myValue2 = myValue1.toUpperCase();
    }
  }
  return myValue2;
}
function CoVanDropDown(values) {
  var list = document.getElementById("CoVanDichVu");
  for (var i = 0; i < values.length; i++) {
    var option = document.createElement("option");
    option.value = values[i];
    option.text = values[i];
    list.appendChild(option);
  }
}
function BienSoDropDown() {
  var values = useCaher.map(function (r) {
    return r.BienSoXe;
  });
  var list = document.getElementById("BienSoList");
  list.innerHTML = "";
  for (var i = 0; i < values.length; i++) {
    if (values[i] != undefined) {
      var option = document.createElement("option");
      option.value = values[i];
      option.text = values[i];
      list.appendChild(option);
    }
  }
}
function TaoMaSo() {
  var use = new Date();
  var useinfo = {};
  var Thang = use.getMonth() + 1;
  var Ngay = use.getDate();
  var Nam = use.getFullYear();
  var Gio = use.getHours();
  var Phut = use.getMinutes();
  if (Thang < 10) {
    Thang = "0" + Thang;
  }
  if (Ngay < 10) {
    Ngay = "0" + Ngay;
  }
  if (Gio < 10) {
    Gio = "0" + Gio;
  }
  if (Phut < 10) {
    Phut = "0" + Phut;
  }
  useinfo.ThoiGian = Ngay + "/" + Thang + " " + Gio + ":" + Phut;
  var MaSo = "TVT" + Nam + Thang + Ngay + "_";
  return MaSo;
}
function Doingay(use) {
  use = new Date(use);
  var Thang = use.getMonth() + 1;
  var Ngay = use.getDate();
  var Nam = use.getFullYear();
  var Gio = use.getHours();
  var Phut = use.getMinutes();
  if (Thang < 10) {
    Thang = "0" + Thang;
  }
  if (Ngay < 10) {
    Ngay = "0" + Ngay;
  }
  if (Gio < 10) {
    Gio = "0" + Gio;
  }
  if (Phut < 10) {
    Phut = "0" + Phut;
  }
  var ThoiGian = Ngay + "/" + Thang + " " + Gio + ":" + Phut;
  return ThoiGian;
}
// setInterval(canhBao, 60000);
// canhBao();
// function canhBao() {
//   $("#alert").html("");
//   for (let a in NhomCV) {
//     try {
//       $.get("https://big-road-newsstand.glitch.me/Setting/" + NhomCV[a],
//         function (ketqua) {
//           if (ketqua.TrangThai == "DungTN") {
//             var alert =
//               '<div class="alert alert-warning alert-dismissible fade show"  role="alert"style="z-index: 20;">' +
//               "<strong>" +
//               NhomCV[a] +
//               "! </strong>" +
//               "<br>Dừng Tiếp nhận từ : " +
//               ketqua.ThoiGianDung +
//               "<br>Lý Do :" +
//               ketqua.LyDo +
//               '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
//               '<span aria-hidden="true">&times;</span>' +
//               "</button></div>";
//             $("#alert").html($("#alert").html() + alert);
//           }
//         }
//       );
//     } catch { }
//   }
// }
// function canhBao2(tieude, noidung, canhbao) {
//   var alert =
//     '<div class="alert alert-' +
//     canhbao +
//     ' alert-dismissible fade show"  role="alert">' +
//     "<strong>" +
//     tieude +
//     "! </strong>" +
//     noidung +
//     '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
//     '<span aria-hidden="true">&times;</span>' +
//     "</button></div>";
//   $("#alert").html($("#alert").html() + alert);
// }
