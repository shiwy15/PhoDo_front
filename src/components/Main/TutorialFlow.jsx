import React, { useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';
import PictureNode from '../Editor/Node/PictureNode';
import TextNode from './SampleNode';


const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, type: 'sample', data: { label: '공사 전' } },
  { id: '2', position: { x: 30, y: 100 }, type: 'sample', data: { label: '공사 중' } },
  { id: '4', position: {x: 300, y: 20}, type: 'pix', width: 10, height: 10,
  data: {url:'https://velog.velcdn.com/images/hodee/post/26d2b93c-8588-4848-8020-55a6fc347f96/image.png'}}
 ];

 const initialEdges = [
  ];

export default function TutorialFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = {
    pix: PictureNode,
    sample: TextNode
  }

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  return (
  <div style={{ width: '100%', height: '100%', border: 'solid 1px rgba(0,0,0,1)', wordBreak: 'break-word' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        style={{background :"#d09aff"  }}
      >
        <Controls />
         <Background id="1" gap={20} />
      </ReactFlow>
    </div>
  );
}