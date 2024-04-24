function createSwiper() {
  document.querySelectorAll('.swiper-init.is-slider').forEach(el => {
    const slider = el.querySelector('.swiper-container');
    const pagination = el.querySelector('.swiper-pagination');
    const prevBtn = el.querySelector('.swiper-button-prev');
    const nextBtn = el.querySelector('.swiper-button-next');
    let delay = 8000;

    if (el.classList.contains('home-banner-slider')) {
      delay = 3000;
    }

    try {
      new Swiper(slider, {
        speed: 800,
        autoHeight: false,
        slidesPerView: 'auto',
        autoplay: {
          delay: delay,
        },
        pagination: {
          el: pagination,
          clickable: true,
        },
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
        loop: true,
      });
    } catch (err) {
      console.log(err);
    }
  });
}

document.addEventListener('DOMContentLoaded', createSwiper);
