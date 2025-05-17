
import React, { useCallback, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Edge, 
  Handle, 
  MiniMap, 
  Node, 
  NodeProps,
  Position, 
  ReactFlowProvider, 
  useNodesState, 
  useEdgesState 
} from 'reactflow';
import 'reactflow/dist/style.css';
import { N8nVisualization, N8nNode, UserInput } from '@/types';

interface TriggerNodeProps extends NodeProps {
  data: N8nNode['data'];
  isConfigured?: boolean;
}

const TriggerNode: React.FC<TriggerNodeProps> = ({ isConnectable, data, isConfigured }) => (
  <div className={`p-2 rounded-md border-2 ${isConfigured ? 'border-green-500 bg-green-50' : 'border-orange-500 bg-orange-50'}`}>
    <div className="font-medium text-gray-800 mb-1">{data?.label || 'Trigger'}</div>
    <div className="text-xs text-gray-600">{data?.description || 'Startet den Workflow'}</div>
    <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="w-3 h-3" />
  </div>
);

const FunctionNode: React.FC<TriggerNodeProps> = ({ isConnectable, data }) => (
  <div className="p-2 rounded-md border-2 border-blue-500 bg-blue-50">
    <div className="font-medium text-gray-800 mb-1">{data?.label || 'Function'}</div>
    <div className="text-xs text-gray-600">{data?.description || 'Verarbeitet Daten'}</div>
    <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="w-3 h-3" />
    <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="w-3 h-3" />
  </div>
);

const ActionNode: React.FC<TriggerNodeProps> = ({ isConnectable, data, isConfigured }) => (
  <div className={`p-2 rounded-md border-2 ${isConfigured ? 'border-green-500 bg-green-50' : 'border-purple-500 bg-purple-50'}`}>
    <div className="font-medium text-gray-800 mb-1">{data?.label || 'Action'}</div>
    <div className="text-xs text-gray-600">{data?.description || 'Führt eine Aktion aus'}</div>
    <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="w-3 h-3" />
  </div>
);

// Knotenzuordnung für verschiedene Typen
const nodeTypes = {
  trigger: TriggerNode,
  function: FunctionNode,
  action: ActionNode,
};

interface WorkflowVisualizerProps {
  visualization: N8nVisualization;
  userInputs?: UserInput[];
  className?: string;
}

const WorkflowVisualizer: React.FC<WorkflowVisualizerProps> = ({ visualization, userInputs = [], className }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Konvertiere N8nVisualization Datenmodell zu ReactFlow-Nodes
  const initializeFlowElements = useCallback(() => {
    const flowNodes: Node[] = visualization.nodes.map((node) => ({
      id: node.id,
      type: node.type,
      position: node.position,
      data: { 
        ...node.data,
        label: node.label,
        // Prüfe, ob für diesen Knoten alle Eingaben konfiguriert sind
        isConfigured: node.relatedInputIds?.every(
          inputId => userInputs.some(ui => ui.inputId === inputId)
        ) || false
      },
    }));

    const flowEdges: Edge[] = visualization.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      animated: edge.animated,
    }));

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [visualization, userInputs, setNodes, setEdges]);

  // Initialisiere Flow-Elemente beim ersten Render und wenn sich die Visualisierung oder Eingaben ändern
  useEffect(() => {
    initializeFlowElements();
  }, [initializeFlowElements]);

  return (
    <div className={`h-80 ${className || ''}`}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-right"
        >
          <Controls />
          <MiniMap nodeBorderRadius={2} />
          <Background gap={12} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default WorkflowVisualizer;
