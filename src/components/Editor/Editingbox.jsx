import React, { useState, useCallback } from "react";
// import axios from "axios";
// import { API } from "../../config";
// import { useNavigate } from 'react-router-dom';
import 'reactflow/dist/style.css';
import ReactFlow, { 
    useNodesState, 
    useEdgesState, 
    addEdge,
    Controls,
    Background,
    MiniMap,
    NodeToolbar,
} from 'reactflow';


const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: '공사 초기' } },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '공사 중기' } },
    { id: '3', position: { x: 0, y: 200 }, data: { label: '공사 말기' } },
  ];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' },
                      { id: 'e2-3', source: '2', target: '3' }];

const Editingbox = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);


    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow 
                nodes={nodes} 
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
            >
                <Controls/>
                <MiniMap/>
                <NodeToolbar />
                <Background variant="dots" gap={12} size={1} />

            </ReactFlow>
        </div>
      );
}

export default Editingbox;