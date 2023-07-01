import React from 'react';
import { BaseEdge, getBezierPath } from 'reactflow';


export default function CustomEdge(props) {
  const { 
    id, 
    sourceX, 
    sourceY, 
    targetX, 
    targetY, 
    sourcePosition, 
    targetPosition, 
    style = {stroke : 'white', strokeWidth : 4}, 
    markerEnd = { type: 'Arrow' },
  } = props;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style}  />
    </>
  );
}
