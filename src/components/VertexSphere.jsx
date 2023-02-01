import { OrbitControls, Line  } from "@react-three/drei";
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import '../../scene.css'
// import Grid from "../Grid";

import vertexShader from './vertexShader'
// import fragmentShader from './fragmentShader'
import fragmentShader from './lightBallFragmentShader'
import { LineSegments } from "three";



const CustomGeometryParticles = (props) => {
    const { count } = props;
    const radius = 2;
    // direct access to points through ref
    const points = useRef();
  
    // generating positions attribute array
    const particlesPosition = useMemo(() => {

      const positions = new Float32Array(count * 3)

      for (let i = 0; i < count; i++) {
        // const distance = Math.sqrt((Math.random() - 0.5)) * radius
        const distance = (Math.random() - 0.5) * radius
        const theta = THREE.MathUtils.randFloatSpread(360)
        const phi = THREE.MathUtils.randFloatSpread(360)

        let x = distance * Math.sin(theta) * Math.cos(phi)
        let y = distance * Math.sin(theta) * Math.sin(phi)
        let z = distance * Math.cos(theta)
        positions.set([x, y, z], i * 3)
      }
      return positions
    }, [count])
  
    const uniforms = useMemo(() => ({
      uTime: {
        value: 0.0
      },
      uRadius: {
        value: radius
      }
      // Add any other attributes here
    }), [])
  
    useFrame((state) => {
      const { clock } = state;
  
      // points.current.material.uniforms.uTime.value = clock.elapsedTime;
      // points.current.material.uniforms.uRadius.value = clock.elapsedTime * 0.1;
    });
  
    return (
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
        blending={THREE.AdditiveBlending}
          depthWrite={false}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={uniforms}
        />
      </points>
    );
  }

  // function LineSegments({ start, end }) {
  //   const ref = useRef()
  //   // useLayoutEffect(() => {
  //   //   ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
  //   // }, [start, end])
  //   return (
  //     <lineSegments ref={ref} >
  //       <bufferGeometry />
  //       <lineBasicMaterial color="hotpink" />
  //     </lineSegments>
  //   )
  // }

  

  const Scene = () => {
    

    const material = new THREE.LineBasicMaterial({
      color: 0x0000ff
    });
    
    const points = [];
    points.push( new THREE.Vector3( - 100, 0, 0 ) );
    points.push( new THREE.Vector3( 0, 100, 0 ) );
    points.push( new THREE.Vector3( 100, 0, 0 ) );
    return (
       // <Canvas camera={{ position: [1.5, 1.5, 1.5] }}>
      // <Canvas >
        //  <perspectiveCamera
       
        //   aspect={1200 / 600}
        //   radius={(1200 + 600) / 4}
        //   fov={45}
        //   position={[0, 0, 2]}
        //   onUpdate={self => self.updateProjectionMatrix()}
        // />
        // <ambientLight intensity={0.5} />
        <>
        <CustomGeometryParticles count={4000} /> 
        {/* <OrbitControls /> */}
        </>
    )
      // <line>
      //   <bufferGeometry setFromPoints={points} />
      // </line>
        /* <Line
        points={[[0, 0, 0], [1,2,2]]}       // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
        color="black"                   // Default
        lineWidth={1}                   // In pixels (default)
        segments                        // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
        dashed={false}                  // Default
        vertexColors={[[0, 0, 0]]} // Optional array of RGB values for each point
        // {...lineProps}                  // All THREE.Line2 props are valid */
        /* // {...materialProps}              // All THREE.LineMaterial props are valid */
        /* /> */






        /* <Grid size={10} /> */
        /* <LineSegments start={[[0, 0, 0], [1,0,0]]}  end={[[1, 0, 0], [1,1,1]]} /> */}
      // </Canvas>
  //   );
  // };
  
  export default Scene