// import style sheets
import 'reactflow/dist/style.css';
import './text-updater-node.css';
import './index.css';
// import Node Types
import TextUpdaterNode from './TextUpdaterNode.js';
import PictureNode from './PictureNode.js';
import PictureNode2 from './PictureNode2.js';
import PictureNode3 from './PictureNode3.js';

// import Component
import Modal from './Modal';

// 🍀 WebRTC setting
import useNodesStateSynced, { nodesMap } from './useNodesStateSynced';
import useEdgesStateSynced from './useEdgesStateSynced';

// import React 
import React, { useEffect, useState, useRef , useCallback } from 'react';
import Picturebar from './Picturebar';


// import React Flow 
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Panel,
  Controls,
  MiniMap,
  NodeToolbar,
} from 'reactflow';

// import axios connection
import axios from "axios";

// import zustand
import {create} from 'zustand';

// define the store
export const useStore = create(set => ({
  projectId: null,
  setProjectId: (id) => set({ projectId: id }),
}));

//🐬 웹 알티시 테스팅
const proOptions = {
  account: 'paid-pro',
  hideAttribution: true,
};

const flowKey = 'example-flow';
const nodeTypes = {textUpdater: TextUpdaterNode, 
                  pix: PictureNode,
                }

// 적어도 100개는 만들지 않을거 아니야 ~ 
let id = 100; 
const getNodeId = () => `${id++}`;
const fitViewOptions = {
   padding: 3,
 };
const initialEdges = 
[
  { id: 'e1-2', source: '1', target: '2' }, 
];

//////////////////
const Editingbox2 = () => {
   
  const reactFlowWrapper = useRef(null); // 큰 react flow wrapper
  const connectingNodeId = useRef(null); // 연결 노드
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // 🍁 모달창에서 새로운 프로젝트 만들면 Id를 가지고 있기, 프로젝트 아이디를 만들기
  const {projectId} = useStore();

  // 🌼 기존 세팅
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const { project, setViewport } = useReactFlow();

  const [rfInstance, setRfInstance] = useState(null);
  

  //🍀 webrtc 세팅
  const [nodes, onNodesChange] = useNodesStateSynced();
  const [edges, onEdgesChange, onConnect] = useEdgesStateSynced();

  // 🌼 기존 세팅: 엣지 새로 생성
  // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // 🌼 기존 세팅: 노드끌어서 생성, 첫 시작
  //   const onConnectStart = useCallback((_, {nodeId}) => {
  //    connectingNodeId.current = nodeId;
  // }, []);

  // 🍀🌼 기존에 드래그와 동일, 근데 기존은 그냥 컴포넌트 밖에다 세팅이 되어있음
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      //🐤 여기서 아무래도 current 세팅을 해주는 것 같은 데 확인 해봐야할 것 같음
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      
      // Drag을 통한 이벤트 생성
      const type = event.dataTransfer.getData('application/reactflow');
      const img = event.dataTransfer.getData('data/imageurl');
      console.log('🌲Getting type ', type); // 🍎 drag start에서 가져온 type
      console.log('🌲Getting image ', img); // 🍎 drag start에서 가져온 image 

      //🥰 타입 확인 하기: 굳이 ? 
      if (typeof type === 'undefined' || !type) {
        return;
      }

      //🌸 position 확인하기 새로 떨어뜨, react flow의 인스턴스를 사용
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: getNodeId(),
        type,
        position,
        data: { label: `${type} node` , url: `${img}`},
      };
      //🌼 webrtc 전에 있는 코드, 개인 편집
      // setNodes((nds) => nds.concat(newNode)); 
      nodesMap.set(newNode.id, newNode);
    },
    //🌼 webrtc 전에 있는 코드, 개인 편집
    // [reactFlowInstance]
  );


const [nodeName, setNodeName] = useState("Node 1");

//🔥 Adding Node! --> nodeId not set yet!
const onConnectEnd = useCallback(
   (event) => {
       const targetIsPane = event.target.classList.contains('react-flow__pane');
       
       if (targetIsPane){
           const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
           const id = getNodeId();
           const newNode = {
               id,
               // we are removing the half of the node width (75) to center the new node
               position: project({ x: event.clientX - left - 75, y: event.clientY - top }),
               // type: 'textUpdater',
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
  
  
  // Connet, Save and restore adding
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      console.log(JSON.stringify(flow));
      console.log('flow: ', flow);
      // console.log(type(flow.nodes));
      console.log('only node data: ', flow.nodes);
      console.log('only edge data: ', flow.edges);
    }
  }, [rfInstance]);

  const onFullSave = useCallback(() => {
   if (rfInstance) {
     const flow = rfInstance.toObject();
     localStorage.setItem(flowKey, JSON.stringify(flow));
     console.log(JSON.stringify(flow));
     console.log('flow: ', flow);
     // const send_flow = JSON.parse(JSON.stringify(flow));
     console.log('only node data: ', flow.nodes);
     console.log('only edge data: ', flow.edges);
     // console.log(localStorage)
     console.log('sending: ', {'nodes': flow.nodes})

     axios.post(`http://localhost:4000/nodes/${projectId}`, {
        "nodes": flow.nodes
     }).then((res , err) => {
        if (res.status === 200) {
           console.log('nodes saved');
        }
        else (console.log(err))
    });
    axios.post(`http://localhost:4000/edges/${projectId}`, {
     "edges": flow.edges
     }).then((res , err) => {
     if (res.status === 200) {
        console.log('edges saved');
     }
     else (console.log(err))
     });

   }
 }, [rfInstance]);



  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: 'Added node' },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  useEffect(() => {
   setNodes((nds) =>
     nds.map((node) => {
       if (node.selected === true) {
         // it's important that you create a new object here
         // in order to notify react flow about the change
         node.data = {
           ...node.data,
           label: nodeName
         };
       }

       return node;
     })
   );
 }, [nodeName, setNodes]);

  return (
    <>
    <div className= "wrapper" ref={reactFlowWrapper} style={{ height: '100vh'}}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      onInit={setReactFlowInstance}
      onDrop={onDrop}
      onDragOver={onDragOver}
      proOptions={proOptions}
      nodeTypes={nodeTypes}
      style= {{background : '#F3B0C3', position:'relative'}} // Mint!
      // style= {{background : '#00008B'}} //
      // onInit={setRfInstance}
      fitView
      fitViewOptions={fitViewOptions}>
      <Controls position='top-left'/>
      <MiniMap pannable position='bottom-left'/>

    </ReactFlow>
    </div>
    <Picturebar/>
    <MenuBarR style={{ position: 'absolute', zIndex: 2147483647 }} />
    </>
  );
};

export default () => (
  <>
  {/* <Modal/> */}
  <ReactFlowProvider>
    <Editingbox2 />
  </ReactFlowProvider>
  </>
);
