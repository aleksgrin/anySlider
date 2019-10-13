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
To see more availible curve types and their parameters follow appropriate section.
After you run this code you will see:
![Image alt](https://github.com/aleksgrin/anySlider/raw/master/images/1.jpg)
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
##События на слайдере
Для доступка к событиям необходимо использовать метод listen('eventType', callback):
```js
anySlider.listen('start', () => {
  /*
  some incredible code
  */
});
```
Доступно 4 вида событий:
- start (Нажатие на слайдер)
- move (Движение слайдера)
- end (Окончание движения)
- click (Клик по слайдеру)

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
- []: Нарисовать свой слайдер
- []: Значения и штрихи на кривой