// Закрити фіксований відеопрогравач
document.addEventListener('DOMContentLoaded', function() {
  var videoPopup = document.querySelector('.video-popup');
  var closeBtn = videoPopup.querySelector('.close-btn');

  closeBtn.addEventListener('click', function() {
    videoPopup.style.display = 'none';
  });
});

// Поява карток при прокрутці
const cardElements = document.querySelectorAll('.content-container-cards');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    } else {
      entry.target.classList.remove('fade-in');
    }
  });
}, { threshold: 0.8 });

cardElements.forEach((card) => {
  observer.observe(card);
});

const cardElementsFF = document.querySelectorAll('.content-container-cards-whatWeDo');

const observerFF = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    } else {
      entry.target.classList.remove('fade-in');
    }
  });
}, { threshold: 0.8 });

cardElements.forEach((card) => {
  observer.observe(card);
});


// Збільшення картинки при прокрутці вниз
const imageElementFirstScreen = document.querySelector('.image-FScreen');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const imagePosition = imageElementFirstScreen.offsetTop;
  const windowHeight = window.innerHeight;

  if (scrollPosition > imagePosition - windowHeight * 0.2) {
    const scale = 0.8 + (scrollPosition - (imagePosition - windowHeight / 100)) / windowHeight;
    imageElementFirstScreen.style.transform = `scale(${scale})`;
  }
});

const imageElement = document.querySelector('.trial-photo');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const imagePosition = imageElement.offsetTop;
  const windowHeight = window.innerHeight;

  if (scrollPosition > imagePosition - windowHeight * 0.2) {
    const scale = 0.8 + (scrollPosition - (imagePosition - windowHeight / 100)) / windowHeight;
    imageElement.style.transform = `scale(${scale})`;
  }
});

//