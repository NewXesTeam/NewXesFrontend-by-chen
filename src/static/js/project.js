const project_follows = () => {
    fetch("/api/index/works/follows")
    .then(e => e.json())
    .then(data => {
        data = data.data;
        let box = document.getElementById("project-follows")
        data.forEach(project => {
            let link = `https://code.xueersi.com/home/project/detail?lang=code&pid=${project.id}&version=${project.version}&langType=${project.lang}`;
            let title = project.name
            let author = project.username;
            let author_url = `https://code.xueersi.com/space/${project.user_id}`;
            let cover = project.thumbnail;
            let infos = `👀${project.views} 👍${project.likes}`;
            let created_at = project.created_at;
            let html = `<div class="col"><div class="card m-3"><a href="${link}" class="text-decoration-none"><img src="${cover}" class="card-img-top project-card-img" alt="${title}"><div class="card-body"><h5 class="card-title">${title}</h5><p class="card-text" style="transform: rotate(0);"><a href="${author_url}">${author}</a> ${infos}</p><p class="card-text"><small class="text-body-secondary">${created_at}</small></p></div></a></div></div>`;
            box.innerHTML = box.innerHTML + html;
        });
    })
}