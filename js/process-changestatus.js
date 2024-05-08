const url = new URL(window.location.href);
const orderId = url.searchParams.get("orderId");

fetch(API_BASE_URL + '/api/Payment?orderId='+orderId,{
    method: "PUT",
    headers:{
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
    }
})
console.log(orderId)