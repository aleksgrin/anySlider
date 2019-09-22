import AnySlider from './anySlider'

const anySlider = new AnySlider();
const slider = document.querySelector('.slider');

const options = {
  type: {
    curve: 'spiral',
    fi1: 0,
    fi2: 720,
    r1: 0,
    r2: 200
  }
}

anySlider.init(slider, options);