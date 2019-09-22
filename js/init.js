'use strict';

export default function(obj) {
  const {whatToDrag, howToDrag} = obj;
  howToDrag.addEventListener('mousedown', onMouseDown)

  function onMouseDown(evt) {
    evt.preventDefault();
    console.log('Down!');

    var coords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      console.log('move');
      

      var shift = {
        x: coords.x - moveEvt.clientX,
        y: coords.y - moveEvt.clientY
      };

      coords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      whatToDrag.style.left = (whatToDrag.offsetLeft - shift.x) + 'px';
      whatToDrag.style.top = (whatToDrag.offsetTop - shift.y) + 'px';

    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
}