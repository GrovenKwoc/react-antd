import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_APP_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = await request.json();
  console.log(prompt);
  try {
    const result = await model.generateContent(prompt.message);
    const response = await result.response;
    const text = response.text();
    return NextResponse.json(text);
  } catch (error) {
    console.log(error);
    return NextResponse.json("Google AI 在开小差...");
  }
}
