import React, { useState, MouseEvent } from 'react';

import ReactFlow, {
  removeElements,
  addEdge,
  Background,
  Elements,
  Node,
  Edge,
  FlowElement,
  OnLoadParams,
  Connection,
} from 'react-flow-renderer';

const onNodeDragStop = (event: MouseEvent, node: Node) => console.log('drag stop', node);
const onElementClick = (event: MouseEvent, element: FlowElement) => console.log('click', element);
const onLoad = (reactFlowInstance: OnLoadParams) => {
  console.log(reactFlowInstance);
  reactFlowInstance.fitView();
};

const BasicFlow = () => {
  const initialElements = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Node 1' },
      position: { x: 250, y: 5 },
    },
    { id: '2', data: { label: '' }, position: { x: 100, y: 100 } },
    { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
    { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e1-3', source: '1', target: '3' },
  ];
  const [elements, setElements] = useState<Elements>(initialElements);
  const onElementsRemove = (elementsToRemove: Elements) => setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params: Edge | Connection) => setElements((els) => addEdge(params, els));

  return (
    <ReactFlow
      elements={elements}
      onLoad={onLoad}
      onElementClick={onElementClick}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onNodeDragStop={onNodeDragStop}
    >
      <Background />
    </ReactFlow>
  );
};

export default BasicFlow;
