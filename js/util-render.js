window.renderProducts =  function (products){
    
    const listproductHTML = products.map(product => {
      return `
        <div class="product">
          <div class="product_img">
            <button class="product_ct">
              <a href="/detail-product.html?productid=${product.id}">XEM CHI TIẾT</a>
            </button>
            <div class="content">
                <div class="content1">Trả góp</div>
              </div>
            <img src="${product.avatar}" />
          </div>
          <div class="product_link">
            <a href="/detail-product.html?productid=${product.id}">${product.name}</a>
          </div>
          <div class="price">
            <h2>Giá bán: ${product.price.toLocaleString('vi-VN')}</h2>
          </div>
        </div>
      `;
      
    }).join('');
      return listproductHTML;
  }