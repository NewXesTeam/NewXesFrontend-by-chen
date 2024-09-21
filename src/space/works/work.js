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

fetch('/api/space/works?user_id='+id)
    .then(response => {
        if (response.ok) {
            return response.json(); // 解析JSON格式的响应数据
        }
    })
    .then(data => {
        num = data["data"]["total"];
        page = (num-num%20)/20;
        now_page = window.location.href.split("?")[1].split("page=")[1];
        fetch('/api/space/works?user_id='+id+"&page="+now_page+"&per_page=20&order_type=time")
            .then(response =>{
                if (response.ok) {
                    return response.json(); // 解析JSON格式的响应数据
                }
            })
            .then(data => {
                work_list = data["data"]["data"];
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
                var i=0;
                for (var s=1;s<=4;s++){
                    console.log(i);
                    var row = document.createElement("div");
                    row.className = "row";
                    document.body.appendChild(row);
                    for (var j=0;j<=4;j++){
                        var div = document.createElement("div");
                        div.className = "col";
                        div.align = "center";
                        row.appendChild(div);
                        var card = document.createElement("div");
                        card.className = "card";
                        div.appendChild(card);
                        var a = document.createElement("a");
                        if (work_list[i]["lang"]=="webpy"||work_list[i]["lang"]=="python"){
                            a.href = "https://code.xueersi.com/home/project/detail?lang=code&pid="+work_list[i]["id"]+"&version=webpy&form=webpy&langType=webpy";
                        }else if(work_list[i]["lang"]=="scratch"){
                            a.href = "https://code.xueersi.com/home/project/detail?lang=scratch&pid="+work_list[i]["id"]+"&version=3.0&langType=scratch";
                        }else if(work_list[i]["lang"]=="cpp"){
                            a.href = "https://code.xueersi.com/home/project/detail?lang=code&pid="+work_list[i]["id"]+"&version=cpp&form=cpp&langType=cpp";
                        }
                        a.target = "_blank";
                        //a.align = "center";
                        card.appendChild(a);
                        var img = document.createElement("img");
                        img.src = work_list[i]["thumbnail"];
                        img.width = 100;
                        img.height = 100;
                        a.appendChild(img);
                        var p = document.createElement("p");
                        p.innerText = work_list[i]["name"];
                        a.appendChild(p);
                        i++;
                    }
                }
            })
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
    .catch(error => {
        console.error('Error fetching API:', error); // 处理错误
    });
const last_page = () =>{
    var page_num = document.getElementById("front-page-num");
    page_num.value = String(Number(page_num.value)-1);
    var x = page_num.value;
    window.location.href = "/space/works?page="+x+"?id="+String(id);
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
    window.location.href = "/space/works?page="+x+"?id="+String(id);
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
    window.location.href = "/space/works?page="+x+"?id="+String(id);
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