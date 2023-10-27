function Slider(options) {
  options = {
    containerId: options.containerId,
    slideClass: options.slideClass || "slide",
    title: options.title || "Slider",
    prevArrowId: options.prevArrowId || "prevArrow",
    nextArrowId: options.nextArrowId || "nextArrow",
    nav: options.nav || "false",
    autoplay: options.autoplay || "false",
  };

  function init() {
    const sliderContainer = document.getElementById(options.containerId);
    const slider = sliderContainer.querySelector(".slider");
    const slides = slider.querySelectorAll(`.${options.slideClass}`);
    const prevArrow = sliderContainer.querySelector(`#${options.prevArrowId}`);
    const nextArrow = sliderContainer.querySelector(`#${options.nextArrowId}`);
    const title = sliderContainer.querySelector("#slider-title");
    let currentIndex = 0;

    function updateSlider() {
      slides.forEach((slide, index) => {
        if (index === currentIndex) {
          slide.classList.add("active");
          title.textContent = `${options.title}`;
        } else {
          slide.classList.remove("active");
        }
      });
    }
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    }
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    }
    if (options.nav === "true") {
      prevArrow.addEventListener("click", prevSlide);
      nextArrow.addEventListener("click", nextSlide);
    } else {
      slider.addEventListener("click", nextSlide);
      prevArrow.classList.add("hideArrow");
      nextArrow.classList.add("hideArrow");
    }
    if (options.autoplay === "true") {
      let autoSlideInterval;

      function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 2000);
      }

      function stopAutoSlide() {
        clearInterval(autoSlideInterval);
      }
      startAutoSlide();
      sliderContainer.addEventListener("mouseenter", stopAutoSlide);
      sliderContainer.addEventListener("mouseleave", startAutoSlide);
    }

    updateSlider();
  }

  init();
}
