

$.ajax({
  url: "https://morning-chill-hammer.glitch.me/ThongSo/",
  type: 'GET',
  success: function (data) {
    localStorage.setItem("ThongSo", JSON.stringify(data))
  }
})

var ThongSo = JSON.parse(localStorage.getItem("ThongSo"))
var NhomTN = ["Có Hẹn", "Tiếp Nhận"];
var NhomCV = ["Trực", "Khải"]
var NhomDH = ["BDN", "SCC", "Đồng Sơn", "Báo Giá BH"]
var LoaiHinhSCC = ["BDN", "SCC"];
var LoaiHinhBP = ["Đồng Sơn", "Báo Giá BH"];
var KhoangSC = ["BD01", "BD02", "BD03", "BD04", "BD05"]
var KTVDong = ["Body01", "Body02", "Body03", "Body04", "Body05"]
var KTVSon01 = ["Paint101", "Paint102", "Paint103", "Paint104"]
var KTVSon02 = ["Paint201", "Paint202", "Paint203", "Paint204"]
var NhomSon = ["KTVSon01", "KTVSon02"]
var PhongSon = ["Phòng Sơn 01", "Phòng Sơn 02",]
var KhoangKoSuDung = Object.values(ThongSo.filter(function (r) { return r.id == "KhoangKoSuDung" })[0].value)
var ChipGJ = 30
var ChipDS = 60
var KTVDongSon = ["Châu", "Trường", "Phúc", "Trương", "Định", "Đình", "Thành", "Lưu", "Hùng", "Lâm", "Duy", "Tài", "Thiên", "Dũng", "Lực", "Tú", "Chương", "Đồng", "Quốc", "Lưu"];
var NhomKTV = ["BDN", "SCC01", "SCC02"]
var KTVSC01 = ["BDN01", "BDN02", "BDN03"]
var KTVSC02 = ["SCC101", "SCC102", "SCC103"]
var KTVSC03 = ["SCC201", "SCC202", "SCC203"]
var ThuTuEM = Object.values(ThongSo.filter(function (r) { return r.id == "ThuTuEM" })[0].value)
var ListXe = ["Camry", "Inova", "Fortuner", "Altis", "Altis Cross", "Veloz", "Wigo", "Land Cruiser", "Land Prado", "Hilander", "Rav4", "Vios", "Rush", "Avanza", "Raize", "Lexus"];
var urlTX = "https://morning-chill-hammer.glitch.me/XeTrongXuong";
var urlDG = "https://morning-chill-hammer.glitch.me/XeDaGiao";
var urlSetting = "https://morning-chill-hammer.glitch.me/Setting/";
var urlThongSo = "https://morning-chill-hammer.glitch.me/ThongSo/"
var urlUser = "https://morning-chill-hammer.glitch.me/User/"
var KhuVucVT = ["Bà Rịa", "Vũng Tàu", "Long Điền", "Phú Mỹ", "Đất Đỏ", "Châu Đức", "Xuyên Mộc", "Côn Đảo", "KV Khác"];
var useCaher;
var MasterData
var TenCoVan = localStorage.getItem("Ten");
var PhanQuyen = localStorage.getItem("PhanQuyen");
var emailnhanvienhen = "quipham@toyotavungtau.com";








function DoiNgayDangKy(ngayhen) {
  var aa;
  if (ngayhen) {
    var Thang = ngayhen.slice(3, 5);
    var Ngay = ngayhen.slice(0, 2);
    var Nam = ngayhen.slice(6, 10);
    var Gio = ngayhen.slice(11, 13);
    var Phut = ngayhen.slice(14, 16);
    var ThoiGianMoi =
      Nam + "-" + Thang + "-" + Ngay + "T" + Gio + ":" + Phut + ":00Z";
    var aa = new Date(ThoiGianMoi);
    aa = new Date(aa - 7 * 60 * 60 * 1000);
  }
  return aa;
}

function TimesClick(data) {
  if (data) {
    var use = new Date(data);
  } else {
    var use = new Date();
  }
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
  return Ngay + "/" + Thang + "/" + Nam + " " + Gio + ":" + Phut + ":00";
}

function Doingay2(use) {
  use = new Date(use);
  var Thu = use.getDay() + 1;
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
  var ThoiGian =
    Gio + ":" + Phut + " Thứ " + Thu + " ngày " + Ngay + "/" + Thang + " ";
  return ThoiGian;
}


checkPhanQuyen();
function checkPhanQuyen() {
  var PhanQuyen = localStorage.getItem("PhanQuyen");
  var BoPhan = localStorage.getItem("BoPhan")
  if (PhanQuyen == "admin" || PhanQuyen == "LeTan") {
    $("#fonmid").show();
  }
  if (PhanQuyen == "admin") {
    $("#Setting").show()

  } else {
    $("#Setting").hide()

  }
  if (BoPhan == "admin" || PhanQuyen == "admin") {
    $("#PQDichVu2").show()
    $("#PQPhuKien").show()
    $("#PQKinhDoanh").show()

    $("#PQCoVan").show()

  }
  if (BoPhan == "Dịch Vụ") {
    $("#PQDichVu2").show()


    if (PhanQuyen == "CoVandichvu" || PhanQuyen == "admin") {
      $("#PQCoVan").show()

    }
  }
  if (BoPhan == "Phụ Kien") {
    $("#PQPhuKien").show()

  }
  if (BoPhan == "Kinh Doanh") {
    $("#PQKinhDoanh").show()

  }

} if (BoPhan == "Phụ Kien") {
  document.getElementById("PQPhuKien").style.display = "block"
}
if (BoPhan == "Kinh Doanh") {
  document.getElementById("PQKinhDoanh").style.display = "block"
}



function Doingay(use) {
  var ThoiGian = "Chưa XN";
  if (use) {
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
  }
  return ThoiGian;
}
function ngayGiohen(ngayhen) {
  var Thang = ngayhen.slice(3, 5);
  var Ngay = ngayhen.slice(0, 2);
  var Nam = ngayhen.slice(6, 10);
  var Gio = ngayhen.slice(11, 13);
  var Phut = ngayhen.slice(14, 16);
  var NgayThang = Ngay + "/" + Thang + "/" + Nam;
  var use = {};
  use.ngaythang = NgayThang;
  use.giophut = Gio + ":" + Phut + ":00";

  return use;
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

$(".Ngay").datetimepicker({
  format: "dd/mm/yyyy HH:MM:00 ",
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
$(".Ngay2").datetimepicker({
  format: "dd/mm/yyyy HH:MM:00 ",
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

function datevalue(value) {
  var NgayHoanThanh = new Date(value);
  NgayHoanThanh = new Date(NgayHoanThanh * 1 + 7 * 60 * 60 * 1000);
  var aa = NgayHoanThanh.toJSON();
  var bb = aa.slice(0, aa.length - 5);
  return bb;
}
function TaoMaSo(ngayhen) {
  var Thang = ngayhen.slice(3, 5);
  var Ngay = ngayhen.slice(0, 2);
  var Nam = ngayhen.slice(6, 10);
  var MaSo = "TVT" + Nam + Thang + Ngay + "_";
  return MaSo;
}

function ngaydathen() {
  var datehen = document.getElementById("ngaydathenval").value;
  let optionngay = {
    //clickToUse:true,
    verticalScroll: true,
    zoomable: false,
    start: new Date(datehen).setHours(6),
    end: new Date(datehen).setHours(17),
  };
  timeline.setOptions(optionngay);
}

function canhBaoThanhCong(tieude, noidung) {
  var alert =
    ' <div class="alert alert-success" role="alert" data-delay="10000">' +
    ' <h4 class="alert-heading">Thành Công!</h4>' +
    "<p>Đăng Ký Thành công biến số xe</p>" +
    "</div>" +
    $("#alert").html($("#alert").html() + alert);
}

// function checkMasterData(myValue) {
//   var thongtinkhachhang
//   myValue = myValue.replace(" ", "");
//   myValue = myValue.replace("-", "");
//   myValue = myValue.replace(".", "");
//   if (MasterData) {
//     return thongtinkhachhang = MasterData.filter(function (r) { return r.BienSoXe == myValue })
//   }

// }
