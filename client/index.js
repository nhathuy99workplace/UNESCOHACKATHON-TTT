function saveLocationAndCommentOnServer() {
    var locationLongtitude = document.getElementById("longtitude");
    var locationLatitude = document.getElementById("latitude");
    var http = new XMLHttpRequest();
    http.open("POST","http://127.0.0.1:3000/save-loc-and-com",true);
    http.send();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.response;
            if (result == "Fail!") {
                console.log("Save location and comment success!");
            }
        }
    }
}