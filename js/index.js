
var urlTX = "https://deciduous-pentagonal-powder.glitch.me/XeTrongXuong";
var urlDG = "https://deciduous-pentagonal-powder.glitch.me/XeDaGiao";
var urlThongSo = "https://big-road-newsstand.glitch.me/ThongSo/";
var dataTX
var dataDG
var items = new vis.DataSet()
var groups = new vis.DataSet()
var container = document.getElementById("mytimeline")
var options = {
    hiddenDates: [{ start: "2017-03-05 00:00:00", end: "2017-03-06 00:00:00", repeat: "weekly", },
        //{ start: "2017-03-04 17:00:00", end: "2017-03-05 08:00:00", repeat: "daily", },
    ],
    timeAxis: { scale: "minute", step: 15 },
    orientation: "top",
    start: new Date(new Date().valueOf()).setHours(6),
    end: new Date(new Date().valueOf()).setHours(17),
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
for (a in KhoangSC) { groups.add({ id: KhoangSC[a], content: KhoangSC[a], }) }
for (b in KTVDong) { groups.add({ id: KTVDong[b], content: KTVDong[b], }) }
for (c in NhomSon) { groups.add({ id: NhomSon[c], content: "Nhóm " + NhomSon[c], }) }
for (c in PhongSon) { groups.add({ id: PhongSon[c], content: PhongSon[c], }) }
$.get(urlDG, function (data) { dataDG = data; console.log(dataDG); });
$.get(urlThongSo, function (data) { localStorage.setItem("ThongSo", JSON.stringify(data)) });
var dataTX = $.get(urlTX, function (data) { dataTX = data; console.log(dataTX) });
var timeline = new vis.Timeline(container, items, groups, options);
function redraw() { timeline.redraw(); LoadTimeLine() }

function LoadTimeLine() {
    var DangSuaChua = "green", DaSuaChua = "red", DungCongViec, XeHen, XeTre
    var edit1 = {
        add: false, // add new items by double tapping
        updateTime: true, // drag items horizontally
        updateGroup: true, // drag items from one group to another
        remove: false, // delete an item by tapping the delete button top right
        overrideItems: true, // allow these options to override item.editable
    };
    for (a in dataTX) {
        var r = dataTX[a]
        if (r.LoaiHinhSuaChua && r.TrangThaiSCC && r.TimeStartGJ && r.TimeEndGJ) {

            items.update({
                className: trangthaichip(r.TrangThaiSCC),
                id: r.MaSo,
                group: r.KhoangSuaChua,
                start: DoiNgayDangKy(r.TimeStartGJ),
                end: DoiNgayDangKy(r.TimeEndGJ),
                editable: edit1,
                //title:r.CoVanDichVu,
                content: r.BienSoXe + " " + r.KyThuatVien1,
            });
        }

    }
}

trangthaichip = value => {
    if (value == `Đang SC`) { return `green` }
    if (value == "Chờ SC") { return "orange" }
    if (value == "Đã SC") { return "magenta" }
    if (value == "Dừng CV") { return "red" }
}
DoiNgayDangKy = ngayhen => {
    var aa;
    if (ngayhen) {
        var Thang = ngayhen.slice(3, 5);
        var Ngay = ngayhen.slice(0, 2);
        var Nam = ngayhen.slice(6, 10);
        var Gio = ngayhen.slice(11, 13);
        var Phut = ngayhen.slice(14, 16);
        var ThoiGianMoi = `${Nam}-${Thang}-${Ngay}T${Gio}:${Phut}:00Z`;
        var aa = new Date(ThoiGianMoi);
        aa = new Date(aa - 7 * 60 * 60 * 1000);
    }
    console.log(aa)
    return aa;
}