api = '/api/python/my?published=all&type=normal&page=1&per_page=20';
if (location.search.split("?lang=")[1].split("?page=")[0]!=undefined){
    a = document.getElementById("lang");
    for (var i=0;i<=2;i++){
        if (a.options[i].value==location.search.split("?lang=")[1].split("?page=")[0]){
            a.selectedIndex = i;
            break;
        }
    }
    b = document.getElementById("ccc");
    for (var i=0;i<=4;i++){
        if (b.options[i].value==location.search.split("?c=")[1]){
            b.selectedIndex = i;
            break;
        }
    }
    if (a.selectedIndex==0) api = `/api/projects/my?published=${location.search.split("?c=")[1]}&type=normal&page=${location.search.split("?lang=")[1].split("?page=")[1].split("?c=")[0]}&per_page=20`;
    if (a.selectedIndex==1) api = `/api/python/my?published=${location.search.split("?c=")[1]}&type=normal&page=${location.search.split("?lang=")[1].split("?page=")[1].split("?c=")[0]}&per_page=20`;
    if (a.selectedIndex==2) api = `/api/compilers/my?published=${location.search.split("?c=")[1]}&type=normal&page=${location.search.split("?lang=")[1].split("?page=")[1].split("?c=")[0]}&per_page=20`;
}
var topY;
const show = function(name,id,type,thumbnail) {
    document.getElementById("project-name").value = String(name);
    document.getElementById("biaoqian").value = "";
    document.getElementById("jieshao").value = "";
    if (type=="scratch") type = "project";
    if (thumbnail==null) thumbnail = "https://static0.xesimg.com/talcode/assets/py/default-python-thumbnail.png?pipeline=size,w_640/fm,webp";
    console.log(thumbnail);
    
    document.getElementById("cover").src = thumbnail;
    document.getElementById("image1").src = thumbnail;
    //document.getElementById("option111").value = thumbnail;
    fetch(`/api/${type+`s`}/${id}?id=${id}`)
        .then(response => {
            if (response.ok){
                return response.json();
            }
        })
        .then(data => {
            if (data["data"]["created_source"]=="adapt"){
                document.getElementById("option2").checked = true;
                document.getElementById("option1").disabled = true;
                document.getElementById("option3").disabled = true;
            }else{
                document.getElementById("option1").disabled = false;
                document.getElementById("option3").disabled = false;
                document.getElementById("option3").checked = true;
                document.getElementById("option2").disabled = true;
            }
        })
        .catch(error => console.error(error));
    document.querySelector("#poper").style.display = "flex";
    document.body.style.position = "fixed";
    topY = window.scrollY;
    document.body.style.top = -topY + "px";
    publisha = function(){
        let data = {"projectId": String(id), "name": document.getElementById("project-name").value, "description": document.getElementById("jieshao").value, "created_source": document.querySelector('input[name="group1"]:checked').value,
            "hidden_code": 2, "thumbnail": document.getElementById(`image`+document.querySelector('input[name="image"]:checked').value).src,
            "tags": document.getElementById("biaoqian").value};
        fetch(`/api/${type+`s`}/${id}/publish`, {
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
    document.getElementById("publishaaa").href = `javascript:publisha();`;
}
const close = function() {
    document.querySelector("#poper").style.display = "none";
    document.body.style.position = "";
    document.body.style.top = "";
    document.documentElement.scrollTo(0,topY);
    document.body.scrollTo(0,topY);
}
fetch(api)
    .then(response => {
        if (response.ok){
            return response.json();
        }
    })
    .then(data => {
        var a = new Array();
        page = data["data"]["last_page"];
        now_page = location.search.split("?lang=")[1].split("?page=")[1].split("?c=")[0];
        console.log(data["data"]);
        list = data["data"]["data"];
        var page_num = document.getElementById("front-page-num");
        page_num.max = String(page);
        page_num.placeholder = "1~"+page_num.max;
        page_num.value = String(location.search.split("?lang=")[1].split("?page=")[1].split("?c=")[0]);
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

        var j=0,h=0;
        for (var i=1;i<=5;i++){
            var aaaaa = document.getElementById("works");
            var element = document.createElement("div");
            element.className = "row";
            aaaaa.appendChild(element);
            for (var x=1;x<=5;x++){
                var div = document.createElement("div");
                div.className = "col";
                div.align = "center";
                element.appendChild(div);
                var card = document.createElement("div");
                card.className = "card";
                div.appendChild(card);
                var a = document.createElement("a");
                a.className = "btn";
                //a.style.textAlign = "center";
                a.href = `https://code.xueersi.com/home/project/detail?lang=${list[j]["lang"]}&pid=${list[j]["id"]}&version=${list[j]["version"]}&langType=${list[j]["lang"]}`;
                a.target = "_blank";
                //a.align = "center";
                card.appendChild(a);
                var img = document.createElement("img");
                if (list[j]["thumbnail"]==null){
                    img.src = "https://t.100tal.com/avatar/%E6%9C%AA%E5%8F%91";
                }else{
                    img.src = list[j]["thumbnail"];
                }
                img.width = 100;
                img.height = 100;
                a.appendChild(img);
                var p = document.createElement("p");
                p.style.height = "8px";
                p.innerText = list[j]["name"];
                a.appendChild(p);
                //console.log(j);
                // ul = document.createElement("ul");
                // ul.className = "popup-menu";
                // ul.style = "width:150px;";
                // card.appendChild(ul);
                // li = document.createElement("li");
                // li.innerHTML = `<a href=${"https://code.xueersi.com/ide/code/"+list[j]["id"]}>改编</a>`;
                // ul.appendChild(li);
                //a.innerHTML+=`<ul class= style=><li><a href="#">选项1</a></li><li><a href="#">选项2</a></li><li><a href="#">选项3</a></li></ul>`;
                var aaa = document.createElement("a");
                if (location.search.split("?lang=")[1].split("?page=")[0]!="scratch")
                {
                    aaa.href = "https://code.xueersi.com/ide/code/"+list[j]["id"];
                }
                else{
                    if (list[j]["version"]=="hw1.0")
                        aaa.href = `https://code.xueersi.com/scratchmb/?pid=${list[j]["id"]}&version=hw1.0&env=community`
                    else
                        aaa.href = `https://code.xueersi.com/scratch3/?pid=${list[j]["id"]}&version=3.0&env=community`
                }
                btn_group = document.createElement("div");
                btn_group.className = "btn-toolbar";
                btn_group.style.width = "auto";
                card.appendChild(btn_group);
                aaa.innerText = "编辑";
                aaa.style = "color:brown;width:60px;float:left;";
                aaa.className = "btn";
                aaa.target = "_blank";
                btn_group.appendChild(aaa);
                if (list[j]["published"]==0){
                    var delete_work = document.createElement("a");
                    delete_work.innerText = "删除";
                    delete_work.style = "color:brown;width:60px;float:left;";
                    delete_work.className = "btn";
                    delete_work.href = "#";
                    if (location.search.split("?lang=")[1].split("?page=")[0]!="scratch"){
                        xxx = function(id){
                            let data = {"id":id};
                            fetch(`/api/compilers/${id}/delete`, {
                                method: 'POST',
                                headers: {
                                'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data)
                            })
                                .then(response => response.text())
                                .then(data => console.log(data))
                                .catch(error => console.error(error));
                            //location.reload(true);
                            //console.log(id);
                        }
                    }else{
                        xxx = function(id){
                            let data = {"id":id};
                            fetch(`/api/projects/${id}/delete`, {
                                method: 'POST',
                                headers: {
                                'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data)
                            })
                                .then(response => response.text())
                                .then(data => console.log(data))
                                .catch(error => console.error(error));
                            //location.reload(true);
                            //console.log(id);
                        }
                    }
                    delete_work.href = `javascript:xxx(${list[j]["id"]});`
                    btn_group.appendChild(delete_work);
                }
                var publish = document.createElement("a");
                if (list[j]["published"]==0){
                    publish.innerText = "发布";
                    document.querySelector("#poper").addEventListener("click",close);
                    document.querySelector("#outer").addEventListener("click",function(event){event.stopPropagation()});
                    publish.href = `javascript:show(${JSON.stringify(list[j]["name"])},${list[j]["id"]},${JSON.stringify(list[j]["project_type"])},${JSON.stringify(list[j]["thumbnail"])});`
                }else{
                    publish.innerText = "取消发布";
                    if (location.search.split("?lang=")[1].split("?page=")[0]!="scratch"){
                        cancel = function(id){
                            let data = {"id":id};
                            fetch(`/api/compilers/${id}/cancel_publish`, {
                                method: 'POST',
                                headers: {
                                'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data)
                            })
                                .then(response => response.text())
                                .then(data => console.log(data))
                                .catch(error => console.error(error));
                            //location.reload(true);
                            //console.log(id);
                        }
                    }else{
                        cancel = function(id){
                            let data = {"id":id};
                            fetch(`/api/projects/${id}/cancel_publish`, {
                                method: 'POST',
                                headers: {
                                'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(data)
                            })
                                .then(response => response.text())
                                .then(data => console.log(data))
                                .catch(error => console.error(error));
                            //location.reload(true);
                            //console.log(id);
                        }
                    }
                    publish.href = `javascript:cancel(${list[j]["id"]});`
                }
                publish.style = "color:brown;width:110px;float:right;";
                publish.className = "btn float-end";
                //publish.target = "_blank";
                btn_group.appendChild(publish)
                j++;
            }
        }
    })
    .catch(error =>{
        console.error('Error fetching API:', error);
    });

const change_lang = function(){
    var myselect = document.getElementById("lang");
    if (location.search.split("?lang=")[1].split("?page=")[0]==undefined){
        window.location.href = window.location.href+`?lang=${myselect.options[myselect.selectedIndex].value}?page=1?c=all`;
    }else{
        window.location.href = window.location.href.split("?lang=")[0]+`?lang=${myselect.options[myselect.selectedIndex].value}?page=1?c=all`;
    }
}
const change_a = function(){
    var myselect = document.getElementById("ccc");
    if (location.search.split("?lang=")[1].split("?page=")[1].split("?c=")==undefined){
        window.location.href = window.location.href+`?lang=${location.search.split("?lang=")[1].split("?page=")[0]}?page=1?c=${myselect.options[myselect.selectedIndex].value}`;
    }else{
        window.location.href = window.location.href.split("?lang=")[0]+`?lang=${location.search.split("?lang=")[1].split("?page=")[0]}?page=1?c=${myselect.options[myselect.selectedIndex].value}`;
    }
}
const last_page = () =>{
    var page_num = document.getElementById("front-page-num");
    page_num.value = String(Number(page_num.value)-1);
    var x = page_num.value;
    window.location.href = "/user/?lang="+location.search.split("?lang=")[1].split("?page=")[0]+"?page="+String(x)+"?c="+location.search.split("?c=")[1];
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
    window.location.href = "/user/?lang="+location.search.split("?lang=")[1].split("?page=")[0]+"?page="+String(x)+"?c="+location.search.split("?c=")[1];
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
    window.location.href = "/user/?lang="+location.search.split("?lang=")[1].split("?page=")[0]+"?page="+String(x)+"?c="+location.search.split("?c=")[1];
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