const slider = () => {
  const slide = document.querySelectorAll(`.portfolio-item`),
        slider = document.querySelector(`.portfolio-content`);

  const portfolioDots = document.querySelector(`.portfolio-dots`);

  for (let i = 0; i < slide.length; i++) {
    portfolioDots.insertAdjacentHTML(`beforeend`, `<li class="dot"></li>`);
  }
  const dot = document.querySelectorAll(`.dot`);
  dot[0].classList.add(`dot-active`);

  let currentSlide = 0,
      interval;
  
  const prevSlide = (listOfElems, index, strClass) => listOfElems[index].classList.remove(strClass);
  const nextSlide = (listOfElems, index, strClass) => listOfElems[index].classList.add(strClass);

  const autoPlaySlide = () => {

    prevSlide(slide, currentSlide, `portfolio-item-active`);
    prevSlide(dot, currentSlide, `dot-active`);
    currentSlide++;

    if (currentSlide >= slide.length) currentSlide = 0;
    nextSlide(slide, currentSlide, `portfolio-item-active`);
    nextSlide(dot, currentSlide, `dot-active`);
  };

  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  }

  slider.addEventListener(`click`, (event) => {
    event.preventDefault();

    if (!event.target.matches(`.portfolio-btn, .dot`)) return;
    
    prevSlide(slide, currentSlide, `portfolio-item-active`);
    prevSlide(dot, currentSlide, `dot-active`);

    if (event.target.matches(`#arrow-right`)) {
      currentSlide++;
    } else if (event.target.matches(`#arrow-left`)) {
      currentSlide--;
    } else if (event.target.matches(`.dot`)) {
      dot.forEach((item, index) => {
        if (item === event.target)  currentSlide = index;
      })
    }

    if (currentSlide >= slide.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slide.length - 1;

    nextSlide(slide, currentSlide, `portfolio-item-active`);
    nextSlide(dot, currentSlide, `dot-active`);
  });

  slider.addEventListener(`mouseover`, (event) => {
    if (event.target.matches(`.portfolio-btn`) || event.target.matches(`.dot`))
      stopSlide()
  });

  slider.addEventListener(`mouseout`, (event) => {
    if (event.target.matches(`.portfolio-btn`) || event.target.matches(`.dot`))
      startSlide()
  });
  
  startSlide(3000);
};

export default slider;