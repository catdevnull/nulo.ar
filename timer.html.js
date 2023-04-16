// @ts-nocheck
const guitaEl = document.querySelector("#guita");
const porHoraEl = document.querySelector("#por-hora");
const personasEl = document.querySelector("#personas");
const buttonEl = document.querySelector("button");

let interval = null;

buttonEl.addEventListener("click", (event) => {
  if (interval) {
    clearInterval(interval);
    buttonEl.textContent = "Empezar";
  } else {
    interval = setInterval(() => {
      guitaEl.dataset.guita =
        parseFloat(guitaEl.dataset.guita) +
        (porHoraEl.value / 60 / 60) * personasEl.value;
      guitaEl.textContent = `$ ${parseFloat(guitaEl.dataset.guita).toFixed(2)}`;
    }, 1000);
    buttonEl.textContent = "Parar";
  }
});
