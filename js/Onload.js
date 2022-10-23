

window.addEventListener('DOMContentLoaded', event => {
   
    getData()
});


setInterval(function (){ getData()},60000);


function  getData(){
    $.ajax({
        url:urlTX,
        type:'GET',
        success: function(data){
            useCaher=data
           if(LoadTimeLine()){LoadTimeLine()}
            
        }
    })

}
