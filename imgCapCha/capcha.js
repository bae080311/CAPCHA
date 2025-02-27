const startButton = document.getElementById("start");
const result = document.getElementById("result");
const container = document.getElementById("container");

const images = [
  "../images/dog.png",
  "../images/cat2.png",
  "../images/cat3.png",
  "../images/cat4.png",
  "../images/cat5.png",
];

let model;

async function loadModel() {
  model = await cocoSsd.load();
  console.log("COCO-SSD 모델 로드 완료!");
}

function createImageElement() {
  container.innerHTML = "";

  images.forEach((imageSrc) => {
    const img = document.createElement("img");
    img.src = imageSrc;
    img.width = 300;
    img.addEventListener("click", async () => {
      if (!model) {
        console.warn("모델이 아직 로드되지 않았습니다!");
        return;
      }
      const predictions = await model.detect(img);

      if (predictions.length === 0) {
        result.textContent = "인증실패";
      } else if (
        predictions.some(
          (p) => p.class.toLowerCase() === "dog" && p.score >= 0.6
        )
      ) {
        result.textContent = "인증성공";
        result.style.color = "blue";
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      } else {
        result.textContent = "인증실패";
        result.style.color = "red";
      }
    });
    container.appendChild(img);
  });
}

startButton.addEventListener("click", async () => {
  if (!model) {
    await loadModel();
  }
  createImageElement();
});
