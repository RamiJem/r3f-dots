

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import '../../scene.css';
import { randomNormal } from 'd3-random'
import { useSpring } from "react-spring";

const scratchObject3D = new THREE.Object3D();


function useSourceTargetLayout({data}) {
  // console.log("data15 ", data)
  useEffect(() => {
    for (let i = 0; i < data.length; ++i) {

      data[i].sourceX = data[i].x
      data[i].sourceY = data[i].y
      data[i].sourceZ = data[i].z
    }
  }, [data])
}

function interpolateSourceTarget(data, progress) {
 
  // if(data[0].targetX && data[0].sourceX){
    // console.log("coming here too")
    for (let i=0; i<data.length; ++i) {
     
      data[i].x = (1-progress) * data[i].sourceX + progress * data[i].targetX

      data[i].y = (1-progress) * data[i].sourceY + progress*data[i].targetY
      data[i].z = (1-progress) * data[i].sourceZ + progress*data[i].targetZ
    }
  // }
}

function updateInstancedMeshMatrices({ mesh, data }) {
  if(!mesh) return;

  const color = new THREE.Color();
  const numPoints = data.length
  for (let i= 0; i < numPoints; i++) {
    const {x, y, z} = data[i];
    scratchObject3D.position.set(x, y,z)
    scratchObject3D.updateMatrix();
    mesh.setMatrixAt(i, scratchObject3D.matrix);
    if (i < numPoints/2) {
     
      mesh.setColorAt(i, new THREE.Color( 0xD2042D ));
    }
    else {
  
      mesh.setColorAt(i, new THREE.Color( 0x0047AB ));
    }
  }
  mesh.instanceMatrix.needsUpdate = true;
  mesh.instanceColor.needsUpdate = true;
}

function useAnimatedLayout({ data, onFrame}) {
  // console.log("before 47: ", data)
  useSourceTargetLayout({data})
  // console.log("after 47: ", data)
  // const prevLayout = useRef(layout)

  const prevLayout = useRef(data)
  // console.log("59")
  const springs = useSpring({
    from: {done: 0},
    to: {done: 1},
    // reset: layout !== prevLayout.current,
    reset: data !== prevLayout.current,
    onChange: (result) => {
    //   // interpolate based on progress
      // console.log("res: ", result.value)
      
      // console.log("data in update: ", data[1])
      interpolateSourceTarget(data, result.value.done);
      onFrame(data, result.value.done)
    //   //Callback to indicate data has updated
    //   // console.log({animationProgress})
    //   // on
    }
  })

  prevLayout.current = data
  // prevLayout.current = layout
}

const InstancedPoints = (props) => {
  const { count, data } = props;
  const meshRef = useRef()
  const numPoints = data.length


  useAnimatedLayout({
    data,
    onFrame: () => {
      updateInstancedMeshMatrices( {mesh: meshRef.current, data})
    }
  })


 
  useEffect(() => {
    const mesh = meshRef.current;
    for (let i = 0; i< numPoints; ++i) {
      const {x, y, z } = data[i]
      scratchObject3D.position.set(x, y,z)
      scratchObject3D.updateMatrix();
      mesh.setMatrixAt(i, scratchObject3D.matrix);
      if (i < numPoints/2) {
     
        mesh.setColorAt(i, new THREE.Color( 0x800020 ));
      }
      else {
    
        mesh.setColorAt(i, new THREE.Color( 0x0047AB ));
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor.needsUpdate = true;
  },[])
  // },[ data, numPoints])

  // This reference gives us direct access to our points
  // const points = useRef();

  //   for (let i = 0; i < count; i++) {
  //   const theta = THREE.MathUtils.randFloatSpread(360); 
  //   const phi = THREE.MathUtils.randFloatSpread(360); 

  //   // let x = distance * Math.sin(theta) * Math.cos(phi)
  
  //   let x = Math.max(0, randomNormal(4.5, 1.5)())
  //   console.log('x is : ', x)
  //   let y = Math.max(0, randomNormal(4.5, 1.5)())
  //   let z = 0
  //   // let z = distance * Math.cos(theta);

  //   positions.set([x, y, z], i * 3);
  //   }
  //   // }

  //   return positions;
  // }, [count, shape]);

 
  return (
    <>
          <instancedMesh 
            ref={meshRef} 
            args={[null, null, numPoints]}
            frustumCulled={false}>
              <sphereGeometry
                attach="geometry"
                args={[0.05, 20, 20]} />
              {/* <circleGeometry 
                attach="geometry" 
                args ={[0.1, 15]} /> */}
              <meshStandardMaterial 
                attach="material" 
                transparent={true}
                opacity= {0.4}
                // color="black" />
                />
          </instancedMesh>
       
    </>
        )
  }
    
  
    // <points ref={points}>
    //   <bufferGeometry>
    //     <bufferAttribute
    //       attach="attributes-position"
    //       count={particlesPosition.length / 3}
    //       array={particlesPosition}
    //       itemSize={3}
    //     />
    //   </bufferGeometry>
    //   <pointsMaterial size={0.1} color="#5786F5" sizeAttenuation depthWrite={false} />
    // </points>
  // );
// };

const Scene = ({data}) => {
  // console.log("first data: ", data)
  
  return (
   
      // <mesh position={[0, 0, 0]} rotation={[Math.PI*0.5, 0, 0]} >
      //   <cylinderBufferGeometry attach="geometry" args ={[0.5, 0.5, 0.15, 32]} />
      //   <meshStandardMaterial attach="material" color="fff" />
      // </mesh>
      // <CustomGeometryParticles count={1000} shape="sphere"/>
    <InstancedPoints data={data}/>

  );
};


export default Scene;