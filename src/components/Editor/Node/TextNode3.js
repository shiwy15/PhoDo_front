import { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { nodesMap } from '../Editingbox2';
import Hangul from 'hangul-js';
import { useUserStore } from '../../store';

function TextNode3({ id, selected, data, isConnectable }) {
  const [title, setTitle] = useState(data.title);
  const [date, setDate] = useState(data.date);
  const [content, setContent] = useState(data.content);
  const { userName } = useUserStore();

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

  const onDateChange = useCallback((evt) => {
    const normalizedDate = Hangul.assemble(evt.target.value);
    setDate(normalizedDate);
    // Immediately update the corresponding node
    const node = nodesMap.get(id);
    console.log(`Date changed by user: ${userName}`);
    if (node) {
      node.data = {
        ...node.data,
        date: normalizedDate
      };
      nodesMap.set(id, node);
    }
  }, [id, userName]);

  const onContentChange = useCallback((evt) => {
    const normalizedContent = Hangul.assemble(evt.target.value);
    setContent(normalizedContent);
    // Immediately update the corresponding node
    const node = nodesMap.get(id);
    console.log(`Content changed by user: ${userName}`);
    if (node) {
      node.data = {
        ...node.data,
        content: normalizedContent
      };
      nodesMap.set(id, node);
    }
  }, [id, userName]);

  return (
    <div className="textNode3 bg-white px-4 py-3 pt-4 rounded-lg" style={{ border: '2px solid black', paddingTop: '25px' }}>
      <Handle className="w-4 h-4" type="target" position={Position.Top} id="top" isConnectable={isConnectable} />
      <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} />
      <div style={{ textAlign: 'left' }}>
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
      <div style={{ textAlign: 'left' }}>
        <label htmlFor="date" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial', marginLeft: '5px'}}>날짜</label>
        <input
          type="text"
          id="date"
          value={data.date}
          onChange={onDateChange}
          className="input-box"
          style={{fontSize: '15pt'}}
        />
      </div>
      <div style={{ textAlign: 'left' }}>
        <label htmlFor="text" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial', marginLeft: '5px'}}>내용</label>
        <textarea
          id="text"
          value={data.content}
          onChange={onContentChange}
          rows={5}
          className="input-box overflow-auto"
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

export default TextNode3;
