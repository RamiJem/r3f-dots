import { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Line from './components/Line'
import { OrbitControls } from "@react-three/drei";
import Points from './components/InstancedPoints'
import  XYPlane  from './components/XYPlane'
import { randomNormal3D } from './Helpers/Data'


const initialData = randomNormal3D(6000, [1,1, 1]).concat(randomNormal3D(6000, [-1,-1,-1]))

export default function App() {
  const num = 200
  const steps = [...Array(num*2).keys()].map(n => n - num)
  const [data, setData] = useState(initialData)

  return (
    <>
    <Canvas camera={{fov:50, position:[-6, 6, 30], focus:90}} >

      <OrbitControls target={[-7, 0, 0]} enableZoom={false}/>
      <ambientLight intensity={1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

      <fog attach="fog" args={['#fff8e7', 50, 100]} />
      
      <XYPlane steps={steps} num={num} />

      {/* Bold X-line */}
      <Line start={[-num, 0, 0]} end={[num, 0, 0]} color="black" />
      {/* Bold Y-line */}
      <Line start={[0,-num, 0]} end={[0, num, 0]} color="black" />
      {/* Bold Z-Line */}
      <Line start={[0, 0, -num]} end={[0, 0, num]} color="black" />

      <Points data={data}/>
     
    </Canvas>
   
    <div className="flex flex-col absolute top-0 left-20 w-1/3  gap-12 py-12 ">
      <div className="bg-white border border-slate-500 p-4 rounded ">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        <button onClick={() => setData(data.map((datum) => ({...datum, targetX: 0, targetY: datum.y, targetZ: datum.z})))}>x</button>
      </div >
      <div className="bg-white border border-slate-500 p-4 rounded">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        <button onClick={() => setData(data.map((datum) => ({...datum, targetX: datum.x, targetY: 0, targetZ: datum.z})))}>y</button>
      </div>
      <div className="bg-white border border-slate-500 p-4 rounded">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        <button onClick={() => setData(data.map((datum) => ({...datum, targetX: datum.x, targetY: datum.y, targetZ: 0})))}>z</button>
      </div>
      <div className="bg-white border border-slate-500 p-4 rounded">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        <button onClick={() => setData(data.map((datum, i) => ({...datum, targetX: initialData[i].x, targetY: initialData[i].y, targetZ: initialData[i].z })))}>original</button> 
      </div >
    </div>
    </>
  )
}

