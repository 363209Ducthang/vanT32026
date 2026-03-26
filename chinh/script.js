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

// sách
/* =========================================
   HIỆU ỨNG 3D CHO QUYỂN SÁCH
   ========================================= */
(function () {
  const scene = document.getElementById("readingBookScene");
  const book = document.getElementById("readingBook");
  const rows = Array.from(document.querySelectorAll(".book-site-row"));

  if (!scene || !book) return;

  let rafId = null;
  let activeRowIndex = 0;

  function resetBook() {
    book.style.transform = window.innerWidth > 992
      ? "rotateX(8deg) rotateY(-12deg)"
      : "none";

    scene.style.setProperty("--glow-x", "50%");
    scene.style.setProperty("--glow-y", "32%");
  }

  resetBook();

  function moveBook(event) {
    if (window.innerWidth <= 992) return;

    const rect = scene.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    const rotateY = -12 + (px - 0.5) * 16;
    const rotateX = 8 - (py - 0.5) * 12;

    scene.style.setProperty("--glow-x", `${px * 100}%`);
    scene.style.setProperty("--glow-y", `${py * 100}%`);

    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      book.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  }

  scene.addEventListener("mousemove", moveBook);
  scene.addEventListener("mouseleave", resetBook);
  window.addEventListener("resize", resetBook);

  if (rows.length) {
    rows[0].classList.add("is-highlighted");

    setInterval(() => {
      rows[activeRowIndex].classList.remove("is-highlighted");
      activeRowIndex = (activeRowIndex + 1) % rows.length;
      rows[activeRowIndex].classList.add("is-highlighted");
    }, 2200);
  }
})();
