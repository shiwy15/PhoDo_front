import { useEffect, useCallback, useState } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';
import {nodesMap} from './../Editingbox2'
import Hangul from 'hangul-js';
import { useUserStore } from '../../store';

const MemoNodeV = ({ id, data, selected }) => {
  const [memo, setMemo] = useState(data.memo);
  const [lastEditBy, setLastEditBy] = useState(null);
  const [using, setUsing] = useState(data.using);
  const { userName } = useUserStore();
  const [colorMap, setColorMap] = useState({});

  const onMemoChange = useCallback((evt) => {
    const normalizedMemo = Hangul.assemble(evt.target.value);
    setMemo(normalizedMemo);
    const node = nodesMap.get(id);
    setLastEditBy(userName);
    if (node) {
      node.data = {
          ...node.data,
          memo: normalizedMemo,
          owner: userName,
          using: '#ACF9AA',
      };
      nodesMap.set(id, node);
    }

    setUsing('#ACF9AA'); // And here as well

    if (!colorMap[userName]) {
      setColorMap(prevColorMap => ({
        ...prevColorMap,
        [userName]: '#ACF9AA',
      }));
    }
  }, [id, userName, colorMap]);


  const handleStyle = {
    background: 'red', // 핸들의 배경색 설정
    border: '2px solid white', // 핸들의 테두리 설정
    borderRadius: '10%', // 핸들의 원형 모양 설정
    width: '15px', // 핸들의 너비 설정
    height: '15px', // 핸들의 높이 설정
  };

  useEffect(() => {
    if (lastEditBy) {
      const timeoutId = setTimeout(() => {
        setLastEditBy(null);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [lastEditBy]);

  useEffect(() => {
    if (memo) {
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
  }, [memo]);


  // const getRandomBrightColor = () => {
  //   const lightColors = ['F', 'D', 'C', 'B', 'A'];
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += lightColors[Math.floor(Math.random() * lightColors.length)];
  //   }
  //   return color;
  // };

  // const backgroundColor = lastEditBy ? colorMap[lastEditBy] || 'white' : 'white';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
        <NodeResizer
          color="#ff0071"
          isVisible={selected}
          minWidth={300}
          minHeight={300}
          style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
          handleStyle={handleStyle}
        >
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </NodeResizer>
      </div>
      <div
        className="memoNodeV"
        style={{
          position: 'relative',
          background: '#B195EE',
          background: 'linear-gradient(-150deg, transparent 1.5em, #B195EE 0)',
          width: '100%',
          height: '100%',
          padding: '10px',
          color: 'white',
          borderRadius: '.5em',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          className="foldedCorner"
          style={{
            content: "''",
            position: 'absolute',
            top: '0',
            right: '0',
            background:
              'linear-gradient(to left bottom, transparent 50%, rgba(0,0,0,.2) 0, rgba(0,0,0,.4)) 100% 0 no-repeat',
            width: '1.73em',
            height: '3em',
            transform: 'translateY(-1.3em) rotate(-30deg)',
            transformOrigin: 'bottom right',
            borderBottomLeftRadius: 'inherit',
            boxShadow: '-.2em .2em .3em -.1em rgba(0,0,0,.15)',
          }}
        ></div>
        <div className="content" style={{ padding: '20px', flex: '1' }}>
          <textarea
            id="content"
            value={data.memo}
            onChange={onMemoChange}
            className="overflow-auto"
            rows={6}
            style={{
              resize: 'none',
              width: '100%',
              height: '100%',
              border: 'none',
              outline: 'none',
              backgroundColor: '#B195EE',
              marginTop: '5px',
              color: 'black',
              fontSize: '20pt'
            }}
          >
            
            </textarea>
            {data.owner && (
        <div style={{ position: 'absolute', bottom: '0', right: '0', background: data.using, color: 'black', padding: '5px', fontWeight: 'bold' }}>
          마지막 작성자: {data.owner}
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default MemoNodeV;