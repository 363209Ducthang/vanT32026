for (let i = 0; i < 15; i++) {
  let leaf = document.createElement("div");
  leaf.innerHTML = "🍃";
  leaf.style.position = "fixed";
  leaf.style.top = "-50px";
  leaf.style.left = Math.random() * 100 + "vw";
  leaf.style.fontSize = 15 + Math.random() * 20 + "px";
  leaf.style.animation = `fall ${5 + Math.random() * 5}s linear infinite`;
  document.body.appendChild(leaf);
}

const style = document.createElement("style");
style.innerHTML = `
@keyframes fall{
    0%{transform:translateY(-50px) rotate(0deg);}
    100%{transform:translateY(100vh) rotate(360deg);}
}`;
document.head.appendChild(style);
//
function hasClassName(inElement, inClassName) {
  var regExp = new RegExp("(?:^|\\s+)" + inClassName + "(?:\\s+|$)");
  return regExp.test(inElement.className);
}

function addClassName(inElement, inClassName) {
  if (!hasClassName(inElement, inClassName))
    inElement.className = [inElement.className, inClassName].join(" ");
}

function removeClassName(inElement, inClassName) {
  if (hasClassName(inElement, inClassName)) {
    var regExp = new RegExp("(?:^|\\s+)" + inClassName + "(?:\\s+|$)", "g");
    var curClasses = inElement.className;
    inElement.className = curClasses.replace(regExp, " ");
  }
}

function toggleClassName(inElement, inClassName) {
  if (hasClassName(inElement, inClassName))
    removeClassName(inElement, inClassName);
  else addClassName(inElement, inClassName);
}

function toggleShape() {
  var shape = document.getElementById("shape");
  if (hasClassName(shape, "ring")) {
    removeClassName(shape, "ring");
    addClassName(shape, "cube");
  } else {
    removeClassName(shape, "cube");
    addClassName(shape, "ring");
  }

  var stage = document.getElementById("stage");
  if (hasClassName(shape, "ring"))
    stage.style.webkitTransform = "translateZ(-200px)";
  else stage.style.webkitTransform = "";
}
// ảnh trượt lên xuống
let slides = document.querySelectorAll(".slide");
let index = 0;

setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 2000);
// ảnh album
