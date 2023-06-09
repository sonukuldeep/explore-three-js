## Procedural Text Geometry
Often you need to add text to your scene. In this chapter, let's see how to add 2D and 3D text to our scene.
Draw Text to Canvas and Use as a Texture

This is the easiest way to add 2D text to your scene. you can create canvas using JavaScript andd add it to the dom.
```js
const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')
```
The code above creates a canvas element, and we set the context to 2d. The canvas.getContext() method returns an object that provides methods and properties for drawing on the canvas, which it can use to draw text, lines, boxes, circles, and more.
```js
context.fillStyle = 'green'
context.font = '60px sans-serif
context.fillText('Hello World!', 0, 60)
```
The fillText() is a method of a 2D drawing context. The fillText() method allows you to draw a text string at a coordinate with the fill (color) derived from the fillStyle you provided. You can set the font of the text using the font property.

The above code set the font to 60-pixel-tall san-serif and the fill style to green. The text 'Hello, World!' is drawn starting at the coordinates (0, 60).
```js
// canvas contents are used for a texture
const texture = new THREE.Texture(canvas)
texture.needsUpdate = true
```
To create a texture from a canvas element, we need to create a new instance of THREE.Texture and pass in the canvas element we made. The code above creates a texture using the canvas (in this case, our text). The needsUpdate parameter of the texture is set to true. It informs Three.js that our canvas texture has changed and needs to be updated the next time the scene is rendered.

Now, create a plane geometry and add this as a texture to the material.
```js
var material = new THREE.MeshBasicMaterial({
   map: texture,
   side: THREE.DoubleSide,
})
material.transparent = true
var mesh = new THREE.Mesh(new THREE.PlaneGeometry(50, 10), material)
```

## Using Text Geometry

THREE.TextGeometry is another type of geometry that generates text as a single geometry. It takes two arguments, text - the text you want to render, and other parameters.
Parameters
- font − This is the name of the font.
- size − Size of the text. Default is 100.
- height − The height property defines the depth of the text; in other words, how far the text extrudes to make it 3D. This defaults to 50.
- curveSegments − Number of points on the curves. Default is 12.
- bevelEnabled − A bevel provides a smooth transition from the front of the text to the side. If you set this value to true, it adds a bevel to the rendered text. By default, it is false.
- bevelThickness − If you've set bevelEnabled to true, it defines how deep the bevel is. Default is 10.
- bevelSize − It determines how high the bevel is. Default is equal to 8.
- bevelOffset − How far from text outline bevel starts. Default is 0.
- bevelSegments − The number of bevel segments. Default is 3.

You need to use THREE.FontLoader to load fonts from their typeface.json files.
```js
const loader = new THREE.FontLoader()
loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
   const geometry = new THREE.TextGeometry('Hello Three.js!', {
      font: font,
      size: 3,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: false,
      bevelThickness: 0.5,
      bevelSize: 0.3,
      bevelOffset: 0,
      bevelSegments: 5,
   })
})
```
Now, you should add some material to it and create a mesh.
```js
const material = new THREE.MeshFaceMaterial([
   new THREE.MeshPhongMaterial({
      color: 0xff22cc,
      flatShading: true,
   }), // front
   new THREE.MeshPhongMaterial({
      color: 0xffcc22
   }), // side
])
const mesh = new THREE.Mesh(geometry, material)
mesh.name = 'text'
scene.add(mesh)
```
Note − There is one thing you need to take into account when working with THREE.TextGeometry and materials. It can take two materials as an array: one for the front of rendered text and another for the side of the text. If you just pass in one material, it gets applied to both the front and the side.

## [CSS2DRenderer](https://threejs.org/docs/index.html#examples/en/renderers/CSS2DRenderer)

## [CSS3DRenderer](https://threejs.org/docs/index.html#examples/en/renderers/CSS3DRenderer)

## [Draw text to canvas and use as a Texture](https://threejs.org/docs/index.html#api/en/textures/Texture)
