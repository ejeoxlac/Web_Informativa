const carousel = document.getElementById('carousel');
      let index = 0;

      const updateCarousel = () => {
      const width = carousel.children[0].clientWidth;
      carousel.style.transform = `translateX(-${index * width}px)`;
      };

      const autoSlide = () => {
      index = (index < carousel.children.length - 1) ? index + 1 : 0;
      updateCarousel();
      };

      setInterval(autoSlide, 3000); // Cambia cada 3 segundos
      window.addEventListener('resize', updateCarousel);