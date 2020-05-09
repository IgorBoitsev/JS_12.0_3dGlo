const scrolling = () => {
  const scrollDownBtn = document.getElementById(`scroll-down`),
        menu = document.querySelector(`menu`),
        menuItems = menu.querySelectorAll(`ul > li`);
  
  menuItems.forEach((item) => {
    // Получение id блока, до которого нужно скролить
    let elemToScroll = item.querySelector(`a`).getAttribute(`href`).substr(1),
        elemToScrollHeight = document.getElementById(`${elemToScroll}`).getBoundingClientRect().top,
        scroll;

    const scrollToId = function() {
      scroll = requestAnimationFrame(scrollToId);
      if (elemToScrollHeight > 0) {
        window.scrollBy(0, 1);
        elemToScrollHeight--;
      }
      if (elemToScrollHeight < 0) {
        window.scrollBy(0, -1);
        elemToScrollHeight++;
      }
      if (elemToScrollHeight === 0) {
        cancelAnimationFrame(scroll);
      }
    }

    item.addEventListener(`click`, () => {
      requestAnimationFrame(scrollToId);
    })
  });

  let scrollToServiceBlock,
      heigthToBlock = document.getElementById(`service-block`).getBoundingClientRect().top;
  const scrollDown = function() {
    scrollToServiceBlock = requestAnimationFrame(scrollDown);
    window.scrollBy(0, 1);
    heigthToBlock--;
  };

  scrollDownBtn.addEventListener(`click`, () => {
    heigthToBlock = document.getElementById(`service-block`).getBoundingClientRect().top;

    if (heigthToBlock > 0) {
      requestAnimationFrame(scrollDown);
    } else {
      cancelAnimationFrame(scrollDown);
    }
  });
};

export default scrolling;