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

var num,max;
fetch('/api/space/follows?user_id='+id)
    .then(response =>{
        if (response.ok) {
            return response.json(); // 解析JSON格式的响应数据
        }
    })
    .then(data => {
        num = data["data"]["total"];
        page = (num-num%8)/8;
        now_page = window.location.href.split("?")[1].split("page=")[1];
        fetch('/api/space/follows?user_id='+id+"&page="+now_page)
            .then(response =>{
                if (response.ok) {
                    return response.json(); // 解析JSON格式的响应数据
                }
            })
            .then(data => {
                fan_list = data["data"]["data"];
                var page_num = document.getElementById("front-page-num");
                page_num.max = String(page+1);
                page_num.placeholder = "1~"+page_num.max;
                page_num.value = String(window.location.href.split("?")[1].split("page=")[1]);
                max = page_num.max;
                if (Number(page_num.value)>1){
                    document.getElementById("front-page-prev").className = "page-item";
                }else{
                    document.getElementById("front-page-prev").className = "page-item disabled";
                }
            
                if (Number(page_num.value)<max){
                    document.getElementById("front-page-next").className = "page-item";
                }
                else{
                    document.getElementById("front-page-next").className = "page-item disabled";
                }
                //console.log(document.body.innerHTML)
                var body = document.body;
                try{
                    for (var i=0;i<=7;i++){
                        var div = document.createElement("div");
                        div.className = "card";
                        body.appendChild(div);
                        var row = document.createElement("div");
                        row.className = "row";
                        div.appendChild(row);
                        var adiv = document.createElement("div");
                        adiv.className = "col-1";
                        adiv.style = "width: 120px;height: 120px;";
                        row.appendChild(adiv);
                        var a = document.createElement("a");
                        a.href = "/space/?id="+fan_list[i]["user_id"];
                        a.target = "_blank";
                        a.style = "width=120px;height=120px";
                        adiv.appendChild(a);
                        var img = document.createElement("img");
                        img.className = "photo rounded-circle";
                        img.style = "width: 120px;height: 120px;";
                        img.src = fan_list[i]["avatar_path"];
                        img.align = "center";
                        a.appendChild(img);
                        var div2 = document.createElement("div");
                        div2.className  = "col";
                        row.appendChild(div2);
                        var name = document.createElement("p");
                        name.innerHTML = fan_list[i]["realname"]+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code>粉丝</code>&nbsp;"+String(fan_list[i]["fans"])+"&nbsp;&nbsp;<code>关注</code>&nbsp;"+String(fan_list[i]["follows"]);
                        div2.appendChild(name);
                        var signature = document.createElement("p");
                        if (fan_list[i]["signature"]==null){
                            signature.innerText = "Hello code, Hello world ~";
                        }else{
                            signature.innerText = fan_list[i]["signature"];
                        }
                        div2.appendChild(signature);

                        var br = document.createElement("br");
                        body.appendChild(br);
                    }
                }
                finally{
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
                }
            })
            .catch(error => {
                console.error('Error fetching API:', error); // 处理错误
            });
    })
    .catch(error => {
        console.error('Error fetching API:', error); // 处理错误
    });
const last_page = () =>{
    var page_num = document.getElementById("front-page-num");
    page_num.value = String(Number(page_num.value)-1);
    var x = page_num.value;
    window.location.href = "/space/follows?page="+x+"?id="+String(id);
    if (Number(page_num.value)>1){
        document.getElementById("front-page-prev").className = "page-item";
    }else{
        document.getElementById("front-page-prev").className = "page-item disabled";
    }

    if (Number(page_num.value)<max){
        document.getElementById("front-page-next").className = "page-item";
    }
    else{
        document.getElementById("front-page-next").className = "page-item disabled";
    }
}
const next_page = () =>{
    var page_num = document.getElementById("front-page-num");
    page_num.value = String(Number(page_num.value)+1);
    var x = page_num.value;
    window.location.href = "/space/follows?page="+x+"?id="+String(id);
    if (Number(page_num.value)>1){
        document.getElementById("front-page-prev").className = "page-item";
    }else{
        document.getElementById("front-page-prev").className = "page-item disabled";
    }

    if (Number(page_num.value)<max){
        document.getElementById("front-page-next").className = "page-item";
    }
    else{
        document.getElementById("front-page-next").className = "page-item disabled";
    }
}
const check = () =>{
    var page_num = document.getElementById("front-page-num");
    var x = page_num.value;
    window.location.href = "/space/follows?page="+x+"?id="+String(id);
    if (Number(page_num.value)>1){
        document.getElementById("front-page-prev").className = "page-item";
    }else{
        document.getElementById("front-page-prev").className = "page-item disabled";
    }

    if (Number(page_num.value)<max){
        document.getElementById("front-page-next").className = "page-item";
    }
    else{
        document.getElementById("front-page-next").className = "page-item disabled";
    }
}