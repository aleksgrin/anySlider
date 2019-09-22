// import init from './init'

const sliderHandle = document.querySelector('.slider_handle');
const test = document.querySelector('.test');

console.log(sliderHandle.offsetWidth);

// Набор координат
const R = 100;
const xc = 200;
const yc = 200;
const fiEnd = 720;
const fiBegin = 0;
const fiDelta = 1;
const N = 100;

const arr = createArray(0, 720, N).map(elem => elem * Math.PI / 180).map((elem, i) => {
  let xAbs = xc + createArray(0, 200, N)[i]*Math.cos(elem);
  let yAbs = yc + createArray(0, 200, N)[i]*Math.sin(elem);
  return {x: xAbs, y: yAbs}
});

const circleArr = createArray(0, 360, N).map(elem => elem * Math.PI / 180).map((elem, i) => {
  let xAbs = xc + R*Math.cos(elem);
  let yAbs = yc + R*Math.sin(elem);
  return {x: xAbs, y: yAbs}
});

const lineArr = createArray(100, 400, N).map((elem) => {
  let xAbs = elem;
  let yAbs = 100;
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

function init(arr){
  let index = 0;
  sliderHandle.style.left=arr[index].x - sliderHandle.offsetWidth / 2 + 'px'
  sliderHandle.style.top=arr[index].y - sliderHandle.offsetHeight / 2 + 'px'

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

      sliderHandle.style.left=findNearest(coords.x, coords.y, arr).x - sliderHandle.offsetWidth / 2 + 'px'
      sliderHandle.style.top=findNearest(coords.x, coords.y, arr).y - sliderHandle.offsetHeight / 2 + 'px'
    
      coords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      function findNearest(x , y, arr) {
        const dists = arr.map((elem) => {
          return Math.sqrt(Math.pow((elem.x - x), 2) + Math.pow((elem.y - y), 2));
        });
        const minInd = dists.indexOf(Math.min(...dists));
        return arr[minInd];
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  }
}

render(test, lineArr);

init(lineArr);