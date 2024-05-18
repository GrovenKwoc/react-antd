import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(request) {
  const { message, model } = await request.json();

  const response = await openai.createCompletion({
    model: model || "gpt-3.5-turbo",
    prompt: message,
    max_tokens: 150,
  });

  return NextResponse.json(response.data.choices[0].text);
}
