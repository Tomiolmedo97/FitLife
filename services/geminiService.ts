
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const chatWithAI = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: 'You are a professional world-class fitness coach for FitLife. Provide helpful, motivating, and science-based advice.',
    },
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};

export const analyzeMedia = async (prompt: string, base64Data: string, mimeType: string) => {
  const ai = getAI();
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType } },
        { text: prompt }
      ]
    },
  });
  return response.text;
};
