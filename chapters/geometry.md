## Geometry
Geometries are used to create and define shapes in Three.js. Three.js has many types of built-in geometries, both 2D and 3D.

In this chapter, we'll discuss basic built-in geometries. We’ll first look at the 2D geometries, and after that, we’ll explore all the basic 3D geometries that are available.

1. [Plane Geometry](#plane-geometry)
The THREE.PlaneGeometry creates a simple 2D rectangle.

2. [Circle Geometry](#circle-geometry)
The THREE.CircleGeometry creates a simple 2D circle.

3. [Ring Geometry](#ring-geometry)
The THREE.RingGeometry creates a D disc with a hole in the center.

4. [Box Geometry](#box-geometry)
The THREE.BoxGeometry creates a simple 3D box with specified dimensions.

5. [Sphere Geometry](#sphere-geometry)
The THREE.SphereGeometry creates 3D sphere geometries.

6. [Cylinder Geometry](#cylinder-geometry)
To create a cylinder in Three.js, you can use the Three.CylinderGeometry.

7. [Cone Geometry](#cone-geometry)
You can use THREE.ConeGeometry to create a cone. It is very similar to CylinderGeometry, except it only allows you to set the radius instead of radiusTop and radiusBottom.

8. [Torus Geometry](#torus-geometry)
Torus is a tube-like shape that looks like a donut. You can use THREE.TorusGeometry to create a torus in Three.js.

9. [TorusKnot Geometry](#torus-knot-geometry)
A torus knot is a special kind of knot that looks like a tube that winds around itself a couple of times.

10. [Polyhedron Geometry](#polyhedron-geometry)
A polyhedron is a geometry that has only flat faces and straight edges.

### Plane geometry
The THREE.PlaneGeometry creates a simple 2D rectangle. It takes four arguments, the width, height is mandatory, and the widthSegments, heightSegments are optional.
- width − The width of the rectangle.
- height − The height of the rectangle.
- widthSegments − The number of segments the width should be divided. This defaults to 1.
- heightSegments − The number of segments the height should be divided. This defaults to 1.

```js
const plane = new THREE.PlaneGeometry(
   width, height,
   widthSegments, heightSegments
)
```

### Circle geometry
The THREE.CircleGeometry creates a simple 2D circle. It takes four arguments, and all are optional.
- radius − The radius of a circle defines its size. The default value is 1.
- segments − the number of faces used to create the circle. The default value is 8. The more segments, the smoother circle is.
- thetaStart − The position from which to start drawing the circle. This value can range from 0 to 2 * PI, and the default value is 0.
- thetaLength − This property defines to what extent the circle is completed. The default value is 2 * PI.
```js
const circle = new THREE.CircleGeometry(
   radius, segments,
   thetaStart, thetaLength
)
```

### Ring geometry
The THREE.RingGeometry creates a D disc with a hole in the center. It is very similar to circle geometry.
- innerRadius − The inner radius of a circle defines the size of the hole in the center. 0 means no hole. The default value is 0.5.
- outerRadius − The outer radius of a circle defines its size. The default value is 1.
- thetaSegments − the number of diagonal segments used to create the circle. The default value is 8. The more segments, the smoother circle is.
- phiSegments − the number of segments used along the length of the ring. The default value is 8.
- thetaStart − The position from which to start drawing the circle. This value can range from 0 to 2 * PI, and the default value is 0.
- thetaLength − This property defines to what extent the circle is completed. The default value is 2 * PI.
```js
const ring = new THREE.RingGeometry(
   innerRadius, outerRadius,
   thetaSegments, phiSegments,
   thetaStart, thetaLength
)
```

### Box geometry
The THREE.BoxGeometry creates a simple 3D box with specified dimensions. This is the expanded version of PlaneGeometry in z axis as depth.
```js
const box = new THREE.CubeGeometry(
   width, height, depth,
   widthSegments, heightSegments, depthSegments
)
```

### Sphere geometry
The THREE.SphereGeometry creates 3D sphere geometries. You can create different types of sphere-related geometries by passing the arguments.
- radius − The radius of a circle defines its size. The default value is 1.
- widthSegments − number of segments used vertically. This defaults to 8.
- heightSegments − the number of segments used horizontally. This defaults to 6.
- phiStart − The position from which to start drawing the circle. This value can range from 0 to 2 * PI, and the default value is 0.
- phiLength − This property defines to what extent the circle is completed. The default value is 2 * PI.
- thetaStart − The position from which to start drawing the circle. This value can range from 0 to 2 * PI, and the default value is 0.
- thetaLength − This property defines to what extent the circle is completed. The default value is 2 * PI.
```js
const sphere = new THREE.SphereGeometry(
   radius,
   widthSegments, heightSegments,
   phiStart, phiLength, 
   thetaStart, thetaLength
)
```

### Cylinder geometry
To create a cylinder in Three.js, you can use the Three.CylinderGeometry.
- radiusTop − Radius of the cylinder at the top. Default is 1.
- radiusBottom − Radius of the cylinder at the bottom. Default is 1.
- radialSegments − the number of segments around the circumference of the cylinder. Default is 8.
- heightSegments − Number of rows of faces along with the height of the cylinder. Default is 1.
- openEnded − It's a Boolean indicating whether the ends of the cylinder are open or not. Default is false, meaning closed.
- thetaStart − Start angle for the first segment, defaults to 0.
- thetaLength − The central angle, often called theta, of the circular sector. The default is 2* Math.PI, which makes for a complete cylinder.
```js
const cylinder = new THREE.CylinderGeometry(
   radiusTop, radiusBottom, height,
   radialSegments, heightSegments,
   openEnded,
   thetaStart, thetaLength
)
```

### Cone geometry
You can use THREE.ConeGeometry to create a cone. It is very similar to CylinderGeometry, except it only allows you to set the radius instead of radiusTop and radiusBottom.
```js
const cone = new THREE.ConeGeometry(
   radius, height,
   radialSegments, heightSegments,
   openEnded,
   thetaStart, thetaLength
)
```

### Torus geometry
Torus is a tube-like shape that looks like a donut. You can use THREE.TorusGeometry to create a torus in Three.js. The arguments, radialSegments, and tubularSegments are the number of segments along the radius and tube. With arc property, you can control whether the torus has drawn a full circle.
```js
const torus = new THREE.TorusGeometry(
   radius, tubeRadius,
   radialSegments, tubularSegments,
   arc
)
```

### Torus knot geometry
A torus knot is a special kind of knot that looks like a tube that winds around itself a couple of times.You can create a torus-knot using THREE.TorusKnotGeometry. It's pretty similar to TorusGeometry with additional properties, the p and q.
- p − It defines how many times the geometry winds around its axis of rotational symmetry. Default is 2.
- q − It defines how many times the geometry winds around the interior of the torus. This defaults to 3.
```js
const torusKnot = new THREE.TorusKnotGeometry(
   radius, tubeRadius,
   tubularSegments, radialSegments,
   p, q
)
```

### Polyhedron geometry
A polyhedron is a geometry that has only flat faces and straight edges. You can draw different types of polyhedrons by specifying vertices and indices.
- vertices − Array of points that make up the polyhedron.
- indices − Array of indices that make up the faces from the vertices.
- radius − The radius of the final shape. This defaults to 1.
- detail − How many levels to subdivide the geometry. The more detail, the smoother the shape.

The following code creates a polyhedron with four faces.
```js
const vertices = [
   1, 1, 1,
   -1, -1, 1,
   -1, 1, -1,
   1, -1, -1
]
const indices = [
   2, 1, 0,
   0, 3, 2,
   1, 3, 0,
   2, 3, 1
]
const geometry = new THREE.PolyhedronGeometry(vertices, indices, radius, detail)
```