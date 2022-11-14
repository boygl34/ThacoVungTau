



function getValueALL() {
  var use = {
    MaSo: $("#MaSo").val(),
    BienSoXe: $("#BienSoXe").val(),
    // TenKH: $("#TenKH").val(),
    // SoThe: $("#SoThe").val(),
    //TrangThaiHen: $("#TrangThaiHen").val(),
    TDHenGiaoXe: $("#TDHenGiaoXe").val(),
    LoaiHinhSuaChua: $("#LoaiHinh").val(),
    LoaiHinhDongSon: $("#LoaiHinhBP").val(),
    TDGapLeTan: new Date().toISOString(),
    TrangThaiXuong: "02 Chờ Tiếp Nhận",
    CoVanDichVu: localStorage.getItem("Ten"),
  };
  if (LoaiHinh.value) {
    use["TrangThaiSCC"] = "Chờ SC";
  } else {
    use["TrangThaiSCC"] = "";
  }
  if (LoaiHinhBP.value) {
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

function HuyDK() {
  let text = "Hủy Tiếp Nhận";
  if (confirm(text) == true) {
    var MaSo = $("#MaSo").val();

    try {
      json3 = { TrangThaiXuong: "02 Hủy Tiếp Nhận" };

      fetch(urlTX + "/" + checkID(MaSo), {
        method: "PATCH", // or 'PUT'
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json3),
      })
        .then((response) => response.json())
        .then((data) => {
          $.ajax({
            url: "https://script.google.com/macros/s/AKfycbxIfaWmzDpVW3erjRGP6y-da5aEOKaG5tKrQYz-wrqSpHKqPU0zNqsc_BUxZ-bhEnKL/exec",
            method: "GET",
            mode: "no-cors",
            credentials: "omit",
            referrerPolicy: "no-referrer",
            dataType: "json",
            data: data,
          });

          var data2 = data;
          delete data2.id;
          postData(data2, urlDG, "POST");
          deleteData(urlTX + "/" + checkID(data.MaSo));
        });
    } catch (error) {
      alert("Lỗi : " + error);
    }
  }
}
function CapNhat() {
  $("#mesenge").html(
    "<div class='alert alert-success'><div class='spinner-border text-success' role='status'><span class='sr-only'>Loading...</span></div>Đang Cập Nhật</div>"
  );
  var use = {
    MaSo: $("#MaSo").val(),
    BienSoXe: $("#BienSoXe").val(),
    TenKH: $("#TenKH").val(),
    SoThe: $("#SoThe").val(),
    TrangThaiHen: $("#TrangThaiHen").val(),
    LoaiHinhSuaChua: $("#LoaiHinh").val(),
    LoaiHinhDongSon: $("#LoaiHinhBP").val(),
    TrangThaiXuong: "02 Chờ Tiếp Nhận",
    CoVanDichVu: $("#CoVanDichVu").val(),
  };
  if (LoaiHinh.value) {
    use["TrangThaiSCC"] = "Chờ SC";
  } else {
    use["TrangThaiSCC"] = "";
  }
  if (LoaiHinhBP.value) {
    use["CongDoanDongSon"] = "Chờ SC";
    use["TrangThaiDongSon"] = "Chờ SC";
  } else {
    use["CongDoanDongSon"] = "";
    use["TrangThaiDongSon"] = "";
  }
  postData(use, urlTX + "/" + checkID($("#MaSo").val()), "PATCH");
}

function changvalue() {
  var ojb = useCaher;
  getValueALL();
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
      if (ojb[a].CoVanDichVu) {
        document.getElementById("CoVanDichVu").value = ojb[a].CoVanDichVu;
      }
      if (ojb[a].LoaiHinhDongSon) {
        document.getElementById("LoaiHinhBP").value = ojb[a].LoaiHinhDongSon;
      }
      if (ojb[a].LoaiHinhSuaChua) {
        document.getElementById("LoaiHinh").value = ojb[a].LoaiHinhSuaChua;
      }
      if (ojb[a].ThoiGianHen) {
        document.getElementById("GioHen").value = Doingay(
          DoiNgayDangKy(ojb[a].ThoiGianHen)
        );
      }
      if (ojb[a].CoVanDichVu) {
        document.getElementById("CoVanDichVu").value = ojb[a].CoVanDichVu;
      }
      if (ojb[a].NoiDungHen) {
        document.getElementById("NoiDungCV").value = ojb[a].NoiDungHen;
      }
      if (ojb[a].TenKH) {
        document.getElementById("TenKH").value = ojb[a].TenKH;
      }
      if (ojb[a].SoThe) {
        document.getElementById("SoThe").value = ojb[a].SoThe;
      }
      if (ojb[a].ThoiGianHen) {
        document.getElementById("TrangThaiHen").value = TrangThaiHen(
          ojb[a].ThoiGianHen
        );
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
}
function clickTableTiepNhan() {
  var table = document.getElementById("data-table");
  for (var i = 1; i < table.rows.length; i++) {
    table.rows[i].onclick = function () {
      var BienSoXe = this.cells[0].innerHTML;
      $("#mesenge").html("<div class='alert alert-success'>Hello!!</div>");
      NutNhan.innerHTML = "";
      NutNhan2.innerHTML = "";
      document.getElementById("myForm").reset();
      document.getElementById("MaSo").value = this.cells[9].innerHTML;
      if (BienSoXe.indexOf(" ") != -1) {
        document.getElementById("BienSoXe").value = BienSoXe.slice(
          BienSoXe.indexOf(" ") + 1,
          BienSoXe.length
        );
      } else {
        document.getElementById("BienSoXe").value = this.cells[0].innerHTML;
      }
      document.getElementById("SoThe").value = this.cells[1].innerHTML;
      document.getElementById("TenKH").value = this.cells[2].innerHTML;
      document.getElementById("GioHen").value = this.cells[3].innerHTML;
      document.getElementById("LoaiHinh").value = this.cells[4].innerHTML;
      document.getElementById("LoaiHinhBP").value = this.cells[5].innerHTML;
      document.getElementById("CoVanDichVu").value = this.cells[6].innerHTML;
      changvalue();
      if (this.cells[7].innerHTML == "Chờ Tiếp Nhận") {
        NutNhan.innerHTML =
          '<button type="button" class="btn btn-primary" onclick="CapNhat()" >Cập Nhật</button>&emsp;<button type="button" class="btn btn-primary" onclick="ChuanBi()" >Chuẩn Bị Tiếp</button>';
        NutNhan2.innerHTML =
          '<button type="button" class="btn btn-success" onclick="DangTiepNhan()" >Bắt Đầu Tiếp Khách</button>&emsp;<button type="button" class="btn btn-danger" onclick="HuyDK()" >Hủy TN</button>';
      }
      if (this.cells[7].innerHTML == "Chuẩn Bị Tiếp") {
        NutNhan.innerHTML =
          '<button type="button" class="btn btn-primary" onclick="CapNhat()" >Cập Nhật</button>&emsp;<button type="button" class="btn btn-primary" onclick="ChoTiepNhan()" >Chờ Tiếp Nhận</button>';
        NutNhan2.innerHTML =
          '<button type="button" class="btn btn-success" onclick="DangTiepNhan()" >Bắt Đầu Tiếp Khách</button>&emsp;<button type="button" class="btn btn-danger" onclick="HuyDK()" >Hủy TN</button>';
      }
      if (this.cells[7].innerHTML == "Đang Tiếp Nhận") {
        NutNhan.innerHTML =
          '<button type="button" class="btn btn-primary" onclick="CapNhat()" >Cập Nhật</button>&emsp;<button type="button" class="btn btn-primary" onclick="ChoTiepNhan()" >Chờ Tiếp Nhận</button>';
        NutNhan2.innerHTML = "";
      }
    };
  }
}
function clickTableTiepNhanHen() {
  var table = document.getElementById("data-table-hen");
  $("#mesenge").html("<div class='alert alert-success'>Hello!!</div>");
  for (var i = 1; i < table.rows.length; i++) {
    table.rows[i].onclick = function () {
      document.getElementById("myForm").reset();
      NutNhan.innerHTML = "";
      document.getElementById("BienSoXe").value = this.cells[1].innerHTML;
      document.getElementById("GioHen").value = this.cells[0].innerHTML;
      document.getElementById("LoaiHinh").value = this.cells[4].innerHTML;
      document.getElementById("CoVanDichVu").value = this.cells[3].innerHTML;
      document.getElementById("TenKH").value = this.cells[2].innerHTML;
      document.getElementById("NoiDungCV").value = this.cells[5].innerHTML;
      document.getElementById("MaSo").value = this.cells[7].innerHTML;
      changvalue();
      NutNhan.innerHTML =
        '<button type="button" class="btn btn-primary" onclick="DangKy()" >Đăng Ký</button>';
    };
  }
}

function TrangThaiHen(NgayHen) {
  var TDhen = new Date(DoiNgayDangKy(NgayHen));
  var DenSom = (TDhen.getTime() - new Date().getTime()) / (60 * 1000);
  var DenTre = (new Date().getTime() - TDhen.getTime()) / (60 * 1000);
  var TrangThaiHen = "Không Có Hẹn";
  if ((DenSom >= 0 && DenSom <= 30) || (DenTre >= 0 && DenTre <= 0)) {
    TrangThaiHen = "Đúng Giờ";
  }
  if (DenSom <= 60 && DenSom > 30) {
    TrangThaiHen = "Đến Sớm";
  }
  if (DenTre <= 60 && DenTre > 0) {
    TrangThaiHen = "Đến Trễ";
  }
  if (DenSom > 60 || DenTre > 60) {
    TrangThaiHen = "Không Đúng Hẹn";
  }
  return TrangThaiHen;
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
setInterval(canhBao, 60000);
canhBao();
function canhBao() {
  $("#alert").html("");
  for (let a in NhomCV) {
    try {
      $.get(
        "https://big-road-newsstand.glitch.me/Setting/" + NhomCV[a],
        function (ketqua) {
          if (ketqua.TrangThai == "DungTN") {
            var alert =
              '<div class="alert alert-warning alert-dismissible fade show"  role="alert"style="z-index: 20;">' +
              "<strong>" +
              NhomCV[a] +
              "! </strong>" +
              "<br>Dừng Tiếp nhận từ : " +
              ketqua.ThoiGianDung +
              "<br>Lý Do :" +
              ketqua.LyDo +
              '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
              '<span aria-hidden="true">&times;</span>' +
              "</button></div>";
            $("#alert").html($("#alert").html() + alert);
          }
        }
      );
    } catch { }
  }
}
function canhBao2(tieude, noidung, canhbao) {
  var alert =
    '<div class="alert alert-' +
    canhbao +
    ' alert-dismissible fade show"  role="alert">' +
    "<strong>" +
    tieude +
    "! </strong>" +
    noidung +
    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
    '<span aria-hidden="true">&times;</span>' +
    "</button></div>";
  $("#alert").html($("#alert").html() + alert);
}
