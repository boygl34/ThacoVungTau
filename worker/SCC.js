

var urlTX = "https://morning-chill-hammer.glitch.me/XeTrongXuong";
getData()
setInterval(getData, 90000)
function getData() {
    fetch(urlTX, {
        method: "GET", // or 'PUT'
        headers: { "Content-Type": "application/json" }
    })
        .then((response) => response.json())
        .then((data) => {
            postMessage(data)
        })
}