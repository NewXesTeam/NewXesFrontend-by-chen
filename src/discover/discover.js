window.discover_page = 1;
window.discover_lang = "all";
window.discover_type = "latest";
window.discover_shown = false;

const _update_discover_one_nav = id => {
    let prev = document.getElementById(`${id}-page-prev`);
    let num = document.getElementById(`${id}-page-num`);
    let next = document.getElementById(`${id}-page-next`);
    prev.className = window.discover_page === 1 ? "page-item disabled" : "page-item";
    next.className = window.discover_page === 200 ? "page-item disabled" : "page-item";
    num.value = window.discover_page;
}

const update_discover_nav = () => {
    _update_discover_one_nav("front");
    _update_discover_one_nav("end");
}

const _set_discover_page = page => {
    if (page < 1) page = 1;
    if (page > 200) page = 200;
    window.discover_page = page;
}

const show_discover_nav = () => {
    let front = document.getElementById("front-page-nav");
    let end = document.getElementById("end-page-nav");
    front.style.cssText = "";
    end.style.cssText = "";
}


const project_discover_common = async (box_id, type, lang, page, per_page) => {
    return project_common(`/api/works/${type}?lang=${lang}&page=${page}&per_page=${per_page}`)
        .then((data) => {
            let box = document.getElementById(box_id)
            box.innerHTML = project_html(data)
        })
}

const set_discover_page = page => {
    _set_discover_page(page);
    update_discover_nav();
    let lang = window.discover_lang === "all" ? "" : window.discover_lang;
    project_discover_common("project-discover", window.discover_type, lang, window.discover_page, 50);
}

const nav_set_discover_page = (id) => {
    if (event.keyCode == 13) {
        let num = document.getElementById(`${id}-page-num`);
        set_discover_page(Number(num.value));
    }
}

const discover_page_prev = () => {
    set_discover_page(window.discover_page - 1);
}

const discover_page_next = () => {
    set_discover_page(window.discover_page + 1);
}

const discover_lang_changed = () => {
    let lang_radios = document.getElementsByName("discover-lang");
    lang_radios.forEach(radio => {
        if (radio.checked) {
            window.discover_lang = radio.value;
            set_discover_page(1);
            return;
        }
    })
}

const discover_category_changed = () => {
    let category_radios = document.getElementsByName("discover-category");
    category_radios.forEach(radio => {
        if (radio.checked) {
            window.discover_type = radio.value;
            set_discover_page(1);
            return;
        }
    })
}
