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

## Use css to customize slider handle
To style your handle you can just use ```.slider_handle``` class in css
## Other ways to customize curve type
To add your own curve you just need to add an 'arr' property to options object:
```js
const options = {
  arr: yourArr
};
```
Where your array should have the following structure:
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

### Some other ways to create a curve
To create a curve you need you even may use methods:
- anySlider.line(x1,y1,x2,y2) - creates a line whith 1 px step
- anySlider.arc(r, fi1, fi2, xc, yc) - creates an arc. By default xc, yc - coordinates of an arc center is set to 0

For exaple there is a triangle slider:
```js
const arr = [
  ...anySlider.line(20, 100, 200, 100),
  ...anySlider.line(200, 100, 200, 300),
  ...anySlider.line(200, 300, 20, 100)
];
```
![Image alt](https://github.com/aleksgrin/anySlider/raw/master/images/4.jpg)

And others...:
```js
const arr = [
  ...anySlider.line(20, 100, 200, 100),
  ...anySlider.arc(100, 180, 0, 300, 100),
  ...anySlider.line(400, 100, 500, 100),
];
```
![Image alt](https://github.com/aleksgrin/anySlider/raw/master/images/3.jpg)
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
```anyslider.set()``` - sets slider value to input value that has to be from 0 to 100 if values property in options object is not added or a value from values property interval
```anyslider.setPers()``` - sets value in persentage from 0 to 100
## Some exples of usage options object
Creating a round slider:
```js
const options = {
  type: {
    curve: 'circle',
    r: 100
  }
}
```
Creating a spiral slider:
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
Creating a line:
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

To prevent click behavior use clickable field with the false value:
```js
const options = {
  ...
  clickable: false,
}
```
You can set the time slider handle will spend to go to the point when you click on a slider:
(where t - time in seconds).
If no setted the defaults one is 800ms
```js
const options = {
  ...
  transition: {
    t: 2000
  },
}
```
You can even customize timeFunction (see https://learn.javascript.ru/js-animation): 
```js
const options = {
  ...
  transition: {
    ...
    timingFunction: (timeFraction) => {
      return Math.pow(timeFraction, 2);
    }
  },
}
```
By default this function is linear.


## Values and reference values on a slider
You can add values like that:

```js
  values: {
    from: 0,
    to: 300
  },
```
When you've spot a values property you can use reference values that should not go beyond values from values proprty:

```js
  referenceValues: {
    values: [50, 100, 150, 200, 250]
  },
```
Then you will see something like that:

![Image alt](https://github.com/aleksgrin/anySlider/raw/master/images/5.jpg)

Now you can use a ```anySlider.get()``` and ```anySlider.set()``` methods and it will return/set values that you've determined. Remember, that if you do not use values property in your object theese method will return the persentage of passed curve. You can use more evident one: ```anySlider.getPers()``` and ```anySlider.setPers()``` to not been confused.

## Rendering slider and customizing its look
If you do not want to see the slider points you can use option object with the render property:
```js
render: {
  visible: false,
}
```
At this point you will see only slider handle that is following the curve you have set.
This behavior may be helpfull when you already have a slider picture and it is quite complicated. So you can use visible points to make a curve look like your pic and then just turn it off.

Since i use a canvas to render points it is no possible to use css to customize color, width and other propertyes of a curve you may use the following:
```js
render: {
    ...
    color: "pink", // sets the dots color
    width: 6,  // set the dots width
    dashColor: "blue", // sets the lines color when you use reference values
    dashWidth: 2,
    dashHeight: 50,
  }
```

As a result:
![Image alt](https://github.com/aleksgrin/anySlider/raw/master/images/6.jpg)

## Some examples
### Change an image depending on a slider value

TODO: 
- []: Значения и штрихи на кривой
- []: Toggle
- []: Добавить функцию обновления параметров
- []: ?Перенести инициализацию в конструктор?

