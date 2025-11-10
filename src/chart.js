// chart.js
const css = getComputedStyle(document.documentElement);
const purple = (css.getPropertyValue("--wtt-purple-1") || "#9B5CFF").trim();
const orange = (css.getPropertyValue("--wtt-orange-2") || "#FF6A00").trim();

const labels = [];
const ctx = finishElmt.chart.getContext("2d");

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels,
    datasets: [
      {
        label: "Joueur 1",
        data: [],
        stepped: true,
        borderColor: purple,
        pointBackgroundColor: "#fff",
        borderWidth: 3,
      },
      {
        label: "Joueur 2",
        data: [],
        stepped: true,
        borderColor: orange,
        pointBackgroundColor: "#fff",
        borderWidth: 3,
      },
    ],
  },
  options: {
    responsive: true,
    animation: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { title: { display: true, text: "Échanges" } },
      y: { title: { display: true, text: "Points Gagnés" }, beginAtZero: true },
    },
  },
});

function setSelection(val) {
  const curr = dataChart[val - 1];
  chart.data.labels = curr.labels;
  chart.data.datasets[0].data = curr.p1;
  chart.data.datasets[1].data = curr.p2;
  chart.data.datasets[0].label = match.p1;
  chart.data.datasets[1].label = match.p2;
  chart.update();
}
