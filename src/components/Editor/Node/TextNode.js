import { useState, useCallback, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { nodesMap } from '../Editingbox2';
import Hangul from 'hangul-js';
import { useUserStore } from '../../store';


import './index.css';

const TextNode = ({ id, data, isConnectable }) => {
  const [title, setTitle] = useState(data.title);
  const [lastEditBy, setLastEditBy] = useState(null);
  const [using, setUsing] = useState(data.using);
  const { userName } = useUserStore();
  const [colorMap, setColorMap] = useState({});


  const onTitleChange = useCallback((evt) => {
    const normalizedTitle = Hangul.assemble(evt.target.value);
    setTitle(normalizedTitle);
    // Immediately update the corresponding node
    const node = nodesMap.get(id);
    setLastEditBy(userName);
    console.log(`Title changed by user: ${userName}`);
    if (node) {
      node.data = {
        ...node.data,
        title: normalizedTitle,
        owner: userName,
        using: '#ACF9AA',
      };
      nodesMap.set(id, node);
    }
    // setLastEditBy(userName);

    setUsing('#ACF9AA');

    if (!colorMap[userName]) {
      setColorMap(prevColorMap => ({
        ...prevColorMap,
        [userName]: '#ACF9AA',
      }));
    }

  }, [id, userName, colorMap]);

  useEffect(() => {
    if (lastEditBy) {
      const timeoutId = setTimeout(() => {
        setLastEditBy(null);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [lastEditBy]);

  useEffect(() => {
    if (title) {
      const timeoutId = setTimeout(() => {
        const node = nodesMap.get(id);
        if (node) {
          node.data = {
            ...node.data,
            using: 'white',
          };
          nodesMap.set(id, node);
        }
        setUsing('white');
      }, 500);
      return () => clearTimeout(timeoutId);
    }
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
            fontSize: '40pt',
            border: '1px solid transparent',
            outline: 'none',
            overflowWrap: 'break-word',
          }}
        />
          {data.owner && (
          <div style={{ position: 'absolute', bottom: '3px', right: '3px', background: data.using, color: 'black', padding: '5px', fontWeight: 'bold' , borderRadius: '10px' }}>
            마지막 작성자: {data.owner}
          </div>
        )}
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