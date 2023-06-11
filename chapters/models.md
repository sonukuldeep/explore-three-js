## Models
3D models are available in many formats. You can import most of the models into Three.js and work with them quickly. Some formats are difficult to work with, inefficient for real-time experiences, or simply not fully supported by Three.js at this time. Let's discuss some of the standard formats and how to load them into the Three.js file.

Note − Only a few format loaders are built-in in Three.js. For loading other format models, you need to include their JavaScript files. You can find all the different loaders in the Three.js repo in the three/examples/jsm/loaders directory.

For loading any model, we use these simple three steps −
- Include [NameOfFormat]Loader.js in your web page.
- Use [NameOfFormat]Loader.load() to load a URL.
- Check what the response format for the callback function looks like and render the result.

## OBJ Model Loader

The OBJ file defines the geometry of the material in the form of text. Many other 3D Model software can create models in OBJ format. In Threejs, when importing an OBJ, the default material is a white MeshPhongMaterial. You need at least one light in your scene. You can use OBJLoader to load the models in OBJ format.

To use OBJLoader in your Three.js project, you need to add the OBJLoader JavaScript file.
```js
<script type="text/javascript" src="../scripts/OBJLoader.js"></script>
```
Then, you can load the model just like you loaded the texture using .load method.
```js
const loader = new THREE.OBJLoader()
loader.load('path/to/your/.obj file', (object) => {
   scene.add(object)
})
```
In this code, we use OBJLoader to load the model from a URL. Once the model is loaded, the callback we provide is called, and we can customize the loaded mesh if you want.

## MTL Model Loader

OBJ and MTL are companion formats and often used together. The MTL file defines the materials used for the geometry in OBJ files. The MTL is also in a text-based format.
```js
<script type="text/javascript" src="../scripts/MTLLoader.js"></script>
```
We'll use MTLLoader and OBJLoader together in this code snippet.
```js
const mtlLoader = new THREE.MTLLoader()
mtlLoader.load('/path/to/your/.mtl file', (materials) => {
   materials.preload()
   // loading geometry
   const objLoader = new THREE.OBJLoader()
   objLoader.setMaterials(materials)
   objLoader.load('path/to/your/.obj file', (object) => {
      mesh = object
      scene.add(mesh)
   })
})
```

It loads the materials first. Then we set the materials of the OBJ file to load as the loaded material and then load the OBJ file. It creates the mesh we needed to render an object to the scene, customizing the mesh or material just like those in the Three.js projects.

## GLTF Model Loader

A glTF file may contain one or more scenes, meshes, materials, textures, skins, skeletons, morph targets, animations, lights, and cameras. It is the recommended format by official Three.js. Both .GLB and .GLTF versions of the format are well-supported by Three.js. Because glTF focuses on runtime asset delivery, it is compact to transmit and fast to load.
```js
<script src="../scripts/GLTFLoader.js"></script>
```
Using the GLTFLoader object, you can import either JSON (.gltf) or binary (.glb) format.
```js
const loader = new THREE.GLTFLoader()
// loading model
loader.load('path/to/model.glb', (gltf) => {
   scene.add(gltf.scene)
})
```
The scene of the imported glTF model is added to our Three.js project. The loaded model may contain two scenes; you can specify the scene you want to import.

## DRACO Loader

The DRACOLoader is used to load geometry (.drc format files) compressed with the Draco library. Draco is an open-source library for compressing and decompressing 3D meshes and point clouds.

glTF files can also be compressed using the DRACO library, and they can also be loaded using the glTFLoader. We can configure the glTFLoader to use the DRACOLoader to decompress the file in such cases
```js
<script src="../scripts/GLTFLoader.js"></script>
<script src="../scripts/DRACOLoader.js"></script>
```
Like any other model, you can easily load the .drc files using DRACOLoader. And then, you can add Material to the geometry loaded and render the Mesh to the scene.
```js
const loader = new THREE.DRACOLoader()
loader.setDecoderPath('/scripts/draco/')
// Load a Draco geometry
loader.load('path/to/your/.drc file', (geometry) => {
   const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
   const mesh = new THREE.Mesh(geometry, material)
   scene.add(mesh)
})
```
This code snippet is used when you want to import glTF file format that has geometry compressed using Draco library.
```js
const dracoLoader = new THREE.DRACOLoader()
dracoLoader.setDecoderPath('/scripts/draco/')
dracoLoader.setDecoderConfig({ type: 'js' })
// loading glTF model that uses draco library
const loader = new THREE.GLTFLoader()
loader.setDRACOLoader(dracoLoader)
loader.load('models/monkey_compressed.glb', (gltf) => {
   scene.add(gltf.scene)
})
```

## STL Model Loader

The STL model format is widely used for rapid prototyping, 3D printing, and computer-aided manufacturing.

STL files describe only the surface geometry of a 3D object without any representation of color, texture, or other common 3d modeling attributes. You can add them to the callback function.
```js
<script src="../scripts/STLLoader.js"></script>
```
We use the geometry from the .stl file and add material to it before adding it to the scene.
```js
const material = new THREE.MeshPhysicalMaterial({ color: 0xaaaaaa })
const loader = new THREE.STLLoader()
loader.load('path/to/your/.stl file', (geometry) => {
   const mesh = new THREE.Mesh(geometry, material)
   scene.add(mesh)
})
```
There are many other formats you can load into your Three.js project. The above mentioned are the standard formats. The Loader files are well-documented and easy to use.