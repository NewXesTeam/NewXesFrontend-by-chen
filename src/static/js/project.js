const project_common = async url => {
    const res = await fetch(url);
    let data = await res.json();
    data = data.data;
    let dicts = [];
    data.forEach(project => {
        let lang = project.project_type;
        if (lang === "compiler") lang = "code";
        let link = `https://code.xueersi.com/home/project/detail?lang=${lang}&pid=${project.id}&version=${project.version}&langType=${project.lang}`;
        let title = project.name;
        let author = project.username;
        let author_url = `https://code.xueersi.com/space/${project.user_id}`;
        let cover = project.thumbnail;
        let infos = `👀${project.views} 👍${project.likes} 👎${project.unlikes}`;
        let created_at = project.created_at;
        let dict = {
            lang, link, title, author, author_url, cover, infos, created_at
        };
        dicts.push(dict);
    });
    return dicts
}

const project_html = data => {
    let full_content = "";
    data.forEach(project => {
        let content = `
<div class="col">
    <div class="card m-3">
        <a href="${project.link}" class="text-decoration-none" target="_blank">
            <img src="${project.cover}" class="card-img-top project-card-img" alt="${project.title}">
            <div class="card-body">
                <h5 class="card-title">${project.title}</h5>
                <p class="card-text" style="transform: rotate(0);">
                    <a href="${project.author_url}" target="_blank">${project.author}</a> ${project.infos}
                </p>
                <p class="card-text">
                    <small class="text-body-secondary">${project.created_at}</small>
                </p>
            </div>
        </a>
    </div>
</div>`;
        full_content = full_content + content;
    })
    return full_content;
}

const project_follows = async box_id => {
    return project_common("/api/index/works/follows")
        .then((data) => {
            let box = document.getElementById(box_id);
            box.innerHTML = project_html(data);
        })
}
