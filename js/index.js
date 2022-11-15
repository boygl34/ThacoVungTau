
var urlTX = "https://morning-chill-hammer.glitch.me/XeTrongXuong";
var urlDG = "https://morning-chill-hammer.glitch.me/XeDaGiao";
var urlThongSo = "https://morning-chill-hammer.glitch.me/ThongSo/";
var urluser = "https://morning-chill-hammer.glitch.me/User/"
var dataTX
var dataDG
var ThongSo = JSON.parse(localStorage.getItem("ThongSo"))
var NhomTN = ["Có Hẹn", "Tiếp Nhận"];
var NhomCV = Object.values(ThongSo.filter(function (r) { return r.id == "NhomCV" })[0].value)
var NhomDH = Object.values(ThongSo.filter(function (r) { return r.id == "GruopTDDatHen" })[0].value)
var KhoangSC = Object.values(ThongSo.filter(function (r) { return r.id == "KhoangScc" })[0].value)
var KTVDong = Object.values(ThongSo.filter(function (r) { return r.id == "KTVDong" })[0].value)
var KTVSon1 = Object.values(ThongSo.filter(function (r) { return r.id == "KTVSon1" })[0].value)
var KTVSon2 = Object.values(ThongSo.filter(function (r) { return r.id == "KTVSon2" })[0].value)
var PhongSon = Object.values(ThongSo.filter(function (r) { return r.id == "PhongSon" })[0].value)
var NhomSon = Object.values(ThongSo.filter(function (r) { return r.id == "NhomSon" })[0].value)
var KhoangKoSuDung = Object.values(ThongSo.filter(function (r) { return r.id == "KhoangKoSuDung" })[0].value)
var ChipGJ = Object.values(ThongSo.filter(function (r) { return r.id == "ChieuDaiChipGJ" })[0].value)[0]
var ChipDS = Object.values(ThongSo.filter(function (r) { return r.id == "ChieuDaiChipDong" })[0].value)[0]
//var KTVDongSon = ["Châu", "Trường", "Phúc", "Trương", "Định", "Đình", "Thành", "Lưu", "Hùng", "Lâm", "Duy", "Tài", "Thiên", "Dũng", "Lực", "Tú", "Chương", "Đồng", "Quốc", "Lưu"];
var NhomKTV = Object.values(ThongSo.filter(function (r) { return r.id == "NhomSCC" })[0].value)
var KTVSCC1 = Object.values(ThongSo.filter(function (r) { return r.id == "KTVScc1" })[0].value)
var KTVSCC2 = Object.values(ThongSo.filter(function (r) { return r.id == "KTVScc2" })[0].value)
var KTVEM = Object.values(ThongSo.filter(function (r) { return r.id == "KTVEM" })[0].value)
var ThuTuEM = Object.values(ThongSo.filter(function (r) { return r.id == "ThuTuEM" })[0].value)
var ListXe = ["Camry", "Inova", "Fortuner", "Altis", "Altis Cross", "Veloz", "Wigo", "Land Cruiser", "Land Prado", "Hilander", "Rav4", "Vios", "Rush", "Avanza", "Raize", "Lexus"];
var KhuVucVT = ["Bà Rịa", "Vũng Tàu", "Long Điền", "Phú Mỹ", "Đất Đỏ", "Châu Đức", "Xuyên Mộc", "Côn Đảo", "KV Khác"];
var TenCoVan = localStorage.getItem("Ten");
var PhanQuyen = localStorage.getItem("PhanQuyen");
var emailnhanvienhen = "quipham@toyotavungtau.com";

function postData(data, url, methor) {
    fetch(url, {
        method: methor,
        //mode: 'cors', // no-cors, *cors, same-origin
        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'omit', // or 'PUT'
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            getData();
        });
}
function deleteData(url) {
    fetch(url, {
        method: "DELETE", // or 'PUT'
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => response.json())
        .then((data) => {
            getData(urlTX);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function checkID(MaSo) {
    var ojb = useCaher;
    for (var a in ojb) {
        if (ojb[a].MaSo == MaSo) {
            return ojb[a].id;
        }
    }
}

function suabienso(myValue) {

    var myValue2 = myValue.toUpperCase();
    myValue = myValue.replace(" ", "");
    myValue = myValue.replace("-", "");
    myValue = myValue.replace(".", "");

    checkvaluebienso(myValue)
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




