// title & content

import { useState, useCallback, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { nodesMap } from '../Editingbox2';

function TextNode2({ id, selected, data, isConnectable }) {
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);

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


  const onContentChange = useCallback((evt) => {
    const normalizedContent = evt.target.value.normalize('NFKD');
    setContent(normalizedContent);
  }, []);

  useEffect(() => {
    // This is your map iteration code 
    nodesMap.forEach((node, nodeId) => {
      if (node.selected === true) {
        node.data = {
            ...node.data,
            content: content
        };
        nodesMap.set(nodeId, node);
        console.log('노드는 ', node);
        console.log('바뀌고 있어 이건 확실해');
        // updateNodeInternals(nodeId);  // Trigger re-render of this node.
        // onNodesChange(nodes.map(node => node.id === id ? { ...node, data: { ...node.data, memo: content } } : node));
      }
    });
  }, [content]);


  return (
    <div className="textNode2 bg-white px-5 py-2 rounded-lg" style={{ border: '2px solid black', paddingTop: '25px' }}>
      <Handle className="w-4 h-4" type="target" position={Position.Top} id="top" isConnectable={isConnectable} />
      <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} />
      <div>
        <label htmlFor="title" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial', marginLeft: '5px'}}>제목</label>
        <input
          type="text"
          id="title"
          value={data.title}
          onChange={onTitleChange}
          className="input-box"
          style={{fontSize: '15pt'}}
        />
      </div>
      <div>
        <label htmlFor="content" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial', marginLeft: '5px'}}>내용</label>
        <textarea
          id="content"
          value={data.content}
          onChange={onContentChange}
          className="input-box overflow-auto"
          rows={5}
          style={{fontSize: '15pt'}}
        ></textarea>
      </div>
      <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextNode2;
