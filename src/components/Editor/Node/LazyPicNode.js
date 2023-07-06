import React, { useEffect, useState, useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import { memo } from 'react';

const LazyPicNode = ({ id, selected, data, isConnectable }) => {
  const handleStyle = {
    background: 'red',
    border: '2px solid white',
    borderRadius: '10%',
    width: '15px',
    height: '15px',
  };

  const [imgSrc, setImgSrc] = useState(null);

  const handleNetworkChange = useCallback(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection.effectiveType === '4g' && imgSrc !== data.imageurl) {
      setImgSrc(data.imageurl);
    } else if (imgSrc === null) {
      setImgSrc(data.thumburl);
    }
  }, [imgSrc, data]);

  useEffect(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      handleNetworkChange();
      connection.addEventListener('change', handleNetworkChange);
    }

    return () => {
      if (connection) {
        connection.removeEventListener('change', handleNetworkChange);
      }
    };
  }, [id, data.url, handleNetworkChange]);


  return (
    <div className="PictureNodeblock" style={{ border: '4px solid black', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} />
        <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} />
        <NodeResizer color="#ff0071" isVisible={selected} minWidth={180} minHeight={100} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} handleStyle={handleStyle} >
          <Handle type="target" position={Position.Left}/>
          <Handle type="source" position={Position.Right}/>
        </NodeResizer>
        
          <img src={imgSrc} alt='thumbnail' style={{  width: '100%', height: '800px', objectFit: 'contain' }} />
          <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} />
        <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable}/>
      </div>
    </div>
  );
}

export default memo(LazyPicNode);
