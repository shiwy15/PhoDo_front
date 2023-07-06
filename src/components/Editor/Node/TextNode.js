import { useState, useCallback, useEffect } from 'react';
import { fontSize } from '@mui/system';
import { Handle, Position } from 'reactflow';
import { nodesMap } from '../Editingbox2';
import Hangul from 'hangul-js';
import { useUserStore } from '../../store';


import './index.css';

function TextNode({ id, data, isConnectable }) {
  const [title, setTitle] = useState(data.title);
  const { userName } =useUserStore();
  const onTitleChange = useCallback((evt) => {
    const normalizedTitle = Hangul.assemble(evt.target.value);
    setTitle(normalizedTitle);
    // Immediately update the corresponding node
    const node = nodesMap.get(id);
    console.log(`Title changed by user: ${userName}`);
    if (node) {
      node.data = {
        ...node.data,
        title: normalizedTitle
      };
      nodesMap.set(id, node);
    }
  }, [id, userName]);

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