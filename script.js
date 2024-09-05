document.addEventListener('DOMContentLoaded', function () {
  let slideIndex = 0;
  const slides = document.getElementsByClassName('slide');
  const autoSwitch = true;
  let interval;
  let isAutoSliding = false;
  const firstSlideDuration = 3200;
  const otherSlideDuration = 3000;
  const pagination = document.querySelector('.pagination');
  const btnBuy = document.querySelector('.btn-buy');
  const counter = document.querySelector('.counter');
  const samsungLogo = document.querySelector('.samsung-logo');
  const slogan = document.querySelector('.slogan');
  const blockquote = document.querySelectorAll('.blockquote');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  const line1 = document.querySelector('.line-1');
  const line2 = document.querySelector('.line-2');
  const line3 = document.querySelector('.line-3');
  let circleCount = 0;

  function showSlide(index) {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }

    slides[index].style.display = 'flex';

    counter.innerHTML = `${index}/${slides.length - 1}`;

    if (index === 0) {
      pagination.classList.add('hidden');
      btnBuy.classList.add('hidden');

      samsungLogo.classList.remove('logo-animate');
      void samsungLogo.offsetWidth;
      samsungLogo.classList.add('logo-animate');

      line1.classList.remove('line1-animation');
      line2.classList.remove('line2-animation');
      line3.classList.remove('line3-animation');
      void line1.offsetWidth, line2.offsetWidth, line3.offsetWidth;
      line1.classList.add('line1-animation');
      line2.classList.add('line2-animation');
      line3.classList.add('line3-animation');
    } else {
      pagination.classList.remove('hidden');
      btnBuy.classList.remove('hidden');
    }

    const extraLarge = window.matchMedia(
      '(min-width: 1200px) and (max-width: 1399px)'
    );
    const large = window.matchMedia(
      '(min-width: 992px) and (max-width: 1199px)'
    );
    const medium = window.matchMedia(
      '(min-width: 768px) and (max-width: 991px)'
    );
    const small = window.matchMedia(
      '(min-width: 576px) and (max-width: 767px)'
    );

    if (index === 3) {
      switch (true) {
        case extraLarge.matches:
          blockquote[index - 1].style.paddingTop = '267px';
          break;

        case large.matches:
          blockquote[index - 1].style.paddingTop = '217px';
          break;

        case medium.matches:
          blockquote[index - 1].style.paddingTop = '165px';
          break;

        case small.matches:
          blockquote[index - 1].style.paddingTop = '135px';
          break;

        default:
          blockquote[index - 1].style.paddingTop = '300px';
          break;
      }
    } else if (index === 4) {
      switch (true) {
        case extraLarge.matches:
          blockquote[index - 1].style.paddingTop = '240px';
          break;

        case large.matches:
          blockquote[index - 1].style.paddingTop = '190px';
          break;

        case medium.matches:
          blockquote[index - 1].style.paddingTop = '160px';
          break;

        case small.matches:
          blockquote[index - 1].style.paddingTop = '125px';
          break;

        default:
          blockquote[index - 1].style.paddingTop = '270px';
          break;
      }
    }

    if (index === 1 || index === 2 || index === 3) {
      slogan.classList.add('text-down');
    } else if (index === 4) {
      slogan.classList.add('text-up');
    } else if (index === 5) {
      slogan.classList.remove('text-up');
      slogan.classList.add('text-down');
    } else if (index === 0) {
      slogan.classList.remove('text-down');
    }

    if (isAutoSliding && index !== 0) {
      setTimeout(() => {
        nextBtn.classList.add('btn-active');
      }, 2500);

      setTimeout(() => {
        nextBtn.classList.remove('btn-active');
      }, 3000);
    }
  }

  function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;

    if (slideIndex === 0 && circleCount > 0) {
      slideIndex = 1;
    }

    if (slideIndex >= 5) circleCount++;

    showSlide(slideIndex);
    updateInterval();
  }

  function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;

    if (slideIndex === 0 && circleCount > 0) {
      slideIndex = 5;
    }

    showSlide(slideIndex);
    updateInterval();

    if (slideIndex === 5) {
      slogan.classList.add('text-up');
    } else if (slideIndex === 1 || slideIndex === 2 || slideIndex === 3) {
      slogan.classList.remove('text-up');
      slogan.classList.add('text-down');
    }
  }

  function updateInterval() {
    clearInterval(interval);
    const duration = slideIndex === 0 ? firstSlideDuration : otherSlideDuration;
    interval = setInterval(nextSlide, duration);
  }

  function startSlideshow() {
    isAutoSliding = true;
    updateInterval();
  }

  function stopSlideshow() {
    isAutoSliding = false;
    clearInterval(interval);
  }

  nextBtn.addEventListener('click', function () {
    stopSlideshow();
    nextSlide();
    if (autoSwitch) startSlideshow();
  });

  prevBtn.addEventListener('click', function () {
    stopSlideshow();
    prevSlide();
    if (autoSwitch) startSlideshow();
  });

  for (let i = 0; i < slides.length; i++) {
    slides[i].addEventListener('mouseover', function () {
      stopSlideshow();
    });

    slides[i].addEventListener('mouseout', function () {
      if (autoSwitch) startSlideshow();
    });
  }

  showSlide(slideIndex);
  startSlideshow();
});
