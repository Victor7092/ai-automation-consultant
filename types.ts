export interface FormData {
  industry: string;
  role: string;
  manual_task: string;
  tools: string;
  trigger: string;
  goal: string;
}

export interface WorkflowStep {
  step_number?: number;
  tool_name?: string; // Sometimes AI returns 'tool' or 'tool_name'
  tool?: string;
  action?: string;
  description: string;
}

export interface TechStackItem {
  tool_name: string;
  role: string; // What the tool does
  connection_type?: string; // Native vs HTTP
}

export interface AutomationPlan {
  industry: string;
  pain_point: string;
  solution_title: string;
  solution_description: string;
  workflow_steps: WorkflowStep[];
  saas_stack: TechStackItem[];
}

// Raw response structure might vary, so we define a loose type for initial parsing
export interface RawApiResponse {
  [key: string]: any;
}