## Automatically resize the output when the browser size changes

When you resize the browser, we have to notify the Three.js to know how wide the &lt;canvas&gt; element should be. For the camera, we need to update the aspect property, which holds the aspect ratio of the screen, and for the renderer, we need to change its size.
```js
window.addEventListener('resize', () => {
   // update display width and height
   width = window.innerWidth
   height = window.innerHeight
   // update camera aspect
   camera.aspect = width / height
   camera.updateProjectionMatrix()
   // update renderer
   renderer.setSize(width, height)
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
   renderer.render(scene, camera)
})
```
<hr/>

## Anti-aliasing

The aliasing effect is the appearance of jagged edges or "jaggies" (also known as stair-stepped lines) on edges and objects (rendered using pixels).

We can turn on anti-aliasing by setting antialias property of the WebGLRenderer to true. By default, it is false. 
```js
// renderer - anti-aliasing
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.physicallyCorrectLights = true
```
The property physicallyCorrectLights tells Three.js whether to use physically correct lighting mode. Default is false. Setting it to true helps increase the detail of the object.