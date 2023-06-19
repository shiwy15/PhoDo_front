import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';


function TextNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="textNode bg-white px-5 py-2 rounded-lg">
      <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} />
      <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} />
      <div>
        <label htmlFor="text">{data.label}</label>
      </div>
      <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        // style={handleStyle}
        isConnectable={isConnectable}
      />
      
    </div>
  );
}

export default TextNode;
