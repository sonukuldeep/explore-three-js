## Camera controls
You can move the camera around the scene using camera controls. Three.js has many camera controls you can use to control the camera throughout a scene. You have to get the controls separately. The Three.js library does not include these.

1. [Orbit Controls](#orbit-controls)
Orbit controls allow the camera to orbit around the center of the scene.

2. [Trackball Controls](#trackball-controls)
TrackballControls is similar to Orbit controls. However, it does not maintain a constant camera up vector.

3. [Fly Controls](#fly-controls)
These are flight simulator-like controls. Move and steer with the keyboard and the mouse.

4. [PointerLock Controls](#pointerlock-controls)
The PointerLockControls implements the inbuilt browsers Pointer Lock API.

## Orbit Controls
Orbit controls allow the camera to orbit around the center of the scene. You can also provide a target to move around. You can add Orbitcontrols in a few simple steps.

### Import Orbit controls
```js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
```

Create a new instance of the orbit controls and pass the camera.
```js
const controls = new THREE.OrbitControls(camera, render.domElement)
```
Update the controls for every frame. You can simply do it in your animation loop.
```js
function animate() {
   // any other animations
   controls.update()
   requestAnimationFrame(render)
}
```

## Trackball Controls
TrackballControls is similar to Orbit controls. However, it does not maintain a constant camera up vector. That means that the camera can orbit past its polar extremes. It won't flip to stay the right side up. You can add it just like the previous one.

### Import 
```js
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
```
```js
const controls = new THREE.TrackballControls(camera, render.domElement)
```

## Fly Controls
These are flight simulator-like controls. Move and steer with the keyboard and the mouse. You can arbitrarily transform the camera in 3D space without any limitations (e.g., focus on a specific target).
```js
const controls = new THREE.FlyControls(camera, render.domElement)
```

## PointerLock Controls
The PointerLockControls implements the inbuilt browsers Pointer Lock API. It allows you to control the camera just like in a first-person in 3D games.
```js
const controls = new PointerLockControls(camera, document.body)
```
