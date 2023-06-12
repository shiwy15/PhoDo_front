import { useState, useEffect, useSyncExternalStore, useDebugValue } from "react";
import axios from 'axios';

function Practicepage() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect( () => {
        axios.get('http://localhost:4000/nodes').then((res) => {
            setData(res.data)
            setIsLoading(false)
        })
    }, [])

    if (isLoading){
        return <h2>Loading...</h2>
    }
    return (
        <>
        <h2>Node page</h2>
        {data.map((nodes) => 
        {
            return <div key={nodes.id}>{nodes.data.label}</div>
        })}
        </>
    )
}

export default Practicepage;