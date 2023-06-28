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
  { id: '1', position: { x: 30, y: 50 }, type: 'sample', data: { label: '공사 전' } },
  { id: '2', position: { x: 100, y: 200 }, type: 'sample', data: { label: '공사 중' } },
  { id: '4', position: {x: 300, y: 20}, type: 'pix', width: 10, height: 10,
  data: {url:'https://velog.velcdn.com/images/hodee/post/26d2b93c-8588-4848-8020-55a6fc347f96/image.png'}}
 ];

 const initialEdges = [
    {id: 'e1-2', source: '1', target: '4', style: {stroke: 'red', strokeWidth: 4}, animated: true }
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
  <div style={{ width: '38vw', height: '43vh', border: 'solid 1px rgba(0,0,0,1)', marginLeft: '15px' }}>
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