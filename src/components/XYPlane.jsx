import Line from './Line'

const XYPlane = ( {steps, num}  ) => {
    return (
        <> 
            {steps.map((step, id) => <Line key={`x${id}`} start={[-num, step, 0]} end={[num, step, 0]} color="grey"/>)} 
            {steps.map((step, id) => <Line key={`y${id}`} start={[step, -num, 0]} end={[step, num, 0]} color="grey"/>)}   
        </>
        
    )
}

export default XYPlane;