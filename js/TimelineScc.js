


var items = new vis.DataSet();
var container = document.getElementById('mytimeline');
var groups = new vis.DataSet();
var options = {
                hiddenDates: [  {start: '2017-03-05 00:00:00',end: '2017-03-06 00:00:00',repeat: 'weekly'},
                                { start: '2017-03-04 17:00:00',end: '2017-03-05 08:00:00',repeat: 'daily'}],
                onMove: function (item) {   let text = "Thay Đổi kế hoạch xe "+item.content;
                                            if (confirm(text) == true) { capnhatthoigian(item)} else {LoadTimeLine()};
                                         },
                onAdd: function (item) {   },                  
                onUpdate: function (item) { var BienSo = item.content.slice(0,item.content.indexOf(" "))
                                            $("#buttonSCC").html('')
                                            document.getElementById('FormSCC').reset()
                                            $('#ModalSCC').modal('show')
                                            var chiudaichip = item.end-item.start
                                            $("#ChieuDaiChip").val(chiudaichip)
                                            document.getElementById("BienSoXe").value=BienSo
                                            changvalue()
                                            //timeSuaChua() 
                                            $("#inputThoiGianSCC").val(chiudaichip*1/(60*60*1000))
                                        },
                orientation: 'top',
                start:(new Date( (new Date()).valueOf())).setHours(6),
                end: (new Date( (new Date()).valueOf())).setHours(17),
                editable: true,
                autoResize:true,
                margin: {  item: 0.5,  // distance between items
                                    axis: 0.5,  // distance between items and the time axis
                                },
                stack: true,
    };


for(i in KhoangSC){
        groups.add({
                    id: KhoangSC[i],
                    content: KhoangSC[i] 
                })
}
groups.add({
    id: "Rửa Xe",
    content: "Rửa Xe" 
})
 

var timeline = new vis.Timeline(container, items,groups, options);
function LoadTimeLine () {
    items.clear();
    $("#XeChoSuaChua").html("");
    $("#XeDungCV").html("")
    var dataArray0 =   useCaher

    var dataArray1= dataArray0.filter(function(r){return (r.LoaiHinhSuaChua==="EM"||r.LoaiHinhSuaChua==="SCC"||r.LoaiHinhSuaChua==="EM60")})
    for (var a in dataArray1){r=dataArray1[a]
    var hoanthanh = document.getElementById("checkbox-3").checked
    var tthen=""
    var start = new Date(DoiNgayDangKy(r.TimeStartGJ));
    var timeNow=new Date()
    var end = new Date(DoiNgayDangKy(r.TimeEndGJ));
    var khoang ,mau="", edit1= {add: false,         // add new items by double tapping
                                updateTime: true,  // drag items horizontally
                                updateGroup: true, // drag items from one group to another
                                remove: false,       // delete an item by tapping the delete button top right
                                overrideItems: true  // allow these options to override item.editable
                                }
    if(r.LoaiHinhSuaChua=="SCC"){khoang=2}else{khoang=1}
    if(r.TrangThaiSCC=="Đang SC"){mau="green"}
    if(r.TrangThaiSCC=="Dừng SC"){mau="red"}
    if(r.TrangThaiSCC=="Chờ SC"){mau="orange"}
    if(r.TrangThaiSCC=="Đã SC"){mau="magenta"} 
    if(r.TrangThaiHen=="Đúng Giờ"){tthen = "DungGio"}
    if(r.TrangThaiHen=="Đến Sớm"){tthen = "DenSom"}
    if( r.TrangThaiXuong=="04 Đã Tiếp Nhận"){additembienso(r.BienSoXe,r.MaSo,"ChuaSuaChua",tthen,r.LoaiHinhSuaChua)}
    if (r.TrangThaiXuong =='03 Đang Tiếp Nhận') {additembienso(r.BienSoXe,r.MaSo,"DangSuaChua",tthen,r.LoaiHinhSuaChua)}
    if (r.TrangThaiXuong =='02 Chờ Tiếp Nhận'||r.TrangThaiXuong =='02 Chuẩn Bị Tiếp') {additembienso(r.BienSoXe,r.MaSo,"ChoSuaChua",tthen,r.LoaiHinhSuaChua)}
    if (r.TrangThaiXuong =='05 Dừng Công Việc') {additembiensodung(r.BienSoXe,r.MaSo)} 
    if(r.TimeEndGJ){ var endRX = new Date(DoiNgayDangKy(r.TimeEndGJ).valueOf()+15*60*1000)}
    if((new Date(DoiNgayDangKy(r.TimeEndGJ))).valueOf()<timeNow.valueOf()){mau="magenta"}
    if(hoanthanh&&r.TrangThaiSCC=="Đã SC"&&r.TimeStartGJ){
            items.add({
                className: mau,
                id:  r.MaSo  ,
                group: r.KhoangSuaChua,
                start: start,
                end: end,
                editable: edit1,
                //title:r.CoVanDichVu,
                content: r.BienSoXe +" "+r.KyThuatVien1
                })
        }
    if(r.TrangThaiSCC!="Đã SC"&&r.TimeStartGJ){
            items.add({
                className: mau,
                id:  r.MaSo  ,
                group: r.KhoangSuaChua,
                start: start,
                end: end,
                editable: edit1,
                //title:r.CoVanDichVu,
                content: r.BienSoXe +" "+r.KyThuatVien1
            });   
        }
    if(r.KhachRuaXe=="Rửa Xe"&&r.TrangThaiXuong!="08 Chờ Giao Xe"&&r.TimeEndGJ){
        var classname2 ="orange"
        if(r.TrangThaiXuong=="07 Đang Rửa Xe"){classname2="green"}
            items.add({
                className: classname2,
                id:  r.BienSoXe+"_RuaXe"  ,
                group: "Rửa Xe",
                start: end,
                end: endRX,
                editable: edit1,
                content: r.BienSoXe +" "+r.CoVanDichVu
                });

    } 
    if(r.ThoiGianHen&& document.getElementById("checkbox-hen").checked){
        if(r.TimeStartGJ){}else{
            var start =DoiNgayDangKy(r.ThoiGianHen)
            var end
            if(r.LoaiHinhSuaChua=="EM"||r.LoaiHinhSuaChua=="EM60"){  end=  new Date(1000 * 60 * 29 + (new Date(start)).valueOf())}
            if(r.LoaiHinhSuaChua=="SCC"||r.LoaiHinhSuaChua=="FIR"){  end=  new Date(1000 * 60 * 59 + (new Date(start)).valueOf())}
            if((r.NoiDungHen.toUpperCase()).indexOf("BD40K")>=0){end = new Date(1000 * 60 * 59 + (new Date(start)).valueOf())}
            if((r.NoiDungHen.toUpperCase()).indexOf("BD80K")>=0){end = new Date(1000 * 60 * 59 + (new Date(start)).valueOf())}
            if((r.NoiDungHen.toUpperCase()).indexOf("LEXUS")>=0){end = new Date(1000 * 60 * 59 + (new Date(start)).valueOf())}
            var classnamehen ="blue"
            if(r.TDGapLeTan){classnamehen="orange"}
            items.add({
                className: classnamehen,
                id:  r.BienSoXe+"_Hen"  ,
                group: r.KhoangSuaChua,
                start:  start ,
                end: end,
                editable: edit1,
                content: r.BienSoXe +" [H]",
                title:r.BienSoXe+"<br>"+r.NoiDungHen+"<br>"+r.NguoiDatHen,
            });
        }
    } 
    timeline.redraw()
}
}
function additembienso(value,MaSo,trangthai,tthen,LoaiHinh){
    $("#XeChoSuaChua").html($("#XeChoSuaChua").html()+
                                '<li draggable="true"  ondrag="showtime(event)" ondragend="handleDragStart(event)" class="item '+
                                trangthai+' '+tthen+' '+LoaiHinh+'" value="'+MaSo+'">'+value+'</li>'
                            )
}
function additembiensodung(value,MaSo){
    $("#XeDungCV").html($("#XeDungCV").html()+
                            '<li draggable="true"  ondrag="showtime(event)" ondragend="handleDragStart(event)" class="item DungCongViec" value="'+
                            MaSo+'">'+value+'</li>'
                        )
}

timeline.on('click', function (props) {document.getElementById("contextMenu").style.display = "none"})

timeline.on('contextmenu', function (props) {
    $("#biensomenu").html("")
    document.getElementById('FormSCC').reset()
    if(props.item){if (document.getElementById("contextMenu").style.display == "block")
                    { document.getElementById("contextMenu").style.display = "none"}
                    else {  var menu = document.getElementById("contextMenu")
                            menu.style.display = 'block';
                            menu.style.left = props.pageX + "px";
                            menu.style.top = props.pageY + "px";
                    }
                    var ojb =  useCaher
                    for(var a in ojb){
                            if(ojb[a].MaSo == props.item){
                                document.getElementById("BienSoXe").value=ojb[a].BienSoXe;
                                var start = new Date(DoiNgayDangKy(ojb[a].TimeStartGJ));
                                var end = new Date(DoiNgayDangKy(ojb[a].TimeEndGJ));
                                var chiudaichip = end-start
                                $("#ChieuDaiChip").val(chiudaichip)
                                $("#inputThoiGianSCC").val(chiudaichip*1/(60*60*1000))
                                $("#biensomenu").html(ojb[a].BienSoXe)
                                changvalue();
                                timeSuaChua() 
                            }
                        }
                    $("#TTHuyChip").val(props.item)
                }
    props.event.preventDefault();
});
function showtime(event){
    event.dataTransfer.effectAllowed = 'move';
    var timelineProperties = timeline.getEventProperties(event);
    var menu = document.getElementById("contextMenu2")
    menu.style.display = 'block';
    menu.style.left = timelineProperties.pageX + "px";
    menu.style.top = (timelineProperties.pageY+25) + "px";
    $("#ThoiGian").html(TimesClick(timelineProperties.time)+"<br>"+timelineProperties.group)
    }


function handleDragStart(event) {
        var dragSrcEl = event.target;
        event.dataTransfer.effectAllowed = 'move';
        var timelineProperties = timeline.getEventProperties(event);
        var maso = event.target.attributes.value.textContent
        let text = "Chạy Chip Tiến Độ Xe "+dragSrcEl.innerHTML;
        var KTV1="None",KTV2="None",NhomSC="None"
        document.getElementById("contextMenu2").style.display = 'none';
        if(timelineProperties.group=="EM 01"){NhomSC="EM";KTV1="Vinh";KTV2="Hưng"}
        if(timelineProperties.group=="EM 02"){NhomSC="EM";KTV1="Đ Anh";KTV2="Khoa"}
        if(timelineProperties.group=="EM 03"){NhomSC="EM";KTV1="Hiển";KTV2="Cường"}
        if(timelineProperties.group=="EM 04"){NhomSC="EM";KTV1="Trí";KTV2=""}
        if(timelineProperties.group=="SCC 05"){NhomSC="Bạo";KTV1="Phước";KTV2=""}
        if(timelineProperties.group=="SCC 06"){NhomSC="Bạo";KTV1="Hiếu";KTV2=""}
        if(timelineProperties.group=="SCC 07"){NhomSC="Bạo";KTV1="Duy";KTV2=""}
        if(timelineProperties.group=="SCC 08"){NhomSC="Hoan";KTV1="Lâm";KTV2=""}
        if(timelineProperties.group=="SCC 09"){NhomSC="Hoan";KTV1="Sơn";KTV2=""}
        if(timelineProperties.group=="SCC 10"){NhomSC="Hoan";KTV1="Thiên";KTV2=""}

        //if (confirm(text) == true) {
        var json2 = {
            TimeStartGJ: TimesClick(new Date(timelineProperties.time)),
            TrangThaiSCC:"Chờ SC",
            TrangThaiXuong: "04 Đã Tiếp Nhận",
            KhoangSuaChua: timelineProperties.group ,
            TimeEndGJ: TimesClick(new Date(1000 * 60 * 60 + (new Date(timelineProperties.time)).valueOf())),
            KyThuatVien1  :KTV1 ,
            KyThuatVien2  :KTV2 ,
            NhomKTV:NhomSC
        }
        postData(json2,urlTX+"/"+checkID(maso),"PATCH")
}


function huyChip(item){
    item=$("#TTHuyChip").val()
    var ojb =  useCaher
    for(var a in ojb){
            if(ojb[a].MaSo == item){
            delete ojb[a].NhomKTV;
            delete ojb[a].KyThuatVien1;
            delete ojb[a].KyThuatVien2;
            delete ojb[a].TimeStartGJ;
            delete ojb[a].TimeEndGJ;
            ojb[a].TrangThaiSCC="Chờ SC";
            ojb[a].TrangThaiXuong="04 Đã Tiếp Nhận";
            try{
            let text = "Bạn muốn Xóa Chíp Tiếp Độ: "+ojb[a].BienSoXe 
            if (confirm(text) == true&&localStorage.getItem("PhanQuyen")=="DieuPhoi") { 
            alert(urlTX+"/"+ojb[a].id)
            $.ajax({
            url:urlTX+"/"+ojb[a].id,
            type:'PUT',
            data:ojb[a],
            success: function(data){
            loadData()
            }
            })
            }else{alert("Bạn không Thể xóa chíp")}
            }catch(eros){alert(eros)}

    }

    }
    
}


  
function redraw(){
  timeline.redraw()
}
function capnhatthoigian(item){
  	var ojb =  useCaher
    var KTV1="None",KTV2="None",NhomSC="None"
        if(item.group=="EM 01"){NhomSC="EM";KTV1="Vinh";KTV2="Hưng"}
        if(item.group=="EM 02"){NhomSC="EM";KTV1="Đ Anh";KTV2="Khoa"}
        if(item.group=="EM 03"){NhomSC="EM";KTV1="Hiển";KTV2="Cường"}
        if(item.group=="EM 04"){NhomSC="EM";KTV1="Trí";KTV2=""}
        if(item.group=="SCC 05"){NhomSC="Bạo";KTV1="Phước";KTV2=""}
        if(item.group=="SCC 06"){NhomSC="Bạo";KTV1="Hiếu";KTV2=""}
        if(item.group=="SCC 07"){NhomSC="Bạo";KTV1="Duy";KTV2=""}
        if(item.group=="SCC 08"){NhomSC="Hoan";KTV1="Lâm";KTV2=""}
        if(item.group=="SCC 09"){NhomSC="Hoan";KTV1="Sơn";KTV2=""}
        if(item.group=="SCC 10"){NhomSC="Hoan";KTV1="Thiên";KTV2=""}

var json2 = {
        TimeStartGJ:TimesClick(item.start),
        TimeEndGJ: TimesClick(item.end),
        KhoangSuaChua:item.group,
        KyThuatVien1  :KTV1 ,
        KyThuatVien2  :KTV2 ,
        NhomKTV:NhomSC
      }
      postData(json2,urlTX+"/"+checkID(item.id),"PATCH")

}

 

    






