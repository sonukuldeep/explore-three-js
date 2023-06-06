## Using Dat.GUI

It is hard to keep experimenting with the values of variables, like the cube’s position. In that case, suppose until you get something you like. It's a kind of slow and overwhelming process. Luckily, there is already a good solution available that integrates great with Three.js, dat.GUI. It allows you to create a fundamental user interface component that can change variables in your code.

## Install
```js
npm install dat.gui
or
yarn add dat.gui
```

## Import 
```js
import * as dat from 'dat.gui'
import {GUI} from 'dat.gui'
```

## Usage
First, you should initialize the object itself. It creates a widget and displays it on the screen top rightcorner.
```js
const gui = new dat.GUI()
```
Then, you can add the parameter you want to control and the variable. For example, the following code is to control the y position of the cube.
```js
gui.add(cube.position, 'y')
```

```js
...
const gui = new dat.GUI()
...
gui.add(material, 'wireframe')
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)
gui.add(cube.position, 'x')
gui.add(cube.position, 'y')
gui.add(cube.position, 'z')
```

## Customization
You can customize the label displayed using the name attribute. To change the label on the variable line, use .name("your label").
```js
gui.add(cube.position, 'y').name('cube-y')
```
You can set up min/max limits and steps for getting the slider. The following line allow values from 1 to 10, increasing the value by 1 at a time.
```js
gui.add(cube.position, 'y').min(1).max(10).step(1)
// or
gui.add(cube.position, 'y', 1, 10, 1)
```

If there are many variables with the same name, you may find it difficult to differentiate among them. In that case, you can add folders for every object. All the variables related to an object be in one folder.
```js
// creating a folder
const cube1 = gui.addFolder('Cube 1')
cube1.add(redCube.position, 'y').min(1).max(10).step(1)
cube1.add(redCube.position, 'x').min(1).max(10).step(1)
cube1.add(redCube.position, 'z').min(1).max(10).step(1)
// another folder
const cube2 = gui.addFolder('Cube 2')
cube2.add(greenCube.position, 'y').min(1).max(10).step(1)
cube2.add(greenCube.position, 'x').min(1).max(10).step(1)
cube2.add(greenCube.position, 'z').min(1).max(10).step(1)
```

## Callback functions
You can also add some callback functions. onChange is triggered once the value is changed.
```js
gui.add(cube.position, 'y').onChange(function () {
   // refresh based on the new value of y
   console.log(cube.position.y)
})
```
Let's see another example of changing color using dat.gui and callbacks.
```js
// parameter
const cubeColor = {
   color: 0xff0000,
}
gui.addColor(cubeColor, 'color').onChange(() => {
   // callback
   cube.color.set(cubeColor.color)
})
```
The above callback onChange notifies Three.js to change the cube color when the color from cubeColor changes.