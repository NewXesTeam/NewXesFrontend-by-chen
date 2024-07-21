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
        e = {
            "id": 14864111,
            "send_user_id": 23023609,
            "receive_user_id": 16944115,
            "title": null,
            "content": {
                "main": {
                    "id": 4948654,
                    "topic_id": "CP_54126235",
                    "parent_id": 0,
                    "target_id": 0,
                    "user_id": "23023609",
                    "reply_user_id": "16944115",
                    "content": "本想参与，但是手中的Ydu开发任务繁重[尴尬]\n听fixed说你承接了生肉世界了",
                    "likes": 0,
                    "unlikes": 0,
                    "replies": 0,
                    "top": 0,
                    "removed": 0,
                    "links": null,
                    "created_at": "2024-07-20 16:27:57",
                    "comment_from": "topic",
                    "username": "王思涵",
                    "user_avatar_path": "https://static1.xesimg.com/udc-o-user-avatar/20210531/Talz26v0IeyB-tD11TsRLtuX2Q1437.png",
                    "reply_username": "刘镕硕",
                    "emojis": [
                        {
                            "id": "[尴尬]",
                            "url": "https://icourse.xesimg.com/programme/static/images/comments/emoji/尴尬.png",
                            "content": null,
                            "type": "image",
                            "size": "small"
                        }
                    ]
                },
                "sub": null
            },
            "status": 1,
            "category": 1,
            "subtype": "comment",
            "source": 1,
            "topic_id": "CP_54126235",
            "read_at": "2024-07-20 16:47:4",
            "ext": "",
            "created_at": "2024-07-20 16:27:58",
            "updated_at": "2024-07-20 16:47:40",
            "deleted_at": "",
            "sys_id": 0,
            "reply_status": 0,
            "send_username": "王思涵",
            "send_user_avatar_path": "https://static1.xesimg.com/udc-o-user-avatar/20210531/Talz26v0IeyB-tD11TsRLtuX2Q1437.png",
            "topic": {
                "topic_id": "CP_54126235",
                "project_id": "54126235",
                "link": "https://code.xueersi.com/home/project/detail?lang=code&pid=54126235&version=webpy&form=webpy&langType=webpy",
                "text": "NewXesTeam团队成立",
                "thumbnail": "https://static0.xesimg.com/talcode/assets/py/default-python-thumbnail.png",
                "lang": "webpy",
                "version": "webpy",
                "user_id": 16944115,
                "published": 1,
                "published_at": "2024-07-11 21:58:38",
                "removed": 0,
                "resource_type": "topic"
            },
            "comment_id": 4948654,
            "has_reply": true
        }
        let comment_id = e.comment_id;
        let comment_type = e.comment_type;
        let data_time = e.created_at;

        let user_avatar = e.send_user_avatar_path;
        let user_name = e.send_username;
        let user_id = e.send_user_id;

        
        
        let content = `
<li class="list-group-item">
    <div class="d-flex">
        <div>
            <a href="[space]">
                <img class="avatar" src="[avatar]">
            <a>
        </div>
        <div class="flex-fill row row-cols-1">
            <div class="col fs-6">[a] reply [b]: [origin]</div>
            <div class="col fs-6">[a] comment [work]</div>
            <div class="col fs-5">[content]</div>
            <div class="col fs-6">
                <span>[DateTime]</span>
                <div class="btn-group btn-group-sm" role="group">
                    <button type="button" class="btn btn-light" [act]>回复</button>
                    <button type="button" class="btn btn-light" [act]>删除</button>
                </div>
            </div>
        </div>
        <div>
            <a href="[src]">
                <img class="project" src="[project]">
            </a>
        </div>
    </div>
</li>`
        html_content = html_content + content;
    })
}

const _set_message = data => {

}

const _get_messages = async (category, page) => {
    let res = await fetch(`https://code.xueersi.com/api/messages?category=${category}&page=${page}&per_page=10`);
    let data = await res.json();
    data = data.data;
    window.message_last_page = data.last_page;
}

