// 이 내용은 text node!

import { useState, useEffect, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { nodesMap } from '../Editingbox2';

const TasknameNode = ({ id, selected, data, isConnectable }) => {
  const [title, setTitle] = useState(data.title);
  const [date, setDate] = useState(data.date);
  const [content, setContent] = useState(data.content);
  const [isFolded, setIsFolded] = useState(false);

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

  const toggleFold = useCallback(() => {
    setIsFolded((prevFolded) => !prevFolded);
  }, []);

  return (
    <div className="tasknameNode bg-white px-5 py-2 rounded-lg" style={{ width: '350px', border: '2px solid black', paddingTop: '25px', display: 'flex', flexDirection: 'column' }}>
      <Handle className="w-4 h-4" type="target" position={Position.Top} id="top" isConnectable={isConnectable} />
      <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="title" style={{ width: '70px', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial', paddingBottom: '10px' }}>업무명</label>
        <input
          type="text"
          id="title"
          value={data.title}
          onChange={onTitleChange}
          className="input-box"
          style={{ marginLeft: '20px', fontSize: '15pt' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="date" style={{ width: '70px', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial', paddingBottom: '10px'}}>담당자</label>
        <input
          type="text"
          id="date"
          value={data.date}
          onChange={onDateChange}
          className="input-box"
          style={{ marginLeft: '20px', fontSize: '15pt' }}
        />
      </div>
      <div>
        <div style={{ display: isFolded ? 'none' : 'block', marginTop: '15px'}}>
          <label htmlFor="text" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial'}}>진행사항</label>
          <textarea
            id="text"
            value={data.content}
            onChange={onContentChange}
            rows={8}
            className="input-box overflow-auto"
            style={{fontSize: '15pt'}}
          ></textarea>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px' }}>
        <button onClick={toggleFold} style={{ backgroundColor: '#7429C7', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
          {isFolded ? '펼치기' : '숨기기'}
        </button>
      </div>
      </div>
      <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} />
      <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} />
    </div>

  );
}

export default TasknameNode;