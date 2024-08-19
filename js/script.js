// Change header background color on scroll
window.onscroll = () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
      header.style.backgroundColor = '#E0FF6F'; // Lighter green shade when scrolling
  } else {
      header.style.backgroundColor = '#C62CD4'; // Original color when at the top
  }
};

// Toggle Navbar on small screens
document.querySelector('#menu-btn').onclick = () => {
  document.querySelector('.navbar').classList.toggle('active');
};

// Initialize Swiper
document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper('.swiper-container', {
      loop: true, // Enables continuous loop mode
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },
      pagination: {
          el: '.swiper-pagination',
          clickable: true,
      },
      slidesPerView: 1, // Number of slides visible at the same time
      spaceBetween: 20, // Space between slides in pixels
      breakpoints: {
          768: {
              slidesPerView: 2,
              spaceBetween: 30, // Increase space between slides on medium screens
          },
          1024: {
              slidesPerView: 3,
              spaceBetween: 40, // Increase space between slides on larger screens
          },
      },
  });
});
