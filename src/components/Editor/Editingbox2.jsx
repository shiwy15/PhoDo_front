// import style sheets
import 'reactflow/dist/style.css';

import './index.css';
// import Node Types
import TextNode from './Node/TextNode';
import PictureNode from './Node/PictureNode.js';

// 🍀 WebRTC setting
import useNodesStateSynced from '../../hooks/useNodesStateSynced';
import useEdgesStateSynced from '../../hooks/useEdgesStateSynced';

// import React 
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Sidebar from '../Editor/SideBar/Sidebar';
import MenuBarR from "../../components/Editor/MenuBarR";
import VoiceBar from "../../components/Editor/Voice/VoiceBar"

// import React Flow 
import ReactFlow, {
  ReactFlowProvider, useReactFlow, Controls,
  MiniMap} from 'reactflow';

// import zustand
import {create} from 'zustand';
import { Doc } from 'yjs';
import { WebsocketProvider } from 'y-websocket';

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
const ydocs = new Map();

const flowKey = 'example-flow';
const nodeTypes = {TextNode: TextNode, 
                  pix: PictureNode,
                }

// 적어도 100개는 만들지 않을거 아니야 ~ 
let id = 100; 
const getNodeId = () => `${id++}`;
const fitViewOptions = {
   padding: 3,
 };



const getDoc = (room) => {
  if (!ydocs.has(room)) {
    const ydoc = new Doc();
    const wsProviderURL = `wss://phodo.store/ws`;
    console.log('Attempting to connect to server')

    const wsProvider = new WebsocketProvider(
        'wss://phodo.store/ws',
        room,
        ydoc
    );
    
    wsProvider.on('status', event => {
        console.log(event)
        console.log(event.status)
    })

    ydocs.set(room, { ydoc, nodesMap: ydoc.getMap('nodes'), edgesMap: ydoc.getMap('edges') });
}

  return ydocs.get(room);
}


const Editingbox2 = () => {
  const {projectId} = useStore();
  const [nodesMap, setNodesMap] = useState(null);
  const [edgesMap, setEdgesMap] = useState(null);

  useEffect(() => {
    if(projectId) {
      console.log(' 🍀Project Id in Editing Box2: ', projectId);
      const { ydoc, nodesMap, edgesMap } = getDoc(projectId);
      setNodesMap(nodesMap);
      setEdgesMap(edgesMap);
      console.log("ydoc: ", ydoc, "nodesMap: ", nodesMap, "edgesMap: ", edgesMap);
    }
  }, [projectId]);
   
  const reactFlowWrapper = useRef(null); // 큰 react flow wrapper
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  //🍀 webrtc 세팅
  const [nodes, onNodesChange] = useNodesStateSynced();
  const [edges, onEdgesChange, onConnect] = useEdgesStateSynced();
  const { project, setViewport } = useReactFlow();

  // 🍀🌼 기존에 드래그와 동일, 근데 기존은 그냥 컴포넌트 밖에다 세팅이 되어있음
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  //DragStart 후 편집창에 데이터 input하는 부분!
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      //🐤 여기서 아무래도 current 세팅을 해주는 것 같은 데 확인 해봐야할 것 같음
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      
      // Drag을 통한 이벤트 생성
      const type = event.dataTransfer.getData('application/reactflow');
      const img = event.dataTransfer.getData('data/imageurl');
      const tags = event.dataTransfer.getData('data/tags');
      console.log('🌲Getting type ', type); // 🍎 drag start에서 가져온 type
      console.log('🌲Getting image ', img); // 🍎 drag start에서 가져온 image 
      //🥰 타입 확인 하기: 굳이 ? 
      if (typeof type === 'undefined' || !type) {
        return;
      }

      //🌸 position 확인하기 새로 떨어뜨, react flow의 인스턴스를 사용
      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: getNodeId(),
        type,
        position,
        data: { label: `${type}` , url: `${img}`, tags: `${tags}`},
      };

      //🌼 webrtc 전에 있는 코드, 개인 편집
      // setNodes((nds) => nds.concat(newNode)); 
      nodesMap.set(newNode.id, newNode);
    },
    //🌼 webrtc 전에 있는 코드, 개인 편집
    // [reactFlowInstance]
  );



  return (
    <>
    <div className= "wrapper" ref={reactFlowWrapper} style={{ height: '100vh'}}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      // onConnectStart={onConnectStart}
      // onConnectEnd={onConnectEnd}
      // onInit={setReactFlowInstance}
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
    <Sidebar/>
    <div style={{ position: 'absolute',left: '50px', top: '70px', zIndex: 100 }}>
      <VoiceBar />
    </div>
    <div style={{ position: 'absolute', zIndex: 150 }}>
      <MenuBarR />
    </div>
    </>
  );
};

export default () => (
  <>
  <ReactFlowProvider>
    <Editingbox2 />
  </ReactFlowProvider>
  </>
);
