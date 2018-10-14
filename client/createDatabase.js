var root = {lat: 10.7624165, lng: 106.6812013};

function create() {
    var ran;
    var obj = {center: {lat:0, lng:0}};
    for (var i = 0; i < 100; ++i){
        ran =Math.floor((Math.random() * 10) + 1);
        obj.center.lat = root.lat + ran/10 ;
        ran =Math.floor((Math.random() * 10) + 1);
        obj.center.lng = root.lng + ran/10 ; 
        obj.comment = "Dirty";
        sendComment(obj);
        ran =Math.floor((Math.random() * 10) + 1);
        obj.center.lat = root.lat + ran/10 ;
        ran =Math.floor((Math.random() * 10) + 1);
        obj.center.lng = root.lng - ran/10 ; 
        obj.comment = "Dirty";
        sendComment(obj);
        ran =Math.floor((Math.random() * 10) + 1);
        obj.center.lat = root.lat - ran/10 ;
        ran =Math.floor((Math.random() * 10) + 1);
        obj.center.lng = root.lng + ran/10 ; 
        obj.comment = "Dirty";
        sendComment(obj);
        ran =Math.floor((Math.random() * 10) + 1);
        obj.center.lat = root.lat - ran/10 ;
        ran =Math.floor((Math.random() * 10) + 1);
        obj.center.lng = root.lng - ran/10 ; 
        obj.comment = "Dirty";
        sendComment(obj);
    }
}

create();

function sendComment(obj) {
    var http = new XMLHttpRequest();
    http.open("POST", "http://127.0.0.1:3000/send-comment", true);
    http.send(JSON.stringify(obj));
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200){
            console.log("Success");
        }
    }
}