const url = new URL(window.location.href);
const productId = url.searchParams.get("productid");
const colorId = url.searchParams.get("colorid");
const imageHTML = document.getElementById("image");
const nameHTML = document.getElementById("name");
const priceHTML = document.getElementById("price");
const productHTML = document.getElementById("nameProduct");
const colorHTML = document.getElementById("color");
const paymentHTML = document.getElementById("payment");

console.log(localStorage.getItem("userId"));
console.log(API_BASE_URL);
console.log(productId)
console.log(colorId)
fetch(API_BASE_URL + `/api/Storage/${productId}/colors/${colorId}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        fetch(API_BASE_URL + `/api/Product/${productId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(responseChild => responseChild.json())
        .then(responseChild =>{
            var colorList = [colorId]
            fetch(API_BASE_URL + `/api/Color/ids`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(colorList)
            })
            .then(responseColor =>responseColor.json())
            .then(responseColor =>{
                renderPayment(response.data, responseChild.data, responseColor.data);            
            })
        })
            
    })
paymentHTML.addEventListener("click",(event) => {
    event.preventDefault();
    const price = priceHTML.textContent
    console.log(localStorage.getItem("token"))
    const data = {
        customerId: localStorage.getItem("userId"),
        products: [
            {
                productId: productId,
                colorId: colorId,
                quantity: 1,
                price: parseInt(priceHTML.textContent.replace(/[.,]/g, ''), 10)
            }
        ]
    }
    console.log(data);
    fetch(API_BASE_URL + '/api/Order',{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        const payment = {
            storeName: "Honda Store",
            orderId: response.data.orderId,
            orderInfo: productHTML.textContent,
            amount: response.data.amount,
            userInfo: {
                userId: localStorage.getItem("userId"),
                name: localStorage.getItem("fullName")
            },
            lang: 'vi',
            paymentType: 0     
        }
        fetch(API_BASE_URL + '/api/Payment',{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(payment)
        })
        .then(response => response.json())
        .then(response => {
            window.location.href = response.data.payUrl;
        })
    })
})
function renderPayment(storage, product, color){
    console.log(localStorage.getItem("user"));
    imageHTML.src = storage.images;
    priceHTML.textContent = storage.price.toLocaleString('vi-VN');
    productHTML.textContent = product.name;
    colorHTML.textContent = color[0].name;
    nameHTML.textContent = localStorage.getItem("fullName"); 
    console.log(color)
}