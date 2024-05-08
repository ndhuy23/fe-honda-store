const url = new URL(window.location.href);
const userId = url.searchParams.get("userId");
const detailHTML = document.getElementById("content-detail");

var data = {
    userId : userId
}
fetch(API_BASE_URL + '/api/Order/users/'+userId,{
    method: "GET",
    headers:{
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
    }
})
.then(response => response.json())
.then(async response => {
    const renderResult = await renderOrder(response)
    detailHTML.innerHTML = renderResult;
    console.log(response.data);
})
async function renderOrder(listOrder) {
    console.log(listOrder);
    const promises = listOrder.data.map(async (order) => {
      const response = await fetch(
        API_BASE_URL + `/api/Storage/${order.orderDetails[0].productId}/colors/${order.orderDetails[0].colorId}`,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      const colorResponse = await response.json();
  
      let status = 'Chưa nhận';
      let isPayment = 'Chưa thanh toán';
      if (order.isPayment == true) {
        isPayment = 'Đã thanh toán';
      }
      if (status == 6) {
        status = "Đã nhận hàng";
      }
  
      const productResponse = await fetch(
        API_BASE_URL + '/api/Product/' + order.orderDetails[0].productId,
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const product = await productResponse.json();
      return `
        <div class="container-details">
          <div class="information-invoice">
            <div class="name-details">
              Tên sản phẩm:
              <span>${product.data.name}</span>
            </div>
            <div class="price-details">
              Giá bán:
              <span>${order.total}</span>
            </div>
            <div class="payment-details">
              Tình trạng thanh toán:
              <span>${isPayment}</span>
            </div>
            <div class="delivery-details">
              Tình trạng giao hàng:
              <span>${status}</span>
            </div>
          </div>
          <div class="img-invoice">
            <img
              src="${colorResponse.data.images}"
              alt="Hinhanh"
            />
          </div>
        </div>
        <div class="space"></div>
      `;
    });
  
    const results = await Promise.all(promises);
    const listOrderHTML = results.join('');
    return listOrderHTML;
  }
// function renderOrder(listOrder){
//     console.log(listOrder);
//     const listOrderHTML = listOrder.data.map(order =>{
//         fetch(API_BASE_URL + `/api/Storage/${order.orderDetails[0].productId}/colors/${order.orderDetails[0].colorId}`,{
//             method: "GET",
//             headers:{
//                 'Content-Type': 'application/json',
//                 'Authorization' : `Bearer ${localStorage.getItem("token")}`
//             }
//         })
//         .then(response => response.json())
//         .then(response => {
//             let status = 'Chưa nhận';
//             let isPayment = 'Chưa thanh toán'
//             if(order.isPayment == true){
//                 isPayment = 'Đã thanh toán';
//             }
//             if(status == 6){
//                 status = "Đã nhận hàng"
//             }
//             console.log(response);
//             fetch(API_BASE_URL + '/api/Product/'+order.orderDetails[0].productId,{
//                 method: "GET",
//                 headers:{
//                     'Content-Type': 'application/json'
//                 }
//             })
//             .then(product => product.json())
//             .then(product =>{
//                 return `
//         <div class="container-details">
//         <div class="information-invoice">
//           <div class="name-details">
//             Tên sản phẩm:
//             <span>${product.data.name}</span>
//           </div>
//           <div class="price-details">
//             Giá bán:
//             <span>${listOrder.data.total}</span>
//           </div>
//           <div class="payment-details">
//             Tình trạng thanh toán:
//             <span>${isPayment}</span>
//           </div>
//           <div class="delivery-details">
//             Tình trạng giao hàng:
//             <span>${status}</span>
//           </div>
//         </div>
//         <div class="img-invoice">
//           <img
//             src="${response.data.images}"
//             alt="Hinhanh"
//           />
//         </div>
//       </div>
//       <div class="space"></div>
//         `;
//             })
//         })
//     }).join('');
//     return listOrderHTML;
    
// }