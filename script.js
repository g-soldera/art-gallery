const containers = document.querySelectorAll(".container")

containers.forEach((container) => {
  container.addEventListener("click", () => {
    const imageSrc = container.querySelector("img").src

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
  })
})

// // lazy loading
// const lazyImages = document.querySelectorAll('.lazy');

// if ('IntersectionObserver' in window) {
//   const options = {
//     root: null,
//     rootMargin: '0px', 
//     threshold: 0.3, 
//   };

//   const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         const lazyImage = entry.target;

//         lazyImage.src = lazyImage.dataset.src;

//         lazyImage.classList.remove('lazy');

//         observer.unobserve(lazyImage);
//       }
//     });
//   }, options);

//   lazyImages.forEach((lazyImage) => {
//     observer.observe(lazyImage);
//   });
// } else {
//   lazyImages.forEach((lazyImage) => {
//     lazyImage.src = lazyImage.dataset.src;
//     lazyImage.classList.remove('lazy');
//   });
// }