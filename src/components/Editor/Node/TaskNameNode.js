// 이 내용은 text node!

import { useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const TasknameNode = ({ data, isConnectable }) => {
  const [title, setTitle] = useState(data.title);
  const [date, setDate] = useState(data.date);
  const [text, setText] = useState(data.label);
  const [isFolded, setIsFolded] = useState(false);

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

  const toggleFold = useCallback(() => {
    setIsFolded((prevFolded) => !prevFolded);
  }, []);

  return (
    <div className="tasknameNode bg-white px-5 py-2 rounded-lg" style={{ width: '350px', border: '2px solid black', paddingTop: '25px', display: 'flex', flexDirection: 'column' }}>
      <Handle className="w-4 h-4" type="target" position={Position.Top} id="top" isConnectable={isConnectable} />
      <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="title" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial', paddingBottom: '10px' }}>Task</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={onTitleChange}
          className="input-box"
          style={{ marginLeft: '30px' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="date" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial', paddingBottom: '10px'}}>Name</label>
        <input
          type="text"
          id="date"
          value={date}
          onChange={onDateChange}
          className="input-box"
          style={{ marginLeft: '20px' }}
        />
      </div>
      <div>
        <div style={{ display: isFolded ? 'none' : 'block', marginTop: '15px'}}>
          <label htmlFor="text" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial'}}>Progress</label>
          <textarea
            id="text"
            value={text}
            onChange={onTextChange}
            rows={8}
            className="input-box overflow-auto"
          ></textarea>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px' }}>
        <button onClick={toggleFold} style={{ backgroundColor: '#7429C7', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>
          {isFolded ? 'Show' : 'Hide'}
        </button>
      </div>
      </div>
      <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} />
      <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} />
    </div>

  );
}

export default TasknameNode;
