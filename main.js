import * as THREE from 'three'
import { GUI } from 'dat.gui'

// Torus knot geometry in Three.js
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
// torusKnot
const geometry = new THREE.TorusKnotGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})
const materialFolder = gui.addFolder('Material')
materialFolder.add(material, 'wireframe')
materialFolder.open()
const torusKnot = new THREE.Mesh(geometry, material)
scene.add(torusKnot)
const torusKnotProps = {
    radius: 1,
    tubeRadius: 0.5,
    radialSegments: 64,
    tubularSegments: 8,
    p: 2,
    q: 3
}
const props = gui.addFolder('Properties')
props
    .add(torusKnotProps, 'radius', 1, 50)
    .step(1)
    .onChange(redraw)
    .onFinishChange(() => console.dir(torusKnot.geometry))
props.add(torusKnotProps, 'tubeRadius', 0.1, 50).step(0.1).onChange(redraw)
props.add(torusKnotProps, 'radialSegments', 1, 50).step(1).onChange(redraw)
props.add(torusKnotProps, 'tubularSegments', 1, 50).step(1).onChange(redraw)
props.add(torusKnotProps, 'p', 1, 20).step(1).onChange(redraw)
props.add(torusKnotProps, 'q', 1, 20).step(1).onChange(redraw)
props.open()
function redraw() {
    let newGeometry = new THREE.TorusKnotGeometry(
        torusKnotProps.radius,
        torusKnotProps.tubeRadius,
        torusKnotProps.radialSegments,
        torusKnotProps.tubularSegments,
        torusKnotProps.p,
        torusKnotProps.q
    )
    torusKnot.geometry.dispose()
    torusKnot.geometry = newGeometry
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
    torusKnot.rotation.x += 0.005
    torusKnot.rotation.y += 0.01
    renderer.render(scene, camera)
}
// rendering the scene
const container = document.querySelector('#threejs-container')
container.append(renderer.domElement)
renderer.render(scene, camera)
animate()