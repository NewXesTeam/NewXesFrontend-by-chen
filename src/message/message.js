fetch('/api/messages/overview')
    .then(data => data.json())
    .then(data => {
        let all_count = 0;
        data.data.forEach(e => {
            all_count = all_count + e.count;
            let element = document.getElementById(`category-messages-${e.category}`);
            e.count <= 0 ? element.style.cssText = "display: none" : element.innerHTML = e.count.toString();
        })
    })
    .catch(err => {
        console.log(err);
    })

const categories = ["", "评论与回复", "点赞与收藏", "反馈与审核", "系统消息", "关注消息"];

window.message_last_page = 1;
window.message_category = 1;
window.message_page = 1;

const _setup_page_nav = () => {
    let prev = document.getElementById(`${id}-page-prev`);
    let num = document.getElementById(`${id}-page-num`);
    let next = document.getElementById(`${id}-page-next`);
    prev.className = window.discover_page === 1 ? "page-item disabled" : "page-item";
    next.className = window.discover_page === 200 ? "page-item disabled" : "page-item";
    num.value = window.discover_page;
}

const _set_message_page = page => {
    if (page < 1) page = 1;
    if (page > window.message_last_page) page = window.message_last_page;
    window.message_page = page;
}

const _messages_html = data => {
    let html_content = '';
    data.forEach(e => {
        let user_avatar = e.send_user_avatar_path;
        let user_name = e.send_username;
        let user_id = e.send_user_id;

        let project_name = e.topic.text;
        let project_thumb = e.topic.thumbnail;
        let project_url = e.topic.link;

        let comment_content = e.content.main.content;
        comment_content = comment_content.replace("\n", "<br>");
        let comment_target_id = e.content.main.target_id;
        let comment_date_time = e.content.main.created_at;

        let tip;
        if (e.subtype === "comment") {
            tip = `${user_name} 在 ${project_name} 发表了评论。`;
        } else {
            let origin_comment = e.content.sub.content;
            tip = `${user_name} 回复了你的评论：${origin_comment}`
        }

        let content = `
<li class="list-group-item">
    <div class="d-flex">
        <div>
            <a href="https://code.xueersi.com/space/${user_id}" target="_blank" style="margin-right: 10px;">
                <img class="avatar" src="${user_avatar}">
            </a>
        </div>
        <div class="flex-fill row row-cols-1">
            <div class="col fs-6">${tip}</div>
            <div class="col fs-5" style="margin-top: 5px; margin-bottom: 5px;">${comment_content}</div>
            <div class="col fs-6">
                <span>${comment_date_time}</span>
                <div class="btn-group btn-group-sm" role="group">
                    <button type="button" class="btn btn-light" [act]${comment_target_id}>回复</button>
                    <button type="button" class="btn btn-light" [act]${comment_target_id}>删除</button>
                </div>
            </div>
        </div>
        <div>
            <a href="${project_url}" target="_blank">
                <img class="project" src="${project_thumb}">
            </a>
        </div>
    </div>
</li>`
        html_content = html_content + content;
    })
    return html_content;
}

const _get_messages = async (category, page) => {
    let res = await fetch(`/api/messages?category=${category}&page=${page}&per_page=10`);
    let data = await res.json();
    data = data.data;
    window.message_last_page = data.last_page;
    return data.data;
}

const update_message_box = () => {
    let message_category_box = document.getElementById("message-category-box");
    message_category_box.innerHTML = categories[window.message_category];
}

const load_message = async () => {
    let data = await _get_messages(window.message_category, window.message_page);
    let box = document.getElementById("message-content");
    box.innerHTML = _messages_html(data);
}

const switch_category = id => {
    if (id < 1) id = 1;
    if (id > 5) id = 5;
    window.message_category = id;
    window.message_page = 1;
    load_message();
}
