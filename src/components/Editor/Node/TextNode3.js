// 이 내용은 text node!

import { useState, useEffect, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { nodesMap } from '../Editingbox2';
// import { useUpdateNodeInternals } from 'reactflow';

function TextNode3({ id, selected, data, isConnectable }) {
  const [title, setTitle] = useState(data.title);
  const [date, setDate] = useState(data.date);
  const [content, setContent] = useState(data.content);
  // const updateNodeInternals = useUpdateNodeInternals();

  const onTitleChange = useCallback((evt) => {
    setTitle(evt.target.value);
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


  const onDateChange = useCallback((evt) => {
    setDate(evt.target.value);
  }, []);

  useEffect(() => {
    // This is your map iteration code 
    nodesMap.forEach((node, nodeId) => {
      if (node.selected === true) {
        node.data = {
            ...node.data,
            date: date
        };
        nodesMap.set(nodeId, node);
        // updateNodeInternals(nodeId);  // Trigger re-render of this node.
        // onNodesChange(nodes.map(node => node.id === id ? { ...node, data: { ...node.data, memo: content } } : node));
      }
    });
  }, [date]);





  const onContentChange = useCallback((evt) => {
    setContent(evt.target.value);
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
        // updateNodeInternals(nodeId);  // Trigger re-render of this node.
        // onNodesChange(nodes.map(node => node.id === id ? { ...node, data: { ...node.data, memo: content } } : node));
      }
    });
  }, [content]);

  return (
    <div className="textNode3 bg-white px-5 py-2 rounded-lg" style={{ border: '2px solid black', paddingTop: '25px' }}>
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
        />
      </div>
      <div>
        <label htmlFor="date" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial', marginLeft: '5px'}}>날짜</label>
        <input
          type="text"
          id="date"
          value={data.date}
          onChange={onDateChange}
          className="input-box"
        />
      </div>
      <div>
        <label htmlFor="text" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial', marginLeft: '5px'}}>내용</label>
        <textarea
          id="text"
          value={data.content}
          onChange={onContentChange}
          rows={5}
          className="input-box overflow-auto"
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

export default TextNode3;
