import { useState, useCallback, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { nodesMap } from '../Editingbox2';
import Hangul from 'hangul-js';
import { useUserStore } from '../../store';

function TextNode2({ id, selected, data, isConnectable }) {
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);

  const [lastEditBy, setLastEditBy] = useState(null);
  const [using, setUsing] = useState(data.using);
  const { userName } = useUserStore();
  const [colorMap, setColorMap] = useState({});

  const onTitleChange = useCallback((evt) => {
    const normalizedTitle = Hangul.assemble(evt.target.value);
    setTitle(normalizedTitle);
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

    setUsing('#ACF9AA');

    if (!colorMap[userName]) {
      setColorMap(prevColorMap => ({
        ...prevColorMap,
        [userName]: '#ACF9AA',
      }));
    }

  }, [id, userName, colorMap]);

  const onContentChange = useCallback((evt) => {
    const normalizedContent = Hangul.assemble(evt.target.value);
    setContent(normalizedContent);
    // Immediately update the corresponding node
    const node = nodesMap.get(id);
    setLastEditBy(userName);
    console.log(`Content changed by user: ${userName}`);
    if (node) {
      node.data = {
        ...node.data,
        content: normalizedContent,
        owner: userName,
        using: '#ACF9AA',
      };
      nodesMap.set(id, node);
    }

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
    if (title || content) {
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
  }, [title, content]);



  return (
    <div className="textNode2 bg-white px-4 py-3 pt-4 rounded-lg" style={{ border: '2px solid black', paddingTop: '25px' }}>
      <Handle className="w-4 h-4" type="target" position={Position.Top} id="top" isConnectable={isConnectable} />
      <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} />
      <div style={{textAlign: 'left'}}>
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
      <div style={{textAlign: 'left'}}>
        <label htmlFor="content" style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'Arial', marginLeft: '5px'}}>내용</label>
        <textarea
          id="content"
          value={data.content}
          onChange={onContentChange}
          className="input-box overflow-auto"
          rows={5}
          style={{fontSize: '15pt'}}
        ></textarea>
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
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextNode2;
