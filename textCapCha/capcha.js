const captchaImgElement = document.getElementById("capchaImg");
const captchaInput = document.getElementById("capchaInput");
const seeBtn = document.getElementById("seeBtn");

function generateCaptchaText() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function generateCaptchaImage(text) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 400;
  canvas.height = 200;

  ctx.font = "40px";
  ctx.fillStyle = "black";
  ctx.fillText(text, 200, 100);

  for (let i = 0; i < 10; i++) {
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.stroke();
  }

  return canvas.toDataURL();
}

function displayCaptcha() {
  const captchaText = generateCaptchaText(6);
  const captchaImage = generateCaptchaImage(captchaText);

  captchaImgElement.src = captchaImage;
  localStorage.setItem("captcha", captchaText);
}

function validateCaptcha() {
  const captchaText = localStorage.getItem("captcha");
  const userInput = captchaInput.value;

  if (userInput === captchaText) {
    alert("CAPTCHA 인증 성공!");
  } else {
    alert("CAPTCHA 인증 실패. 다시 시도하세요.");
  }
}

seeBtn.addEventListener("click", displayCaptcha);
captchaInput.addEventListener("change", validateCaptcha);
