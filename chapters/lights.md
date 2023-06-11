## Lights
Lights make the objects visible, similarly, in Three.js THREE.Light lights up the scene and makes some things visible. Not all materials are affected by lighting. The __MeshBasicMaterial__ and __MeshNormalMaterial__ are self-illuminating, so they don't need lighting to be visible within a scene. However, most of the other materials do, the MeshLambertMaterial, MeshPhongMaterial, MeshStandardMaterial, MeshPhysicalMaterial, and MeshToonMaterial. We'll discuss more materials in further chapters. In this chapter, we'll focus on different types of lights in Three.js.

Every light has color and intensity properties.

- color − (optional) hexadecimal color of the light. Default is 0xffffff (white).
- intensity − (optional) numeric value of the light's strength/intensity. Default is 1.

## Casting Shadows

The light that is coming from a specific direction can cast shadows. First, we should make the scene ready for casting shadows.
1. Step − 1

We should first tell the renderer that we want to enable shadows. Casting shadows is an expensive operation. WebGLRenderer only supports this functionality. It uses Shadow mapping, a technique specific to WebGL, performed directly on the GPU.
```js
renderer.shadowMapEnabled = true
```
The above line of code tells the renderer to cast shadows in the scene.

Note − Three.js, by default, uses shadow maps. Shadow map works for light that casts shadows.

The scene renders all objects marked to cast shadows from the point of view of the light.

If your shadow looks a bit blocky around its edges, it means the shadow map is too small. To increase the shadow map size, you can define shadowMapHeight and shadowMapWidht properties for the light. Alternatively, you can also try to change the shadowMapType property of WebGLRenderer. You can set this to THREE.BasicShadowMap, THREE.PCFShadowMap, or THREE.PCFSoftShadowMap.
```js
// to antialias the shadow
renderer.shadowMapType = THREE.PCFSoftShadowMap
// or
directionalLight.shadowMapWidth = 2048
directionalLight.shadowMapHeight = 2048
```

2. Step − 2

You should configure objects to cast shadows. You can inform Three.js which objects can cast shadows and which objects can receive shadows.
```js
object.castShadow = true
object.recieveShadow = true
```

3. Step − 3

All the above steps are the same for every light. The next step is to set up the shadow-related properties.
```js
light.castShadow = true
light.shadow.camera.near = 10
light.shadow.camera.far = 100
light.shadow.camera.left = -50
light.shadow.camera.right = 50
light.shadow.camera.top = 50
light.shadow.camera.bottom = -50
```
The first property, castShadow, tells Three.js that this light casts shadows. As casting shadows is an expensive operation, we need to define the area where shadows can appear. You can do it with the shadow.camera.near, shadow.camera.far, and shadow.camera.left, etc. properties. With the above properties, we create a box-like area where Three.js render shadows.

## Light types
1. [Ambient Light](#ambient-light)
It is the most basic light, which illuminates the whole scene equally.

2. [Directional Light](#directional-light)
Directional light comes from a specific point and is emitted directly from far away to the target.

3. [Spotlight](#spot-light)
It is another kind of light that comes from a specific direction in the shape of the cone.

4. [Point Light](#point-light)
The point light is a light source that emits light in all directions from a single point.

5. [Hemisphere Light](#hemisphere-light)
It is a special light for creating natural lighting. 

### Ambient light
It is the most basic light, which illuminates the whole scene equally. Light is spread equally in all directions and distances, so it __cannot cast shadows__. Ambient light affects all lit objects in the scene equally, and it __adds color__ to the object's material.
```js
const light = THREE.AmbientLight(color, intensity)
```

### Directional light
Directional light comes from a specific point and is emitted directly from far away to the target. All the light rays it sends out are parallel to each other. An excellent example of this is the sun.
```js
const light = THREE.DirectionalLight(color, intensity)
light.position.set(2, 3, 4)
```

![directional_light](https://www.tutorialspoint.com/threejs/images/directional_light.png)

### Spot light
It is another kind of light that comes from a specific direction in the shape of the cone.

- distance − Maximum range of the light. Default is 0 (no limit).
- angle − Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2.
- penumbra − Percent of the spotlight cone attenuates due to penumbra. It takes values between zero and 1. Default is 0.
- decay − The amount the light dims along with the distance of the light.

```js
const light = new THREE.SpotLight(color, intensity)
light.position.set(1, 10, 10)
light.castShadow = true
light.shadow.camera.near = 5
light.shadow.camera.far = 400
light.shadow.camera.fov = 30
```
The shadow.camera.near, shadow.camera.far, and shadow.camera.fov properties define the area where shadows can appear.

### Point light
The point light is a light source that emits light in all directions from a single point. It is very similar to the light bulb in the ordinary world. It can cast shadows because it is a type of directional light.
```js
const light = new THREE.PointLight(color, intensity, distance, decay)
light.castShadow = true
light.shadow.camera.near = 0.5 // default
light.shadow.camera.far = 500 // default
```

![point_light](https://www.tutorialspoint.com/threejs/images/point_light.png)

## Hemisphere light
It is a special light for creating natural lighting. If you look at the lighting outside, you'll see that the lights don't come from a single direction. Earth reflects part of the sunlight, and the atmosphere scatters the other parts. The result is a very soft light coming from lots of directions. In Three.js, we can create something similar using THREE.HemisphereLight.
```js
const light = new THREE.HemisphereLight(color, groundColor, intensity)
```
The first argument sets the color of the sky, and the second color sets the color reflected from the floor. And the last argument is its intensity.

It is often used along with some other lights, which can cast shadows for the best outdoor lighting effect.