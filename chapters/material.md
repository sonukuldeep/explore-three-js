## Materials
Material is like the skin of the object. It defines the outer appearance of the geometry. Three.js provides many materials to work. We should choose the type of material according to our needs. In this chapter, we'll discuss the most commonly used materials in Three.js.

1. [MeshBasicMateria](#meshbasicmaterial)
It is the very basic material in Three.js.

2. [MeshDepthMaterial](#meshdepthmaterial)
It uses the distance from the camera to determine how to color your mesh in a greyscale.

3. [MeshNormalMaterial](#meshnormalmaterial)
This material uses the magnitude of the x/y/z values of the faces’ normal vectors to calculate and set the red/green/blue values of the colors displayed on the face.

4. [MeshLambertMaterial](#meahlambertmaterial)
You can use this material to create dull-looking, non-shiny surfaces.

5. [MeshPhongMaterial](#meshphongmaterial)
This material is similar to MeshLambertMaterial but can create more shiny surfaces.

6. [MeshStandardMaterial](#meshstandardmaterial)
It is similar but gives a more accurate and realistic looking result than the MeshLambertMaterial or MeshPhongMaterial. Instead of shininess, it has two properties: roughness and metalness.

7. [MeshPhysicalMaterial](#meshphysicalmaterial)
It is pretty similar to MeshStandardMaterial. You can control the reflectivity of the material.

8. [Using Multiple Materials](#multiple-material)
Until now, while creating a Mesh, you added a single material to it.

### MeshBasicMaterial
It is the very basic material in Three.js. It is used to create and display objects of solid color or wireframe. It is self-illuminating and is not affected by lighting.
```js
const geometry = new THREE.BoxGeometry(2, 2, 2)
const material = new THREE.MeshBasicMaterial({
   color: 0x87ceeb,
   wireframe: true,
   wireframeLinewidth: 2,
})
const cube = new THREE.Mesh(geometry, material)
```
Sometimes it’s hard to distinguish between two adjacent surfaces of the same color. If you create a sphere, it appears like a 2D circle. Although it seems 2D, it should be 3D.

### MeshDepthMaterial
It uses the distance from the camera to determine how to color your mesh in a greyscale. White is nearest, and black is farthest.
```js
const geometry = new THREE.TorusKnotGeometry()
const material = new THREE.MeshDepthMaterial()
const torusKnot = new THREE.Mesh(geometry, material)
```

### MeshNormalMaterial
This material uses the magnitude of the x/y/z values of the faces’ normal vectors to calculate and set the red/green/blue values of the colors displayed on the face.

How does it work? - x is red, y is green, and z is blue, so things facing to the right are pink, to the left are aqua, up are light green, down are be purple, and toward the screen are be lavender.
```js
const geometry = new THREE.BoxGeometry(2, 2, 2)
const material = new THREE.MeshBasicMaterial()
const cube = new THREE.Mesh(geometry, material)
```

### MeahLambertMaterial
You can use this material to create dull-looking, non-shiny surfaces. It is a very easy-to-use material that responds to the lighting sources in the scene. It has two main properties −
- color − This is the color of the material
- emissive − This is the color that the material emits. You can use this to create objects that look like they glow.
```js
const geometry = new THREE.BoxGeometry(2, 2, 2)
const material = new THREE.MeshLambertMaterial({ color, emissive })
const cube = new THREE.Mesh(geometry, material)
```

### MeshPhongMaterial
This material is similar to MeshLambertMaterial but can create more shiny surfaces. If you use this material without lighting, the camera shows nothing, and it is in black. You can use a white AmbientLight to make it visible.
```js
const geometry = new THREE.BoxGeometry(2, 2, 2)
const material = new THREE.MeshPhongMaterial({ color, emissive, shininess })
const cube = new THREE.Mesh(geometry, material)
```

### MeshStandardMaterial
It is similar but gives a more accurate and realistic looking result than the MeshLambertMaterial or MeshPhongMaterial. Instead of shininess, it has two properties: roughness and metalness.
```js
const geometry = new THREE.BoxGeometry(2, 2, 2)
const material = new THREE.MeshStandardMaterial({ color, roughness, metalness })
const cube = new THREE.Mesh(geometry, material)
```

### MeshPhysicalMaterial
It is pretty similar to MeshStandardMaterial. You can control the reflectivity of the material. The default reflectivity is 0.5, and you can vary it between 0 and 1.
```js
const geometry = new THREE.BoxGeometry(2, 2, 2)
const material = new THREE.MeshPhysicalMaterial({
   color,
   roughness,
   metalness,
   reflectivity,
})
const cube = new THREE.Mesh(geometry, material)
```

### Multiple Material
Until now, while creating a Mesh, you added a single material to it. There are also cases where you want to combine multiple materials. You can do that by passing an array of materials. But you should not use Mesh. Instead, you can use createMultipleMaterialObject of SceneUtils. For example, the following code combines THREE.MeshLambertMaterial with a material that shows you the wireframe of the geometry.
```js
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material1 = new THREE.MeshLambertMaterial({
color: 0xff0000,
   transparent: true,
   opacity: 0.7,
})
const material2 = new THREE.MeshBasicMaterial({ wireframe: true })
const cube = THREE.SceneUtils.createMultiMaterialObject(cylinderGeometry, [
   material1,
   material2,
])
```