
import { GoogleGenAI, Type } from "@google/genai";
import { SolverResult } from "./types";

// Use Vite's environment variable system
const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Helper to check if API is configured
const checkApiConfigured = () => {
  if (!ai || !apiKey) {
    throw new Error("AI features require an API key. Please configure VITE_GEMINI_API_KEY in your environment to enable math solving.");
  }
};

const solverSchema = {
  type: Type.OBJECT,
  properties: {
    problem: { type: Type.STRING },
    finalAnswer: { type: Type.STRING, description: "The final answer in LaTeX format, keep it clean and focused." },
    steps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          operation: { type: Type.STRING, description: "The specific math transformation in LaTeX notation." },
          explanation: { type: Type.STRING, description: "A warm, conversational explanation of WHY this step is taken, avoiding unnecessary jargon." },
          simplifiedExplanation: { type: Type.STRING, description: "An even simpler version of the explanation using plain English and analogies for absolute beginners." }
        },
        required: ["operation", "explanation", "simplifiedExplanation"]
      }
    },
    intuition: { type: Type.STRING, description: "A brilliant conceptual analogy or 'lightbulb moment' explanation of the concept." },
    commonMistakes: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "2-3 specific pitfalls where students typically go wrong with this exact problem type."
    }
  },
  required: ["problem", "finalAnswer", "steps", "intuition", "commonMistakes"]
};

const SYSTEM_INSTRUCTION = `You are Stepwise, a patient and brilliant mathematics tutor whose goal is clarity and deep understanding, not just answers. 
When solving problems:
1. Break down every single atomic step, no matter how simple.
2. Use warm, conversational English ("Wait, why are we doing this? Well...", "Think of it like...").
3. Wrap ALL mathematical expressions, variables, and formulas in LaTeX notation.
4. If the input is an image, describe what you see first.
5. Provide a 'Final Answer' that is mathematically rigorous but visually clean.
6. The 'Intuition' section should use real-world analogies to make abstract concepts concrete.
7. For each step, provide a 'simplifiedExplanation' that removes all technical debt and uses extreme clarity or analogies.`;

export const solveMathProblem = async (problem: string): Promise<SolverResult> => {
  checkApiConfigured();
  try {
    const response = await ai!.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Solve this math problem: ${problem}.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: solverSchema,
        thinkingConfig: { thinkingBudget: 16000 }
      },
    });

    const result = JSON.parse(response.text);
    return {
      ...result,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("I hit a temporary roadblock. Please check your connection or try rephrasing the question.");
  }
};

export const solveMathProblemFromImage = async (base64Image: string): Promise<SolverResult> => {
  checkApiConfigured();
  try {
    const response = await ai!.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image
            }
          },
          {
            text: `Carefully read the handwriting or printed text in this image. Identify the math problem and solve it step-by-step.`
          }
        ]
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: solverSchema,
        thinkingConfig: { thinkingBudget: 16000 }
      },
    });

    const result = JSON.parse(response.text);
    return {
      ...result,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error("Gemini Vision API Error:", error);
    throw new Error("I couldn't quite read the problem in the photo. Try holding the camera steadier or adding more light.");
  }
};
