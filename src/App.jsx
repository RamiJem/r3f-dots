import { useState, useLayoutEffect, useRef } from 'react'
import VertexSphere from './components/VertexSphere'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import Line from './components/Line'
import { OrbitControls } from "@react-three/drei";
import Points from './components/InstancedPoints'
import { Camera } from 'three'
import { randomNormal } from 'd3-random'
import  XYPlane  from './components/XYPlane'
import { DepthOfField, EffectComposer } from '@react-three/postprocessing'
import JigglySphere from './components/JigglySphere'
import NotInstancedPoints from './components/NotInstancedPoints'


const dataArray = new Array(300).fill(0).map((d, id) => {
  const x = Math.max(0, randomNormal(8, 2)())
  const y = Math.max(0, randomNormal(6, 2)())
  const z = Math.max(0, randomNormal(4, 1.5)())
  return { id, 
          x, y, z, 
          sourceX: x, sourceY: y, sourceZ: z, 
          targetX: x, targetY: y, targetZ: z }
})

const dataArray2 = new Array(300).fill(0).map((d, id) => {
  const x = Math.min(0, randomNormal(-8, 2.5)())
  const y = Math.min(0, randomNormal(-6, 2.5)())
  const z = Math.min(0, randomNormal(-4, 2)())
  return { id, 
          x, y, z, 
          sourceX: x, sourceY: y, sourceZ: z, 
          targetX: x, targetY: y, targetZ: z }
})

export default function App() {
  const num = 200
  const steps = [...Array(num*2).keys()].map(n => n - num)
  
  const originalData = dataArray2.concat(dataArray)
  const [data, setData] = useState(originalData)

  return (
    <>
    <Canvas camera={{fov:50, position:[0, 0, 15], focus:90}} style={{left: "5opx"}}>
    <fog attach="fog" args={['#fff8e7', 50, 100]} />
      
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <XYPlane steps={steps} num={num} />

      {/* Bold X-line */}
      <Line start={[-num, 0, 0]} end={[num, 0, 0]} color="black" />
      {/* Bold Y-line */}
      <Line start={[0,-num, 0]} end={[0, num, 0]} color="black" />
      {/* <VertexSphere /> */}
      {/* <Points data={data}/> */}
      <NotInstancedPoints data={data}/>
      <OrbitControls />
    </Canvas>
    <button style={{zIndex:100, position: "absolute", top: 0, }} onClick={() => setData(data.map((datum) => ({...datum, targetX: 0, targetY: datum.y, targetZ: datum.z})))}>x</button>
    <button style={{zIndex:100, position: "absolute", top: 0, left: "70px"}} onClick={() => setData(data.map((datum) => ({...datum, targetX: datum.x, targetY: 0, targetZ: datum.z})))}>y</button>
    <button style={{zIndex:100, position: "absolute", top: 0, left: "140px"}} onClick={() => setData(data.map((datum) => ({...datum, targetX: datum.x, targetY: datum.y, targetZ: 0})))}>z</button>
    <button style={{zIndex:100, position: "absolute", top: 0 , left: "210px"}} onClick={() => setData(data.map((datum, i) => ({...datum, targetX: originalData[i].x, targetY: originalData[i].y, targetZ: originalData[i].z })))}>original</button>
    </>
    
  )
}

