export const revealOnScroll = () => {
  const sections = document.querySelectorAll('section[data-reveal]');

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;

    sections.forEach((section) => {
      const position = section.offsetTop;

      if (scroll > position * 0.5) {
        section.classList.add('revealOnScroll');
      }
    });
  });
};

const observe = (element, section, className, delay = 1000) => {
  const elements = document.querySelectorAll(element);
  const observed = document.querySelector(section);

  const handleMutation = (mutation) => {
    const { target } = mutation[0];

    if (target.classList.contains(className)) {
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add(className);
        }, delay * index);
      });
    }
  };
  const observer = new MutationObserver(handleMutation);
  observer.observe(observed, { attributes: true });
};

export const revealAboutText = () => {
  const args = ['.about-description', '.about-section', 'revealOnScroll'];
  observe(...args);
};

export const revealCards = () => {
  const args = ['.tour-card', '.tours-section', 'revealOnScroll', 500];
  observe(...args);
};
