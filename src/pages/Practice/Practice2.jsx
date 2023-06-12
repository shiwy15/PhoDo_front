import { useQuery } from "react-query"; 
import axios from 'axios';

const fetchNodes = () => {
    return axios.get('http://localhost:4000/nodes')
}


function Practicepage2() {
    const {isLoading, data} = useQuery('nodes', fetchNodes)
    console.log('Yalla: ', data);//🥦 먼저 등록되는 것은 아니다! 먼저 data rendering을 하게 된다
    
    
    return (
        <>
        <h2>Node page2</h2>    
        {data?.data.map((nodes) => {
                return <div key={nodes.id}> {nodes.data.label} </div>
        })}
        </>
    )
}

export default Practicepage2;