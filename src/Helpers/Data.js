import { randomNormal } from 'd3-random'


const randomNormal3D = (points, quadrant) => {

    return new Array(points).fill(0).map((d, id) => {
        const x = quadrant[0] * Math.max(0, randomNormal(5, 2)())
        const y = quadrant[1] * Math.max(0, randomNormal(5, 2)())
        const z = quadrant[2] * Math.max(0, randomNormal(4, 1.5)())
        return { id, 
                x, y, z, 
                sourceX: x, sourceY: y, sourceZ: z, 
                targetX: x, targetY: y, targetZ: z }
        })
}


export { randomNormal3D }