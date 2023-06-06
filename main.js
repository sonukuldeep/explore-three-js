import * as THREE from 'three'
import { GUI } from 'dat.gui'

// Using mesh depth material
// white means, top point. black means, bottom point
// GUI
const gui = new GUI()
// sizes
let width = window.innerWidth
let height = window.innerHeight// scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x262626)
// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
// camera
const camera = new THREE.PerspectiveCamera(30, width / height, 250, 550)
camera.position.z = 450
// torusKnot
const geometry = new THREE.TorusKnotGeometry(50, 20, 128, 64, 2, 3)
const material = new THREE.MeshDepthMaterial()
const materialFolder = gui.addFolder('Material')
materialFolder.add(material, 'wireframe')
materialFolder.open()
const torusKnot = new THREE.Mesh(geometry, material)
scene.add(torusKnot)
// responsiveness
window.addEventListener('resize', () => {
    width = window.innerWidth
    height = window.innerHlet
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
})
// renderer
const renderer = new THREE.WebGL1Renderer({ logarithmicDepthBuffer: true })
renderer.setSize(width, height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// animation
function animate() {
    requestAnimationFrame(animate)
    torusKnot.rotation.x += 0.005
    torusKnot.rotation.y += 0.01
    renderer.render(scene, camera)
}
// rendering the scene
const container = document.querySelector('#threejs-container')
container.append(renderer.domElement)
renderer.render(scene, camera)
animate()