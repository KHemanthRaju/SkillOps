import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  addEdge, 
  applyNodeChanges, 
  applyEdgeChanges,
  Controls,
  Background
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Code Commit' },
    position: { x: 250, y: 25 },
  },
  {
    id: '2',
    data: { label: 'Build & Test' },
    position: { x: 250, y: 125 },
  },
  {
    id: '3',
    data: { label: 'Security Scan' },
    position: { x: 250, y: 225 },
  },
  {
    id: '4',
    data: { label: 'Deploy to Staging' },
    position: { x: 100, y: 325 },
  },
  {
    id: '5',
    data: { label: 'Deploy to Production' },
    position: { x: 400, y: 325 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
];

export default function InteractiveFlowchart({ initialNodes: propNodes, initialEdges: propEdges }) {
  const [nodes, setNodes] = useState(propNodes || initialNodes);
  const [edges, setEdges] = useState(propEdges || initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}