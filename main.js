import * as THREE from 'three'
import { GUI } from 'dat.gui'

// Creating a tetrahedron using Polyhedron geometry in Three.js
// GUI
const gui = new GUI()
// sizes
let width = window.innerWidth
let height = window.innerHeight
// scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x262626)
const axesHepler = new THREE.AxesHelper(10)
scene.add(axesHepler)
// camera
const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100)
camera.position.set(0, 0, 10)
const camFolder = gui.addFolder('Camera')
camFolder.add(camera.position, 'z').min(10).max(60).step(10)
camFolder.open()
// prettier-ignore
const vertices = [
    1, 1, 1,
    -1, -1, 1,
    -1, 1, -1,
    1, -1, -1
]
// prettier-ignore
const indices = [
    2, 1, 0,
    0, 3, 2,
    1, 3, 0,
    2, 3, 1
]
const geometry = new THREE.PolyhedronGeometry(vertices, indices)
const material = new THREE.MeshNormalMaterial({
    color: 0xffffff
})
const materialFolder = gui.addFolder('Material')
materialFolder.add(material, 'wireframe')
materialFolder.open()
const plane = new THREE.Mesh(geometry, material)
scene.add(plane)
// experimenting plane properties
const planeProps = {
    radius: 1,
    detail: 1
}
const props = gui.addFolder('Properties')
props
    .add(planeProps, 'radius', 1, 30)
    .step(1)
    .onChange(redraw)
    .onFinishChange(() => console.dir(plane.geometry))
props.add(planeProps, 'detail', 1, 30).step(1).onChange(redraw)
props.open()
function redraw() {
    let newGeometry = new THREE.PolyhedronGeometry(
        verticesOfCube,
        indicesOfFaces,
        planeProps.radius,
        planeProps.detail
    )
    plane.geometry.dispose()
    plane.geometry = newGeometry
}
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