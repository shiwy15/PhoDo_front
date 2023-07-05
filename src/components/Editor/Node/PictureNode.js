import { useEffect } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';

function PictureNode({ data, selected, isConnectable }) {

  const updateNodeInternals = useUpdateNodeInternals();
  const handleStyle = {
    background: 'red', // 핸들의 배경색 설정
    border: '2px solid white', // 핸들의 테두리 설정
    borderRadius: '10%', // 핸들의 원형 모양 설정
    width: '15px', // 핸들의 너비 설정
    height: '15px', // 핸들의 높이 설정
  };

    useEffect(() => {
  }, [ updateNodeInternals]);

  return (
    <div className="PictureNodeblock" style={{ border: '4px solid black', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      <div style={{ position: 'relative', width: '100%' }} >
      <Handle className="w-4 h-4" type="target" position={Position.Top} id="top" isConnectable={isConnectable} />
      <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} />
        <NodeResizer color="#ff0071" isVisible={selected} minWidth={100} minHeight={30} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} handleStyle={handleStyle} >
          <Handle type="target" position={Position.Left}/>
          <Handle type="source" position={Position.Right}/>
        </NodeResizer>
        
        {/* Render each tag as a separate label */}
        <img src={data.url} alt="image" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} />
        <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} />
      </div>
      
    </div>
  );
}

export default PictureNode;