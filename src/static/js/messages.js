$.ajax({
    url: '/api/messages/overview',
    type: "get",
    success: (data) => {
        console.log(data);
        var all_count = 0;
        data["data"].forEach((e) => {
            all_count = all_count + e["count"]; 
            var element = $("#messages-category-" + e["category"].toString() + "-count");
            e["count"] <= 0 ? element.hide() : element.html(e["count"].toString());
        })
        var element = $("#messages-count");
        all_count <= 0 ? element.hide() : element.html(all_count.toString());
    },
    error: (err) => {
        console.log(err);
    },
});