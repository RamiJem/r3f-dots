import { useState, useLayoutEffect, useRef } from 'react'
import VertexSphere from './components/VertexSphere'
import { Canvas, useThree } from '@react-three/fiber'
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

// const SetupComponent = ({x, y, z}) => {
//   // "Hook into" camera and set the lookAt position
//   const { camera } = useThree();
//   camera.lookAt(x, y, z);
  
//   // Return an empty fragment
//   return <></>;
// }

const dataArray = new Array(3000).fill(0).map((d, id) => {
  const x = Math.max(0, randomNormal(5, 2)())
  const y = Math.max(0, randomNormal(5, 2)())
  const z = Math.max(0, randomNormal(4, 1.5)())
  return { id, 
          x, y, z, 
          sourceX: x, sourceY: y, sourceZ: z, 
          targetX: x, targetY: y, targetZ: z }
})

const dataArray2 = new Array(3000).fill(0).map((d, id) => {
  const x = Math.min(0, randomNormal(-5, 2.5)())
  const y = Math.min(0, randomNormal(-5, 2.5)())
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

  const cameraRef = useRef()

 

  return (
    <>
    {/* <div className="relative"> */}
     {/* <div className="h-full "> */}
    <Canvas camera={{fov:50, position:[-6, 6, 30], focus:90}} >
      {/* Moving the camera to point at -6, 0, 0*/ }
      {/* <SetupComponent x={-6} y={0} z={0} /> */}
      <OrbitControls target={[-7, 0, 0]} enableZoom={false}/>
      <fog attach="fog" args={['#fff8e7', 50, 100]} />
      
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <XYPlane steps={steps} num={num} />

      {/* Bold X-line */}
      <Line start={[-num, 0, 0]} end={[num, 0, 0]} color="black" />
      {/* Bold Y-line */}
      <Line start={[0,-num, 0]} end={[0, num, 0]} color="black" />
      <Line start={[0, 0, -num]} end={[0, 0, num]} color="black" />
      {/* <VertexSphere /> */}
      <Points data={data}/>
      {/* <NotInstancedPoints data={data}/> */}
      
    </Canvas>
    

    <div className="absolute top-8 w-2/5 h-full m-2">
      <div className="flex flex-col z-50 absolute  left-16   gap-4 m-0">
        <div className="bg-white border border-slate-500 p-4 rounded">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        
        <button onClick={() => setData(data.map((datum) => ({...datum, targetX: 0, targetY: datum.y, targetZ: datum.z})))}>x</button>
        </div >
        <div className="bg-white border border-slate-500 p-4 rounded">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        <button onClick={() => setData(data.map((datum) => ({...datum, targetX: datum.x, targetY: 0, targetZ: datum.z})))}>y</button>
        </div>
        <div className="bg-white border border-slate-500 p-4 rounded">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div className="bg-white border border-slate-500 p-4 rounded">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div >
     
      </div>
    </div>
    {/* <button style={{zIndex:10, position: "absolute", top: 0, }} onClick={() => setData(data.map((datum) => ({...datum, targetX: 0, targetY: datum.y, targetZ: datum.z})))}>x</button>
    <button style={{zIndex:10, position: "absolute", top: 0, right: "70px"}} onClick={() => setData(data.map((datum) => ({...datum, targetX: datum.x, targetY: 0, targetZ: datum.z})))}>y</button>
    <button style={{zIndex:10, position: "absolute", top: 0, right: "140px"}} onClick={() => setData(data.map((datum) => ({...datum, targetX: datum.x, targetY: datum.y, targetZ: 0})))}>z</button>
    <button style={{zIndex:10, position: "absolute", top: 0 , right: "210px"}} onClick={() => setData(data.map((datum, i) => ({...datum, targetX: originalData[i].x, targetY: originalData[i].y, targetZ: originalData[i].z })))}>original</button> */}
     {/* </div> */}
    </>
  )
}

