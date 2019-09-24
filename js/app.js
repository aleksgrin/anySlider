import AnySlider from "./anySlider";

const anySlider = new AnySlider();
const slider = document.querySelector(".slider");

const A = 60;
const fi1 = 0;
const fi2 = 200 * Math.PI;
const w = 1 / 50;
const N = 100;

// const arr = anySlider.createArray(fi1, fi2, N).map(elem => {
//   let xAbs = elem;
//   let yAbs = A * Math.sin(w*elem);
//   return { x: xAbs, y: yAbs };
// });

const options = {
  type: {
    curve: "arc",
    r: 250,
    fi1: 90,
    fi2: 270
  }
};
alert(12341111);

anySlider.init(slider, options);
// anySlider.init(slider, arr);
