const effectStyle = document.createElement("style");
effectStyle.innerHTML = `
.falling-literary {
  position: fixed;
  top: -80px;
  pointer-events: none;
  z-index: 9999;
  user-select: none;
  animation-name: literaryFall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.12));
  opacity: 0.8;
}

@keyframes literaryFall {
  0% {
    transform: translateY(-80px) translateX(0) rotate(0deg) scale(0.9);
    opacity: 0;
  }
  10% {
    opacity: 0.75;
  }
  50% {
    transform: translateY(50vh) translateX(25px) rotate(140deg) scale(1);
    opacity: 0.9;
  }
  100% {
    transform: translateY(110vh) translateX(-25px) rotate(300deg) scale(0.95);
    opacity: 0;
  }
}
`;
document.head.appendChild(effectStyle);

const literaryItems = ["📚", "📖", "🖋️", "✒️"];

for (let i = 0; i < 22; i++) {
  const item = document.createElement("div");
  item.className = "falling-literary";
  item.innerHTML = literaryItems[Math.floor(Math.random() * literaryItems.length)];

  const size = Math.random() * 18 + 20;
  const duration = Math.random() * 6 + 8;
  const delay = Math.random() * 10;
  const left = Math.random() * 100;
  const opacity = Math.random() * 0.35 + 0.45;

  item.style.left = `${left}vw`;
  item.style.fontSize = `${size}px`;
  item.style.animationDuration = `${duration}s`;
  item.style.animationDelay = `${delay}s`;
  item.style.opacity = opacity;

  document.body.appendChild(item);
}

function hasClassName(inElement, inClassName) {
  var regExp = new RegExp("(?:^|\\s+)" + inClassName + "(?:\\s+|$)");
  return regExp.test(inElement.className);
}

function addClassName(inElement, inClassName) {
  if (!hasClassName(inElement, inClassName)) {
    inElement.className = [inElement.className, inClassName].join(" ");
  }
}

function removeClassName(inElement, inClassName) {
  if (hasClassName(inElement, inClassName)) {
    var regExp = new RegExp("(?:^|\\s+)" + inClassName + "(?:\\s+|$)", "g");
    var curClasses = inElement.className;
    inElement.className = curClasses.replace(regExp, " ").trim();
  }
}

function toggleClassName(inElement, inClassName) {
  if (hasClassName(inElement, inClassName)) {
    removeClassName(inElement, inClassName);
  } else {
    addClassName(inElement, inClassName);
  }
}

function toggleShape() {
  var shape = document.getElementById("shape");
  if (!shape) return;

  if (hasClassName(shape, "ring")) {
    removeClassName(shape, "ring");
    addClassName(shape, "cube");
  } else {
    removeClassName(shape, "cube");
    addClassName(shape, "ring");
  }

  var stage = document.getElementById("stage");
  if (!stage) return;

  if (hasClassName(shape, "ring")) {
    stage.style.webkitTransform = "translateZ(-200px)";
    stage.style.transform = "translateZ(-200px)";
  } else {
    stage.style.webkitTransform = "";
    stage.style.transform = "";
  }
}

document.querySelectorAll(".slider, .slider2").forEach((slider) => {
  const slides = slider.querySelectorAll(".slide");
  if (!slides.length) return;

  let index = 0;

  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === 0) slide.classList.add("active");
  });

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 2000);
});