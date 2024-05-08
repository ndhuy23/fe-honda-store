let listProductHTML = document.getElementById("listProduct");
const card = document.querySelector('.card');
 fetch( API_BASE_URL + "/api/Product?pageIndex=1&pageSize=10", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
 })
 .then(response => response.json())
  .then(response => {
    const xeso = window.renderProducts(response.data);
    listProductHTML.innerHTML = xeso;
    //console.log(response.data)
  })
  .catch(error => {
    console.error('Lỗi khi gọi API:', error);
  });

  