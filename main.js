import * as THREE from 'three'
import { GUI } from 'dat.gui'

// Adding point light to Three.js scene
// It is like a small sun, which emits light from a point in all directions
// GUI
// sizes
let width = window.innerWidth
let height = window.innerHeight
const gui = new GUI()

// scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x262626)
console.log(scene.children)
// camera
const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000)
camera.position.set(0, 0, 10)
const camFolder = gui.addFolder('Camera')
camFolder.add(camera.position, 'z', 10, 80, 1)
camFolder.open()
// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const light = new THREE.PointLight()
scene.add(light)
const helper = new THREE.PointLightHelper(light)
scene.add(helper)
// for shadow
light.castShadow = true
light.shadow.mapSize.width = 1024
light.shadow.mapSize.height = 1024
light.shadow.camera.near = 0.5
light.shadow.camera.far = 100
scene.add(light)
// light controls
const lightColor = {
    color: light.color.getHex()
}
const lightFolder = gui.addFolder('Light')
lightFolder.addColor(lightColor, 'color').onChange(() => {
    light.color.set(lightColor.color)
})
lightFolder.add(light, 'intensity', 0, 1, 0.01)
lightFolder.open()
const pointLightFolder = gui.addFolder('THREE.PointLight')
pointLightFolder.add(light, 'distance', 0, 100, 0.01)
pointLightFolder.add(light, 'decay', 0, 4, 0.1)
pointLightFolder.add(light.position, 'x', -50, 50, 0.01)
pointLightFolder.add(light.position, 'y', -50, 50, 0.01)
pointLightFolder.add(light.position, 'z', -50, 50, 0.01)
pointLightFolder.open()
// plane
const planeGeometry = new THREE.PlaneGeometry(100, 20)
const plane = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial({ color: 0xffffff }))
plane.rotateX(-Math.PI / 2)
plane.position.y = -2.5
plane.receiveShadow = true
scene.add(plane)
// torus
const geometry = new THREE.TorusGeometry(1.5, 0.5, 20, 50)
const material = new THREE.MeshStandardMaterial({
    color: 0x87ceeb
})
const materialFolder = gui.addFolder('Material')
materialFolder.add(material, 'wireframe')
materialFolder.open()
const torus = new THREE.Mesh(geometry, material)
torus.castShadow = true
torus.receiveShadow = true
scene.add(torus)
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
    torus.rotation.x += 0.005
    torus.rotation.y += 0.01
    renderer.render(scene, camera)
}
// rendering the scene
const container = document.querySelector('#container')
container.append(renderer.domElement)
renderer.render(scene, camera)
animate()