import * as THREE from 'three'
import { GUI } from 'dat.gui'

// Plane geometry
// A rotating 2d rectangle in Three.js
// GUI
const gui = new GUI()
// sizes
let width = window.innerWidth
let height = window.innerHeight
// scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x262626)
// camera
const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100)
camera.position.set(0, 0, 10)
const camFolder = gui.addFolder('Camera')
camFolder.add(camera.position, 'z').min(10).max(60).step(10)
camFolder.open()
// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0xffffff, 0.2)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
// plane
const geometry = new THREE.PlaneGeometry(1, 1)
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    side: THREE.DoubleSide
})
const materialFolder = gui.addFolder('Material')
materialFolder.add(material, 'wireframe')
materialFolder.open()
const plane = new THREE.Mesh(geometry, material)
scene.add(plane)
// experimenting plane properties
const planeProps = {
    width: 1,
    height: 1,
    widthSegments: 1,
    heightSegments: 1
}
const props = gui.addFolder('Properties')
props
    .add(planeProps, 'width', 1, 30)
    .step(1)
    .onChange(redraw)
    .onFinishChange(() => console.dir(plane.geometry))
props.add(planeProps, 'height', 1, 30).step(1).onChange(redraw)
props.add(planeProps, 'widthSegments', 1, 30).step(1).onChange(redraw)
props.add(planeProps, 'heightSegments', 1, 30).step(1).onChange(redraw)
props.open()
function redraw() {
    let newGeometry = new THREE.PlaneGeometry(
        planeProps.width,
        planeProps.height,
        planeProps.widthSegments,
        planeProps.heightSegments
    )
    plane.geometry.dispose()
    plane.geometry = newGeometry
}
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
    plane.rotation.x += 0.005
    plane.rotation.y += 0.01
    renderer.render(scene, camera)
}
// rendering the scene
const container = document.querySelector('#threejs-container')
container.append(renderer.domElement)
renderer.render(scene, camera)
animate()