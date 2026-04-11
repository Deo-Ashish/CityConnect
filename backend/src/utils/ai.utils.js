import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generates a summary of business reviews.
 * @param {Array} reviews - Array of review strings.
 * @returns {Promise<string>}
 */
export const generateReviewSummary = async (reviews) => {
  if (!reviews || reviews.length === 0) return "No reviews yet to summarize.";
  
  const reviewsText = reviews.map(r => `- ${r}`).join('\n');
  const prompt = `
    Analyze the following customer reviews for a local business and provide a concise 2-3 sentence summary.
    Highlight what users love (PROS) and any common complaints (CONS).
    Format it beautifully with short bullet points for pros and cons if possible.
    
    Reviews:
    ${reviewsText}
    
    Summary:
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("AI Summarization Error:", error);
    return "AI summarization currently unavailable.";
  }
};

/**
 * Enhances a natural language search query for better matching.
 * @param {string} query - The user's search query.
 * @returns {Promise<string>}
 */
export const enhanceSearchQuery = async (query) => {
  if (!query) return "";

  const prompt = `
    The user is searching for local businesses on a platform called CityConnect.
    The user's query is: "${query}"
    
    If the query is a natural language sentence like "where can I find a quiet place to work?", 
    extract the key keywords and expand them with related terms that would help in a database search.
    If it's already a keyword, just return it.
    
    Return ONLY the enhanced search terms, comma separated. No other text.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("AI Search Enhancement Error:", error);
    return query; // Fallback to original query
  }
};

/**
 * Handles conversational chat for local discovery.
 * @param {string} userMessage - The user's chat message.
 * @returns {Promise<string>}
 */
export const chatWithAI = async (userMessage) => {
  if (!userMessage) return "How can I help you today?";

  const prompt = `
    You are the CityConnect AI Assistant, a helpful and friendly local guide.
    CityConnect is a platform for discovering local businesses like plumbers, electricians, cafes, and gyms.
    
    User says: "${userMessage}"
    
    Provide a helpful, concise response. If they are looking for a service, encourage them to use the 'Explore' page or ask for specific details like their neighborhood.
    Keep the tone premium, helpful, and professional.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "I'm currently unable to chat, but I'm here to help you find local services!";
  }
};
