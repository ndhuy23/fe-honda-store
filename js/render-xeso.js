
function renderByCategory(categoryname){
    let listProductHTML = document.getElementById("listProduct");
    const card = document.querySelector('.card');
    var data = {
        categoryName: categoryname,
        page: 1,
        pageSize : 15
    };
    fetch("https://localhost:7085/getByCategory", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        const xeso = window.renderProducts(response.data);
        listProductHTML.innerHTML = xeso;
    })
    .catch(error => {
        console.error('Lỗi khi gọi API:', error);
    });
}


