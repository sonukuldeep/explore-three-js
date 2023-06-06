## Texture
The texture is an image or color added to the material to give more detail or beauty. The texture is an essential topic in Three.js. In this section, we'll see how to apply a basic texture to our material.

### Basic Texture

First, you should create a loader. Three.js has a built-in function TextureLoader() to load textures into your Three.js project. Then you can load any texture or image by specifying its path in the load() function.
```js
const loader = new THREE.TextureLoader()
texture.load('/path/to/the/image')
```
Then, set the map property of the material to this texture. That's it; you applied a texture to the plane geometry.

Textures have settings for repeating, offsetting, and rotating a texture. By default, textures in three.js do not repeat. There are two properties, wrapS for horizontal wrapping and wrapT for vertical wrapping to set whether a texture repeats. And set the repeating mode to THREE.ReaptWrapping.
```js
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.magFilter = THREE.NearestFilter
```
In Three.js, you can choose what happens both when the texture is drawn larger than its original size and what happens when it's drawn smaller than its original size.

For setting the filter, when the texture is larger than its original size, you set texture.magFilter property to either THREE.NearestFilter or THREE.LinearFilter.
- NearestFilter − This filter uses the color of the nearest texel that it can find.
- LinearFilter − This filter is more advanced and uses the color values of the four neighboring texels to determine the correct color.

And, you can add how many times to repeat the texture.
```js
const timesToRepeatHorizontally = 4
const timesToRepeatVertically = 2
texture.repeat.set(timesToRepeatHorizontally, timesToRepeatVertically)
```

## Texture Mapping
### base color map
It is the basic colored image you add to the object to the texture. With a base color map we add colors to the surface.
```js
const textureMap = new THREE.TextureLoader().load('/path/to/texture-map')
material.map = textureMap
```
You can add the effect of depth using a bump map or normal map or distance map.

### bump map
A bump map is a grayscale image, where the intensity of each pixel determines the height. You can just set the material bumpMap property to the texture. It adds fine details to the texture.
```js
const textureBumpMap = new THREE.TextureLoader().load('/path/to/bump-map')
material.bumpMap = textureBumpMap
```

### Normal Maps
A normal map describes the normal vector for each pixel, which should be used to calculate how light affects the material used in the geometry. It creates an illusion of depthness to the flat surface.
```js
const textureNormalMap = new THREE.TextureLoader().load('/path/to/normal-map')
material.normalMap = textureNormalMap
```

### Displacement Map
While the normal map gives an illusion of depth, we change the model's shape, with a displacement map based on the information from the texture.
```js
const textureDisplacementMap = new THREE.TextureLoader().load(
   '/path/to/displacement-map'
)
material.displacemetMap = textureDisplacementMap
```

### Roughness Map
The roughness map defines which areas are rough and that affects the reflection sharpness from the surface.
```js
const textureRoughnessMap = new THREE.TextureLoader().load(
   '/path/to/roughness-map'
)
material.roughnessMap = textureRoughnessMap
```

### Ambient Occlusion Map
It highlights the shadow areas of the object. It requires a second set of UVs.
```js
const textureAmbientOcclusionMap = new THREE.TextureLoader().load(
   '/path/to/AmbientOcclusion-map'
)
material.aoMap = textureAmbientOcclusionMap
// second UV
mesh.geometry.attributes.uv2 = mesh.geometry.attributes.uv
```
If you compare the objects with roughness map and ambient occlusion map, you can observe that The shadows are more highlighted after using aoMap.

### Metalness Map
It defines how much the material is like a metal.
```js
const textureMetalnessMap = new THREE.TextureLoader().load(
   '/path/to/metalness-map'
)
material.metalnessMap = textureMetalnessMap
```
