
var urlTX = "https://morning-chill-hammer.glitch.me/XeTrongXuong";
var urlDG = "https://morning-chill-hammer.glitch.me/XeDaGiao";
var urlThongSo = "https://big-road-newsstand.glitch.me/ThongSo/";
var dataTX
var dataDG
var items = new vis.DataSet()
var groups = new vis.DataSet()
var container = document.getElementById("mytimeline")
var options = {
    hiddenDates: [
        { start: "2017-03-05 00:00:00", end: "2017-03-06 00:00:00", repeat: "weekly" },
        // { start: "2017-03-04 07:00:00", end: "2017-03-04 17:00:00", repeat: "daily" },
    ],
    timeAxis: { scale: "minute", step: 15 },
    orientation: "top",
    // start: new Date(new Date().valueOf()).setHours(6),
    // end: new Date(new Date().valueOf()).setHours(17),
    editable: true,
    autoResize: false,
    //zoomable: false,
    margin: { item: 0.5, axis: 0.5 },
    stack: true,
};
var ThongSo = JSON.parse(localStorage.getItem("ThongSo"))
var NhomTN = ["Có Hẹn", "Tiếp Nhận"];
var NhomCV = Object.values(ThongSo.filter(function (r) { return r.id == "NhomCV" })[0].value)
var NhomDH = Object.values(ThongSo.filter(function (r) { return r.id == "GruopTDDatHen" })[0].value)
var KhoangSC = Object.values(ThongSo.filter(function (r) { return r.id == "KhoangScc" })[0].value)
var KTVDong = Object.values(ThongSo.filter(function (r) { return r.id == "KTVDong" })[0].value)
var KTVSonDinh = Object.values(ThongSo.filter(function (r) { return r.id == "KTVSon1" })[0].value)
var KTVSonThien = Object.values(ThongSo.filter(function (r) { return r.id == "KTVSon2" })[0].value)
var PhongSon = Object.values(ThongSo.filter(function (r) { return r.id == "PhongSon" })[0].value)
var NhomSon = Object.values(ThongSo.filter(function (r) { return r.id == "NhomSon" })[0].value)
var KhoangKoSuDung = Object.values(ThongSo.filter(function (r) { return r.id == "KhoangKoSuDung" })[0].value)
var ChipGJ = Object.values(ThongSo.filter(function (r) { return r.id == "ChieuDaiChipGJ" })[0].value)[0]
var ChipDS = Object.values(ThongSo.filter(function (r) { return r.id == "ChieuDaiChipDong" })[0].value)[0]
var KTVDongSon = ["Châu", "Trường", "Phúc", "Trương", "Định", "Đình", "Thành", "Lưu", "Hùng", "Lâm", "Duy", "Tài", "Thiên", "Dũng", "Lực", "Tú", "Chương", "Đồng", "Quốc", "Lưu"];
var NhomKTV = Object.values(ThongSo.filter(function (r) { return r.id == "NhomSCC" })[0].value)
var KTVBao = Object.values(ThongSo.filter(function (r) { return r.id == "KTVScc1" })[0].value)
var KTVHoan = Object.values(ThongSo.filter(function (r) { return r.id == "KTVScc2" })[0].value)
var KTVEM = Object.values(ThongSo.filter(function (r) { return r.id == "KTVEM" })[0].value)
var ThuTuEM = Object.values(ThongSo.filter(function (r) { return r.id == "ThuTuEM" })[0].value)
var ListXe = ["Camry", "Inova", "Fortuner", "Altis", "Altis Cross", "Veloz", "Wigo", "Land Cruiser", "Land Prado", "Hilander", "Rav4", "Vios", "Rush", "Avanza", "Raize", "Lexus"];
var KhuVucVT = ["Bà Rịa", "Vũng Tàu", "Long Điền", "Phú Mỹ", "Đất Đỏ", "Châu Đức", "Xuyên Mộc", "Côn Đảo", "KV Khác"];
var TenCoVan = localStorage.getItem("Ten");
var PhanQuyen = localStorage.getItem("PhanQuyen");
var emailnhanvienhen = "quipham@toyotavungtau.com";
// for (a in KhoangSC) { groups.add({ id: KhoangSC[a], content: KhoangSC[a], }) }
// for (b in KTVDong) { groups.add({ id: KTVDong[b], content: KTVDong[b], }) }
// for (c in NhomSon) { groups.add({ id: NhomSon[c], content: "Nhóm " + NhomSon[c], }) }
// for (c in PhongSon) { groups.add({ id: PhongSon[c], content: PhongSon[c], }) }
// groups.add({ id: "Pass", content: "Pass" })
//$.get(urlDG, function (data) { dataDG = data; ; });

//svar timeline = new vis.Timeline(container, items, groups, options);
// function LoadTimeLine() {
//     document.getElementById("loading").style.display = "none"
//     items.clear()
//     var edit1 = {
//         add: false, // add new items by double tapping
//         updateTime: true, // drag items horizontally
//         updateGroup: true, // drag items from one group to another
//         remove: false, // delete an item by tapping the delete button top right
//         overrideItems: true, // allow these options to override item.editable
//     };
//     for (a in useCaher) {
//         var r = useCaher[a]
//         if (r.LoaiHinhSuaChua && r.TrangThaiSCC && r.TimeStartGJ && r.TimeEndGJ) {
//             items.update({
//                 className: trangthaichip(r.TrangThaiSCC),
//                 group: r.KhoangSuaChua,
//                 start: r.TimeStartGJ,
//                 end: r.TimeEndGJ,
//                 editable: edit1,
//                 title: r.CoVanDichVu + " " + r.KyThuatVien1,
//                 content: r.BienSoXe,
//             });
//         }


//     }
// }

// trangthaichip = value => {
//     if (value == `Đang SC`) { return `green` }
//     if (value == "Chờ SC") { return "orange" }
//     if (value == "Đã SC") { return "magenta" }
//     if (value == "Dừng CV") { return "red" }
// }
// trangthaichipds = value => {
//     if (value == `SC`) { return `green` }
//     if (value == "KH") { return "orange" }
//     if (value == "Okie") { return "magenta" }
// }
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




