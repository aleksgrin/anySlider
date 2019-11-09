import AnySlider from "./anySlider";

window.anySlider = new AnySlider();
const slider = document.querySelector(".slider");
const input = document.querySelector(".input");
const A = 60;
const fi1 = 0;
const fi2 = 200 * Math.PI;
const w = 1 / 50;
const N = 100;

// const arr = anySlider.createArrayH(fi1, fi2, 1).map(elem => {
//   let xAbs = elem;
//   let yAbs = A * Math.sin(w * elem);
//   return { x: xAbs, y: yAbs };
// // });
// // const arr = [...anySlider.line(20, 100, 200, 100), ...anySlider.line(200, 100, 200, 300)];
// const arr = anySlider.line(20, 100, 200, 100);
// const options = {
//   arr: arr,
//   type: {
//     curve: "spiral",
//     fi1: 60,
//     fi2: 320,
//     r1: 80,
//     r2: 200
//   },
//   values: {
//     from: 0,
//     to: 300
//   },
//   clickable: true,
//   transition: {
//     t: 0.4
//   },
//   // referenceValues: {
//   //   // values: [25, 50, 75, 100, 150, 200, 250, 275]
//   //   values: anySlider.createArrayH(10, 300, 50)
//   // },
//   // render: {
//   //   visible: true,
//   //   color: "pink",
//   //   width: 6
//   // }
// };

const arr = [
  ...anySlider.line(20, 100, 200, 100),
  ...anySlider.line(200, 100, 200, 300),
  ...anySlider.line(200, 300, 20, 100)
];
// const arr = [
//   ...anySlider.line(20, 100, 200, 100),
//   ...anySlider.arc(100, 180, 0, 300, 100),
//   ...anySlider.line(400, 100, 500, 100),
// ];
// const arr = anySlider.line(200, 300, 20, 100);
const options = {
  // arr: arr,
  type: {
    curve: "arc",
    r: 250,
    fi1: 0,
    fi2: 360,
    closed: true
  },
  behavior: {
    toggle: true
  },
  values: {
    from: 0,
    to: 300
  },
  referenceValues: {
    values: [0, 50, 100, 150, 200, 250]
  },
  render: {
    visible: true,
    color: "pink",
    width: 6,
    dashColor: "blue",
    dashWidth: 2,
    dashHeight: 50,
  },
  clickable: true,
  transition: {
    t: 500,
    timingFunction: (timeFraction) => {
      return Math.pow(timeFraction, 2);
    }
  },
};

anySlider.init(slider, options);
// anySlider.set(200)
// anySlider.listen("start", () => {
//   console.log("You started!");
// });
// anySlider.listen("move", () => {
//   const value = anySlider.get();
//   input.innerHTML = value;
//   console.log("You are moving!");
// });
// anySlider.listen("end", () => console.log("END!!!"));
// anySlider.listen("click", () => {
//   const value = anySlider.get();
//   input.innerHTML = value;
// });
