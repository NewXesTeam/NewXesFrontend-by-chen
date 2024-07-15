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

const _set_message = data => {

}

const _set_message_page = page => {
    if (page < 1) page = 1;
    if (page > window.message_last_page) page = window.message_last_page;
    window.message_page = page;
}

const _get_messages = async (category, page) => {
    let res = await fetch(`https://code.xueersi.com/api/messages?category=${category}&page=${page}&per_page=10`);
    let data = await res.json();
    data = data.data;
    window.message_last_page = data.last_page;
}

