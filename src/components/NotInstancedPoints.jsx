import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { data } from "autoprefixer";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import '../../scene.css';
import { useSpring } from "react-spring";


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

function interpolateSourceTarget(data, progress, particlesPosition, points) {
    // if(data[0].targetX && data[0].sourceX){
      // console.log("coming here too")
      for (let i=0; i<data.length; ++i) {
        data[i].x = (1-progress) * data[i].sourceX + progress * data[i].targetX
        data[i].y = (1-progress) * data[i].sourceY + progress*data[i].targetY
        data[i].z = (1-progress) * data[i].sourceZ + progress*data[i].targetZ

        particlesPosition.set([data[i].x, data[i].y, data[i].z], i * 3);
        points.current.geometry.attributes.position.needsUpdate = true;
      }
    // }
  }

  function useAnimatedLayout({ data, particlesPosition, points}) {
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
        
        console.log("hi")
        // console.log("data in update: ", data[1])
        interpolateSourceTarget(data, result.value.done, particlesPosition, points);
        console.log(data[0].x, data[0].y, data[0].z)
        // onFrame(data, result.value.done)
      //   //Callback to indicate data has updated
      //   // console.log({animationProgress})
      //   // on
      }
    })
  
    prevLayout.current = data
    // prevLayout.current = layout
  }

const CustomGeometryParticles = ({data}) => {


   

    
    // This reference gives us direct access to our points
    const points = useRef();

    const particlesPosition = new Float32Array(data.length*3);
    for (let i = 0; i < data.length; i++) {
            let x = data[i].x
            let y = data[i].y
            let z = data[i].z
            particlesPosition.set([x, y, z], i * 3);
    }

    useAnimatedLayout({
        data, 
        particlesPosition,
        points
      })

    useEffect(()=> {
        console.log("should be resetting:c," , data)
        for (let i = 0; i < data.length; i++) {
            let x = data[i].x
            let y = data[i].y
            let z = data[i].z
            particlesPosition.set([x, y, z], i * 3);
    }
    points.current.geometry.attributes.position.needsUpdate = true;
    }, [data])
    //   const particlesPosition = useMemo(() => {
    //     console.log("getting called")
    //     const positions = new Float32Array(data.length*3);
    //     for (let i = 0; i < data.length; i++) {
    //       let x = data[i].x
    //       let y = data[i].y
    //       let z = data[i].z
    //       positions.set([x, y, z], i * 3);
    //     }
    
    //     return positions;
    //   }, [data]);
    //  console.log(particlesPosition)

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
        <pointsMaterial size={0.3} color="#5786F5" sizeAttenuation depthWrite={false} />
        </points>
    );
};

const Scene = ({data}) => {
    return (
        <CustomGeometryParticles data={data} />
    );
};


export default Scene;