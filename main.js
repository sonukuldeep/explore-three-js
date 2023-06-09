import * as THREE from 'three'
import { GUI } from 'dat.gui'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// Creating 3d text using Text Geometry in Three.js
// GUI
const gui = new GUI()
// sizes
let width = window.innerWidth
let height = window.innerHeight
// scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x262626)
// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 20
pointLight.position.y = 30
pointLight.position.z = 40
scene.add(pointLight)
// camera
const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000)
camera.position.set(0, 0, 50)
const camFolder = gui.addFolder('Camera')
camFolder.add(camera.position, 'z').min(10).max(500).step(10)
camFolder.open()
function createMaterial() { }
const loader = new FontLoader()
// promisify font loading
function loadFont(url) {
    return new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject)
    })
}
async function doit() {
    const font = await loadFont('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json')
    let text = 'Hello World !'
    const geometry = new TextGeometry(text, {
        font: font,
        size: 3,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelOffset: 0,
        bevelThickness: 0.5,
        bevelSize: 0.3,
        bevelSegments: 5
    })
    const material = [
        new THREE.MeshPhongMaterial({
            color: 0xff22cc,
            flatShading: true
        }), // front
        new THREE.MeshPhongMaterial({
            color: 0xffcc22
        }) // side
    ]
    const mesh = new THREE.Mesh(geometry, material)
    geometry.computeBoundingBox()
    geometry.computeVertexNormals()
    geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1)
    mesh.position.x = -geometry.boundingBox.max.x / 2
    const parent = new THREE.Object3D()
    parent.add(mesh)
    scene.add(parent)
    const opts = geometry.parameters.options
    console.log(opts)
    const geoProps = {
        font: opts.font,
        size: opts.size,
        height: opts.height,
        curveSegments: opts.curveSegments,
        bevelEnabled: opts.bevelEnabled,
        bevelOffset: opts.bevelOffset,
        bevelThickness: opts.bevelThickness,
        bevelSize: opts.bevelSize,
        bevelSegments: opts.bevelSegments
    }
    console.log(geoProps)
    // GUI for exporimenting cube properties
    const props = gui.addFolder('Properties')
    props
        .add(geoProps, 'size', 1, 30)
        .step(1)
        .onChange(redraw)
        .onFinishChange(() => console.dir(mesh.geometry))
    props.add(geoProps, 'height', 0, 30).step(0.1).onChange(redraw)
    props.add(geoProps, 'curveSegments', 1, 30).step(1).onChange(redraw)
    props.add(geoProps, 'bevelEnabled').onChange(redraw)
    props.add(geoProps, 'bevelOffset', 0, 1).onChange(redraw)
    props.add(geoProps, 'bevelThickness', 0, 3).onChange(redraw)
    props.add(geoProps, 'bevelSize', 0, 3).onChange(redraw)
    props.add(geoProps, 'bevelSegments', 1, 8).step(1).onChange(redraw)
    props.open()
    function redraw() {
        camera.position.set(0, 0, 80)
        let newGeometry = new THREE.TextGeometry(text, {
            font: geoProps.font,
            size: geoProps.size,
            height: geoProps.height,
            curveSegments: geoProps.curveSegments,
            bevelEnabled: geoProps.bevelEnabled,
            bevelOffset: geoProps.bevelOffset,
            bevelThickness: geoProps.bevelThickness,
            bevelSize: geoProps.bevelSize,
            bevelSegments: geoProps.bevelSegments
        })
        mesh.geometry.dispose()
        mesh.geometry = newGeometry
        mesh.geometry.parameters.options.depth = 0.2
        console.log(mesh.geometry.parameters.options)
    }
}
doit()
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
const renderer = new THREE.WebGL1Renderer({ antialias: true })
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
animate()