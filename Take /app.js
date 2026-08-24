const input = document.getElementById("imageInput");
const preview = document.getElementById("preview");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const asciiOutput = document.getElementById("ascii");
const widthSlider = document.getElementById("widthSlider");

const copyButton = document.getElementById("copyButton");

// Dark → light
const characters = "@%#*+=-:. ";

let currentImage = null;

input.addEventListener("change", event => {

  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(event) {

    const image = new Image();

    image.onload = function() {

      currentImage = image;

      preview.src = image.src;
      preview.style.display = "block";

      generateASCII();
    };

    image.src = event.target.result;
  };

  reader.readAsDataURL(file);
});


widthSlider.addEventListener("input", () => {

  if (currentImage) {
    generateASCII();
  }

});


function generateASCII() {

  const width = Number(widthSlider.value);

  /*
    Characters are taller than they are wide,
    so compensate for their aspect ratio.
  */

  const ratio =
    currentImage.height /
    currentImage.width;

  const height =
    Math.floor(width * ratio * 0.5);

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(
    currentImage,
    0,
    0,
    width,
    height
  );

  const imageData =
    ctx.getImageData(
      0,
      0,
      width,
      height
    );

  const pixels = imageData.data;

  let ascii = "";

  for (let y = 0; y < height; y++) {

    for (let x = 0; x < width; x++) {

      const index =
        (y * width + x) * 4;

      const red = pixels[index];
      const green = pixels[index + 1];
      const blue = pixels[index + 2];

      // Convert RGB to brightness

      const brightness =
        0.299 * red +
        0.587 * green +
        0.114 * blue;

      const characterIndex =
        Math.floor(
          (brightness / 255) *
          (characters.length - 1)
        );

      ascii += characters[characterIndex];
    }

    ascii += "\n";
  }

  asciiOutput.textContent = ascii;
}


copyButton.addEventListener("click", async () => {

  const text = asciiOutput.textContent;

  try {

    await navigator.clipboard.writeText(text);

    copyButton.textContent = "Copied ✓";

    setTimeout(() => {
      copyButton.textContent = "Copy ASCII";
    }, 1500);

  } catch {

    alert("Could not copy ASCII.");

  }

});
