import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// تهيئة Gemini AI
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey!);

export async function POST(request: Request) {
  try {
    // التحقق من وجود مفتاح API
    if (!apiKey) {
      console.error("API key not found in environment variables");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    console.log("API Key found, length:", apiKey.length);

    const { prompt, chatHistory } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Please provide a prompt" },
        { status: 400 }
      );
    }

    // تحديد النموذج المراد استخدامه
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    console.log("Model initialized successfully");

    // بناء المحادثة مع السياق
    let conversationContext = "";
    if (chatHistory && chatHistory.length > 0) {
      conversationContext = chatHistory
        .map((msg: any) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n') + '\n';
    }

    const fullPrompt = `${conversationContext}User: ${prompt}\nAssistant:`;

    // إرسال طلب توليد المحتوى
    console.log("Sending request to Gemini API...");
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();
    console.log("Response received from Gemini API");

    return NextResponse.json({ 
      text: text,
      success: true 
    });

  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { 
        error: "An error occurred while connecting to Gemini API",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
