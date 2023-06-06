import * as THREE from 'three'

// Using different types of texture maps
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// sizes
let width = window.innerWidth
let height = window.innerHeight
// scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)
// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const light = new THREE.DirectionalLight(0xffffff, 4.0)
light.position.set(0, 10, 20)
light.castShadow = true
light.shadow.mapSize.width = 512
light.shadow.mapSize.height = 512
light.shadow.camera.near = 0.5
light.shadow.camera.far = 100
scene.add(light)
// camera
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
camera.position.set(0, 0, 10)
// textures
const loader = new THREE.TextureLoader()
const texture = loader.load('/football_diff_1k.jpg')
const normalmap = loader.load('/football_nor_gl_1k_normal.png')
// const heightmap = loader.load('/public/')
const roughmap = loader.load('/football_1k_rough.png')
// const ambientOcclusionmap = loader.load('https://cloud-nfpbfxp6x-hackclub-bot.vercel.app/4ambientocclusion.jpg')
const metallicmap = loader.load('/football_arm_1k_metal.png')
// plane
const planeGeometry = new THREE.PlaneGeometry(100, 100)
const plane = new THREE.Mesh(
   planeGeometry,
   new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
)
plane.rotateX(-Math.PI / 2)
plane.position.y = -2.75
plane.receiveShadow = true
scene.add(plane)
// object
const geometry = new THREE.SphereGeometry(1, 64, 64)
const material1 = new THREE.MeshStandardMaterial({
   map: texture,
   side: THREE.DoubleSide
})
const object1 = new THREE.Mesh(geometry, material1)
object1.position.set(-2.5, 1.5, 0)
object1.castShadow = true
scene.add(object1)
// normal map
const material2 = new THREE.MeshStandardMaterial({
   color: 0xffffff,
   map: texture,
   side: THREE.DoubleSide,
   normalMap: normalmap
})
const object2 = new THREE.Mesh(geometry, material2)
object2.position.set(0, 1.5, 0)
object2.castShadow = true
scene.add(object2)
// displacement map
const material3 = new THREE.MeshStandardMaterial({
   color: 0xffffff,
   map: texture,
   side: THREE.DoubleSide,
   normalMap: normalmap,
   displacementMap: heightmap,
   displacementScale: 0.05
})
const object3 = new THREE.Mesh(geometry, material3)
object3.position.set(2.5, 1.5, 0)
object3.castShadow = true
scene.add(object3)
console.log(object3)
// roughness map
const material4 = new THREE.MeshStandardMaterial({
   color: 0xffffff,
   map: texture,
   side: THREE.DoubleSide,
   normalMap: normalmap,
   displacementMap: heightmap,
   displacementScale: 0.05,
   roughnessMap: roughmap,
   roughness: 0.5
})
const object4 = new THREE.Mesh(geometry, material4)
object4.position.set(-2.5, -1.5, 0)
object4.castShadow = true
scene.add(object4)
console.log(object4)
// ambient occlusion map
const material5 = new THREE.MeshStandardMaterial({
   color: 0xffffff,
   map: texture,
   side: THREE.DoubleSide,
   normalMap: normalmap,
   displacementMap: heightmap,
   displacementScale: 0.05,
   roughnessMap: roughmap,
   roughness: 0.1,
   aoMap: ambientOcclusionmap
})
const object5 = new THREE.Mesh(geometry, material5)
object5.position.set(0, -1.5, 0)
object5.geometry.attributes.uv2 = object5.geometry.attributes.uv
object5.castShadow = true
scene.add(object5)
console.log(object5)
// for env maps
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
   format: THREE.RGBFormat,
   generateMipMaps: true,
   minFilter: THREE.LinearMipmapLinearFilter,
   encoding: THREE.sRGBEncoding
})
const cubeCamera = new THREE.CubeCamera(1, 10000, cubeRenderTarget)
cubeCamera.position.set(0, 100, 0)
scene.add(cubeCamera)
// metallic map
const material6 = new THREE.MeshStandardMaterial({
   color: 0xffffff,
   map: texture,
   side: THREE.DoubleSide,
   normalMap: normalmap,
   displacementMap: heightmap,
   displacementScale: 0.15,
   roughnessMap: roughmap,
   roughness: 0.1,
   aoMap: ambientOcclusionmap,
   metalnessMap: metallicmap,
   metalness: 1,
   envMap: cubeRenderTarget.texture
})
const object6 = new THREE.Mesh(geometry, material6)
object6.position.set(2.5, -1.5, 0)
object6.geometry.attributes.uv2 = object6.geometry.attributes.uv
object6.castShadow = true
scene.add(object6)
console.log(object6)
cubeCamera.position.copy(object6.position)
// responsiveness
window.addEventListener('resize', () => {
   width = window.innerWidth
   height = window.innerHeight
   camera.aspect = width / height
   camera.updateProjectionMatrix()
   renderer.setSize(window.innerWidth, window.innerHeight)
   renderer.render(scene, camera)
})
// renderer - anti-aliasing
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.physicallyCorrectLights = true
renderer.setSize(width, height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
const controls = new OrbitControls(camera, renderer.domElement)
// animation
function animate() {
   requestAnimationFrame(animate)
   let objects = [object1, object2, object3, object4, object5, object6]
   objects.forEach((i) => {
      //i.rotation.x += 0.005
      i.rotation.y += 0.01
   })
   controls.update()
   cubeCamera.update(renderer, scene)
   renderer.render(scene, camera)
}
// rendering the scene
const container = document.querySelector('#threejs-container')
container.append(renderer.domElement)
renderer.render(scene, camera)
animate()