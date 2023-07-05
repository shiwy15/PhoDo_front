import React, { useEffect, useState, useCallback } from 'react';
import { Handle, Position,  } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';
import { memo } from 'react';

const LazyPicNode = ({ id, selected, data }) => {
  const handleStyle = {
    background: 'red',
    border: '2px solid white',
    borderRadius: '10%',
    width: '15px',
    height: '15px',
  };

  const [imgSrc, setImgSrc] = useState(data.networkState === 'high' ? data.imageurl : data.thumburl);
  const [highResLoaded, setHighResLoaded] = useState(false);

  const handleNetworkChange = useCallback(() => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection.effectiveType === '4g' && !highResLoaded) {
      setImgSrc(data.imageurl);
      setHighResLoaded(true);
    } else if (!highResLoaded && data.networkState !== 'high') {
      setImgSrc(data.thumburl);
    }
  }, [highResLoaded, data]);

  useEffect(() => {
    console.log(data.url);
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
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
        <NodeResizer isVisible={selected} minWidth={180} minHeight={100} handleStyle={handleStyle} />
        <Handle type="target" position={Position.Left} />
        <div>
          <img src={imgSrc} alt='thumbnail' style={{ height: '400px', objectFit: 'contain' }} />
        </div>
        <Handle type="source" position={Position.Right} />
      </div>
    </div>
  );
}

export default memo(LazyPicNode);
