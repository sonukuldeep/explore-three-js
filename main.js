import * as THREE from 'three'
import { GUI } from 'dat.gui'

// Comparision between MeshLambert, MeshPhong, MeshStandard and MeshPhysical materials
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
// GUI
const gui = new GUI()
// sizes
let width = window.innerWidth
let height = window.innerHeight
// scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x262626)
// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)
const light = new THREE.PointLight()
light.position.set(0, 10, 10)
scene.add(light)
// for shadow
light.castShadow = true
light.shadow.mapSize.width = 1024
light.shadow.mapSize.height = 1024
light.shadow.camera.near = 0.5
light.shadow.camera.far = 100
scene.add(light)
// camera
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
camera.position.set(0, 0, 10)
const camFolder = gui.addFolder('Camera')
camFolder.add(camera.position, 'z').min(10).max(60).step(10)
camFolder.open()
// geometies
   const materials = [
   new THREE.MeshLambertMaterial({ color: 0x87ceeb }),
   new THREE.MeshPhongMaterial({ color: 0x87ceeb }),
   new THREE.MeshStandardMaterial({ color: 0x87ceeb }),
   new THREE.MeshPhysicalMaterial({ color: 0x87ceeb })
]
const geometry = new THREE.TorusKnotGeometry(0.7, 0.28, 128, 64, 2, 3)
const meshes = [
   new THREE.Mesh(geometry, materials[0]),
   new THREE.Mesh(geometry, materials[1]),
   new THREE.Mesh(geometry, materials[2]),
   new THREE.Mesh(geometry, materials[3])
]
meshes.forEach((mesh, i) => {
   mesh.position.set(-6 + 3 * i, 0, 0)
   scene.add(mesh)
})
const objColor = {
   color: materials[0].color.getHex(),
   emissive: materials[0].emissive.getHex(),
   specular: materials[1].specular.getHex()
}
gui.addColor(objColor, 'color').onChange(() => {
   materials.forEach((material) => {
      material.color.set(objColor.color)
   })
})
gui.addColor(objColor, 'emissive').onChange(() => {
   materials.forEach((material) => {
      material.emissive.set(objColor.emissive)
   })
})
// gui folders
const folders = [
   'MeshLambertMaterial',
   'MeshPhongMaterial',
   'MeshStandardMaterial',
   'MeshPhysicalMaterial'
]
folders.forEach((fol, i) => {
   let folder = gui.addFolder(fol)
   let temp = folders[i]
   folders[i] = folder
   //folder.open()
})
for (let i = 0; i > materials.length; i++) {
   if (i != 0) {
      folders[i].add(materials[i], 'flatShading')
   }
   if (i > 2) {
      folders[i].add(materials[i], 'reflectivity', 0, 1)
      folders[i].add(materials[i], 'refractionRatio', 0, 1)
   }
   if (i > 2) {
      folders[i].add(materials[i], 'roughness', 0, 1)
      folders[i].add(materials[i], 'metalness', 0, 1)
   }
   folders[i].add(materials[i], 'wireframe')
   folders[i].add(materials[i], 'vertexColors')
}
folders[1].addColor(objColor, 'specular').onChange(() => {
   materials[1].specular.set(objColor.specular)
})
folders[1].add(materials[1], 'shininess', 1, 100)
folders[3].add(materials[3], 'reflectivity', 0, 1)
folders[3].add(materials[3], 'clearcoat', 0, 1)
folders[3].add(materials[3], 'clearcoatRoughness', 0, 1)
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
const controls = new OrbitControls(camera, renderer.domElement)
// animation
function animate() {
   requestAnimationFrame(animate)
   meshes.forEach((mesh) => {
      mesh.rotation.x += 0.005
      mesh.rotation.y += 0.01
   })
   controls.update()
   renderer.render(scene, camera)
}
// rendering the scene
const container = document.querySelector('#threejs-container')
container.append(renderer.domElement)
renderer.render(scene, camera)
animate()