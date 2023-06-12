import React, { useState, useCallback, useRef, useEffect} from "react";
import 'reactflow/dist/style.css';
import TextUpdaterNode from './TextUpdaterNode.js';

import './text-updater-node.css';

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
    ReactFlowProvider,
    // @For changing node name
    applyNodeChanges,
    applyEdgeChanges
} from 'reactflow';


const initialNodes = [
    { id: '1', type: 'textUpdater', position: { x: 400, y: 200 }, data: { label: '공사 초기' } },
    { id: '2', type: 'textUpdater', position: { x: 400, y: 400 }, data: { label: '공사 중기' } },
    { id: '3', type: 'textUpdater', position: { x: 400, y: 600 }, data: { label: '공사 말기' } },
  ];

const nodeTypes = {textUpdater: TextUpdaterNode}


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
    const [nodes, setNodes] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    //🔥 Adding Node!
    const { project } = useReactFlow();
    //🍀 first setting!
    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
      );

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    //🌸 changing node name! 
    const [nodeName, setNodeName] = useState('node name');
    const [selectedNode, setSelectedNode] = useState(null);
    
    //🔥 Adding Node! --> nodeId not set yet!
    const onConnectStart = useCallback((_, {nodeId}) => {
        connectingNodeId.current = nodeId;
    }, []);


    //🔥 Adding Node! --> nodeId not set yet!
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
                    type: 'textUpdater',
                    data: { label: `새로운 노드 ${id}`  },
                  };
                setNodes((nds) => nds.concat(newNode));
                console.log(nodes);
                setEdges((eds) => eds.concat({id: `e${connectingNodeId.current}-${id}`, source: connectingNodeId.current, target: id}));
                console.log(initialNodes)
            }
        },
        [project]
    );

    return (
        <div className= "wrapper" ref={reactFlowWrapper} style={{ width: '100vw', height: '100vh' }}>
            <div style={{ position: 'absolute', right: 0, top: 0, margin: '1rem', zIndex: 1000 }}>
                <label hidden="large-input" 
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> 라벨링 고치기
                </label>
                <input type="text" id="large-input" 
                class="block w-full p-4 text-gray-900 border border-purple-700 rounded-lg bg-gray-50 sm:text-md focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                value={nodeName} onChange={(e) => setNodeName(e.target.value)}>
                </input>
                <button>
                    hello
                </button>
            </div>

            <ReactFlow 
                nodes={nodes} 
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
                nodeTypes={nodeTypes}
            >
                <Controls/>
                <MiniMap/>
                <NodeToolbar />
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