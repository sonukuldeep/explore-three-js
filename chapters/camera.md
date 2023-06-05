## Types of Cameras

There are two types of cameras are in Three.js.

1. [PerspectiveCamera](#perspectivecamera)
    - There are different cameras in Three.js. The most common camera and the one we've been using is the PerspectiveCamera.

2. [OrthographicCamera](#orthographiccamera)
    - The 2nd most common camera is the OrthographicCamera. It specifies a box with the settings left, right top, bottom, near, and far. It represents three-dimensional objects in two dimensions.

## Making the Camera Follow an Object
In the animation function, we use the camera.lookAt function to point the camera to the position function of the object. We do this in every frame that we render. It looks like the camera is exactly following the object's position.
```js
function animate() {
   const object = scene.getObjectByName('sphere')
   renderer.render(scene, camera)
   camera.lookAt(object.position)
   requestAnimationFrame(render)
}
```

## PerspectiveCamera
Syntax:-
```js
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
```	
The first attribute is the Field of View (FOV). FOV is the part of the scene that is visible on display at any given moment. The value is in degrees. Humans have an almost 180-degree FOV. But since a regular computer screen doesn’t fill our vision,a smaller value is often chosen.Generally, for games, a FOV between 60 and 90 degrees is preferred. Good default: 50

The second one is the Aspect ratio—the ratio between the horizontal and vertical sizes of the area where we're rendering the output. Good default: window.innerWidth / window.innerHeight

The following two attributes are the near and far clipping plane. The camera renders the area between the near plane and the far plane on the screen.

The near property defines by how close to the camera Three.js should render the scene. Usually, we set this to a minimal value to directly render everything from the camera’s position. Good default: 0.1

The far property defines how far the camera can see from the position of the camera. If we set this too low, a part of our scene might not be rendered, and if we set it too high, in some cases, it might affect the rendering performance. Good default: 1000

## OrthographicCamera
Syntax:-
```js
const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far)
```
All the six attributes are the borders of the box; The camera renders only the objects inside the box.
- left - Camera left the plane.
- right - Camera right plane.
- top - Camera top plane.
- bottom - Camera bottom plane
- near - Camera near plane.
- far - Camera far plane

