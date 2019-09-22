// import init from './init'

const sliderHandle = document.querySelector('.slider_handle');
const test = document.querySelector('.test');

console.log(sliderHandle.offsetWidth);

// Набор координат
const R = 100;
const xc = 200;
const yc = 200;
const fiEnd = 360;
const fiBegin = 0;
const fiDelta = 1;
const N = 200;
const fiArr = createArray(fiBegin, fiEnd, N).map(elem => elem * Math.PI / 180);

const arr = fiArr.map((elem) => {
  let xAbs = xc + R*Math.cos(elem);
  let yAbs = yc + R*Math.sin(elem);
  return {x: xAbs, y: yAbs}
});

function createArray(begin, end, N) {
  const h = (end - begin)/N;
  const arr = [begin];
  for (let i =1; i<= N; i++) {
    arr.push(arr[i-1] + h);  
  }
  return arr;
}
function render(elem, arr) {
  elem.innerHTML = arr.map((elem) => {
    return `<div class='dot' style='left: ${elem.x}px; top: ${elem.y}px'></div>`;
  }).join('');
}
render(test, arr);

console.log(arr[0].x, arr[0].y);
let index = 0;
sliderHandle.style.left=arr[index].x - sliderHandle.offsetWidth / 2 + 'px'
sliderHandle.style.top=arr[index].y - sliderHandle.offsetHeight / 2 + 'px'

function init(){
  sliderHandle.addEventListener('mousedown', onMouseDown)
  function onMouseDown(evt) {
    evt.preventDefault();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    var coords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var fi1 = Math.atan((coords.y-yc) / (coords.x-xc));
      var fi2 = Math.atan((moveEvt.clientY - yc) / (moveEvt.clientX - xc));
      if(fi2 - fi1 > 0) {
        index = ++index >= arr.length ? 0: ++index;
      }
      if(fi2 - fi1 < 0) {
        index = --index <= 0 ? arr.length-1: --index;
      }
      
      sliderHandle.style.left=arr[index].x - sliderHandle.offsetWidth / 2 + 'px'
      sliderHandle.style.top=arr[index].y - sliderHandle.offsetHeight / 2 + 'px'
    
      coords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  }
}

init();