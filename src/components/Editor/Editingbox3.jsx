import React, { useState, useCallback, useRef, useEffect} from "react";
import 'reactflow/dist/style.css';
import ReactFlow, { ReactFlowProvider } from 'reactflow';

const initialNodes = [
    {
        id: '1',
        // type: 'input',
        data: { label: 'Input Node' },
        position: { x: 250, y: 25 },
      },
    
      {
        id: '2',
        // you can also pass a React component as a label
        data: { label: 'Default Node' },
        position: { x: 100, y: 125 },
      }
]

const initialEdges = [
    { id: 'e1-2', sorce: '1', target: '2' }
]

const Flow = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    return 
    (   <>
        <ReactFlow style={{width: '50vw', height: '50vw'}}
            nodes = {nodes}
            edges = {edges} 
            fitView
            />
        </>
    )
}
export default () => (
    <ReactFlowProvider>
        <Flow/>
    </ReactFlowProvider>
)