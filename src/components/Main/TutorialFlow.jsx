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
  { id: '1', position: { x: 80, y: 30 }, data: { label: '회의' } },
  // { id: '2', position: {x: 100, y: 100}, type: 'pix', width: 3, height: 3,
  // data: {url:'https://velog.velcdn.com/images/hodee/post/9cd9e7e6-fd88-4b1f-9958-c0e5437b481d/image.png'}},
  { id: '3', position: {x: 200, y: 140}, type: 'pix', width: 3, height: 3, 
  data: {url:'https://velog.velcdn.com/images/hodee/post/69a092ce-4c1a-40ff-ad22-e29171184bf2/image.png'}}
 ];

 const initialEdges = [
    {id: 'e1-2', source: '1', target: '3', style: {stroke: 'red', strokeWidth: 4}, animated: true }
  ];

  const nodeTypes = {
    pix: PictureNode,
    sample: TextNode,
  }; 

export default function TutorialFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  
    const onConnect = useCallback((params) => {
      const { source, sourceHandle, target, targetHandle } = params;
      const id = `e-${source}${sourceHandle || ''}-${target}${targetHandle || ''}`;
      setEdges((eds) =>
        addEdge(
          { ...params, style: { stroke: 'red', strokeWidth: 4 }, animated: true },
          eds
        )
      );
    }, [setEdges]);

  return (
    <div style={{
      position: 'relative',
      width: '100%', 
      height: '420px',
      paddingBottom: '40px', 
    }}>
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