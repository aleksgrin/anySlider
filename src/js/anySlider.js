import { init } from "./init";
export default class AnySliderClass {
  constructor() {
    this.sliderValue = null;
    this.sliderHandle = null;
    this.arr = null;
    this.startValue = null;
    this.endValue = null;
    this.L = null;
    this.startEvent = null;
    this.moveEvent = null;
    this.endEvent = null;
  }

  render(elem, arr) {
    elem.innerHTML = `
      <div class="slider_handle"></div>
      <canvas id='canvas'></canvas>
    `;
    const canvas = document.querySelector("#canvas");
    const dotRadius = 2;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    arr.forEach(elem => {
      ctx.moveTo(elem.x, elem.y);
      ctx.arc(
        elem.x + dotRadius / 2,
        elem.y + dotRadius / 2,
        dotRadius,
        0,
        2 * Math.PI
      );
      // ctx.arc(elem.x, elem.y, dotRadius, 0, 2*Math.PI);
    });
    ctx.fill();
  }

  createArray(begin, end, N) {
    const h = (end - begin) / N;
    const arr = [begin];
    for (let i = 1; i <= N; i++) {
      arr.push(arr[i - 1] + h);
    }
    return arr;
  }

  findCurveLength(arr, ind) {
    const sliceInd = ind !== undefined ? ind : arr.length - 1;
    const newArr = arr.slice(0, sliceInd + 1);
    return newArr.reduce((acum, curr, index, array) => {
      return (
        acum +
        (index === 0
          ? 0
          : Math.sqrt(
              Math.pow(curr.x - array[index - 1].x, 2) +
                Math.pow(curr.y - array[index - 1].y, 2)
            ))
      );
    }, 0);
  }

  findNearest(x, y, arr) {
    const dists = arr.map(elem => {
      return Math.sqrt(Math.pow(elem.x - x, 2) + Math.pow(elem.y - y, 2));
    });
    const minInd = dists.indexOf(Math.min(...dists));
    return arr[minInd];
  }

  checkInput(param) {
    const N = param.type.N || 100;
    if (param.arr) {
      return param.arr;
    }
    if (param.type.curve === "circle") {
      const R = param.type.r;
      this.canvasWidth = 2 * R;
      this.canvasHeight = 2 * R;
      return this.createArray(0, 360, N)
        .map(elem => (elem * Math.PI) / 180)
        .map(elem => {
          let xAbs = R + R * Math.cos(elem);
          let yAbs = R + R * Math.sin(elem);
          return { x: xAbs, y: yAbs };
        });
    }
    if (param.type.curve === "spiral") {
      const { fi1, fi2, r1, r2 } = param.type;
      this.canvasWidth = 2 * r2;
      this.canvasHeight = 2 * r2;
      return this.createArray(fi1, fi2, N)
        .map(elem => (elem * Math.PI) / 180)
        .map((elem, i) => {
          let xAbs = r2 + this.createArray(r1, r2, N)[i] * Math.cos(elem);
          let yAbs = r2 + this.createArray(r1, r2, N)[i] * Math.sin(elem);
          return { x: xAbs, y: yAbs };
        });
    }
    if (param.type.curve === "arc") {
      const { r, fi1, fi2 } = param.type;
      this.canvasWidth = 2 * r;
      this.canvasHeight = 2 * r;
      return this.createArray(fi1, fi2, N)
        .map(elem => (elem * Math.PI) / 180)
        .map(elem => {
          let xAbs = r + r * Math.cos(elem);
          let yAbs = r + r * Math.sin(elem);
          return { x: xAbs, y: yAbs };
        });
    }
    if (param.type.curve === "line") {
      const { x1, x2, y1, y2 } = param.type;
      const xArr = this.createArray(x1, x2, N);
      const yArr = this.createArray(y1, y2, N);
      return xArr.map((elem, index) => {
        let xAbs = elem;
        let yAbs = yArr[index];
        return { x: xAbs, y: yAbs };
      });
    }
  }

  calculateValue(start, end, currL, L) {
    return parseInt(((end - start) * currL) / L + start);
  }

  get() {
    return this.sliderValue;
  }

  findNearesELemIndex(value, arr) {
    const values = arr.map(elem => Math.abs(elem - value));
    const foundElemIndex = values.indexOf(Math.min(...values));
    return foundElemIndex;
  }
  set(value) {
    if (value > this.endValue || value < this.startValue) {
      console.warn(
        "Your value is out of your start or end values or you forgot to provied one"
      );
      return;
    }
    this.sliderValue = value;
    const curveLengths = this.arr.map((elem, ind, arr) => {
      return this.findCurveLength(arr, ind);
    });
    const Lin =
      ((value - this.startValue) * this.L) / (this.endValue - this.startValue);
    const foundElem = this.arr[this.findNearesELemIndex(Lin, curveLengths)];
    this.sliderHandle.style.left =
      foundElem.x - this.sliderHandle.offsetWidth / 2 + "px";
    this.sliderHandle.style.top =
      foundElem.y - this.sliderHandle.offsetHeight / 2 + "px";
  }

  listen(type, callback) {
    if (type === "start") {
      this.startEvent = new Event("start");
      this.sliderHandle.addEventListener("start", callback, false);
    } else if (type === "move") {
      this.moveEvent = new Event("move");
      document.addEventListener("move", callback, false);
    } else if (type === "end") {
      this.endEvent = new Event("end");
      document.addEventListener("end", callback, false);
    }
  }

  init(elem, param) {
    const isValuesReseived = param.values ? true : false;
    this.startValue = isValuesReseived ? param.values.from : null;
    this.endValue = isValuesReseived ? param.values.to : null;
    this.arr = this.checkInput(param);

    const maxInd = 20;
    let currL = 0;
    this.L = this.findCurveLength(this.arr);
    this.render(elem, this.arr);
    const sliderElem = document.querySelector(".slider");
    this.sliderHandle = document.querySelector(".slider_handle");
    const sliderLeft = sliderElem.offsetLeft;
    const sliderTop = sliderElem.offsetTop;
    let currentElemIndex = 0;

    this.sliderHandle.style.left =
      this.arr[0].x - this.sliderHandle.offsetWidth / 2 + "px";
    this.sliderHandle.style.top =
      this.arr[0].y - this.sliderHandle.offsetHeight / 2 + "px";

    let getCoordsStorage = evt => {
      return evt.targetTouches ? evt.targetTouches[0] : evt;
    };

    let onMouseDown = evt => {
      evt.preventDefault();
      if (this.startEvent) this.sliderHandle.dispatchEvent(this.startEvent);

      console.log(getCoordsStorage(evt));

      let coords = {
        x: getCoordsStorage(evt).clientX - sliderLeft,
        y: getCoordsStorage(evt).clientY - sliderTop
      };

      let onMouseMove = moveEvt => {
        moveEvt.preventDefault();

        if (this.moveEvent) document.dispatchEvent(this.moveEvent);

        const foundElem = this.findNearest(coords.x, coords.y, this.arr);
        const foundElemIndex = this.arr.indexOf(foundElem);
        if (Math.abs(foundElemIndex - currentElemIndex) < maxInd) {
          currentElemIndex = foundElemIndex;
          this.sliderHandle.style.left =
            foundElem.x - this.sliderHandle.offsetWidth / 2 + "px";
          this.sliderHandle.style.top =
            foundElem.y - this.sliderHandle.offsetHeight / 2 + "px";
        }

        coords = {
          x: getCoordsStorage(moveEvt).clientX - sliderLeft,
          y: getCoordsStorage(moveEvt).clientY - sliderTop
        };

        const currInd = this.arr.indexOf(foundElem);
        currL = this.findCurveLength(this.arr, currInd);
        if (isValuesReseived) {
          this.sliderValue = this.calculateValue(
            this.startValue,
            this.endValue,
            currL,
            this.L
          );
        }
      };

      let onMouseUp = upEvt => {
        upEvt.preventDefault();
        if (this.endEvent) document.dispatchEvent(this.endEvent);

        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("touchmove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("touchend", onMouseUp);
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("touchmove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("touchend", onMouseUp);
    };
    this.sliderHandle.addEventListener("mousedown", onMouseDown);
    this.sliderHandle.addEventListener("touchstart", onMouseDown);
  }
}
