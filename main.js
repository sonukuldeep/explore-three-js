import * as THREE from 'three'
import { GUI } from 'dat.gui'

// Cylinder geometry in Three.js
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
// cylinder
const geometry = new THREE.CylinderGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})
const materialFolder = gui.addFolder('Material')
materialFolder.add(material, 'wireframe')
materialFolder.open()
const cylinder = new THREE.Mesh(geometry, material)
scene.add(cylinder)
const cylinderProps = {
    radiusTop: 1,
    radiusBottom: 1,
    height: 1,
    radialSegments: 8,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: 2 * Math.PI
}
const props = gui.addFolder('Properties')
props
    .add(cylinderProps, 'radiusTop', 1, 50)
    .step(1)
    .onChange(redraw)
    .onFinishChange(() => console.dir(cylinder.geometry))
props.add(cylinderProps, 'radiusBottom', 0, 50).onChange(redraw)
props.add(cylinderProps, 'height', 0, 100).onChange(redraw)
props.add(cylinderProps, 'radialSegments', 1, 50).step(1).onChange(redraw)
props.add(cylinderProps, 'heightSegments', 1, 50).step(1).onChange(redraw)
props.add(cylinderProps, 'openEnded').onChange(redraw)
props.add(cylinderProps, 'thetaStart', 0, 2 * Math.PI).onChange(redraw)
props.add(cylinderProps, 'thetaLength', 0, 2 * Math.PI).onChange(redraw)
props.open()
function redraw() {
    let newGeometry = new THREE.CylinderGeometry(
        cylinderProps.radiusTop,
        cylinderProps.radiusBottom,
        cylinderProps.height,
        cylinderProps.radialSegments,
        cylinderProps.heightSegments,
        cylinderProps.openEnded,
        cylinderProps.thetaStart,
        cylinderProps.thetaLength
    )
    cylinder.geometry.dispose()
    cylinder.geometry = newGeometry
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
    cylinder.rotation.x += 0.005
    cylinder.rotation.y += 0.01
    renderer.render(scene, camera)
}
// rendecylinder the scene
const container = document.querySelector('#threejs-container')
container.append(renderer.domElement)
renderer.render(scene, camera)
animate()