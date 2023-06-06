import * as THREE from 'three'
import { GUI } from 'dat.gui'

// Ring geometry
// a simple 2d ring in Three.js
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
// ring
const geometry = new THREE.RingGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    side: THREE.DoubleSide
})
const materialFolder = gui.addFolder('Material')
materialFolder.add(material, 'wireframe')
materialFolder.open()
const ring = new THREE.Mesh(geometry, material)
scene.add(ring)
const ringProps = {
    innerRadius: 1,
    outerRadius: 5,
    thetaSegments: 8,
    phiSegments: 8,
    thetaStart: 0,
    thetaLength: 2 * Math.PI
}
const props = gui.addFolder('Properties')
props
    .add(ringProps, 'innerRadius', 1, 50)
    .step(1)
    .onChange(redraw)
    .onFinishChange(() => console.dir(ring.geometry))
props.add(ringProps, 'outerRadius', 1, 50).step(1).onChange(redraw)
props.add(ringProps, 'thetaSegments', 1, 50).step(1).onChange(redraw)
props.add(ringProps, 'phiSegments', 1, 50).step(1).onChange(redraw)
props.add(ringProps, 'thetaStart', 0, 2 * Math.PI).onChange(redraw)
props.add(ringProps, 'thetaLength', 0, 2 * Math.PI).onChange(redraw)
props.open()
function redraw() {
    let newGeometry = new THREE.RingGeometry(
        ringProps.innerRadius,
        ringProps.outerRadius,
        ringProps.thetaSegments,
        ringProps.phiSegments,
        ringProps.thetaStart,
        ringProps.thetaLength
    )
    ring.geometry.dispose()
    ring.geometry = newGeometry
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
    ring.rotation.x += 0.005
    ring.rotation.y += 0.01
    renderer.render(scene, camera)
}
// rendering the scene
const container = document.querySelector('#threejs-container')
container.append(renderer.domElement)
renderer.render(scene, camera)
animate()