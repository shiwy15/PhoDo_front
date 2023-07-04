import React, { useEffect, useState, } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';

export default function LazyPicNode({
  id,
  sourcePosition = Position.Left,
  targetPosition = Position.Right,
  data,
}) {
  const updateNodeInternals = useUpdateNodeInternals();
  const [resizable, setResizable] = useState(true);

  useEffect(() => {
  }, [id, updateNodeInternals]);

  return (
    <>
      <div>
        <NodeResizer isVisible={resizable} minWidth={180} minHeight={100} />
        <div/>
        <div>
          {data?.label}
          <div>
            <label>
              <input
                type="checkbox"
                checked={resizable}
                onChange={(evt) => setResizable(evt.target.checked)}
              />
              resizable
            </label>
          </div>
        </div>
        <Handle style={{ opacity: 0 }} position={sourcePosition} type="source" />
        <Handle style={{ opacity: 0 }} position={targetPosition} type="target" />
      </div>
    </>
  );
}
