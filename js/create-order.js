// Lấy danh sách tất cả các thẻ span


// Lấy data-cl khi bấm vào nút bán
const sellButton = document.getElementById('btn-buy');

sellButton.addEventListener('click', (event) => {
  event.preventDefault();
  const selectedSpan = document.querySelector('.cl-picker.selected');
  const url = new URL(window.location.href);
  const productId = url.searchParams.get("productid");
  const clValue = selectedSpan.getAttribute('data-cl');
  const user = localStorage.getItem("userId");
  console.log(user);
  if (user === null) {
    console.log("Mục nhập 'user' không tồn tại");
    localStorage.setItem('redirectTo', `/payment/payment-page.html?productid=${productId}&colorid=${clValue}`);
    window.location.href = '/login-register.html';
    
  }else{
    console.log("Mục nhập 'user' tồn tại:", user);
    
    // Xây dựng URL mới với productId và clValue
    const newPath = `/payment/payment-page.html?productid=${productId}&colorid=${clValue}`;
    
    // Chuyển hướng sang URL mới
    window.location.href = newPath;
  }
  
});