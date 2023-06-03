import * as THREE from 'three'
import WebGL from 'three/addons/capabilities/WebGL.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#242424')

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement);

// Creating a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0xd23d32,
    wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);

// add cube to scene
scene.add(cube);

// animate and render
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

if (WebGL.isWebGLAvailable()) {

    // Initiate function or other initializations here
    animate();

} else {

    const warning = WebGL.getWebGLErrorMessage();
    document.body.appendChild(warning);

}