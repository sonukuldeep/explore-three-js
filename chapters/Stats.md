## Stats
Statistics play an important role in large-scale applications. Suppose you are creating a larger Three.js project with many objects and animations. It is good to monitor the performance of the code like fps (frames per second), memory allocated, etc. The creator of Three.js also created a small JavaScript library, Stats.js, to monitor the rendering.

## Installation
```js
npm install stats.js
```

## Functionality
You can monitor the following properties using Stats.js.
- FPS − Frames rendered in the last second (0).
- MS − Milliseconds needed to render a frame (1).
- MB − MBytes of allocated memory (2) (Run Chrome with --enable-precise-memoryinfo)
- CUSTOM − you can define the thing you want to monitor—user-defined panel support (3).

## How does it work?
If you're monitoring the frame rate, it counts how often the update was called within the last second and shows that value. If you're tracking the render time, it just shows the time between calls and the update function.

## Usage
You can add this functionality to your code in a few simple steps.

Create the stats object and add it to the HTML page using the DOM.
```js
const stats = new Stats()
stats.showPanel(1) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)
```
Note − You can show the panel you want using showPanel(). By default, Stats.js displays the fps panel, and you can toggle between panels by clicking on the panel.

Select the code you want to monitor.
```js
stats.begin()
// monitored code goes here
// in our case the render function
renderer.render(scene, camera)
stats.end()
```
If you are using animations, you should update the stats whenever the frame is rendered.
```js
function animate() {
   requestAnimationFrame(render)
   // our animations
   renderer.render(scene, camera)
   stats.update()
}
```
