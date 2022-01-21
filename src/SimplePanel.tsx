import React, { useState, MouseEvent } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
//import BasicFlow from 'Flow';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  //Data Querys
  const returnLastDataFromQuery = (offset: number) => {
    return data.series
      .map((series) => series.fields.find((field) => field.type === 'number'))
      .map((field) => field?.values.get(field.values.length - offset));
  };

  const BasicFlow = () => {
    let lastData: any;
    const initialElements = [
      {
        id: '1',
        type: 'input',
        data: { label: 'Node 1' },
        position: { x: 250, y: 5 },
      },
      {
        id: '2',
        data: { label: 'Active Node: ' + (lastData = returnLastDataFromQuery(1)) },
        position: { x: 100, y: 100 },
        style: { background: lastData < 0.5 ? 'green' : 'red' },
      },
      { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
      { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
      { id: 'e1-2', source: '1', target: '2', animated: true },
      { id: 'e1-3', source: '1', target: '3' },
    ];
    const [elements, setElements] = useState<Elements>(initialElements);
    const onElementsRemove = (elementsToRemove: Elements) =>
      setElements((els) => removeElements(elementsToRemove, els));
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

  return (
    <div
      className={cx(
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <BasicFlow />
      <div>
        {options.showSeriesCount && <div>Number of series: {data.series.length}</div>}
        <div>Past data: {returnLastDataFromQuery(10)}</div>
      </div>
    </div>
  );
};

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
