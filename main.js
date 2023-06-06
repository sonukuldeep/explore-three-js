import * as THREE from 'three'
import { GUI } from 'dat.gui'

// Creating a checker-board using Textures
// applying the texture to 2d plane geometry
// GUI
const gui = new GUI()
// sizes
let width = window.innerWidth
let height = window.innerHeight
// scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x262626)
// camera
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)
camera.position.set(0, 0, 10)
const camFolder = gui.addFolder('Camera')
camFolder.add(camera.position, 'z').min(10).max(60).step(10)
camFolder.open()
// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)
// texture
const planeSize = 10
const loader = new THREE.TextureLoader()
const texture = loader.load(' https://cloud-nfpbfxp6x-hack-clubbot.vercel.app/0height.png ')
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.magFilter = THREE.NearestFilter
const repeats = planeSize / 2
texture.repeat.set(repeats, repeats)
class StringToNumberHelper {
    constructor(obj, prop) {
        this.obj = obj
        this.prop = prop
    }
    get value() {
        return this.obj[this.prop]
    }
    set value(v) {
        this.obj[this.prop] = parseFloat(v)
    }
}
const wrapModes = {
    ClampToEdgeWrapping: THREE.ClampToEdgeWrapping,
    RepeatWrapping: THREE.RepeatWrapping,
    MirroredRepeatWrapping: THREE.MirroredRepeatWrapping
}
function updateTexture() {
    texture.needsUpdate = true
}
gui
    .add(new StringToNumberHelper(texture, 'wrapS'), 'value', wrapModes)
    .name('texture.wrapS')
    .onChange(updateTexture)
gui
    .add(new StringToNumberHelper(texture, 'wrapT'), 'value', wrapModes)
    .name('texture.wrapT')
    .onChange(updateTexture)
gui.add(texture.repeat, 'x', 0, 5, 0.01).name('texture.repeat.x')
gui.add(texture.repeat, 'y', 0, 5, 0.01).name('texture.repeat.y')
// plane for board
const geometry = new THREE.PlaneGeometry(planeSize, planeSize)
const material = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide
})
const board = new THREE.Mesh(geometry, material)
board.position.set(0, 0, 0)
scene.add(board)
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
    renderer.render(scene, camera)
}
// rendering the scene
const container = document.querySelector('#threejs-container')
container.append(renderer.domElement)
renderer.render(scene, camera)
console.log(scene.children)
animate()