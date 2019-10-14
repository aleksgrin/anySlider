## The basic usage
To init a slider you just need to have a slider elem inside your HTML, all other work will be done for you.
To customize the slider type one should use the options object with the folowing structure:
```js
const anySlider = new AnySlider();
const slider = document.querySelector(".slider");
const options = {
  type: {
    curve: "arc",
    r: 250,
    fi1: 90,
    fi2: 270
  }
};
anySlider.init(slider, options);
```
To see more availible curve types (such as circle, lines, or even spiral) and their parameters follow appropriate section.
After you run this code you will see:
![Image alt](https://github.com/aleksgrin/anySlider/raw/master/images/1.jpg)
## Other ways to customize curve type
To add your own curve you just need to add an 'arr' property to options object:
```js
const options = {
  arr: yourArr
};
```
Where your arr should have the following structure:
```js 
const arr = [{x: 10, y: 10}, {x: 20, y: 20}, ...]
```
For example lets make a sin slider:

```js
const A = 60;
const fi1 = 0;
const fi2 = 200 * Math.PI;
const w = 1 / 50;
const N = 100;

const myArr = anySlider.createArrayH(fi1, fi2, 1).map(elem => {
  let xAbs = elem;
  let yAbs = A * Math.sin(w * elem);
  return { x: xAbs, y: yAbs };
});
```
![Image alt](https://github.com/aleksgrin/anySlider/raw/master/images/2.jpg)

Ass you've noticed to create array with the given step you can use a slider method ```createArrayH(x1, x2, h)```.
Or you can use ```createArray(x1, x2, N)``` to create array with the given number of points.

Note, that if the arr property is given than the type property is ignored.
## Custom events
To use events one should use a method ```listen('eventType', callback)```:

```js
anySlider.listen('start', () => {
  /*
  some incredible code
  */
});
```
Available event types:
- start (mousedown on a slider)
- move (mousemove of a slider)
- end (the end of slider moving)
- click (click on a slider)
## Get and set values
```anyslider.get()``` - if values property in options object is not added will return a value from 0 to 100. Where 0 
is the begining of a curve and 100 is its' end. Else return value is current slider value
```anyslider.getPers()``` - returns a value from 0 to 100. Where 0 is the begining of a curve and 100 is its' end.
```anyslider.set()``` - 
```anyslider.setPers()``` - 
## Примеры формирования объекта options
Для кругового слайдера необходимо задать только один параметр: радиус окружности
```js
const options = {
  type: {
    curve: 'circle',
    r: 100
  }
}
```
Для спирального слайдера необходимо задать: начальные и конечные углы и радиусы

```js
const options = {
  type: {
    curve: 'spiral',
    fi1: 0,
    fi2: 720,
    r1: 0,
    r2: 200
  }
}
```
```js
const options = {
  type: {
    curve: 'line',
    x1: 100,
    x2: 400,
    y1: 100,
    y2: 200
  }
}
```

Чтобы зарпетить перед по клику можно добавить поле clickable со знаечние false:

```js
const options = {
  ...
  clickable: false,
}
```
Можно дать длительность передвижения к точке при клике следующим образом
(где t - время перехода в секундах).
Если не задавать время перехода, то по умолчанию оно равно 0.8s
```js
const options = {
  ...
  transition: {
    t: 2
  },
}
```

TODO: 
- []: Добавить set в процентах
- []: Нарисовать свой слайдер
- []: Значения и штрихи на кривой