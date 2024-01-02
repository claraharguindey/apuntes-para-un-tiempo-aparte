const table = document.getElementById("table");
const content = [
  {
    figure: 1,
    ref: "Instituto del Tiempo Suspendido",
  },
  {
    figure: 2,
    ref: "Elisabeth Freeman, Time Binds: Queer Temporalities, Queer Histories",
  },
  {
    figure: 1,
    ref: "Instituto del Tiempo Suspendido",
  },
  {
    figure: 2,
    ref: "Elisabeth Freeman, Time Binds: Queer Temporalities, Queer Histories",
  },
  {
    figure: 1,
    ref: "Instituto del Tiempo Suspendido",
  },
  {
    figure: 2,
    ref: "Elisabeth Freeman, Time Binds: Queer Temporalities, Queer Histories",
  },
  {
    figure: 1,
    ref: "Instituto del Tiempo Suspendido",
  },
  {
    figure: 2,
    ref: "Elisabeth Freeman, Time Binds: Queer Temporalities, Queer Histories",
  },
  {
    figure: 1,
    ref: "Instituto del Tiempo Suspendido",
  },
  {
    figure: 2,
    ref: "Elisabeth Freeman, Time Binds: Queer Temporalities, Queer Histories",
  },
];

table.innerHTML =  content.map(
  (item) =>
    `<tr><td class="table-image-cell"><img src='./../assets/media/hands/${item.figure}.png' alt='hands playing catscraddle' class="table-image"></td><td>${item.ref}</td></tr>`
).join("");
