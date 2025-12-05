import { AutomationPlan, RawApiResponse } from './types';

export const cleanAndParseResponse = (responseText: string): AutomationPlan => {
  // Debug log to see what we actually got
  console.log("Raw API Response:", responseText);

  if (!responseText || !responseText.trim()) {
    throw new Error("Received empty response from the server.");
  }

  let data: RawApiResponse | null = null;
  const cleanText = responseText.trim();

  // Strategy 1: Attempt strict parsing first (best case)
  try {
    data = JSON.parse(cleanText);
  } catch (e) {
    // Strategy 2: Look for Markdown code blocks (```json ... ```)
    const codeBlockMatch = cleanText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (codeBlockMatch) {
      try {
        data = JSON.parse(codeBlockMatch[1]);
      } catch (innerE) {
        // Continue to Strategy 3
      }
    }
  }

  // Strategy 3: Heuristic extraction (Find first '{'/'[' and last '}'/']')
  if (!data) {
    try {
      const firstBrace = cleanText.indexOf('{');
      const firstBracket = cleanText.indexOf('[');
      
      let start = -1;
      let end = -1;

      // Determine if it looks like an Object or an Array starts first
      if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
        start = firstBrace;
        end = cleanText.lastIndexOf('}') + 1;
      } else if (firstBracket !== -1) {
        start = firstBracket;
        end = cleanText.lastIndexOf(']') + 1;
      }

      if (start !== -1 && end > start) {
        const potentialJson = cleanText.substring(start, end);
        data = JSON.parse(potentialJson);
      }
    } catch (e) {
      console.error("JSON Extraction failed:", e);
    }
  }

  if (!data) {
    throw new Error("Could not parse a valid blueprint from the AI response.");
  }

  // Step 4: Normalization
  // If the root is an array, take the first item
  if (Array.isArray(data)) {
    data = data.length > 0 ? data[0] : {};
  }

  // Check if nested under automationIdea or flat (User Logic)
  const root = data.automationIdea || data;

  // Robust extraction with fallbacks based on user requirements
  const industry = root.industry || "General Industry";
  
  // Map 'manualProblem' or 'pain_point'
  const pain_point = root.pain_point || root.manualProblem || root.problem_description || "Identified inefficiency in current process.";
  
  // Solution might be nested in 'n8nSolution'
  const solution_title = root.solution_title || root.n8nSolution?.title || "Automated Workflow Solution";
  const solution_description = root.solution_description || root.n8nSolution?.description || root.solution || "A streamlined process to eliminate manual effort.";

  // Workflow Steps (Handle 'workflow_steps' OR 'n8nSolution.steps')
  const rawSteps = root.workflow_steps || root.n8nSolution?.steps || [];
  const workflow_steps = Array.isArray(rawSteps) 
    ? rawSteps.map((step: any, i: number) => ({
        step_number: step.step || i + 1,
        tool_name: step.tool || step.tool_name || "System Action",
        action: step.action || "Process",
        description: step.description || step.action || (typeof step === 'string' ? step : "Execute automated task")
      }))
    : [];

  // Tech Stack (Handle 'saas_stack' OR 'saasStack')
  const rawStack = root.saas_stack || root.saasStack || [];
  const saas_stack = Array.isArray(rawStack) 
    ? rawStack.map((item: any) => ({
        tool_name: item.name || item.tool_name || "Tool",
        role: item.role || "Integration",
        connection_type: (item.connection || item.type || "").toLowerCase().includes('native') ? 'Native' : 'HTTP'
      }))
    : [];

  return {
    industry,
    pain_point,
    solution_title,
    solution_description,
    workflow_steps,
    saas_stack
  };
};

export const formatBlueprintForClipboard = (plan: AutomationPlan): string => {
  let text = `AUTOMATION BLUEPRINT\n`;
  text += `Industry: ${plan.industry}\n`;
  text += `\nPAIN POINT:\n${plan.pain_point}\n`;
  text += `\nSOLUTION: ${plan.solution_title}\n${plan.solution_description}\n`;
  
  text += `\nWORKFLOW:\n`;
  plan.workflow_steps.forEach((step, idx) => {
    text += `${idx + 1}. [${step.tool_name}] - ${step.description}\n`;
  });

  text += `\nTECH STACK:\n`;
  plan.saas_stack.forEach((item) => {
    text += `- ${item.tool_name}: ${item.role} (${item.connection_type || 'N/A'})\n`;
  });

  return text;
};