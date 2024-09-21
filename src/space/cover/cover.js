if (window.location.href.split("id=")[1]==undefined){
    var cookies = document.cookie;
    var num = cookies.indexOf("stu_id=")+7;
    var id = "";
    for (var i=num;i<=num+100;i++){
        if (cookies[i]!=';'){
            id+=cookies[i];
        }else{
            break;
        }
    }
}else{
    var id = window.location.href.split("id=")[1];
}
//id = "12907647";
fetch('/api/space/profile?user_id='+id)
            .then(response => {
                if (response.ok) {
                    return response.json(); // 解析JSON格式的响应数据
                }
            })
            .then(data => {
                var body = document.body;
                var div = body.querySelector('div.col-auto');
                var img = document.createElement("img");
                img.src = data["data"]["avatar_path"];
                img.className = "photo rounded-circle";
                img.width = 100;
                img.height = 100;
                div.appendChild(img);
                //console.log(data);
                var realname = document.getElementById("realname")
                realname.innerText = data["data"]["realname"];
                var signature = document.getElementById("signature");
                signature.innerText = data["data"]["signature"];
                signature.align = "center";
                var p = document.getElementById("fan");
                p.innerText = "粉丝 "+data["data"]["fans"]+"     关注 "+data["data"]["follows"];
                p.align = "center";
            })
            .catch(error => {
                console.error('Error fetching API:', error); // 处理错误
            });

fetch('/api/space/web_cover?user_id='+id)
    .then(response => {
        if (response.ok){
            return response.json();
        }
    })
    .then(data => {
        src = data["data"]["index_url"];
        element = document.getElementById("iframe");
        if (src==null){
            element.src = "/errors/404.html";
            document.getElementById('myDialog').showModal();
        }else{
            element.src = src;
        }
        if (window.location.href.split("id=")[1]!=undefined){
            var fff = document.getElementById("f");
            fff.href += "?id="+String(id);
            var eee = document.getElementById("e");
            eee.href += "?id="+String(id);
            var aaa = document.getElementById("a");
            aaa.href += "?id="+String(id);
            var bbb = document.getElementById("b");
            bbb.href += "?id="+String(id);
            var ccc = document.getElementById("c");
            ccc.href  += "?id="+String(id);
            var ddd = document.getElementById("d");
            ddd.href  += "?id="+String(id);
        }
    })
    .catch(error =>{
        console.error('Error fetching API:', error);
    });