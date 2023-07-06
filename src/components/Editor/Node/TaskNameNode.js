// 이 내용은 text node!

import { textAlign } from '@mui/system';
import { useState, useEffect, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { nodesMap } from '../Editingbox2';
import Hangul from 'hangul-js';

const TasknameNode = ({ id, selected, data, isConnectable }) => {
  const [title, setTitle] = useState(data.title);
  const [date, setDate] = useState(data.date);
  const [content, setContent] = useState(data.content);
  const [isFolded, setIsFolded] = useState(false);

  const onTitleChange = useCallback((evt) => {
    const normalizedTitle = Hangul.assemble(evt.target.value);
    setTitle(normalizedTitle);
    // Immediately update the corresponding node
    const node = nodesMap.get(id);
    if (node) {
      node.data = {
        ...node.data,
        title: normalizedTitle
      };
      nodesMap.set(id, node);
    }
  }, [id]);

  const onDateChange = useCallback((evt) => {
    const normalizedDate = Hangul.assemble(evt.target.value);
    setDate(normalizedDate);
    // Immediately update the corresponding node
    const node = nodesMap.get(id);
    if (node) {
      node.data = {
        ...node.data,
        date: normalizedDate
      };
      nodesMap.set(id, node);
    }
  }, [id]);

  const onContentChange = useCallback((evt) => {
    const normalizedContent = Hangul.assemble(evt.target.value);
    setContent(normalizedContent);
    // Immediately update the corresponding node
    const node = nodesMap.get(id);
    if (node) {
      node.data = {
        ...node.data,
        content: normalizedContent
      };
      nodesMap.set(id, node);
    }
  }, [id]);


  const toggleFold = useCallback(() => {
    setIsFolded((prevFolded) => !prevFolded);
  }, []);

  return (
    <div className="tasknameNode bg-white px-4 py-2 pt-4 rounded-lg" style={{ width: '350px', border: '2px solid black', paddingTop: '25px', display: 'flex', flexDirection: 'column' }}>
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
        <div style={{ display: isFolded ? 'none' : 'block', marginTop: '15px', textAlign: 'left'}}>
          <label htmlFor="text" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial', }}>진행사항</label>
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
        <button onClick={toggleFold} style={{ fontSize: '20px', fontWeight: 'bold', backgroundColor: 'navy', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
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