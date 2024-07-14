fetch('/api/messages/overview')
    .then(data => data.json())
    .then(data => {
        let all_count = 0;
        data.data.forEach(e => {
            all_count = all_count + e.count; 
            let element = document.getElementById(`messages-category-${e.category}-count`);
            e.count <= 0 ? element.style.cssText = "display: none" : element.innerHTML = e.count.toString();
        })
        let element = document.getElementById("messages-count");
        all_count <= 0 ? element.style.cssText = "display: none" : element.innerHTML = all_count.toString();
    })
    .catch(err => {
        console.log(err);
    })