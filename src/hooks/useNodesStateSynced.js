// import { useCallback, useEffect, useState } from 'react';
// import {
//   applyNodeChanges,
//   getConnectedEdges
// } from 'reactflow';

// import {getDoc} from '../components/Editor/ydoc'

// const isNodeAddChange = (change) => change.type === 'add';
// const isNodeResetChange = (change) => change.type === 'resset';

// function useNodesStateSynced(room) {
//   const [nodes, setNodes] = useState([]);
//   const {ydoc, nodesMap, edgesMap } = getDoc(room);


//   const onNodesChanges = useCallback((changes) => {
//     const nodes = Array.from(nodesMap.values());

//     const nextNodes = applyNodeChanges(changes, nodes);
//     changes.forEach((change) => {
//       if (!isNodeAddChange(change) && !isNodeResetChange(change)) {
//         const node = nextNodes.find((n) => n.id === change.id);

//         if (node && change.type !== 'remove') {
//           nodesMap.set(change.id, node);
//         } else if (change.type === 'remove') {
//           const deletedNode = nodesMap.get(change.id);
//           nodesMap.delete(change.id);
//           const edges = Array.from(edgesMap.values()).map((e) => e);
//           const connectedEdges = getConnectedEdges(deletedNode ? [deletedNode] : [], edges);
//           connectedEdges.forEach((edge) => edgesMap.delete(edge.id));
//         }
//       }
//     });
//   }, [ydoc]);

//   useEffect(() => {
//     const observer = () => {
//       setNodes(Array.from(nodesMap.values()));
//     };

//     setNodes(Array.from(nodesMap.values()));
//     nodesMap.observe(observer);

//     return () => nodesMap.unobserve(observer);
//   }, [setNodes, ydoc]);

//   return [nodes.filter((n) => n), onNodesChanges];
// }

// export default useNodesStateSynced;