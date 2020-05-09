const showPopup = () => {
  const popup = document.querySelector(`.popup`),
        popupClose = document.querySelector(`.popup-close`),
        popupBtn = document.querySelectorAll(`.popup-btn`);
  let opacity;
  
  const popupAppearance = function() {
    opacity = requestAnimationFrame(popupAppearance);
    
    if (popup.style.opacity < 1) {
      popup.style.opacity = +popup.style.opacity + 0.05;
    } else {
      cancelAnimationFrame(opacity);
    }
  };

  popupBtn.forEach((item) => {
    item.addEventListener(`click`, () => {
      
      if (document.documentElement.clientWidth > 768) {
        popup.style.opacity = 0;
        popup.style.display = `block`;
        requestAnimationFrame(popupAppearance);
      } else {
          popup.style.display = `block`;
      }
    });
  });

  popup.addEventListener(`click`, (event) => {
    if (!event.target.closest(`.popup-content`) ||
        event.target.closest(`.popup-close`))
      popup.style.display = `none`;
  });
};