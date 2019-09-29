'use strict';

export const init = (elem, param) => {
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


  this.sliderHandle.style.left = this.arr[0].x - this.sliderHandle.offsetWidth / 2 + "px";
  this.sliderHandle.style.top = this.arr[0].y - this.sliderHandle.offsetHeight / 2 + "px";

  let onMouseDown = evt => {
    evt.preventDefault();
    if(this.startEvent) this.sliderHandle.dispatchEvent(this.startEvent);

    let coords = {
      x: evt.clientX - sliderLeft,
      y: evt.clientY - sliderTop
    };

    let onMouseMove = moveEvt => {
      moveEvt.preventDefault();

      if(this.moveEvent) document.dispatchEvent(this.moveEvent);

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
        x: moveEvt.clientX - sliderLeft,
        y: moveEvt.clientY - sliderTop
      };

      const currInd = this.arr.indexOf(foundElem);
      currL = this.findCurveLength(this.arr, currInd);
      if (isValuesReseived) {
        this.sliderValue = this.calculateValue(this.startValue, this.endValue, currL, this.L)
      }
    };

    let onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      if(this.endEvent) document.dispatchEvent(this.endEvent);

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };
  this.sliderHandle.addEventListener("mousedown", onMouseDown);
}