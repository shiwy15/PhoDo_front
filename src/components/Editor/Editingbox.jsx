import React, { useState, useCallback, useRef } from "react";
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
    // @For adding node on edge drop
    useReactFlow,
    ReactFlowProvider
} from 'reactflow';


const initialNodes = [
    { id: '1', position: { x: 400, y: 200 }, data: { label: '공사 초기' } },
    { id: '2', position: { x: 400, y: 400 }, data: { label: '공사 중기' } },
    { id: '3', position: { x: 400, y: 600 }, data: { label: '공사 말기' } },
  ];

//🔥 Setting for node id
let id = 4;
const getId = () => `${id++}`;


const initialEdges = [{ id: 'e1-2', source: '1', target: '2' },
                      { id: 'e2-3', source: '2', target: '3' }];

const Editingbox = () => {
    //🔥 Adding Node!
    const reactFlowWrapper = useRef(null);
    const connectingNodeId = useRef(null);
    //🍀 first setting!
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    //🔥 Adding Node!
    const { project } = useReactFlow();
    //🍀 first setting!
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    //🔥 Adding Node! --> nodeId not set yet!
    const onConnectStart = useCallback((_, {nodeId}) => {
        connectingNodeId.current = nodeId;
    }, []);

    const onConnectEnd = useCallback(
        (event) => {
            const targetIsPane = event.target.classList.contains('react-flow__pane');
            
            if (targetIsPane){
                const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
                const id = getId();
                const newNode = {
                    id,
                    // we are removing the half of the node width (75) to center the new node
                    position: project({ x: event.clientX - left - 75, y: event.clientY - top }),
                    data: { label: `새로운 노드 ${id}`  },
                  };

                setNodes((nds) => nds.concat(newNode));
                setEdges((eds) => eds.concat({id, source: connectingNodeId.current, target: id}));
            }
        },
        [project]
    );

    return (
        <div className= "wrapper" ref={reactFlowWrapper} style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow 
                nodes={nodes} 
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
                // fitView
            >
                {/* <Controls/> */}
                {/* <MiniMap/> */}
                {/* <NodeToolbar /> */}
                <Background variant="dots" gap={12} size={1} />

            </ReactFlow>
        </div>
      );
}

// export default Editingbox;
export default () => (
    <ReactFlowProvider>
        <Editingbox/>
    </ReactFlowProvider>
);