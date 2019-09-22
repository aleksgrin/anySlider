export default class AnySliderClass {
  constructor() {

  }

  render(elem, arr) {
    elem.innerHTML=`
      <div class="slider_handle"></div>
      <div class="test">
        ${arr.map((elem) => {
          return `<div class='dot' style='left: ${elem.x}px; top: ${elem.y}px'></div>`;
        }).join('')}
      </div>
    `;
  }

  createArray(begin, end, N) {
    const h = (end - begin)/N;
    const arr = [begin];
    for (let i =1; i<= N; i++) {
      arr.push(arr[i-1] + h);  
    }
    return arr;
  }

  findCurveLength(arr, ind) {
    const sliceInd = ind || arr.length - 1;
    const newArr = arr.slice(0, sliceInd + 1);
    return newArr.reduce((acum, curr, index, array) => {
      return acum + (index===0 ? 0 : Math.sqrt(Math.pow((curr.x - array[index-1].x), 2) + Math.pow((curr.y - array[index-1].y), 2)));
    }, 0)
  }

  // init(elem, arr){
  init(elem, options){
    // const L = findCurveLength(arr);
    let arr;
    const xc = 200;
    const yc = 200;
    const N = 100;

    if(options.type.curve === 'circle') {
      const R = options.type.r;
      arr = this.createArray(0, 360, N).map(elem => elem * Math.PI / 180).map((elem, i) => {
        let xAbs = xc + R*Math.cos(elem);
        let yAbs = yc + R*Math.sin(elem);
        return {x: xAbs, y: yAbs}
      });
    }
    if(options.type.curve === 'spiral') {
      const {fi1, fi2, r1, r2} = options.type;
      arr = this.createArray(fi1, fi2, N).map(elem => elem * Math.PI / 180).map((elem, i) => {
        let xAbs = xc + this.createArray(r1, r2, N)[i]*Math.cos(elem);
        let yAbs = yc + this.createArray(r1, r2, N)[i]*Math.sin(elem);
        return {x: xAbs, y: yAbs}
      });
    }
    if(options.type.curve === 'line') {
      const {x1, x2, y1, y2} = options.type;
      const xArr = this.createArray(x1, x2, N);
      const yArr = this.createArray(y1, y2, N);
      arr = xArr.map((elem, index) => {
        let xAbs = elem;
        let yAbs = yArr[index];
        return {x: xAbs, y: yAbs}
      });
    }
    this.render(elem, arr);
    const sliderHandle = document.querySelector('.slider_handle');

    sliderHandle.style.left=arr[0].x - sliderHandle.offsetWidth / 2 + 'px'
    sliderHandle.style.top=arr[0].y - sliderHandle.offsetHeight / 2 + 'px'
  
    sliderHandle.addEventListener('mousedown', onMouseDown)
    function onMouseDown(evt) {
      evt.preventDefault();
  
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
  
      let coords = {
        x: evt.clientX,
        y: evt.clientY
      };
  
      function onMouseMove(moveEvt) {
        moveEvt.preventDefault();
        const foundElem = findNearest(coords.x, coords.y, arr);
        // const currInd = arr.indexOf(foundElem)
        // const currL = findCurveLength(arr, currInd)
        // console.log(currL/L*100);
        
        sliderHandle.style.left=foundElem.x - sliderHandle.offsetWidth / 2 + 'px'
        sliderHandle.style.top=foundElem.y - sliderHandle.offsetHeight / 2 + 'px'
      
        coords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
        
        function findNearest(x, y, arr) {
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
}
