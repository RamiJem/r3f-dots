

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import '../../scene.css';
import { randomNormal } from 'd3-random'
import { useSpring } from "react-spring";

const scratchObject3D = new THREE.Object3D();


function useSourceTargetLayout({data}) {

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

  useSourceTargetLayout({data})

  const prevLayout = useRef(data)

  useSpring({
    from: {done: 0},
    to: {done: 1},
    reset: data !== prevLayout.current,
    onChange: (result) => {
      interpolateSourceTarget(data, result.value.done);
      onFrame(data, result.value.done)
    }
  })

  prevLayout.current = data
}

const InstancedPoints = (props) => {
  const { data } = props;
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

 
  return (
    <>
          <instancedMesh 
            ref={meshRef} 
            args={[null, null, numPoints]}
            frustumCulled={false}>
              <sphereGeometry
                attach="geometry"
                args={[0.05, 20, 20]} />
              <meshStandardMaterial 
                attach="material" 
                transparent={true}
                opacity= {0.4}
                />
          </instancedMesh>
       
    </>
        )
  }
    


export default InstancedPoints;