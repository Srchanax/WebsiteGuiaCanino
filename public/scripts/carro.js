let currentIndex = 0;
const images = document.querySelectorAll('.carousel-images img');
const totalImages = images.length;

function showNextImage() {
    currentIndex = (currentIndex + 1) % totalImages;
    updateCarousel();
}

function showPreviousImage() {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    updateCarousel();
}

function updateCarousel() {
    const newTransformValue = -currentIndex * 100 + '%';
    document.querySelector('.carousel-images').style.transform = `translateX(${newTransformValue})`;
}

setInterval(showNextImage, 3000); // Muda a imagem a cada 3 segundos
