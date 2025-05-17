
// Definiert die Typen für die Workflow-Vorlagen und deren Eingaben

export interface WorkflowInput {
  id: string;
  label: string;
  type: 'text' | 'password' | 'textarea' | 'email' | 'url' | 'select';
  description: string;
  placeholder?: string;
  required: boolean;
  validationRegex?: string;
  options?: { value: string; label: string }[]; // Für select-Typ
  helpLink?: string;
}

export interface CustomizablePrompt {
  id: string;
  label: string;
  description: string;
  defaultText: string;
}

export interface N8nNode {
  id: string;
  label: string;
  type: string;
  position: { x: number; y: number };
  data?: Record<string, any>;
  relatedInputIds?: string[]; // Verknüpfung zu WorkflowInput.id
}

export interface N8nEdge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}

export interface N8nVisualization {
  nodes: N8nNode[];
  edges: N8nEdge[];
}

export interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: 'Marketing' | 'Sales' | 'Productivity' | 'Development' | 'Finance' | 'HR' | 'Other';
  icon: string; // Lucide icon name
  inputs: WorkflowInput[];
  customizablePrompts?: CustomizablePrompt[];
  n8nJsonBase: string; // JSON-Template mit Platzhaltern
  n8nVisualization: N8nVisualization;
}

export interface UserInput {
  inputId: string;
  value: string;
}

export interface CustomizedPrompt {
  promptId: string;
  text: string;
}

export interface ChatbotMessage {
  id: string;
  content: string;
  sender: 'system' | 'user';
  timestamp: Date;
  responseType?: string;
  responseOptions?: any[];
  responseData?: any;
}

export interface ConfigurationState {
  currentStepIndex: number;
  userInputs: UserInput[];
  customizedPrompts: CustomizedPrompt[];
  isConfigured: boolean;
}

// New interfaces for webhook responses
export interface ChatResponseOption {
  value: string;
  label?: string;
}

export interface WebhookResponseData {
  inputType?: string;
  placeholder?: string;
  rows?: number;
  [key: string]: any;
}
