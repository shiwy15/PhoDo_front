// 이 내용은 text node!

import { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

function TextNode3({ data, isConnectable }) {
  const [title, setTitle] = useState(data.title);
  const [date, setDate] = useState(data.date);
  const [text, setText] = useState(data.label);

  const onTitleChange = useCallback((evt) => {
    setTitle(evt.target.value);
    console.log(evt.target.value);
  }, []);

  const onDateChange = useCallback((evt) => {
    setDate(evt.target.value);
    console.log(evt.target.value);
  }, []);

  const onTextChange = useCallback((evt) => {
    setText(evt.target.value);
    console.log(evt.target.value);
  }, []);

  return (
    <div className="textNode3 bg-white px-5 py-2 rounded-lg" style={{ border: '2px solid black', paddingTop: '25px' }}>
      <Handle className="w-4 h-4" type="target" position={Position.Top} id="top" isConnectable={isConnectable} />
      <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} />
      <div>
        <label htmlFor="title" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial', marginLeft: '5px'}}>제목</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={onTitleChange}
          className="input-box"
        />
      </div>
      <div>
        <label htmlFor="date" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial', marginLeft: '5px'}}>날짜</label>
        <input
          type="text"
          id="date"
          value={date}
          onChange={onDateChange}
          className="input-box"
        />
      </div>
      <div>
        <label htmlFor="text" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial', marginLeft: '5px'}}>내용</label>
        <textarea
          id="text"
          value={text}
          onChange={onTextChange}
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
