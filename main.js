import * as THREE from 'three'
import { GUI } from 'dat.gui'

// Cone geometry in Three.js
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
// cone
const geometry = new THREE.ConeGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})
const materialFolder = gui.addFolder('Material')
materialFolder.add(material, 'wireframe')
materialFolder.open()
const cone = new THREE.Mesh(geometry, material)
scene.add(cone)
const coneProps = {
    radius: 1,
    height: 1,
    radialSegments: 8,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: 2 * Math.PI
}
const props = gui.addFolder('Properties')
props
    .add(coneProps, 'radius', 1, 50)
    .step(1)
    .onChange(redraw)
    .onFinishChange(() => console.dir(cone.geometry))
props.add(coneProps, 'height', 0, 100).onChange(redraw)
props.add(coneProps, 'radialSegments', 1, 50).step(1).onChange(redraw)
props.add(coneProps, 'heightSegments', 1, 50).step(1).onChange(redraw)
props.add(coneProps, 'openEnded').onChange(redraw)
props.add(coneProps, 'thetaStart', 0, 2 * Math.PI).onChange(redraw)
props.add(coneProps, 'thetaLength', 0, 2 * Math.PI).onChange(redraw)
props.open()
function redraw() {
    let newGeometry = new THREE.ConeGeometry(
        coneProps.radius,
        coneProps.height,
        coneProps.radialSegments,
        coneProps.heightSegments,
        coneProps.openEnded,
        coneProps.thetaStart,
        coneProps.thetaLength
    )
    cone.geometry.dispose()
    cone.geometry = newGeometry
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
    cone.rotation.x += 0.005
    cone.rotation.y += 0.01
    renderer.render(scene, camera)
}
// rendecone the scene
const container = document.querySelector('#threejs-container')
container.append(renderer.domElement)
renderer.render(scene, camera)
animate()