export const smoothScroll = () => {
  const button = document.querySelector('.header-btn');
  const section = document.querySelector('.tours-section');

  const handleScroll = () => {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  button.addEventListener('click', handleScroll);
  button.addEventListener('touchstart', handleScroll);
};

export const slider = () => {
  const buttons = document.querySelectorAll('span[data-slider]');
  const imagesWrapper = document.querySelector('.header-images-wrapper');
  const images = document.querySelectorAll('.header-images-wrapper picture');

  window.addEventListener('resize', () => {
    images.forEach((image, index) => {
      const position = image.offsetLeft;
      const button = buttons[index];
      const comparison =
        button.classList.contains('active') &&
        index === Number(button.dataset.slider);

      if (comparison) {
        setTimeout(() => {
          imagesWrapper.style.transform = `translateX(-${position}px)`;
        }, 1000);
      }
    });
  });

  const handleImage = ({ target }) => {
    buttons.forEach((button) => button.classList.remove('active'));
    const buttonIndex = Number(target.dataset.slider);

    images.forEach((image, index) => {
      const position = image.offsetLeft;

      if (index === buttonIndex) {
        imagesWrapper.style.transform = `translateX(-${position}px)`;
        target.classList.add('active');
      }
    });
  };

  buttons.forEach((button) => {
    button.addEventListener('click', handleImage);
  });
};
