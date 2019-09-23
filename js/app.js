import AnySlider from "./anySlider";

const anySlider = new AnySlider();
const slider = document.querySelector(".slider");

// const options = {
//   type: {
//     curve: "circle",
//     r: 200
//   }
// };
const options = {
  type: {
    curve: "arc",
    r: 200,
    fi1: 90,
    fi2: 270
  }
};
// const options = {
//   type: {
//     curve: "spiral",
//     fi1: 0,
//     fi2: 560,
//     r1: 0,
//     r2: 200
//   }
// };

anySlider.init(slider, options);
