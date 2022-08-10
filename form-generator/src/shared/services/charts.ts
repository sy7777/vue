export const randomChartColour = (seed: string): any => {
  const colours = [
    "#1abc9c",
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#34495e",
    "#16a085",
    "#27ae60",
    "#2980b9",
    "#8e44ad",
    "#2c2c54",
    "#2c3e50",
    "#f1c40f",
    "#e67e22",
    "#e74c3c",
    "#95a5a6",
    "#f39c12",
    "#d35400",
    "#c0392b",
    "#bdc3c7",
    "#7f8c8d",
    "#ff9ff3",
    "#f368e0",
    "#BDC581",
    "#fdcb6e",
    "#40407a",
    "#ff5252",
    "#d1ccc0",
    "#ff793f",
    "#ffb142",
    "#218c74",
    "#34ace0",
    "#ffda79",
    "#474787",
  ];
  const hash = hashCode(seed).toString();
  const index: number = Math.abs(Number(hash));
  const truncated: number = index % colours.length;

  return colours[truncated];
};

const hashCode = (str: string) => {
  return str.split("").reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
};
