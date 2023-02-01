import { useState, useLayoutEffect, useRef } from 'react'
import VertexSphere from './components/VertexSphere'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import Line from './components/Line'
import { OrbitControls } from "@react-three/drei";
import Points from './components/InstancedPoints'
import { Camera } from 'three'
import { randomNormal } from 'd3-random'

// function Line({ start, end }) {
//   const ref = useRef()
//   useLayoutEffect(() => {
//     ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
//   }, [start, end])
//   return (
//     <line ref={ref}>
//       <bufferGeometry />
//       <lineBasicMaterial color="hotpink" />
//     </line>
//   )
// }

const dataArray = new Array(1000).fill(0).map((d, id) => {
  const x = Math.max(0, randomNormal(6, 1.5)())
  const y = Math.max(0, randomNormal(4, 1.5)())
  return { id, 
          x, y, z: 0, 
          sourceX: x, sourceY: y, sourceZ: 0, 
          targetX: x, targetY: y, targetZ: 0 }
})

const dataArray2 = new Array(1000).fill(0).map((d, id) => {
  const x = Math.min(0, randomNormal(-6, 1.5)())
  const y = Math.min(0, randomNormal(-4, 1.5)())
  return { id, 
          x, y, z: 0, 
          sourceX: x, sourceY: y, sourceZ: 0, 
          targetX: x, targetY: y, targetZ: 0 }
})

export default function App() {
  const steps = [...Array(40).keys()].map(n => n - 20)


  
  const originalData = dataArray2.concat(dataArray)
  const [data, setData] = useState(originalData)

  

  // console.log("firster", data)
  // useState(() => {
  //   console.log("checking id need to be filed")
  //   if(!data) {
  //     console.log("coming to fill data")
  //     setData(new Array(3).fill(0).map((d, id) => ({ id, x: id, y: id, z: 0 })))
  //   }
  // }, [])
 

  const clicky = (e) => {
    // console.log("coming here")
    setData(data.map((datum) => ({...datum, targetX: datum.x, targetY: 0, targetZ: datum.z})))
  }

  return (
    <>
    <Canvas camera={{fov:50, position:[0, 0, 15]}}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
    
      {steps.map((step, id) => <Line key={`x${id}`} start={[-20, step, 0]} end={[20, step, 0]} color="grey"/>)} 
      {steps.map((step, id) => <Line key={`y${id}`} start={[step, -20, 0]} end={[step, 20, 0]} color="grey"/>)}
      {/* Bold X-line*/}
      <Line start={[-20, 0, 0]} end={[20, 0, 0]} color="black" />
      {/* Bold Y-line */}
      <Line start={[0,-20, 0]} end={[0, 20, 0]} color="black" />
      {/* <VertexSphere /> */}
      <Points data={data}/>
      {/* <OrbitControls /> */}
    </Canvas>
    {console.log(originalData[0].x)}
    <button style={{zIndex:100, position: "absolute", top: 0}} onClick={() => setData(data.map((datum) => ({...datum, targetX: datum.x, targetY: 0, targetZ: datum.z})))}>hi</button>
    <button style={{zIndex:100, position: "absolute", top: 0 , left: "100px"}} onClick={() => setData(data.map((datum, i) => ({...datum, targetX: originalData[i].x, targetY: originalData[i].y, targetZ: originalData[i].z })))}>hey</button>
    </>
    
  )
}
// export default function App() {
//   return <VertexSphere />
  
// }

