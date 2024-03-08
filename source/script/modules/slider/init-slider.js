import Swiper from "swiper";
import { Navigation } from "swiper/modules";

const swiperInit = () => {
  const sliderLayout = document.querySelector(".products__swiper");
  if (!sliderLayout) return;
  return new Swiper(sliderLayout, {
    speed: 400,
    spaceBetween: 10,
    loop: true,
    modules: [Navigation],
    wrapperClass: "products__list",
    slideClass: "products__item",
    navigation: {
      nextEl: ".products__nav-button--next",
      prevEl: ".products__nav-button--prev",
    },
    breakpoints: {
      768: {
        centeredSlides: true,
        centeredSlidesBounds: true,
        slidesPerView: 1,
      },
      1024: {
        centeredSlides: false,
        centeredSlidesBounds: false,
        slidesPerView: 2,
      },
      1340: {
        slidesPerView: 3,
      },
    },
  });
};

const mobileWidthMediaQuery = window.matchMedia("(max-width: 767px)");

let slider;

if (!mobileWidthMediaQuery.matches) {
  slider = swiperInit();
}

mobileWidthMediaQuery.addEventListener("change", function (event) {
  if (!event.matches) {
    slider = swiperInit();
  } else {
    slider.destroy(true, true);
  }
});
