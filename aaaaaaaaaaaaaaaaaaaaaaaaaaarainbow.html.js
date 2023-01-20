const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d", {
  alpha: false,
});

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function setupInput(inputId, setFunc) {
  const input = document.getElementById(inputId);
  input.addEventListener("input", (event) => {
    setFunc(parseFloat(event.target.value));
  });
  setFunc(parseFloat(input.value));
}

let rect = { width: 50, height: 100 };
let diff = { x: 1, y: 1 };

setupInput("rect-width", (val) => (rect.width = val));
setupInput("rect-height", (val) => (rect.height = val));

setupInput("diff-x", (val) => (diff.x = val));
setupInput("diff-y", (val) => (diff.y = val));

function draw(time) {
  const i = time / 10;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const actualDiff = { x: diff.x / rect.width, y: diff.y / rect.height };

  for (let x = 0; x < canvas.width; x += rect.width) {
    for (let y = 0; y < canvas.height; y += rect.height) {
      ctx.fillStyle = `hsl(${
        i + (x / rect.width) * actualDiff.x + (y / rect.height) * actualDiff.y
      }, 100%, 50%)`;
      ctx.fillRect(x, y, rect.width, rect.height);
    }
  }

  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
