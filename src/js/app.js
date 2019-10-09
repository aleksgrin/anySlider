import AnySlider from "./anySlider";

window.anySlider = new AnySlider();
const slider = document.querySelector(".slider");
const input = document.querySelector(".input");
const A = 60;
const fi1 = 0;
const fi2 = 200 * Math.PI;
const w = 1 / 50;
const N = 100;

const arr = anySlider.createArrayH(fi1, fi2, 1).map(elem => {
  let xAbs = elem;
  let yAbs = A * Math.sin(w * elem);
  return { x: xAbs, y: yAbs };
});
const options = {
  arr: arr,
  type: {
    curve: 'spiral',
    fi1: 0,
    fi2: 720,
    r1: 0,
    r2: 200
  },
  values: {
    from: 0,
    to: 300
  },
  clickable: true,
  transition: {
    t: 0.4
  },
  referenceValues: {
    values: [25, 50, 100, 150, 200, 250, 275]
  },
  render: {
    visible: true,
    color: "pink",
    width: 6
  }
};

// const options = {
//   arr: arr,
//   type: {
//     curve: "arc",
//     r: 250,
//     fi1: 90,
//     fi2: 270
//   },
//   values: {
//     from: 0,
//     to: 300
//   }
// };

anySlider.init(slider, options);
anySlider.listen("start", () => {
  console.log("You started!");
});
anySlider.listen("move", () => {
  const value = anySlider.get();
  input.innerHTML = value;
  console.log("You are moving!");
});
anySlider.listen("end", () => console.log("END!!!"));
anySlider.listen("click", () => {
  const value = anySlider.get();
  input.innerHTML = value;
});
