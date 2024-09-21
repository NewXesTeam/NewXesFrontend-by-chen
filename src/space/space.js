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
document.getElementById("hahaha").addEventListener('click',function(){
    document.getElementById('myDialog').showModal();
    document.getElementById("edit").value = "";
})
edit_signature = ()=>{
    let data = {signature: document.getElementById("edit").value};
    fetch(`/api/space/edit_signature`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(datah => console.log(datah))
        .catch(error => console.error(error));
}
//id="16944115"; //测试用
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

fetch('/api/space/index?user_id='+id)
            .then(response => {
                if (response.ok) {
                    return response.json(); // 解析JSON格式的响应数据
                }
            })
            .then(data => {
                console.log(data["data"]);
                if (data["data"]["is_my"]==false){
                    document.getElementById("hahaha").style.display = "none";
                }
                var list = data["data"]["overview"];
                var zp = document.getElementById("zp")
                zp.innerText = "作品："+list["works"];
                var dz = document.getElementById("dz")
                dz.innerText = "点赞："+list["likes"];
                var ll = document.getElementById("ll")
                ll.innerText = "浏览："+list["views"];
                var gb = document.getElementById("gb")
                gb.innerText = "被改编："+list["source_code_views"];
                var sc = document.getElementById("sc")
                sc.innerText = "被收藏："+list["favorites"];
                //---------------------------分割线----------------------------//
                try{
                    var rw = data["data"]["representative_work"]
                    var dbz = document.getElementById("dbz")
                    if (rw["lang"]=="webpy"||rw["lang"]=="python"){
                        dbz.href = "https://code.xueersi.com/home/project/detail?lang=code&pid="+rw["id"]+"&version=webpy&form=webpy&langType=webpy";
                    }else if(rw["lang"]=="scratch"){
                        dbz.href = "https://code.xueersi.com/home/project/detail?lang=scratch&pid="+rw["id"]+"&version=3.0&langType=scratch";
                    }else if(rw["lang"]=="cpp"){
                        dbz.href = "https://code.xueersi.com/home/project/detail?lang=code&pid="+rw["id"]+"&version=cpp&form=cpp&langType=cpp";
                    }
                    dbz.target = "_blank";
                    var thumbnail = document.getElementById("thumbnail")
                    //thumbnail.className = "photo rounded-circle";
                    thumbnail.width = 100;
                    thumbnail.height = 100;
                    thumbnail.src = rw["thumbnail"];
                    var dbz_name = document.getElementById("dbz_name")
                    dbz_name.innerHTML = rw["name"];
                }catch{
                    var rw = data["data"]["representative_work"]
                    var dbz = document.getElementById("dbz")
                    dbz.href = "#";             
                    var thumbnail = document.getElementById("thumbnail")
                    //thumbnail.className = "photo rounded-circle";
                    thumbnail.width = 100;
                    thumbnail.height = 100;
                    thumbnail.src = "https://t.100tal.com/avatar/%E6%97%A0";
                    var dbz_name = document.getElementById("dbz_name")
                    dbz_name.innerHTML = "作者没有设置代表作";
                }
                //-------------------------------------------------------------//
                let work_list = data["data"]["works"]["data"];
                if (data["data"]["works"]["total"]>=10){
                    for (var i=0;i<=9;i++){
                        var a=String(i+1);
                        //console.log("work"+a+"_img");
                        var aaa = document.getElementById("work"+a);
                        aaa.target = "_blank";
                        if (work_list[i]["lang"]=="webpy"||work_list[i]["lang"]=="python"){
                            aaa.href = "https://code.xueersi.com/home/project/detail?lang=code&pid="+work_list[i]["id"]+"&version=webpy&form=webpy&langType=webpy";
                        }else if(work_list[i]["lang"]=="scratch"){
                            aaa.href = "https://code.xueersi.com/home/project/detail?lang=scratch&pid="+work_list[i]["id"]+"&version=3.0&langType=scratch";
                        }else if(work_list[i]["lang"]=="cpp"){
                            aaa.href = "https://code.xueersi.com/home/project/detail?lang=code&pid="+work_list[i]["id"]+"&version=cpp&form=cpp&langType=cpp";
                        }
                        var x = document.getElementById("work"+a+"_img");
                        //x.className = "photo rounded-circle";
                        x.width = 100;
                        x.height = 100;
                        x.src = work_list[i]["thumbnail"];
                        var y = document.getElementById("work"+a+"_name")
                        y.innerHTML = work_list[i]["name"];
                    }
                }else{
                    for (var i=0;i<=data["data"]["works"]["total"]-1;i++){
                        var a=String(i+1);
                        //console.log("work"+a+"_img");
                        var aaa = document.getElementById("work"+a);
                        aaa.target = "_blank";
                        if (work_list[i]["lang"]=="webpy"||work_list[i]["lang"]=="python"){
                            aaa.href = "https://code.xueersi.com/home/project/detail?lang=code&pid="+work_list[i]["id"]+"&version=webpy&form=webpy&langType=webpy";
                        }else if(work_list[i]["lang"]=="scratch"){
                            aaa.href = "https://code.xueersi.com/home/project/detail?lang=scratch&pid="+work_list[i]["id"]+"&version=3.0&langType=scratch";
                        }else if(work_list[i]["lang"]=="cpp"){
                            aaa.href = "https://code.xueersi.com/home/project/detail?lang=code&pid="+work_list[i]["id"]+"&version=cpp&form=cpp&langType=cpp";
                        }
                        var x = document.getElementById("work"+a+"_img");
                        //x.className = "photo rounded-circle";
                        x.width = 100;
                        x.height = 100;
                        x.src = work_list[i]["thumbnail"];
                        var y = document.getElementById("work"+a+"_name")
                        y.innerHTML = work_list[i]["name"];
                    }
                }
                //-------------------------------------------------------------//
                let favourite_list = data["data"]["favorites"]["data"];
                if (data["data"]["favorites"]["total"]>=5){
                    for (var i=0;i<=4;i++){
                        var a=String(i+1);
                        //console.log("work"+a+"_img");
                        var aaa = document.getElementById("favourite"+a);
                        if (favourite_list[i]["lang"]=="webpy"||favourite_list[i]["lang"]=="python"){
                            aaa.href = "https://code.xueersi.com/home/project/detail?lang=code&pid="+favourite_list[i]["id"]+"&version=webpy&form=webpy&langType=webpy";
                        }else if(favourite_list[i]["lang"]=="scratch"){
                            aaa.href = "https://code.xueersi.com/home/project/detail?lang=scratch&pid="+favourite_list[i]["id"]+"&version=3.0&langType=scratch";
                        }else if(favourite_list[i]["lang"]=="cpp"){
                            aaa.href = "https://code.xueersi.com/home/project/detail?lang=code&pid="+favourite_list[i]["id"]+"&version=cpp&form=cpp&langType=cpp";
                        }
                        aaa.target = "_blank";
                        var x = document.getElementById("favourite"+a+"_img");
                        //x.className = "photo rounded-circle";
                        x.width = 100;
                        x.height = 100;
                        x.src = favourite_list[i]["thumbnail"];
                        var y = document.getElementById("favourite"+a+"_name")
                        y.innerHTML = favourite_list[i]["name"];
                    }
                }else{
                    for (var i=0;i<=data["data"]["favorites"]["total"]-1;i++){
                        var a=String(i+1);
                        //console.log("work"+a+"_img");
                        var aaa = document.getElementById("favourite"+a);
                        if (favourite_list[i]["lang"]=="webpy"||favourite_list[i]["lang"]=="python"){
                            aaa.href = "https://code.xueersi.com/home/project/detail?lang=code&pid="+favourite_list[i]["id"]+"&version=webpy&form=webpy&langType=webpy";
                        }else if(favourite_list[i]["lang"]=="scratch"){
                            aaa.href = "https://code.xueersi.com/home/project/detail?lang=scratch&pid="+favourite_list[i]["id"]+"&version=3.0&langType=scratch";
                        }else if(favourite_list[i]["lang"]=="cpp"){
                            aaa.href = "https://code.xueersi.com/home/project/detail?lang=code&pid="+favourite_list[i]["id"]+"&version=cpp&form=cpp&langType=cpp";
                        }
                        aaa.target = "_blank";
                        var x = document.getElementById("favourite"+a+"_img");
                        //x.className = "photo rounded-circle";
                        x.width = 100;
                        x.height = 100;
                        x.src = favourite_list[i]["thumbnail"];
                        var y = document.getElementById("favourite"+a+"_name")
                        y.innerHTML = favourite_list[i]["name"];
                    }
                }
                //-------------------------------------------------------------//
                let fan_list = data["data"]["fans"]["data"];
                if (data["data"]["fans"]["total"]>=8){
                    for (var i=0;i<=7;i++){
                        var a=String(i+1);
                        //console.log("work"+a+"_img");
                        var aaa = document.getElementById("fan"+a);
                        aaa.href = "/space/?id="+fan_list[i]["id"];
                        aaa.target = "_blank";
                        var x = document.getElementById("fan"+a+"_img");
                        x.className = "photo rounded-circle";
                        x.width = 100;
                        x.height = 100;
                        x.src = fan_list[i]["avatar_path"];
                        var y = document.getElementById("fan"+a+"_name")
                        y.innerHTML = fan_list[i]["realname"];
                    }
                }else{
                    for (var i=0;i<=data["data"]["fans"]["total"]-1;i++){
                        var a=String(i+1);
                        //console.log("work"+a+"_img");
                        var aaa = document.getElementById("fan"+a);
                        aaa.href = "/space/?id="+fan_list[i]["id"];
                        aaa.target = "_blank";
                        var x = document.getElementById("fan"+a+"_img");
                        x.className = "photo rounded-circle";
                        x.width = 100;
                        x.height = 100;
                        x.src = fan_list[i]["avatar_path"];
                        var y = document.getElementById("fan"+a+"_name")
                        y.innerHTML = fan_list[i]["realname"];
                    }
                }
                let follow_list = data["data"]["follows"]["data"];
                if (data["data"]["follows"]["total"]>=8){
                    for (var i=0;i<=7;i++){
                        var a=String(i+1);
                        //console.log("work"+a+"_img");
                        var aaa = document.getElementById("follow"+a);
                        aaa.href = "/space/?id="+follow_list[i]["id"];
                        aaa.target = "_blank";
                        var x = document.getElementById("follow"+a+"_img");
                        x.className = "photo rounded-circle";
                        x.width = 100;
                        x.height = 100;
                        x.src = follow_list[i]["avatar_path"];
                        var y = document.getElementById("follow"+a+"_name")
                        y.innerHTML = follow_list[i]["realname"];
                    }
                }else{
                    for (var i=0;i<=data["data"]["follows"]["total"]-1;i++){
                        var a=String(i+1);
                        //console.log("work"+a+"_img");
                        var aaa = document.getElementById("follow"+a);
                        aaa.href = "/space/?id="+follow_list[i]["id"];
                        aaa.target = "_blank";
                        var x = document.getElementById("follow"+a+"_img");
                        x.className = "photo rounded-circle";
                        x.width = 100;
                        x.height = 100;
                        x.src = follow_list[i]["avatar_path"];
                        var y = document.getElementById("follow"+a+"_name")
                        y.innerHTML = follow_list[i]["realname"];
                    }
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
                    var aaa1 = document.getElementById("a1");
                    aaa1.href += "?id="+String(id);
                    var bbb1 = document.getElementById("a2");
                    bbb1.href += "?id="+String(id);
                    var ccc1 = document.getElementById("a3");
                    ccc1.href  += "?id="+String(id);
                    var ddd1 = document.getElementById("a4");
                    ddd1.href  += "?id="+String(id);
                }
            })
            .catch(error => {
                console.error('Error fetching API:', error); // 处理错误
            });
