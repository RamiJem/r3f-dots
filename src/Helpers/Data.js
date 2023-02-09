import { randomNormal } from 'd3-random'


const randomNormal3D = (points, quadrant, mu=5, std=2) => {

    return new Array(points).fill(0).map((d, id) => {
        const x = quadrant[0] * Math.max(0, randomNormal(mu, std)())
        const y = quadrant[1] * Math.max(0, randomNormal(mu, std)())
        const z = quadrant[2] * Math.max(0, randomNormal(mu, std)())
        return { id, 
                x, y, z, 
                sourceX: x, sourceY: y, sourceZ: z, 
                targetX: x, targetY: y, targetZ: z }
        })
}


export { randomNormal3D }