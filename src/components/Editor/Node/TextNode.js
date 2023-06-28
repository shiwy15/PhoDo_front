import { fontSize } from '@mui/system';
import { useState, useCallback, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { nodesMap } from '../Editingbox2';


function TextNode({ data, isConnectable }) {
  const [title, setTitle] = useState(data.title);

  const onTitleChange = useCallback((evt) => {
    const normalizedTitle = evt.target.value.normalize('NFKD');
    setTitle(normalizedTitle);
  }, []);

  useEffect(() => {
    // This is your map iteration code 
    nodesMap.forEach((node, nodeId) => {
      if (node.selected === true) {
        node.data = {
          ...node.data,
          title: title
        };
        nodesMap.set(nodeId, node);
        // updateNodeInternals(nodeId);  // Trigger re-render of this node.
        // onNodesChange(nodes.map(node => node.id === id ? { ...node, data: { ...node.data, memo: content } } : node));
      }
    });
  }, [title]);

  return (
    <div className="textNode bg-white px-5 py-5 rounded-lg">
      <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} />
      <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} />
      <div>
        <textarea
          id="title"
          value={data.title}
          onChange={onTitleChange}
          style={{
            width: '300px',
            height: '100px',
            fontSize: '20pt',
            border: '1px solid transparent',
            outline: 'none',
            overflowWrap: 'break-word',
          }}
        />
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