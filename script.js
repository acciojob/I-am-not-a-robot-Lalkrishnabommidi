const heading = document.getElementById("h");
const para = document.getElementById("para");
const reset = document.getElementById("reset");
const verify = document.getElementById("verify");
const images = document.querySelectorAll("img");

let selectedImages = [];

heading.textContent =
  "Please click on the identical tiles to verify that you are not a robot.";

reset.style.display = "none";
verify.style.display = "none";
para.textContent = "";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setupImages() {
  const originalSources = Array.from(images).map((image) => image.src);

  const duplicateIndex = Math.floor(
    Math.random() * originalSources.length
  );

  const imageList = [
    ...originalSources,
    originalSources[duplicateIndex]
  ];

  shuffle(imageList);

  images.forEach((image, index) => {
    image.src = imageList[index];
    image.dataset.name = imageList[index];
  });
}

setupImages();

images.forEach((image) => {
  image.addEventListener("click", function () {
    if (selectedImages.includes(image)) {
      return;
    }

    if (selectedImages.length >= 2) {
      return;
    }

    selectedImages.push(image);
    image.classList.add("selected");

    reset.style.display = "block";

    if (selectedImages.length === 2) {
      verify.style.display = "block";
    }
  });
});

reset.addEventListener("click", function () {
  selectedImages = [];

  images.forEach((image) => {
    image.classList.remove("selected");
  });

  reset.style.display = "none";
  verify.style.display = "none";
  para.textContent = "";

  heading.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";
});

verify.addEventListener("click", function () {
  if (selectedImages.length !== 2) {
    return;
  }

  if (
    selectedImages[0].dataset.name ===
    selectedImages[1].dataset.name
  ) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verify.style.display = "none";
});