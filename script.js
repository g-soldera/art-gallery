const containers = document.querySelectorAll(".container")
let currentIndex = 0 // Índice da imagem atual

containers.forEach((container) => {
  container.addEventListener("click", () => {
    const images = container.querySelectorAll("img.lazy")
    const totalImages = images.length
    const imageSrc = images[currentIndex].getAttribute("data-src")

    const popupOverlay = document.createElement("div")
    popupOverlay.classList.add("popup-overlay")

    const popupContent = document.createElement("div")
    popupContent.classList.add("popup-content")

    const popupImage = document.createElement("img")
    popupImage.src = imageSrc

    const popupClose = document.createElement("span")
    popupClose.classList.add("closeButton")
    popupClose.innerHTML = `<ion-icon name="close-outline"></ion-icon>`

    popupClose.addEventListener("click", () => {
      document.body.removeChild(popupOverlay)
    })

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        document.body.removeChild(popupOverlay)
      } else if (event.key === "ArrowLeft") {
        showPreviousImage()
      } else if (event.key === "ArrowRight") {
        showNextImage()
      }
    })

    popupOverlay.addEventListener("click", (event) => {
      if (event.target !== popupImage) {
        document.body.removeChild(popupOverlay)
      }
    })

    popupContent.appendChild(popupImage)
    popupContent.appendChild(popupClose)
    popupOverlay.appendChild(popupContent)
    document.body.appendChild(popupOverlay)

    // Função para atualizar a imagem exibida
    const updateImage = (index) => {
      currentIndex = index
      popupImage.src = images[currentIndex].getAttribute("data-src")
    }

    // Função para exibir a imagem anterior
    const showPreviousImage = () => {
      let previousIndex = currentIndex - 1
      if (previousIndex < 0) {
        previousIndex = totalImages - 1
      }
      updateImage(previousIndex)
    }

    // Função para exibir a próxima imagem
    const showNextImage = () => {
      let nextIndex = currentIndex + 1
      if (nextIndex >= totalImages) {
        nextIndex = 0
      }
      updateImage(nextIndex)
    }

    // Adicionar eventos de deslize para mudar as imagens
    let touchStartX = 0
    popupImage.addEventListener("touchstart", (event) => {
      touchStartX = event.touches[0].clientX
    })

    popupImage.addEventListener("touchend", (event) => {
      const touchEndX = event.changedTouches[0].clientX
      const touchDiff = touchEndX - touchStartX
      const screenWidth = window.innerWidth

      if (touchDiff > 0 && touchDiff > 0.3 * screenWidth) {
        showPreviousImage()
      } else if (touchDiff < 0 && Math.abs(touchDiff) > 0.3 * screenWidth) {
        showNextImage()
      }
    })
  })
})

// Lazy loading
const lazyImages = document.querySelectorAll(".lazy")

if ("IntersectionObserver" in window) {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target
        lazyImage.src = lazyImage.getAttribute("data-src")
        lazyImage.classList.add("loaded")
        observer.unobserve(lazyImage)
      }
    })
  }, options)

  lazyImages.forEach((lazyImage) => {
    observer.observe(lazyImage)
  })
} else {
  lazyImages.forEach((lazyImage) => {
    lazyImage.src = lazyImage.getAttribute("data-src")
    lazyImage.classList.add("loaded")
  })
}
