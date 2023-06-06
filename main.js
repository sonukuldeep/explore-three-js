import * as THREE from 'three'
import { GUI } from 'dat.gui'

// Adding Ambient to the scene
// without this light you cannot see the color of the cube
// GUI
const gui = new GUI()
// sizes
let width = window.innerWidth
let height = window.innerHeight
// scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x262626)
// camera
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
camera.position.set(0, 0, 10)
// lights
const light = new THREE.AmbientLight(0xffffff, 1)
scene.add(light)
// light controls
const lightColor = {
    color: light.color.getHex()
}
const lightFolder = gui.addFolder('Ambient Light')
lightFolder.addColor(lightColor, 'color').onChange(() => {
    light.color.set(lightColor.color)
})
lightFolder.add(light, 'intensity', 0, 1, 0.01)
lightFolder.open()
// cube
const geometry = new THREE.BoxGeometry(2, 2, 2)
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: true
})
const materialFolder = gui.addFolder('Material')
materialFolder.add(material, 'wireframe')
materialFolder.open()
const cube = new THREE.Mesh(geometry, material)
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
renderer.setSize(width, height)
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