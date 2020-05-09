const imageChanger = () => {
  const command = document.getElementById(`command`),
        commandPhoto = command.querySelectorAll(`.command__photo`);

  commandPhoto.forEach((item) => {
    item.addEventListener(`mouseenter`, () => {
      const src = item.src;
      item.src = item.dataset.img;

      item.addEventListener(`mouseleave`, () => {
        item.src = src;
      });
    });
  });
};