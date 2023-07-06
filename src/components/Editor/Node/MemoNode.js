import { useEffect, useCallback, useState } from 'react';
import { Handle, Position, NodeResizer } from 'reactflow';
import {nodesMap} from './../Editingbox2'
import Hangul from 'hangul-js';
import { useUserStore } from '../../store';

const MemoNode = ({ id, data, selected }) => {
  const [memo, setMemo] = useState(data.memo);
  const [lastEditBy, setLastEditBy] = useState(null);
  const { userName } = useUserStore();
  const [colorMap, setColorMap] = useState({});


  const onMemoChange = useCallback((evt) => {
    const normalizedMemo = Hangul.assemble(evt.target.value);
    setMemo(normalizedMemo);
    // Immediately update the corresponding node
    const node = nodesMap.get(id);
    setLastEditBy(userName);
    console.log(`Memo changed by user: ${userName}`);

    if (node) {
      node.data = {
          ...node.data,
          memo: normalizedMemo
      };
      nodesMap.set(id, node);
    }

    if (!colorMap[userName]) {
      setColorMap(prevColorMap => ({
        ...prevColorMap,
        [userName]: getRandomBrightColor(),
      }));
    }
  }, [id, userName, colorMap]);


  useEffect(() => {
    if (lastEditBy) {
      const timeoutId = setTimeout(() => {
        setLastEditBy(null);
      }, 2000); // Clear the name after 2 seconds

      // Clear the timeout if the component is unmounted
      return () => clearTimeout(timeoutId);
    }
  }, [lastEditBy]);


  const getRandomBrightColor = () => {
    const lightColors = ['F', 'D', 'C', 'B', 'A'];
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += lightColors[Math.floor(Math.random() * lightColors.length)];
    }
    return color;
  };

  const backgroundColor = lastEditBy ? colorMap[lastEditBy] || 'white' : 'white';

  const handleStyle = {
    background: 'red', // 핸들의 배경색 설정
    border: '2px solid white', // 핸들의 테두리 설정
    borderRadius: '10%', // 핸들의 원형 모양 설정
    width: '15px', // 핸들의 너비 설정
    height: '15px', // 핸들의 높이 설정
  };

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
        className="memoNodeY"
        style={{
          position: 'relative',
          background: '#F2E173',
          background: 'linear-gradient(-150deg, transparent 1.5em, #F2E173 0)',
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
              backgroundColor: '#F2E173',
              marginTop: '5px',
              color: 'black',
              fontSize: '20pt'
            }}
          >
            </textarea>
            {lastEditBy && (
        <div style={{ position: 'absolute', bottom: '0', right: '0', background: backgroundColor, color: 'black', padding: '5px', fontWeight: 'bold' }}>
          작성하고 있는 사람: {lastEditBy}
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default MemoNode;