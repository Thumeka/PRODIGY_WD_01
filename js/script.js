document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector(".loader-container");
    setTimeout(() => {
      loader.classList.add("fade-out");
    }, 2000);
  });
  
  document.addEventListener("scroll", () => {
    const nav = document.querySelector(".navbar");
    nav.classList.toggle("navbar-scrolled", window.scrollY > 50);
  });
  
  const landingBackground = document.querySelector("#landing-background");
  const images = ["Ocean.jpg", "ME.jpg", "Mont.jpg", "sun.jpg"];
  images.forEach((image) => {
    const img = document.createElement("img");
    img.src = `assets/backgrounds/${image}`;
    img.classList.add("landing-background-image");
    landingBackground.appendChild(img);
  });
  
  const backgroundIndicators = document.querySelector("#background-indicators");
  images.forEach((image, index) => {
    const indicator = document.createElement("div");
    if (index === 0) {
      indicator.classList.add("active");
    }
    indicator.classList.add("background-indicator");
    indicator.addEventListener("click", () => {
      index = images.indexOf(image);
      slideImages();
    });
    backgroundIndicators.appendChild(indicator);
  });
  
  const landingBackgroundImages = document.querySelectorAll(
    "#landing-background img"
  );
  
  let index = 0;
  const nextSlide = () => {
    index++;
    if (index > landingBackgroundImages.length - 1) {
      index = 0;
    }
    slideImages();
  };
  
  landingBackgroundImages.forEach((image, index) => {
    image.style.left = `${index * 100}%`;
  });
  
  let autoSlide = setInterval(nextSlide, 7000);
  
  const slideImages = () => {
    landingBackgroundImages.forEach((image) => {
      image.style.transform = `translateX(-${index * 100}%)`;
    });
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 7000);
    backgroundIndicators.querySelectorAll("div").forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  };
  
  const prevSlide = () => {
    index--;
    if (index < 0) {
      index = landingBackgroundImages.length - 1;
    }
    slideImages();
  };
  
  backgroundIndicators.querySelectorAll("div").forEach((indicator, i) => {
    indicator.addEventListener("click", () => {
      index = i;
      slideImages();
    });
  });
  
const blogItemsContainer = document.querySelector(".blog-items-container");
const blogItemDetails = document.querySelector("#blog-item-details");
const overlay = document.querySelector(".blog-item-detailed-overlay");

fetch("/assets/blog-posts.json")
  .then(async (blogItems) => {
    blogItems = await blogItems.json();
    let i = 0;
    let j = 0;
    blogItems.forEach((item, index) => {
      const blogItemDetails = document.createElement("div");
      blogItemDetails.classList.add("blog-item-detailed");
      blogItemDetails.style.backgroundImage = `url(${item.images[1]})`;
      blogItemDetails.innerHTML = `
      <button class="close">&#10006;</button>
      <div class="bottom-content">
        <div class="headings">
          <h3>${item.title}</h3>
        </div>
        <p>
          ${item.content}
        </p>
      </div>
      `;

      blogItemDetails.querySelector(".close").addEventListener("click", () => {
        overlay.classList.remove("active");
        blogItemDetails.classList.remove("active");
      });

      const blogItemImage = document.createElement("div");
      blogItemImage.classList.add("blog-item-image");
      blogItemImage.classList.add("blog-item");
      blogItemImage.innerHTML = `
      <img src="${item.images[0]}" alt="" />
      <img src="/assets/zoom-in-icon.svg" alt="" class="icon" />
      <span class="overlay"></span>
      `;
      blogItemImage.addEventListener("click", () => {
        overlay.classList.add("active");
        blogItemDetails.classList.add("active");
      });

      const blogItemInfo = document.createElement("div");
      blogItemInfo.classList.add("blog-item-info");
      blogItemInfo.classList.add("blog-item");
      blogItemInfo.innerHTML = `
      <h3>${item.title}</h3>
      <p>
        ${item.content.substring(0, 100)}...
      </p>
      `;
      blogItemInfo.addEventListener("click", () => {
        blogItemDetails.classList.add("active");
        overlay.classList.add("active");
      });

      blogItemImage.addEventListener("mouseover", () => {
        blogItemImage.querySelector(".overlay").classList.add("active");
        blogItemImage.querySelector(".icon").classList.add("active");
      });
      blogItemImage.addEventListener("mouseout", () => {
        blogItemImage.querySelector(".overlay").classList.remove("active");
        blogItemImage.querySelector(".icon").classList.remove("active");
      });

      blogItemInfo.addEventListener("mouseover", () => {
        blogItemImage.querySelector(".icon").classList.add("active");
      });
      blogItemInfo.addEventListener("mouseout", () => {
        blogItemImage.querySelector(".icon").classList.remove("active");
      });

      if (i % 2 === 0) {
        blogItemsContainer.appendChild(blogItemInfo);
        blogItemsContainer.appendChild(blogItemImage);
      } else {
        blogItemsContainer.appendChild(blogItemImage);
        blogItemsContainer.appendChild(blogItemInfo);
      }

      if (j >= 1) {
        j = 0;
        i++;
      } else {
        j++;
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching blog items:", error);
  });

// scrollbar
const scroll = document.querySelector(".scrollbar");
document.addEventListener("scroll", () => {
  scroll.style.height = `${
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  }vh`;
});