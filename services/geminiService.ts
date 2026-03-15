
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { PRODUCTS } from '../constants';

// Function to initialize AI right before use to ensure latest API key if needed
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface GeminiResponse {
  text: string;
  sources: { title: string; uri: string }[];
}

export async function askGemini(prompt: string): Promise<GeminiResponse> {
  const ai = getAI();
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `You are the "Trusted Mobile" AI Shopping Expert. 
              Our store sells: ${JSON.stringify(PRODUCTS)}.
              
              INSTRUCTIONS:
              1. If the user asks about products we sell, prioritize our inventory.
              2. If the user asks for comparisons with products we DON'T have or latest tech news/prices, use Google Search to provide accurate, real-time info.
              3. Keep answers concise, professional, and helpful. 
              4. Always mention if a product is in our store and provide its price if available.
              
              User question: ${prompt}`
            }
          ]
        }
      ],
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.7,
      }
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.map((chunk: any) => ({
        title: chunk.web?.title || 'Source',
        uri: chunk.web?.uri || ''
      }))
      .filter((s: any) => s.uri) || [];

    return {
      text: response.text || "I couldn't process that request.",
      sources: sources
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "I'm having trouble connecting to the internet right now. Please try again later.",
      sources: []
    };
  }
}
