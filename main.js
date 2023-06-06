import * as THREE from 'three'
import { GUI } from 'dat.gui'

// creating a sphere using Sphere geometry in Three.js
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
const ambientLight = new THREE.AmbientLight(0x87ceeb, 1)
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0xffffff, 0.2)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
// sphere
const geometry = new THREE.SphereGeometry()
const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
material.metalness = 0.7
material.roughness = 0.3
const materialFolder = gui.addFolder('Material')
materialFolder.add(material, 'wireframe')
materialFolder.open()
const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)
const sphereProps = {
    radius: 1,
    widthSegments: 8,
    heightSegments: 6,
    phiStart: 0,
    phiLength: 2 * Math.PI,
    thetaStart: 0,
    thetaLength: 2 * Math.PI
}
const props = gui.addFolder('Properties')
props
    .add(sphereProps, 'radius', 1, 50)
    .step(1)
    .onChange(redraw)
    .onFinishChange(() => console.dir(sphere.geometry))
props.add(sphereProps, 'widthSegments', 1, 50).step(1).onChange(redraw)
props.add(sphereProps, 'heightSegments', 1, 50).step(1).onChange(redraw)
props.add(sphereProps, 'phiStart', 0, 2 * Math.PI).onChange(redraw)
props.add(sphereProps, 'phiLength', 0, 2 * Math.PI).onChange(redraw)
props.add(sphereProps, 'thetaStart', 0, 2 * Math.PI).onChange(redraw)
props.add(sphereProps, 'thetaLength', 0, 2 * Math.PI).onChange(redraw)
props.open()
function redraw() {
    let newGeometry = new THREE.SphereGeometry(
        sphereProps.radius,
        sphereProps.widthSegments,
        sphereProps.heightSegments,
        sphereProps.phiStart,
        sphereProps.phiLength,
        sphereProps.thetaStart,
        sphereProps.thetaLength
    )
    sphere.geometry.dispose()
    sphere.geometry = newGeometry
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
    sphere.rotation.x += 0.005
    sphere.rotation.y += 0.01
    renderer.render(scene, camera)
}
// rendesphere the scene
const container = document.querySelector('#threejs-container')
container.append(renderer.domElement)
renderer.render(scene, camera)
animate()