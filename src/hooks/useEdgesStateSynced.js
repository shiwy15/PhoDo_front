import { useCallback, useEffect, useState } from 'react';
import {
  applyEdgeChanges,
} from 'reactflow';

import {getDoc} from '../components/Editor/ydoc';

const isEdgeAddChange = (change) => change.type === 'add';
const isEdgeRemoveChange = (change) => change.type === 'remove';
const isEdgeResetChange = (change) => change.type === 'reset';

function useEdgesStateSynced(room) {
  const [edges, setEdges] = useState([]);
  const {ydoc, edgesMap} = getDoc(room);

  const onEdgesChange = useCallback((changes) => {
    const currentEdges = Array.from(edgesMap.values()).filter((e) => e);
    const nextEdges = applyEdgeChanges(changes, currentEdges);
    changes.forEach((change) => {
      if (isEdgeRemoveChange(change)) {
        edgesMap.delete(change.id);
      } else if (!isEdgeAddChange(change) && !isEdgeResetChange(change)) {
        edgesMap.set(change.id, nextEdges.find((n) => n.id === change.id));
      }
    });
  }, [ydoc]);

  const onConnect = useCallback((params) => {
    const { source, sourceHandle, target, targetHandle } = params;
    const id = `e-${source}${sourceHandle || ''}-${target}${targetHandle || ''}`;

    edgesMap.set(id, {
      id,
      ...params,
    });
  }, [ydoc]);

  useEffect(() => {
    const observer = () => {
      setEdges(Array.from(edgesMap.values()));
    };

    setEdges(Array.from(edgesMap.values()));
    edgesMap.observe(observer);

    return () => edgesMap.unobserve(observer);
  }, [setEdges, ydoc]);

  return [edges, onEdgesChange, onConnect];
}

export default useEdgesStateSynced;
