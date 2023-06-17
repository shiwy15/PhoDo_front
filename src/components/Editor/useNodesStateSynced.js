import { useCallback, useEffect, useState } from 'react';
import {
  applyNodeChanges,
  getConnectedEdges,
  Node,
  NodeAddChange,
  NodeChange,
  NodeResetChange,
  OnNodesChange,
  useNodes,
} from 'reactflow';

import ydoc from './ydoc';
import { edgesMap } from './useEdgesStateSynced';

//🌵 NodesMap은 Nodes에 해당하는 교체를 다 여기서 해결함
export const nodesMap = ydoc.getMap('nodes')

const initialNodes = [
  { id: '1', 
//   type: 'textUpdater',
   data: { label: '공사 초기 현장' }, 
   position: { x: -42, y: 59 } },
  
   { id: '2', 
//   type: 'textUpdater', 
  data: { label: '공사 중기 현장' }, 
  position: { x: 75, y: 286 } 
  }
];

const isNodeAddChange = (change) => change.type === 'add';
const isNodeResetChange = (change) => change.type === 'reset';

function useNodesStateSynced () {

} 

export default useNodesStateSynced;