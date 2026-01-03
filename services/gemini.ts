
import { GoogleGenAI } from "@google/genai";

export const generateStudioContent = async (prompt: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a creative studio assistant. Help the user with artistic ideas, code snippets, and creative writing. Keep your responses sleek, modern, and inspiring.",
        temperature: 0.8,
      },
    });
    return response.text || "No response received.";
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
