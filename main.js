import * as THREE from 'three'
import { GUI } from 'dat.gui'

// Adding hemisphere light in Three.js
// It gives the lighting of physical world
// GUI
const gui = new GUI()
// sizes
let width = window.innerWidth
let height = window.innerHeight
// scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x262626)
// camera
const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
camera.position.set(0, 0, 10)
const camFolder = gui.addFolder('Camera')
camFolder.add(camera.position, 'z', 10, 80, 1)
camFolder.open()
// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const skyColor = 0xb1e1ff // light blue
const groundColor = 0xb97a20 // brownish
const light = new THREE.HemisphereLight(skyColor, groundColor)
light.position.set(0, 5, 0)
scene.add(light)
const helper = new THREE.HemisphereLightHelper(light, 5)
scene.add(helper)
// light controls
const lightColor = {
    color: light.color.getHex(),
    groundColor: light.groundColor.getHex()
}
const lightFolder = gui.addFolder('Light')
lightFolder
    .addColor(lightColor, 'color')
    .name('Light Color')

const hemisphereLightFolder = gui.addFolder('Hemisphere Light')
hemisphereLightFolder
    .addColor(lightColor, 'groundColor')
    .name('ground Color')
    .onChange(() => {
        light.groundColor.set(lightColor.groundColor)
    })
hemisphereLightFolder.add(light.position, 'x', -100, 100, 0.01)
hemisphereLightFolder.add(light.position, 'y', -100, 100, 0.01)
hemisphereLightFolder.add(light.position, 'z', -100, 100, 0.01)
hemisphereLightFolder.open()
// cube
console.log('cube')
const geometry = new THREE.BoxGeometry(2, 2, 2)
const material = new THREE.MeshStandardMaterial({
    color: 0x87ceeb
})
const materialFolder = gui.addFolder('Material')
materialFolder.add(material, 'wireframe')
materialFolder.open()
const cube = new THREE.Mesh(geometry, material)
cube.position.set(0, 0.5, 0)
cube.castShadow = true
cube.receiveShadow = true
scene.add(cube)
// responsiveness
window.addEventListener('resize', () => {
    width = window.innerWidth
    height = window.innerHeight
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
})
// renderer
const renderer = new THREE.WebGL1Renderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// animation
function animate() {
    requestAnimationFrame(animate)
    cube.rotation.x += 0.005
    cube.rotation.y += 0.01
    renderer.render(scene, camera)
}
// rendering the scene
const container = document.querySelector('#container')
container.append(renderer.domElement)
renderer.render(scene, camera)
animate()