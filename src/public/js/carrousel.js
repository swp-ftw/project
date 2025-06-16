let track, prevButton, nextButton;
let originalItems, allItems;
let visibleItems, itemWidth;
let currentIndex;

function getVisibleItemsCount() {
  const width = window.innerWidth;
  if (width >= 1200) return 4;
  if (width >= 992) return 3;
  if (width >= 768) return 2;
  return 1;
}

function setupCarousel() {
  const existingClones = document.querySelectorAll('.carousel-track .carousel-item.clone');
  existingClones.forEach(clone => clone.remove());

  track = document.querySelector('.carousel-track');
  prevButton = document.querySelector('.carousel-button.prev');
  nextButton = document.querySelector('.carousel-button.next');

  originalItems = Array.from(document.querySelectorAll('.carousel-item:not(.clone)'));
  visibleItems = getVisibleItemsCount();
  document.querySelector('.carousel').style.setProperty('--visible-items', visibleItems);

  const firstClones = originalItems.slice(0, visibleItems).map(item => {
    const clone = item.cloneNode(true);
    clone.classList.add('clone');
    return clone;
  });

  const lastClones = originalItems.slice(-visibleItems).map(item => {
    const clone = item.cloneNode(true);
    clone.classList.add('clone');
    return clone;
  });

  lastClones.reverse().forEach(clone => track.prepend(clone));
  firstClones.forEach(clone => track.append(clone));

  allItems = Array.from(track.querySelectorAll('.carousel-item'));
  itemWidth = allItems[0].getBoundingClientRect().width;

  currentIndex = visibleItems;
  track.style.transition = 'none';
  track.style.transform = `translateX(-${itemWidth * currentIndex}px)`;

  setupEventListeners();
}

function updateTrackPosition() {
  const distance = itemWidth * currentIndex;
  track.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
  track.style.transform = `translateX(-${distance}px)`;
}

function setupEventListeners() {
  nextButton.onclick = () => {
    currentIndex++;
    updateTrackPosition();
  };

  prevButton.onclick = () => {
    currentIndex--;
    updateTrackPosition();
  };

  track.addEventListener('transitionend', () => {
    const totalItems = allItems.length;
    const maxIndex = totalItems - visibleItems;

    if (currentIndex >= maxIndex) {
      track.style.transition = 'none';
      currentIndex = visibleItems;
      track.style.transform = `translateX(-${itemWidth * currentIndex}px)`;
    }

    if (currentIndex === 0) {
      track.style.transition = 'none';
      currentIndex = totalItems - visibleItems * 2;
      track.style.transform = `translateX(-${itemWidth * currentIndex}px)`;
    }
  });
}

setupCarousel();

window.addEventListener('resize', () => {
  setupCarousel();
});
