export const initSlider = (id) => {
  // Get specified carousel by id
  const carouselContainer = document.getElementById(id);
  if (!carouselContainer) return;

  const imageList = carouselContainer.querySelector(
    ".slider-wrapper .image-list"
  );
  const slideButtons = carouselContainer.querySelectorAll(
    ".slider-wrapper .slide-button"
  );
  const sliderScrollbar = carouselContainer.querySelector(
    ".carousel-container .slider-scrollbar"
  );
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  imageList.scrollLeft = 0;

  const updateMaxScrollLeft = () => {
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    return maxScrollLeft;
  };

  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition =
      sliderScrollbar.getBoundingClientRect().width -
      scrollbarThumb.offsetWidth;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      // Ensure the scrollbar thumb stays within bounds
      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
      carouselContainer.removeEventListener("mousemove", handleMouseMove);
      carouselContainer.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners for drag interaction
    carouselContainer.addEventListener("mousemove", handleMouseMove);
    carouselContainer.addEventListener("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks

  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
    const maxScrollLeft = updateMaxScrollLeft();
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
    updateScrollThumbPosition();
  });

  window.addEventListener("load", initSlider);
  window.addEventListener("resize", () => {
    updateMaxScrollLeft();
    initSlider();
  });
};
